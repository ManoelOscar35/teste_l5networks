import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard.component';
import { PersonagensComponent } from './personagens/personagens.component';
import { EpisodiosComponent } from './episodios/episodios.component';
import { DetalhesPersonagensComponent } from './detalhes-personagens/detalhes-personagens.component';
import { DetalhesEpisodiosComponent } from './detalhes-episodios/detalhes-episodios.component';

@NgModule({
  declarations: [
    DashboardComponent,
    NavbarComponent,
    SidebarComponent,
    PersonagensComponent,
    EpisodiosComponent,
    DetalhesPersonagensComponent,
    DetalhesEpisodiosComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
