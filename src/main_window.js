const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const { createNewTaskWindow, closeTaskWindow } = require('./task_window');

// Ventana principal.
let mainWindow;

createMainWindow = () => {
  
  // configuraciones.
  mainWindow = new BrowserWindow({
    width: 900,
    height: 600,
  });

  // cargando el index-
  mainWindow.loadFile('views/index.html');

  // Creación del menu
  const mainMenu = Menu.buildFromTemplate(templateMenu);
  Menu.setApplicationMenu(mainMenu);

  // Abre la ventana de desarrolladores.
  // mainWindow.webContents.openDevTools();

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

}

const templateMenu = [
  {
    label: 'File',
    submenu: [
      {
        label: 'New Product',
        accelerator: 'Ctrl+N',
        click() { 
          createNewTaskWindow();
        }
      },
      {
        label: 'Remove All Products',
        click() {
          mainWindow.webContents.send('tasks-remove-all');
        }
      },
      {
        label: 'Exit',
        accelerator: process.platform == 'darwin' ? 'command+Q' : 'Ctrl+Q',
        click() {
          app.quit();
        }
      }
    ]
  }
];

// Escucha y emite eventos
ipcMain.on('newtask', (eventNewTask, newTask) => {
  // Manda eventos a la ventana principal
  mainWindow.webContents.send('newtask', newTask);
  closeTaskWindow();
});



module.exports = { createMainWindow };