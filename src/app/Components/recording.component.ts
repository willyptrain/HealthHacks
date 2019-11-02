
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PatientService} from '../Services/patient.services';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {
  SpeechRecognitionLang,
  SpeechRecognitionMaxAlternatives,
  SpeechRecognitionGrammars,
  SpeechRecognitionService, resultList,
} from '@kamiazya/ngx-speech-recognition';
import {TranslationService} from '../Services/translation.service';

import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-recording',
  templateUrl: './recording.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    {
      provide: SpeechRecognitionLang,
      useValue: 'en-US',
    },
    {
      provide: SpeechRecognitionMaxAlternatives,
      useValue: 1
    },
    SpeechRecognitionService
  ]
})

export class RecordingComponent {

  //grab id from browser
  id;
  patient;
  patientService;
  recognition;
  message;
  speechService;
  stillListening;
  translationService;
  translation;

  constructor(private route: ActivatedRoute, patientService: PatientService,
              speechService: SpeechRecognitionService, translationService: TranslationService) {
    this.route = route;
    this.patientService = patientService;
    this.speechService = speechService;
    this.speechService.onresult = (e) => {
      this.message = e.results[0].item(0).transcript;
    };
    this.translationService = translationService;
  }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    if(this.id) {
      this.patientService.getPatient(this.id).subscribe((patient) => {
        this.updatePatient(patient);
      })
    }
  }

  updatePatient(patient) {
    this.patient = patient;
  }

  stopRec() {
    this.stillListening = false;
    this.speechService.stop();
    console.log(this.message);
    this.translationService.setInitialText(this.message);
    this.translationService.translateText("English","Spanish").subscribe(val => {
      // this.translation = val.data.translations[0].translatedText;
      if(val.data.translations) {
        this.saveToPDF(val.data.translations[0].translatedText);
      }
    }, error => {
      console.log(error);
    });



  }

  saveToPDF(text) {
    this.translation = text;
    let doc = new jsPDF();
    doc.text(text, 10, 10); // typescript compile time error
    doc.save('table.pdf');


    
  }

  start() {
    this.speechService.continuous = true;
    this.stillListening = true;
    this.speechService.start();

  }



}
