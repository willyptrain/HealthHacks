import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './Components/app.component';
import {PatientsComponent} from './Components/patients.component';
import {PatientViewComponent} from './Components/patient.view.component';
import {PatientService} from './Services/patient.services';


@NgModule({
  declarations: [
    AppComponent,
    PatientsComponent,
    PatientViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [PatientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
