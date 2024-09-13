let input = document.querySelector(".input");
let btn = document.querySelector(".btn");
let view = document.querySelector(".view");
let clear = document.querySelector(".clearAll");
clear.onclick=function(){
    view.innerHTML='';
    window.localStorage.clear();
}
let taskArr=[];
if(localStorage.getItem("item")){
    taskArr=JSON.parse(localStorage.getItem("item"));
}
getFromlocal();
// addTOarray
btn.onclick=function(){
    if(input.value !== ''){
        addTOarr(input.value);
        input.value='';
        console.log(input.value.length);
    }
}
function addTOarr(text){
const task ={
    id:Date.now(),
    title:text,
    completed:false,
    };
taskArr.push(task);
addElement(taskArr);
addTOstorage(taskArr);
}
// add elements
function addElement(taskArr){
    view.innerHTML = "";
    taskArr.forEach(task => {
        let taskDiv = document.createElement("div");
        taskDiv.className=("task");
        taskDiv.setAttribute("data-id", task.id);
        // if(task.completed){
        //     taskDiv.className("task done");
        // }
        let taskSpan = document.createElement("span");
        taskSpan.className=("text");
        taskSpan.innerHTML=task.title;

        let del = document.createElement("button");
        del.className=("del");
        del.innerHTML="Delete";

        taskDiv.append(taskSpan);
        taskDiv.append(del);
        view.appendChild(taskDiv);
        });
}
// 
view.addEventListener("click",(e)=>{
    if(e.target.classList.contains("text")){
        e.target.classList.toggle("textDone");
        updateStatus(e.target.parentElement.getAttribute("data-id"));
    }
    if(e.target.classList.contains("del")){
        e.target.parentElement.remove();
        deleteFromlocal(e.target.parentElement.getAttribute("data-id"));
    }
})
// add to local storage
function addTOstorage(taskArr){
    window.localStorage.setItem("item",JSON.stringify(taskArr));
}
// get from local storage
function getFromlocal(){
    let data = window.localStorage.getItem("item");
    if(data){
        item = JSON.parse(data);
        addElement(item)
    }
}
// delete task from local storage
function deleteFromlocal(tasks){
    taskArr =taskArr.filter((task)=>task.id != tasks);
    addTOstorage(taskArr);
}
function updateStatus(taskId) {
    for (let i = 0; i < taskArr.length; i++) {
        if (taskArr[i].id == taskId) {
        taskArr[i].completed == false ? (taskArr[i].completed = true) : (taskArr[i].completed = false);
    }
    }
    addTOstorage(taskArr);
}