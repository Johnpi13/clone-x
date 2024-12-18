const mongoose = require('mongoose'); 

const UserSchema = new mongoose.Schema({ 
    fullName: { type: String, required: true },
    userName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    followers: [{ type: String }],  
    following: [{ type: String }] 
});


const User = mongoose.model('User', UserSchema); 
module.exports = User; 
