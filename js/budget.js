// select buttons
const taskBtn = document.querySelector(".tab1");
const wishBtn = document.querySelector(".tab2");
const allBtn = document.querySelector(".tab3");

// select lists 
const taskEl = document.querySelector("#task");
const wishEl = document.querySelector("#wish");
const allEl = document.querySelector("#all");
// select amounts
const balanceAmount = document.querySelector(".balance .value");
const incomeAmount = document.querySelector(".income-total");
const expensesAmount = document.querySelector(".expenses-total");

// select lists
const taskList = document.querySelector("#task .list");
const wishList = document.querySelector("#wish .list");
const allList = document.querySelector("#all .list");

// select the input fields and the buttons adding tasks
const addTask = document.querySelector(".add-task");
const addWish = document.querySelector(".add-wish");
const taskTitle = document.querySelector("#task-title-input");
const taskAmount = document.querySelector("#task-amount-input");
const wishTitle = document.querySelector("#wish-title-input");
const wishAmount = document.querySelector("#wish-amount-input");

// add eventlisteners to taskBtn, wishBtn and allBtn
// when the button is clicked, the btn becomes emphasized, and the corresponding list is shown to user
taskBtn.addEventListener("click", () => {
    active(taskBtn);
    inactive([wishBtn, allBtn]);
    show(taskEl);
    hide([wishEl, allEl]);
})

wishBtn.addEventListener("click", () => {
    active(wishBtn);
    inactive([taskBtn, allBtn]);
    show(wishEl);
    hide([taskEl, allEl]);
})

allBtn.addEventListener("click", () => {
    active(allBtn);
    inactive([taskBtn, wishBtn]);
    show(allEl);
    hide([taskEl, wishEl]);
})

function active(element) {
    element.classList.add("active");
}

function inactive(elements) {
    elements.forEach(element => {
        element.classList.remove("active");
    })
}

function show(element) {
    element.classList.remove("hide");
}

function hide(elements) {
    elements.forEach(element => {
        element.classList.add("hide");
    })

}



// create an array to store all added taks and wishes
// look if there is saved data is local storage
ENTRY_LIST = JSON.parse(localStorage.getItem("entry_list")) || [];
updateUI();
updateAccount();

// get the current time in the form of "yyyy-mm-dd"
function GetTime() {
    let now = new Date();
    let yyyy = now.getFullYear();
    let mm = now.getMonth();
    if (mm < 10) {
        mm = '0' + mm;
    }
    let dd = now.getDate();
    return yyyy + '-' + mm + '-' + dd
}

// when the addIncome is clicked, create a variable called task with its type, title and amount
// then store it at the end of the ENTRY_LIST array
addTask.addEventListener("click", () => {
    if (!taskTitle.value || !taskAmount.value) {
        return;
    }
    let task = {
        type: "task",
        status: "unchecked",
        title: taskTitle.value,
        amount: parseFloat(taskAmount.value),
        date: GetTime()
    }
    ENTRY_LIST.push(task);

    // reset inputs to blank
    clearInput([taskTitle, taskAmount]);
    // update UI
    updateUI();
})

// whtn the addExpense is clicked, create a variable called wish with its type, title and amount
// then store it at the end of the ENTRY_LIST array
addWish.addEventListener("click", () => {
    if (!wishTitle.value || !wishAmount.value) {
        return;
    }
    let wish = {
        type: "wish",
        status: "unchecked",
        title: wishTitle.value,
        amount: parseFloat(wishAmount.value),
        date: GetTime()
    }
    ENTRY_LIST.push(wish);

    // reset inputs to blank
    clearInput([wishTitle, wishAmount]);
    // update UI
    updateUI();
})

// clear inputs
function clearInput(inputs) {
    inputs.forEach(input => {
        input.value = "";
    })
}


function updateUI() {
    // clear lists
    clearLists([taskList, wishList, allList]);

    createDate();

    // load entry items to list 
    ENTRY_LIST.forEach((entry, index) => {
        if (entry.type == "task") {
            // if entry type is task, load entries to task list
            showEntry(taskList, index, entry.type, entry.status, entry.title, entry.amount);
        }
        if (entry.type == "wish") {
            // if entry type is wish, load entries to wish list
            showEntry(wishList, index, entry.type, entry.status, entry.title, entry.amount);
        }
        showallEntry(index, entry.type, entry.status, entry.title, entry.amount, entry.date);
    })
    localStorage.setItem("entry_list", JSON.stringify(ENTRY_LIST));
}

function clearLists(lists) {
    lists.forEach(list => {
        list.innerHTML = "";
    })
}

// get entries from ENTRY_LIST and then insert them one by one to the list 
function showEntry(list, id, type, status, title, amount) {
    if (status == "unchecked") {
        // create a HTML element for each entry
        let entry =
            `<li id="${id}" class="${type} unchecked">
                <input class="checkbox" type="checkbox"/>
                <div class="entry">${title}: $${amount}</div>
                <div class="edit"></div>
                <div class="delete"></div>
            </li>`

        // insert the created element to html list 
        const position = "afterbegin";
        list.insertAdjacentHTML(position, entry);
    }
}

