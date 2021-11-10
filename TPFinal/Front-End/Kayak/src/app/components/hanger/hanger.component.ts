import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiController } from 'src/app/apicontroller/api.controller';
import { Hanger } from 'src/app/classes/hanger';
import { GenericService } from 'src/app/services/generic/generic.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-hanger',
  templateUrl: './hanger.component.html',
  styleUrls: ['./hanger.component.css']
})
export class HangerComponent implements OnInit {
  list :Array<Hanger> = [];
  private ctrl = new ApiController();

  constructor(private genericService:GenericService) { }

  ngOnInit(): void {
    this.GetAll();
  }
  GetAll(){
    debugger;
    this.genericService.GetAll("", this.ctrl.hanger).subscribe( (hanger) =>{
      debugger;
      this.list = hanger;
    },
    (err: HttpErrorResponse) => {
      debugger;
    });
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
        this.genericService.Delete(id, this.ctrl.hanger).subscribe((data:any) =>{
              Swal.fire(
                data.title,
                data.message,
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
