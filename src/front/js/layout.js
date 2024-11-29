import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import "../styles/home.css";
import { Home } from "./pages/Home.jsx";
import { Enrolled } from "./pages/Enrolled.jsx";
import { Monitor } from "./pages/Monitor.jsx";
import { Administradores } from "./pages/Administradores.jsx";
import { Tipo_de_Eventos } from "./pages/Tipo_de_Eventos.jsx";
import { EventosRunning } from "./pages/EventosRunning.jsx";
import { EventosSenderismo } from "./pages/EventosSenderismo.jsx";
import { EventosTriatlon } from "./pages/EventosTriatlon.jsx";
import { EventosCiclismo } from "./pages/EventosCiclismo.jsx";
import { Transferir } from "./pages/Transferir.jsx";
import { Single } from "./pages/single";
import { Login } from "./pages/Login.jsx";
import { Programacion } from "./pages/Programacion.jsx";
import { Register2 } from "./pages/Register2.jsx";
import { ListadoSocios } from "./pages/ListadoSocios.jsx";
import { ListadoInventario } from "./pages/ListadoInventario.jsx";
import { ListadoProgramacion } from "./pages/ListadoProgramacion.jsx";
import { CrearInventario } from "./pages/CrearInventario.jsx";
import { CrearProgramacion } from "./pages/CrearProgramacion.jsx";
import { RegisterAdmin } from "./pages/Registrar_Administrador.jsx";
import { EditAdmin } from "./pages/Editar_Administrador.jsx";
import { RegisterMonitor } from "./pages/Registrar_Monitor.jsx";
import { DetalleSocio } from "./pages/DetalleSocio.jsx";
import { DetalleProgramacion } from "./pages/DetalleProgramacion.jsx";
import { DetalleInventario } from "./pages/DetalleInventario.jsx";
import { EditarSocio } from "./pages/EditarSocio.jsx";
import { Perfil } from "./pages/Perfil.jsx";
import { EditarInventario } from "./pages/EditarInventario.jsx";
import { EditarProgramacion } from "./pages/EditarProgramacion.jsx";
import { CrearTipoEvento } from "./pages/Crear_Tipo_Evento.jsx";
import { EditarTipoEvento } from "./pages/Editar_Tipo_Evento.jsx";
import injectContext from "./store/appContext";
import { SimulacionPago } from "./pages/SimulacionPago.jsx";
import { App } from "./pages/App.jsx";

import { Navbar } from "./component/navbar.jsx";
import { Footer } from "./component/Footer.jsx";
import {AppSlider} from "./component/AppSlider";


//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    return (
        <div className="home" style={{ backgroundImage: "url(/fondo_home.jpg)"}}>
            <BrowserRouter basename={basename}>
            <ScrollToTop>
                <Navbar />   
                
                    <Routes>
                        <Route element={<Login />} path="/" />
                        <Route element={<Home />} path="/home" />
                        <Route element={<Enrolled />} path="/Enrolled" />
                        <Route element={<Monitor />} path="/Monitor" />
                        <Route element={<Administradores />} path="/Administradores" />
                        <Route element={<Tipo_de_Eventos />} path="/Tipo_de_Eventos" />
                        <Route element={<EventosRunning />} path="/eventos-running" />
                        <Route element={<EventosSenderismo />} path="/eventos-senderismo" />
                        <Route element={<EventosTriatlon />} path="/eventos-triatlon" />
                        <Route element={<EventosCiclismo />} path="/eventos-ciclismo" />
                        <Route element={<Transferir />} path="/transferir" />
                        <Route element={<Programacion />} path="/programacion" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<Register2 />} path="/register" />
                        <Route element={<ListadoSocios />} path="/listadosocios" />
                        <Route element={<ListadoInventario />} path="/listadoinventario" />
                        <Route element={<ListadoProgramacion />} path="/listadoprogramacion" />
                        <Route element={<CrearInventario />} path="/crearinventario" />
                        <Route element={<CrearProgramacion />} path="/crearprogramacion" />
                        <Route element={<Perfil />} path="/perfil" />
                        <Route element={<RegisterAdmin />} path="/register_administrador" />
                        <Route element={<EditAdmin />} path="/editar_administrador" />
                        <Route element={<RegisterMonitor />} path="/register_monitor" />
                        <Route element={<DetalleSocio />} path="/listadosocios/:id" />
                        <Route element={<DetalleProgramacion />} path="/listadoprogramacion/:id" />
                        <Route element={<DetalleInventario />} path="/listadoinventario/:id" />
                        <Route element={<EditarSocio />} path="/editar_socio/:id" />
                        <Route element={<EditarProgramacion />} path="/editar_programacion/:id" />
                        <Route element={<EditarInventario />} path="/editar_inventario/:id" />
                        <Route element={<CrearTipoEvento />} path="/crear_tipo_evento" />
                        <Route element={<EditarTipoEvento />} path="/editar_tipo_evento" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<SimulacionPago />} path="/SimulacionPago" />
                        <Route element={<App />} path="/App" />
                        <Route element={<h1>Not found!</h1>} />
                        
                    </Routes>
                    
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);