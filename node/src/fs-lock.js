const fs = require('fs')
const path = require('path')
const jsonObj = {}
const random = Math.random()
for(let i = 0; i< 10000000; i++){
    jsonObj[i] = random;
}
console.log('random', random)

const file = path.join(__dirname, './static/a.json')
// fs.mkdirSync(file, {recursive: true});
try {
    fs.writeFileSync(file, JSON.stringify(jsonObj, null, 2))
    console.log('suc')
} catch (error) {
    console.log('error', error)
}