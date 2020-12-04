import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'domseguro'
})
export class DomseguroPipe implements PipeTransform {

  constructor(private domSanitizer: DomSanitizer){}

  /**
   *
   * @param value url track form spotify
   * @param uri  property uri from track object
   */
  transform(value: string, uri: string): unknown {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(value + uri);
  }

}
