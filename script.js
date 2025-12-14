const grid = [
["L","A","M","J","O","D"],
["E","I","E","D","L","E"],
["A","T","T","I","P","L"],
["N","E","O","H","M","O"],
["S","P","P","T","U","D"],
["T","E","D","L","E","N"]
];

const solutions = [
  "LAMETTA",
  "EI",
  "JODELDIPLOM",
  "NUDEL",
  "HOPPENSTEDT"
];

const spangram = "HOPPENSTEDT";

let selected = [];
let foundWords = [];
let mouseDown = false;

window.onload = () => {
  render();
};

function render() {
  const root = document.getElementById("root");
  root.innerHTML = "";

  const g = document.createElement("div");
  g.className = "grid";
  g.id = "gridContainer";

  // Wenn Maus den Container verlässt → Auswahl beenden
  g.addEventListener("mouseleave", () => {
    if (mouseDown) finishSelection();
  });

  for (let r = 0; r < 6; r++) {
    for (let c = 0; c < 6; c++) {

      const cell = document.createElement("div");
      cell.className = "cell";
      cell.innerText = grid[r][c];
      cell.dataset.r = r;
      cell.dataset.c = c;

      // Markiere gefundene Wörter
      for (const w of foundWords) {
        for (const p of w.pos) {
          if (p[0] === r && p[1] === c) {
            cell.classList.add(w.isSpangram ? "spangram" : "found");
          }
        }
      }

      // laufende Auswahl markieren
      if (selected.some(p => p[0] === r && p[1] === c)) {
        cell.classList.add("selected");
      }

      // Mouse Events
      cell.addEventListener("mousedown", e => {
        e.preventDefault();
        mouseDown = true;
        selected = [[r, c]];
        render();
      });

      cell.addEventListener("mouseenter", e => {
        if (mouseDown) {
          selected.push([r, c]);
          render();
        }
      });

      // Falls mouseup funktioniert → zusätzlich
      cell.addEventListener("mouseup", () => {
        finishSelection();
      });

      g.appendChild(cell);
    }
  }

  root.appendChild(g);
}

function finishSelection() {
  mouseDown = false;
  checkWord();
}

function checkWord() {
  if (selected.length === 0) return;

  const word = selected.map(p => grid[p[0]][p[1]]).join("");
  const rev = word.split("").reverse().join("");

  let matched = null;
  if (solutions.includes(word)) matched = word;
  if (solutions.includes(rev)) matched = rev;

  if (matched) {

    if (!foundWords.some(w => w.word === matched)) {
      foundWords.push({
        word: matched,
        pos: [...selected],
        isSpangram: matched === spangram
      });
    }
  }

  selected = [];
  render();
}
