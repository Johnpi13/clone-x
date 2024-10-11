
const mongoose = require('mongoose');

let db;


const connectBd = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = mongoose.connection; 
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

const getCollection = (collectionName) => {
  if (!db) {
    throw new Error('Database connection not established');
  }
  return db.collection(collectionName); 
};

module.exports = {
  connectBd,
  getCollection,
};
