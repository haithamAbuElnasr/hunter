const { ipcRenderer, remote } = require('electron');

document.addEventListener('DOMContentLoaded', () => {
  const domainInput = document.getElementById('domain');
  const processButton = document.getElementById('btn');
  const chooseFolderButton = document.getElementById('choose-folder');
  const resultDiv = document.getElementById('result');

  processButton.addEventListener('click', () => {
    // Get the input domain from the input field
    const inputDomain = domainInput.value;

    // Show folder dialog to choose a folder path
    remote.dialog.showOpenDialog({ title: 'Choose Folder', properties: ['openDirectory'] })
      .then(({ filePaths }) => {
        // filePaths is an array containing the selected folder path(s)
        if (filePaths && filePaths.length > 0) {
          const folderPath = filePaths[0]; // Use the first selected folder path

          // Send the input domain and folder path to the main process
          ipcRenderer.send('process-domain', { domain: inputDomain, folderPath });
        } else {
          console.log('Folder path not selected.');
        }
      })
      .catch((error) => {
        console.error(`Error in folder dialog: ${error}`);
      });
  });

});