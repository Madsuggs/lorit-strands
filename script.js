// --- GRID ---
const grid = [
["L","A","M","J","O","D"],
["E","I","E","D","L","E"],
["A","T","T","I","P","L"],
["N","E","O","H","M","O"],
["S","P","P","T","U","D"],
["T","E","D","L","E","N"]
];

// Lösungswörter
const solutions = ["LAMETTA", "EI", "JODELDIPLOM", "NUDEL", "HOPPENSTEDT"];

const spangram = "HOPPENSTEDT";

let selected = [];
let foundWords = [];
let isDown = false;

// Sicherheit: Markieren abbrechen wenn pointer endet
window.addEventListener("pointerup", () => isDown = false);
window.addEventListener("pointercancel", () => isDown = false);

// --- RENDER FUNKTION ---
function render() {
  const root = document.getElementById("root");
  root.innerHTML = "";

  const g = document.createElement("div");
  g.className = "grid";

  for (let r = 0; r < 6; r++) {
    for (let c = 0; c < 6; c++) {

      const cell = document.createElement("div");
      cell.className = "cell";
      cell.textContent = grid[r][c];

      // gefundene Wörter anzeigen
      for (const w of foundWords) {
        if (w.pos.some(p => p[0] === r && p[1] === c)) {
          cell.classList.add(w.isSpangram ? "spangram" : "found");
        }
      }

      // aktuelle Auswahl
      if (selected.some(p => p[0] === r && p[1] === c)) {
        cell.classList.add("selected");
      }

      // Events
      cell.addEventListener("pointerdown", (e) => {
        e.preventDefault();
        isDown = true;
        selected = [[r, c]];
        render();
      });

      cell.addEventListener("pointerenter", () => {
        if (isDown) {
          selected.push([r, c]);
          render();
        }
      });

      cell.addEventListener("pointerup", () => {
        isDown = false;
        setTimeout(checkWord, 20);
      });

      g.appendChild(cell);
    }
  }

  root.appendChild(g);
}

// --- CHECK WORD ---
function checkWord() {
  if (selected.length === 0) return;

  const word = selected.map(p => grid[p[0]][p[1]]).join("");
  const rev = [...word].reverse().join("");

  let match = null;

  if (solutions.includes(word)) match = word;
  if (solutions.includes(rev)) match = rev;

  if (match) {
    if (!foundWords.some(w => w.word === match)) {
      foundWords.push({
        word: match,
        pos: [...selected],
        isSpangram: match === spangram
      });
    }
  }

  selected = [];
  render();
}

window.onload = render;
