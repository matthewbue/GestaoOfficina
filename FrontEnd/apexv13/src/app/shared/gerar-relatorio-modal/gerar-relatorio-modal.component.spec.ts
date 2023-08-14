import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerarRelatorioModalComponent } from './gerar-relatorio-modal.component';

describe('GerarRelatorioModalComponent', () => {
  let component: GerarRelatorioModalComponent;
  let fixture: ComponentFixture<GerarRelatorioModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GerarRelatorioModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GerarRelatorioModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
