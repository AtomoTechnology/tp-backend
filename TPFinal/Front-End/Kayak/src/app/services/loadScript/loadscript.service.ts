import { Injectable } from '@angular/core';

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
}
