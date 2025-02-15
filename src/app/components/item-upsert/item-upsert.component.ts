import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemView } from 'src/app/shared/utils/enums/ItemView';
import { Item } from 'src/app/shared/models/item';

@Component({
  selector: 'app-item-upsert',
  templateUrl: './item-upsert.component.html',
  styleUrls: ['./item-upsert.component.css'],
})
export class ItemUpsertComponent implements OnInit {
  @Input() viewMode: ItemView = ItemView.Add;
  @Input() selectedItem: Item = { id: 0, title: '', body: '' };

  @Output() itemSaved = new EventEmitter<{ id: number; title: string; body: string }>();
  @Output() onCancel = new EventEmitter<void>();

  itemForm!: FormGroup; // FormGroup for reactive forms
  itemView = ItemView;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
    if (this.viewMode === ItemView.Edit || this.viewMode === ItemView.View) {
      this.setFormValues(this.selectedItem);
    }
  }

  ngOnChanges(): void {
    if (this.selectedItem && this.itemForm) {
      this.setFormValues(this.selectedItem);
    }
  }

  initializeForm(): void {
    this.itemForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      body: ['', [Validators.required, Validators.maxLength(500)]],
    });
  }

  setFormValues(item: Item): void {
    this.itemForm.patchValue({
      title: item.title,
      body: item.body,
    });

    if (this.viewMode === ItemView.View) {
      this.itemForm.disable(); // Disable form in view mode
    } else {
      this.itemForm.enable(); // Enable form for add/edit mode
    }
  }

  onSubmit(): void {
    if (this.itemForm.valid) {
      this.itemSaved.emit(this.itemForm.value);
    } else {
      alert('Please fill in both Title and Description correctly.');
    }
  }

}
