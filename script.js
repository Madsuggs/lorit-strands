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
let found = [];
let isDown = false;

function render(){
    const root = document.getElementById("root");
    root.innerHTML = "";

    const g = document.createElement("div");
    g.className = "grid";

    for(let r=0;r<6;r++){
        for(let c=0;c<6;c++){
            const cell = document.createElement("div");
            cell.className = "cell";
            cell.textContent = grid[r][c];
            cell.dataset.r = r;
            cell.dataset.c = c;

            // Already found
            for(const w of found){
                if(w.pos.some(p=>p[0]===r && p[1]===c)){
                    cell.classList.add(w.isSpangram ? "spangram" : "found");
                }
            }

            // Current selection
            if(selected.some(p=>p[0]===r && p[1]===c)){
                cell.classList.add("selected");
            }

            // Pointer events
            cell.onpointerdown = e => {
                e.preventDefault();
                isDown = true;
                selected = [[r,c]];
                render();
            };

            cell.onpointerenter = e => {
                if(isDown){
                    const last = selected[selected.length-1];
                    if(Math.abs(last[0]-r) <= 1 && Math.abs(last[1]-c) <=1){
                        selected.push([r,c]);
                        render();
                    }
                }
            };

            cell.onpointerup = () => {
                isDown = false;
                checkWord();
            };

            g.appendChild(cell);
        }
    }

    root.appendChild(g);
}

function checkWord(){
    if(selected.length === 0) return;

    const w = selected.map(p => grid[p[0]][p[1]]).join("");
    const rev = [...w].reverse().join("");

    let match = null;
    if(solutions.includes(w)) match = w;
    if(solutions.includes(rev)) match = rev;

    if(match){
        // Don't duplicate
        if(!found.some(x=>x.word === match)){
            found.push({
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

