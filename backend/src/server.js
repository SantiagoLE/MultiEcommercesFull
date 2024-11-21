const { app, server, io } = require('./app');
// const sequelize = require('./utils/connection');
// require("./models")
const db = require("./models")

const PORT = process.env.PORT || 8080;


const main = async () => {
    try {
        await db.sequelize.sync();
        //await sequelize.sync({alter:true});
       // await db.sequelize.sync({force:true});


        console.log("DB connected");

        io.on('connection', (socket) => {
            console.log('A user connected');

            socket.on('disconnect', () => {
                console.log('A user disconnected');
            });

        });

        server.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
};

main();
