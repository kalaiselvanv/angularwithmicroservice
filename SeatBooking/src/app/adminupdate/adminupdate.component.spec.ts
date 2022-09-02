import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminupdateComponent } from './adminupdate.component';

describe('AdminupdateComponent', () => {
  let component: AdminupdateComponent;
  let fixture: ComponentFixture<AdminupdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminupdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
