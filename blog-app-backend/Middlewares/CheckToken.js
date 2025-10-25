require('dotenv').config();
const jwt = require('jsonwebtoken');
const JWT_SIGN = process.env.JWT_SIGN;

const CheckToken = (token) => {
    try {
        const verify = jwt.verify(token, JWT_SIGN);
        return verify.user;
    } catch (error) {
        console.log(error);
        // return null;
    }
}



module.exports = CheckToken;