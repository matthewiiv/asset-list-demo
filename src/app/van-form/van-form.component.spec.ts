import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VanFormComponent } from './van-form.component';

describe('VanFormComponent', () => {
  let component: VanFormComponent;
  let fixture: ComponentFixture<VanFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VanFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VanFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
