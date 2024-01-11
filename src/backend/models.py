from __future__ import annotations
from typing import List
from sqlalchemy import Column, ForeignKey, Integer, String, Date, DateTime, create_engine
from sqlalchemy.orm import Mapped, mapped_column, DeclarativeBase, relationship, Session
from datetime import datetime

class Base(DeclarativeBase):
    pass

class Student(Base):
    __tablename__='student'
    id = mapped_column(Integer, primary_key=True)
    ime = mapped_column(String, nullable=False)
    prezime = mapped_column(String, nullable=False)
    email = mapped_column(String, nullable=True)
    datum_rodjenja = mapped_column(Date, nullable=True)
    predmeti: Mapped[List["Upis"]] = relationship()
    def __init__(
        self,
        ime,
        prezime,
        email = None,
        datum_rodjenja = None
    ):
        self.ime = ime
        self.prezime = prezime
        self.email = email
        self.datum_rodjenja = datum_rodjenja
        
class Predmet(Base):
    __tablename__='predmet'
    id = mapped_column(Integer, primary_key=True)
    naziv = mapped_column(String(50), nullable=False)
    studenti: Mapped[List["Upis"]] = relationship()
    
    
    def __init__(self, naziv):
        self.naziv = naziv
        
class Upis(Base):
    __tablename__='upis'
    id = mapped_column(Integer, primary_key=True)
    datum_upisa = mapped_column(DateTime, nullable=False)
    student_id: Mapped[int] = mapped_column(ForeignKey("student.id"))
    predmet_id: Mapped[int] = mapped_column(ForeignKey("predmet.id"))
    student: Mapped["Student"] = relationship(back_populates="predmeti")
    predmet: Mapped["Predmet"] = relationship(back_populates="studenti")
    
    def __init__(self, student_id, predmet_id, datum_upisa):
        self.student_id = student_id
        self.predmet_id = predmet_id
        self.datum_upisa = datum_upisa
        
class Korisnik(Base):
    __tablename__='korisnik'
    id = mapped_column(Integer, primary_key=True)
    ime = mapped_column(String, nullable=True)
    prezime = mapped_column(String, nullable=True)
    korisnicko_ime = mapped_column(String, nullable=False)
    sifra = mapped_column(String, nullable=False)
    
    
    def __init__(self, ime, prezime, korisnicko_ime, sifra):
        self.ime = ime
        self.prezime = prezime
        self.korisnicko_ime = korisnicko_ime
        self.sifra = sifra
