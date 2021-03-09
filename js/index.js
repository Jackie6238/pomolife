// select elements
const submit = document.querySelector('#submit');
const input = document.querySelector('#input');

const form = document.querySelector('form');

/* // class names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";
 */

// function addToDo() {
//     const task = input.value;
//     if (task) {
//         const item = `<li>${task}</li>`;
//         const position = "beforeend";
//         tasks.insertAdjacentHTML(position, item);
//         input.value = ''
//     }
//     return false;
// }
// form.onsubmit = addToDo;


/* <li class="item">
    <i class= ></i>
</li> */


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

    // append the list item to the list
    list.appendChild(li);
    input.value = "";
  }

  return false
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
