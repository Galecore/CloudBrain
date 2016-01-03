# Send file for sending static files
# Redirect to redirect from '/' to '/index.html'
from flask import render_template
# Get login form from wtforms, flask_wtf
from plugins.forms.main import login_form
from plugins.database.main import register_user


def init(app):
    # Card of project
    @app.route('/cloud/register', methods=('GET', 'POST'))
    def cloud_register():
        # Get form from 'form' plugin.
        form = login_form()
        # On submit check valid
        if form.validate_on_submit():
            # If valid: try to reg user
            register_user(form)
        # Render 'register.html'
        return render_template('register.html', form=form)

    # Card of project
    @app.route('/cloud/login', methods=('GET', 'POST'))
    def cloud_login():
        # Get form from 'form' plugin.
        form = login_form()
        # On submit check valid
        if form.validate_on_submit():
            # If valid: try to login user
            pass

        # Render 'login.html'
        return render_template('login.html', form=form)
