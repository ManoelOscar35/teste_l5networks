import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, filter, from, map, mergeMap, of, retry, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListaPersonagens } from '../interfaces/listaPersonagens';
import { ListaEpisodios } from '../interfaces/ListaEpisodios';
import { Personagem } from '../interfaces/personagem';
import { Episodio } from '../interfaces/episodio';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  //retorna lista de personagens
  getPersonagens(): Observable<ListaPersonagens> {
    return this.httpClient.get<ListaPersonagens>(`${environment.BASE_URL}/character`)
    .pipe(
      retry(10) //numero de tentativas que vai conectar com o servidor
    )
  }

  //retorna lista de episódios
  getEpisodios(): Observable<ListaEpisodios> {
    return this.httpClient.get<ListaEpisodios>(`${environment.BASE_URL}/episode`)
    .pipe(
      retry(10) //numero de tentativas que vai conectar com o servidor
    )
  }

  //retorna Personagem de acordo com o termo da busca
  public buscaPersonagens(termoDaBusca: string): Observable<Personagem> {
    return this.httpClient.get<ListaPersonagens>(`${environment.BASE_URL}/character`)
    .pipe(
      map((res) => res.results),
      mergeMap((data) => from(data)),
      filter((data) => data.name === termoDaBusca ),
      retry(10) //numero de tentativas que vai conectar com o servidor
    )
    
  }

  
  //retorna Episódio de acordo com o termo da busca
  public buscaEpisodios(termoDaBusca: string): Observable<Episodio> {
    return this.httpClient.get<ListaEpisodios>(`${environment.BASE_URL}/episode`)
    .pipe(
      map((res) => res.results),
      mergeMap((data) => from(data)),
      filter((data) => data.episode === termoDaBusca ),
      retry(10) //numero de tentativas que vai conectar com o servidor
    )
  }
}
