//Imports
const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const port = process.env.PORT || 8081;
const Database = require("./database");

//Static Files
app.use(express.static(path.join(__dirname, "public")));

//body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Routes
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/public/Pages/home.html");
});

app.get("/summary", function (req, res) {
    res.sendFile(__dirname + "/public/Pages/summary.html");
});

app.get("/categories", function (req, res) {
    res.sendFile(__dirname + "/public/Pages/categories.html");
});

app.get("/about", async function (req, res) {
    let operations = await Database.getAllOperations();
    console.log("OPARATIONS:", operations);
    let person = await Database.getPerson();
    console.log("PERSON:", person);
    let content = []
    for (let i = 0; i < operations.length; i++) {
        let obj = {
            "item": operations[i].item,
            "date": operations[i].date,
            "value": operations[i].value,
            "es": operations[i].ES,
            "category": operations[i].category
        }
        content.push(obj);
    }
    console.log(content);
    let name = person.length != 0 ? person[0].name : "";
    let balance = person.length != 0 ? person[0].balance : 0;

    var body = {
        "name": name,
        "balance": balance,
        "content": content
    }
    res.json(body);
});

app.post("/about", async function (req, res) {
    let line = req.body.text.split("\n");
    let OP = [];
    for (let i = 1; i < line.length; i++) {
        let operation = line[i].split(";");
        let obj = {
            "item": operation[0],
            "date": operation[1],
            "value": operation[2],
            "es": operation[3],
            "category": operation[4]
        }
        OP.push(obj);
        await Database.storeOparation(obj.item, obj.date, obj.value, obj.es, obj.category);
        let person = await Database.getPerson();
        if (person.length == 0)
            await Database.storePerson(req.body.name, Number(req.body.balance));
    }
    res.send(OP);
});

app.delete("/about", async function (req, res) {
    let msg = await Database.deleteAllOperations();
    let msg1 = await Database.deletePerson();
    res.json({ "msg": msg, "msg1": msg1 });
});

Database.connectToDatabase().then(() => {
    app.listen(port, function () {
        console.log("Servidor rodando na porta " + port);
    });
});
