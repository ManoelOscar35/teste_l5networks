import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor() { }

  private nomePersonagem = new BehaviorSubject<string>('');
  private episodio = new BehaviorSubject<string>('');

  setNomePersonagem(value: string) {
    this.nomePersonagem.next(value);
  }

  getNomePersonagem() {
    return this.nomePersonagem.asObservable();
  }

  setEpisodio(value: string) {
    this.episodio.next(value);
  }

  getEpisodio() {
    return this.episodio.asObservable();
  }
}
