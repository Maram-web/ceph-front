import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CephfsComponent } from './cephfs.component';

describe('CephfsComponent', () => {
  let component: CephfsComponent;
  let fixture: ComponentFixture<CephfsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CephfsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CephfsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
