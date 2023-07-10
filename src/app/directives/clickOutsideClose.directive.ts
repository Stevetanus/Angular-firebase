import {
  Directive,
  ElementRef,
  Renderer2,
  AfterViewInit,
  Output,
  EventEmitter,
  HostListener,
  OnDestroy,
} from "@angular/core";

@Directive({
  selector: "[clickOutsideClose]",
})
export class ClickOutsideCloseDirective implements AfterViewInit, OnDestroy {
  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  private unsubscribe!: () => void;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.unsubscribe = this.renderer.listen(
      "document",
      "click",
      (event: MouseEvent) => {
        console.log(event.target);
        const target = event.target as HTMLElement;
        if (!this.elementRef.nativeElement.contains(target)) {
          this.close.emit();
        }
      }
    );
  }

  ngOnDestroy(): void {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }
}
