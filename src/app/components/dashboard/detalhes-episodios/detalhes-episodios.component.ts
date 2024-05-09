import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ListaEpisodios } from 'src/app/interfaces/ListaEpisodios';
import { Episodio } from 'src/app/interfaces/episodio';
import { ApiService } from 'src/app/services/api.service';
import { StoreService } from 'src/app/shared/store.service';

@Component({
  selector: 'app-detalhes-episodios',
  templateUrl: './detalhes-episodios.component.html',
  styleUrls: ['./detalhes-episodios.component.scss']
})
export class DetalhesEpisodiosComponent {

  episodio!: Episodio | null;
  ep!: string;
  unsubscribe$: Subject<any> = new Subject<any>();

  constructor(
    private apiService: ApiService,
    private storeService: StoreService
  ) {}

  ngOnInit() {
    this.getEpisodio();
    this.getEpisodios();
  }

  //obtem o epsodio e insere no atributo episodio
  getEpisodios() {
    this.apiService.getEpisodios().pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: (res: ListaEpisodios) => { 
        res.results.forEach((e: Episodio) => {
          if(e.episode === this.ep) {
            this.episodio = e;
          }
        });
      },
      error: (err: Error) => console.error(err),
      complete: () => console.log("Stream concluída com sucesso!")
    })
  }

  //obtem o episodio
  getEpisodio() {
    this.storeService.getEpisodio().subscribe({
      next: (res: string) => this.ep = res
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next([]);
  }
}
