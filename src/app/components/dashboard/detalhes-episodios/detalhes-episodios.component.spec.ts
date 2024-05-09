import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesEpisodiosComponent } from './detalhes-episodios.component';

describe('DetalhesEpisodiosComponent', () => {
  let component: DetalhesEpisodiosComponent;
  let fixture: ComponentFixture<DetalhesEpisodiosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalhesEpisodiosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalhesEpisodiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
