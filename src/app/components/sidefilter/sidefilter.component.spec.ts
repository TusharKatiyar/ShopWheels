import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidefilterComponent } from './sidefilter.component';

describe('SidefilterComponent', () => {
  let component: SidefilterComponent;
  let fixture: ComponentFixture<SidefilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidefilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidefilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
