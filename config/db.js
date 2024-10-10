const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
 
let client;
let db;
 
const connectBd = () => {
  mongoose.connect(process.env.DB_CONNECTION_STRING).then(() => {
    console.log('MongoDB connected successfully');
  }).catch((error) => {
    console.error('MongoDB connection error:', error);
  });
}
 
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
 
const getCollection = (collectionName) => {
  const dbInstance = getDBInstance();
  const userCollection = dbInstance.collection(collectionName)
 
  return userCollection;
}
 
module.exports = { getCollection, connectBd };