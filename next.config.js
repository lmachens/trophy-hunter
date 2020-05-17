/* eslint-disable */
const dotenv = require('dotenv');
dotenv.config();

const config = {
  serverRuntimeConfig: {
    MONGO_URL: process.env.MONGO_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    DISCORD_WEBHOOK_URL: process.env.DISCORD_WEBHOOK_URL,
    ENDPOINT: 'http://localhost:3000/api/graphql'
  },
  publicRuntimeConfig: {
    ENDPOINT: '/api/graphql'
  },
  env: {
    PUBLIC_DIR: ''
  }
};

if (process.env.TARGET === 'OVERWOLF') {
  console.log('Build Overwolf app');

  config.target = 'server';
  config.assetPrefix = '.';
  config.env = {
    PUBLIC_DIR: '/build'
  };
  config.exportPathMap = () => {
    return {
      '/': { page: '/' },
      '/background': { page: '/background' },
      '/in-game': { page: '/in-game' }
    };
  };
}

module.exports = config;
