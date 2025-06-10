"use strict";
const nodemailer = require("nodemailer");
const config = require('./config.json')


// 创建Nodemailer传输器 SMTP 或者 其他 运输机制
let transporter = nodemailer.createTransport({
host: "smtp.qq.com", // 第三方邮箱的主机地址
port: 587,
secure: false, // true for 465, false for other ports
auth: {
    user: config.user, // 发送方邮箱的账号
    pass: config.pass, // 邮箱授权密码
},
});

// 使用async..await 创建执行函数
async function main(title = 'maxi', content = 'test') {
    try {
        // 定义transport对象并发送邮件
        let info = await transporter.sendMail({
            from: '"maxi 👻" <236820310@qq.com>', // 发送方邮箱的账号
            // to: "maxizhang@tencent.com", // 邮箱接受者的账号
            to: "475490058@qq.com, maxizhang@tencent.com", // 邮箱接受者的账号
            subject: title, // Subject line
            text: content, // 文本内容
            // html: "欢迎注册h5.dooring.cn, 您的邮箱验证码是:<b>${emailCode}</b>", // html 内容, 如果设置了html内容, 将忽略text内容
        });
        console.error('maxilog sendSuc', info)
        return true
    } catch (error) {
        console.error('maxilog sendError', error)
        return false
    }

}

module.exports.sendEmail = main;
