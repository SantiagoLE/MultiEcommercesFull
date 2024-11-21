// /* const catchError = controller => {
// //     return (req, res, next) => {
// //         controller(req, res, next)
// //             .catch(next);
// //     }
// // }

//  module.exports = catchError */



// // Códigos de estado HTTP para cada tipo de error
// const HTTP_statusCodes = {
//   BAD_REQUEST: 400,
//   UNAUTHORIZED: 401,
//   FORBIDDEN: 403,
//   NOT_FOUND: 404,
//   CONFLICT: 409,
//   UNPROCESSABLE_ENTITY: 422,
//   INTERNAL_SERVER_ERROR: 500,
// };

// // Catálogo completo de errores de Sequelize
// const errorMessages = {
//   // Errores de Validación y Restricciones
//   ValidationError: {
//     message: 'Error de validación en los datos proporcionados.',
//     status: HTTP_statusCodes.BAD_REQUEST
//   },
//   SequelizeValidationError: {
//     message: 'Los datos no cumplen con las validaciones requeridas.',
//     status: HTTP_statusCodes.BAD_REQUEST
//   },
//   SequelizeUniqueConstraintError: {
//     message: 'Ya existe un registro con estos datos únicos.',
//     status: HTTP_statusCodes.CONFLICT
//   },
//   SequelizeForeignKeyConstraintError: {
//     message: 'Error de clave foránea. La referencia no existe.',
//     status: HTTP_statusCodes.UNPROCESSABLE_ENTITY
//   },
//   SequelizeExclusionConstraintError: {
//     message: 'La operación viola una restricción de exclusión.',
//     status: HTTP_statusCodes.CONFLICT
//   },
//   SequelizeCheckConstraintError: {
//     message: 'La operación viola una restricción de verificación.',
//     status: HTTP_statusCodes.UNPROCESSABLE_ENTITY
//   },

//   // Errores de Conexión y Base de Datos
//   SequelizeConnectionError: {
//     message: 'Error al conectar con la base de datos.',
//     status: HTTP_statusCodes.INTERNAL_SERVER_ERROR
//   },
//   SequelizeConnectionRefusedError: {
//     message: 'Conexión rechazada por la base de datos.',
//     status: HTTP_statusCodes.INTERNAL_SERVER_ERROR
//   },
//   SequelizeHostNotFoundError: {
//     message: 'No se puede encontrar el host de la base de datos.',
//     status: HTTP_statusCodes.INTERNAL_SERVER_ERROR
//   },
//   SequelizeAccessDeniedError: {
//     message: 'Acceso denegado a la base de datos.',
//     status: HTTP_statusCodes.FORBIDDEN
//   },
//   SequelizeDatabaseError: {
//     message: 'Error en la operación de base de datos.',
//     status: HTTP_statusCodes.INTERNAL_SERVER_ERROR
//   },

//   // Errores de Timeout
//   SequelizeTimeoutError: {
//     message: 'La operación excedió el tiempo límite.',
//     status: HTTP_statusCodes.INTERNAL_SERVER_ERROR
//   },

//   // Errores de Transacción
//   SequelizeOptimisticLockError: {
//     message: 'Error de bloqueo optimista. Los datos han sido modificados.',
//     status: HTTP_statusCodes.CONFLICT
//   },

//   // Errores de Instancia y Modelo
//   SequelizeInstanceError: {
//     message: 'Error en la instancia del modelo.',
//     status: HTTP_statusCodes.INTERNAL_SERVER_ERROR
//   },
//   SequelizeEmptyResultError: {
//     message: 'No se encontró el registro solicitado.',
//     status: HTTP_statusCodes.NOT_FOUND
//   },

//   // Error por defecto
//   default: {
//     message: 'Ha ocurrido un error interno.',
//     status: HTTP_statusCodes.INTERNAL_SERVER_ERROR
//   }
// };

// const catchError = (controller) => {
//   return async (req, res, next) => {
//     try {
//       await controller(req, res, next);
//     } catch (error) {
//       // Obtener la configuración del error específico o usar el default
//       const errorConfig = errorMessages[error.name] || errorMessages.default;


//       // Log del error (ajustar según el ambiente)
//       if (process.env.NODE_ENV === 'development') {
//         console.error('Error Details:', {
//           name: error.name,
//           message: error.message,
//           stack: error.stack,
//           timestamp: new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota', hour12: false }),
//           details: error.message
//         });
//       } else {
//         console.error('Error:', {
//           name: error.name,
//           message: error.message,
//           timestamp: new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota', hour12: false }),
//           details: error.message
//         });
//       }

