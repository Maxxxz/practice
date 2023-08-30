
const p = new Proxy({}, {
    set(target, propKey, value) {
        console.log('target, propKey, value', target, propKey, value)
        if (propKey === 'name') {
            throw new TypeError('name属性不允许修改');
        }
        // 不是 name 属性，直接保存
        target[propKey] = value;
    },
    get(target, propKey) {
        console.log('get target, propKey', target, propKey)
        // if (propKey === 'name') {
        //     throw new TypeError('name属性不允许修改');
        // }
        // 不是 name 属性，直接保存
        return target[propKey]
    }
});