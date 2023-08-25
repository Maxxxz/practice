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
    window.electron.createWin('pages/person.html')
   
  }