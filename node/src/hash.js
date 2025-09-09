var { createReadStream } =  require('fs');
var crypto = require('crypto') ;

function getHash (path) {
  return new Promise((resolve, reject) => {
    const stream = createReadStream(path);
    const fsHash = crypto.createHash('md5');

    stream.on('data', (d) => {
      fsHash.update(d, 'utf8');
    });

    stream.on('end', () => {
      const md5 = fsHash.digest('hex');
        console.log(md5);
      resolve(md5);
    });

    stream.on('error', (err) => {
      reject(err);
    });
  });
};

async function getQQHash(){
    const hashStr = await getHash('./../qqpkg/QQ-v9.9.23-39424_x64_QQinner.exe')
    const res = hashStr.slice(0, 8)
    console.log(res)
}

getQQHash('./../qqpkg/QQ-v9.9.23-39424_x64_QQinner.exe')