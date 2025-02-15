import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { CapitalizePipe } from './shared/pipes/capitalize.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { ItemDeleteConfirmComponent } from './components/item-delete-confirm/item-delete-confirm.component';
import { ItemUpsertComponent } from './components/item-upsert/item-upsert.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ItemListComponent,
    CapitalizePipe,
    ItemDeleteConfirmComponent,
    ItemUpsertComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
