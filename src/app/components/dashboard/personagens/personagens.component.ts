import { Component, OnInit } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged, from, switchMap, takeUntil } from 'rxjs';
import { ListaPersonagens } from 'src/app/interfaces/listaPersonagens';
import { Personagem } from 'src/app/interfaces/personagem';
import { ApiService } from 'src/app/services/api.service';
import { StoreService } from 'src/app/shared/store.service';

@Component({
  selector: 'app-personagens',
  templateUrl: './personagens.component.html',
  styleUrls: ['./personagens.component.scss']
})
export class PersonagensComponent implements OnInit{

  personagensArray!: Personagem[];
  private pesquisa: Subject<string> = new Subject<string>();
  unsubscribe$: Subject<any> = new Subject<any>();

  constructor(
    private apiService: ApiService,
    private storeService: StoreService
  ) {}

  ngOnInit() {
    this.getPersonagens();

    this.pesquisa
    .pipe(
      takeUntil(this.unsubscribe$),
      debounceTime(1000), //executa a ação do switchMap após 1 segundo
      distinctUntilChanged(), //preveni que ocorra duas pesquisas idênticas
      switchMap((termoDaBusca: string) => {
        if (termoDaBusca.trim() === '') {
          return from([]);
        }
        return this.apiService.buscaPersonagens(termoDaBusca);
      })
    )
    .subscribe({
      next: (res: any) => { 
        this.personagensArray = [];
        this.personagensArray.push(res);
      },
      error: (err: Error) => console.error(err),
      complete: () => console.log("Stream concluída com sucesso!")
    })
  }

  getPersonagens() {
    this.apiService.getPersonagens().pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: (res: ListaPersonagens) => { 
        this.personagensArray = res.results
      },
      error: (err: Error) => console.error(err),
      complete: () => console.log("Stream concluída com sucesso!")
    })
  }

  // seta nome do personagem
  nomePersonagem(nome: string) {
    this.storeService.setNomePersonagem(nome);
  }

  //método de busca
  buscarMethod(termoDaBusca: string) {
    this.pesquisa.next(termoDaBusca);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next([]);
  }
}
