import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadLocalComponent } from './cad-local.component';

describe('CadLocalComponent', () => {
  let component: CadLocalComponent;
  let fixture: ComponentFixture<CadLocalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadLocalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadLocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
