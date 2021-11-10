import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'src/app/services/message/message.service';

declare var $: any;

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  browserForm: FormGroup;
  perfilForm: FormGroup;
  knowlageForm: FormGroup;
  
  idperfil = 0 ;
  user:any;
  profiluser:any;
  profilphoto:any;
  kownlageuser:any;
  porcent = 0;

  titleModal: string;
  actionbtn:string;
  doclist :Array<any> = [];
  userPerfilName:string;
  photolist :Array<any> = [];

  isPerfilCreate:boolean = true;
  isKnowlageCreate:boolean = true;
  
  constructor(private route: ActivatedRoute, private fb:FormBuilder,private messageService: MessageService) {
    debugger;
      this.idperfil = parseInt(this.route.snapshot.paramMap.get('id'));
   }

  ngOnInit(): void {
    this.initForm();
    this.initProfilForm();
    this.initKnowlageForm();
    this.LoadAll();
  }

  LoadAll():void{
    this.GetById(this.idperfil);
    this.GetProfilById(this.idperfil);
    this.GetAllKownlage(this.idperfil);
    this.GetAllPhotoDefault();
   }

   GetById(id){
    // this.userService.GetById(id).subscribe((result:any) =>{
    //   this.user = result;
    //   this.browserForm.patchValue(this.user);
    //   Active();
    // })
  }

  GetProfilById(id){
    // this.profilservice.GetById(id).subscribe((result:any) =>{
    //   debugger;
    //   if(result !== ""){
    //     this.isPerfilCreate = false;
    //     if(result.img == ""){          
    //       this.GetProfilphotoById(2);
    //     }
    //   }
    //   else{        
    //     this.GetProfilphotoById(2);
    //   }
    //   this.profiluser = result;  
    //   this.profilphoto = result.img;     
    //   this.perfilForm.patchValue(this.profiluser);
    // })
  }

  GetKnowlageById(id){
    // this.kownservice.GetById(id).subscribe((result:any) =>{
    //   debugger;
    //   if(result !== ""){
    //     this.isKnowlageCreate = false;
    //   }
    //   // this.profiluser = result;  
    //   this.porcent = result.nivel;    
    //   this.knowlageForm.patchValue(result);
    // })
  }

  GetProfilphotoById(id){
    // this.perfilphotoService.GetById(id).subscribe((result:any) =>{
    //   this.profilphoto = result.url;
    // })
  }
  GetAllKownlage(idUser){
    // this.kownservice.GetAll(idUser).subscribe((result:any) =>{
    //   debugger;
    //   this.kownlageuser = result;
    // })
  }
  GetAllDocument(){
    // this.docservice.GetAll().subscribe((role) =>{
    //   this.doclist = role;
    // });
  }
  
  GetAllPhotoDefault(): void {
    // this.perfilphotoService.GetAll().subscribe( (photo) =>{
    //   this.photolist = photo;
    // });
  }
  onFileChanged(event) {
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onloadend = this.handleReaderLoaded.bind(this, "Id");
    reader.readAsBinaryString(file);
  }

  handleReaderLoaded(readerEvt:string, indicator:any ) {
    var binaryString = indicator.target.result;
    if (readerEvt == "Id") {
      this.profilphoto = "data:image/jpeg;base64," +btoa(binaryString);
      this.perfilForm.value.img = this.profilphoto;
      // $('#exampleModal').modal('toggle');
      // $('.modal').modal('toggle');
      $('#photoperfil').hide('toggle');
    }
  }

  SelectPhoto(photo):void{
    this.profilphoto = photo.url;
    this.perfilForm.value.img = this.profilphoto;
    $('#photoperfil').modal('toggle');
  }

  private initForm():void{
    this.browserForm = this.fb.group({
      id:this.idperfil,      
      idDocumentType: ['',[Validators.required]],
      firstName: ['',[Validators.required]],
      lastName: ['',[Validators.required]],
      docNumber: ['',[Validators.required]],
      mail: [''],
      address:['',[Validators.required]],
      phone:['',[Validators.required]],
      idRole:['',[Validators.required]],
      idUser:this.idperfil,    
      state:1
    });  
  }

  private initProfilForm():void{
    this.perfilForm = this.fb.group({
      id:0,
      idUser:this.idperfil,      
      workplace: '',
      title: ['',[Validators.required]],
      img:'',
      facebook:'',
      gitHub:'',
      instagram:'',
      twitter:'',
      website:'',
      state:1
    });  
  }

  private initKnowlageForm():void{
    this.knowlageForm = this.fb.group({
      id:0,
      idUser:this.idperfil,  
      name: ['',[Validators.required]],
      description:'',
      nivel:['',[Validators.required]],
      state:1
    });  
  }

  isValidField(field: string): string{
    const validatedField = this.browserForm.get(field);
    let result = (!validatedField.valid && validatedField.touched) ?
    'is-invalid': validatedField.touched ? 'is-valid':'';
    return result;
  }

  isValidFieldProfil(field: string): string{
    const validatedField = this.perfilForm.get(field);
    let result = (!validatedField.valid && validatedField.touched) ?
    'is-invalid': validatedField.touched ? 'is-valid':'';
    return result;
  }

  isValidFieldKnowlage(field: string): string{
    const validatedField = this.knowlageForm.get(field);
    let result = (!validatedField.valid && validatedField.touched) ?
    'is-invalid': validatedField.touched ? 'is-valid':'';
    return result;
  }

  ActionUpdateUser():void{
    debugger;
    this.GetAllDocument();
    this.GetById(this.idperfil);
    this.actionbtn ='user';
    this.titleModal = "Actualizar usuario"
  }
  ActionPerfil():void{    
    // this.actionbtn ='perfil'; 
    // this.userPerfilName = this.taskService.GetUserName();

    // if(!this.isPerfilCreate){
    //   this.titleModal = "Actualizar perfil usuario"
    // }
    // else{
    //   this.titleModal = "Agregar perfil usuario"
    // }    
  }
  ActionKnowlage(id):void{
    this.actionbtn ='knowlage'; 
    debugger;
    if(id === 0){
      this.porcent = 0;
      this.knowlageForm.value.nivel = 0;
      $('#inputknowlagenivel').val(0);
      this.isKnowlageCreate = true;
      this.titleModal = "Agregar conocimiento"
    }
    else{ 
      this.GetKnowlageById(id)
      this.titleModal = "Actualizar conocimiento";
      this.isKnowlageCreate = false;
    }
  }
  ShowPorcent(event):void{
    this.porcent = event.target.value !="" ? event.target.value : 0;
    debugger;
  }
  DeleteKnowlage(id):void{
    // Swal.fire({
    //   title: '¿Esta seguro desea eliminarlo?',
    //   text: 'Este archivo se va a eliminar para siempre',
    //   icon: 'warning',
    //   showCancelButton: true,
    //   confirmButtonText: 'Aceptar',
    //   cancelButtonText: 'Cancel'
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     debugger;
    //     this.kownservice.Delete(id).subscribe((data:any) =>{
    //       if(data.result === 'OK')
    //       debugger;
    //       Swal.fire(
    //         'Eliminado!',
    //         'El archivo fue eliminado con exito',
    //         'success'
    //       ).then((result) =>{
    //           this.LoadAll();
    //       })
    //     });
    //   } else if (result.dismiss === Swal.DismissReason.cancel) {
    //     Swal.fire(
    //       'Cancelado',
    //       'El archivo fue cancelado',
    //       'error'
    //     )
    //   }
    // })
  }

  UpdateUser(){
    debugger;
    // if(this.browserForm.valid) {
    //   this.userService.Put(this.browserForm.value).subscribe((data:any) =>{
    //     if(data.response.status === 200){
    //       setTimeout(()=>{         
    //         this.CloseAllModal();
    //       }, 5000);
    //       this.GetById(this.idperfil);         
    //       this.messageService.Success('Actualizar Usuario', data.response.message);
    //     }
    //     else{
    //       this.messageService.Error('Error', data.response.message);
    //     }
    //   },
    //   (err: HttpErrorResponse) => {
    //     this.messageService.Error('Error', err.error.message);
    //   });
    // }
  }

  CreateOrUpdatePerfil():void{
    debugger;
    if(this.perfilForm.valid){
      if(!this.isPerfilCreate){
        this.UpdatePerfil();
      }
      else{
        this.CreatePerfil();
      } 
    }
  }

  CreatePerfil():void{
    // this.profilservice.Post(this.perfilForm.value).subscribe((data:any) =>{
    //   if(data.response.status === 200){
    //     setTimeout(()=>{         
    //       this.CloseAllModal();
    //     }, 5000);
    //     this.GetById(this.idperfil);         
    //     this.messageService.Success('Crear perfil', data.response.message);
    //   }
    //   else{
    //     this.messageService.Error('Error', data.response.message);
    //   }
    // },
    // (err: HttpErrorResponse) => {
    //   this.messageService.Error('Error', err.error.message);
    // });
  }

  UpdatePerfil():void{
    // this.profilservice.Put(this.perfilForm.value).subscribe((data:any) =>{
    //   if(data.response.status === 200){
    //     setTimeout(()=>{         
    //       this.CloseAllModal();
    //     }, 5000);
    //     this.GetById(this.idperfil);         
    //     this.messageService.Success('Actualizar perfil', data.response.message);
    //   }
    //   else{
    //     this.messageService.Error('Error', data.response.message);
    //   }
    // },
    // (err: HttpErrorResponse) => {
    //   this.messageService.Error('Error', err.error.message);
    // });
  }

  CreateOrUpdateKnowlage():void{
    debugger;
    if(this.knowlageForm.valid){
      if(!this.isKnowlageCreate){
        this.UpdateKnowlage();
      }
      else{
        this.CreateKnowlage();
      } 
    }
  }

  CreateKnowlage():void{
    // this.kownservice.Post(this.knowlageForm.value).subscribe((data:any) =>{
    //   debugger;
    //   if(data.response.status === 200){
    //     setTimeout(()=>{         
    //       this.CloseAllModal();
    //     }, 5000);
    //     this.GetAllKownlage(this.idperfil);          
    //     this.messageService.Success('Agregar conocimiento', data.response.message);
    //   }
    //   else{
    //     debugger;
    //     this.messageService.Error('Error', data.response.message);
    //   }
    // },
    // (err: HttpErrorResponse) => {
    //   debugger;
    //   this.messageService.Error('Error', err.error.message);
    // });
  }

  UpdateKnowlage():void{
    // this.kownservice.Put(this.knowlageForm.value).subscribe((data:any) =>{
    //   debugger;
    //   if(data.response.status === 200){
    //     setTimeout(()=>{         
    //       this.CloseAllModal();
    //     }, 5000);
    //     this.GetAllKownlage(this.idperfil);         
    //     this.messageService.Success('Actualizar conocimiento', data.response.message);
    //   }
    //   else{
    //     this.messageService.Error('Error', data.response.message);
    //   }
    // },
    // (err: HttpErrorResponse) => {
    //   debugger;
    //   this.messageService.Error('Error', err.error.message);
    // });
  }

  CloseAllModal():void{
    $("#photoperfil").modal('hide');
    $('#exampleModal').modal('hide');
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
  }
}
