//Request
let request = new XMLHttpRequest();
request.open("GET", "/about", false);
request.send();
let data = JSON.parse(request.responseText);
console.log(data);

//Data Insections

//Main Name
document.getElementById("owner").appendChild(document.createTextNode("Contas Divididas por Categorias"));

//Fill table head
var thead = document.getElementById("list_head");
let th = document.createElement("th");
th.appendChild(document.createTextNode("Categorias"));
thead.appendChild(th);

let th1 = document.createElement("th");
th1.appendChild(document.createTextNode("Valores"));
thead.appendChild(th1);

//Filter datas
let incomes = 0, expense = 0;
let front = new Object();
for (let i = 0; i < data.content.length; i++) {
    if(!front.hasOwnProperty(data.content[i].category)){
        front[data.content[i].category] = [Number(data.content[i].value), data.content[i].es];
    }
    else if(front[data.content[i].category][1] != data.content[i].es){
        front[data.content[i].category + " (1)"] = [Number(data.content[i].value), data.content[i].es];
    }
    else{
        front[data.content[i].category][0] += Number(data.content[i].value);
    }

    if(data.content[i].es)
        incomes += data.content[i].value;
    else
        expense += data.content[i].value;
}
console.log(front)
console.log("incomes", incomes, "expense", expense);

var coinFormat = "R$";
var div = document.getElementById("ob_value").appendChild(document.createTextNode(coinFormat + Number(data.balance).toFixed(2)));
var div = document.getElementById("fb_value").appendChild(document.createTextNode(coinFormat + (Number(data.balance) + incomes - expense).toFixed(2)));
var div = document.getElementById("in_value").appendChild(document.createTextNode(coinFormat + Number(incomes).toFixed(2)));
var div = document.getElementById("ex_value").appendChild(document.createTextNode(coinFormat + Number(expense).toFixed(2)));

//Fill table datas
var tbody = document.getElementById("list_body");

Object.keys(front).forEach((category) => {
    let tr = document.createElement("tr");
    //Category
    let td = document.createElement("td");
    td.appendChild(document.createTextNode(category));
    tr.appendChild(td);
    //Value
    td = document.createElement("td");
    td.appendChild(document.createTextNode("R$" + front[category][0].toFixed(2)));
    td.style.color = front[category][1]?"green":"red";
    tr.appendChild(td);
    tbody.appendChild(tr);
  });
    