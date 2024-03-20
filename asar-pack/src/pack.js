const asar = require('@electron/asar')
const path = require('path')

const src = path.join(__dirname, '../../my-electron-app');
const dest = path.join(__dirname, 'dist/my-electron-app.asar');

console.log('src', src);
console.log('dest', dest)
asar.createPackage(src, dest).then(()=>{
    console.log('done.');
});
