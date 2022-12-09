let regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
let addressRegex = /^[a-zA-Z02-9]$/;

let firstName = document.querySelector(".first-name");
let lastName = document.querySelector(".last-name");
let male = document.querySelector(".male-gender");
let female = document.querySelector(".female-gender");
let address = document.querySelector(".address-field");
let check = document.querySelector(".check-box-field");
let isValid;
document.querySelector(".form").addEventListener("submit", function (e) {
  e.preventDefault();
  validate(firstName, regName, 4, 15);
  validate(lastName, regName, 4, 15);
  radioValidate();
  validate(address, addressRegex, 4, 60);
  checkValidate();
  if (isValid == true) {
    alert("your form has been submitted");
    form.reset();
  }
});

function validate(input, regex, min, max) {
  const inputGroup = input.parentElement;
  errorMessage = inputGroup.querySelector(".error");
  //  console.log(inputGroup);
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
    // console.log();
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

