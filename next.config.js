/* eslint-disable */

const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  serverRuntimeConfig: {
    MONGO_URL: process.env.MONGO_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    ENDPOINT: 'http://localhost:3000/api/graphql'
  },
  publicRuntimeConfig: {
    ENDPOINT: '/api/graphql'
  }
};
