import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { Item } from 'src/app/shared/models/item';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  title = 'IO-Tech';
  items: Item[] = [];
  currentPage: number = 1;
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    // Using an observer object
    this.apiService.getItems().subscribe({
      next: (data: Item[]) => {
        this.items = data;
      },
      error: (error) => {
        console.error('Error fetching items:', error);
      },
      complete: () => {
        console.log('Fetch items request complete.');
      }
    });
  }

  deleteItem(item: Item): void {
    // this.apiService.deleteItem(id).subscribe({
    //   next: (data: item) => {
    //     console.log('Item deleted:', data);
    //     // Update items array after deleting the item
    //     this.items = this.items.filter((item) => item.id !== id);
    //   },
    //   error: (error) => {
    //     console.error('Error deleting item:', error);
    //   },
    //   complete: () => {
    //     console.log('Delete item request complete.');
    //   }
    // });
  }

  viewItem(item: Item): void {
    console.log(this.items);
  }

  addItem(): void {
    // const newItem: item = {
    //   id: 0,
    //   name: 'New Item',
    //   description: 'This is a new item.',
    //   price: 0
    // };

    // this.apiService.addItem(newItem).subscribe({
    //   next: (data: item) => {
    //     console.log('Item added:', data);
    //     // Update items array after adding the item
    //     this.items.push(data);
    //   },
    //   error: (error) => {
    //     console.error('Error adding item:', error);
    //   },
    //   complete: () => {
    //     console.log('Add item request complete.');
    //   }
    // });
  }

  editItem(item: Item): void {
    // const updatedItem: item = {
    //   id: item.id,
    //   name: 'Updated Item',
    //   description: 'This item has been updated.',
    //   price: 0
    // };

    // this.apiService.updateItem(item.id, updatedItem).subscribe({
    //   next: (data: item) => {
    //     console.log('Item updated:', data);
    //     // Update items array after updating the item
    //     this.items = this.items.map((item) => item.id === data.id ? data : item);
    //   },
    //   error: (error) => {
    //     console.error('Error updating item:', error);
    //   },
    //   complete: () => {
    //     console.log('Update item request complete.');
    //   }
    // });

  }
}
