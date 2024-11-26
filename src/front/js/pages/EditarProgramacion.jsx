import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../../styles/editarprogramacion.css';

export const EditarProgramacion = () => {
    const [nombre, setNombre] = useState("");
    const [fecha, setFecha] = useState("");
    const [hora, setHora] = useState("");
    const [lugar, setLugar] = useState("");
    const [realizado, setRealizado] = useState(false);
    const [participantes, setParticipantes] = useState([]);
    const navigate = useNavigate();

    const host = process.env.BACKEND_URL;
    const edit_id = localStorage.getItem("id_programacion");

    const get_programacion = () => {
        fetch(`${host}/api/programacion/${edit_id}`)
            .then(response => {
                if (!response.ok) throw new Error("Error al obtener los datos de la programación");
                return response.json();
            })
            .then(result => {
                setNombre(result.nombre);
                setFecha(result.fecha);
                setHora(result.hora);
                setLugar(result.lugar);
                setRealizado(result.realizado);
                setParticipantes(result.participantes.results); // Convertimos el array results para edición
            })
            .catch(error => console.error(error));
    };

    useEffect(() => {
        get_programacion();
    }, []);

    const handleClick = (e) => {
        e.preventDefault();

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            nombre,
            fecha,
            hora,
            lugar,
            realizado,
            participantes: { results: participantes.map(id => parseInt(id, 10)) }, // Formato requerido
        });

        const requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
        };

        fetch(`${host}/api/programacion/${edit_id}`, requestOptions)
            .then(response => {
                if (response.status === 200) {
                    alert("Cambios guardados exitosamente");
                    navigate("/listadoprogramacion");
                } else {
                    alert("Ocurrió un error al actualizar la programación");
                }
            })
            .catch(error => {
                console.error("Error de red:", error);
                alert("No se pudo realizar la actualización.");
            });
    };

    return (
        <div className="form-wrapper">
            <div className="card shadow-lg">
                <div className="card-header bg-primary text-white text-center">
                    <h2>Editar Programación</h2>
                </div>
                <div className="card-body">
                    <form onSubmit={handleClick}>
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
                                type="datetime-local"
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
                                placeholder="Hora"
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
                        <div className="mb-3">
                            <label className="form-label">Realizado</label>
                            <select
                                className="form-select"
                                value={realizado}
                                onChange={(e) => setRealizado(e.target.value === 'true')}
                                required
                            >
                                <option value="true">Sí</option>
                                <option value="false">No</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Participantes</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Participantes (IDs separados por coma)"
                                value={participantes.join(", ")}
                                onChange={(e) =>
                                    setParticipantes(e.target.value.split(",").map(id => id.trim()))
                                }
                            />
                        </div>
                        <button className="btn btn-primary w-100" type="submit">
                            Guardar Cambios
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
