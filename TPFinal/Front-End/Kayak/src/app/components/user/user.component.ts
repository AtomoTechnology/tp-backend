import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/classes/user.class';
import { TaskService } from 'src/app/services/auth/task.service';
import Swal from 'sweetalert2'
import { LoadscriptService } from '../../services/loadScript/loadscript.service';

import { GenericService } from '../../services/generic/generic.service';
import { ApiController } from '../../apicontroller/api.controller';

const urljs = '../../../assets/js/menu.js';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userlist :Array<User> = [];
  menunav:any;
  private ctrl = new ApiController();
  constructor(
    private task: TaskService, private loadscript: LoadscriptService,
    private router: Router,private genericService:GenericService) {
     }

  ngOnInit(): void {
    this.loadscript.loadScript(urljs);     
    this.GetAll();
  }
  GetAll(){
    debugger;
    this.genericService.GetAll("", this.ctrl.user).subscribe( (user) =>{
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


  Delete(id){
    Swal.fire({
      title: '¿Esta seguro desea eliminarlo?',
      text: 'Este archivo se va a eliminar para siempre',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        debugger;
        this.genericService.Delete(id, this.ctrl.user).subscribe((data:any) =>{
          if(data.result === 'OK')
          debugger;
          Swal.fire(
            'Eliminado!',
            'El archivo fue eliminado con exito',
            'success'
          ).then((result) =>{
              this.GetAll();
          })
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'El archivo fue cancelado',
          'error'
        )
      }
    })
  }

}
