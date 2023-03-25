      // JavaScript-Code zum Abrufen der Liste von Buttons vom Server
      // HTTP-Anfrage an den Server senden
      const buttonContainer = document.getElementById("button-container");
      fetch('http://LC-DaBo.local:8080/sendDevInfo')
        .then(response => response.json())
        .then(data => {
          gdata = data;
          const keys = Object.keys(data);
          console.log(data)
          // Durchlaufen jedes Objekts in der Antwort
          keys.forEach(key => {
            const obj = data[key];
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
            // Werte des Objekts in der Konsole ausgeben
            console.log('Objekt mit Schlüssel', key, ':', obj);
            // Beispiel: Wert eines bestimmten Eigenschafts ausgeben
            console.log('Wert von "propertyName":', obj.info.IP);
          });
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
        console.log("Response is: "+ gdata);

        let table;
        function createTable(obj){
          console.log("Tabelle für " + obj + " erstellen mit folgenden Werten " + Object.keys(gdata[obj]))
          const tabelleDiv = document.querySelector("#tabelle");
          if (table) {
            tabelleDiv.removeChild(table);
          }
          table = document.createElement('table');
          let row = table.insertRow();
          const keys =  Object.keys(gdata[obj])
          keys.forEach(infokey => {
            const field = Object.keys(gdata[obj][infokey]);
            console.log("habe keys: " + field);
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
              console.log("field: "+ fieldkey + " = " + value);
            });
          });
          console.log("Tabelle: " + table)
          tabelleDiv.appendChild(table);
        }
        
        function sendName(buttonId) {
            console.log("Button name: " + buttonId);
            createTable(buttonId)
            // Hier können Sie den Namen des Buttons an eine andere Funktion oder an den Server senden
            }
