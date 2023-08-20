import { Component, Input } from "@angular/core";

@Component({
  selector: "app-tile",
  template: ` <p>tile works!</p> `,
  styles: [],
})
export class TileComponent {
  @Input() x!: number;
  @Input() y!: number;
}
