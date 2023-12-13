// let st = localStorage;
// st.clear();

// //alert application
// // let toAdd = true;
// // let count =0;
// // while(toAdd){
// //     count+=1;
// //     let task = prompt("Enter Task !")
// //     st.setItem(count, task )
// //     toAdd = confirm("You want to add items?");
// // }

// let list = document.getElementsByClassName("tasks")[0];

// let submitBtn = document.getElementById("subBTN");
// let taskInput = document.getElementById("inputText");

// const addTask = () => {
//     //creating the listItem

//     if (taskInput.value !== "") {
//         let newLi = document.createElement("li");

//         let delBtn = document.createElement('button')
//         delBtn.innerHTML = 'Delete'
//         delBtn.setAttribute('class', 'item-delete')
//         delBtn.addEventListener('click',()=>{
//             newLi.remove();
//         })

//         let task = document.createElement('span')

//         task.textContent = taskInput.value;

//         newLi.appendChild(task);
//         newLi.appendChild(delBtn);
//         list.appendChild(newLi)
//         console.log("task added sucessfully");
//         taskInput.value = "";

//     }
// };
// taskInput.addEventListener("keydown", (e) => {
//     if (e.key == "Enter") {
//         addTask();
//     }
// });

// //calling the function here is wastage will directly go to the call stack and executed without taking input
// submitBtn.addEventListener("click", addTask);

// let clearBtn = document.getElementById("clearbtn");

// const clearAllTasks = () => {
//     if (list.childElementCount == 0) {
//         return;
//     }
//     list.removeChild(list.firstElementChild);
//     console.log("item deleted");
//     clearAllTasks();
// };
// clearBtn.addEventListener("click", clearAllTasks);

/* Trying optimised code for this */
const inputText = document.getElementById("inputText");
const addTaskBtn = document.getElementById("subBTN");
const clearAllBtn = document.getElementById("clearBtn");

// grabbing list
const todoList = document.getElementsByClassName("tasks")[0];

//creating addTask function
function addTask() {
    //create li element
    //add span tag to it
    //ad div tag containgin two buttons to it
    //append it into the ul

    if (inputText.value !== "") {
        let newItem = createNewItem();
        todoList.appendChild(newItem);
        inputText.value = "";
    }
}

let tname = "taskname";
let taskCount = 0;
const taskname = () => {
    let newTask = tname.concat(taskCount++);
    tname.replace(newTask);
    return newTask;
};

function createNewItem() {
    let item = document.createElement("li");
    let itemText = document.createElement("span");
    itemText.textContent = inputText.value
        .charAt(0)
        .toUpperCase()
        .concat(inputText.value.substr(1, inputText.length))
        .trim();

    let divActions = createDivElements();

    item.appendChild(itemText);
    item.appendChild(divActions);
    localStorage.setItem(`${taskname()}`, itemText.textContent);

    return item;
}

function createDivElements() {
    let div1 = document.createElement("div");
    let btn1 = document.createElement("button");
    let btn2 = document.createElement("button");

    btn1.textContent = "Incomplete";
    btn2.textContent = "Delete Task";
    btn1.style.background = "red";
    btn1.style.color = "white";

    div1.setAttribute("class", "item-actions");
    btn1.setAttribute("class", "item-btns");
    btn2.setAttribute("class", "item-btns");
    btn2.setAttribute("name", `${tname + taskCount}`);

    btn1.addEventListener("click", () => {
        btn1.textContent = "Completed";
        btn1.style.background = "green";
        btn1.style.color = "white";
    });

    btn2.addEventListener("click", () => {
        let itemToRemove = btn2.parentElement.parentElement;
        //key of that item
        let itemKey = btn2.name;
        localStorage.removeItem(itemKey);
        itemToRemove.remove();
    });

    div1.appendChild(btn1);
    div1.appendChild(btn2);
    return div1;
}

function clearAllTasks() {
    inputText.value = "Temp Task";
    localStorage.clear();
}

inputText.addEventListener("keydown", (event) => {
    if (event.key == "Enter") {
        addTask();
    }
});
addTaskBtn.addEventListener("click", addTask);
clearAllBtn.addEventListener("click", clearAllTasks);
