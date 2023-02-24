const DB = {
  task: ['Task1', 'Task2', 'Task3', 'Task4', 'Task5', 'Task6'],
};

const input = document.querySelector('#title_form');
const tasks = document.querySelector('ul');
console.log(tasks);

tasks.innerHTML = '';
DB.task.forEach((item) => {
  tasks.innerHTML += `<li>
  <label
    ><input
      type="checkbox"
      class="check"
    />${item}</label
  >
</li>`;
});
