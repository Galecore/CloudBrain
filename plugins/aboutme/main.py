# We need to get files from folder of plugin
# => We need it's location
from plugin_manager.plugin_manager import plugin_path
# Send file for sending static files
# Redirect to redirect from '/' to '/index.html'
from flask import send_file, redirect, render_template


# Init
def init(app):
    # Redirect from '/'

    @app.route('/')
    def redirect_to_index():
        # To '/card/index.html'
        return redirect('/about_me/')

    # Return static files

    @app.route('/about_me/<path:path>')
    def about_me_static_files(path):
        # Return static files
        return send_file(plugin_path + 'aboutme/templates/' + path)

    # We need to return index.html

    @app.route('/about_me/')
    def about_me_index():
        # Render 'index.html'
        return render_template('index.html')
