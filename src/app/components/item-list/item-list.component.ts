import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { Item } from 'src/app/shared/models/item';
import * as bootstrap from 'bootstrap';
import { ItemView } from 'src/app/shared/utils/enums/ItemView';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  items: Item[] = [];
  currentPage: number = 1;
  viewMode: ItemView = ItemView.Add;
  selectedItem: Item = { id: 0, title: '', body: '' };

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchItems();
  }

  fetchItems(): void {
    this.apiService.getItems().subscribe({
      next: (data: Item[]) => {
        this.items = data;
      },
      error: (error) => {
        console.error('Error fetching items:', error);
      },
    });
  }

  addItem(): void {
    this.viewMode = ItemView.Add;
    this.selectedItem = { id: 0, title: '', body: '' };
    this.displayModal('itemUpsertModal');
  }

  viewItem(item: Item): void {
    this.viewMode = ItemView.View;
    this.selectedItem = { ...item };
    this.displayModal('itemUpsertModal');
  }

  editItem(item: Item): void {
    this.viewMode = ItemView.Edit;
    this.selectedItem = { ...item };
    this.displayModal('itemUpsertModal');
  }

  deleteConfirm(item: Item): void {
    this.selectedItem = item;
    this.displayModal('deleteConfirmationModal');
  }

  confirmDelete(): void {
    this.apiService.deleteItem(this.selectedItem.id).subscribe({
      next: () => {
        this.items = this.items.filter((item) => item.id !== this.selectedItem.id);
        this.selectedItem = { id: 0, title: '', body: '' };
        console.log('Item deleted successfully');
        this.hideModal('deleteConfirmationModal');
      },
      error: (error) => {
        console.error('Error deleting item:', error);
      },
    });
  }

  saveItem(item: { id: number; title: string; body: string }): void {
    if (this.viewMode === ItemView.Add) {
      this.apiService.addItem(item).subscribe({
        next: (newItem: Item) => {
          this.items.push(newItem);
          console.log('Item added successfully');
          this.hideModal('itemUpsertModal');
        },
        error: (error) => {
          console.error('Error adding item:', error);
        },
      });
    } else if (this.viewMode === ItemView.Edit) {
      const updatedItem = { ...this.selectedItem, ...item };
      this.apiService.updateItem(updatedItem).subscribe({
        next: () => {
          const index = this.items.findIndex((i) => i.id === updatedItem.id);
          if (index !== -1) this.items[index] = updatedItem;
          console.log('Item updated successfully');
          this.hideModal('itemUpsertModal');
        },
        error: (error) => {
          console.error('Error updating item:', error);
        },
      });
    }
  }

  cancel(modalId: string): void {
    this.selectedItem = { id: 0, title: '', body: '' };
    this.hideModal(modalId);
  }

  private displayModal(modalId: string): void {
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    } else {
      console.error('Modal element not found:', modalId);
    }
  }

  // private hideModal(modalId: string): void {
  //   const modalElement = document.getElementById(modalId);
  //   if (modalElement) {
  //     const modal = new bootstrap.Modal(modalElement);
  //     console.log('Hide modal', modal);

  //     modal.hide(); // This should close the modal directly
  //   } else {
  //     console.error('Modal element not found:', modalId);
  //   }
  // }

    private hideModal(modalId: string): void {
      const modalElement = document.getElementById(modalId);
      if (modalElement) {
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) {
          console.log('Existing modal instance:', modal);
          modal.hide();  // Hide the modal
        } else {
          console.log('No modal instance found, creating a new one');
          const newModal = new bootstrap.Modal(modalElement);
          newModal.hide();
        }
      } else {
        console.error('Modal element not found:', modalId);
      }
    }

}
