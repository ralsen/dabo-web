//import { xdata } from './getData.js';

// Definition der Blöcke und Checkboxes als zweidimensionales Array
const checkboxes = [
    ["Block 1", "Checkbox 11", "Checkbox 12", "Checkbox 13"],
    ["Block 2", "Checkbox 21", "Checkbox 22", "Checkbox 23", "Checkbox 24"],
    ["Block 3", "Checkbox 31", "Checkbox 32", "Checkbox 33", "Checkbox 34", "Checkbox 35"]
];

// Schleife durch das Array und Erstellung der HTML-Blöcke und Checkboxes
for (let i = 0; i < checkboxes.length; i++) {
    const block = document.createElement("div");
    block.id = "block" + (i);
    const blockHeader = document.createElement("h2");
    blockHeader.innerText = checkboxes[i][0];
    block.appendChild(blockHeader);

    for (let j = 1; j < checkboxes[i].length; j++) {
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.name = "block" + (i+1) + "_checkbox" + j;
        checkbox.id = "block" + (i+1) + "_checkbox" + j;
        const label = document.createElement("label");
        label.for = "block" + (i+1) + "_checkbox" + j;
        label.innerText = checkboxes[i][j];
        block.appendChild(checkbox);
        block.appendChild(label);
        block.appendChild(document.createElement("br"));
    }
    document.body.appendChild(block);
}

// Erstellung des OK-Buttons
const submitButton = document.createElement("button");
submitButton.id = "submit-button";
submitButton.innerText = "OK";
document.body.appendChild(submitButton);

// Event-Listener für Klicken des OK-Buttons
submitButton.addEventListener("click", function() {
    // Code zum Senden der ausgewählten Checkboxes an den Server hier...
    // Erstelle ein Array, um die ausgewählten Checkboxes zu speichern
    var selectedCheckboxes = [];
    // Iteriere durch alle Checkboxen
    for (var i = 0; i < checkboxes.length; i++) {
        for (var j = 1; j < checkboxes[i].length; j++) {
            var checkbox = document.getElementById('block' + (i+1) + '_checkbox' + j);
            // Überprüfe, ob die Checkbox ausgewählt wurde
            if (checkbox.checked) {
                // Füge die Checkbox zur Liste der ausgewählten Checkboxen hinzu
                selectedCheckboxes.push({
                    block: i + 1,
                    box: j,
                    value: checkbox.value
                });
            }
        }
    }
    // Sende die ausgewählten Checkboxes an den Server oder führe eine andere Aktion aus
    console.log(selectedCheckboxes);
    const arr = ["/draw", selectedCheckboxes];
    sendRequest(arr);
    // Zurück zur Hauptseite navigieren
    //window.history.back();
    // oder:
    //window.location.href = "index.html";
});

function sendRequest(item, callback) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          // Antwort empfangen
          const response = xhr.responseText;
          const cfg = JSON.parse(response);
          console.log('got this answer for: ' + item);
          console.log(cfg);
          if (callback) {
            callback(cfg);
          }
        } else {
          console.error('Error: ' + xhr.status);
        }
      }
    };
    const str = item[0] + '?para=' + JSON.stringify(item[1]);
    console.log(str);
    xhr.open('GET', str, true);
    xhr.send();
  }
  