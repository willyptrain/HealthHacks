import {Injectable} from '@angular/core';


@Injectable()
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
            return 'en-US';
        }
        if(language == "Spanish"){
            return 'es';
        }
        else{
            return 'fr';
        }
    }


    translateText(lang1, lang2, transcript){


      //   let api = "AIzaSyBfxUHvG5D1YI4ehvEZHYnH47zoyQS_yIc";
      //   // @ts-ignore
      // let googleTranslate = require('google-translate')(api);
      //
      //   let text = transcript;
      //   //console.log("English :>",lang1);
      //   let langCode2 = this.getLanguageCode(lang2);
      //   googleTranslate.translate(text, langCode2, function(err, translation) {
      //   //console.log("Spanish :>",translation.translatedText);
      //       this.setTranslatedText(translation.translatedText);
      //   });
        }






}
