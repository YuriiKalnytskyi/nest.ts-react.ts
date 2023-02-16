module.exports = {
  dialect: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT_DB),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  seederStorage: 'sequelize',
  operatorsAliases: 0,
  logging: console.log
};
