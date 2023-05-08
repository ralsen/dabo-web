import { gdata } from './getData.js';
import { cfg } from './config.js';
export { selectGraph }

// create HTML blocks and Checkboxes
function selectGraph() {
    let devs = [];
    let dias = [];
    devs = Object.keys(gdata);
    dias = (cfg['diagrams']);
    console.log(gdata);
    for (let i = 0; i < devs.length; i++) {
        const block = document.createElement("div");
        block.id = devs[i];
        const blockHeader = document.createElement("h2");
        blockHeader.innerText = devs[i];
        block.appendChild(blockHeader);
        console.log(devs[i]);
        console.log(gdata[devs[i]]['info']['Type']);
        /*        const defprefix = devs[i].slice(0, -18);
        console.log(defprefix);
        const diatyps = dias[defprefix];
        for (let j = 0; j < diatyps.length; j++) {
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.name = devs[i] + diatyps[j];
            checkbox.id = devs[i] + diatyps[j];
            const label = document.createElement("label");
            label.for = devs[i] + diatyps[j];
            label.innerText = diatyps[j][0];
            block.appendChild(checkbox);
            block.appendChild(label);
            block.appendChild(document.createElement("br"));
        }*/
        document.body.appendChild(block);
    }
  document.body.appendChild(submitButton);
}

// create OK-Button
const submitButton = document.createElement("button");
submitButton.id = "submit-button";
submitButton.innerText = "OK";

// Event-Listener for OK-Button
submitButton.addEventListener("click", function() {
    // create an array to store the ticked checkboxes
    var selectedCheckboxes = [];
    let devs = [];
    let dias = [];
    devs = Object.keys(gdata);
    dias = (cfg['diagrams']);
    // iterate through the Checkboxen
    for (var i = 0; i <  devs.length; i++) {
        const defprefix = devs[i].slice(0, -12);
        const diatyps = dias[defprefix];
        for (var j = 0; j < diatyps.length; j++) {
            var checkbox = document.getElementById(devs[i] + diatyps[j]);
            // check if box is choosen
            if (checkbox.checked) {
                // added it to the list
                selectedCheckboxes.push({
                    dev: devs[i],
                    box: diatyps[j][0],
                    value: checkbox.value
                });
            }
        }
    }
    // send the list to the server
    console.log(selectedCheckboxes);
    const arr = ["/draw", selectedCheckboxes];
    sendRequest(arr);
});

function sendRequest(item, callback) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          // Antwort empfangen
          const response = xhr.responseText;
          const cfg = JSON.parse(response);
          window.location.href = "index.html";
          if (callback) {
            callback(cfg);
          }
        } else {
          console.error('Error: ' + xhr.status);
        }
      }
    };
    const str = item[0] + '?para=' + JSON.stringify(item[1]);
    xhr.open('GET', str, true);
    xhr.send();
  }
  