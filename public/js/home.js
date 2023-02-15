var file = document.getElementById("input_files");
file.addEventListener("change", readFile);
var file_content = null;

function readFile(){
    var fr = new FileReader();
    
    fr.onloadend = function () {
        file_content = fr.result.replaceAll("\r","");
    }
    fr.readAsText(file.files[0]);
}

var form = document.getElementById("feature_body");

form.addEventListener("submit", function(e){
    e.preventDefault();
    var name = document.getElementById("input_name").value;
    var balance = document.getElementById("input_balance").value;

    var body={
        "name": name,
        "balance": balance,
        "text": file_content
    }
    console.log(body);

    var req = new XMLHttpRequest();
    req.open("post", "/about", true);
    req.setRequestHeader("Content-type", "application/json");
    req.send(JSON.stringify(body));
    alert("Contas adicionadas e organizadas com sucesso. Fique tranquilo, seus dados não serão guardados se você quiser deletar.");
});

//DELETE BUTTON
document.getElementById("delete_bill").addEventListener("click", function(e){
    var req = new XMLHttpRequest();
    req.open("delete", "/about", true);
    req.send();
    alert("Todas suas transações foram deletadas e seus dados não serão guardados!")
});
