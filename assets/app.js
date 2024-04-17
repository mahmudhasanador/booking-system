const addUserBtn = document.getElementById("userBtn");

const closeBtn = document.getElementById("close-btn");

const submitBtn = document.getElementById("submit-btn");

const nameInput = document.getElementById("nameInput");

const emailInput = document.getElementById("emailInput");

const tableBody = document
  .getElementById("myTable")
  .querySelector("#tableBody");

// console.log(tableBody);

let nameInputValue, emailInputValue, users;

// const { v4: uuidv4 } = require('uuid');
import { v4 as uuidv4 } from 'uuid';

// add user function
const addUser = (name, email) => {
  const  id = uuidv4();

  users = localStorage.getItem("users");
  
  if (users === null) {
    users = [];
  } else {
    users = JSON.parse(users);
  }
  const newUser = {
    name: name,
    email: email
  };
  newUser.id = id;
  users.push(newUser);
  users = JSON.stringify(users);
  localStorage.setItem("users", users);
};

nameInput.addEventListener("keyup", function (e) {
  nameInputValue = e.target.value;
});

emailInput.addEventListener("keyup", function (e) {
  emailInputValue = e.target.value;
});



submitBtn.addEventListener("click", function () {
  addUser(nameInputValue, emailInputValue);
});


// display user function
const displayUsers = () => {

  tableBody.innerHTML = "";
  users = localStorage.getItem("users");

  if (users !== null) {
    users = JSON.parse(users);

    for (var i = 0; i < users.length; i++) {
      let newRow = document.createElement("tr");
      let slCell = document.createElement("td");
      slCell.innerHTML = i+1;
      newRow.appendChild(slCell);
      for (let key in users[i]) {
        let newCell = document.createElement("td");
        newCell.innerHTML = users[i][key];
        newRow.appendChild(newCell);
      }
      tableBody.appendChild(newRow);
    }
  }
};

window.addEventListener('load', displayUsers);