# Import pewee for database manipulations
from peewee import *
# Path to database
from plugin_manager.plugin_manager import plugin_path

database = SqliteDatabase(plugin_path + 'database/databases/users.db')

database_texts = SqliteDatabase(plugin_path + 'database/databases/texts.db')


# User model
class User(Model):
    # We need to save password of user
    password = CharField()
    # And his email
    email = CharField()

    class Meta:
        # We need do use specific database
        database = database  # Uses 'people.db'
        indexes = (('email', True),)


# Note model
class texts(Model):
    # We need to save a theme field
    theme = CharField()
    # Text field
    text = CharField()
    # And user who create this
    user = CharField()

    class Meta:
        database = database_texts  # Uses 'people.db'
        indexes = (('user', True),)
