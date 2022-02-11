/**
 * @Author: maxizhang
 * @Date: 2021-11-25 22:28:38
 * @FilePath: /practice/promise/yibu.js
 * @Description: 
 */
/**
 * @Author:
 * @Date: 2021-11-25 22:27:47
 * @FilePath: /ws-miniprogram-uniapp/src/pages/more/a.js
 * @Description:
 */


 function add_to_wait_list(obj) {
    setTimeout(() => {
      obj.callback();
    }, 500);
  }
  
  function read_async_v4(target) {
    const operation = {};
    add_to_wait_list(operation);
    const chainableObject = {
      callbacks: [],
      then(callback) {
        this.callbacks.push(callback);
        return this;
      },
      run(data) {
        let nextData = data;
        for (cb in this.callbacks) {
          nextData = cb(nextData);
        }
      },
    };
    operation.callback = chainableObject.run;
    return chainableObject;
  }
  
  // 于是我们可以这样
  read_async_v4('qq.com').then(() => {
    console.log('1');
  })
    .then(() => {
      console.log(2);
    })
    .then(/* ...*/);
  