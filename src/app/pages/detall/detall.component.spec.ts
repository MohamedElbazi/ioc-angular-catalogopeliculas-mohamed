import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallComponent } from './detall.component';

describe('DetallComponent', () => {
  let component: DetallComponent;
  let fixture: ComponentFixture<DetallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetallComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
