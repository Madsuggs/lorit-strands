body {
  font-family: Arial, sans-serif;
  text-align: center;
  margin: 20px;
  user-select: none;
}

#root {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(6, 50px);
  gap: 5px;
}

.cell {
  width: 50px;
  height: 50px;
  background: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  border-radius: 6px;
}

/* aktuelle Auswahl */
.selected {
  background: #99ccff !important;
}

/* gefundene Wörter */
.found {
  background: #77dd77 !important;
}

/* Spangram gelb */
.spangram {
  background: #ffeb3b !important;
}
