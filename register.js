function displayError(inputField, errorMessage) {
    inputField.classList.add('invalid');
    const errorElement = inputField.nextElementSibling;
    if (errorElement) {
        errorElement.textContent = errorMessage;
    }
  }
  
function removeError(inputField) {
    inputField.classList.remove('invalid');
    const errorElement = inputField.nextElementSibling;
    if (errorElement) {
        errorElement.textContent = '';
    }
}

function onCountryChange() {
    const country = document.getElementById('country');
    if (country.value !== '0') {
        removeError(country);
    }
}

function validateEmail(email) {
    // Regular expression for email validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    // Check if email is empty
    if (email === '') {
        return false;
    }

    // Check if email matches the regular expression
    if (!emailRegex.test(email)) {
        return false;
    }

    return true;
}

function validateGender(divGender) {
    var genderRadios = document.querySelectorAll('input[name="gender"]');
    let isGenderSelected = false;

    for (const genderRadio of genderRadios) {
        if (genderRadio.checked) {
            isGenderSelected = true;
            break;
        }
    }

    // Add error message
    var errorMessageElement = document.querySelector('.error-radio');
    if (!isGenderSelected) {
        errorMessageElement.textContent = 'Vui lòng chọn giới tính';
        divGender[0].classList.add('invalid'); // Thêm lớp 'invalid' cho div chứa radio button
    } else {
        errorMessageElement.textContent = '';
        divGender[0].classList.remove('invalid'); // Loại bỏ lớp 'invalid' nếu một lựa chọn được chọn
    }
}

// Add event listeners to remove error and 'invalid' class when the gender is selected
document.querySelectorAll('input[name="gender"]').forEach((radio) => {
    radio.addEventListener('change', function() {
        var divGender = document.getElementsByClassName('radio-gender');
        validateGender(divGender);
    });
});

function removeHobbyError() {
    const errorElement = document.querySelector('.checkboxes');
    removeError(errorElement);
}

document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
    checkbox.addEventListener('change', function() {
        removeHobbyError();
    });
});

function validatePassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{5,}$/;
    return passwordRegex.test(password);
}

function validateHobby() {
    var checkboxes = document.querySelectorAll('.checkbox_hobby');
    let isHobbySelected = false;

    checkboxes.forEach(function(checkbox) {
        if (checkbox.checked) {
            isHobbySelected = true;
        }
    });

    return isHobbySelected;
}

function validateNote() {
    var note = document.querySelector('.textarea-special textarea').value;
    return note.length <= 200;
}

function validateForm() {
    var fullName = document.getElementById('fullName');
    var email = document.getElementById('email');
    var country = document.getElementById('country');
    var divGender = document.getElementsByClassName('radio-gender');
    var password = document.getElementById('password');
    var confirmPassword = document.getElementById('confirmPassword');
    var checkbox_ex = document.querySelector('.checkboxes');
    var note = document.getElementById('textarea-note');

    let isValid = true;

    // Clear previous error messages
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach((errorMessage) => {
        errorMessage.textContent = '';
    });

    // Add event listeners to remove 'invalid' class and clear error messages when user starts typing
    fullName.addEventListener('input', function () {
        removeError(fullName);
    });

    email.addEventListener('input', function () {
        removeError(email);
    });

    password.addEventListener('input', function () {
        removeError(password);
    });
    
    
    confirmPassword.addEventListener('input', function () {
        removeError(confirmPassword);
    });

    note.addEventListener('input', function () {
        removeError(note);
    });

    country.addEventListener('change', onCountryChange);

    if (fullName.value.trim() === '') {
        displayError(fullName, 'Vui lòng điền họ và tên');
        isValid = false;
    }

    if (email.value.trim() === '') {
        displayError(email, 'Vui lòng điền email');
        isValid = false;
    }

    // Check if email is valid
    if (!validateEmail(email.value)) {
        displayError(email, 'Email không hợp lệ');
        isValid = false;
    }

    if (country.value === '0') {
        displayError(country, 'Vui lòng chọn quốc tịch');
        isValid = false;
    }else {
        removeError(country);
    }

    validateGender(divGender);

    if (password.value.trim() === '') {
        displayError(password, 'Vui lòng nhập mật khẩu');
        isValid = false;
    } else if (password.value.length < 8) {
        displayError(password, 'Mật khẩu phải có ít nhất 8 ký tự');
        isValid = false;
    } else if (!validatePassword(password.value)) {
        displayError(password, 'Mật khẩu phải chứa ít nhất một chữ cái viết thường, một chữ cái viết hoa, một số và một ký tự đặc biệt');
        isValid = false;
    } else {
        removeError(password); // Xóa thông báo lỗi của ô mật khẩu
    }
    
    if (confirmPassword.value.trim() === '') {
        displayError(confirmPassword, 'Vui lòng xác nhận mật khẩu');
        isValid = false;
    } else if (password.value !== confirmPassword.value) {
        displayError(confirmPassword, 'Mật khẩu không khớp');
        isValid = false;
        removeError(password); // Xóa thông báo lỗi của ô mật khẩu khi xác nhận mật khẩu không khớp
    } else {
        removeError(confirmPassword); // Xóa thông báo lỗi của ô xác nhận mật khẩu
    }

    if (!validateHobby()) {
        displayError(checkbox_ex, 'Vui lòng chọn ít nhất một sở thích');
        isValid = false;
    }else {
        removeError(checkbox_ex);
    }

    if(note.value.length >= 200){
        displayError(note, 'Vui lòng nhập dưới 200 ký tự');
    }else {
        removeError(note);
    }

    return isValid;
}

function myFunction() {
    var x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
}

function myFunctionConfirm() {
    var x = document.getElementById("confirmPassword");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
}

function resetForm() {
    document.getElementById('registrationForm').reset();
}