import { Component } from "@angular/core";

@Component({
  selector: "app-landing",
  template: `
    <p>landing works!</p>
    <app-modal></app-modal>
    <app-posts></app-posts>
    <div
      *ngIf="isTest"
      class="test"
      clickOutsideClose
      (close)="close()"
      (blur)="onBlurFunction()"
    >
      Testing Area
      <p class="testP">an outside paragraph</p>
    </div>
  `,
  styleUrls: ["./landing.component.css"],
})
export class LandingComponent {
  isTest = true;

  close() {
    console.log("closing");
    this.isTest = false;
  }

  onBlurFunction(): void {
    // 在這裡處理 onBlur 邏輯
    console.log("The div lost focus");
    // 其他處理邏輯...
  }
}
