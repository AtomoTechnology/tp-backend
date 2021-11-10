import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiController } from 'src/app/apicontroller/api.controller';
import { KayakType } from 'src/app/classes/kayaktype';
import { GenericService } from 'src/app/services/generic/generic.service';
import Swal from 'sweetalert2';
import { KayakModule } from '../../../modules/kayak/kayak.module';
import { Kayak } from '../../../classes/kayak';

@Component({
  selector: 'app-kayaktype',
  templateUrl: './kayaktype.component.html',
  styleUrls: ['./kayaktype.component.css']
})
export class KayaktypeComponent implements OnInit {

  list :Array<KayakType> = [];
  kayak:Array<Kayak> = [];
  menunav:any;
  private ctrl = new ApiController();

  constructor(private genericService:GenericService) { }

  ngOnInit(): void {
    this.GetAll();
  }
  GetAll(){
    debugger;
    this.genericService.GetAll("", this.ctrl.kayaktype).subscribe( (data) =>{
      debugger;
      this.list = data;
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
        this.genericService.Delete(id, this.ctrl.kayaktype).subscribe((data:any) =>{
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

  
  Detail(detail:Kayak[]):void{
    this.kayak = detail;
  }
}
