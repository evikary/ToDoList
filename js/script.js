const DB = JSON.parse(localStorage.getItem('data')) || {
  task: [
    { id: 1, key: 'покормить кошку', done: false, description: 'дать вкусняшку', type: true },
    { id: 2, key: 'лечь спать', done: false, description: 'не поздно!', type: true },
  ],
};

const input = document.querySelector('#title_form');
const tasks = document.querySelector('ul');
const btn = document.querySelector('button');
const description = document.querySelector('#description__form');
const radio1 = document.querySelector('.rad1');
const radio2 = document.querySelector('.rad2');

let editId = null;

function displayTasks() {
  localStorage.setItem('data', JSON.stringify(DB));
  tasks.innerHTML = '';
  DB.task.forEach((item, i) => {
    const text = item.done === true ? 'line_through' : '';
    const opacity = item.done === true ? 'opacity' : '';
    const checked = item.done === true ? 'checked' : '';
    const type = item.type === true ? 'fas fa-solid fa-user typebtn' : 'fas fa-solid fa-briefcase typebtn';
    tasks.innerHTML += `
    <div>
      <li>
        <label class='label'>
          <input type="checkbox" class="check" ${checked} onclick ='checkTask(${i})'/>
          <i class="${type}"></i>
          <span class='${text}'>${item.key}</span>
        </label>
        <i class="fas fa-solid fa-pen edit" onclick='editTask(${i})'></i>
        <i class="fas fa-trash delete" onclick='deleteTask(${i})'></i>
      </li>
      <p class='des ${opacity}'>${item.description}</p>
    </div>`;
  });
}
displayTasks();

btn.addEventListener('click', (e) => {
  let title = input.value.trim();
  let descText = description.value.trim();
  let newType;

  if (editId !== null) {
    let newTitle = input.value.trim();
    title = newTitle;
    let newDiscription = description.value.trim();
    descText = newDiscription;
    newType = radio1.checked;
    if (title === '') {
      input.value = '';
      return;
    }

    DB.task.forEach((item, i) => {
      if (i === editId) {
        item.key = title.toLowerCase();
        item.description = descText.toLowerCase();
        item.type = newType;
        displayTasks();
        input.value = '';
        description.value = '';
        input.style.outline = '0';
        description.style.outline = '0';
      }
    });
    editId = null;
    return;
  }

  if (title === '') {
    input.value = '';
    return;
  }

  const obj = {
    key: title.toLowerCase(),
    done: false,
    description: descText.toLowerCase(),
    type: true,
  };

  obj.type = radio1.checked === true ? true : false;

  DB.task.push(obj);
  displayTasks();
  input.value = '';
  description.value = '';
});

function deleteTask(id) {
  if (editId !== null) {
    return;
  }
  DB.task.splice(id, 1);
  displayTasks();
}

function checkTask(id) {
  DB.task[id].done = !DB.task[id].done;
  displayTasks();
}

function editTask(id) {
  editId = id;
  input.value = DB.task[id].key;
  description.value = DB.task[id].description;
  if (DB.task[id].type === true) {
    radio1.checked = true;
  } else {
    radio2.checked = true;
  }
  input.style.outline = '1.5px solid #4682B4';
  input.focus();
  description.style.outline = '1.5px solid #4682B4';
}
