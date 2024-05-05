import { v4 as uuidv4 } from "../node_modules/uuid/dist/esm-browser/index.js";
const locationInput = document.getElementById("locationInput");
const submitBtn = document.getElementById("submit-btn");
const saveChangesBtn = document.getElementById("save-changes-btn");
const addLocationBtn = document.getElementById("add-location-btn");

const tableBody = document
  .getElementById("myTable")
  .querySelector("#tableBody");

function storeLocations() {
  locations = JSON.stringify(locations);
  localStorage.setItem("locations", locations);
}
function getLocations() {
  locations = localStorage.getItem("locations");
}
function parseLocations() {
  locations = JSON.parse(locations);
}

//   variables
let locations,
  locationValue,
  actionsCell,
  newRow,
  myModal,
  deleteButton,
  editButton,
  selectedLocation,
  locationId,
  editedLocation,
  findIndex;

// add location function
const addLocation = (name) => {
  if (locationInput.value === "" || locationInput.value === undefined) {
    alert("Location must not be empty");
    return;
  }
  const id = uuidv4();
  let newLocation = {
    id: id,
    name: name,
  };
  getLocations();
  if (locations === null) {
    locations = [];
  } else {
    parseLocations();
  }
  locations.push(newLocation);
  storeLocations();
};

submitBtn.addEventListener("click", function () {
  locationValue = locationInput.value.trim();
  //   console.log(locationValue);
  addLocation(locationValue);
  if (locationValue != "" && locationValue != undefined) {
    setTimeout(() => {
      myModal.hide();
      document.querySelector(".modal-backdrop").remove();
      locationInput.value = "";
    }, 10);
  }
  displayLocations();
});

// display location function
const displayLocations = () => {
  tableBody.innerHTML = "";
  getLocations();

  if (locations !== null) {
    parseLocations();
    for (var i = 0; i < locations.length; i++) {
      newRow = document.createElement("tr");
      newRow.setAttribute("data-location-id", locations[i].id);
      let slCell = document.createElement("td");
      actionsCell = document.createElement("td");
      slCell.innerHTML = i + 1;
      newRow.appendChild(slCell);
      for (let key in locations[i]) {
        let newCell = document.createElement("td");
        newCell.innerHTML = locations[i][key];
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

      deleteButton.addEventListener("click", deleteLocation);
      editButton = actionsCell.querySelector(".edit-Button");

      editButton.addEventListener("click", editLocation);
    }
    saveChangesBtn.addEventListener("click",modalHandler);
  }
};

//load user function
const loadLocations = () => {
  locations = getLocations() || [];
  displayLocations();
};

// Call loadUsers when the page loads
window.addEventListener("load", loadLocations);

// create  modal instance
myModal = bootstrap.Modal.getOrCreateInstance(
  document.getElementById("exampleModal")
);

addLocationBtn.addEventListener("click", function () {
  myModal.show();
  locationInput.value="";
  saveChangesBtn.style.display = "none";
  submitBtn.style.display = "block";
});

// delete location function

const deleteLocation = (e) => {
  selectedLocation = e.target.closest("tr");
  locationId = selectedLocation.getAttribute("data-location-id");
  getLocations();
  if (locations != null) {
    parseLocations();
    locations = locations.filter(function (location) {
      return location.id != locationId;
    });
    storeLocations();
    displayLocations();
  }
};

// edit location function
const editLocation = (e) => {
  myModal.show();
  submitBtn.style.display = "none";
  saveChangesBtn.style.display = "block";
  selectedLocation = e.target.closest("tr");
  locationId = selectedLocation.getAttribute("data-location-id");
  getLocations();
  if (locations != null) {
    parseLocations();
    locations.forEach((location) => {
      if (locationId === location.id) {
        editedLocation = document.getElementById("locationInput");
        editedLocation.value = location.name;
        console.log(editedLocation.value);
        
      }
    });
  }
//   findIndex = locations.findIndex((location) => locationId === location.id);
//   locations[findIndex].name = editedLocation.value;
//   console.log(locations[findIndex].name);
  
};

function modalHandler() {
    console.log(editedLocation.value);
    
  if (editedLocation.value === "" || editedLocation.value === undefined) {
    alert("Location must not be empty");
    return;
  }
  findIndex = locations.findIndex((location) => locationId === location.id);
  locations[findIndex].name = editedLocation.value;
  console.log(locations[findIndex].name);
  storeLocations();
  setTimeout(() => {
    myModal.hide();
    editedLocation.value = "";
  }, 10);
  displayLocations();
}
