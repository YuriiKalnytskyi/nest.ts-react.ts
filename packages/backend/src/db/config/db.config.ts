import { registerAs } from '@nestjs/config';
import { Users } from '../models';

export default registerAs('database', () => {
  return {
    dialect: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT_DB),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    models: [Users],
    autoLoadModels: true,
    synchronize: true,
    seederStorage: 'sequelize',
    operatorsAliases: 0,
    logging: console.log
  };
});
