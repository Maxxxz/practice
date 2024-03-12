const bsdiff = require('bsdiff-node');
const path = require('path');
const currPath = __dirname;

const oldFile = path.join(currPath, 'zip/zip-a.zip')
const newFile = path.join(currPath, 'zip/zip-b.zip')
const newFileResult = path.join(currPath, 'zip/result.zip')
const patchFile = path.join(currPath, 'zip/index.patch')
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