const bcrypt = require('bcrypt');

class UserSchema {
    fullName;
    userName;
    email;
    password;

    constructor(fullName, userName, email, password) {
        this.fullName = fullName;
        this.userName = userName;
        this.email = email;
        this.password = bcrypt.hashSync(password, parseInt(process.env.SALT_ROUNDS));
    }

    getUser() {
        return this;
    }
}

module.exports = {
    UserSchema
}