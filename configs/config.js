const config = {
  app: {
    port: 8081,
  },
  db: {
    mongoUri: 'mongodb://127.0.0.1/searchmap',
  },
  jwt: {
    secretKey: 'C0b4d1b4c4.',
    expiresIn: '7d',
  },
};

module.exports = config;
