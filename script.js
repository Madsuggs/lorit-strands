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
// GLOBALER NOTSTOP gegen Dauer-Markieren
window.addEventListener("pointerup", () => { isDown = false; });
window.addEventListener("pointercancel", () => { isDown = false; });
window.addEventListener("mouseleave", () => { isDown = false; });

window.onload = () => render();

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

      // FARBE FÜR GEFUNDENE WÖRTER
      for (const w of foundWords) {
        for (const p of w.pos) {
          if (p[0] === r && p[1] === c) {
            if (w.isSpangram) {
              cell.classList.add("spangram");
            } else {
              cell.classList.add("found" + w.index);
            }
          }
        }
      }

      // aktuelle Auswahl hervorheben
      if (selected.some(p => p[0] === r && p[1] === c)) {
        cell.classList.add("selected");
      }

      // Pointer Events
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
        setTimeout(checkWord, 15); // Safari-Schutz
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

  let matched =
    solutions.includes(word) ? word :
    solutions.includes(rev)  ? rev  :
    null;

  if (matched) {
    // Prüfen ob dieses Wort bereits gefunden wurde
    const exists = foundWords.some(w => w.word === matched);

    if (!exists) {
      foundWords.push({
        word: matched,
        pos: [...selected],       // ← ganz wichtig: Positionen speichern!
        isSpangram: matched === spangram
      });
    }
  }

  selected = [];
  render();
}
