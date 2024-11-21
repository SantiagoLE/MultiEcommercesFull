const { sequelize } = require('./src/models');

async function resetDatabase() {
  try {
    await sequelize.sync({ force: true });
    console.log('Base de datos reiniciada exitosamente.');
  } catch (error) {
    console.error('Error al reiniciar la base de datos:', error);
  } finally {
    await sequelize.close();
  }
}

resetDatabase();