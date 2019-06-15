import { Directive, ElementRef, Input, Renderer2, OnChanges } from '@angular/core';

@Directive({
  selector: '[appCurrencyValueChange]'
})
export class CurrencyValueChangeDirective implements OnChanges {
  @Input() currentVariation: string;
  element: ElementRef;
  renderer: Renderer2;

  constructor(renderer: Renderer2, el: ElementRef) { 
    this.renderer = renderer;
    this.element = el;
  }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    let icon: string = "";
    let color: string = "";
    
    if (this.currentVariation == "up") {
      icon = "fa-arrow-up";
      color = "red";
    } else if (this.currentVariation == "down") {
      icon = "fa-arrow-down"
      color = "green";
    } else {
      icon = "fa-equals"
      color = "grey";
    }   
    
    this.renderer.removeAttribute(this.element.nativeElement, "class");
    this.renderer.removeAttribute(this.element.nativeElement, "style");

    if (icon.length > 0) {
      this.renderer.addClass(this.element.nativeElement, "fa");
      this.renderer.addClass(this.element.nativeElement, icon);
      this.renderer.setStyle(this.element.nativeElement, "color", color);
    }
  }
}
