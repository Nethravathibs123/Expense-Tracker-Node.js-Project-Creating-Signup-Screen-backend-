const signUpForm = document.getElementById("sign-up-form");
const errorMsg = document.getElementById('error');
const port = 3000;

signUpForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Simple validation
    if (!username || !email || !password) {
        errorMsg.textContent = 'All fields are required. Please fill out the form completely.';
        return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errorMsg.textContent = 'Please enter a valid email address.';
        return;
    }

    // Validate password length
    if (password.length < 6) {
        errorMsg.textContent = 'Password should be at least 6 characters long.';
        return;
    }

    try {
        // Send the request
        const response = await axios.post(`http://localhost:${port}/user/signup`, {
            username,
            email,
            password
        });

        // Handle successful response
        console.log('User signed up successfully:', response.data);
        signUpForm.reset(); // Clear form fields
        errorMsg.textContent = ''; // Clear error message

    } catch (error) {
        // Handle errors from the server response
        if (error.response) {
            if (error.response.status === 400) {
                errorMsg.textContent = 'Bad Request: Please ensure all fields are correctly filled.';
            } else {
                errorMsg.textContent = `Error: ${error.response.data.message || 'An error occurred.'}`;
            }
        } else {
            errorMsg.textContent = 'Network error. Please try again.';
        }
    }
});
