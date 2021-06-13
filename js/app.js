// define UI variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter')
const taskInput = document.querySelector('#task')



// load all event listeners
loadEventListeners();

//load all event loadEventListeners
function loadEventListeners(){
    //add task event
    form.addEventListener('submit', addTask);

    //remove task event
    taskList.addEventListener('click', removeTask)

    //clear task loadEventListeners
    clearBtn.addEventListener('click', clearTask);

    //filter tasks
    filter.addEventListener('keyup', filterTask)

    //dom load event
    document.addEventListener('DOMContentLoaded', getTask)
}

// add task
function addTask(e){
    if(taskInput.value === ''){
       alert('Yoo, add a task')
    }
      //create li elements
    const li = document.createElement('li')
    //add a class
    li.className = 'collection-item'
    // create text node and append to the li
    li.appendChild(document.createTextNode(taskInput.value));
    // create new link elements
    const link = document.createElement('a')
    //add class
    link.className = 'delete-item secondary-content';
    //add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //append the link to li
    li.appendChild(link);


    // append the li to the ul
    taskList.appendChild(li);

    // store in local storage
    storeTaskInLocalStorage(taskInput.value)

    //clear input when you are done adding
    taskInput.value = '';

    e.preventDefault();
}

// remove task input
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
       if(confirm('Are you sure you want to delete this task?')){
         e.target.parentElement.parentElement.remove();

         removeTaskFromLocalStorage(e.target.parentElement.parentElement)
       }
    }
}

// clear task
function clearTask(){
   while(taskList.firstChild){
     taskList.removeChild(taskList.firstChild)
   }
   clearTaskFromLocalStorage();
}

//filter tasks
function filterTask(e){
   const text = e.target.value.toLowerCase();

   document.querySelectorAll('.collection-item').forEach(
   function(task){
     const item = task.firstChild.textContent;
     if(item.toLowerCase().indexOf(text) != -1){
       task.style.display = 'block'
     }
     else{
      task.style.display = 'none'
     }
   });
}

// store task
function storeTaskInLocalStorage(task){
  let tasks;
  if (localStorage.getItem('tasks') === null){
    tasks = []
  }
  else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task)

  localStorage.setItem('tasks', JSON.stringify(tasks))
}

//get task from localStorage
function getTask(){
  let tasks;
  if (localStorage.getItem('tasks') === null){
    tasks = []
  }
  else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  } 

  tasks.forEach(function(task){
    const li = document.createElement('li')
    //add a class
    li.className = 'collection-item'
    // create text node and append to the li
    li.appendChild(document.createTextNode(task));
    // create new link elements
    const link = document.createElement('a')
    //add class
    link.className = 'delete-item secondary-content';
    //add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //append the link to li
    li.appendChild(link);


    // append the li to the ul
    taskList.appendChild(li);
  })
}

// remove task from local storage
function removeTaskFromLocalStorage(taskItem){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = []
  }
  else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  } 

  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
       tasks.splice(index, 1)
    }
  })

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// clear task from local storage
function clearTaskFromLocalStorage(){
  localStorage.clear();
}