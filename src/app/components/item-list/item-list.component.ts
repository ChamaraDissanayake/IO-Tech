import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { Item } from 'src/app/shared/models/item';
import * as bootstrap from 'bootstrap';
import { ItemView } from 'src/app/shared/utils/enums/ItemView';
import { ItemUpsertComponent } from '../item-upsert/item-upsert.component';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  items: Item[] = [];
  filteredItems: Item[] = [];
  currentPage: number = 1;
  viewMode: ItemView = ItemView.Add;
  selectedItem: Item = { id: 0, title: '', body: '' };
  searchQuery: string = '';

  @ViewChild(ItemUpsertComponent) itemUpsertComponent: ItemUpsertComponent | undefined;
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchItems();
  }

  fetchItems(): void {
    this.apiService.getItems().subscribe({
      next: (data: Item[]) => {
        this.items = data;
        this.filteredItems = data; // Initialize filteredItems with all items
      },
      error: (error) => {
        console.error('Error fetching items:', error);
      },
    });
  }

  applySearch(): void {
    if (this.searchQuery) {
      this.filteredItems = this.items.filter(item =>
        item.title.includes(this.searchQuery) ||
        item.body.includes(this.searchQuery)
      );
    } else {
      this.filteredItems = this.items;
    }
    this.currentPage = 1; // Reset to the first page after search
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
        this.filteredItems = this.filteredItems.filter((item) => item.id !== this.selectedItem.id);
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
      const newItem = { ...item, userId: 1 };
      this.apiService.addItem(newItem).subscribe({
        next: (createdItem: Item) => {
          this.items = [createdItem, ...this.items];
          this.filteredItems = [createdItem, ...this.filteredItems];
          console.log('Item added successfully:', createdItem);
          this.hideModal('itemUpsertModal');
        },
        error: (error) => {
          console.error('Error adding item:', error);
        },
      });
    } else if (this.viewMode === ItemView.Edit) {
      const updatedItem = { ...this.selectedItem, ...item };
      const index = this.items.findIndex((i) => i.id === updatedItem.id);

      if (index !== -1) {
        this.items[index] = updatedItem;
        this.filteredItems = this.items.filter(i =>
          i.title.includes(this.searchQuery) ||
          i.body.includes(this.searchQuery)
        );
      }

      this.apiService.updateItem(updatedItem).subscribe({
        next: () => {
          console.log('Item updated successfully:', updatedItem);
          this.hideModal('itemUpsertModal');
        },
        error: (error) => {
          console.error('Error updating item:', error);
          this.hideModal('itemUpsertModal');
        },
      });
    }
  }

  cancel(modalId: string): void {
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

  private hideModal(modalId: string): void {
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      } else {
        const newModal = new bootstrap.Modal(modalElement);
        newModal.hide();
      }
      this.selectedItem = { id: 0, title: '', body: '' };
      this.itemUpsertComponent?.itemForm.reset();
    } else {
      console.error('Modal element not found:', modalId);
    }
  }
}
