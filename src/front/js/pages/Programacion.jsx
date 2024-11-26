import React, { useState, useEffect } from "react";
import "../../styles/programacion.css";

export const Programacion = () => {
    const [programaciones, setProgramaciones] = useState([]);
    const [mesActual, setMesActual] = useState(new Date()); // Mes mostrado actualmente

    // Función para obtener programaciones desde la API
    const obtenerProgramaciones = async () => {
        const response = await fetch("/api/programacion");
        if (response.ok) {
            const data = await response.json();
            console.log("Datos recibidos de la API:", data.results); // DEBUG
            setProgramaciones(
                data.results.map((prog) => ({
                    ...prog,
                    fecha: new Date(prog.fecha), // Convertir fecha a objeto Date
                }))
            );
        } else {
            console.error("Error al obtener programaciones:", response.status);
        }
    };

    useEffect(() => {
        obtenerProgramaciones();
    }, []);

    // Función para obtener los días de un mes
    const obtenerDiasDelMes = (fecha) => {
        const anio = fecha.getFullYear();
        const mes = fecha.getMonth();

        const primerDia = new Date(anio, mes, 1);
        const diaSemanaInicio = primerDia.getDay(); // Día de la semana del primer día
        const ultimoDia = new Date(anio, mes + 1, 0);

        const dias = [];
        // Agregar días vacíos al inicio
        for (let i = 0; i < (diaSemanaInicio === 0 ? 6 : diaSemanaInicio - 1); i++) {
            dias.push(null);
        }
        // Agregar días del mes
        for (let i = 1; i <= ultimoDia.getDate(); i++) {
            const diaActual = new Date(anio, mes, i);
            dias.push(diaActual);
        }
        return dias;
    };

    // Cambiar de mes
    const cambiarMes = (direccion) => {
        setMesActual((prev) => new Date(prev.getFullYear(), prev.getMonth() + direccion, 1));
    };

    // Renderizar días del mes actual
    const renderDias = () => {
        const dias = obtenerDiasDelMes(mesActual);

        return dias.map((dia, index) => {
            if (dia === null) {
                return <td key={index} className="col-2 border border-dark"></td>;
            }

            const programacionesDia = programaciones.filter((prog) => {
                const fechaProg = prog.fecha;

                // Comparación explícita de fechas (año, mes, día)
                const esMismoDia =
                    dia.getFullYear() === fechaProg.getFullYear() &&
                    dia.getMonth() === fechaProg.getMonth() &&
                    dia.getDate() === fechaProg.getDate();

                return esMismoDia;
            });

            console.log(`Día ${dia.toDateString()}:`, programacionesDia); // DEBUG

            return (
                <td key={index} className="col-2 border border-dark">
                    <div>{dia.getDate()}</div>
                    {programacionesDia.map((prog) => (
                        <div key={prog.id} className="programacion-item mt-2">
                            <strong>{prog.nombre}</strong>
                        </div>
                    ))}
                </td>
            );
        });
    };

    // Generar semanas del mes actual
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
                    disabled={
                        mesActual <= new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1)
                    }
                >
                    Mes Anterior
                </button>
                <h3 className="text-center border border-dark bg-secondary text-light py-2">
                    {mesActual.toLocaleString("es-ES", { month: "long", year: "numeric" }).toUpperCase()}
                </h3>
                <button
                    className="btn btn-secondary"
                    onClick={() => cambiarMes(1)}
                    disabled={
                        mesActual >= new Date(new Date().getFullYear(), new Date().getMonth() + 2, 1)
                    }
                >
                    Mes Siguiente
                </button>
            </div>
            <table className="table table-bordered border-dark programacion">
                <thead>
                    <tr>
                        <th className="text-center col-2">Lunes</th>
                        <th className="text-center col-2">Martes</th>
                        <th className="text-center col-2">Miércoles</th>
                        <th className="text-center col-2">Jueves</th>
                        <th className="text-center col-2">Viernes</th>
                        <th className="text-center col-1">Sábado</th>
                        <th className="text-center col-1">Domingo</th>
                    </tr>
                </thead>
                <tbody>{renderSemanas()}</tbody>
            </table>
        </div>
    );
};