import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noimage'
})
export class NoimagePipe implements PipeTransform {

  // ? recibo el arreglo de imagenes
  transform(images: any[]): unknown {

    // * si vienen vacias regresar una img que exista
    if (!images) {
      return 'assets/img/noimage.png';
    }else if (images.length > 0){
      return images[0].url;
    }else{
      return 'assets/img/noimage.png';

    }
  }

}
