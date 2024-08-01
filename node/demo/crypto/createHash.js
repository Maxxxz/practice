const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

console.time();
// const buffer = fs.readFileSync(path.join(__dirname, 'asar/2.16.2.asar'));
// const buffer = fs.readFileSync(path.join(__dirname, 'asar/application.asar'));
const app = path.join('/Users/maxi/Library/Containers/com.tencent.qq/Data/Library/Application\ Support/QQ/versions/6.9.53-26270/QQUpdate.app');
console.log('app', app)
const buffer = fs.readFileSync(app);

const hash = crypto.createHash('md5');
hash.update(buffer, 'utf8');
const md5 = hash.digest('hex');
console.log(md5);
console.timeEnd();
