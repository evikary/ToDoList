const DB = JSON.parse(localStorage.getItem('data')) || {
  task: [
    { id: 1, key: 'покормить кошку', done: false, description: 'дать вкусняшку', type: true, data: '2023-03-10T09:17' },
    { id: 2, key: 'лечь спать', done: false, description: 'не поздно!', type: true, data: '2023-03-10T09:17' },
  ],
};

const input = document.querySelector('#title_form');
const tasks = document.querySelector('ul');
const btn = document.querySelector('button');
const description = document.querySelector('#description__form');
const radio1 = document.querySelector('.rad1');
const radio2 = document.querySelector('.rad2');
const select = document.querySelector('#select_type');
const allTasks = document.querySelector('#all');
const daily = document.querySelector('#calendar');
const sortOrder = document.querySelector('#sort');
const hours3 = 3 * 60 * 60 * 1000;
const hours6 = 6 * 60 * 60 * 1000;
const dataActual = new Date();
let editId = null;

function displayTasks(arr = DB.task) {
  localStorage.setItem('data', JSON.stringify(DB));
  tasks.innerHTML = '';
  arr.forEach((item, i) => {
    const text = item.done === true ? 'line_through' : '';
    const opacity = item.done === true ? 'opacity' : '';
    const checked = item.done === true ? 'checked' : '';
    const type = item.type === true ? 'fas fa-solid fa-user typebtn' : 'fas fa-solid fa-briefcase typebtn';
    const dataD = new Date(item.data);
    const diff = dataD - dataActual;
    const lessThan6 = diff <= hours6 && diff > hours3 ? 'lessThan6' : '';
    const lessThan3 = diff <= hours3 ? 'lessThan3' : '';
    const tag = item.data ? 'tag' : '';
    tasks.innerHTML += `
    <div>
      <li>
        <label class='label'>
          <input type="checkbox" class="check" ${checked} onclick ='checkTask(${item.id})'/>
          <i class="${type}"></i>
          <span class='${text} ${lessThan6} ${lessThan3}'>${item.key}</span>
        </label><span class="${tag}">
          ${item.data?.split('T', 1).join('').split('-').reverse().join('.') || ''}
          ${item.data?.split('T').reverse().join(';').split(';', 1).join('') || ''}
          </span>
        <i class="fas fa-solid fa-pen edit" onclick='editTask(${item.id})'></i>
        <i class="fas fa-trash delete" onclick='deleteTask(${item.id})'></i>
      </li>
      <p class='des ${opacity}'>${item.description}</p>
    </div>`;
  });
}
displayTasks();

btn.addEventListener('click', (e) => {
  let title = input.value.trim();
  let descText = description.value.trim();
  let dataText = daily.value.trim();
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

    DB.task.forEach((item) => {
      if (item.id === editId) {
        item.key = title.toLowerCase();
        item.description = descText.toLowerCase();
        item.type = newType;
        item.data = dataText;
        displayTasks();
        input.value = '';
        description.value = '';
        daily.value = '';
        // input.style.outline = '0';
        // description.style.outline = '0';
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
    id: Date.now(),
    key: title.toLowerCase(),
    done: false,
    description: descText.toLowerCase(),
    type: true,
    data: dataText,
  };

  obj.type = radio1.checked === true ? true : false;

  DB.task.push(obj);
  console.log(DB.task);
  displayTasks();
  input.value = '';
  description.value = '';
  daily.value = '';
  select.value = '0';
  allTasks.value = '3';
  sortOrder.value = '6';
});

function deleteTask(id) {
  if (editId !== null) {
    return;
  }
  DB.task = DB.task.filter((item) => {
    return item.id != id;
  });
  displayTasks();
  select.value = '0';
  allTasks.value = '3';
  sortOrder.value = '6';
}

function checkTask(id) {
  DB.task.forEach((item) => {
    if (item.id === id) {
      item.done = !item.done;
    }
  });
  displayTasks();
  select.value = '0';
  allTasks.value = '3';
  sortOrder.value = '6';
}

function editTask(id) {
  editId = id;
  DB.task.forEach((item) => {
    if (item.id === id) {
      input.value = item.key;
      daily.value = item.data;
      description.value = item.description;
      radio1.checked = item.type;
      radio2.checked = !item.type;
    }
  });
  // input.style.outline = '1.5px solid #4682B4';
  input.focus();
  // description.style.outline = '1.5px solid #4682B4';
}

select.addEventListener('change', (e) => {
  filter();
});

allTasks.addEventListener('change', (e) => {
  filter();
});

sortOrder.addEventListener('change', (e) => {
  filter();
});

function filter(arr = DB.task) {
  const sortt = [...DB.task];
  const selectTask = sortt
    .filter((item) => {
      if (sortOrder.value === '7' || sortOrder.value === '8') {
        return item.data;
      } else {
        return true;
      }
    })
    .sort((a, b) => {
      if (sortOrder.value === '6') {
        return;
      }
      if (sortOrder.value === '7') {
        if (a.data < b.data) {
          return -1;
        }
        if (a.data > b.data) {
          return 1;
        }
        return 0;
      }
      if (sortOrder.value === '8') {
        if (a.data < b.data) {
          return 1;
        }
        if (a.data > b.data) {
          return -1;
        }
        return 0;
      }
    })
    .filter((item) => {
      if (select.value === '0') {
        return true;
      }
      if (select.value === '1') {
        return item.type;
      } else {
        return !item.type;
      }
    })
    .filter((item) => {
      if (allTasks.value === '3') {
        return true;
      }
      if (allTasks.value === '4') {
        return item.done;
      } else {
        return !item.done;
      }
    });
  displayTasks(selectTask);
}
