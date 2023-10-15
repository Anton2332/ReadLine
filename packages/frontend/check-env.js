// @ts-nocheck
const Joi = require('joi');
require('dotenv').config();

const envSchema = {
  // Backend URL
  REACT_APP_PORT: Joi.number().required(),
  // Backend secrets
  NEXT_PUBLIC_BACKEND_URL: Joi.string().required(),
  SCRAPINGDOG_API_KEY: Joi.string().required(),
  NEXT_PUBLIC_SHOW_ANSWERS_MIN_VOTES: Joi.string().required(),
  NEXT_PUBLIC_SHOW_POSTS: Joi.string().required(),
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
        new Error(`⛔️ Validation of : ${key} is undefined! ⛔️`);
      }
    }
    console.log('✅ Success! Env validation was successfully passed! ✅');
  } catch (e) {
    console.log('Environment variables validation failed. Check your dotenv variables:');
    console.error(e);
    process.exit(1);
  }
}

handleValidation();
