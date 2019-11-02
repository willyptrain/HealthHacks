
import {Injectable} from '@angular/core';


@Injectable()
export class RecordingService {
    final_transcript = "";
    // Setter used in startRecording, saves transcription
    setTranscription(transcript){
        this.final_transcript = transcript;
    }
    
    getTranscription(){
        return this.final_transcript;
    }
    
    startRecording(){
    
        const recorder = require('node-record-lpcm16');
    
        // Imports the Google Cloud client library
        const speech = require('@google-cloud/speech');
    
        // Creates a client
        const client = new speech.SpeechClient();
    
        
        const encoding = 'LINEAR16';
        const sampleRateHertz = 16000;
        const languageCode = 'en-US';
    
        const request = {
        config: {
            encoding: encoding,
            sampleRateHertz: sampleRateHertz,
            languageCode: languageCode,
        },
        interimResults: false, // If you want interim results, set this to true
        };
    
        // Create a recognize stream
        const recognizeStream = client
        .streamingRecognize(request)
        .on('error', console.error)
        .on('data', data =>
            process.stdout.write(
            data.results[0] && data.results[0].alternatives[0]
                ? `Transcription: ${data.results[0].alternatives[0].transcript}\n`
                : `\n\nReached transcription time limit, press Ctrl+C\n`
            )
        )
        .on('data', data => this.setTranscription(data.results[0].alternatives[0].transcript));
    
        
    
        // Start recording and send the microDOB input to the Speech API
        recorder
        .record({
            sampleRateHertz: sampleRateHertz,
            threshold: 0,
            // Other options, see https://www.npmjs.com/package/node-record-lpcm16#options
            verbose: false,
            recordProgram: 'sox', // Try also "arecord" or "sox"
            silence: '10.0',
        })
        .stream()
        .on('error', console.error)
        .pipe(recognizeStream);
    
        console.log('Listening, press Ctrl+C to stop.');
            }
            
}
        