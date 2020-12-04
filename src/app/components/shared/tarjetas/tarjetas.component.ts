import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.component.html',
  styleUrls: ['./tarjetas.component.scss']
})
export class TarjetasComponent implements OnInit {

  @Input() items: any[] = [];

  artistId: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  verArtista(item: any): void{

    if (item.type === 'album') {

      // console.log(`album`);
      this.router.navigate(['artist', item.artists[0].id]);

    }else if (item.type === 'artist'){

      // console.log(`artist`);
      this.router.navigate(['artist', item.id]);
    }


  }

}
