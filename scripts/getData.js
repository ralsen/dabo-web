// JavaScript-Code zum Abrufen der Liste von Buttons vom Server
// HTTP-Anfrage an den Server senden

import { selectGraph } from './DiagramSelection.js'

var buttonContainer = document.getElementById("button-container");

var gdata = '';
window.gdata = gdata;
export { gdata };

var selectedDevice = "";

function selectDiagram() {
    fetch('DiagramSelektion.html')
    .then(response => response.text())
    .then(html => {
        document.body.innerHTML = "";
        selectGraph()
    });
}

var select_Diagram = document.getElementById("diagram_select");
select_Diagram.addEventListener("click", selectDiagram);

function main(){
    setInterval(getTable, 1000);
}

function getTable() {
    fetch('http://LC-DaBo.local:8080/sendDevInfo')
        .then(response => response.json())
        .then(data => {
            gdata = data;
            createTable();
            createDeviceList();
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
}

function createDeviceList(){
    buttonContainer.innerHTML = "";
    const keys = Object.keys(gdata);
    keys.forEach(key => {
        const button = document.createElement("button");
        button.classList.add('button');
        button.textContent = key;
        button.id = key;
        button.classList.add('hover-effect');
        button.classList.add('active-effect');
        if (gdata[key]['stat']['online'] === false) {
            button.style.backgroundColor = 'red';
        }
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
    selectDiagram.innerHTML = "";
    const keys = Object.keys(gdata);
    const dias = cfg['diagrams']['diagrams'];
    keys.forEach(key => {
        const hpc = key.substring(0, key.length - 12);
        cfg['diagrams'][hpc].forEach(function(item) {
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
    selectDiagram.addEventListener("change", function() {
        auswahl = this.value;
        console.log("Die ausgewählte Option ist: " + auswahl);
      });
    }


let table;
function createTable(){
    if (selectedDevice == "") {
        return;
    }
    const obj = selectedDevice;
    const tableDiv = document.querySelector("#tabelle");
    if (table) {
    tableDiv.removeChild(table);
    }
    table = document.createElement('table');
    let row = table.insertRow();
    const keys =  Object.keys(gdata[obj])
    keys.forEach(infokey => {
        const field = Object.keys(gdata[obj][infokey]);
        field.forEach(fieldkey => {
            const value = gdata[obj][infokey][fieldkey];
            if (row.cells.length >= 8) { // if the current row has 8 cells, add a new row
            row = table.insertRow();
            }
                const cell = row.insertCell();
                cell.innerHTML = fieldkey + ": " + value;
                cell.setAttribute("colspan", "2");
                cell.classList.add("cell"); 
        });
    });
    tableDiv.appendChild(table);
}
        
function sendName(buttonId) {
    console.log("Button name: " + buttonId);
    selectedDevice = buttonId;
    createTable()
    }

   main();