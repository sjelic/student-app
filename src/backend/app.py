from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask_cors import CORS, cross_origin
from sqlalchemy import create_engine
from sqlalchemy_utils import database_exists, create_database
from flask_migrate import Migrate
from models import *

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://postgres:pas0123@localhost/studenti"

db = SQLAlchemy(app)
cors = CORS(app)
migrate = Migrate(app, db)
app.app_context().push()

engine = create_engine(app.config['SQLALCHEMY_DATABASE_URI'])
if not database_exists(engine.url):
    create_database(engine.url)

Base.metadata.create_all(engine)

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
    
def formatP(predmet: Predmet):
    return {
        'id': predmet.id,
        'naziv': predmet.naziv
    }

@app.route('/api/v1/studenti', methods = ['POST'])
def kreirajStudenta():
    ime = request.json['ime']
    prezime = request.json['prezime']
    email = request.json['email']
    
    student = Student(ime, prezime, email)
    
    db.session.add(student)
    db.session.commit()
    return formatS(student)
    
@app.route('/api/v1/studenti', methods=['GET'])
def dohvatiStudente():
    ime = request.args.get('ime')
    #print(ime)
    
    studenti = db.session.query(Student)
    if ime is not None:
        studenti = studenti.filter_by(ime=ime)
    studenti = studenti.all()
    listaStudenata = [formatS(s) for s in studenti]
    return {'studenti': listaStudenata}

@app.route('/api/v1/studenti/<id>', methods=['GET'])
def dohvatiStudenta(id):
    student = db.session.query(Student).filter_by(id=id).one()
    return {
        'student': formatS(student=student)
    }

@app.route("/api/v1/studenti/<id>", methods=['PUT'])
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

@app.route("/api/v1/studenti/<id>", methods=['DELETE'])
def obrisiStudenta(id):
    student = Student.query.filter_by(id=id).one()
    db.session.delete(student)
    db.session.commit()
    return f"Student (id: {student.id}) obrisan."


@app.route("/api/v1/predmeti", methods=['POST'])
def kreirajPredmet():
    naziv = request.json['naziv']

    
    predmet = Predmet(naziv)
    
    db.session.add(predmet)
    db.session.commit()
    return formatP(predmet)

@app.route("/api/v1/predmeti", methods=['GET'])
def dohvatiPredmete():
    naziv = request.args.get('naziv')
    
    predmeti = db.session.query(Predmet)
    if naziv is not None:
        predmeti = predmeti.filter_by(naziv=naziv)
    predmeti = predmeti.all()
    listaPredmeta = [formatP(p) for p in predmeti]
    return {'predmeti': listaPredmeta}
    
if __name__ == '__main__':
    app.run()