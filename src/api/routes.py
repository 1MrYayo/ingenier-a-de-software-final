"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Monitor,Administrador, Evento, Socio, Inventario, Programacion
from api.utils import generate_sitemap, APIException
import requests
import json
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager



api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

## USER
#@jwt_required()
@api.route('/user', methods=['GET', 'POST'])
def user():
    if request.method == "GET":
        users = User.query.all()
        results = [user.serialize() for user in users]
        response_body = {"message": "ok",
                        "results": results,
                        "Total_records": len(results)}
        return response_body, 200
    
    elif request.method == "POST":
         
         request_body = request.get_json()
         user = User(            
                     email=request_body['email'],
                     password=request_body['password'],
                     is_active=request_body['is_active']
                    )
         db.session.add(user)
         db.session.commit()
         return jsonify(request_body), 200
        
 
    else:
        response_body = {"message": "Error. Method not allowed."}
        return response_body, 400


@api.route('/user/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get(user_id)
    db.session.delete(user)
    db.session.commit()
    return jsonify('OK'), 200


@api.route('/user/<int:client_id>', methods=['PUT'])
def update_user(client_id):
    client = User.query.get(client_id)
    if client is None:
        return 'Not found', 404

    client.id = request.json.get('id', client.id)
    client.email = request.json.get('email', client.email)
    client.password = request.json.get('password', client.password)
    client.is_active = request.json.get('is_active', client.is_active)
    db.session.commit()

    response_body = {'id': client.id,
                     'email': client.email,
                     'password': client.password,
                     'is_active': client.is_active}

    return jsonify(response_body), 200








## MONITOR

@api.route('/monitor', methods=['GET', 'POST'])
def funcionmonitor():
    if request.method == "GET":
        monitores = Monitor.query.all()
        results = [monitorserialize.serialize() for monitorserialize in monitores]
        response_body = {"message": "ok",
                        "results": results,
                        "Total_records": len(results)}
        return response_body, 200
    
    elif request.method == "POST":
         
         request_body = request.get_json()
         monitor = Monitor(id=request_body['id'],            
                     id_user=request_body['id_user'],
                     name=request_body['name'],
                     last_name=request_body['last_name']
                    )
         db.session.add(monitor)
         db.session.commit()
         return jsonify(request_body), 200
 
    else:
        response_body = {"message": "Error. Method not allowed."}
        return response_body, 400


@api.route('/monitor/<int:user_id>', methods=['DELETE'])
def delete_monitor(user_id):
    user = Monitor.query.get(user_id)
    db.session.delete(user)
    db.session.commit()
    return jsonify('OK'), 200


@api.route('/monitor/<int:client_id>', methods=['PUT'])
def update_monitor(client_id):
    client = Monitor.query.get(client_id)
    if client is None:
        return 'Not found', 404

    client.id = request.json.get('id', client.id)
    client.id_user = request.json.get('id_user', client.id_user)
    client.name = request.json.get('name', client.name)
    client.last_name = request.json.get('last_name', client.last_name)
    db.session.commit()

    response_body = {'id': client.id,
                     'id_user': client.id_user,
                     'name': client.name,
                     'last_name': client.last_name}

    return jsonify(response_body), 200

## EVENTO

@api.route('/evento', methods=['GET', 'POST'])
def evento():
    if request.method == "GET":
        eventos = Evento.query.all()
        results = [evento.serialize() for evento in eventos]
        response_body = {"message": "ok",
                        "results": results,
                        "Total_records": len(results)}
        return response_body, 200
    
    elif request.method == "POST":
         
         request_body = request.get_json()
         evento = Evento(id=request_body['id'],
                     nombre=request_body['nombre'],           
                     fecha=request_body['fecha'],
                     lugar=request_body['lugar'],
                     id_monitor=request_body['id_monitor'],
                     descripcion=request_body['descripcion'],
                     realizado=request_body['realizado']
                    )
         db.session.add(evento)
         db.session.commit()
         return jsonify(request_body), 200

    else:
        response_body = {"message": "Error. Method not allowed."}
        return response_body, 400


@api.route('/evento/<int:user_id>', methods=['DELETE'])
def delete_evento(user_id):
    user = Evento.query.get(user_id)
    db.session.delete(user)
    db.session.commit()
    return jsonify('OK'), 200


@api.route('/evento/<int:client_id>', methods=['PUT'])
def update_evento(client_id):
    client = Evento.query.get(client_id)
    if client is None:
        return 'Not found', 404

    client.id = request.json.get('id', client.id)
    client.nombre = request.json.get('nombre', client.nombre)
    client.fecha = request.json.get('fecha', client.fecha)
    client.lugar = request.json.get('lugar', client.lugar)
    client.id_monitor = request.json.get('id_monitor', client.id_monitor)
    client.descripcion = request.json.get('descripcion', client.descripcion)
    client.realizado = request.json.get('realizado', client.realizado)
    db.session.commit()

    response_body = {'id': client.id,
                     'nombre': client.nombre,
                     'fecha': client.fecha,
                     'lugar': client.lugar,
                     'id_monitor': client.id_monitor,
                     'descripcion': client.descripcion,
                     'realizado': client.realizado}

    return jsonify(response_body), 200






# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = Socio.query.filter_by(email=email).first()

    if not email or not password:
        return jsonify({"msg": "You need to send email and password"}), 400
    if not user:
        return jsonify({"msg": "User doesn't exist"}), 404
    if user and user.password == password:
        access_token = create_access_token(identity=user.email)
        response_body = {
            "access_token": access_token,
            "msg": "User logged in successfully"
        }
        return jsonify(response_body), 200
    else:
        return jsonify({"msg": "Error. Password is incorrect."}), 400


# Protect a route with jwt_required, which will kick out requests
# without a valid JWT present.
@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    if current_user:
        return jsonify(logged_in_as=current_user), 200
    else:
        return jsonify({"msg": "Not authorized."}), 400





@api.route('/register-monitor', methods=['GET','POST'])
def register_monitor():

    if request.method == "GET":
        monitor = Monitor.query.all()
        results = []
        result_monitor = [monitorserialize.serialize() for monitorserialize in monitor]
        

        
        for item in result_monitor:
            # print("#############", item)
            # print("#############", item["id_user"])
            
            datos = User.query.filter(item["id_user"] == User.id).first()
            result_datos = datos.serialize()
            
            item["email"] = result_datos["email"]
            item["is_active"] = result_datos["is_active"]
            
            results.append(item)
            print(results)
        
        
        response_body = {"message": "ok",
                        "results": results,
                        "Total_records": len(results)}
        return response_body, 200
    
    elif request.method == "POST":
         
         request_body = request.get_json()
         user = User(      
                     email=request_body['email'],
                     password=request_body['password'],
                     is_active= True
                    )
         db.session.add(user)
         db.session.commit()
         monitor = Monitor(            
                     id_user= user.id,
                     name=request_body['name'],
                     last_name=request_body['last_name'],
                     
                    )
        
         
         db.session.add(monitor)
         db.session.commit()
         return jsonify(request_body), 200
        
 
    else:
        response_body = {"message": "Error. Method not allowed."}
        return response_body, 400






## SOCIO
#@jwt_required()
@api.route('/socio', methods=['GET', 'POST'])
def socio():
    if request.method == "GET":
        socios = Socio.query.all()
        results = [socio.serialize() for socio in socios]
        response_body = {"message": "ok",
                        "results": results,
                        "Total_records": len(results)}
        return response_body, 200
    
    elif request.method == "POST":
         
         request_body = request.get_json()
         socio = Socio(    
                     nombre=request_body['nombre'],
                     apellido=request_body['apellido'],           
                     email=request_body['email'],
                     rut=request_body['rut'],
                     numero_telefono=request_body['numero_telefono'],
                     genero=request_body['genero'],
                     password=request_body['password'],
                     pago = 'NO VIGENTE',
                     
                    )
         db.session.add(socio)
         db.session.commit()
         return jsonify(request_body), 200
        
 
    else:
        response_body = {"message": "Error. Method not allowed."}
        return response_body, 400


@api.route('/socio/<int:socio_id>', methods=['DELETE'])
def delete_socio(socio_id):
    socio = Socio.query.get(socio_id)
    db.session.delete(socio)
    db.session.commit()
    return jsonify('OK'), 200

@api.route('/socio/<int:socio_id>', methods=['GET'])
def get_socio_by_id(socio_id):
    socio = Socio.query.get(socio_id)
    if not socio:
        return jsonify({"message": "Socio not found"}), 404

    return jsonify(socio.serialize()), 200


@api.route('/socio/<int:client_id>', methods=['PUT'])
def update_socio(client_id):
    client = Socio.query.get(client_id)
    if client is None:
        return 'Not found', 404

    client.id = request.json.get('id', client.id)
    client.nombre = request.json.get('nombre', client.nombre)
    client.apellido = request.json.get('apellido', client.apellido)
    client.email = request.json.get('email', client.email)
    client.rut = request.json.get('rut', client.rut)
    client.numero_telefono = request.json.get('numero_telefono', client.numero_telefono)
    client.genero = request.json.get('genero', client.genero)
    client.password = request.json.get('password', client.password)
    client.pago = request.json.get('pago', client.pago)
    client.admin = request.json.get('admin', client.admin)
    
    db.session.commit()

    response_body = {'id': client.id,
                     'nombre': client.nombre,
                     'apellido': client.apellido,
                     'email': client.email,
                     'rut': client.rut,
                     'numero_telefono': client.numero_telefono,
                     'genero': client.genero,
                     'pago': client.pago,
                     'admin': client.admin,
                     }

    return jsonify(response_body), 200


## ADMINISTRADOR
#@jwt_required()
@api.route('/administrador', methods=['GET', 'POST'])
def administrador():
    if request.method == "GET":
        administradores = Administrador.query.all()
        results = [administrador.serialize() for administrador in administradores]
        response_body = {"message": "ok",
                        "results": results,
                        "Total_records": len(results)}
        return response_body, 200
    
    elif request.method == "POST":
         
         request_body = request.get_json()
         administrador = Administrador(    
                     nombre=request_body['nombre'],
                     apellido=request_body['apellido'],           
                     email=request_body['email'],
                     rut=request_body['rut'],
                     numero_telefono=request_body['numero_telefono'],
                     password=request_body['password']
                    )
         db.session.add(administrador)
         db.session.commit()
         return jsonify(request_body), 200
        
 
    else:
        response_body = {"message": "Error. Method not allowed."}
        return response_body, 400


@api.route('/administrador/<int:administrador_id>', methods=['DELETE'])
def delete_administrador(administrador_id):
    administrador = Administrador.query.get(administrador_id)
    db.session.delete(administrador)
    db.session.commit()
    return jsonify('OK'), 200


@api.route('/administrador/<int:client_id>', methods=['PUT'])
def update_administrador(client_id):
    client = Administrador.query.get(client_id)
    if client is None:
        return 'Not found', 404

    client.id = request.json.get('id', client.id)
    client.nombre = request.json.get('nombre', client.nombre)
    client.apellido = request.json.get('apellido', client.apellido)
    client.email = request.json.get('email', client.email)
    client.rut = request.json.get('rut', client.rut)
    client.numero_telefono = request.json.get('numero_telefono', client.numero_telefono)
    client.password = request.json.get('password', client.password)
    
    db.session.commit()

    response_body = {'id': client.id,
                     'nombre': client.nombre,
                     'apellido': client.apellido,
                     'email': client.email,
                     'rut': client.rut,
                     'numero_telefono': client.numero_telefono
                     }

    return jsonify(response_body), 200

@api.route("/check_role", methods=["GET"])
@jwt_required()
def check_role():
    current_user = get_jwt_identity()
    user = Socio.query.filter_by(email=current_user).first()
    if user:
        # Verificar si el usuario tiene el rol de administrador
        return jsonify({"isAdmin": user.is_admin}), 200
    return jsonify({"msg": "User not found"}), 404

#INVENTARIO
@api.route('/inventario', methods=['GET', 'POST'])
#@jwt_required()
def inventario():
    # Verifica que el usuario sea administrador
    #current_user = get_jwt_identity()
    #user = Socio.query.filter_by(email=current_user).first()
    #if not user:
     #   return jsonify({"msg": "Unauthorized. Admins only."}), 403

    if request.method == "GET":
        inventarios = Inventario.query.all()
        results = [inventario.serialize() for inventario in inventarios]
        response_body = {
            "message": "ok",
            "results": results,
            "Total_records": len(results)
        }
        return response_body, 200

    elif request.method == "POST":
        request_body = request.get_json()
        inventario = Inventario(
            estado=request_body['estado'],
            lugar=request_body['lugar'],
            elemento=request_body['elemento']
        )
        db.session.add(inventario)
        db.session.commit()
        return jsonify(inventario.serialize()), 200

    else:
        return jsonify({"msg": "Error. Method not allowed."}), 405


@api.route('/inventario/<int:inventario_id>', methods=['GET', 'PUT', 'DELETE'])
# @jwt_required()
def manage_inventario(inventario_id):
    # Verifica que el usuario sea administrador
    # current_user = get_jwt_identity()
    # if not user:
    #     return jsonify({"msg": "Unauthorized. Admins only."}), 403

    inventario = Inventario.query.get(inventario_id)
    if not inventario:
        return jsonify({"msg": "Inventario not found."}), 404

    # Método GET para obtener un elemento del inventario
    if request.method == "GET":
        return jsonify(inventario.serialize()), 200

    # Método PUT para actualizar un elemento del inventario
    elif request.method == "PUT":
        request_body = request.get_json()
        inventario.estado = request_body.get('estado', inventario.estado)
        inventario.lugar = request_body.get('lugar', inventario.lugar)
        inventario.elemento = request_body.get('elemento', inventario.elemento)
        db.session.commit()
        return jsonify(inventario.serialize()), 200

    # Método DELETE para eliminar un elemento del inventario
    elif request.method == "DELETE":
        db.session.delete(inventario)
        db.session.commit()
        return jsonify({"msg": "Inventario deleted."}), 200

# Rutas para Programacion
@api.route('/programacion', methods=['GET', 'POST'])
def programacion():
    if request.method == "GET":
        programaciones = Programacion.query.all()
        results = [programacion.serialize() for programacion in programaciones]
        response_body = {
            "message": "ok",
            "results": results,
            "Total_records": len(results)
        }
        return response_body, 200

    elif request.method == "POST":
        request_body = request.get_json()
        programacion = Programacion(
            nombre=request_body['nombre'],
            fecha=request_body['fecha'],
            hora=request_body['hora'],
            lugar=request_body['lugar'],
            participantes=request_body.get('participantes', {"results": []}),
            realizado=request_body.get('realizado', False)
        )
        db.session.add(programacion)
        db.session.commit()
        return jsonify(programacion.serialize()), 201

    else:
        response_body = {"message": "Error. Method not allowed."}
        return response_body, 405


@api.route('/programacion/<int:programacion_id>', methods=['GET'])
def get_programacion_by_id(programacion_id):
    programacion = Programacion.query.get(programacion_id)
    if not programacion:
        return jsonify({"message": "Programación not found"}), 404
    return jsonify(programacion.serialize()), 200


@api.route('/programacion/<int:programacion_id>', methods=['DELETE'])
def delete_programacion(programacion_id):
    programacion = Programacion.query.get(programacion_id)
    if not programacion:
        return jsonify({"message": "Programación not found"}), 404

    db.session.delete(programacion)
    db.session.commit()
    return jsonify({"message": "Programación deleted successfully"}), 200


@api.route('/programacion/<int:programacion_id>', methods=['PUT'])
def update_programacion(programacion_id):
    programacion = Programacion.query.get(programacion_id)
    if not programacion:
        return jsonify({"message": "Programación not found"}), 404

    request_body = request.get_json()
    programacion.nombre = request_body.get('nombre', programacion.nombre)
    programacion.fecha = request_body.get('fecha', programacion.fecha)
    programacion.hora = request_body.get('hora', programacion.hora)
    programacion.lugar = request_body.get('lugar', programacion.lugar)
    programacion.participantes = request_body.get('participantes', programacion.participantes)
    programacion.realizado = request_body.get('realizado', programacion.realizado)

    db.session.commit()
    return jsonify(programacion.serialize()), 200