import { Component, ElementRef, Renderer2, ViewChild } from "@angular/core";

@Component({
  selector: "app-mine-sweeper",
  templateUrl: "./mine-sweeper.component.html",
  styleUrls: ["./mine-sweeper.component.css"],
})
export class MineSweeperComponent {
  // 1. Populate a board with tiles/mines
  // 2. Left click on tiles
  //// a. Reveal tiles
  // 3. Right click on tiles
  //// a. Mark tiles
  // 4. Check for win/lose

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  board: { i: number; j: number }[][] = [];
  BOARD_SIZE = 10;
  MILE_COUNTS = 2;
  @ViewChild("boardElement", { static: false }) boardElementRef!: ElementRef;

  ngOnInit(): void {
    for (let i = 0; i < this.BOARD_SIZE; i++) {
      const row = [];
      for (let j = 0; j < this.BOARD_SIZE; j++) {
        row.push({
          i,
          j,
        });
      }
      this.board.push(row);
    }
  }

  ngAfterViewInit(): void {
    const boardElement = this.boardElementRef.nativeElement;
    boardElement.style.setProperty("--size", this.BOARD_SIZE);
    // this.renderer.setStyle(boardElement, "--size", this.BOARD_SIZE);
  }
}
