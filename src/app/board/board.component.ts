import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-board",
  templateUrl: "./board.component.html",
  styleUrls: ["./board.component.scss"]
})
export class BoardComponent implements OnInit {
  cardBoard: number[][];

  elementToMove: number;
  turn: number;
  numrow: number;
  constructor(private _snackbar: MatSnackBar) {
    this.cardBoard = [];
    this.turn = 0;
    this.numrow = 3;
  }

  ngOnInit() {
    this.newGame();
  }

  newGame() {
    this.turn = 0;
    this.cardBoard = [];
    for (let i = 0; i < this.numrow; i++) {
      this.cardBoard[i] = [];
      for (let j = 0; j < this.numrow; j++) {
        this.cardBoard[i][j] = j + this.numrow * i + 1;
      }
    }
    const missing = this.cardBoard[this.numrow - 1][this.numrow - 1];
    this.cardBoard[this.numrow - 1][this.numrow - 1] = null;
    this.cardBoard.forEach(subCardBoard => {
      subCardBoard.sort(() => Math.random() - 0.5);
    });
    this.cardBoard.sort(() => Math.random() - 0.5);
    this.isSolvable(missing);
  }

  newGameX(row: number) {
    this.numrow = row;
    this.newGame();
  }

  isSolved() {
    let solved = true;
    for (let i = 0; i < this.cardBoard.length; i++) {
      for (let j = 0; j < this.cardBoard[i].length; j++) {
        if (
          this.cardBoard[i][j] &&
          this.cardBoard[i][j] !== j + this.numrow * i + 1
        ) {
          solved = false;
        }
      }
    }
    if (solved && this.turn !== 0) {
      this._snackbar.open(   'Félicitation, tu as gagné !!!', 'BRAVO',
        {
          duration: 3000
        });
    }
    return solved;
  }

  isSwapable(value) {
    let i, j, k, v;
    this.cardBoard.forEach(list => {
      if (list.includes(value)) {
        i = this.cardBoard.indexOf(list);
        j = list.indexOf(value);
      }
      if (list.includes(null)) {
        k = this.cardBoard.indexOf(list);
        v = list.indexOf(null);
      }
    });
    if (
      (i === k && (j === v + 1 || j === v - 1)) ||
      (j === v && (i === k + 1 || i === k - 1))
    ) {
      const temp = this.cardBoard[i][j];
      this.cardBoard[i][j] = this.cardBoard[k][v];
      this.cardBoard[k][v] = temp;
      this.turn++;
      this.isSolved();
    }
  }

  isSolvable(missing) {
    if (this.isSolved()) {
      this.newGame();
    }
    const flatArray = [];
    let countSwap = 0;
    this.cardBoard.forEach(list => {
      list.forEach(element => flatArray.push(element));
    });
    const positionEmpty =  flatArray.length - 1 - flatArray.indexOf(null);
    flatArray[positionEmpty] = missing;

    for (let i = flatArray.length - 1; i > 0; i--) {
      for (let j = 0; j < i; j++) {
        if (flatArray[j + 1] < flatArray[j]) {
          const temp = flatArray[j + 1];
          flatArray[j + 1] = flatArray[j];
          flatArray[j] = temp;
          countSwap++;
        }
      }
    }
    if (countSwap % 2 !== positionEmpty % 2) {
      this.newGame();
    }
  }
}
