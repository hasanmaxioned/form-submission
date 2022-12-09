let regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
let addressRegex = /^[a-zA-Z02-9]$/;

let firstName = document.querySelector(".first-name");
let lastName = document.querySelector(".last-name");
let male = document.querySelector(".male-gender");
let female = document.querySelector(".female-gender");
let address = document.querySelector(".address-field");
let check = document.querySelector(".check-box-field");
let arr = [];
let inputVal = document.querySelectorAll(".form input");
let dataStore = document.querySelector(".data-store");
let isValid;
document.querySelector(".form").addEventListener("submit", function (e) {
  e.preventDefault();
  validate(firstName, regName, 3, 15);
  validate(lastName, regName, 3, 15);
  radioValidate();
  validate(address, addressRegex, 4, 60);
  checkValidate();
  if (isValid == true) {
    alert("your form has been submitted");
    let user = {
      firstName: firstName.value,
      lastName: lastName.value,
      radio: (male.checked ? male.value : female.value),
      addr: address.value
    };
    arr.push(user);
    formData(arr);
    form.reset();
    console.log(arr);
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
  isValid = true;

  if (input.value == "") {
    errorMessage.classList.add("active");
    inputGroup.classList.add("active");
    errorMessage.innerText = "*Field is required";
    return (isValid = false);
  } else if (input.value.length < min || input.value.length > max) {
    errorMessage.classList.add("active");
    inputGroup.classList.add("active");
    errorMessage.innerText = "*It must be between " + min + " & " + max;
    return (isValid = false);
  } else if (regex.test(input.value)) {
    errorMessage.classList.add("active");
    inputGroup.classList.add("active");
    errorMessage.innerText = "*please Enter your valid " + input.name;
    return (isValid = false);
  } else {
    errorMessage.classList.remove("active");
    inputGroup.classList.remove("active");
  }
  return isValid;
}
function radioValidate() {
  const radioError = document.querySelector(".radio-error");
  if (male.checked != true && female.checked != true) {
    radioError.classList.add("active");
    radioError.innerText = "*please select your gender ";
    return (isValid = false);
  } else {
    radioError.classList.remove("active");
    return (isValid = true);
  }
}

function checkValidate() {
  const checkError = document.querySelector(".check-error");
  if (check.checked != true) {
    checkError.classList.add("active");
    checkError.innerText = "*please select our terms and condition ";
    return (isValid = false);
  } else {
    checkError.classList.remove("active");
    return (isValid = true);
  }
}

function formData(arr) {
  let empty = document.querySelectorAll(".data");
  if (empty) {
    empty.forEach(function (emp) {
      emp.parentElement.removeChild(emp);
    });
  }
  arr.forEach(function (element) {
    let dataStore = document.querySelector(".data-store");
    let dataList = document.createElement("li");
    dataList.className = "data";
    dataList.innerHTML = `<ul class="detail-list">
    <li class="details">${element.firstName}</li>
    <li class="details">${element.lastName}</li>
    <li class="details">${element.radio}</li>
    <li class="details">${element.addr}</li>
    <li class="details"><button class="edit-btn">edit</button></li>
    <li class="details"><button class="del-btn">delete</button></li>
  </ul>`;
    dataStore.appendChild(dataList);
    const delBtn = dataList.querySelector(".del-btn");
    delBtn.addEventListener("click", function () {
      dataList.remove();
    });

    const editBtn = dataList.querySelector(".edit-btn");
    editBtn.addEventListener("click", function () {
      firstName.value = element.firstName;
      lastName.value = element.lastName;
      address.value = element.address;
      if (male.checked === element.radio) {
        male.checked = true;
      } else {
        female.checked = true;
      }
    });
  });
}
