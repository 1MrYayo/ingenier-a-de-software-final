import React, { useState, useEffect } from "react";
import "../../styles/perfil.css";

export const Perfil = () => {
    // Estados para los atributos del Socio
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [email, setEmail] = useState("");
    const [rut, setRut] = useState("");
    const [numero_telefono, setNumeroTelefono] = useState("");
    const [genero, setGenero] = useState("");
    const [pago, setPago] = useState("");
    const [loading, setLoading] = useState(true); // Estado para mostrar el loading
    const [error, setError] = useState(null); // Estado para manejar posibles errores
    const host = process.env.BACKEND_URL;

    // Obtener el ID del socio logueado desde el localStorage
    const socioId = localStorage.getItem("UserId");

    // Si no se tiene el ID del socio en el localStorage, redirigir al login
    if (!socioId) {
        window.location.href = "/login"; // Redirigir al login si no hay id_socio
    }

    // Función para obtener los datos del socio logueado
    const getPerfil = () => {
        setLoading(true);
        const requestOptions = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`, // Usar el token en los headers
            },
            redirect: 'follow'
        };

        fetch(`${host}/api/socio/${socioId}`, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error("No se pudo obtener los datos del perfil");
                }
                return response.json();
            })
            .then(result => {
                setNombre(result.nombre);
                setApellido(result.apellido);
                setEmail(result.email);
                setRut(result.rut);
                setNumeroTelefono(result.numero_telefono);
                setGenero(result.genero);
                setPago(result.pago);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    };

    // Ejecutar la función para obtener los datos del perfil al montar el componente
    useEffect(() => {
        getPerfil();
    }, []);

    // Si hay un error o se está cargando, mostrar los mensajes adecuados
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="detalle-socio-container">
            <h2>Mi Perfil</h2>
            <div className="detalle-socio-card">
                <p><strong>Nombre:</strong> {nombre}</p>
                <p><strong>Apellido:</strong> {apellido}</p>
                <p><strong>Email:</strong> {email}</p>
                <p><strong>RUT:</strong> {rut}</p>
                <p><strong>Número de Teléfono:</strong> {numero_telefono}</p>
                <p><strong>Género:</strong> {genero}</p>
                <p><strong>Estado del Pago:</strong> {pago}</p>
            </div>
        </div>
    );
};

