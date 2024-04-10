const form = document.getElementById("myForm");
const allBlocks = document.querySelectorAll(".block");
const submitButton = document.querySelector(".submitButton");


// custom functions:

function customCheckCharacter(inputValue) {
   for(let i=0; i<inputValue.length; i++)
        if( !((inputValue[i] >= 'a' && inputValue[i] <= 'z') || (inputValue[i] >= 'A' && inputValue[i] <= 'Z'))
            || !(inputValue.length >= 4 && inputValue.length <= 10)
        )
        return false;
    return true;
}


function customEmailCheck(inputValue) {

    if(!inputValue.includes("@") || inputValue[inputValue.indexOf("@")+1] === ".") return false
     if(inputValue.indexOf("@") === 0 || inputValue[0] === "." || 
     (inputValue[inputValue.length-1] === "@" || inputValue[inputValue.length-1] === ".") ) return false;
    return true;
}

function customPhoneCheck(inputValue) {
    if(inputValue.length !== 10) return false;

    for(let i=0; i<inputValue.length; i++) {
        if( ((inputValue[i] >= 'a' && inputValue[i] <= 'z') || (inputValue[i] >= 'A' && inputValue[i] <= 'Z')) )
        return false;
    }
    return true;
}

function customPasswordCheck(inputValue) {
    if( !((inputValue.length >= 8) && (inputValue.length <= 16))) 
        return false;

    let upperCaseFound = false;
    for(let i=0; i<inputValue.length; i++) {
        if(inputValue[i] >= 'A' && inputValue[i] <= 'Z')
            upperCaseFound = true;
    }
    if(!upperCaseFound) return false;

    return true;
}

// to select a perticular input
const getValuesBasedOnName = {
    "firstname": 0,
    "lastname": 1,
    "email": 2,
    "password": 3,
    "phonenumber": 4
}

function checkEmpty(inputValue) {
    if(!inputValue) return false;
    return true;
}

function checkCharacter(inputValue) {
    let charRegex = /^[a-zA-Z]{4,10}$/;
    if(!charRegex.test(inputValue)) return false;
    return true;
}

function checkEmail(inputValue) {
    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(!emailRegex.test(inputValue)) return false;
    return true;
}

function checkPassword(inputValue) {
    let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;
    if(!passwordRegex.test(inputValue)) return false;
    return true;
}

function checkPhoneNumber(inputValue) {
    let phoneNumberRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    if(!phoneNumberRegex.test(inputValue)) return false;
    return true;
}

function getMessage(index, message) {
    allBlocks[index].lastElementChild.textContent = message;
}

function handleChange(event, name) {
   const inputValue = event.target.value;
   const index = getValuesBasedOnName[name];
   let errorFound = false;
   
   if(!checkEmpty(inputValue)) {
       allBlocks[index].lastElementChild.textContent = "Field cannot be empty..!";
        errorFound = true;
   }else if(name === "firstname" && !checkCharacter(inputValue) || 
            name === "lastname" && !checkCharacter(inputValue)) {
        getMessage(index, "min 4, max 10 chars, Numbers and special characters are not allowed..!");
        errorFound = true;
   }else if(name === "email" && !checkEmail(inputValue)) {
        getMessage(index, "Not a valid email..!");
        errorFound = true;
   }else if(name === "password" && !checkPassword(inputValue)) {
        getMessage(index, "min 8 and max 15 one lower, one upper case, one special character..!");
        errorFound = true;
   }else if(name === "phonenumber" && !checkPhoneNumber(inputValue)) {
        getMessage(index, "Not a valid phone number..!");
        errorFound = true;
    }
   else {
        allBlocks[index].lastElementChild.classList.remove("see");
        errorFound = false;
   }    

   if(errorFound) {
        allBlocks[index].lastElementChild.classList.add("see");
        submitButton.disabled = true; submitButton.style.backgroundColor = "grey";
    }
   else { allBlocks[index].lastElementChild.classList.remove("see");
       submitButton.disabled = false; submitButton.style.backgroundColor = "blueviolet";
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const firstName = form.elements[0].value;
    const lastName = form.elements[1].value;
    const email = form.elements[2].value;
    const password = form.elements[3].value;
    const phoneNumber = form.elements[4].value;
    let errorFound = false;

    [firstName, lastName, email, password, phoneNumber].some((value, index) => {
        if(!value) {
            allBlocks[index].lastElementChild.classList.add("see");
            getMessage(index, "field cannnot be empty..!"); errorFound = true;
        }
    });
    if(errorFound) return;
    
    const obj = {
        firstName,
        lastName,
        email,
        password,
        phoneNumber
    }

    const jsonData = JSON.stringify(obj);
    localStorage.setItem("formData", jsonData);
    form.reset();
    location.href = "display.html";
});
