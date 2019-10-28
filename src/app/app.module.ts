import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './Components/app.component';
import {ContactsComponent} from './Components/contacts.component';
import {ContactViewComponent} from './Components/contact.view.component';
import {ContactService} from './Services/contact.services';


@NgModule({
  declarations: [
    AppComponent,
    ContactsComponent,
    ContactViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ContactService],
  bootstrap: [AppComponent]
})
export class AppModule { }
