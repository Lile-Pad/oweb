import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HangmanComponent } from './hangman.component';

describe('HangmanComponent', () => {
  let component: HangmanComponent;
  let fixture: ComponentFixture<HangmanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HangmanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HangmanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
