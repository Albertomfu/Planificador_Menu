const nodemailer = require("nodemailer");
const express = require("express");
// const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Middleware para procesar solicitudes JSON
app.use(bodyParser.json());

// Configuración del transporte
const transporter = nodemailer.createTransport({
  service: "gmail", // Cambia por el proveedor que uses (ejemplo: "hotmail")
  auth: {
    user: "tu-email@gmail.com", // Tu correo electrónico
    pass: "tu-contraseña", // Tu contraseña o app password
  },
});

// Endpoint para enviar correos
app.post("/send-email", async (req, res) => {
  const { to, subject, text } = req.body;

  const mailOptions = {
    from: "tu-email@gmail.com",
    to,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send("Correo enviado exitosamente.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al enviar el correo.");
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
