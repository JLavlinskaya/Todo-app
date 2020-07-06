const PAGE_SIZE = 10;
        
function Task(name) {
    this.name = name;
    this.isCompleted = false;
    this.id = + new Date();
}

let allTasks = [];
let showTasks = [];
window.onload = refresh();

function saveAllTasks(){
    localStorage.allTasks = JSON.stringify(allTasks.filter(item => !item.isCompleted));
}
function refresh() {
allTasks = JSON.parse(localStorage.allTasks);
document.getElementById('do').click();
}
allTasksFromForm.onclick = saveAllTasks;
function done (id) {
    const taskEl = document.getElementById(id);
    taskEl.classList.toggle('finished');
    const task = allTasks.find(task => task.id == id);
    task.isCompleted = !task.isCompleted;
}

function addNewTask() {
    if ( !(freshtask.value.length == 0) ) {
    const task = new Task(freshtask.value);
    allTasks.unshift(task);
    makeTaskLabel(task);
    freshtask.value = '';
    filterSelection(false);
    showOneList(1);
    saveAllTasks();
    
    }
}
function keyEnter() {
    if (event.keyCode == 13) {
        document.getElementById('ok').click();
    }
}

function makeTaskLabel(task) {
    let taskEl = document.createElement('label');
    allTasksFromForm.append(taskEl)
    taskEl.className = 'container';
    taskEl.setAttribute('id', task.id);
    taskEl.insertAdjacentHTML("afterbegin", task.name + `<input type='checkbox' ${task.isCompleted ? 'checked' : ''} onclick='done(${task.id})'> <span class='checkmark'></span>`)
    
}
function filterSelection(mean) {
    switch(mean) {
        case true:  
            showTasks = allTasks.filter(item => item.isCompleted);
            break;

        case false: 
            showTasks = allTasks.filter(item => !item.isCompleted);
            break;

        default:
            showTasks = allTasks;
            break;
        }
        clearList("allTasksFromForm");
    
    
    pagination();
    showOneList(1);
}
function clearList(place){
    let list = document.getElementById(place);
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }

}
function pagination() {
    clearList('forNumbers')
    let length = showTasks.length
    let max = Math.ceil(length/PAGE_SIZE);
    for (let i=1; i<=max; i++){
        let number = document.createElement('div');
        forNumbers.append(number);
        number.className = 'numderOfList';
        number.insertAdjacentHTML("afterbegin", `<input type='button' value="${i}" onclick="showOneList(${i})">`)
    }
}
function showOneList(page) {
    clearList("allTasksFromForm");
    
    let minEl = (page-1)*PAGE_SIZE;
    let maxEl = page*PAGE_SIZE;
    let arrForList = showTasks.slice(minEl, maxEl);
    arrForList.forEach((task) => {
        makeTaskLabel(task)
        if (task.isCompleted){
            let id = task.id;
            let taskEl = document.getElementById(id);
            taskEl.classList.add("finished");
        }  
    })
}