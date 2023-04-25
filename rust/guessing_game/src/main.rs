// 获取用户输入并打印结果作为输出，我们需要引入 io 输入/输出库到当前作用域。
// io 库来自于标准库，也被称为 std
use std::io;  

fn main() {
    println!("Guess the number!");

    println!("Please input your guess.");

    let mut guess = String::new();  //创建一个储存用户输入的变量（variable）

    // 开头如果没有使用 use std::io 引入 io 库，我们仍可以通过把函数调用写成 std::io::stdin 来使用函数
    io::stdin()  
        //  &mut guess 作为参数传递给 read_line() ，无论用户在标准输入中键入什么内容，都将其存入一个字符串中（不覆盖其内容），所以它需要字符串作为参数。这个字符串参数需要是可变的，以便该方法可以更改字符串的内容。
        .read_line(&mut guess)  // 结果也返回一个值 io::Result，io::Result 的实例拥有 expect 方法
        .expect("Failed to read line");  // 通过expect 使用 Result 类型来处理潜在的错误
        // 如果 io::Result 实例的值是 Err，expect 会导致程序崩溃，并显示当做参数传递给 expect 的信息。
        // 如果 read_line 方法返回 Err，则可能是来源于底层操作系统错误的结果。
        // 如果 io::Result 实例的值是 Ok，expect 会获取 Ok 中的值并原样返回。在本例中，这个值是用户输入的字节数。

    println!("You guessed: {}", guess);
}
