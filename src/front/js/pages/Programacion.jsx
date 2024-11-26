import React, { useState, useEffect } from "react";
import "../../styles/programacion.css";

export const Programacion = () => {
    const [mesActual, setMesActual] = useState(new Date()); // Mes mostrado actualmente
    const [programaciones, setProgramaciones] = useState([]); // Guardar las programaciones
    const [socio, setSocio] = useState(null); // Guardar los datos del socio
    const host = process.env.BACKEND_URL;
    const userId = parseInt(localStorage.getItem("UserId"), 10); // Obtener el UserId desde localStorage

    // Fetch de programaciones y datos del socio al montar el componente
    useEffect(() => {
        const fetchProgramaciones = async () => {
            try {
                const response = await fetch(`${host}/api/programacion`, { method: "GET" });
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                const data = await response.json();
                setProgramaciones(data.results);

                data.results.forEach((result) => {
                    console.log("LO LEÍ:", result);
                    if (result.fecha) {
                        console.log("Fecha:", result.fecha);
                    }
                });

            } catch (error) {
                console.error("Error al obtener las programaciones:", error);
            }
        };

        const fetchSocio = async () => {
            try {
                const response = await fetch(`${host}/api/socio/${userId}`, { method: "GET" });
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                const data = await response.json();
                setSocio(data); // Guardar los datos del socio

            } catch (error) {
                console.error("Error al obtener los datos del socio:", error);
            }
        };

        fetchProgramaciones();
        fetchSocio();
    }, []); // El array vacío asegura que solo se ejecute al montar el componente

    // Función para obtener los días del mes
    const obtenerDiasDelMes = (fecha) => {
        const anio = fecha.getFullYear();
        const mes = fecha.getMonth();

        const primerDia = new Date(anio, mes, 1);
        const diaSemanaInicio = primerDia.getDay();
        const ultimoDia = new Date(anio, mes + 1, 0);

        const dias = [];
        for (let i = 0; i < (diaSemanaInicio === 0 ? 6 : diaSemanaInicio - 1); i++) {
            dias.push(null);
        }
        for (let i = 1; i <= ultimoDia.getDate(); i++) {
            const diaActual = new Date(anio, mes, i);
            dias.push(diaActual);
        }
        return dias;
    };

    const cambiarMes = (direccion) => {
        setMesActual((prev) => new Date(prev.getFullYear(), prev.getMonth() + direccion, 1));
    };

    const formatearFecha = (fecha) => {
        const dia = fecha.getDate().toString().padStart(2, "0");
        const mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
        const anio = fecha.getFullYear();

        return `${dia}-${mes}-${anio}`;
    };

    const obtenerNombreDeProgramacion = (fecha) => {
        const fechaFormateada = formatearFecha(fecha);
        const programacion = programaciones.find((programacion) => programacion.fecha === fechaFormateada);
        return programacion ? programacion : null;
    };

    // Función para inscribirse o desinscribirse de una programación
    const manejarInscripcion = async (programacionId, estaInscripto) => {
        if (socio && socio.pago === "NO VIGENTE") {
            alert("Debe pagar la mensualidad antes de inscribirse a una clase");
            return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
            console.error("No se encontró el token.");
            return;
        }

        try {
            const programacion = programaciones.find((prog) => prog.id === programacionId);
            if (!programacion) {
                console.error("Programación no encontrada.");
                return;
            }

            let participantesActualizados = [...programacion.participantes.results];

            if (estaInscripto) {
                participantesActualizados = participantesActualizados.filter((id) => id !== userId);
            } else {
                participantesActualizados.push(userId);
            }

            const response = await fetch(`${host}/api/programacion/${programacionId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    participantes: { results: participantesActualizados },
                }),
            });

            if (!response.ok) {
                throw new Error(`Error al actualizar la inscripción: ${response.status}`);
            }

            const updatedProgramacion = await response.json();
            setProgramaciones((prevState) =>
                prevState.map((prog) =>
                    prog.id === updatedProgramacion.id ? updatedProgramacion : prog
                )
            );

            console.log(estaInscripto ? "Desinscripción exitosa" : "Inscripción exitosa");
        } catch (error) {
            console.error("Error al actualizar la inscripción:", error);
        }
    };

    const verificarInscripcion = (programacion) => {
        return programacion.participantes.results.includes(userId);
    };

    const renderDias = () => {
        const dias = obtenerDiasDelMes(mesActual);

        return dias.map((dia, index) => {
            if (dia === null) {
                return <td key={index} className="col-2 border border-dark"></td>;
            }

            const fechaFormateada = formatearFecha(dia);
            const programacion = obtenerNombreDeProgramacion(dia);
            const estaInscripto = programacion && verificarInscripcion(programacion);

            return (
                <td
                    key={index}
                    className="col-2 border border-dark"
                    id={fechaFormateada}
                >
                    <div>{dia.getDate()}</div>
                    {programacion && (
                        <div className="card mt-2">
                            <div className="card-body">
                                <h5 className="card-title">{programacion.nombre}</h5>
                                <p className="card-text">
                                    <strong>Hora:</strong> {programacion.hora} <br />
                                    <strong>Lugar:</strong> {programacion.lugar}
                                </p>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => manejarInscripcion(programacion.id, estaInscripto)}
                                >
                                    {estaInscripto ? "Desinscribir" : "Inscribirse"}
                                </button>
                            </div>
                        </div>
                    )}
                </td>
            );
        });
    };

    const renderSemanas = () => {
        const dias = renderDias();
        const semanas = [];

        for (let i = 0; i < dias.length; i += 7) {
            semanas.push(
                <tr key={i} className="border border-dark">
                    {dias.slice(i, i + 7)}
                </tr>
            );
        }

        return semanas;
    };

    return (
        <div className="container programacion">
            <div className="d-flex justify-content-between align-items-center my-3">
                <button
                    className="btn btn-secondary"
                    onClick={() => cambiarMes(-1)}
                    disabled={mesActual <= new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1)}
                >
                    Mes Anterior
                </button>
                <h3 className="text-center border border-dark bg-secondary text-light py-2">
                    {mesActual.toLocaleString("es-ES", { month: "long", year: "numeric" }).toUpperCase()}
                </h3>
                <button
                    className="btn btn-secondary"
                    onClick={() => cambiarMes(1)}
                    disabled={mesActual >= new Date(new Date().getFullYear(), new Date().getMonth() + 2, 1)}
                >
                    Mes Siguiente
                </button>
            </div>
            <table className="table table-bordered table-hover table-striped">
                <thead>
                    <tr>
                        <th>Lunes</th>
                        <th>Martes</th>
                        <th>Miércoles</th>
                        <th>Jueves</th>
                        <th>Viernes</th>
                        <th>Sábado</th>
                        <th>Domingo</th>
                    </tr>
                </thead>
                <tbody>{renderSemanas()}</tbody>
            </table>
        </div>
    );
};







