import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/classes/user.class';
import { TaskService } from 'src/app/services/auth/task.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userlist :Array<User> = [];
  constructor(
    private task: TaskService,
    private router: Router,private userService: UserService) { }

  ngOnInit(): void {
    this.GetAll();
  }
  GetAll(){
    debugger;
    this.userService.GetAll().subscribe( (user) =>{
      debugger;
      this.userlist = user;
    },
    (err: HttpErrorResponse) => {
      debugger;
    });
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
