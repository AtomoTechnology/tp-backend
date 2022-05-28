import { Component, OnInit } from '@angular/core';
import { ApiController } from 'src/app/apicontroller/api.controller';
import { Kayak } from 'src/app/classes/kayak';
import { GenericService } from 'src/app/services/generic/generic.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles: [
    `.modal-header {
          display: initial!important;
      }
      .modal-body > .col-md-12 > .box{    
        height: 42vh!important;
      }
      .modal-content {
          width: 85%!important;
      }
    `
  ]
})
export class ListComponent implements OnInit {
  Listkayak:Kayak[]= [];
  detailmodal:any;
  private ctrl = new ApiController();

  constructor(private genericService:GenericService) { }

  ngOnInit(): void {
    this.GetAll();
  }

  GetAll(){
    this.genericService.GetAll("", this.ctrl.kayak).subscribe(result =>{
      debugger;
      this.Listkayak = result;
    })
  }

  Detail(kayak: Kayak){
    debugger;
    this.detailmodal = kayak;
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
        this.genericService.Delete(id, this.ctrl.kayak).subscribe((data:any) =>{
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
