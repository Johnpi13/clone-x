const { MongoClient } = require('mongodb');

let client;
let db;

const getDBInstance = () => {
  if (!client) {
    try {
      client = new MongoClient(process.env.DB_CONNECTION_STRING);
      db = client.db(process.env.DB_NAME);
      console.log('Connected successfully');
    } catch (error) {
      console.error('Something was wrong when connecting:', error);
      process.exit(1);
    }
  }
  return db;
};

module.exports = { getDBInstance };
