
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
import { DatePipe } from '@angular/common';
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

  constructor(private route: ActivatedRoute, patientService: PatientService,private datePipe: DatePipe,
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


  }

  saveToPDF(text) {
    this.translation = text;
    let doc = new jsPDF();
    doc.setFont("Courier");
    var fontSize = 16;
    var offsetY = 5;
    var lineHeight = 6.49111111111111;

    doc.setFontSize(fontSize);
    let now = new Date();
    let date = this.datePipe.transform(now, "dd-MM-yyyy");
    let patientName = this.patient.firstName + " " + this.patient.lastName;
    let patientDOB = this.patient.DOB;
    let doctor = this.patient.doctorAssigned;
    let width = doc.internal.pageSize.width;
//doc.text('Patient Meeting on ' + date, 10, 10 + lineHeight* 0 + offsetY, null, null, "center");
    doc.text(width*.25, 10 + lineHeight * 0 + offsetY, 'Patient Meeting on ' + date);
    doc.text(10, 10 + lineHeight * 2 + offsetY, "Name: " + patientName + "\n");
    doc.text(10, 10 + lineHeight * 3 + offsetY, "Date of birth: " + patientDOB + "\n");
    doc.text(10, 10 + lineHeight * 4 + offsetY, "Doctor: " + doctor + "\n");
    doc.text(10, 10 + lineHeight * 7 + offsetY, 'Translation of Report:');
    doc.text(10, 10 + lineHeight * 9 + offsetY, text); // typescript compile time error
    doc.save(patientName + " " + date + ".pdf");
    this.addRecord();
  }

  addRecord() {
    if(this.patient) {
      let now = new Date();
      let date = this.datePipe.transform(now, "ddMMyyyy");
      let translationObj = {
        "text":this.translation,
        "date":date
      }
      console.log(this.patient.recordings);
      if(this.patient.recordings) {
        this.patient.recordings.push(translationObj);
      }
      this.patientService.addRecording(this.patient).subscribe(val => {
        console.log("success");
      });

    }
  }
  toggleListen() {
    this.stillListening = !this.stillListening;
  }
  translate() {
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

  start() {
    this.toggleListen();
    if(this.stillListening) {
      this.speechService.continuous = true;
      this.speechService.start();
    } else {
      this.speechService.stop();
      console.log(this.message);
    }
  }


  playAudio(){
    if(this.translation) {
      console.log(this.translation);
      var msg = new SpeechSynthesisUtterance(this.translation);
      msg.lang = "fr";
      window.speechSynthesis.speak(msg);
    }
  }






}
