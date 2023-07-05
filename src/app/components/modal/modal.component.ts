import { DOCUMENT } from "@angular/common";
import {
  Component,
  ElementRef,
  Inject,
  Renderer2,
  ViewChild,
} from "@angular/core";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.css"],
})
export class ModalComponent {
  globalInstance: any;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2
  ) {}

  @ViewChild("openModal") openBtn!: ElementRef;
  @ViewChild("closeModal") closeBtn!: ElementRef;
  @ViewChild("modal") modal!: ElementRef;
  @ViewChild("overlay") overlay!: ElementRef;
  @ViewChild("dialog") dialog!: ElementRef;
  @ViewChild("dialog2") dialog2!: ElementRef;

  ngAfterViewInit(): void {
    this.globalInstance = this.renderer.listen(
      this.dialog2.nativeElement,
      "click",
      (e) => {
        console.log(this.renderer);
        const dialogDimensions =
          this.dialog2.nativeElement.getBoundingClientRect();
        if (
          e.clientX < dialogDimensions.left ||
          e.clientX > dialogDimensions.right ||
          e.clientY < dialogDimensions.top ||
          e.clientY > dialogDimensions.bottom
        ) {
          console.log(e, "trigger");
          this.dialog2.nativeElement.close();
        }
      }
    );
  }

  // const openBtn = document.querySelector("[data-open-modal]");
  // const closeBtn = document.querySelector("[data-close-modal]");
  // const modal = document.querySelector("[data-modal]");
  // const overlay = document.querySelector("[data-overlay]");
  // openBtn?.addEventListener("click", () => {
  //   modal?.classList.add("open");
  //   overlay?.classList.add("open");
  // });
  // closeBtn?.addEventListener("click", () => {
  //   modal?.classList.remove("open");
  //   modal?.classList.remove("open");
  // });

  onOpen() {
    console.log("open");
    this.modal.nativeElement.classList.add("open");
    this.overlay.nativeElement.classList.add("open");
  }

  onClose() {
    console.log("close");
    this.modal.nativeElement.classList.remove("open");
    this.overlay.nativeElement.classList.remove("open");
    console.log(this.modal, this.overlay);
  }

  onDialogOpen() {
    console.log(this.dialog);
    // .show() for dialog, .showModal for modal
    // this.dialog.nativeElement.show();
    this.dialog.nativeElement.showModal();
  }

  onDialogClose() {
    this.dialog.nativeElement.close();
  }

  onDialog2Open() {
    this.dialog2.nativeElement.showModal();
  }

  ngOnDestroy(): void {
    this.globalInstance();
  }
}
