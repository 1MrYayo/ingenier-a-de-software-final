import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/crearprogramacion.css";

export const CrearProgramacion = () => {
    const [nombre, setNombre] = useState("");
    const [fecha, setFecha] = useState("");
    const [hora, setHora] = useState("");
    const [lugar, setLugar] = useState("");
    const navigate = useNavigate();

    const host = process.env.BACKEND_URL;

    // Función para manejar la creación de la programación
    const handleCreateClick = (e) => {
        e.preventDefault();

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            nombre,
            fecha,
            hora,
            lugar,
            participantes: { results: [] }, // Valor predeterminado
            realizado: false, // Valor predeterminado
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
        };

        fetch(`${host}/api/programacion`, requestOptions)
            .then((response) => {
                if (response.status === 200 || response.status === 201) {
                    alert("Programación creada exitosamente");
                    navigate("/listadoprogramacion"); // Redireccionar al usuario
                } else {
                    alert("Ocurrió un error al crear la programación");
                }
            })
            .catch((error) => {
                console.error("Error de red:", error);
                alert("No se pudo realizar la creación.");
            });
    };

    return (
        <div className="form-wrapper">
            <div className="card shadow-lg">
                <div className="card-header bg-primary text-white text-center">
                    <h2>Crear Programación</h2>
                </div>
                <div className="card-body">
                    <form onSubmit={handleCreateClick}>
                        <div className="mb-3">
                            <label className="form-label">Nombre</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Fecha</label>
                            <input
                                type="date"
                                className="form-control"
                                value={fecha}
                                onChange={(e) => setFecha(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Hora</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Hora Inicio - Hora Fin"
                                value={hora}
                                onChange={(e) => setHora(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Lugar</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Lugar"
                                value={lugar}
                                onChange={(e) => setLugar(e.target.value)}
                                required
                            />
                        </div>
                        <button className="btn btn-primary w-100" type="submit">
                            Crear Programación
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

