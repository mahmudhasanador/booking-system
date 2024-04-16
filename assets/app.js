const addUserBtn = document.getElementById('userBtn');
// console.log(addUserBtn);
const closeBtn = document.getElementById('close-btn');
// console.log(closeBtn);
const submitBtn = document.getElementById('submit-btn');
// console.log(submitBtn);

const nameInput = document.getElementById('nameInput');
// console.log(nameInput);
const emailInput = document.getElementById('emailInput');
// console.log(emailInput);

let nameInputValue, emailInputValue;

//add user function
const addUser = (name,email)=>{
    
    let users = localStorage.getItem("users");
    if(users===null){
     users =[];
    } else{
        users = JSON.parse(users);
    }
    const newUser ={
        name: name,
        email: email
    }
    users.push(newUser);
    users = JSON.stringify(users);
    localStorage.setItem("users",users);
    
    }

nameInput.addEventListener('keyup', function(e){
nameInputValue = e.target.value;
// console.log(nameInputValue);
})

emailInput.addEventListener('keyup', function(e){
    emailInputValue = e.target.value;
    // console.log(emailInputValue);
})

submitBtn.addEventListener('click', function(){
    console.log(nameInputValue);
    console.log(emailInputValue);
    addUser(nameInputValue,emailInputValue);
})


