const crypto = require('crypto');
const appConfig = require('../config/app');

const password = crypto.createHmac('sha256',appConfig.hmacKey);
password.update('123456');
console.log(password.digest('hex'));

