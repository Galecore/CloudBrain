# Send file for sending static files
# Redirect to redirect from '/' to '/index.html'
from flask import send_file, render_template
# We need to get files from folder of plugin
# => We need it's location
from plugin_manager.plugin_manager import plugin_path


def init(app):
    # Return static files

    @app.route('/cloud/<path:path>', methods=['GET', 'POST'])
    def cloud_static(path):
        # Return static files
        return send_file(plugin_path + 'cloudbrain_front/static/' + path)

    # Card of project
    @app.route('/cloud/')
    def cloud_index():
        # Render 'index.html'
        return render_template('main.html')
