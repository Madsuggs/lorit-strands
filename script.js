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
let isDown = false;

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

      // bereits gelöste Wörter färben
      for (const w of foundWords) {
        for (const p of w.pos) {
          if (p[0] === r && p[1] === c) {
            cell.classList.add(w.isSpangram ? "spangram" : "found");
          }
        }
      }

      // aktuelle Auswahl blau markieren
      if (selected.some(p => p[0] === r && p[1] === c)) {
        cell.classList.add("selected");
      }

      // EVENTS

      // Finger runter → neue Auswahl starten
      cell.addEventListener("pointerdown", e => {
        e.preventDefault();
        isDown = true;
        selected = [[r, c]];
        render();
      });

      // Finger bewegt sich über anderen Buchstaben → hinzufügen
      cell.addEventListener("pointerenter", e => {
        if (isDown) {
          selected.push([r, c]);
          render();
        }
      });

      // iPhone-Workaround: pointerleave löst zuverlässig aus
      cell.addEventListener("pointerleave", e => {
        if (isDown) {
          finishSelection();
        }
      });

      // Fallback für PC-Maus
      cell.addEventListener("pointerup", e => {
        finishSelection();
      });

      g.appendChild(cell);
    }
  }

  root.appendChild(g);
}

function finishSelection() {
  isDown = false;
  setTimeout(checkWord, 5);
}

function checkWord() {
  if (selected.length === 0) return;

  const word = selected.map(p => grid[p[0]][p[1]]).join("");
  const rev = word.split("").reverse().join("");

  let matched =
    solutions.includes(word) ? word :
    solutions.includes(rev)  ? rev  :
    null;

  if (matched) {
    // Wenn Wort noch nicht gespeichert, dann hinzufügen
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

window.onload = render;
