const express = require('express');
const { WebpayPlus } = require('transbank-sdk');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configurar Webpay Plus
const commerceCode = '597055555532'; // Código de comercio de prueba
const apiKey = '12345678901234567890123456789012'; // API Key de prueba
const integrationType = 'TEST'; // Cambiar a 'LIVE' en producción

const webpay = new WebpayPlus.Transaction(commerceCode, apiKey, integrationType);

// Ruta para iniciar la transacción
app.post('/api/pagar', async (req, res) => {
    const { amount, sessionId, buyOrder } = req.body;

    try {
        const response = await webpay.create(
            buyOrder || `orden-${Date.now()}`,
            sessionId || 'sesion12345',
            amount || 10000, // Monto en pesos chilenos
            'http://localhost:3000/api/confirmacion' // URL de confirmación
        );

        // Devuelve la URL de pago y el token
        res.json({ url: response.url, token: response.token });
    } catch (error) {
        console.error('Error al iniciar la transacción:', error);
        res.status(500).json({ error: 'Error al iniciar la transacción' });
    }
});

// Ruta para confirmar la transacción
app.post('/api/confirmacion', async (req, res) => {
    const { token_ws } = req.body;

    try {
        const response = await webpay.commit(token_ws);

        if (response.status === 'AUTHORIZED') {
            res.json({
                message: 'Pago realizado exitosamente',
                details: response,
            });
        } else {
            res.status(400).json({ error: 'El pago no fue autorizado' });
        }
    } catch (error) {
        console.error('Error al confirmar la transacción:', error);
        res.status(500).json({ error: 'Error al confirmar la transacción' });
    }
});

// Iniciar el servidor
app.listen(3000, () => {
    console.log('Servidor backend corriendo en http://localhost:3000');
});
