import { Component } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged, from, switchMap, takeUntil } from 'rxjs';
import { ListaEpisodios } from 'src/app/interfaces/ListaEpisodios';
import { Episodio } from 'src/app/interfaces/episodio';
import { ApiService } from 'src/app/services/api.service';
import { StoreService } from 'src/app/shared/store.service';

@Component({
  selector: 'app-episodios',
  templateUrl: './episodios.component.html',
  styleUrls: ['./episodios.component.scss']
})
export class EpisodiosComponent {

  episodiosArray!: Episodio[];
  private pesquisa: Subject<string> = new Subject<string>();
  unsubscribe$: Subject<any> = new Subject<any>();

  constructor(
    private apiService: ApiService,
    private storeService: StoreService
  ) {}

  ngOnInit() {
    this.getEpisodios();

    this.pesquisa
    .pipe(
      takeUntil(this.unsubscribe$),
      debounceTime(1000), //executa a ação do switchMap após 1 segundo
      distinctUntilChanged(), //preveni que ocorra duas pesquisas idênticas
      switchMap((termoDaBusca: string) => {
        if (termoDaBusca.trim() === '') {
          return from([]);
        }
        return this.apiService.buscaEpisodios(termoDaBusca);
      })
    )
    .subscribe({
      next: (res: any) => { 
        this.episodiosArray = [];
        this.episodiosArray.push(res);
      },
      error: (err: Error) => console.error(err),
      complete: () => console.log("Stream concluída com sucesso!")
    })
  }

  //método que insere os episodios no array episodiosArray
  getEpisodios() {
    this.apiService.getEpisodios().pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: (res: ListaEpisodios) => { 
        this.episodiosArray = res.results;
      },
      error: (err: Error) => console.error(err),
      complete: () => console.log("Stream concluída com sucesso!")
    })
  }

  //seta episodio
  episodio(episodio: string) {
    this.storeService.setEpisodio(episodio);
  }

  //método de busca
  buscarMethod(termoDaBusca: string) {
    this.pesquisa.next(termoDaBusca);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next([]);
  }
}
