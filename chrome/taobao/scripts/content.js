// ==UserScript==
// @name         淘宝补货推送
// @namespace    http://tampermonkey.net/
// @version      2025-02-06
// @description  查找所有class名中含有'Disabled'的元素，判断是否缺货
// @author       YCR160
// @match        https://detail.tmall.com/item.htm?abbucket=12&id=848566645881*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tmall.com
// @grant        none
// ==/UserScript==
// https://developer.chrome.com/docs/extensions/get-started/tutorial/scripts-on-every-tab?hl=zh-cn

(function () {
    'use strict';
    // 间隔时间随机 30-90 秒
    const refreshInterval = 30 * 1000;
    const randomInterval = 60 * 1000;
    console.log('[maxi] start check liGuang');
    // location="mailto:sample@fly63.com?subject=test&cc=sample@hotmail.com&subject=主题&body=内容";
    // <a href="mailto:?to=recipient@example.com&subject=Test&body=Hello">点击发送邮件</a>

    // window.location.href="mailto:236820310@qq.com?subject=理光&subject=tb来货了&body=测试";
    // senEmail('11测试', '测试');
    function senEmail(title, body) {
        fetch('http://localhost:2266/sendMail?title=' + title + '&content=' + body)
            .then(response => response.json())
            .then(data => console.log('Response:', data))
            .catch(error => console.error('Failed to send request: ', error));
    }

    function checkAndSendRequest() {
        const time = refreshInterval + Math.random() * randomInterval;
        console.log('[maxi] refresh in ', Math.round(time / 1000), 's');
        // 随机间隔刷新一次网页
        const timer = setInterval(() => {
            location.reload();
        }, time);

        // 查找所有class名中含有'Disabled'的元素
        const btn = document
            .querySelector('.jkDKTNzlEM--LeftButtonList--_21fe567')
            ?.querySelector('button')
            ?.querySelector('.jkDKTNzlEM--title--f1020f97');
        if (!btn) {
            console.log('[maxi] not find btn');
            alert('找不到按钮，可能是检查失败了');
            return;
        }

        if (btn.innerText == '领券购买') {
            clearInterval(timer);
            senEmail('理光有货了', '来货');
        } else if (btn.innerText !== '商品已经下架啦~要不要瞧瞧别的~') {
            clearInterval(timer);
            senEmail('理光上架了', '上架');
        }
    }
    // 页面加载时执行代码
    window.onload = () => {
        setTimeout(checkAndSendRequest, 1000);
    };
})();
