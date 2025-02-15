import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDeleteConfirmComponent } from './item-delete-confirm.component';

describe('ItemDeleteConfirmComponent', () => {
  let component: ItemDeleteConfirmComponent;
  let fixture: ComponentFixture<ItemDeleteConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemDeleteConfirmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemDeleteConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
