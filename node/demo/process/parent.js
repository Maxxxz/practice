const { spawn } = require('node:child_process');
const path = require('path')

const child = spawn('node', [
    path.join(__dirname,'/child.js'),
    'haha'
])

child.on('close', (code, signal) => {
    console.error('maxilog close code, signal', code, signal);
  });
  child.on('exit', (code, signal) => {
    console.error('maxilog exit code, signal', code, signal);
  });

  child.on('message', function(m) {
    console.info('message:', m);
  });

  child.on('error', (err) => {
    console.error('maxilog spawn error', err);
  });
  child.on('spawn', (data) => {
    console.warn('maxilog spawn success', data);
  });
  child.stdout.on('data', (data) => {
    console.log(`maxilog stdout: ${data}`);
  });
  child.stderr.on('data', (data) => {
    console.error(`maxilog stderr: ${data}`);
  });

  global.process.haha = '123'
console.log('child', child)