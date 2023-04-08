import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSimplifiedComponent } from './select-simplified.component';

describe('SelectComponent', () => {
  let component: SelectSimplifiedComponent;
  let fixture: ComponentFixture<SelectSimplifiedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectSimplifiedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectSimplifiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
