import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';

// ? en un pipe() paso mi map y filtro la info de la api a como quiero y solo trabaja con observables
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  token = null;


  constructor(private http: HttpClient) {

    this.getTokenQuery();
  }

  getThisToken(): any{
    return localStorage.getItem('key');
  }

  getTokenQuery(): any{

    return this.http.get('https://spotify-get-token-api-private.herokuapp.com/get-token')
               .subscribe(data => {

              localStorage.setItem('key', data['access_token']);
              this.token = data['access_token'];
              return data['access_token'];
    });
  }

  getToken(): any{

    return this.getTokenQuery()
                      .pipe(map( (data): any => data['access_token']));
  }

  async getKey(): Promise<any>{
    await this.getTokenQuery();
  }

  getQuery(query: string): Observable<object>{

    const url = `https://api.spotify.com/v1/${query}`;

    const headers = new HttpHeaders(
      {
        Authorization: `Bearer ${this.getThisToken()}`
      }
    );

    return this.http.get(`${url}`, {headers});
  }

  getNewReleases(): any{

    // ! le especifico los headers que tuve en https://developer.spotify.com/console/get-new-releases/?country=&limit=20&offset=

    // * retorno este observable
    return this.getQuery('browse/new-releases?limit=20')
                    .pipe(map( (data): any => data['albums'].items
                    ));
  }

  getArtistas(termino: string): any{

    return this.getQuery(`search?q=${termino}&type=artist&limit=20`)
              .pipe( map( (data): any => {
                  const artists = 'artists';

                  return data[artists].items;
              }));
  }

  getArtista(id: string): any{

    return this.getQuery(`artists/${id}`);
  }

  /**
   *
   * @param id id from artists
   * @param country market where your country is ex CR = costa rica
   */
  getTopTracks(id: string, country: string = 'CR'): any{
    // *  GET https://api.spotify.com/v1/artists/{id}/top-tracks

    return this.getQuery(`artists/${id}/top-tracks?market=${country}`)
                .pipe( map (data => {
                  return data['tracks'];
                }));
  }

}
