import { Component, OnInit, EventEmitter, Input, Output  } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {
  visible: boolean = true;
  @Output() menu: EventEmitter<any> = new EventEmitter();
  @Output() Logout: EventEmitter<any> = new EventEmitter();
  @Input() linkperfil:any;
  @Input() menunav:any;

  classActivate: string = '';

  constructor() { }

  ngOnInit(): void {
    this.classActivate = this.menunav[0].displayName;
  }
  
  LogoutEmitter(){
    this.Logout.emit(true);
  }

  getClaseCSSActivated(activateclass : string, issub: boolean = false, index: number = 99): string{
  //  debugger;
  // if(activateclass === this.classActivate && ! this.isactual){
  //   this.isactual = true;
  //   return;
  // }
  let count = $('.count').length;
  let arr = [...$('.count')];
  const inventario  = arr[0];
  const arr1 = Array.from($('.count'));
  var arr2 = Array.prototype.slice.call($('.count'));
  // var outerText = $(arr2[0])[0].attr('innerText');
  // var outerText2 = $(arr2[0]);
  var idx = arr2.indexOf( x => x.outerText() === this.classActivate.trim());
  // let arrfinal = arr[this.isIndex];
  // var text = $(arr[this.isIndex]).text().trim();
  let classact = "";
  if($(arr[index]).text().trim() ===  this.classActivate.trim()){
    classact = "nav-link nav-item dropdown text-light";
   }
   else{
    classact = "nav-link  nav-item dropdown text-secondary";
   }
  // const found = idx.find(element => element.text().trim() === this.classActivate);
  // $('.count').each(function() { 
  //   debugger;
  //   var val = $(this).text();
  //   if($(this).text() ===  ""){

  //   }
  // })
    // let classact = issub == false ? ( (activateclass === this.classActivate)?
    //               'nav-link nav-item dropdown text-light' : 
    //               'nav-link  nav-item dropdown text-secondary' ):  
    //               (activateclass === this.classActivate)?
    //               'nav-link dropdown-toggle  text-light':
    //               'nav-link dropdown-toggle  text-secondary';  

    //               $('.nav-link').removeClass('text-light'); 

    return classact;
  }

  activatedClass(activateclass : string){
    if(activateclass === this.classActivate){
      return;
    }
    this.classActivate = activateclass;
  }
}

