// js/script.js

document.addEventListener('DOMContentLoaded', () => {
    // --- Welcome Message Logic (for index.html) ---
    const welcomeMessageElement = document.getElementById('welcome-message');
    if (welcomeMessageElement) {
        let userName = localStorage.getItem('userName');
        if (!userName) {
            // Prompt only if on the home page and name not stored
            if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
                userName = prompt("Please enter your name for a personalized welcome:");
                if (userName) {
                    localStorage.setItem('userName', userName);
                } else {
                    userName = "Guest"; // Default if user cancels or enters nothing
                }
            } else {
                userName = "Guest"; // If not on home page, default to Guest
            }
        }
        welcomeMessageElement.textContent = `Hi ${userName}, 你好！`;
    }

    // --- Form Validation and Display Logic (for index.html) ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) { // Ensure the form exists on the page
        const formOutput = document.getElementById('form-output');
        const outputName = document.getElementById('output-name');
        const outputEmail = document.getElementById('output-email');
        const outputPhone = document.getElementById('output-phone');
        const outputMessage = document.getElementById('output-message');
        const outputDob = document.getElementById('output-dob');
        const outputGender = document.getElementById('output-gender');

        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const phoneInput = document.getElementById('phone');
        const dobInput = document.getElementById('dob');
        const genderMaleInput = document.getElementById('gender-male');
        const genderFemaleInput = document.getElementById('gender-female');
        const messageInput = document.getElementById('message');

        const nameError = document.getElementById('name-error');
        const emailError = document.getElementById('email-error');
        const phoneError = document.getElementById('phone-error');
        const messageError = document.getElementById('message-error');
        const dobError = document.getElementById('dob-error');
        const genderError = document.getElementById('gender-error');

        // Function to validate email format
        function isValidEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }

        // Function to validate phone number (digits only, optional)
        function isValidPhone(phone) {
            if (phone === '') return true; // Phone is optional
            const re = /^\d+$/; // Only digits
            return re.test(phone);
        }

        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            let isValid = true;

            // Validate Name
            if (nameInput.value.trim() === '') {
                nameError.classList.remove('hidden');
                nameInput.classList.add('border-red-500');
                isValid = false;
            } else {
                nameError.classList.add('hidden');
                nameInput.classList.remove('border-red-500');
            }

            // Validate Email
            if (emailInput.value.trim() === '' || !isValidEmail(emailInput.value.trim())) {
                emailError.classList.remove('hidden');
                emailInput.classList.add('border-red-500');
                isValid = false;
            } else {
                emailError.classList.add('hidden');
                emailInput.classList.remove('border-red-500');
            }

            // Validate Phone (if provided)
            if (phoneInput.value.trim() !== '' && !isValidPhone(phoneInput.value.trim())) {
                phoneError.classList.remove('hidden');
                phoneInput.classList.add('border-red-500');
                isValid = false;
            } else {
                phoneError.classList.add('hidden');
                phoneInput.classList.remove('border-red-500');
            }

            // Validate Date of Birth (optional, but ensure format if provided)
            if (dobInput.value.trim() === '') {
                dobError.classList.remove('hidden');
                dobInput.classList.add('border-red-500');
                isValid = false;
            } else {
                dobError.classList.add('hidden');
                dobInput.classList.remove('border-red-500');
            }

            // Validate Gender
            let selectedGender = '';
            if (genderMaleInput.checked) {
                selectedGender = genderMaleInput.value;
            } else if (genderFemaleInput.checked) {
                selectedGender = genderFemaleInput.value;
            }

            if (selectedGender === '') {
                genderError.classList.remove('hidden');
                isValid = false;
            } else {
                genderError.classList.add('hidden');
            }


            // Validate Message
            if (messageInput.value.trim() === '') {
                messageError.classList.remove('hidden');
                messageInput.classList.add('border-red-500');
                isValid = false;
            } else {
                messageError.classList.add('hidden');
                messageInput.classList.remove('border-red-500');
            }


            if (isValid) {
                // Display submitted values
                outputName.textContent = nameInput.value.trim() === '';
                outputEmail.textContent = emailInput.value.trim() ;
                outputPhone.textContent = phoneInput.value.trim() || 'N/A'; // Display N/A if phone is empty
                outputDob.textContent = dobInput.value.trim();
                outputGender.textContent = selectedGender;
                outputMessage.textContent = messageInput.value.trim();

                formOutput.classList.remove('hidden'); // Show the output div

                // Optionally, clear the form after successful submission
                contactForm.reset();
                // Scroll to the output section
                formOutput.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                formOutput.classList.add('hidden'); // Hide output if validation fails
            }
        });
    }
});
