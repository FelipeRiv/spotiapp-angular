import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  nuevasCanciones: any[] = [];
  msjError: string;

  loading: boolean; // * muestra icono antes de cargar canciones
  error: boolean;

  constructor(private spotify: SpotifyService) {
    this.error = false;
    this.loading = true;

    this.spotify.getNewReleases()
                .subscribe(data => {

                  this.nuevasCanciones = data;
                  console.log(data);
                  this.loading = false;

                }, (error): any => {

                  if (!spotify.getThisToken() || spotify.getThisToken().length === 0) {
                    this.re();
                  } else {

                    this.error = true;
                    this.msjError = error.error.error.message;
                    this.loading = false;
                  }
                });
   }

   re(): void{
     setTimeout( () => {
        window.location.reload();
     }, 2500);
   }

  ngOnInit(): void {
  }

}
