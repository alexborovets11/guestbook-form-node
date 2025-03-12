document.getElementById('guestbook-form').onsubmit = () => {

    clearErrors();
    let isValid = true;

    let firstName = document.getElementById('first-name').value.trim();
    if (firstName === "") {
        document.getElementById("err-first-name").style.display = "block";
        document.getElementById('first-name').classList.add('error');
        isValid = false;
    } else {
        document.getElementById('first-name').classList.remove('error');
    }

    let lastName = document.getElementById('last-name').value.trim();
    if (lastName === "") {
        document.getElementById("err-last-name").style.display = "block";
        document.getElementById('last-name').classList.add('error');
        isValid = false;
    } else {
        document.getElementById('last-name').classList.remove('error');
    }

    let jobTitle = document.getElementById('job-title').value.trim();
    if (jobTitle === "") {
        document.getElementById("err-job-title").style.display = "block";
        isValid = false;
    }

    let company = document.getElementById('company').value.trim();
    if (company === "") {
        document.getElementById("err-company").style.display = "block";
        isValid = false;
    }

    let email = document.getElementById('email').value.trim();
    if (email === "" || email.indexOf("@") === -1 || email.indexOf(".") === -1) {
        document.getElementById("err-email").style.display = "block";
        document.getElementById('email').classList.add('error');
        isValid = false;
    } else {
        document.getElementById('email').classList.remove('error');
    }

    let linkedin = document.getElementById('linkedin').value.trim();
    if (linkedin && !linkedin.includes('linkedin.com/in/')) {
        document.getElementById("err-linkedin").style.display = "block";
        document.getElementById('linkedin').classList.add('error');
        isValid = false;
    } else {
        document.getElementById('linkedin').classList.remove('error');
    }

    let meet = document.getElementById('meet').value.trim();
    if (meet === "") {
        document.getElementById("err-meet").style.display = "block";
        isValid = false;
    }

    let message = document.getElementById('message').value.trim();
    if (message === "") {
        document.getElementById("err-message").style.display = "block";
        document.getElementById('message').classList.add('error');
        isValid = false;
    } else {
        document.getElementById('message').classList.remove('error');
    }

    let emailFormat = document.getElementsByName('email-format');
    let formatSelected = false;
    for (let i = 0; i < emailFormat.length; i++) {
        if (emailFormat[i].checked) {
            formatSelected = true;
            break;
        }
    }
    if (!formatSelected) {
        document.getElementById("err-email-format").style.display = "block";
        isValid = false;
    }

    return isValid;
}

function clearErrors() {
    let errors = document.getElementsByClassName("err");
    for (let i = 0; i < errors.length; i++) {
        errors[i].style.display = "none";
    }
    let fields = document.getElementsByClassName("error");
    for (let i = 0; i < fields.length; i++) {
        fields[i].classList.remove("error");
    }
}