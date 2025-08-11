
  document.getElementById('createWin').onclick = (event) => {
    event.preventDefault()
    window.electron.createWin('src/pages/person.html')
  }

  document.getElementById('createAsar').onclick = (event) => {
    event.preventDefault()
    window.electron.createAsar()
  }

  document.getElementById('openBV1').onclick = (event) => {
    event.preventDefault()
    window.electron.openBV1()
  }

  document.getElementById('openBV2').onclick = (event) => {
    event.preventDefault()
    window.electron.openBV2()
  }
    

  