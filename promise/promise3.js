/**
 * @Author: maxizhang
 * @Date: 2021-12-14 13:22:23
 * @FilePath: /practice/promise/promise3.js
 * @Description:  参考 https://www.bilibili.com/video/BV1GA411x7z1?p=39&spm_id_from=pageDriver
 * 1214：实现了链式，但是缺少状态，看解析是then要返回一个新的promise，返回了新的promise还需要用push去处理？
 */

class Promise {
    static PENDING = 'pending';
    static RESLOVED = 'fulfilled';
    static REJECTED = 'rejected';
    

    constructor(cb){
        this.status = Promise.PENDING;
        this.result = undefined;
        this.callback = [];
        cb(this.resolved, this.rejected)
    }

    resolved = (res) => {
        if(this.status !== Promise.PENDING) return ;
        this.status = Promise.RESLOVED
        this.result = res;
        this.callback.forEach((obj)=>{
            obj.onResolved(res);
        })
    }

    rejected = (rej) => {
        if(this.status !== Promise.PENDING) return ;
        this.status = Promise.REJECTED
        this.result = rej;
        this.callback.forEach((obj)=>{
            obj.onRejected(rej);
        })
    }

    then = (onResolved, onRejected) => {
        return new Promise((resolved, rejected)=>{
            if(this.status === Promise.PENDING){
                this.callback.push({
                    onResolved: () => {
                        isPromise(this.result, onResolved,  resolved, rejected)
                    },
                    onRejected: () => {
                        isPromise(this.result, onRejected, resolved, rejected)
                    },
                })
            }else if(this.status === Promise.RESLOVED){
                isPromise(this.result, onResolved,  resolved, rejected)
            }else if(this.status === Promise.REJECTED){
                isPromise(this.result, onRejected,  resolved, rejected)
            }
        })
    }
    
}

function isPromise(result, type, resolved, rejected){
    setTimeout(()=>{
        try{
            const res = type(result);
            // debugger
            if(res instanceof Promise){
                res.then((result)=>{
                    resolved(result)
                }, (err)=>{
                    rejected(err)
                })
            }else{
                resolved(res)
            }
        }catch(err){
            rejected(err)
        }
    })
}

Promise.resolve = function(val){
    return new Promise(resolved => {
        resolved(val)
    })
}

Promise.reject = function(val){
    return new Promise((resolved, rejected) => {
        rejected(val)
    })
}

Promise.all = function(promiseList){
    let resultList = [];
    return new Promise((resolved, rejected) => {
        promiseList.forEach(item =>{
            item.then((res)=>{
                if(resultList.length < promiseList.length){
                    resultList.push(res)
                }
                if(resultList.length === promiseList.length){
                    resolved(resultList)
                }
            }, (err)=>{
                rejected(err)
            })
        })
    })
}

Promise.race = function(promiseList){
    return new Promise((resolved, rejected) => {
        promiseList.forEach(item =>{
            item.then((res)=>{
                resolved(res)
            }, (err)=>{
                rejected(err)
            })
        })
    })
}