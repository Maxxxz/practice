const path = require('path');
const asar = require('@electron/asar');


const src = path.join(__dirname, '../src');
const dest = 'maxi.asar';

async function build(){
    console.log('src', src)
    await asar.createPackage(src, dest);
    console.log('done.');
}

build();