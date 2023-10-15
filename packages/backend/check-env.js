// @ts-nocheck
const Joi = require('joi');
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

const envSchema = {
  // Backend URL
  PORT: Joi.number().required(),
  // Backend secrets
  SECRET_COOKIE: Joi.string().required(),
  // Postgres setup
  POSTGRES_HOST: Joi.string().required(),
  POSTGRES_PORT_DB: Joi.number().required(),
  POSTGRES_USER: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  POSTGRES_DB: Joi.string().required(),
  EMAIL_USER: Joi.string().required(),
  EMAIL_PASSWORD: Joi.string().required(),
  ALGOLIA_APLICATION_ID: Joi.string().required(),
  ALGOLIA_API_KEY: Joi.string().required()
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
        Error(`⛔️ Validation of : ${key} is undefined! ⛔️`);
      }
    }
    // eslint-disable-next-line no-console
    console.log('✅ Success! Env validation was successfully passed! ✅');
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('Environment variables validation failed. Check your dotenv variables:');
    // eslint-disable-next-line no-console
    console.error(e);
    process.exit(1);
  }
}

handleValidation();
