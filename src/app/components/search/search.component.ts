import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  artistas: any[] = [];
  loading: boolean;
  error: boolean;

  constructor(private spotify: SpotifyService) {
    this.loading = false;

   }

  ngOnInit(): void {
  }

  buscar(termino: string): void{
    // console.log(termino);

    this.loading = true;
    this.error = false;

    if (termino) {
      // ? el subscribe tiene 2 FN success cuando se ejecuta correcto y error , err => {}
      this.spotify.getArtistas(termino)
                  .subscribe(data => {

                    console.log(data);

                    this.artistas = data;
                    this.loading = false;

                  }, (error): any => {

                    this.error = true;
                    this.loading = false;
                    console.log(error);
                  });
    }
    if (termino === '') {
      this.loading = false;
    }
  }

}
