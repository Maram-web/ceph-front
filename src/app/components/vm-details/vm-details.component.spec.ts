import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VmDetailsComponent } from './vm-details.component';

describe('VmDetailsComponent', () => {
  let component: VmDetailsComponent;
  let fixture: ComponentFixture<VmDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VmDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VmDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
