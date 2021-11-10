import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/services/auth/task.service';
import { MenuserviceService } from 'src/app/services/menu/menuservice.service';
@Component({
  selector: 'app-contentprincipal',
  templateUrl: './contentprincipal.component.html',
  styleUrls: ['./contentprincipal.component.css']
})
export class ContentprincipalComponent implements OnInit {

  menunav:any
  perfil:any;

  constructor(
    private task: TaskService, private menuservice: MenuserviceService,
    private router: Router) {
      debugger;
     }

  ngOnInit(): void {
    
    this.perfil ="/User/Perfil/"+ this.task.GetIdUser();
    this. GetTypeUser();
  }

  GetTypeUser(){
    if (this.task.loggedIn()) {
       this.menunav =  this.menuservice.GetMenu(this.task.GetRole().toLowerCase());
    } 
    else {
      this.router.navigate(['/error']);
      return;
    } 
  }

  Logout(islogout = false){
    debugger;
    if(islogout){
      let val = this.task.Logout();
      if(val){
        this.router.navigate(['/Home']);
      }
    }
  }

}
