const { ipcRenderer } = require('electron');

// Onteniendo información del formulario.
const form = document.querySelector('form');

// Esta a la escucha de un submit del form
form.addEventListener('submit', eventSubmit => {
  eventSubmit.preventDefault();

  // Obteniedo valores del form
  const taskName = document.querySelector('#name').value;
  const taskUser = document.querySelector('#user').value;
  const taskDescription = document.querySelector('#description').value;

  const newTask = {
    name: taskName,
    user: taskUser,
    description: taskDescription
  };

  // Emitiendo en objeto con valores
  ipcRenderer.send('newtask', newTask);

});