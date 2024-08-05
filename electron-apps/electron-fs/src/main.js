const {app} = require('electron');
const fs = require('fs');
// const {rm} = require('fs:promises');
const originalFs = require('original-fs')
const path = require('path');
const { electron } = require('process');
const demoAsar = path.join(__dirname, '../static/app.asar')


fs.rm(path.join(__dirname, '../static/folder/app.asar'), {recursive: false}, (err)=>{
    console.log('err', err)
})

// try {
//     const res = originalFs.unlinkSync(path.join(__dirname, '../static/folder'))
//     console.log('originalFs res', res)
// } catch (error) {
//     console.log('originalFs', error)
// }

// try {
//     const res = fs.unlinkSync(path.join(__dirname, '../static/2.asar'))
//     // const res = fs.unlinkSync(path.join(__dirname, '../static/folder'))
//     console.log('fs res', res)
// } catch (error) {
//     console.log('fs', error)
// }


