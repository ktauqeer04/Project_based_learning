// basically to display all the tasks after adding the tasks in the html document  
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('add-task').addEventListener('click', addTaskFromInput);
    loadTask();
}); 



// fucntion to add task from input
function addTaskFromInput(){

    const taskValue = document.getElementById('new-task').value;
    if(taskValue){
        addTask(taskValue);
        document.getElementById('new-task').value = '';
        saveTasks();
    }

}



// loadtask 
function addTask(taskValue, isComplete = false){

    const ul = document.getElementById('task-list');
    const li = document.createElement('li');

    const checkBox = document.createElement('input');
    const text = document.createElement('span');
    const editButton = document.createElement('button');
    const deleteButton = document.createElement('button');

    
    // functionality for check box 
    // check box to check if the task is done or not
    checkBox.type = 'checkbox';
    checkBox.checked = isComplete;
    checkBox.addEventListener('change', toggleTask);

    // input text to add task and check if it is complete or not
    text.textContent = taskValue;
    text.style.textDecoration = isComplete ? 'line-through' : 'none';

    // edit button to edit the task
    editButton.textContent = 'edit';
    editButton.addEventListener('click', editTask);
    
    // delete button to delete task
    deleteButton.textContent = 'delete';
    deleteButton.addEventListener('click', deleteTask);

    // append all the functionality of a task in the list 
    li.appendChild(checkBox);
    li.appendChild(text);
    li.appendChild(editButton);
    li.appendChild(deleteButton);

    // append the task in the ul in html document
    ul.appendChild(li);


}


function loadTask() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(function (task) {
        addTask(task.text, task.isCompleted);
    });
}


function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#task-list li').forEach(function (taskLi) {
        const text = taskLi.querySelector('span').textContent;
        const isCompleted = taskLi.querySelector('input').checked;
        tasks.push({ text, isCompleted });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}




function toggleTask(event){
    const text = event.target.nextElementSibling;
    text.style.textDecoration = event.target.checked ? 'line-through' : 'none';
    saveTasks();
}




function deleteTask(event){
    const li = event.target.parentNode;
    li.parentNode.removeChild(li);
    saveTasks();
}



function editTask(event){
    const text = event.target.previousElementSibling;
    const newText = prompt("Edit your Task : ", text.textContent);
    if(newText){
        text.textContent = newText;
        saveTasks();
    }   
}

