import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndivpostComponent } from './indivpost.component';

describe('IndivpostComponent', () => {
  let component: IndivpostComponent;
  let fixture: ComponentFixture<IndivpostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndivpostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndivpostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
