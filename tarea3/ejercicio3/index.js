const express = require('express');
const authMiddleware = require('./authMiddleware');
const app = express();

app.get('/admin', authMiddleware, (req, res) => {
  res.status(200).json({ mensaje: 'ok' });
});

module.exports = app;
