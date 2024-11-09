const User = require('../models/userSchema');
 
const getUser = async (params) => {
  try {
    let conditions = []
    if (!!params.email) {
      conditions.push({ email: params.email })
    }
 
    if (!!params.userName) {
      conditions.push({ userName: params.userName })
    }
 
    const user = await User.findOne({
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
