/* www.youtube.com/CodeExplained */

// select elements
const balanceEl = document.querySelector(".balance .value");
const incomeTotalEl = document.querySelector(".income-total");
const outcomeTotalEl = document.querySelector(".outcome-total");
const expenseEl = document.querySelector("#expense");
const incomeEl = document.querySelector("#income");
const outcomeEl = document.querySelector("#outcome");
const allEl = document.querySelector("#all");
const expenseList = document.querySelector("#expense .list");
const incomeList = document.querySelector("#income .list");
const allList = document.querySelector("#all .list");


// select buttons
const incomeBtn = document.querySelector(".tab1");
const expenseBtn = document.querySelector(".tab2");
const allBtn = document.querySelector(".tab3");


// input buttons
const addExpense = document.querySelector(".add-expense");
const expenseTitle = document.querySelector("#expense-title-input");
const expenseAmount = document.querySelector("#expense-amount-input");

const addIncome = document.querySelector(".add-income");
const incomeTitle = document.querySelector("#income-title-input");
const incomeAmount = document.querySelector("#income-amount-input");


// variables
let ENTRY_LIST;
let balance = 0, income = 0, outcome = 0;

const DELETE = "delete", EDIT = "edit";

// look if there is saved data is local storage
ENTRY_LIST = JSON.parse(localStorage.getItem("entry_list")) || [];
updateUI();

// event listeners for buttons
expenseBtn.addEventListener("click", () => {
    show(expenseEl);
    hide([incomeEl, allEl]);
    active(expenseBtn);
    inactive([incomeBtn, allBtn]);
});
incomeBtn.addEventListener("click", () => {
    show(incomeEl);
    hide([expenseEl, allEl]);
    active(incomeBtn);
    inactive([expenseBtn, allBtn]);
});
allBtn.addEventListener("click", () => {
    show(allEl);
    hide([expenseEl, incomeEl]);
    active(allBtn);
    inactive([expenseBtn, incomeBtn]);
});

// add event-listeners to ADD buttons
addExpense.addEventListener("click", () => {
    // if one of the input is empty, then exit
    if (!expenseTitle.value || !expenseAmount.value) return;

    // save the entry to ENTRY_LIST
    let expense = {
        type: "expense",
        title: expenseTitle.value,
        amount: parseFloat(expenseAmount.value),
    }
    ENTRY_LIST.push(expense);

    updateUI();
    clearInput([expenseTitle, expenseAmount])
});
addIncome.addEventListener("click", () => {
    // if one of the input is empty, then exit
    if (!incomeTitle.value || !incomeAmount.value) return;

    // save the entry to ENTRY_LIST
    let income = {
        type: "income",
        title: incomeTitle.value,
        amount: parseFloat(incomeAmount.value),
    }
    ENTRY_LIST.push(income);

    updateUI();
    clearInput([incomeTitle, incomeAmount])
});

// add eventlisteners to edit and delete buttons
incomeList.addEventListener("click", deleteOrEdit);
expenseList.addEventListener("click", deleteOrEdit);
allList.addEventListener("click", deleteOrEdit);


// helpers

function deleteOrEdit(event) {
    const targetBtn = event.target;
    const entry = targetBtn.parentNode;

    if (targetBtn.id == DELETE) {
        deleteEntry(entry);
    } else if (targetBtn.id == EDIT) {
        editEntry(entry);
    }
}

function deleteEntry(entry) {
    ENTRY_LIST.splice(entry.id, 1);

    updateUI();
}

function editEntry(entry) {
    let ENTRY = ENTRY_LIST[entry.id];

    if (ENTRY.type == "expense") {
        expenseTitle.value = ENTRY.title;
        expenseAmount.value = ENTRY.amount;
    } else if (ENTRY.type == "income") {
        incomeTitle.value = ENTRY.title;
        incomeAmount.value = ENTRY.amount;
    }

    deleteEntry(entry);
}

function updateUI() {
    // caculate income, outcome and balance
    income = caculateTotal("income", ENTRY_LIST);
    outcome = caculateTotal("expense", ENTRY_LIST);
    balance = Math.abs(caculateBalance(income, outcome));

    // determine sign of balance
    let sign = (income >= outcome) ? "$" : "-$";

    // update income, outcome and balance
    incomeTotalEl.innerHTML = `<small>$</small>${income}`;
    outcomeTotalEl.innerHTML = `<small>$</small>${outcome}`;
    balanceEl.innerHTML = `<small>${sign}</small>${balance}`;

    // clear elements
    clearElement([expenseList, incomeList, allList])

    // reload elements
    ENTRY_LIST.forEach((entry, index) => {
        if (entry.type == "expense") {
            showEntry(expenseList, entry.type, entry.title, entry.amount, index);
        } else if (entry.type == "income") {
            showEntry(incomeList, entry.type, entry.title, entry.amount, index);
        }
        showEntry(allList, entry.type, entry.title, entry.amount, index);
    })

    updateChart(income, outcome);

    localStorage.setItem("entry_list", JSON.stringify(ENTRY_LIST));
}

function showEntry(list, type, title, amount, id) {
    const entry = `<li id="${id}" class="${type}">
                        <div class="entry">${title}: $${amount}</div>
                        <div id="edit"></div>
                        <div id="delete"></div>
                    </li>`
    const position = "afterbegin";

    list.insertAdjacentHTML(position, entry);
}

function clearElement(elements) {
    elements.forEach(element => {
        element.innerHTML = "";
    })
}

function caculateTotal(type, list) {
    let sum = 0;

    list.forEach(entry => {
        if (entry.type == type) {
            sum += entry.amount;
        }
    })
    return sum;
}

function caculateBalance(income, outcome) {
    return income - outcome;
}

function clearInput(inputs) {
    inputs.forEach(input => {
        input.value = "";
    })
}

function show(element) {
    element.classList.remove("hide");
}

function hide(elements) {
    elements.forEach(element => {
        element.classList.add("hide");
    });
}

function active(element) {
    element.classList.add("active");
}

function inactive(elements) {
    elements.forEach(element => {
        element.classList.remove("active");
    });
}