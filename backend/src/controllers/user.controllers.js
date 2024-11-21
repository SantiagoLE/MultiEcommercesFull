const catchError = require('../utils/catchError');
const { user, commerce, generalSetting, tokenEmail } = require('../models');
const jwt = require("jsonwebtoken");
const sendEmail = require('../utils/sendEmail');



const getAll = catchError(async (req, res) => {
    const { commerceId } = req.query
    const allUsers = await user.findAll({
        where: { commerceId },
        order: [['createdAt', 'DESC']]
    });
    return res.json(allUsers);
});

const create = catchError(async (req, res) => {
    // if (req.body.role === "admin") { req.body.restrictedTime = false }

    const { userName, password, email, profileImage, role, restrictedTime, commerceId, frontBaseUrl } = req.body
    const userBody = { userName, password, email, profileImage, role, restrictedTime, commerceId }

    const oneCommerce = await commerce.findOne({
        where: { id: commerceId }
    })

    if (oneCommerce.status === "inactive") {  // Logia si el comercio no esta verificado

        const createUser = await user.create(userBody)
        const token = require('crypto').randomBytes(64).toString('hex')  // Genero codigo unico para ese usuario
        const url = `${frontBaseUrl}/verify_email/${token}`  // Genero url: <url que viene del front>/verify_email/<codigo unico> 

        const html = ` <div style="background-color: #f6f6f6; padding: 20px; font-family: Arial, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <div style="text-align: center; margin-bottom: 30px;">
                <img src="https://img.icons8.com/fluency/344/company.png" alt="Logo" style="max-width: 150px;">
            </div>
            <h1 style="color: #333333; text-align: center; margin-bottom: 20px; font-size: 24px;">Verificación de Cuenta</h1>
            <p style="color: #666666; font-size: 16px; line-height: 1.5; margin-bottom: 30px; text-align: center;">
                Gracias por registrarte. Por favor, verifica tu cuenta haciendo clic en el siguiente botón:
            </p>
            <div style="text-align: center;">
                <a href="${url}" 
                   style="display: inline-block; 
                          background-color: #4CAF50; 
                          color: #ffffff; 
                          text-decoration: none; 
                          padding: 12px 30px; 
                          border-radius: 5px; 
                          font-weight: bold;
                          font-size: 16px;">
                    Verificar Cuenta
                </a>
            </div>
            <p style="color: #999999; font-size: 14px; text-align: center; margin-top: 30px;">
                Si no creaste esta cuenta, puedes ignorar este correo.
            </p>
        </div>
    </div> `

        await sendEmail({   // Ejecuto la  funcion de envio de email
            to: email,  // Destinatario <email> que viene por body
            subject: "Verificacion de cuenta",   // Asunto del correo
            html  // html: Mensaje que va a ser enviado, mas el link de la <url> que genere en la constante anterior 
        })
        await tokenEmail.create({ token, commerceId, userId: createUser.id }) // Leno la tabla tokenEmail
        return res.status(201).json(createUser);
    }
    const existingUser = await user.findOne({ where: { userName, commerceId } });
    if (existingUser) {
        return res.sendStatus(409) // Respuesta por conflicto "Usuario repetido en comercio"
    }
    const createUser = await user.create(userBody);
    return res.status(201).json(createUser);

});

const getOne = catchError(async (req, res) => {
    const { id } = req.params;
    const oneUser = await user.findByPk(id);
    if (!oneUser) return res.sendStatus(404);
    return res.json(oneUser);
});

const remove = catchError(async (req, res) => {
    const { id } = req.params;
    const { force = true } = req.body
    const removeUser = await user.destroy({ where: { id }, force });
    if (!removeUser) return res.sendStatus(404);
    return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
    const { id } = req.params;
    const { role } = req.user; // Viene del usuario logeado, decode en JWT
    const body = role === 'user' ? { profileImage: req.body.profileImage } : req.body; // Si role === user, solo puede actulizar la imagen
    const updateUser = await user.update(
        body,
        { where: { id }, returning: true }
    );

    if (updateUser[0] === 0) return res.sendStatus(404);
    return res.json(updateUser[1][0]);
});


