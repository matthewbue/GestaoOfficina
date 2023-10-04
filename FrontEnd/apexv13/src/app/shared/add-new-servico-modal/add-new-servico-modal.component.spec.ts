import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewServicoModalComponent } from './add-new-servico-modal.component';

describe('AddNewServicoModalComponent', () => {
  let component: AddNewServicoModalComponent;
  let fixture: ComponentFixture<AddNewServicoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewServicoModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewServicoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
