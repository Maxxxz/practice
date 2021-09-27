/**
 * @Author: maxizhang
 * @Date: 2021-09-16 16:45:16
 * @FilePath: /practice/typescript/index.ts
 * @Description:
 */
function greeter(person) {
    window.a = 1;
    return "Hello, " + person;
}
var user = "Jane User";
document.body.innerHTML = greeter(user);
