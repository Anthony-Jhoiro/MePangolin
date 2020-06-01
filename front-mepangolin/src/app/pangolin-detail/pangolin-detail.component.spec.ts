import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PangolinDetailComponent } from './pangolin-detail.component';

describe('PangolinDetailComponent', () => {
  let component: PangolinDetailComponent;
  let fixture: ComponentFixture<PangolinDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PangolinDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PangolinDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
