use std::io;   // io操作库
use rand::Rng;

fn main() {
    println!("Guess the number!");

    // 随机数逻辑
    let secret_number = rand::thread_rng().gen_range(1..101);
    println!("The secret number is: {}", secret_number);

    // 你输入的数字
    println!("Please input your guess.");
    let mut guess = String::new();

    io::stdin()
        .read_line(&mut guess)
        .expect("Failed to read line");

    println!("You guessed: {}", guess);
}