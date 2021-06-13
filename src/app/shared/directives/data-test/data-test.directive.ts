import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { environment } from '@env/environment';

/**
 * Credits to https://medium.com/better-programming/decouple-tests-with-data-attributes-c920606c5f27
 */
@Directive({
  selector: `[data-test]`,
})
export class DataTestDirective {
  constructor(private el?: ElementRef, private renderer?: Renderer2) {
    if (renderer && el && el.nativeElement && environment.production) {
      renderer.removeAttribute(el.nativeElement, 'data-test');
    }
  }
}
