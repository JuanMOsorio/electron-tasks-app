const { BrowserWindow } = require('electron');

// Ventana de creacion de tareas.
let newTaskWindow;

createNewTaskWindow = () => {

  newTaskWindow = new BrowserWindow({
    width: 400,
    height: 350,
    title: 'Add a new Task'
  });

  // Menu como nulo.
  newTaskWindow.setMenu(null);
  // newTaskWindow.webContents.openDevTools();

  newTaskWindow.loadFile('views/new_task.html');

  newTaskWindow.on('closed', () => {
    newTaskWindow = null;
  });

}

closeTaskWindow = () => {
  newTaskWindow.close();
}


module.exports = { createNewTaskWindow, closeTaskWindow }; 