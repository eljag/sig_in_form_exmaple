//Values
const $form = document.querySelector(".form-container"); 
const $inputs = document.querySelectorAll(".form-container [required]");

let checkName,
    checkUsername,
    checkEmail,
    checkPassword;

const account = {};

//Functions

const isRequired = value =>  value === '' ? false : true;

const isBetween = (length, min, max) => length < min || length > max ? false : true;

const borderPaintInput = (element, result = true) =>{
    if(!result){
        element.classList.remove("success");
        element.classList.add("error");
    }else{
        element.classList.remove("error");
        element.classList.add("success");
    }
}

const nameValidation = (element) =>{

    if(!isBetween(element.value.trim().length, 3, 16)){
        borderPaintInput(element, false);
        setError(element, "Between 3 - 16 characters");
        checkName = false;
    }else{
        borderPaintInput(element);
        setError(element);
        checkName = true;
        account.name = element.value.trim();
    }
}

const userNameValidation = (userName) =>{
    const regex = /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
     if(!regex.test(userName.value.trim())){
        borderPaintInput(userName, false);
        setError(userName, "Between 8 - 20 characters");
        checkUsername = false;
     }else{
        borderPaintInput(userName);
        setError(userName);
        checkUsername = true;
        account.username = userName.value.trim();
     }
}

const emailValidation = email => {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(!regex.test(email.value.trim())){
        borderPaintInput(email, false);
        setError(email, "Please input the correct format email");
        checkEmail = false;
    }else{
        borderPaintInput(email);
        setError(email);
        checkEmail = true;
        account.email = email.value.trim();
    }
}

const passwordValidation = password =>{
    const regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
     if(!regex.test(password.value.trim())){
        borderPaintInput(password, false);
        setError(password, "The password character should have almost one uppercase, special characters, number and min 8 characters.");
        checkPassword = false;
     }else{
        borderPaintInput(password);
        setError(password);
        checkPassword = true;
        account.password = "hashEncripte(password)"
     }
};

function clearHTML(element){
    while(element.firstChild){
        element.removeChild(element.firstChild);
    }
}

function setError(elements, message = ""){
    clearHTML(elements);
    const $smallElement = elements.nextElementSibling;    
    $smallElement.innerText = message;
}

function getInputName(element){

    if(element.name === "name")
        nameValidation(element);

    if(element.name === "username")
        userNameValidation(element);

    if(element.name === "email")
        emailValidation(element);

    if(element.name === "password"){
        passwordValidation(element);
    }

}

//Events

document.addEventListener("keyup", e =>{
    if(e.target.matches(".form-container [required]")){
        getInputName(e.target);
    }
})

$inputs.forEach( input =>{

    input.addEventListener("blur", e => {

        if(!isRequired(e.target.value)){
            borderPaintInput(input, false);
            setError(input, "This field is required");
        }else{
            getInputName(e.target);
        }
        
    });
});

$form.addEventListener("submit", e =>{
    let validations = checkName && checkUsername && checkEmail && checkPassword;
    e.preventDefault();

    if(validations){
        console.log(JSON.stringify(account));
        Swal.fire(
            'You are registred succefully!',
            `Username: ${account.username}\n
             email: ${account.email}`,
            'success'
          );

    }
    
});

