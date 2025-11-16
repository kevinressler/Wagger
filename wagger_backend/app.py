from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import os

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://wagger:wagger@localhost:5432/wagger'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)

@app.route("/api/hello")
def hello():
    return {"message": "Hello from Flask!"}

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
