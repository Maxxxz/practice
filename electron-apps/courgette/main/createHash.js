const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

// const buffer = fs.readFileSync(path.join(__dirname, 'asar/2.16.2.asar'));
// const buffer = fs.readFileSync(path.join(__dirname, 'asar/application.asar'));

const file1 = path.join(__dirname, 'fileA/1.js');
const file2 = path.join(__dirname, 'fileB/1.js');
createHash(file1)
createHash(file2)

function createHash(file){
    const buffer = fs.readFileSync(file);
    const hash = crypto.createHash('md5');
    hash.update(buffer, 'utf8');
    const md5 = hash.digest('hex');
    console.log(file);
    console.log(md5);
    console.log('\n');
}

