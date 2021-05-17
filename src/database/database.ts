const { Sequelize } = require('sequelize');

export const accessDb = () => {
  return new Sequelize({
    dialect: 'sqlite',
    storage: 'db/database.sqlite'
  });
}

export const initializeDatabase = async () => {
  const sequelize = accessDb();

  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  await sequelize.close();
}