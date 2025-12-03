import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Passphrase } from './passphrase';

describe('Passphrase', () => {
  let component: Passphrase;
  let fixture: ComponentFixture<Passphrase>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Passphrase]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Passphrase);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
