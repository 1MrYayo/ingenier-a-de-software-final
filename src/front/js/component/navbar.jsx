import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/navbar.css";
import logoClubTenisVdM from "../../img/logo.png";

export const Navbar = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        // Verificar el valor de isAdmin en el localStorage
        const adminStatus = localStorage.getItem("isAdmin");
        setIsAdmin(adminStatus === "true");
    }, []);

    const handleClick = () => {
        actions.logout();
        navigate("/");
    };

    return (
        <nav className="navbar rg-header">
            <div className="container-fluid d-flex justify-content-between">
                <div className="conteiner-logo">
                    <div className="navbar-brand">
                        <Link className="nav-link" to={store.token ? "/programacion" : "/"}>
                            <img src={logoClubTenisVdM} width={70} height={70} />
                        </Link>
                    </div>
                </div>
                <div>
                    <ul className="nav me-auto mb-2 mb-lg-0">
                        {store.token ? (
                            <>
                                {isAdmin ? (
                                    // Opciones para admins
                                    <>
                                        <li className="nav-item">
                                            <Link className="nav-link rg-textlink link-secondary" to="/listadoprogramacion">Listado Programación</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link rg-textlink link-secondary" to="/listadosocios">Socios</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link rg-textlink link-secondary" to="/listadoinventario">Inventario</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link rg-textlink link-secondary" to="/programacion">Programación</Link>
                                        </li>
                                    </>
                                ) : (
                                    // Opciones para usuarios no admin
                                    <>
                                        <li className="nav-item">
                                            <Link className="nav-link rg-textlink link-secondary" to="/transferir">Datos de Transferencia</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link rg-textlink link-secondary" to="/programacion">Programación</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link rg-textlink link-secondary" to="/perfil">Perfil</Link>
                                        </li>
                                    </>
                                )}
                                <li className="nav-item">
                                    <button className="log-out-btn" onClick={handleClick}>
                                        <span className="btn btn-rounded justify-content-between mx-md-2 mt-1 mb-1" type="button">Cerrar Sesión</span>
                                    </button>
                                </li>
                            </>
                        ) : (
                            // Opciones cuando no hay token
                            <div>
                                <Link to="/login">
                                    <span className="btn btn-rounded justify-content-between mx-md-2 mt-1 mb-1" type="button">Iniciar Sesión</span>
                                </Link>
                                <Link to="/register">
                                    <span className="btn btn-rounded justify-content-between mx-md-2 mt-1 mb-1" type="button">Regístrate</span>
                                </Link>
                            </div>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};



