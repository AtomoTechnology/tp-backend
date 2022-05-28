import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiController } from 'src/app/apicontroller/api.controller';
import { User } from 'src/app/classes/user.class';
import { TaskService } from 'src/app/services/auth/task.service';
import { GenericService } from 'src/app/services/generic/generic.service';
import { LoadscriptService } from 'src/app/services/loadScript/loadscript.service';
import Swal from 'sweetalert2';

const urljs = '../../../assets/js/menu.js';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles: [
  ]
})
export class ListComponent implements OnInit {

  userlist :Array<User> = [];
  menunav:any;
  private ctrl = new ApiController();
  
  constructor(
    private task: TaskService, private loadscript: LoadscriptService,
    private router: Router,private genericService:GenericService) { }

    ngOnInit(): void {
      debugger;
      // this.loadscript.loadScript(urljs);     
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
  
    Delete(id){
      Swal.fire({
        title: '¿Esta seguro desea eliminarlo?',
        text: 'Este registro se va a eliminar para siempre',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.isConfirmed) {
          debugger;
          this.genericService.Delete(id, this.ctrl.user).subscribe((data:any) =>{
            debugger;
            if(data.status === 200){
              debugger;
            Swal.fire(
              'Eliminado!',
              'El registro fue eliminado con exito',
              'success'
            ).then((result) =>{
                this.GetAll();
            })
            }
            
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Cancelado',
            'El registro fue cancelado',
            'error'
          )
        }
      })
    }
}
