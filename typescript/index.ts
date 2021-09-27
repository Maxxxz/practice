/**
 * @Author: maxizhang
 * @Date: 2021-09-16 16:45:16
 * @FilePath: /practice/typescript/index.ts
 * @Description: 
 */

interface Window{
    a: number
} 
function greeter(person: string) {
    window.a = 1;
    return "Hello, " + person;
}

let user = "Jane User";

document.body.innerHTML = greeter(user);