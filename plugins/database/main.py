# Import pewee for database manipulations

# Path to database

# Hashlib for md5
import hashlib
# Redirect if success
from flask import redirect
from plugins.database.classes import *

# Text database
database_texts = SqliteDatabase(plugin_path + 'database/databases/texts.db')
# Users database
database = SqliteDatabase(plugin_path + 'database/databases/users.db')
# MD5 crypt
md5 = lambda string: hashlib.md5(string.encode()).hexdigest()

database.connect()


# Register a new user
def register_user(login_form):
    " Add user to db by login form "
    # Attempt to create the user. If the username is taken...
    try:
        if User.get(User.email == login_form.email.data) and User.get(User.password == md5(login_form.password.data)):
            return redirect('/c')
        return 'Already exist.'
    except:
        user = User.create(
            password=md5(login_form.password.data),
            email=login_form.email.data
        )
        user.save()
        return 'We have add this user.'


# Add note
def add_note(note, theme):
    " Add note to db "
    # Connect database
    database_texts.connect()
    # Add note
    texts.create(theme=theme, text=note, user='Andrew').save()
    # Close connection
    database_texts.close()

# Get text of user
def get_text_of_user(user):
    " Get text of single user "
    # Connect database
    database_texts.connect()
    # Request text of user
    text_of_user = texts.select().where(texts.user == 'Andrew')
    # Close connection
    database_texts.close()
    # Return text
    return text_of_user


# Add theme's depending
def add_depending(main_theme, secondary_theme):
    " Add theme depending "
    # Connect database
    database_texts.connect()
    # Add depending
    Depending.create(main_theme=main_theme, second_theme=secondary_theme)
    # Close connection
    database_texts.close()


# Get depending of theme
def get_theme_depending(secondary_theme):
    " Get main theme by secondary theme "
    # Connect database
    database_texts.connect()
    # Request text of user
    main_theme = Depending.select().where(Depending.second_theme == secondary_theme)
    # Close connection
    database_texts.close()
    # Return main theme
    try:
        # Return theme
        return main_theme[0].main_theme
    # If no depending, return nothing!
    except IndexError:
        return ''


# Get text of user
def get_text_by_theme(user, theme):
    " Get text of single user "
    # Connect database
    database_texts.connect()
    # Request text of user
    text_of_user = texts.select().where(texts.user == 'Andrew', texts.theme == theme)
    # Close connection
    database_texts.close()
    # Return text
    return text_of_user
