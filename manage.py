from flask.cli import FlaskGroup

from auth import app

cli = FlaskGroup(app)

if __name__ == '__main__':
    print("hello")
    cli()