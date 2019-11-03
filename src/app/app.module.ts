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
import {
  SpeechRecognitionModule,
} from '@kamiazya/ngx-speech-recognition';
import {DatePipe} from '@angular/common';

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
    AppRoutingModule,
    SpeechRecognitionModule.withConfig({
      lang: 'en-US',
      interimResults: true,
      maxAlternatives: 10,
    })
  ],
  providers: [PatientService, TranslationService, SpeechService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
