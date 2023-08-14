from flask.cli import FlaskGroup

from Backend import app

cli = FlaskGroup(app)

if __name__ == '__main__':
    print("hello")
    cli()