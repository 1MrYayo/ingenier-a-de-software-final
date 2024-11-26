import React, { useState, useEffect } from "react";
import "../../styles/detalleprogramacion.css";

export const DetalleProgramacion = () => {
    const [nombre, setNombre] = useState("");
    const [fecha, setFecha] = useState("");
    const [hora, setHora] = useState("");
    const [lugar, setLugar] = useState("");
    const [participantes, setParticipantes] = useState([]);
    const [realizado, setRealizado] = useState(false);
    const [socios, setSocios] = useState([]);

    const edit_id = localStorage.getItem("id_programacion");
    const host = process.env.BACKEND_URL;

    const getProgramacion = () => {
        fetch(`${host}/api/programacion/${edit_id}`, { method: "GET" })
            .then((response) => {
                if (!response.ok) throw new Error("Error al obtener los datos de la programación");
                return response.json();
            })
            .then((result) => {
                setNombre(result.nombre);
                setFecha(result.fecha);
                setHora(result.hora);
                setLugar(result.lugar);
                setParticipantes(result.participantes.results || []);
                setRealizado(result.realizado);
            })
            .catch((error) => console.log("Error:", error));
    };

    const getSocios = () => {
        fetch(`${host}/api/socio`, { method: "GET" })
            .then((response) => {
                if (!response.ok) throw new Error("Error al obtener los datos de socios");
                return response.json();
            })
            .then((result) => setSocios(result.results || []))
            .catch((error) => console.log("Error:", error));
    };

    useEffect(() => {
        getProgramacion();
        getSocios();
    }, []);

    const participantesDetalle = participantes.map((id) => {
        const socio = socios.find((s) => s.id === id);
        return socio
            ? { id: socio.id, nombre: socio.nombre, apellido: socio.apellido, pago: socio.pago }
            : { id, nombre: "No encontrado", apellido: "No encontrado", pago: "N/A" };
    });

    return (
        <div className="detalle-programacion-container">
            <h2>Detalle de la Programación</h2>
            <div className="detalle-programacion-card">
                <p><strong>Nombre:</strong> {nombre}</p>
                <p><strong>Fecha:</strong> {fecha}</p>
                <p><strong>Hora:</strong> {hora}</p>
                <p><strong>Lugar:</strong> {lugar}</p>
                <p><strong>Cantidad de Participantes:</strong> {participantesDetalle.length}</p>
                <p><strong>Participantes:</strong></p>
                <table className="table table-bordered">
                    <thead className="table-light">
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Pago</th>
                        </tr>
                    </thead>
                    <tbody>
                        {participantesDetalle.length > 0 ? (
                            participantesDetalle.map((detalle) => (
                                <tr
                                    key={detalle.id}
                                    className={
                                        detalle.pago === "VIGENTE"
                                            ? "table-success"
                                            : detalle.pago === "NO VIGENTE"
                                            ? "table-danger"
                                            : ""
                                    }
                                >
                                    <td>{detalle.id}</td>
                                    <td>{detalle.nombre}</td>
                                    <td>{detalle.apellido}</td>
                                    <td>{detalle.pago}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center">No hay participantes</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <p><strong>Realizado:</strong> {realizado ? "Sí" : "No"}</p>
            </div>
        </div>
    );
};


