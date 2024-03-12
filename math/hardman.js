/*
// https://juejin.cn/post/7338325570087043112

new LazyMan('煎饼狗子').drink('水') 输出

我是煎饼狗子
喝喝喝 水

new LazyMan('煎饼狗子').drink('水').sleep(3000).eat('憨包') 输出

我是煎饼狗子
喝喝喝 水
// ......在这里等了3000ms
睡了3000ms，起床
吃吃吃 憨包

new LazyMan('煎饼狗子').drink('可乐').sleepFirst(1000) 输出

// ......在这里等了1000ms
睡了1000ms，起床
我是煎饼狗子
喝喝喝 可乐

*/


// new LazyMan('煎饼狗子').drink('水').sleep(3000).eat('憨包') 

new LazyMan('煎饼狗子').drink('可乐').sleepFirst(1000)

// class LazyMan {
//     constructor(name) {
//         return this.init(name);
//     }

//     queue = []
//     timer = null;
//     addQueue(fn){
//         this.queue.push(fn)
//         this.print(); 
        
//     }

//     addPreQueue(fn){
//         this.queue.unshift(fn)
//         this.print()
//     }

//     print(){
//         clearTimeout(this.timer);
//         this.timer = setTimeout(async ()=>{
            
//             for(let i =0; i<this.queue.length;i++){
//                 await this.queue[i]()
//             }
//             this.queue = []
//         })
//     }


//     init(name){
//         this.addQueue(()=> console.log('我是' + name))
//         return this;
//     }

//     drink(name){
//         this.addQueue(()=> console.log('喝水' + name))
//         return this;
//     }
//     eat(name){
//         this.addQueue(()=> console.log('吃' + name))
//         return this;
//     }

//     sleep(num){
//         this.addQueue(()=> new Promise((resolve)=>{
//             setTimeout(()=> {
//                 console.log('睡了' + num + 'ms，起床')
//                 resolve()
//             },num)
//         }))
//         return this;
//     }

//     sleepFirst(num){
//         this.addPreQueue(()=> new Promise((resolve)=>{
//             setTimeout(()=> {
//                 console.log('先睡了' + num + 'ms，起床')
//                 resolve()
//             },num)
//         }))
//         return this;
//     }
// }

class LazyMan {
    /**任务队列 */
    queue = []

    constructor(name) {
        this.add(() => console.log('我是 ' + name))
        setTimeout(() => { //利用宏任务的特性，确保同步任务执行完之后才来到这 （这里的同步任务指的是  lazyMan.drink('xxx').sleep(3000).eat('xx') 这样的事件注册）
            this.next()
        });
    }
    eat(food) {
        this.add(() => console.log('吃吃吃 ' + food))
        return this
    }
    sleep(time) {
        this.add(async () => {
            await new Promise(r => setTimeout(() => {
                r()
                console.log(`睡了${time}ms，起床`);
            }, time))
        })
        return this
    }
    drink(thing) {
        this.add(() => console.log('喝喝喝 ' + thing))
        return this
    }
    sleepFirst(time) {
        this.addFirst(async () => {
            await new Promise(r => setTimeout(() => {
                r()
                console.log(`睡了${time}ms，起床`);
            }, time))
        })
        return this
    }
    /**添加任务到末尾 */
    add(task) {
        this.queue.push(async () => {
            await task() //等待当前任务执行完后，接着执行下一个任务
            this.next()
        })
    }
    /**添加任务到开头 */
    addFirst(task) {
        this.queue.unshift(async () => {
            await task() //等待当前任务执行完后，接着执行下一个任务
            this.next()
        })
    }
    /**执行下一个任务 */
    next() {
        this.queue.shift()?.()
    }
}

// 第二种写法： （区别在于添加任务的时候，不用手动调用next了，而是在runTask函数里去递归调用）
class LazyMan2 {
    queue = []
    constructor(name) {
        this.addTask(() => console.log('名字是: ' + name))
        setTimeout(() => {
            this.runTask()
        }, 0);
    }
    drink(name) {
        this.addTask(() => console.log('喝: ' + name))
        return this
    }
    eat(name) {
        this.addTask(() => console.log('吃: ' + name))
        return this
    }
    sleep(time) {
        this.addTask(() => {
            return new Promise(async (resolve, reject) => {
                setTimeout(() => {
                    console.log(`睡了 ${time} 秒`);
                    resolve()
                }, time * 1000)
            })
        })
        return this
    }
    addTask(task) {
        this.queue.push(task)
    }
    async runTask() {
        const task = this.queue.shift()
        if (task) {
            await task()
            this.runTask()
        }
    }
}

