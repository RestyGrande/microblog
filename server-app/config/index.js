module.exports = {
  websiteName: "Microblog 1.1",
  database: {
    serverName: process.env.DB,
    dbPath: `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  },
};
