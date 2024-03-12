const bsdiff = require('bsdiff-node');
const path = require('path');
const currPath = __dirname;

const oldFile = path.join(currPath, 'a/index.js')
const newFile = path.join(currPath, 'b/index.js')
const errFile = path.join(currPath, 'a/err.js')
const newFileResult = path.join(currPath, 'b/result.js')
const patchFile = path.join(currPath, 'result/index.patch')
bsdiff.diff(oldFile, newFile, patchFile, function(result, err) {
    console.log('diff:' + String(result).padStart(4) + '%');
    console.log('err', err)

    if(result === 100){

        bsdiff.patch(oldFile, newFileResult, patchFile, function (result) {
            console.log('patch:' + String(result).padStart(4) + '%');
        });

    }
}); // Async

// bsdiff.patch(oldfile, newfile, patchfile, function(result, err) {}); // Async

// bsdiff.diffSync(oldFile, newFile, patchFile); // Sync
// bsdiff.patchSync(oldfile, newfile, patchfile); // Sync