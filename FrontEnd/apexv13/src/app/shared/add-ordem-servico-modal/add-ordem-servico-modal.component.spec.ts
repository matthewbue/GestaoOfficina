import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrdemServicoModalComponent } from './add-ordem-servico-modal.component';

describe('AddOrdemServicoModalComponent', () => {
  let component: AddOrdemServicoModalComponent;
  let fixture: ComponentFixture<AddOrdemServicoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOrdemServicoModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrdemServicoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
