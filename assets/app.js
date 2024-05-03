import { v4 as uuidv4 } from "../node_modules/uuid/dist/esm-browser/index.js";

const submitBtn = document.getElementById("submit-btn");
const saveBtn = document.getElementById("save-btn");
const addUserBtn = document.getElementById("add-user-btn");
const nameInput = document.getElementById("nameInput");
const emailInput = document.getElementById("emailInput");
const closeBtn = document.getElementById("close-btn");

const tableBody = document
  .getElementById("myTable")
  .querySelector("#tableBody");

let nameInputValue,
  emailInputValue,
  users,
  deleteButton,
  editButton,
  actionsCell,
  userId,
  editNameInp,
  editEmailInp,
  findIndex,
  myModal;

function storeUsers() {
  users = JSON.stringify(users);
  localStorage.setItem("users", users);
}
function getUsers() {
  users = localStorage.getItem("users");
}
function parseUsers() {
  users = JSON.parse(users);
}

let newUserWithId = {};

// add user function
const addUser = (name, email) => {
  if (name === "" || name === undefined) {
    alert("Name must not be empty!");

    return;
  }
  if (email === "" || email === undefined) {
    alert("Email must not be empty!");

    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const isValid = emailRegex.test(email);

  if (!isValid) {
    alert("Enter a valid email");
    return;
  }

  const id = uuidv4();
  getUsers();

  if (users === null) {
    users = [];
  } else {
    parseUsers();
  }
  const newUser = {
    name: name,
    email: email,
  };

  newUserWithId = {
    id: id,
    name: newUser.name,
    email: newUser.email,
  };

  users.push(newUserWithId);
  storeUsers();
};

// create  modal instance
myModal = bootstrap.Modal.getOrCreateInstance(
  document.getElementById("exampleModal")
  
);

submitBtn.addEventListener("click", function (e) {
  e.preventDefault();
  nameInputValue = nameInput.value.trim();
  emailInputValue = emailInput.value.trim();
  addUser(nameInputValue, emailInputValue);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const isValid = emailRegex.test(emailInputValue);

  if (
    nameInputValue != "" &&
    nameInputValue != undefined &&
    emailInputValue != "" &&
    emailInputValue != undefined &&
    isValid
  ) {
    setTimeout(() => {
      myModal.hide();
      document.querySelector(".modal-backdrop").remove();
      nameInput.value = "";
      emailInput.value = "";
    }, 10);
  }

  displayUsers();
});

// add user button
addUserBtn.addEventListener("click", function () {
  myModal.show();
  submitBtn.style.display = "block";
  saveBtn.style.display = "none";
});

// display user function
const displayUsers = () => {
  tableBody.innerHTML = "";
  getUsers();

  if (users !== null) {
    parseUsers();

    for (var i = 0; i < users.length; i++) {
      let newRow = document.createElement("tr");
      newRow.setAttribute("data-user-id", users[i].id);

      let slCell = document.createElement("td");
      actionsCell = document.createElement("td");
      slCell.innerHTML = i + 1;
      newRow.appendChild(slCell);
      for (let key in users[i]) {
        let newCell = document.createElement("td");
        newCell.innerHTML = users[i][key];
        newRow.appendChild(newCell);
      }

      actionsCell.innerHTML = `<div id ="myActions"> <button class="btn edit-Button"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
      <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
    </svg></button>
      <button class="btn delete-Button"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
      <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
    </svg></button> 
      </div>`;
      newRow.appendChild(actionsCell);
      tableBody.appendChild(newRow);

      deleteButton = actionsCell.querySelector(".delete-Button");
      editButton = actionsCell.querySelector(".edit-Button");

      deleteButton.addEventListener("click", deleteUser);

      editButton.addEventListener("click", function (e) {
        myModal.show();

        submitBtn.style.display = "none";
        saveBtn.style.display = "block";
        const selectedUser = e.target.closest("tr");

        userId = selectedUser.getAttribute("data-user-id");

        getUsers();

        if (users !== null) {
          parseUsers();
          users.forEach((user) => {
            if (userId === user.id) {
              editNameInp = document.getElementById("nameInput");
              editNameInp.value = user.name;

              editEmailInp = document.getElementById("emailInput");
              editEmailInp.value = user.email;
            }
          });

          saveBtn.removeEventListener("click", modalHandler);

          saveBtn.addEventListener("click", modalHandler);
        }
      });
    }
  }
};

//edit user function
function editUser() {
  if (editNameInp.value === "" || editNameInp.value === undefined) {
    alert("Name must not be empty!");
    return;
  }
  if (editEmailInp.value === "" || editEmailInp.value === undefined) {
    alert("Email must not be empty!");
    return;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const isValid = emailRegex.test(editEmailInp.value);
  if (!isValid) {
    alert("Enter a valid email");
    return;
  }

  findIndex = users.findIndex((user) => user.id === userId);
  users[findIndex].name = editNameInp.value;
  users[findIndex].email = editEmailInp.value;

  storeUsers();
}

// delete user function
const deleteUser = (e) => {
  const selectedUser = e.target.closest("tr");
  const userId = selectedUser.getAttribute("data-user-id");
  getUsers();
  if (users !== null) {
    parseUsers();

    users = users.filter(function (user) {
      return user.id != userId;
    });
  }

  storeUsers();
  displayUsers();
};

//load user function
const loadUsers = () => {
  users = getUsers() || [];
  displayUsers();
};

// Call loadUsers when the page loads
window.addEventListener("load", loadUsers);

closeBtn.addEventListener("click", function () {
  nameInput.value = "";
  emailInput.value = "";
});

function modalHandler() {
  editUser();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValid = emailRegex.test(editEmailInp.value);
  if (
    editNameInp.value != "" &&
    editNameInp.value != undefined &&
    editEmailInp.value != "" &&
    editEmailInp.value != undefined &&
    isValid
  ) {
    setTimeout(() => {
      myModal.hide();
      editNameInp.value = "";
      editEmailInp.value = "";
    }, 10);
  }
  displayUsers();
}
