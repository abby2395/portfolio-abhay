//Toggle navigation menu and icons

const menuToggleButton = document.querySelector('.menu-toggle-button');
const menuElement = document.querySelector('.menu');

const toggleMenu = () => {
    menuElement.classList.toggle('active');
    menuToggleButton.classList.toggle('active');
};

menuToggleButton.addEventListener('click', toggleMenu);

const removeActiveLinkClass = e => {
    if(e.target.classList.contains('list-link')){
        menuElement.classList.remove('active');
        menuToggleButton.classList.remove('active');
    }
}

document.addEventListener('click', removeActiveLinkClass);

const themeToggleButton = document.querySelector('.theme-toggle-button');
const bodyElement = document.body;
const currentTheme = localStorage.getItem('darkTheme');

if(currentTheme){
    bodyElement.classList.add('dark-theme');
};

const themeToggle = () => {
    bodyElement.classList.toggle('dark-theme');

    if(bodyElement.classList.contains('dark-theme')){
        localStorage.setItem('darkTheme', 'active');
    }else{
        localStorage.removeItem('darkTheme');
    }
};

themeToggleButton.addEventListener('click', themeToggle);

$(document).ready(function() {
    $('#contactForm').submit(function(e) {
        e.preventDefault(); // Prevent default form submission

        var name = $('#name').val();
        var email = $('#email').val();
        var gender = $('#gender').val();
        var message = $('#message').val();
        var isValid = true;

        // Validation for name
        if (name === '') {
            $('#name-error').text('Please enter your name');
            isValid = false;
        } else {
            $('#name-error').text('');
        }

        // Validation for email
        if (email === '') {
            $('#email-error').text('Please enter your email');
            isValid = false;
        } else {
            $('#email-error').text('');
        }

        // Validation for gender
        if (gender === null) {
            $('#gender-error').text('Please select your gender');
            isValid = false;
        } else {
            $('#gender-error').text('');
        }

        // Validation for message
        if (message === '') {
            $('#message-error').text('Please enter your message');
            isValid = false;
        } else {
            $('#message-error').text('');
        }

        // If all inputs are valid, submit the form
        if (isValid) {
            $.ajax({
                type: 'POST',
                url: 'mail.php',
                data: $(this).serialize(),
                success: function(response) {
                    $('#form-response').text(response);
                },
                error: function(xhr, status, error) {
                    console.error(error);
                }
            });
        }
    });
});
