import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOrdemdeservicoComponent } from './edit-ordemdeservico.component';

describe('EditOrdemdeservicoComponent', () => {
  let component: EditOrdemdeservicoComponent;
  let fixture: ComponentFixture<EditOrdemdeservicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditOrdemdeservicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOrdemdeservicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
