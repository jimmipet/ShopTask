import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutCardListItemComponent } from './about-card-list-item.component';

describe('AboutCardListItemComponent', () => {
  let component: AboutCardListItemComponent;
  let fixture: ComponentFixture<AboutCardListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutCardListItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutCardListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
