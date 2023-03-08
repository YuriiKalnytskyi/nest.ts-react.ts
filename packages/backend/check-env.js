const Joi = require('joi');
require('dotenv').config();

const envSchema = {
  ENV: Joi.string().required(),
  PORT: Joi.number().required(),
  // Backend secrets
  JWT_SECRET: Joi.string().required(),
  // Postgres setup
  DATABASE_URL: Joi.string().required()
};

const envVariables = process.env;

async function handleValidation() {
  try {
    // eslint-disable-next-line guard-for-in
    for (const key in envSchema) {
      try {
        // eslint-disable-next-line no-await-in-loop
        await envSchema[key].validateAsync(envVariables[key]);
      } catch (e) {
        throw new Error(`⛔️ Validation of : ${key} is undefined! ⛔️`);
      }
    }
    console.log(`✅ Success! Env[${process.env.ENV}] validation was successfully passed! ✅`);
  } catch (e) {
    console.log('Environment variables validation failed. Check your dotenv variables:');
    console.error(e);
    process.exit(1);
  }
}

handleValidation();
