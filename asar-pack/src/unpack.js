const asar = require('@electron/asar')
const path = require('path')


// const asarPath = path.join(__dirname, 'dist/my-electron-app.asar');
// const unpackFilePath = path.join(__dirname, 'unpack/my-electron-app');


// const asarPath = path.join(__dirname, 'dist/application.asar');
// const unpackFilePath = path.join(__dirname, 'unpack/application');

const asarPath = path.join(__dirname, 'dist/2.16.2.asar');
const unpackFilePath = path.join(__dirname, 'unpack/miniapp');

console.log('asarPath', asarPath);
console.log('unpackFilePath', unpackFilePath)
asar.extractAll(asarPath, unpackFilePath)

console.log('done')
