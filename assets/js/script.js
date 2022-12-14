let regName = /^[A-Za-z\s]*$/;
let addressRegex = /^[#.0-9a-zA-Z\s,-]+$/;
let firstName = document.querySelector(".first-name");
let lastName = document.querySelector(".last-name");
let male = document.querySelector(".male-gender");
let female = document.querySelector(".female-gender");
let address = document.querySelector(".address-field");
let check = document.querySelector(".check-box-field");
let arr = [];
let inputVal = document.querySelectorAll(".form input");
let dataStore = document.querySelector(".data-store");
let isEditMode = false;
let editIndex = -1;
document.querySelector(".form").addEventListener("submit", function (e) {
  e.preventDefault();
  let isAllFieldAcceptable =  validate(firstName, regName, 3, 15) && validate(lastName, regName, 3, 15) && radioValidate() && checkValidate() && validate(address, addressRegex, 4, 60);
  if (isAllFieldAcceptable) {
    if(isEditMode) {
      let row = document.getElementById(`${editIndex}`);
      // console.log(lastName.value);
     row.getElementsByClassName("user-first-name")[0].innerHTML  = firstName.value;
     row.getElementsByClassName("user-last-name")[0].innerHTML  = lastName.value;
     row.getElementsByClassName("user-gender")[0].innerHTML  = (male.checked ? male.value : female.value);
     row.getElementsByClassName("user-address")[0].innerHTML  = address.value;
     form.reset();
    } else {
      alert("your form has been submitted");
      let user = {
        firstName: firstName.value,
        lastName: lastName.value,
        radio: (male.checked ? male.value : female.value),
        addr: address.value
      };
      arr.push(user);
      formData(user, arr.indexOf(user));
      form.reset();
      // console.log(arr);
    }
  }
});
firstName.addEventListener("blur", function (e) {
  validate(firstName, regName, 3, 15);
});
lastName.addEventListener("blur", function (e) {
  validate(lastName, regName, 3, 15);
});
address.addEventListener("blur", function (e) {
  validate(address, addressRegex, 4, 60);
});
function validate(input, regex, min, max) {
  const inputGroup = input.parentElement;
  errorMessage = inputGroup.querySelector(".error");
  if (input.value == "") {
    errorMessage.classList.add("active");
    inputGroup.classList.add("active");
    errorMessage.innerText = "*Field is required";
    return false;
  } else if (input.value.length < min || input.value.length > max) {
    errorMessage.classList.add("active");
    inputGroup.classList.add("active");
    errorMessage.innerText = "*It must be between " + min + " & " + max;
    return false;
  } else if (!regex.test(input.value)) {
    errorMessage.classList.add("active");
    inputGroup.classList.add("active");
    errorMessage.innerText = "*please Enter your valid " + input.name;
    return false;
  } else {
    errorMessage.classList.remove("active");
    inputGroup.classList.remove("active");
    
  }
  return true;
}
function radioValidate() {
  const radioError = document.querySelector(".radio-error");
  if (male.checked != true && female.checked != true) {
    radioError.classList.add("active");
    radioError.innerText = "*please select your gender ";
    return false;
  } else {
    radioError.classList.remove("active");
    return true;
  }
}
function checkValidate() {
  const checkError = document.querySelector(".check-error");
  if (check.checked != true) {
    checkError.classList.add("active");
    checkError.innerText = "*please select our terms and condition ";
    return  false;
  } else {
    checkError.classList.remove("active");
    return true;
  }
}
function formData(user, position) {
    let dataStore = document.querySelector(".data-store");
    let dataList = document.createElement("li");
    dataList.className = "storage data";
    dataList.id = `${position}`;
    dataList.innerHTML = `<ul class="detail-list">
    <li class="user-first-name">${user.firstName}</li>
    <li class="user-last-name">${user.lastName}</li>
    <li class="user-gender">${user.radio}</li>
    <li class="user-address">${user.addr}</li>
    <li class="details"><button class="edit-btn" data-position="${position}">edit</button></li>
    <li class="details"><button class="del-btn" data-position="${position}">delete</button></li>
  </ul>`;
    dataStore.appendChild(dataList);
    const delBtn = dataList.querySelector(".del-btn");
    delBtn.addEventListener("click", function () {
      let position =  this.dataset.position;
      dataList.remove();
      arr.splice(position, position);
    });
    const editBtn = dataList.querySelector(".edit-btn");
    editBtn.addEventListener("click", function () {
      let position =  this.dataset.position;
      firstName.value = user.firstName;
      lastName.value = user.lastName;
      address.value = user.addr;
      if (male.value === user.radio) {
        male.checked = true;
      } else {
        female.checked = true;
      }
      isEditMode = true;
      editIndex = position;
    });
}