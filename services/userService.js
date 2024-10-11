const User = require('../models/userSchema');
const { getCollection } = require('../config/db');

const getUser = async (params) => {
  try {
    const userCollection = getCollection('users')
    

    let conditions = []
    if (!!params.email) {
      conditions.push({ email: params.email })
    }

    if (!!params.userName) {
      conditions.push({ userName: params.userName })
    }

    const user = await userCollection.findOne({
      $or: conditions
    });
    
    return user;
  }
  catch (err) {
    console.log('something went wrong on getUser - userService');
    console.log(err);
    
    return null;
  }
};

const createUser = async (userData) => {
  const collection = getCollection('users');
  collection.insertOne(userData)
  try {
    
    const user = new User(userData); 
    await user.save(); 

    return {
      success: true,
      user,
    };
  } catch (err) {
    return {
      success: false,
      error: err.message,
    };
  }
};
module.exports = {
  getUser,
  createUser
};
