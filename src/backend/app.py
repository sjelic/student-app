from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask_cors import CORS
from sqlalchemy import create_engine
from sqlalchemy_utils import database_exists, create_database

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://postgres:pas0123@localhost/studenti"

db = SQLAlchemy(app)
app.app_context().push()

engine = create_engine(app.config['SQLALCHEMY_DATABASE_URI'])
if not database_exists(engine.url):
    create_database(engine.url)

CORS(app)


class Student(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    ime = db.Column(db.String(100), nullable = False)
    prezime = db.Column(db.String(100), nullable = False)
    email = db.Column(db.String(100), nullable=True)

    def __init__(self, ime, prezime, email = None):
        self.ime = ime
        self.prezime = prezime
        self.email = email

    def __repr__(self) -> str:
        return f"Ime: {self.ime}, Prezime: {self.prezime}, Email: {self.email}"

db.create_all()

# zahtev na http://127.0.0.1:5000
@app.route('/')
def inicijalni():
    return 'Caossssss'

def formatS(student: Student):
    return {
        'id': student.id,
        'ime': student.ime,
        'prezime': student.prezime,
        'email': student.email
    }

@app.route('/student', methods = ['POST'])
def kreirajStudenta():
    ime = request.json['ime']
    prezime = request.json['prezime']
    email = request.json['email']
    
    student = Student(ime, prezime, email)
    
    db.session.add(student)
    db.session.commit()
    return formatS(student)
    
@app.route('/student', methods=['GET'])
def dohvatiStudente():
    studenti = Student.query.order_by(Student.id.asc()).all()
    listaStudenata = [formatS(s) for s in studenti]
    return {'studenti': listaStudenata}

@app.route('/student/<id>', methods=['GET'])
def dohvatiStudenta(id):
    student = Student.query.filter_by(id=id).one()
    return {
        'student': formatS(student=student)
    }

@app.route("/student/<id>", methods=['PUT'])
def promeniStudenta(id):
    student = Student.query.filter_by(id=id)
    ime = request.json['ime']
    prezime = request.json['prezime']
    email = request.json['email']
    student.update(
        {
            'ime': ime,
            'prezime': prezime,
            'email': email
        }
    )
    db.session.commit()
    return {'student': formatS(student.one())}

@app.route("/student/<id>", methods=['DELETE'])
def obrisiStudenta(id):
    student = Student.query.filter_by(id=id).one()
    db.session.delete(student)
    db.session.commit()
    return f"Student (id: {student.id}) obrisan."
    
    
    