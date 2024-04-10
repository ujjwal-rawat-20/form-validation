
window.onload = () => {
    const formData = localStorage.getItem('formData');
    const dataParent = document.querySelector(".formDataContainer");
    const retrievedObject = JSON.parse(formData);

    Object.keys(retrievedObject).forEach(key => {
        const dataBlock = document.createElement("div");
        const dataLabel = document.createElement("p");
        const data = document.createElement("p");

        dataLabel.innerText = key;
        dataLabel.classList.add("dataLabel");

        data.innerText = retrievedObject[key];
        data.classList.add("data");

        dataBlock.append(dataLabel, data);
        dataBlock.classList.add("dataBlock");
        dataParent.appendChild(dataBlock); 
    });
};




// if(key === "password") {
//     let prefix = "****";
//     let passwrd = retrievedObject[key].split("");
//     let newPassword = passwrd.slice(-3);
//     data.innerText = prefix + newPassword.join("");
// }