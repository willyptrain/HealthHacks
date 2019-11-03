import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';

const url = 'https://translation.googleapis.com/language/translate/v2?key=';

@Injectable({
  providedIn: 'root'
})

export class GoogleObj {
  q: string;
  source: string = 'en';
  target: string = 'es';
  readonly format: string = 'text';

  constructor() {}
}
@Injectable({
  providedIn: 'root'
})

export class TranslationService {


  initialText = "";
  translationText = "";



  setInitialText(myText){
    this.initialText = myText;
  }

  getInitalText(){
    return this.initialText;
  }

  setTranslatedText(translatedText){
    this.translationText = translatedText;
  }

//Returns Language Code for a given string. Accepted strings: English, Spanish, French
  getLanguageCode(language){
    if(language == "English"){
      return 'en';
    }
    if(language == "Spanish"){
      return 'es';
    }
    else{
      return 'fr';
    }
  }

  constructor(private _http: HttpClient) {}

  translateText(lang1, lang2){
    let langCode1 = this.getLanguageCode(lang1);
    let langCode2 = this.getLanguageCode(lang2);
    let myGoogleObj = new GoogleObj();
    myGoogleObj.source = langCode1;
    myGoogleObj.target = langCode2;
    myGoogleObj.q = this.initialText;
    if(myGoogleObj.source && myGoogleObj.target && myGoogleObj.q) {
      let key = "AIzaSyBfxUHvG5D1YI4ehvEZHYnH47zoyQS_yIc";
      return this._http.post(url + key, myGoogleObj);
    }
  }



}
