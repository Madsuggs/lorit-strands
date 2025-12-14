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

const spangram = "HOPPENSTEDT";  // wird gelb dargestellt

let selected = [];
let foundWords = [];     // speichert die Buchstaben-Positionen korrekt
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

      // bereits gefundene Wörter färben
      foundWords.forEach(word => {
        word.pos.forEach(p => {
          if (p[0] === r && p[1] === c) {
            cell.classList.add(word.isSpangram ? "spangram" : "found");
          }
        });
      });

      // aktuelle Auswahl markieren
      if (selected.some(p => p[0] === r && p[1] === c)) {
        cell.classList.add("selected");
      }

      // Maus / Touch Events
      cell.addEventListener("pointerdown", (e) => {
        e.preventDefault();
        isDown = true;
        selected = [[r, c]];
        render();
      });

      cell.addEventListener("pointerenter", (e) => {
        if (isDown) {
          selected.push([r, c]);
          render();
        }
      });

      cell.addEventListener("pointerup", () => {
        isDown = false;
        checkWord();
      });

      g.appendChild(cell);
    }
  }

  root.appendChild(g);
}

function checkWord() {
  if (selected.length === 0) return;

  const word = selected.map(p => grid[p[0]][p[1]]).join("");
  const rev = word.split("").reverse().join("");

  let matched = null;

  if (solutions.includes(word)) matched = word;
  if (solutions.includes(rev)) matched = rev;

  if (matched) {
    foundWords.push({
      word: matched,
      pos: [...selected],
      isSpangram: matched === spangram
    });
  }

  selected = [];
  render();
}

window.onload = () => {
  render();
};
