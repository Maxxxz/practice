
  document.getElementById('createWin').onclick = (event) => {
    event.preventDefault()
    window.electron.createWin('src/pages/person.html')
  }

  document.getElementById('createAsar').onclick = (event) => {
    event.preventDefault()
    window.electron.createAsar()
  }

  