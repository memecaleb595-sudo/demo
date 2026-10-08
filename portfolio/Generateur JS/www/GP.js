// =======================
// Récupération des éléments
// =======================

const password = document.getElementById("password");
const copyBtn = document.getElementById("copy");
const generateBtn = document.getElementById("generate");

const length = document.getElementById("length");
const lengthValue = document.getElementById("lengthValue");

const uppercase = document.getElementById("lettre");
const lowercase = document.getElementById("minuscules");
const numbers = document.getElementById("chiffres");
const symbols = document.getElementById("caractere");
length.addEventListener("input", function () {
    lengthValue.textContent = length.value;
});


function generatePassword() {

    let characters = "";

    const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
    const numberCharacters = "0123456789";
    const symbolCharacters = "!@#$%^&*()_+-=[]{}<>?";

    if (uppercase.checked) {
        characters += uppercaseLetters;
    }

    if (lowercase.checked) {
        characters += lowercaseLetters;
    }

    if (numbers.checked) {
        characters += numberCharacters;
    }

    if (symbols.checked) {
        characters += symbolCharacters;
    }

    if (characters === "") {
        alert("Veuillez sélectionner au moins une option.");
        return;
    }

    let generatedPassword = "";

    for (let i = 0; i < length.value; i++) {

        const randomIndex = Math.floor(Math.random() * characters.length);

        generatedPassword += characters[randomIndex];

    }

    password.value = generatedPassword;

}

generateBtn.addEventListener("click", generatePassword);

generatePassword();

copyBtn.addEventListener("click", function () {

    if (password.value === "") {
        return;
    }

    navigator.clipboard.writeText(password.value);

    alert("Mot de passe copié !");

});