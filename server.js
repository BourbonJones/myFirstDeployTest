const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send({
        "testando ip": req.ip,
        "FROM": "Pablo Delgado",
        "TO": "Larissa Galao",
        "Message": "I luv u!!!!",
        "Motivation": "Share my first public deploy in a Cloud"
    });
});

app.listen(port, () => {
    console.log('Exemple app listeing on port ${port}');
});