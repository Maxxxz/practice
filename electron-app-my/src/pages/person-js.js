// preload.js

// 所有的 Node.js API接口 都可以在 preload 进程中被调用.
// 它拥有与Chrome扩展一样的沙盒。
window.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded 1')
    const replaceText = (selector, text) => {
      const element = document.getElementById(selector)
      if (element) element.innerText = text
    }
  
    // for (const dependency of ['chrome', 'node', 'electron']) {
    //   replaceText(`${dependency}-version`, process.versions[dependency])
    // }
    document.querySelector('#hello').addEventListener('click', function(){
      console.log('click 2');
      window.open('https://github.com', '_blank', 'top=500,left=200,frame=false,nodeIntegration=no')
    })
  })