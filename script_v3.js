const grid = [
["L","A","M","J","O","D"],
["E","I","E","D","L","E"],
["A","T","T","I","P","L"],
["N","E","O","H","M","O"],
["S","P","P","T","U","D"],
["T","E","D","L","E","N"]
];

const solutions = ["LAMETTA","EI","JODELDIPLOM","NUDEL","HOPPENSTEDT"];
const spangram = "HOPPENSTEDT";

let selected = [];
let foundWords = [];
let isDown = false;

window.onload = () => {
  render();
};

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

      // Bereits gefundene Wörter zeigen
      foundWords.forEach((w, index) => {
        w.pos.forEach(p => {
          if (p[0] === r && p[1] === c) {
            cell.classList.add(
              w.word === spangram ? "spangram" : ("found" + index)
            );
          }
        });
      });

      // aktuelle Auswahl farbig machen
      if (selected.some(p => p[0] === r && p[1] === c)) {
        cell.classList.add("selected");
      }

      // Pointer events
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
  const rev = [...word].reverse().join("");

  let matched = null;

  if (solutions.includes(word)) matched = word;
  if (solutions.includes(rev)) matched = rev;

  if (matched) {
    // nur hinzufügen, wenn wirklich neu
    if (!foundWords.some(w => w.word === matched)) {
      foundWords.push({
        word: matched,
        pos: [...selected]
      });
    }
  }

  selected = [];
  render();
}