//       // Respuesta al cliente
//       return res.status(errorConfig.status).json({
//         status: ` Error: ${errorConfig.status}`,
//         message: errorConfig.message,
//         details: error.message,
//         errorCode: error.name,
//         timestamp: new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota', hour12: false }),
//       });
//     }
//   };
// };

// module.exports = catchError


// Errores de Validación y Restricciones
const sequelizeErrorMessages = {
  
  ValidationError: {
    message: 'Error de validación en los datos proporcionados.',
    status: 400
  },
  SequelizeValidationError: {
    message: 'Los datos no cumplen con las validaciones requeridas.',
    status: 400
  },
  SequelizeUniqueConstraintError: {
    message: 'Ya existe un registro con estos datos únicos.',
    status: 409
  },
  SequelizeForeignKeyConstraintError: {
    message: 'Error de clave foránea. La referencia no existe.',
    status: 422
  },
  SequelizeExclusionConstraintError: {
    message: 'La operación viola una restricción de exclusión.',
    status: 409
  },
  SequelizeCheckConstraintError: {
    message: 'La operación viola una restricción de verificación.',
    status: 422
  },

  // Errores de Conexión y Base de Datos
  SequelizeConnectionError: {
    message: 'Error al conectar con la base de datos.',
    status: 500
  },
  SequelizeConnectionRefusedError: {
    message: 'Conexión rechazada por la base de datos.',
    status: 500
  },
  SequelizeHostNotFoundError: {
    message: 'No se puede encontrar el host de la base de datos.',
    status: 500
  },
  SequelizeAccessDeniedError: {
    message: 'Acceso prohibido.',
    status: 403
  },
  SequelizeDatabaseError: {
    message: 'Error en la operación de base de datos.',
    status: 500
  },

  // Errores de Timeout
  SequelizeTimeoutError: {
    message: 'La operación excedió el tiempo límite.',
    status: 500
  },

  // Errores de Transacción
  SequelizeOptimisticLockError: {
    message: 'Error de bloqueo optimista. Los datos han sido modificados.',
    status: 409
  },

  // Errores de Instancia y Modelo
  SequelizeInstanceError: {
    message: 'Error en la instancia del modelo.',
    status: 500
  },
  SequelizeEmptyResultError: {
    message: 'No se encontró el registro solicitado.',
    status: 404
  },

  // Error por defecto
  default: {
    message: 'Ha ocurrido un error interno en el servidor.',
    status: 500
  },
}

// Añade mapeo para códigos de estado HTTP estándar
const standarHTTP_errorCodes = {

  400: {
    message: 'Solicitud incorrecta.',
    status: 400
  },
  401: {
    message: 'No autorizado.',
    status: 401
  },
  403: {
    message: 'Acceso prohibido.',
    status: 403
  },
  404: {
    message: 'No se encontró el registro solicitado.',
    status: 404
  },
  500: {
    message: 'Ha ocurrido un error interno en el servidor.',
    status: 500
  }
};

const catchError = (controller) => {
  return async (req, res, next) => {
    try {
      const result = await controller(req, res, next);

     if( res.statusCode)

      // Si el controlador retorna un código de estado usando res.sendStatus()
      if (result === undefined) {
        const statusCode = res.statusCode;
        const errorConfig = sequelizeErrorMessages[statusCode] || sequelizeErrorMessages.default;

        return res.status(statusCode).json({
          status: `Error: ${statusCode}`,
          message: errorConfig.message,
          timestamp: new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota', hour12: false }),
        });
      }

      return result;
    } catch (error) {
      // Mantén tu lógica de manejo de errores de Sequelize existente
      const errorConfig = sequelizeErrorMessages[error.name] || sequelizeErrorMessages.default;

      // Log del error (ajustar según el ambiente)
      if (process.env.NODE_ENV === 'development') {
        console.error('Error Details:', {
          name: error.name,
          message: error.message,
          stack: error.stack,
          timestamp: new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota', hour12: false }),
          details: error.message
        });
      } else {
        console.error('Error:', {
          name: error.name,
          message: error.message,
          timestamp: new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota', hour12: false }),
          details: error.message
        });
      }

      // Respuesta al cliente
      return res.status(errorConfig.status).json({
        status: `Error: ${errorConfig.status}`,
        message: errorConfig.message,
        details: error.message,
        errorCode: error.name,
        timestamp: new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota', hour12: false }),
      });
    }
  };
};

module.exports = catchError;