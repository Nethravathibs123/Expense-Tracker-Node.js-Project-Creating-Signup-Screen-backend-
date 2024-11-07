
const loginForm = document.getElementById("login-form");

const errorMsg = document.getElementById('error');

let login = [];



loginForm.addEventListener('submit', async(event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    try{
        const response = await axios.post(`http://localhost:3000/user/login`,{email, password});
        console.log(response);

        document.getElementById('email').value = "";
        document.getElementById('password').value = "";

        errorMsg.textContent = 'Login-Successfully';
    }
    catch(error) {
        document.getElementById('username').value = "";
        document.getElementById('email').value = "";
        document.getElementById('password').value = "";
        
        if (error.response && error.response.data && error.response.data.message) {
            errorMsg.textContent = `Error: ${error.response.data.message}`;
        } else {
            console.log('Error adding user:', error);
            errorMsg.textContent = 'An unexpected error occurred.';
        }
    }
});