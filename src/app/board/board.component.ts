import { Component, OnInit } from "@angular/core";
const numrow = 3;
const numcol = 3;
@Component({
  selector: "app-board",
  templateUrl: "./board.component.html",
  styleUrls: ["./board.component.scss"]
})
export class BoardComponent implements OnInit {
  cardBoard: number[][];
  isSolved: boolean;
  elementToMove: number;
  constructor() {
    this.cardBoard = [];
  }

  ngOnInit() {
    this.newGame();
  }

  newGame() {
    this.isSolved = false;
    this.cardBoard = [];
    for (let i = 0; i < numrow; i++) {
      this.cardBoard[i] = [];
      for (let j = 0; j < numcol; j++) {
        this.cardBoard[i][j] = j + 3 * i + 1;
      }
    }

    const missing = this.cardBoard[numrow-1][numcol-1];
    this.cardBoard[numrow-1][numcol-1] = null;
    this.cardBoard.forEach(subCardBoard => {
      subCardBoard.sort(() => Math.random() - 0.5);
    });
    this.cardBoard.sort(() => Math.random() - 0.5);
    this.isSolvable(missing);
  }

  verified() {
    let isSolved = true;
    for (let i = 0; i < this.cardBoard.length; i++) {
      for (let j = 0; j < this.cardBoard[i].length; j++) {
        if (this.cardBoard[i][j] && this.cardBoard[i][j] !== j + 3 * i + 1) {
          isSolved = false;
        }
      }
    }
    return isSolved;
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
    }
  }
  isSolvable(missing) {
    const flatArray = [];
    let countSwap = 0;
    this.cardBoard.forEach(list => {
      list.forEach(element => flatArray.push(element));
    });
    const positionEmpty = flatArray.indexOf(null);
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
