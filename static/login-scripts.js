document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); 
    
    const username = document.getElementsByName('username')[0].value;
    const password = document.getElementsByName('password')[0].value;
  
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
  
    const matchedUser = existingUsers.find(user => user.username === username && user.password === password);
  
    if (matchedUser) {
        window.location.href = '/second-page';  
    } else {
        const errorElement = document.getElementById('error-message');
        errorElement.textContent = 'Invalid username or password. Please try again.';
        // Display an alert
        alert('Invalid username or password. Please try again.');
    }
})