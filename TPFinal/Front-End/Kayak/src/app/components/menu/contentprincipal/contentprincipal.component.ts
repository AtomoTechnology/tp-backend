import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/services/auth/task.service';
@Component({
  selector: 'app-contentprincipal',
  templateUrl: './contentprincipal.component.html',
  styleUrls: ['./contentprincipal.component.css']
})
export class ContentprincipalComponent implements OnInit {
  menunav:any
  constructor(
    private task: TaskService,
    private router: Router) {
      debugger;
     }

  ngOnInit(): void {
    debugger;
    this.menunav=[
      {
        url:"/ActionKayak",
        displayName:"Crear kayak",
        active:"active kayak"
      },
      {
        url:"/User",
        displayName:"Crear usuario",
        active:"user"
      },
      {
        url:"/Hanger",
        displayName:" Crear parches",
        active:"hanger"
      },
      {
        url:"/Partner",
        displayName:"Crear socio",
        active:"partner"
      }
    ]
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
