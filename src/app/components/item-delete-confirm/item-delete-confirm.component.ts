import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-item-delete-confirm',
  templateUrl: './item-delete-confirm.component.html',
  styleUrls: ['./item-delete-confirm.component.css'],
})
export class ItemDeleteConfirmComponent {
  @Output() confirmDelete = new EventEmitter<void>(); // Emit when confirmed
  @Output() cancelDelete = new EventEmitter<void>(); // Emit when canceled

  onConfirm(): void {
    this.confirmDelete.emit();
  }

  onCancel(): void {
    this.cancelDelete.emit();
  }
}
