const users = require("../mocked_data/users");
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

const createUser = (user) => {
  try {
    const userCollection = getCollection('users');
    userCollection.insertOne(user)

    return {
      success: true,
      user
    }
  }
  catch (err) {
    return {
      success: false,
      error: err
    }
  }
}

module.exports = {
  getUser,
  createUser
};
