const loginForm = document.getElementById("login-form");
const errorMsg = document.getElementById('error');
let login = [];

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await axios.post(`http://localhost:3000/user/login`, { email, password });
        console.log(response);

        // Clear the input fields on successful login
        document.getElementById('email').value = "";
        document.getElementById('password').value = "";

        errorMsg.textContent = 'Login successful';
    } catch (error) {
        // Clear the input fields on error
        document.getElementById('email').value = "";
        document.getElementById('password').value = "";

        // Display appropriate error message
        if (error.response && error.response.data && error.response.data.message) {
            errorMsg.textContent = 'Error: ' + error.response.data.message;
        } else {
            console.log('Error adding user:', error);
            errorMsg.textContent = 'An unexpected error occurred.';
        }
    }
});
