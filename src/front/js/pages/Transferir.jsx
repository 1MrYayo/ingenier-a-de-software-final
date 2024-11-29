import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Transferir = () => {
  const host = process.env.BACKEND_URL; // URL del backend desde variables de entorno
  const UserId = localStorage.getItem("UserId"); // Obtener el UserId del localStorage
  const navigate = useNavigate();

  const [paymentStatus, setPaymentStatus] = useState(""); // Estado del pago
  const [paymentMethod, setPaymentMethod] = useState("webpay"); // Método de pago seleccionado
  const amount = 30000; // Monto fijo para la membresía

  // Función para actualizar el estado de pago en el backend
  const updatePaymentStatus = async () => {
    try {
      const response = await fetch(`${host}/api/socio/${UserId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pago: "VIGENTE" }),
      });

      if (!response.ok) {
        throw new Error(`Error en el servidor: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Respuesta del servidor:", data);
      setPaymentStatus("Pago realizado con éxito y actualizado en el sistema.");
      navigate("/programacion"); // Redirigir a /programacion después de actualizar el estado
    } catch (error) {
      console.error("Error al actualizar el estado de pago:", error);
      setPaymentStatus("Hubo un error al actualizar el estado de pago.");
    }
  };

  const handlePayment = () => {
    if (paymentMethod === "webpay") {
      // Abrir ventana emergente para Webpay
      const popup = window.open(
        "",
        "WebpayPlus",
        "width=600,height=600,resizable=no,scrollbars=no,status=no"
      );

      if (popup) {
        popup.document.open(); // Asegurarse de que se pueda escribir contenido
        popup.document.write(`<!DOCTYPE html>
          <html lang="es">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Webpay Plus</title>
            <link
              href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css"
              rel="stylesheet"
            />
            <style>
              body {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
                background-color: #f8f9fa;
              }
              .payment-container {
                width: 400px;
                padding: 20px;
                background: white;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                border-radius: 5px;
                text-align: center;
              }
              .webpay-logo {
                width: 200px;
                margin: 0 auto 20px;
              }
            </style>
          </head>
          <body>
            <div class="payment-container">
              <img src="https://upload.wikimedia.org/wikipedia/commons/3/3e/Webpay.png" alt="Webpay Plus" class="webpay-logo">
              <h2 class="text-center mb-4">Webpay Plus</h2>
              <p class="text-center">Monto a pagar: <strong>CLP ${amount}</strong></p>
              <form id="paymentForm" class="text-center">
                <div class="mb-3">
                  <label for="cardNumber" class="form-label">Número de Tarjeta</label>
                  <input
                    type="text"
                    id="cardNumber"
                    class="form-control"
                    placeholder="1234 5678 9012 3456"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="cardExpiry" class="form-label">Fecha de Expiración</label>
                  <input
                    type="text"
                    id="cardExpiry"
                    class="form-control"
                    placeholder="MM/AA"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="cardCVC" class="form-label">CVC</label>
                  <input
                    type="text"
                    id="cardCVC"
                    class="form-control"
                    placeholder="123"
                    required
                  />
                </div>
                <button type="submit" class="btn btn-success w-100">Confirmar Pago</button>
              </form>
            </div>
            <script>
              document.getElementById('paymentForm').addEventListener('submit', function(event) {
                event.preventDefault();
                const cardNumber = document.getElementById('cardNumber').value;
                const cardExpiry = document.getElementById('cardExpiry').value;
                const cardCVC = document.getElementById('cardCVC').value;

                if (cardNumber && cardExpiry && cardCVC) {
                  setTimeout(() => {
                    alert("Pago confirmado con Webpay.");
                    window.opener.postMessage("payment-success", "*");
                    window.close();
                  }, 1000);
                } else {
                  alert("Por favor, completa todos los campos.");
                }
              });
            </script>
          </body>
          </html>`);
        popup.document.close(); // Cerrar flujo de escritura
      } else {
        alert("Por favor, habilita las ventanas emergentes en tu navegador.");
      }

      // Escuchar el mensaje de éxito desde la ventana emergente
      window.addEventListener("message", (event) => {
        if (event.data === "payment-success") {
          updatePaymentStatus(); // Actualizar el estado de pago y redirigir
        }
      });
    } else if (paymentMethod === "paypal") {
      alert("La funcionalidad de PayPal está pendiente de implementación.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="col col-lg-4 col-md-6 col-sm-12 text-center p-4 border border-3 border-dark bg-light rounded shadow">
        <h2 className="mb-4">Pagar Membresía</h2>
        <p className="mb-4">
          <strong>Monto:</strong> CLP {amount} (1 mes de membresía)
        </p>
        <div className="mb-4">
          <label className="form-label">Selecciona el método de pago:</label>
          <select
            className="form-select"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="webpay">Webpay Plus</option>
            <option value="paypal">PayPal</option>
          </select>
        </div>
        {paymentStatus && (
          <div className="alert alert-success" role="alert">
            {paymentStatus}
          </div>
        )}
        <button onClick={handlePayment} className="btn btn-primary w-100">
          Pagar Membresía
        </button>
      </div>
    </div>
  );
};