const verifyEmail = catchError(async (req, res) => {

    const { token } = req.params
    const tokenUser = await tokenEmail.findOne({ where: { token } })
    if (!tokenUser) return res.sendStatus(404)

    const oneUser = await user.findOne({ where: { id: tokenUser.userId } }) //Busco el usuario que tiene ese token

    const commerceUpdate = await commerce.update({ status: "active", email: oneUser.email }, { where: { id: tokenUser.commerceId }, returning: true }) // actualizo el estado y el email del comercio

    await tokenUser.destroy()

    return res.json(commerceUpdate)

})

const login = catchError(async (req, res) => {
    const { userName, password, commerceId } = req.body;

    const loginUser = await user.findOne({ where: { userName, commerceId } });

    if (!loginUser) return res.sendStatus(401);
    if (loginUser.password !== password) return res.sendStatus(401);

    const generalSettings = await generalSetting.findOne({ where: { commerceId } });

    const { workStart, workEnd, workDays } = generalSettings;

    const token = jwt.sign({
        loginUser,
        generalSettings: { workStart, workEnd, workDays }
    }, process.env.TOKEN_SECRET, { expiresIn: "1d" });

    return res.json({ loginUser, token });
});


const resetPassword = catchError(async (req, res) => {

    const { email, commerceId, frontBaseUrl } = req.body

    const oneUser = await user.findOne({ where: { email, commerceId } })
    if (!oneUser) return res.sendStatus(404)

    const token = require('crypto').randomBytes(64).toString('hex')  // Genero codigo unico para ese usuario
    const url = `${frontBaseUrl}/reset_password/${token}`  // Genero url: <url que viene del front>/verify_email/<codigo unico> 

    const html =  ` <div style="background-color: #f6f6f6; padding: 20px; font-family: Arial, sans-serif;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <div style="text-align: center; margin-bottom: 30px;">
            <img src="https://img.icons8.com/fluency/344/company.png" alt="Logo" style="max-width: 150px;">
        </div>
        <h1 style="color: #333333; text-align: center; margin-bottom: 20px; font-size: 24px;">Restablecer Contraseña</h1>
        <p style="color: #666666; font-size: 16px; line-height: 1.5; margin-bottom: 30px; text-align: center;">
            Has solicitado restablecer tu contraseña. Haz clic en el siguiente botón para crear una nueva:
        </p>
        <div style="text-align: center;">
            <a href="${url}" 
               style="display: inline-block; 
                      background-color: #2196F3; 
                      color: #ffffff; 
                      text-decoration: none; 
                      padding: 12px 30px; 
                      border-radius: 5px; 
                      font-weight: bold;
                      font-size: 16px;">
                Restablecer Contraseña
            </a>
        </div>
        <p style="color: #999999; font-size: 14px; text-align: center; margin-top: 30px;">
            Si no solicitaste restablecer tu contraseña, puedes ignorar este correo.
        </p>
    </div>
</div> `

    await sendEmail({   // Ejecuto la  funcion de envio de email
        to: email,  // Destinatario <email> que viene por body
        subject: "Restablecer contraseña",   // Asunto del correo
        html      // html: Mensaje que va a ser enviado, mas el link de la <url> que genere en la constante anterior 
    })

    await tokenEmail.create({ token, commerceId, userId: oneUser.id }) // Leno la tabla tokenEmail
    return res.json(oneUser)

})


const updatePassword = catchError(async (req, res) => {

    const { token } = req.params
    const { password } = req.body
    const tokenUser = await tokenEmail.findOne({ where: { token } })
    if (!tokenUser) return res.sendStatus(404)

    await user.update({ password }, { where: { id: tokenUser.userId } })
    await tokenUser.destroy()

    return res.sendStatus(200)

})


module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    login,
    verifyEmail,
    resetPassword,
    updatePassword
}