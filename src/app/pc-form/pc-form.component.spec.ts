import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PcFormComponent } from './pc-form.component';

describe('PcFormComponent', () => {
  let component: PcFormComponent;
  let fixture: ComponentFixture<PcFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PcFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PcFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
