import React, { useState, useEffect } from "react";
import "../../styles/programacion.css";

export const Programacion = () => {
    const [mesActual, setMesActual] = useState(new Date()); // Mes mostrado actualmente
    const host = process.env.BACKEND_URL;

    // Fetch de programaciones al montar el componente
    useEffect(() => {
        const fetchProgramaciones = async () => {
            try {
                const response = await fetch(`${host}/api/programacion`, { method: "GET" }); // Llamada al endpoint
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                const data = await response.json(); // Convertir la respuesta en JSON
                console.log(data); // Mostrar los resultados en consola
            } catch (error) {
                console.error("Error al obtener las programaciones:", error);
            }
        };

        fetchProgramaciones();
    }, []); // El array vacío asegura que solo se ejecute al montar el componente

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

    // Formatear fecha para tener siempre 2 dígitos (mm y dd)
    const formatearFecha = (fecha) => {
        const dia = fecha.getDate().toString().padStart(2, "0");
        const mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
        const anio = fecha.getFullYear();

        return `${dia}-${mes}-${anio}`;
    };

    // Renderizar días del mes actual
    const renderDias = () => {
        const dias = obtenerDiasDelMes(mesActual);

        return dias.map((dia, index) => {
            if (dia === null) {
                return <td key={index} className="col-2 border border-dark"></td>;
            }

            const fechaFormateada = formatearFecha(dia); // Formato dd-mm-aaaa

            return (
                <td
                    key={index}
                    className="col-2 border border-dark"
                    id={fechaFormateada} // Asignar el id con la fecha formateada
                >
                    <div>{dia.getDate()}</div>
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
