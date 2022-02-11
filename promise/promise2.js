/**
 * @Author: maxizhang
 * @Date: 2021-12-14 13:22:23
 * @FilePath: /practice/promise/promise2.js
 * @Description:  参考 https://zhuanlan.zhihu.com/p/139496058
 * 1214：实现了链式，但是缺少状态，看解析是then要返回一个新的promise，返回了新的promise还需要用push去处理？
 */

function customPromise(cb){
    this.isPromise = true;
    this.resFn = [];
    this.rejectFn = null;
    const res = (r)=>{
        this.rejectFn = null;
        while(this.resFn.length){
            this.resFn.shift()(r)
        }
    }
    const rej = (r)=>{
        this.resFn = []
        this.rejectFn && this.rejectFn(r);
    }
    cb(res, rej)
}

customPromise.prototype.then = function(rescb){
    this.resFn.push(rescb)
    return new customPromise((res, rej)=>{});
}


// new customPromise((res, rej) =>{
//     setTimeout(() => {
//         res(2)
//     },500)
// }).then((res)=>{
//     return new customPromise((r) =>{
//         setTimeout(() => {
//             r(2)
//         },500)
//     })
// }).then((res)=>{
//     console.log('res2', res)
// })

new customPromise((res, rej) =>{
    setTimeout(() => {
        res(1)
    },500)
}).then((r)=>{
    console.log('res1', r)
    return new customPromise((res) =>{
        setTimeout(() => {
            res(2)
        },500)
    })
}).then((r)=>{
    console.log('res2', r)
    return 3
}).then((r)=>{
    console.log('res3', r)
})