import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonagensComponent } from './personagens/personagens.component';
import { EpisodiosComponent } from './episodios/episodios.component';
import { DashboardComponent } from './dashboard.component';
import { DetalhesPersonagensComponent } from './detalhes-personagens/detalhes-personagens.component';
import { DetalhesEpisodiosComponent } from './detalhes-episodios/detalhes-episodios.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'personagens', component: PersonagensComponent},
  { path: 'episodios', component: EpisodiosComponent },
  { path: 'detalhes-episodios', component: DetalhesEpisodiosComponent },
  { path: 'detalhes-personagens', component: DetalhesPersonagensComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
