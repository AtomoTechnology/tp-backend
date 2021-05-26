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
     }

  ngOnInit(): void {
    this.menunav=[
      {
        url:"/ActionKayak",
        displayName:"Crear kayak",
        active:"active"
      },
      {
        url:"/User",
        displayName:"Crear usuario",
        active:""
      },
      {
        url:"/Hanger",
        displayName:" Crear parches",
        active:""
      },
      {
        url:"/Partner",
        displayName:"Crear socio",
        active:""
      }
    ]
  }

  Logout(islogout = false){
    debugger;
    if(islogout){
      let val = this.task.Logout();
      if(val){
        this.router.navigate(['/Account']);
      }
    }
  }

}