// create a div element for displaying each date when the correponding tasks were created
function createDate() {
    const monthName = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"];
    // get the date of each entry from ENTRY_LIST and store it in an array called "dates"
    let dates = [];
    ENTRY_LIST.forEach(entry => {
        dates.push(entry.date);
    })

    // use a "new set" to store ONCE all elements of the dates array to a temporary non repetitive date array
    const datesNonRepetitive = new Set(dates);

    datesNonRepetitive.forEach(date => {
        // create a div element to display the date when the correponding tasks were created
        const divDate = document.createElement("div");
        const mm = document.createElement("span"); // a span to display current month
        const dd = document.createElement("span");  // a span to display current day
        const coma = document.createTextNode(", ");
        const Whitespace = document.createTextNode(" ");
        const yyyy = document.createElement("span");    // a span to display current year

        divDate.className = "date";
        divDate.id = date;

        // for any given entry, its created date is stored in the format of yyyy-mm-dd inside the ENTRY_LIST
        // yyyy is a substing with an index of 0-4, mm 5-7 and dd 8-10
        yyyy.innerHTML = date.substring(0, 4);
        let i;
        if (date.substring(5, 7).startsWith('0')) {
            i = date.substring(6, 7); // if dd starts with 0, which means 01, 02, 03... then only get the second number, 1, 2, 3...
        }
        else {
            i = date.substring(5, 7); // for month like 10, 11, 12
        }
        mm.innerHTML = monthName[i];
        dd.innerHTML = date.substring(8, 10);

        // append created date span to divDate
        divDate.appendChild(mm);
        divDate.appendChild(Whitespace);
        divDate.appendChild(dd);
        divDate.appendChild(coma);
        divDate.appendChild(yyyy);

        // insert the created divDate to allList
        const position = "afterbegin";
        allList.insertAdjacentElement(position, divDate);
    })
}


function showallEntry(id, type, status, title, amount, date) {
    // find the corresponding div where we should insert the entry
    const div = document.getElementById(date);
    const position = "afterend";

    if (status == "unchecked") {
        // create a HTML element for each entry
        let entry =
            `<li id="${id}" class="${type} unchecked">
                <div class="entry">${title}: $${amount}</div>
                <div class="edit"></div>
                <div class="delete"></div>
            </li>`

        // insert the created element to html list 
        div.insertAdjacentHTML(position, entry);
    }

    if (status == "checked") {
        // create a HTML element for each entry
        let entry =
            `<li id="${id}" class="${type} checked">
                <div class="entry">${title}: $${amount}</div>
                <div class="edit"></div>
                <div class="delete"></div>
            </li>`

        // insert the created element to html list 
        div.insertAdjacentHTML(position, entry);
    }
}

// add eventlistener to the unchecked
taskList.addEventListener("click", btnHandler);
wishList.addEventListener("click", btnHandler);
allList.addEventListener("click", btnHandler);

function btnHandler(event) {
    // get the parentNode li of the button
    const targetBtn = event.target;
    const entry = targetBtn.parentNode;

    if (targetBtn.className == "checkbox") {
        // when the unchecked is clicked, add the correponding amount to the income, update UI, update account
        updateEntryStatus(entry);
        updateAccount();
        updateUI();
    }

    if (targetBtn.className == "edit") {
        // when the edit btn is clicked, delete the entry from ENTRY_LIST, update UI, update account 
        // and put entry title and entry amount back to inputs 
        editEntry(entry);
        updateAccount();
        updateUI();
    }

    if (targetBtn.className == "delete") {
        // when the trash btn is clicked, delete the entry from ENTRY_LIST, update UI
        deleteEntry(entry);
        updateAccount();
        updateUI();
    }
}


// when the edit button is clicked, put the title and name back to its input field and delete the entry
function editEntry(entry) {
    let ENTRY = ENTRY_LIST[entry.id];

    if (ENTRY.type == "task") {
        taskTitle.value = ENTRY.title;
        taskAmount.value = ENTRY.amount;
        active(taskBtn);
        inactive([wishBtn, allBtn]);
        show(taskEl);
        hide([wishEl, allEl]);
    } else if (ENTRY.type == "wish") {
        wishTitle.value = ENTRY.title;
        wishAmount.value = ENTRY.amount;
        active(wishBtn);
        inactive([taskBtn, allBtn]);
        show(wishEl);
        hide([taskEl, allEl]);
    }

    deleteEntry(entry);
}

// delete the entry from ENTRY_LIST (entry id = index)
function deleteEntry(entry) {
    ENTRY_LIST.splice(entry.id, 1);
}

// change the status of the entry from "unchecked" to "checked"
function updateEntryStatus(entry) {
    ENTRY_LIST[entry.id].status = "checked";
}


function updateAccount() {
    // update balance, income and expenses amount 
    // initialize variables of balance, income, and expenses to 0
    let balance = 0, income = 0, expenses = 0;

    // determine sign of balance
    let sign = (income >= expenses) ? "$" : "-$";


    ENTRY_LIST.forEach(entry => {
        if (entry.type == "task" & entry.status == "checked") {
            // if the entry type is task, then add it to the income value
            income += entry.amount;
        }
        else if (entry.type == "wish" & entry.status == "checked") {
            // if the entry type is wish, then add it to the expenses value 
            expenses += entry.amount;
        }
    })
    // caculate balance 
    balance = Math.abs(income - expenses);

    // update amounts 
    balanceAmount.innerHTML = `<small>${sign}</small>${balance}`;
    incomeAmount.innerHTML = `<small>$</small>${income}`;
    expensesAmount.innerHTML = `<small>$</small>${expenses}`;
}
