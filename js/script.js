// const DB = {
//   task: [
//     { key: 'покормить кошку', done: false },
//     { key: 'лечь спать', done: false },
//   ],
// };

// console.log(DB.task[0].key);

const DB = JSON.parse(localStorage.getItem('data')) || {
  task: [
    { key: 'покормить кошку', done: false, description: 'дать вкусняшку' },
    { key: 'лечь спать', done: false, description: 'не поздно!' },
  ],
};

// console.log(DB);

const input = document.querySelector('#title_form');
const tasks = document.querySelector('ul');
const btn = document.querySelector('button');
const trash = document.querySelectorAll('i');
const check = document.querySelectorAll('check');
const description = document.querySelector('#description__form');

function displayTasks() {
  localStorage.setItem('data', JSON.stringify(DB));
  tasks.innerHTML = '';
  DB.task.forEach((item, i) => {
    const text = item.done === true ? 'line_through' : '';
    const opacity = item.done === true ? 'opacity' : '';
    const checked = item.done === true ? 'checked' : '';
    tasks.innerHTML += `<div><li>
  <label class='label'
    ><input
      type="checkbox"
      class="check" ${checked} onclick ='checkTask(${i})'
    /><span class='${text}'>${item.key}</span></label
  ><i class="fas fa-trash delete" onclick='deleteTask(${i})'></i>
</li><p class='des ${opacity}'>${item.description}</p></div>`;
  });
}
displayTasks();

btn.addEventListener('click', (e) => {
  const title = input.value.trim();
  const descText = description.value.trim();

  if (title === '') {
    input.value = '';
    return;
  }

  const obj = {
    key: title.toLowerCase(),
    done: false,
    description: descText.toLowerCase(),
  };
  DB.task.push(obj);
  displayTasks();
  input.value = '';
  description.value = '';
});

function deleteTask(id) {
  DB.task.splice(id, 1);
  displayTasks();
}

function checkTask(id) {
  // const state = DB.task[id].done ? false : true;
  // DB.task[id].done = state;
  DB.task[id].done = !DB.task[id].done;
  displayTasks();
}

// (функция обработчик событий)При нажатии на чек-бокс менялись данные в массиве и отрисовывался зачеркнутый текст у того объекта, у которого значение done true
// При снятии галочки с чекбокса должен быть done false
// При отрисовке списка должна быть галочка, где done true (атрибут checked)
// Проверить массив на наличие всех нужных свойств
// <!-- onclick= вызов функции -->
