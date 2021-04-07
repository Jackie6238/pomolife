// select elements
const submit = document.getElementById('#plus-btn-task-submit');
const input = document.getElementById('plus-btn-task-input');
const form = document.getElementById('plus-btn-task-form');


form.onsubmit = function () {
    const inputValue = input.value;
    if (inputValue) {
        // create a new list element
        var li = document.createElement("li");

        // create a check button and append it to the list item
        var spanCheck = document.createElement("span");
        var check = document.createTextNode("\u2705");
        spanCheck.className = "check";
        spanCheck.appendChild(check);
        li.appendChild(spanCheck);

        // get the input task from user and append it to the list item
        var task = document.createTextNode(inputValue);
        li.appendChild(task);

        // cerate a close button and append it to the list item
        var spanClose = document.createElement("span");
        var close = document.createTextNode("\u274C");
        spanClose.className = "close";
        spanClose.appendChild(close);
        li.appendChild(spanClose);

        // get the entered value from user and add it to the task
        const e = document.getElementById("plus-btn-value-select");
        const strUser = e.options[e.selectedIndex].text;
        var taskValue = document.createElement("p");
        taskValue.innerHTML = strUser;
        li.appendChild(taskValue);

        // append the list item to the list
        list.appendChild(li);
        input.value = "";
    }

    return false // stop the form from submitting to another page 
}


// target the items created dynamically
list.addEventListener("click", function (ev) {
    const target = ev.target;
    if (target.className == "check") {
        target.parentNode.classList.toggle("checked");
    }
    if (ev.target.className == "close") {
        target.parentNode.style.display = "none";
    }
});


// toggle dropdown content when clicking the plus button
const PlusButton = document.getElementById("plus-btn");
PlusButton.onclick = () => {
    const dropdown = document.getElementById("dropdown");
    dropdown.classList.toggle("show");
}


