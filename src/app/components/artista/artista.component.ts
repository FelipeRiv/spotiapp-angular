import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';


@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styleUrls: ['./artista.component.scss']
})
export class ArtistaComponent implements OnInit {

  artista: any = {};
  topTracks: any[] = [];

  // trackQuery = 'https://open.spotify.com/embed/track/';
  trackUrl = 'https://open.spotify.com/embed?uri=';
  loading = true;
  error = false;

  constructor(private activatedRoute: ActivatedRoute,
              private spotifyService: SpotifyService) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe( paramsId => {
      // console.log(paramsId.id, ' param id obtenido');

      this.getArtista(paramsId.id);
      this.getTopTracks(paramsId.id);
    });
  }

  getArtista(id: string): void{
    this.spotifyService.getArtista(id)
                        .subscribe ( artista => {
                          // console.log(artista);
                          this.artista = artista;
                          this.loading = false;
                        }, (error): any => {

                          this.error = true;
                          this.loading = false;
                          console.log(error);
                        });

  }

  getTopTracks(id: string): void{
    this.spotifyService.getTopTracks(id)
                        .subscribe( topTracks => {

                          console.log(topTracks);
                          this.topTracks = topTracks;
                        }, (error): any => {

                          this.error = true;
                          this.loading = false;
                          console.log(error);
                        });
  }

}
