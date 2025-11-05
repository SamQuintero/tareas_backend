const express = require('express');
const app = express();

const port = 3000;

app.get('/test', (req, res) => {
  res.status(200).json({ mensaje: 'ok' });
});

app.listen(port, () => {
    console.log(`api running on port ${port}`);
})

module.exports = app;