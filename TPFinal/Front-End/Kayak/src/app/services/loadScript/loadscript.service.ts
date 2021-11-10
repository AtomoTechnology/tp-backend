import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

const SECRET_KEY = '@1B2c3D4e5F6g7H8';

@Injectable({
  providedIn: 'root'
})
export class LoadscriptService {

  constructor() { }
  loadScript( urljs: string) {
    const node = document.createElement('script');
    node.src = urljs;
    node.type = 'text/javascript';
    node.async = true;
    node.charset = 'utf-8';
    document.getElementsByTagName('head')[0].appendChild(node);
  }

  Encrypt(txt:string){
    return CryptoJS.AES.encrypt(txt.toString(), SECRET_KEY).toString();
  }

  Decrypt(txt:string){
    return  CryptoJS.AES.decrypt(txt.toString(), SECRET_KEY).toString(CryptoJS.enc.Utf8);
  }
}
