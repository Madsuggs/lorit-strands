// Dein 6x6-Grid
const grid = [
  ["L","A","M","J","O","D"],
  ["E","I","E","D","L","E"],
  ["A","T","T","I","P","L"],
  ["N","E","O","H","M","O"],
  ["S","P","P","T","U","D"],
  ["T","E","D","L","E","N"]
];

// Wörter, die erkannt werden sollen
const solutions = [
  "LAMETTA",
  "EI",
  "JODELDIPLOM",
  "NUDEL",
  "HOPPENSTEDT"
];

let selected = [];
let foundWords = [];

// Render-Gitter
function render() {
  const root = document.getElementById("root");
  root.innerHTML = "";

  const gridDiv = document.createElement("div");
  gridDiv.className = "grid";

  for (let r = 0; r < 6; r++) {
    for (let c = 0; c < 6; c++) {

      const cell = document.createElement("div");
      cell.className = "cell";
      cell.innerText = grid[r][c];

      // Zelle markieren, wenn Buchstabe in gefundenem Wort vorkommt
      foundWords.forEach(word => {
        if (word.includes(grid[r][c])) {
          cell.classList.add("found");
        }
      });

      // Zelle markieren, während Auswahl läuft
      if (selected.some(p => p[0] === r && p[1] === c)) {
        cell.classList.add("selected");
      }

      // Click fürs Markieren
      cell.onclick = () => {
        selected.push([r, c]);
        checkWord();
        render();
      };

      gridDiv.appendChild(cell);
    }
  }

  root.appendChild(gridDiv);

  // Gefundene Wörter anzeigen
  document.getElementById("foundList").innerText = foundWords.join("  •  ");
}


// Prüfen, ob ein gültiges Wort gefunden wurde
function checkWord() {
  const letters = selected.map(p => grid[p[0]][p[1]]).join("");

  if (solutions.includes(letters)) {
    if (!foundWords.includes(letters)) {
      foundWords.push(letters);
    }
  }

  selected = []; // Auswahl leeren
}

window.onload = render;
