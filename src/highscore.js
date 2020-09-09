end_game = () => {
    document.getElementById("end").style.display = "none";
    document.getElementById("form").style.display = "block";
};

save_score = () => {
    if(document.getElementById("name").value === ""){
        document.getElementById("name").style.border = "1px solid red"
        return false;
    } else {
        let name = document.getElementById("name").value;
        let score = 105; // deze wordt dynamisch
        let xmlhttp = new XMLHttpRequest();

        xmlhttp.open("GET","savescore.php?n=" + name + "&s=" + score, true);
        xmlhttp.send();

        xmlhttp.onreadystatechange = function () {
            if(xmlhttp.readyState == XMLHttpRequest.DONE){
                if(xmlhttp.status == 200){
                    var json = JSON.parse(xmlhttp.responseText);
                    var tbl = document.createElement("table");
                    tbl.style.width = "100%";
                    tbl.setAttribute('border', 1);
                    var tbdy = document.createElement("tbdody");
                    tbl.appendChild(tbdy);

                    for(var i = 0; i < json.length; i++){
                        var obj = json[i];
                        var tr = document.createElement("tr");
                        var td = document.createElement("td");
                        td.appendChild(document.createTextNode(obj.name));
                        tr.appendChild(td);
                        var td = document.createElement("td");
                        td.appendChild(document.createTextNode(obj.score));
                        tr.appendChild(td);
                        var td = document.createElement("td");
                        td.appendChild(document.createTextNode(obj.play_date));
                        tr.appendChild(td);
                        tbdy.appendChild(tr);
                    }
                    
                    document.getElementById("form").style.display = "none";
                    document.getElementById("highscores").style.display = "block";
                    document.getElementById("highscores").appendChild(tbl);
        
                } else if(xmlhttp. status == 400){
                    alert("er is een fout in n of s");
                } else {
                    alert("er is een ander fout code")
                }
            }
        }
        return false;
    }
};