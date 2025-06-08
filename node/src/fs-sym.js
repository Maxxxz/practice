const fs = require('fs')
const path = require('path')

function lstat(link){
    const info = fs.lstatSync(link)
    console.log('isSymbolicLink', info.isSymbolicLink())
    return info.isSymbolicLink()
}




// lstat(path.join('/Users/maxi/Library/Containers/com.tencent.qq/Data/Downloads'))
// lstat(path.join('/Users/maxi/Library/Containers/com.tencent.qq/Data/Downloads/1.xlsx'))


try{
    const res = fs.accessSync(path.join('/Users/maxi/Library/Containers/com.tencent.qq/Data/Downloads'))
    console.log('accessSync res', res)
}catch(err){
    console.log('accessSync err', err)
}