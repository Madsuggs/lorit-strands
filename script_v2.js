// --- GRID ---
const grid = [
["L","A","M","J","O","D"],
["E","I","E","D","L","E"],
["A","T","T","I","P","L"],
["N","E","O","H","M","O"],
["S","P","P","T","U","D"],
["T","E","D","L","E","N"]
];

// --- LÖSUNGSWÖRTER ---
const solutions = [
  "LAMETTA",
  "EI",
  "JODELDIPLOM",
  "NUDEL",
  "HOPPENSTEDT"
];

// Spangram bleibt gelb
const spangram = "HOPPENSTEDT";

// --- STATE ---
let selected = [];
let foundWords = [];
let isDown = false;

// Notfall: Markieren stoppen wenn Pointer verloren geht
window.addEventListener("pointerup", () => isDown = false);
window.addEventListener("pointercancel", () => isDown = false);
window.addEventListener("mouseleave", () => isDown = false);

// --- RENDER ---
function render() {
  const root = document.getElementById("root");
  root.innerHTML = "";

  const g = document.createElement("div");
  g.className = "grid";

  for (let r = 0; r < 6; r++) {
    for (let c = 0; c < 6; c++) {

      const cell = document.createElement("div");
      cell.className = "cell";
      cell.innerText = grid[r][c];
      cell.dataset.r = r;
      cell.dataset.c = c;

      // Gefundene Wörter farbig darstellen
      foundWords.forEach(w => {
        w.pos.forEach(p => {
          if (p[0] === r && p[1] === c) {
            if (w.isSpangram) {
              cell.classList.add("spangram");
            } else {
              cell.classList.add("found" + w.colorIndex);
            }
          }
        });
      });

      // Aktuelle Auswahl markieren
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
        setTimeout(checkWord, 20); // Safari-Fix
      });

      g.appendChild(cell);
    }
  }

  root.appendChild(g);
}


// --- CHECK FOR WORD ---
function checkWord() {
  if (selected.length === 0) return;

  const word = selected.map(p => grid[p[0]][p[1]]).join("");
  const rev = [...word].reverse().join("");

  let matched = null;

  if (solutions.includes(word)) matched = word;
  if (solutions.includes(rev)) matched = rev;

  if (matched) {
    // Wenn dieses Wort noch nicht gefunden wurde → hinzufügen
    if (!foundWords.some(w => w.word === matched)) {
      foundWords.push({
        word: matched,
        pos: [...selected],
        isSpangram: matched === spangram,
        colorIndex: foundWords.length  // 0,1,2,3... für Farben
      });
    }
  }

  selected = [];
  render();
}

window.onload = render;
