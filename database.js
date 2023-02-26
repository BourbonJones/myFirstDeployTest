require('dotenv').config();
const mongoose = require("mongoose");
const { response } = require("express");
const { v4: uuid } = require("uuid");

//Database
async function connectToDatabase() {
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    const db = mongoose.connection; //Infos about mongoose connection
    db.on("error", (error) => console.error(error));
    db.once("open", () => console.log("Connected to the database"));
}

//Schemas/Models
const operation = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    item: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    ES: {
        type: Boolean,
        required: true
    },
    category: {
        type: String,
        required: true
    }
});
var Operation = mongoose.model("Operation", operation);

const person = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        required: true
    },
});
var Person = mongoose.model("Person", person);

const item = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    produto: {
        type: String,
        required: true
    },
    valor: {
        type: Number,
        required: true
    },
    quantidade: {
        type: Number,
        required: true
    },
    defeito: {
        type: Number,
        required: true
    },
    imagem: {
        type: String,
        required: true
    }
})
const Itens = mongoose.model('Itens', item)
//Controller
async function getAllOperations() {
    let allOperations = await Operation.find();
    return allOperations;
}

async function storeOparation(item, date, value, ES, category) {
    let newOp = new Operation({ _id: uuid(), item: item, date: date, value: value, ES: ES, category: category });
    console.log(newOp);
    try {
        await newOp.save();
        return console.log("Oparation added to database");
    } catch (err) { return console.log(err) };
}

async function deleteAllOperations() {
    try {
        await Operation.remove();
        return console.log("All operations removed!");
    } catch (err) { return console.log(err) };
}

async function getPerson() {
    let p = await Person.find();
    return p;
}

async function storePerson(name, balance) {
    let newP = new Person({ _id: uuid(), name: name, balance: balance });
    console.log(newP);
    try {
        await newP.save();
        return console.log("Person added to database");
    } catch (err) { return console.log(err) };
}

async function deletePerson() {
    try {
        await Person.remove();
        return console.log(" and Person removed too.");
    } catch (err) { return console.log(err) };
}

async function getAllItens() {
    try {
        let allItens = await Itens.find();
        return allItens;
    }catch(err){ return { message: err } }
}

async function storeItens(produto, valor, quantidade, defeito, imagem) {
    let item = new Itens({ _id: uuid(), produto, valor, quantidade, defeito, imagem });
    try {
        await item.save();
        return { message: 'Item salvo com sucesso' }
    } catch (err) { return { message: err } }
}

async function updateItens(id, produto, valor, quantidade, defeito, imagem) {
    try {
        let item = await Itens.findById(id);
        item.produto = produto;
        item.valor = valor;
        item.quantidade = quantidade;
        item.defeito = defeito;
        item.imagem = imagem;
        console.log(item);
        await item.save();
        return { message: "Item atualizado com sucesso" }
    } catch (err) { return { message: err } }

}

//EXPORTS
module.exports = {
    connectToDatabase: connectToDatabase,
    getAllOperations: getAllOperations,
    storeOparation: storeOparation,
    deleteAllOperations: deleteAllOperations,
    getPerson: getPerson,
    storePerson: storePerson,
    deletePerson: deletePerson,
    getAllItens: getAllItens,
    storeItens: storeItens,
    updateItens: updateItens
}

