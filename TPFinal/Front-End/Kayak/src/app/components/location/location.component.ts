import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiController } from 'src/app/apicontroller/api.controller';
import { Location } from 'src/app/classes/location';
import { GenericService } from 'src/app/services/generic/generic.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  list :Array<Location> = [];
  menunav:any;
  private ctrl = new ApiController();

  constructor(private genericService:GenericService) { }

  ngOnInit(): void {
    this.GetAll();
  }
  GetAll(){
    debugger;
    this.genericService.GetAll("", this.ctrl.location).subscribe( (user) =>{
      debugger;
      this.list = user;
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
        this.genericService.Delete(id, this.ctrl.location).subscribe((data:any) =>{
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
