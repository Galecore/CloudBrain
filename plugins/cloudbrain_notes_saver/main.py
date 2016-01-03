from flask import request, redirect

from plugins.database.main import add_note


def init(app):
    @app.route('/new_note', methods=['POST'])
    def new_note():
        add_note(request.form['text'], request.form['theme'])
        return redirect('/cloud/note_editor.html')
