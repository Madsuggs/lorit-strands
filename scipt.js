const grid = [
["L","A","M","J","O","D"],
["E","I","E","D","L","E"],
["A","T","T","I","P","L"],
["N","E","O","H","M","O"],
["S","P","P","T","U","D"],
["T","E","D","L","E","N"],
];

const solutions = ["LAMETTA", "EI", "JODELDIPLOM", "NUDEL", "HOPPENSTEDT"];
const spangram = "HOPPENSTEDT";

let selected = [];
let foundWords = [];

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

      for (const word of foundWords) {
        if (word.positions.some(p => p[0] === r && p[1] === c)) {
          cell.classList.add(word.isSpangram ? "spangram" : "found");
        }
      }

      if (selected.some(p => p[0] === r && p[1] === c)) {
        cell.classList.add("selected");
      }

      // Mouse
      cell.onmousedown = () => { selected = [[r, c]]; render(); };
      cell.onmouseenter = e => {
        if (e.buttons === 1) selectExtend(r, c);
      };
      cell.onmouseup = finishSelect;

      // Touch
      cell.ontouchstart = e => {
        e.preventDefault();
        selected = [[r, c]];
        render();
      };
      cell.ontouchmove = e => {
        const t = e.touches[0];
        const el = document.elementFromPoint(t.clientX, t.clientY);
        if (el && el.dataset.r) {
          selectExtend(parseInt(el.dataset.r), parseInt(el.dataset.c));
        }
        e.preventDefault();
      };
      cell.ontouchend = finishSelect;

      g.appendChild(cell);
    }
  }

  root.appendChild(g);
}

function selectExtend(r, c) {
  const last = selected[selected.length - 1];
  if (!last) return;

  const adjacent =
    Math.abs(last[0] - r) <= 1 &&
    Math.abs(last[1] - c) <= 1;

  if (adjacent) {
    selected.push([r, c]);
    render();
  }
}

function finishSelect() {
  if (selected.length === 0) return;

  let normal = selected.map(p => grid[p[0]][p[1]]).join("");
  let reversed = normal.split("").reverse().join("");

  let correct = null;

  if (solutions.includes(normal)) correct = selected;
  else if (solutions.includes(reversed)) correct = [...selected].reverse();

  if (correct) {
    const wordText = correct.map(p => grid[p[0]][p[1]]).join("");

    if (!foundWords.some(w => w.text === wordText)) {
      foundWords.push({
        text: wordText,
        positions: correct,
        isSpangram: wordText === spangram
      });
    }
  }

  selected = [];
  render();
}
