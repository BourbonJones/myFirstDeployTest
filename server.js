const express = require('express');
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

//Static Files
app.use(express.static(path.join(__dirname,"public")));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/home.html");
});

app.listen(port, () => {
    console.log('Exemple app listeing on port ${port}');
});