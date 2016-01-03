# Send file is needed for js and css
from flask import send_file, render_template
# Import plugin path for static
#
from plugins.database.main import *


# Init
def init(app):
    # Return static
    @app.route('/brain/<path:path>')
    def cloud_static_brain(path):
        # Return static files
        return send_file(plugin_path + 'cloudbrain_front/static/' + path)

    @app.route('/c')
    def cabinet():
        return render_template('c.html')

    @app.route('/all_notes')
    def all_notes():
        return render_template('note_with_value.html',
                               theme=get_text_of_user('Andrew')[len(get_text_of_user('Andrew')) - 1].theme,
                               text=get_text_of_user('Andrew')[len(get_text_of_user('Andrew')) - 1].text)
