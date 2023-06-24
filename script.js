const lengthSlider = document.querySelector(".pass-length input"),
options = document.querySelectorAll(".options input"),
copyIcon = document.querySelector(".copy"),
passwordInput = document.querySelector("input")
passIndicator = document.querySelector(".pass-indicator"),
generatebtn = document.querySelector(".generate"),
imgReaction = document.querySelector("img.reaction");

// object for characters -

const characters = {
    lowercase : "abcdefghijklmnopqrstuvwxyz",
    upprcase : "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers : "0123456789",
    symbols : "!@$%^*()+="
}
const generatePassword = () => {
    let staticPassword = ""
    let randomPassword = ""
    let excludeDuplicate =  false
    let passwordLength = lengthSlider.value

    options.forEach(option => {
        if(option.checked){
                if(option.id !== "exc-duplicate" && option.id !== "spaces"){
                    staticPassword += characters[option.id]
                }
                else if(option.id === "spaces"){
                    staticPassword += ` ${staticPassword} `
                }
                else {
                    excludeDuplicate = true
                }
        }

    })
    

    for(let i=0;i<passwordLength;i++){
        let randomChar = staticPassword[Math.floor(Math.random()*staticPassword.length)]
        if(excludeDuplicate){


            !randomPassword.includes(randomChar) || randomChar == " " ? randomPassword += randomChar : i--;
        }
        else{
            randomPassword += randomChar
        }
    }
    passwordInput.value = randomPassword
}

const updatePassIndicator = () =>{
    if(lengthSlider.value <=7){
        passIndicator.id = "weak"
        imgReaction.src = "img/smileHigh.svg"
    }
    else if(lengthSlider.value <= 16){
        passIndicator.id = "medium"
        imgReaction.src = "img/smileNeutral.svg"
    }
    else{
        passIndicator.id  = "strong"
        imgReaction.src = "img/angry.svg"
    }
}

const updateSlider = () => {
    document.querySelector(".pass-length span").innerText =  lengthSlider.value
    generatePassword();
    updatePassIndicator();
}
updateSlider();

const copyPassword = () => {
    navigator.clipboard.writeText(passwordInput.value)
    copyIcon.innerText = "check"
    copyIcon.style.color = "lightgreen"
    setTimeout(() => {
        copyIcon.innerText = "copy_all"
        copyIcon.style.color = "#707070"
    },1500)
}


copyIcon.addEventListener("click",copyPassword)
lengthSlider.addEventListener("input",updateSlider)
generatebtn.addEventListener("click",generatePassword)

