import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const SimulacionPago = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { amount } = location.state || { amount: 0 };

  const handleConfirmPayment = () => {
    // Simular un retraso y redirigir al usuario a la página inicial
    setTimeout(() => {
      alert("Pago realizado con éxito");
      navigate("/"); // Redirigir a la página principal
    }, 1000); // Retraso de 1 segundo para simular el procesamiento del pago
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="col col-lg-4 col-md-6 col-sm-12 text-center p-4 border border-3 border-dark bg-light rounded shadow">
        <h2 className="mb-4">Simulación de Pago</h2>
        <p className="mb-4">
          <strong>Monto:</strong> CLP {amount}
        </p>
        <button onClick={handleConfirmPayment} className="btn btn-success w-100">
          Confirmar Pago
        </button>
      </div>
    </div>
  );
};


