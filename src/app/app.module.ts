import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './Components/app.component';
import {PatientsComponent} from './Components/patients.component';
import {PatientViewComponent} from './Components/patient.view.component';
import {PatientService} from './Services/patient.services';
import {TranslationService} from './Services/translation.service';
import { AppRoutingModule } from './app-routing.module';
import {RecordingComponent} from './Components/recording.component';
import {PatientInterfaceComponent} from './Components/patient.interface.component';
import {SpeechService} from './Services/speech.service';

@NgModule({
  declarations: [
    AppComponent,
    PatientsComponent,
    PatientViewComponent,
    RecordingComponent,
    PatientInterfaceComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [PatientService, TranslationService, SpeechService],
  bootstrap: [AppComponent]
})
export class AppModule { }
