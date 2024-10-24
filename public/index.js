const signUpForm = document.getElementById("sign-up-form");
const errorMsg = document.getElementById('error');
let users = [];
const port = 3450;

signUpForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        // Use axios to send a POST request
        const response = await axios.post(`http://localhost:${port}/user/signup`, { username, email, password });

        // Handle successful response
        users.push(response.data);  // Add the new user to the users array

        // Clear the form inputs
        document.getElementById('username').value = "";
        document.getElementById('email').value = "";
        document.getElementById('password').value = "";

        // Clear any error messages
        errorMsg.textContent = '';
    } catch (error) {
        if (error.response) {
            // Handle errors from the server response
            if (error.response.status === 409 || error.response.status === 404) {
                document.getElementById('email').value = "";
                document.getElementById('password').value = "";
                errorMsg.textContent = `Error: ${error.response.data.message}`;
            } else {
                console.log('Unexpected error: ', error.response.data);
                errorMsg.textContent = 'An unexpected error occurred.';
            }
        } else {
            // Handle network errors or other unexpected issues
            console.log('Error adding user: ', error);
            errorMsg.textContent = 'An error occurred. Please try again.';
        }
    }
});
