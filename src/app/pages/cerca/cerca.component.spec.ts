import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CercaComponent } from './cerca.component';

describe('CercaComponent', () => {
  let component: CercaComponent;
  let fixture: ComponentFixture<CercaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CercaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CercaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
