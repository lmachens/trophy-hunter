/* eslint-disable */
const dotenv = require('dotenv');
dotenv.config();

const config = {
  serverRuntimeConfig: {
    MONGO_URL: process.env.MONGO_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    DISCORD_WEBHOOK_URL: process.env.DISCORD_WEBHOOK_URL,
    RIOT_API_KEY: process.env.RIOT_API_KEY,
  },
  publicRuntimeConfig: {
    API_ENDPOINT: process.env.API_ENDPOINT,
  },
  env: {
    PUBLIC_DIR: '',
  },
};

if (process.env.TARGET === 'OVERWOLF') {
  console.log('Build Overwolf app');

  config.target = 'server';
  config.assetPrefix = '.';
  config.env = {
    PUBLIC_DIR: '/build',
  };
  config.exportPathMap = () => {
    return {
      '/background': { page: '/background' },
      '/in-game': { page: '/in-game' },
      '/league-of-legends': { page: '/league-of-legends' },
      '/notification': { page: '/notification' },
      '/not-supported': { page: '/not-supported' },
    };
  };
}

module.exports = config;
