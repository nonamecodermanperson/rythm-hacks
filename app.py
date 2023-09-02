from flask import Flask, render_template, request, redirect, url_for, jsonify, g

import openai
import os

users = []

app = Flask(__name__)
os.environ["OPENAI_API_KEY"] = "sk-J0dRynt3nZbGVwX7lH"

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')

        matched_user = next((user for user in users if user['username'] == username and user['password'] == password), None)

        if matched_user:
            # Log successful login event
            # You can use a proper logging mechanism here
            print(f"Successful login: {username}")
            return redirect(url_for('second_page'))  # Redirect using url_for
        else:
            # Log failed login event
            print(f"Failed login attempt: {username}")
            return render_template('login.html', error_message="Invalid username or password")

    return render_template('login.html')

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    signup_message = None
    
    if request.method == 'POST':
        new_username = request.form.get('new-username')
        new_password = request.form.get('new-password')
        
        # Check if the username already exists
        if any(user['username'] == new_username for user in users):
            signup_message = "Username already exists. Please choose a different username."
        else:
            users.append({'username': new_username, 'password': new_password})
            # Log successful signup event
            # You can use a proper logging mechanism here
            print(f"Successful signup: {new_username}")
            signup_message = "Signup successful! You can now log in."

    return render_template('signup.html', signup_message=signup_message)

@app.route('/doctor-portal')
def doctor_portal():
    return render_template('login-signup-for-doctors.html')

@app.route('/patient-portal')
def patient_portal():
    return render_template('patient-portal.html')


@app.route('/patient-login', methods=['GET', 'POST'])
def patient_login():
    error_message = None
    
    if request.method == 'POST':
        username = request.form.get('patient-username')  # Name attribute from the HTML form
        password = request.form.get('patient-password')  # Name attribute from the HTML form
        
        matched_user = next((user for user in users if user['username'] == username and user['password'] == password), None)

        if matched_user:
            print(f"Successful login: {username}")
            return redirect(url_for('patient_portal'))
        else:
            print(f"Failed login attempt: {username}")
            error_message = "Invalid username or password"

    return render_template('patient-login.html', error_message=error_message)

@app.route('/patient-signup', methods=['GET', 'POST'])
def patient_signup():
    signup_message = None
    
    if request.method == 'POST':
        new_username = request.form.get('patient-username')  # Name attribute from the HTML form
        new_password = request.form.get('patient-password')  # Name attribute from the HTML form
        
        # Check if the username already exists
        if any(user['username'] == new_username for user in users):
            signup_message = "Username already exists. Please choose a different username."
        else:
            users.append({'username': new_username, 'password': new_password})
            # Log successful signup event
            # You can use a proper logging mechanism here
            print(f"Successful signup: {new_username}")
            signup_message = "Signup successful! You can now log in."

    return render_template('patient-signup.html', signup_message=signup_message)

@app.route('/forgot-password', methods=['GET', 'POST'])
def forgot_password():
    if request.method == 'POST':

        email = request.form.get('email')
        reset_link = f"https://yourapp.com/reset-password?email={email}"
        
        return render_template('password_reset_link.html', reset_link=reset_link)

    # If it's a GET request, render the forgot password form
    return render_template('forgot-password.html')


if __name__ == '__main__':
    app.run(debug=True)
