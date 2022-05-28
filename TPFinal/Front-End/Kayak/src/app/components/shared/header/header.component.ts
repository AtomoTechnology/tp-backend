import { Component, OnInit, EventEmitter, Input, Output  } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
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

  getClaseCSSActivated(activateclass : string, issub: boolean = false): string{
    let classact = issub == false ? ( (activateclass === this.classActivate)?'nav-link nav-item dropdown text-light' : 'nav-link  nav-item dropdown text-secondary' ):  
                  (activateclass === this.classActivate)?'nav-link dropdown-toggle  text-light':'nav-link dropdown-toggle  text-secondary';   
     return classact;
  }

  // class="nav-link dropdown-toggle"

  activatedClass(activateclass : string){
    debugger;
    if(activateclass === this.classActivate){
      return;
    }
    this.classActivate = activateclass;
    // this.paises = [];
    // this.paisService.getRegion(region)   
    // .subscribe(pais=>{
    //   this.paises= pais 
    //   console.log(this.paises);
    // })
  }
}
