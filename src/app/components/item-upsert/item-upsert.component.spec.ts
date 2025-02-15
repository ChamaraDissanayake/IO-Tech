import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemUpsertComponent } from './item-upsert.component';

describe('ItemUpsertComponent', () => {
  let component: ItemUpsertComponent;
  let fixture: ComponentFixture<ItemUpsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemUpsertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemUpsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
