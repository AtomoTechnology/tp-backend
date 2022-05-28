import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor() { }

  async handleReaderLoaded(readerEvt:string, indicator:any ) {
    debugger;
    var binaryString = indicator.target.result;
    if (readerEvt == "Id") {
      return "data:image/jpeg;base64," +btoa(binaryString);
    }
  }
}
