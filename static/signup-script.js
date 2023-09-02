document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const newUsername = document.getElementById('newUsername').value;
    const newPassword = document.getElementById('newPassword').value;

    // Retrieve existing users from local storage or any other source
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

    // Check if the username already exists
    const usernameExists = existingUsers.some(user => user.username === newUsername);

    if (usernameExists) {
        alert('Username already exists. Please choose a different username.');
    } else {
        // Your logic to add the new user to the list and update local storage
        existingUsers.push({ username: newUsername, password: newPassword });
        localStorage.setItem('users', JSON.stringify(existingUsers));
        
        alert('Signup successful. You can now log in with your credentials.');
    }
});
