//Request
let request = new XMLHttpRequest();
request.open("GET", "/about", false);
request.send();
let data = JSON.parse(request.responseText);
console.log(data);

//Data Insections

//Main Name
document.getElementById("owner").appendChild(document.createTextNode("Resumo das Contas de " + JSON.parse(request.responseText).name));

//Fill table head
var thead = document.getElementById("list_head");
let th = document.createElement("th");
th.appendChild(document.createTextNode("Itens"));
thead.appendChild(th);

let th1 = document.createElement("th");
th1.appendChild(document.createTextNode("Datas"));
thead.appendChild(th1);

let th2 = document.createElement("th");
th2.appendChild(document.createTextNode("Valores"));
thead.appendChild(th2);

let th3 = document.createElement("th");
th3.appendChild(document.createTextNode("Categorias"));
thead.appendChild(th3);

//Fill table datas
let incomes = 0, expense = 0;
var tbody = document.getElementById("list_body");
for (let i = 0; i < data.content.length; i++) {
    let tr = document.createElement("tr");
    //Item
    let td = document.createElement("td");
    td.appendChild(document.createTextNode(data.content[i].item));
    tr.appendChild(td);
    //Date
    td = document.createElement("td");
    td.appendChild(document.createTextNode(data.content[i].date));
    tr.appendChild(td);
    //Value
    td = document.createElement("td");
    td.appendChild(document.createTextNode("R$" + data.content[i].value.toFixed(2)));
    if (data.content[i].es) {
        td.style.color = "green";
        incomes += Number(data.content[i].value); //Adding incomes
    }
    else {
        td.style.color = "red";
        expense += Number(data.content[i].value); //Adding expenses
    }
    tr.appendChild(td);
    //Category
    td = document.createElement("td");
    td.appendChild(document.createTextNode(data.content[i].category));
    tr.appendChild(td);
    tbody.appendChild(tr);
};

//Square Values
console.log("incomes", incomes, "expense", expense);
var coinFormat = "R$";
var div = document.getElementById("ob_value").appendChild(document.createTextNode(coinFormat + Number(data.balance).toFixed(2)));
var div = document.getElementById("fb_value").appendChild(document.createTextNode(coinFormat + (Number(data.balance) + incomes - expense).toFixed(2)));
var div = document.getElementById("in_value").appendChild(document.createTextNode(coinFormat + Number(incomes).toFixed(2)));
var div = document.getElementById("ex_value").appendChild(document.createTextNode(coinFormat + Number(expense).toFixed(2)));