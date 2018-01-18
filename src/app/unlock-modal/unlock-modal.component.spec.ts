import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnlockModalComponent } from './unlock-modal.component';

describe('UnlockModalComponent', () => {
  let component: UnlockModalComponent;
  let fixture: ComponentFixture<UnlockModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnlockModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnlockModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
