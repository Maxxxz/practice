const cluster = require('node:cluster');

if (cluster.isPrimary) {
  console.log('I am primary');
  require('./mainIndex.js');
  cluster.fork();
//   cluster.fork();
} else if (cluster.isWorker) {
  console.log(`I am worker #${cluster.worker.id}`);
  // 不行，里面的require electron 会出问题
  // require('./mainIndex.js');
}
