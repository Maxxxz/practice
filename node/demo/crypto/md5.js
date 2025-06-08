const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

// Function to calculate file's MD5
async function calcFileMd5(filePath) {
    return new Promise((resolve, reject) => {
        const stream = fs.createReadStream(filePath);
        const hash = crypto.createHash('md5');
        
        stream.on('readable', () => {
            const data = stream.read();
            if (data) hash.update(data);
            else resolve(hash.digest('hex'));
        });
        
        stream.on('error', error => reject(error));
    });
}

// Recursive function to traverse directories
async function walkDirAndCalcMd5(dirPath) {
    const resultsFilename = "./error1.txt";
    const writeStream = fs.createWriteStream(resultsFilename, {'flags': 'a'}); // append mode

    async function _writeLine(line) {
        return new Promise((resolve, reject) => {
            writeStream.write(line + '\n', err => {
                if (err) reject(err);
                resolve();
            });
        });
    };

    const filesInDirectory = await fs.promises.readdir(dirPath);
    for (const fileOrSubdirectory of filesInDirectory) {
        const fullPath = path.join(dirPath, fileOrSubdirectory);
        const stats = await fs.promises.stat(fullPath);
        if (stats.isDirectory()) {
            await walkDirAndCalcMd5(fullPath);
        } else if (stats.isFile()) {
            const md5Sum = await calcFileMd5(fullPath);
            const line = `${fullPath}: ${md5Sum}`;
            console.log(line);
            await _writeLine(line);
        }
    }

    writeStream.end();
};

// walkDirAndCalcMd5("/path/to/your/directory").catch(console.error);

const app = path.join('/Users/maxi/Downloads/6.9.55-qqexAsar-28860.zip.zip');
// console.log('app', app)
// walkDirAndCalcMd5(app).catch(console.error);

async function test(){
    const res = await calcFileMd5(app)
    console.log('res', res)
}
test();

