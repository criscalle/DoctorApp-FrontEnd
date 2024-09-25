import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSpecialityComponent } from './list-speciality.component';

describe('ListSpecialityComponent', () => {
  let component: ListSpecialityComponent;
  let fixture: ComponentFixture<ListSpecialityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListSpecialityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListSpecialityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
