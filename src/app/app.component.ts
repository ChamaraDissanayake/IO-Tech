import { ApiService } from './core/services/api.service';
import { Component, OnInit } from '@angular/core';
import { Item } from './shared/models/item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'IO-Tech';
  items: Item[] = [];
  constructor(private apiService: ApiService) {}
  ngOnInit() {
    // this.apiService.getItems().subscribe(data => {
    //   this.items = data;
    //   console.log('AppComponent initialized', this.items);
    // });
  }
}
