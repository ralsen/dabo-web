// JavaScript-Code zum Abrufen der Liste von Buttons vom Server
// HTTP-Anfrage an den Server senden
const buttonContainer = document.getElementById("button-container");
var gdata = '';
export const xdata = {
    gdata: gdata
  };
var selectedDevice = "";

setInterval(getTable, 1000);
setInterval(createTable, 1000)
setInterval(createDeviceList, 1000)
setInterval(createDropDown, 1000)

function getTable() {
    //console.log("getTable()");
    fetch('http://testpi.local:8080/sendDevInfo')
        .then(response => response.json())
        .then(data => {
            gdata = data;
            //console.log(gdata)
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
}

function createDeviceList(){
    //console.log('createDeviceList()');
    buttonContainer.innerHTML = "";
    const keys = Object.keys(gdata);
    // Durchlaufen jedes Objekts in der Antwort
    keys.forEach(key => {
        const button = document.createElement("button");
        button.classList.add('button');
        button.textContent = key;
        button.id = key;
        button.classList.add('hover-effect');
        button.classList.add('active-effect');

        // Klick-Event für den Button hinzufügen
        button.addEventListener("click", function() {
            sendName(this.id);
        });
        buttonContainer.appendChild(button);
    });
}

let auswahl = "Diagramm auswählen";

function createDropDown(){
    const dropList = [];
    const selectDiagram = document.getElementById("selectDiagram");
    selectDiagram.innerHTML = '';
    const keys = Object.keys(gdata);
    const defaultOption = document.createElement("option");
    defaultOption.text = "Diagramm auswählen";
    defaultOption.value = "";
    selectDiagram.add(defaultOption);    
    console.log("Auswahl: " + auswahl);
    // Durchlaufen jedes Objekts in der Antwort
    keys.forEach(key => {
        //console.log(key);
        let dev = '';
        if (cfg['config']['System'] == 'ESP'){
            dev = 'DS1820';
        }
        else {
            dev = key.substring(0, key.length - 12);
        }
        //console.log(cfg['diagrams'][dev][0]);
        cfg['diagrams'][dev].forEach(function(item) {
            //console.log(item[0] + ' -- ' + item[1]);
            dropList.push(key + '_' + item[0]);
            const option = document.createElement("option");
            option.text = key + '_' + item[0];
            option.value = key + '_' + item[0];
            if (key + '_' + item[0] === auswahl) {
                option.selected = true;
            }
            selectDiagram.add(option);
        });
    });
    //console.log(dropList);
    selectDiagram.addEventListener("change", function() {
        // Wert der ausgewählten Option
        auswahl = this.value;
        console.log("Die ausgewählte Option ist: " + auswahl);
      });
    }


let table;
function createTable(){
    //console.log('createTable()');
    if (selectedDevice == "") {
        return;
    }
    const obj = selectedDevice;
    //console.log("Tabelle für " + obj + " erstellen mit folgenden Werten " + Object.keys(gdata[obj]))
    const tabelleDiv = document.querySelector("#tabelle");
    if (table) {
    tabelleDiv.removeChild(table);
    }
    table = document.createElement('table');
    let row = table.insertRow();
    const keys =  Object.keys(gdata[obj])
    keys.forEach(infokey => {
        const field = Object.keys(gdata[obj][infokey]);
        //console.log("habe keys: " + field);
        field.forEach(fieldkey => {
            const value = gdata[obj][infokey][fieldkey];
            if (row.cells.length >= 8) { // Wenn die aktuelle Zeile 8 Zellen enthält, füge eine neue Zeile hinzu
            row = table.insertRow();
            }
                // Füge die Zellen hinzu
                const cell = row.insertCell();
                cell.innerHTML = fieldkey + ": " + value;
                cell.setAttribute("colspan", "2"); // Fasse die Zellen zusammen
                cell.classList.add("cell"); // Füge die CSS-Klasse hinzu
            //console.log("field: "+ fieldkey + " = " + value);
        });
    });
    tabelleDiv.appendChild(table);
}
        
function sendName(buttonId) {
    console.log("Button name: " + buttonId);
    selectedDevice = buttonId;
//    createTable()
    // Hier können Sie den Namen des Buttons an eine andere Funktion oder an den Server senden
    }
