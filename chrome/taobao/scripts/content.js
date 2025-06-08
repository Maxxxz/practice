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
     // 间隔时间随机 60-120 秒
    const refreshInterval = 60 * 1000;
    const randomInterval = 60 * 1000;

    function checkAndSendRequest() {
        // 随机间隔刷新一次网页
        const timer = setInterval(() => {
            location.reload();
        }, refreshInterval + Math.random() * randomInterval);

        // 查找所有class名中含有'Disabled'的元素
        const btn = document
            .querySelector('.jkDKTNzlEM--LeftButtonList--_21fe567')
            ?.querySelector('button')
            ?.querySelector('.jkDKTNzlEM--title--f1020f97');
        if (!btn || btn.innerText !== '商品已经下架啦~要不要瞧瞧别的~') {
            clearInterval(timer);
            alert('来货了！');
        }
    }
    // 页面加载时执行代码
    window.onload = checkAndSendRequest;
})();
