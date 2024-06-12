document.getElementById('drag1').ondragstart = (event) => {
  console.log('drag1 ondragstart')
    event.preventDefault()
    window.electron.startDrag('drag-and-drop-1.md')
  }
  
  document.getElementById('drag2').ondragstart = (event) => {
    event.preventDefault()
    window.electron.startDrag('drag-and-drop-2.md')
  }

  document.getElementById('createWin').onclick = (event) => {
    event.preventDefault()
    window.electron.createWin('src/pages/person.html')
   
  }

  document.getElementById('wopen').onclick = (event) => {
    event.preventDefault()
    window.open('https://github.com', 'maxi222', JSON.stringify({a: 1, b: 2}))
    // window.open('', '_blank')
  }