const express = require('express');
const { pool } = require('../db');
const nodemailer = require('nodemailer');
const router = express.Router();

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;
  await pool.query('INSERT INTO inquiries(name, email, message) VALUES($1,$2,$3)', [name, email, message]);
  if (process.env.SMTP_HOST) {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
    });
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.CONTACT_EMAIL,
      subject: 'New Inquiry',
      text: `${name} (${email}) says: ${message}`
    });
  }
  res.json({ ok: true });
});

module.exports = router;
