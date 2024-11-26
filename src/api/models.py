from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey
from datetime import date
from sqlalchemy.dialects.postgresql import ARRAY
from sqlalchemy import JSON


db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean)


    

    def __repr__(self):
        return f'<User {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "is_active": self.is_active
            # do not serialize the password, its a security breach
        }





class Monitor(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    id_user = db.Column(db.Integer, ForeignKey(User.id))
    name = db.Column(db.String(100))
    last_name = db.Column(db.String(100))
    
    user = relationship("User")

    def __repr__(self):
        return f'<Monitor {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "id_user": self.id_user,
            "name": self.name,
            "last_name": self.last_name
            # do not serialize the password, its a security breach
            }



class Evento(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(80), unique=False, nullable=False)
    fecha = db.Column(db.String(80), unique=False, nullable=False)
    hora = db.Column(db.String(80), unique=False, nullable=False)
    lugar = db.Column(db.String(120), unique=False, nullable=False)
    id_monitor = db.Column(db.Integer, ForeignKey(Monitor.id), unique=False, nullable=False)
    descripcion = db.Column(db.String(1000), unique=False, nullable=False)
    realizado = db.Column(db.Boolean)

    monitores = relationship("Monitor")
    
    

    

    def __repr__(self):
        return f'<Evento {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "fecha": self.fecha,
            "hora": self.hora,
            "lugar": self.lugar,
            "id_monitor": self.id_monitor,
            "descripcion": self.descripcion,
            "realizado": self.realizado
            # do not serialize the password, its a security breach
        }



class Socio(db.Model):
    __tablename__ = 'socio'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(120), unique=False, nullable=False)
    apellido = db.Column(db.String(120), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    rut = db.Column(db.String(120), unique=True, nullable=False)
    numero_telefono = db.Column(db.String(120), unique=False, nullable=False)
    genero = db.Column(db.String(120), unique=False, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    pago = db.Column(db.String(80), unique=False, nullable=True)
    admin = db.Column(db.Boolean, default=False, nullable=False, unique=False)
    


    

    def __repr__(self):
        return f'<Socio {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "apellido": self.apellido,
            "email": self.email,
            "rut": self.rut,
            "numero_telefono": self.numero_telefono,
            "genero": self.genero,
            "pago": self.pago,
            "admin": self.admin
            
            # do not serialize the password, its a security breach
        }

class Programacion(db.Model):
    __tablename__ = 'programacion'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(999), unique=False, nullable=False)
    fecha = db.Column(db.String(20), nullable=False)  # Campo de fecha
    hora = db.Column(db.String(120), unique=False, nullable=False)
    lugar = db.Column(db.String(120), unique=False, nullable=False)
    participantes = db.Column(JSON, nullable=False, default={"results": []})  # Lista de IDs de participantes
    realizado = db.Column(db.Boolean, default=False, nullable=False)
    


    

    def __repr__(self):
        return f'<Programacion {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "fecha": self.fecha,
            "hora": self.hora,
            "lugar": self.lugar,
            "realizado": self.realizado,
            "participantes": self.participantes
            
            
            # do not serialize the password, its a security breach
        }
class Administrador(db.Model):
    __tablename__ = 'administradores'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(120), unique=False, nullable=False)
    apellido = db.Column(db.String(120), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    rut = db.Column(db.String(120), unique=True, nullable=False)
    numero_telefono = db.Column(db.String(120), unique=False, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    


    

    def __repr__(self):
        return f'<Administrador {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "apellido": self.apellido,
            "email": self.email,
            "rut": self.rut,
            "numero_telefono": self.numero_telefono
            # do not serialize the password, its a security breach
        }

class Inventario(db.Model):
    _tablename_ = 'inventario'
    id = db.Column(db.Integer, primary_key=True)
    estado = db.Column(db.String(120), unique=False, nullable=False)
    lugar = db.Column(db.String(120), unique=False, nullable=False)
    elemento = db.Column(db.String(120), unique=False, nullable=False)

    def _repr_(self):
        return f'<Inventario {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "estado": self.estado,
            "lugar": self.lugar,
            "elemento": self.elemento
        }

