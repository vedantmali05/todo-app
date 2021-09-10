let themeBtn = document.querySelector(".themeBox"),
    sun = document.querySelector(".sun"),
    moon = document.querySelector(".moon");

imgChange = () => {
    let lightBg = document.querySelectorAll(".lightBg");
    darkBg = document.querySelectorAll(".darkBg");

    for (let i = 0; i < lightBg.length; i++) {
        lightBg[i].classList.toggle("themeActive");
        darkBg[i].classList.toggle("themeActive");
        lightBg[i].classList.toggle("themeInactive");
        darkBg[i].classList.toggle("themeInactive");
    }
};

switchTheme = () => {
    sun.classList.toggle("light");
    moon.classList.toggle("light");
    document.body.classList.toggle("dark-theme");
    document.body.classList.toggle("light-theme");

    imgChange();
};

themeBtn.addEventListener("click", switchTheme);

// /////////////////////////// ADDING A TASK

let addBtn = document.querySelector(".addBtn");
addInput = document.querySelector(".addInput");
taskBox = document.querySelector(".taskBox");

// NEW TASK CONTROLS
addInput.oninput = () => {
    if (addInput.value !== "") {
        addBtn.style.opacity = "1";
        addBtn.style.pointerEvents = "all";
    } else {
        addBtn.style.opacity = "0";
        addBtn.style.pointerEvents = "none";
    }
};

// /////////////////////////// TASK OPTIONS
taskOption = () => {
    let task = document.querySelectorAll(".task");
    active = document.querySelectorAll(".active");
    check = document.querySelectorAll(".checkBox");
    taskText = document.querySelectorAll(".taskText");
    del = document.querySelectorAll(".delete");
    num = document.querySelector(".num");
    clearBtn = document.querySelector(".clearBtn");

    //FILTERING THE TASKS :)
    let filter = document.querySelectorAll(".filter");
    let allFil = document.querySelectorAll(".allFil");
    activeFil = document.querySelectorAll(".activeFil");
    completeFil = document.querySelectorAll(".completeFil");

    removeSel = () => {
        for (let k = 0; k < filter.length; k++) {
            filter[k].classList.remove("selected");
        }
    };

    for (let i = 0; i < task.length; i++) {
        // Number of items
        num.innerHTML = active.length;

        // checkBox
        check[i].onclick = () => {
            check[i].classList.toggle("complete");
            taskText[i].classList.toggle("complete");
            del[i].classList.toggle("complete");
            task[i].classList.toggle("complete");
            task[i].classList.toggle("active");

            if (check[i].classList.contains("complete")) {
                num.innerHTML = --num.innerHTML;
            } else {
                num.innerHTML = parseInt(num.innerHTML) + 1;
            }
        };

        // deleting the items
        del[i].onclick = () => {
            taskText[i].style.color = "#fff";
            check[i].style.opacity = "0";
            task[i].style.background = "#ea4335";
            setTimeout(() => {
                task[i].style.transform = "translateX(-110%)";
                task[i].style.height = "0px";
                task[i].style.padding = "0px";
            }, 500);
            setTimeout(() => {
                task[i].remove();
            }, 1000);

            if (del[i].classList.contains("complete")) {
                num.innerHTML = parseInt(num.innerHTML);
            } else {
                num.innerHTML = --num.innerHTML;
            }
        };

        // Clearing the completed
        clearBtn.onclick = () => {
            for (let j = 0; j < task.length; j++) {
                if (task[j].classList.contains("complete")) {
                    taskText[j].style.color = "#fff";
                    check[j].style.opacity = "0";
                    task[j].style.background = "#07f";
                    setTimeout(() => {
                        task[j].style.transform = "translateX(-110%)";
                        task[j].style.height = "0px";
                        task[j].style.padding = "0px";
                    }, 500);
                    setTimeout(() => {
                        task[j].remove();
                    }, 1000);
                }
            }
        };

        // FILTERING THE TASK
        for (let j = 0; j < allFil.length; j++) {
            // All Tasks
            allFil[j].onclick = () => {
                removeSel();

                for (let k = 0; k < task.length; k++) {
                    if (task[k].classList.contains("task")) {
                        task[k].style.opacity = "1";
                        task[k].style.display = "flex";
                    }
                }
                allFil[j].classList.add("selected");
            };

            // Incomplete Task
            activeFil[j].onclick = () => {
                removeSel();

                for (let k = 0; k < task.length; k++) {
                    if (task[k].classList.contains("active")) {
                        task[k].style.opacity = "1";
                        task[k].style.display = "flex";
                    } else {
                        task[k].style.opacity = "0";
                        setTimeout(() => {
                            task[k].style.display = "none";
                        }, 500);
                    }
                }
                activeFil[j].classList.add("selected");
            };

            // Completed Task
            completeFil[j].onclick = () => {
                removeSel();

                for (let k = 0; k < task.length; k++) {
                    if (task[k].classList.contains("complete")) {
                        task[k].style.opacity = "1";
                        task[k].style.display = "flex";
                    } else {
                        task[k].style.opacity = "0";
                        setTimeout(() => {
                            task[k].style.display = "none";
                        }, 500);
                    }
                }
                completeFil[j].classList.add("selected");
            };
        }
    }
};

// /////////////////////////// NEW TASK
addTask = () => {
    // Creating new task - Appending the task parent
    let newTask = document.createElement("li");
    newTask.className = "task active";
    if (addInput.value !== "") {
        taskBox.appendChild(newTask);
    }

    // Adding check box in the parent
    checkBtn = document.createElement("button");
    checkBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="11" height="9"><path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6" /></svg>`;
    checkBtn.className = `checkBox`;

    // Adding the task value inside input in the parent
    taskText = document.createElement("input");
    taskText.value = addInput.value;
    taskText.className = `taskText`;

    // Adding the delete button to remove the task
    deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z" /></svg>`;
    deleteBtn.className = `delete`;

    // appending all the created childs in the parent - task
    newTask.appendChild(checkBtn);
    newTask.appendChild(taskText);
    newTask.appendChild(deleteBtn);
    addInput.value = "";

    taskOption();
};

// ADD TASK ON PRESSED ENTER
addInput.addEventListener("keypress", function(e) {
    if (e.key == "Enter") {
        addTask();
    }
});

// ADD TASK ON CLICKED
addBtn.addEventListener("click", addTask);

// Drag and Drop
dragArea = document.querySelector(".wrapper");
new Sortable(dragArea, {
    animation: 350,
});