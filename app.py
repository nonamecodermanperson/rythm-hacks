from flask import Flask, render_template, request, redirect, url_for, jsonify, g

import openai
import os

users = []

app = Flask(__name__)
os.environ["OPENAI_API_KEY"] = "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"

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
@app.route('/second-page')
def second_page():
    return render_template('second-page.html')  # Corrected template name

@app.route('/second-page-patient')
def second_page_patient():
    return render_template('second-page-patient.html')  # Corrected template name

@app.route('/report-writer')
def report_writer():
    patient_name = request.args.get('name')
    symptoms = request.args.get('symptoms')
    diagnosis = request.args.get('diagnosis')
    recommendations = request.args.get('recommendations')

    return render_template('report-writer.html', patient_name=patient_name, symptoms=symptoms, diagnosis=diagnosis, recommendations=recommendations)


@app.route('/generate-report', methods=['POST'])
def generate_report():
    symptoms = request.form.get('symptoms')
    diagnosis = request.form.get('diagnosis')
    recommendations = request.form.get('recommendations')

    prompt = f"Symptoms: {symptoms}\nDiagnosis: {diagnosis}\nRecommendations: {recommendations}"

    try:
        response = openai.Completion.create(
            engine="davinci",
            prompt=prompt,
            max_tokens=300
        )
        generated_report = response.choices[0].text.strip()
        return jsonify({'generated_report': generated_report})
    except Exception as e:
        return jsonify({'error': str(e)})
    

@app.route('/ehr')
def ehr():
    return render_template('ehr.html')


@app.route('/forgot-password', methods=['GET', 'POST'])
def forgot_password():
    if request.method == 'POST':

        email = request.form.get('email')
        reset_link = f"https://yourapp.com/reset-password?email={email}"
        
        return render_template('password_reset_link.html', reset_link=reset_link)

    # If it's a GET request, render the forgot password form
    return render_template('forgot-password.html')





@app.route('/diagnosis-tool')
def diagnosis_tool():
    return render_template('diagnosis-tool.html')

@app.route('/get_diagnosis', methods=['POST'])
def get_diagnosis():
    user_input = request.form['user_input']
    try:
        response = openai.Completion.create(
            engine="text-davinci-003",
            prompt=user_input,
            temperature=0.5,
            max_tokens=100
        )
        return response.choices[0].text.strip()
    except Exception as e:
        print("OpenAI API Error:", str(e))
        return "An error occurred while processing your request."


@app.route('/logout')
def logout():
    # Clear any user session or cookies if needed
    # Redirect to the login page
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)
