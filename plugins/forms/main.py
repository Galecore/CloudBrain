from flask_wtf import Form
from wtforms import StringField, validators, PasswordField, SubmitField


# Login form for login.html template
class login_form(Form):
    # Email (login)
    email = StringField('email', validators=[
        validators.Length(max=100),
        validators.required('Please enter your email address.'),
        validators.Email("Please enter your email address.")
    ])

    # Password
    password = PasswordField('password', validators=[
        validators.Length(max=100),
        validators.required('Enter your password')
    ])
    # Submit
    submit = SubmitField()
