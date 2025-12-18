// --- GRID --------------------------------------------------------
const grid = [
["L","A","M","J","O","D"],
["E","I","E","D","L","E"],
["A","T","T","I","P","L"],
["N","E","O","H","M","O"],
["S","P","P","T","U","D"],
["T","E","D","L","E","N"]
];

// --- SOLUTIONS ---------------------------------------------------
const solutions = ["LAMETTA","EI","JODELDIPLOM","NUDEL","HOPPENSTEDT"];
const spangram = "HOPPENSTEDT";

let selected = [];
let foundWords = [];
let isSelecting = false;

// Check adjacency for Strands rules
function isAdjacent(r1,c1,r2,c2){
  return Math.abs(r1-r2)<=1 && Math.abs(c1-c2)<=1;
}

// --- RENDER -------------------------------------------------------
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
      cell.dataset.r = r;
      cell.dataset.c = c;

      // freeze found words
      for (const fw of foundWords){
        if (fw.pos.some(p => p[0]===r && p[1]===c)){
          cell.classList.add(fw.isSpangram ? "spangram" : "found");
        }
      }

      // highlight current selection
      if (selected.some(p => p[0]===r && p[1]===c)){
        cell.classList.add("selected");
      }

      // pointerdown
      cell.addEventListener("pointerdown",(e)=>{
        e.preventDefault();
        isSelecting = true;
        selected = [[r,c]];
        render();
      });

      // pointerenter
      cell.addEventListener("pointerenter",(e)=>{
        if(!isSelecting) return;
        const last = selected[selected.length-1];
        if (isAdjacent(last[0],last[1],r,c)){
          selected.push([r,c]);
          render();
        }
      });

      // pointerup
      cell.addEventListener("pointerup",(e)=>{
        isSelecting = false;
        checkWord();
      });

      g.appendChild(cell);
    }
  }
  root.appendChild(g);
}

// --- CHECK WORD ---------------------------------------------------
function checkWord(){
  if (selected.length===0) return;

  const word = selected.map(p=>grid[p[0]][p[1]]).join("");
  const rev  = [...word].reverse().join("");

  let match = null;

  if (solutions.includes(word)) match = word;
  if (solutions.includes(rev)) match = rev;

  if (match){
    // only add if not already found
    if(!foundWords.some(w=>w.word===match)){
      foundWords.push({
        word: match,
        pos: [...selected],
        isSpangram: match===spangram
      });
    }
  }

  selected = [];
  render();
}

window.onload = render;
