const grid = [
["L","A","M","J","O","D"],
["E","I","E","D","L","E"],
["A","T","T","I","P","L"],
["N","E","O","H","M","O"],
["S","P","P","T","U","D"],
["T","E","D","L","E","N"]
];

const solutions = ["LAMETTA", "EI", "JODELDIPLOM", "NUDEL", "HOPPENSTEDT"];
const spangram = "HOPPENSTEDT";

let isDown = false;
let selected = [];
let usedPositions = new Set();     // verhindert mehrfaches Ziehen über dieselbe Zelle
let foundWords = [];

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

            // Markiere gefundene Wörter
            for (const fw of foundWords) {
                for (const p of fw.pos) {
                    if (p[0] === r && p[1] === c) {
                        cell.classList.add(fw.isSpangram ? "spangram" : "found");
                    }
                }
            }

            // Markiere aktuelle Auswahl
            if (selected.some(p => p[0] === r && p[1] === c)) {
                cell.classList.add("selected");
            }

            // EVENTS
            cell.addEventListener("pointerdown", e => {
                e.preventDefault();
                isDown = true;
                selected = [[r, c]];
                usedPositions = new Set([`${r},${c}`]);
                render();
            });

            cell.addEventListener("pointerenter", e => {
                if (!isDown) return;

                const key = `${r},${c}`;
                if (!usedPositions.has(key)) {
                    usedPositions.add(key);
                    selected.push([r, c]);
                    render();
                }
            });

            cell.addEventListener("pointerup", e => {
                isDown = false;
                finishSelection();   // WICHTIG: wird erst NACH dem Up ausgeführt
            });

            g.appendChild(cell);
        }
    }
    root.appendChild(g);
}

function finishSelection() {
    if (selected.length === 0) return;

    const word = selected.map(p => grid[p[0]][p[1]]).join("");
    const rev = [...word].reverse().join("");

    let matched = null;
    if (solutions.includes(word)) matched = word;
    if (solutions.includes(rev)) matched = rev;

    if (matched) {
        // nur aufnehmen, wenn noch nicht gespeichert
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
