const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');

let client;
let db;

const connectBd = async () => {
  mongoose.connect(process.env.DB_CONNECTION_STRING).then(() => {
    console.log('MongoDB connected successfully');
  }).catch((error) => {
    console.error('MongoDB connection error:', error);
  });
}

module.exports = { connectBd };
