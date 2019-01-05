const { ipcRenderer } = require('electron');

// Escuchando un evento de task.
const tasks = document.querySelector('#tasks');
console.log('home');
// Escuchando cuando se genera una nueva task.
ipcRenderer.on('newtask', (eventNewTask, newTask) => {
  console.log(newTask);

  const newTaskTemple = `
    <div class="col-4 p-2">
      <div class="card text-center">
          <div class="card-header">
            <h5 class="card-title">
            ${ newTask.name }
            </h5>
          </div>
          <div class="card-body">
            ${ newTask.user }
            <hr>
            ${ newTask.description } $
          </div>
          <div class="card-footer">
            <button class="btn btn-danger btn-block item">
              DELETE
            </button>
          </div>
      </div>
    </div>
  `;

  // Remueve cada item selecionado
  tasks.innerHTML += newTaskTemple;
  const items = document.querySelectorAll('.item');
  items.forEach(item => {
    item.addEventListener('click', eventClick => {
      eventClick.target.parentElement.parentElement.parentElement.remove();
    });
  });

  // Remueve todos los item
  ipcRenderer.on('tasks-remove-all', eventRemoveAll => {
    tasks.innerHTML = '';
  });

});