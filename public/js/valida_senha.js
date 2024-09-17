const passwordInput = document.getElementById('senha');
const lengthRequirement = document.getElementById('length');
const specialRequirement = document.getElementById('special');
const uppercaseRequirement = document.getElementById('uppercase');
const lowercaseRequirement = document.getElementById('lowercase');
const numberRequirement = document.getElementById('number');
const form = document.getElementById('registrationForm');

function validatePassword() {
    const password = passwordInput.value;

    const lengthValid = password.length >= 8;
    const specialValid = /[!-@#$%^&*]/.test(password);
    const uppercaseValid = /[A-Z]/.test(password);
    const lowercaseValid = /[a-z]/.test(password);
    const numberValid = /\d/.test(password);

    lengthRequirement.classList.toggle('valid', lengthValid);
    lengthRequirement.classList.toggle('invalid', !lengthValid);

    specialRequirement.classList.toggle('valid', specialValid);
    specialRequirement.classList.toggle('invalid', !specialValid);

    uppercaseRequirement.classList.toggle('valid', uppercaseValid);
    uppercaseRequirement.classList.toggle('invalid', !uppercaseValid);

    lowercaseRequirement.classList.toggle('valid', lowercaseValid);
    lowercaseRequirement.classList.toggle('invalid', !lowercaseValid);

    numberRequirement.classList.toggle('valid', numberValid);
    numberRequirement.classList.toggle('invalid', !numberValid);

    return lengthValid && specialValid && uppercaseValid && lowercaseValid && numberValid;
}

passwordInput.addEventListener('input', validatePassword);

form.addEventListener('submit', function(event) {
    if (!validatePassword()) {
        event.preventDefault(); // Prevent form submission
        alert('Por favor, corrija os requisitos da senha antes de enviar o formulário.');
    }
});
