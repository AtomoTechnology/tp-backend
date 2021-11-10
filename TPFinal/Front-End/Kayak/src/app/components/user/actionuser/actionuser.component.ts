import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/classes/user.class';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentType } from '../../../classes/document';
import { HttpErrorResponse } from '@angular/common/http';
import { Role } from '../../../classes/role';

import { GenericService } from '../../../services/generic/generic.service';
import { ApiController } from '../../../apicontroller/api.controller';
import { MessageService } from 'src/app/services/message/message.service';

declare var $: any;

@Component({
  selector: 'app-actionuser',
  templateUrl: './actionuser.component.html',
  styleUrls: ['./actionuser.component.css']
})
export class ActionuserComponent implements OnInit {
  Option: string ="Crear usuario";
  OptionBtn: boolean = false;
  rolelist :Array<Role> = [];
  doclist :Array<DocumentType> = [];
  user:User;
  private ctrl = new ApiController();

  browserForm: FormGroup;
  private isEmail = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

  constructor(private fb:FormBuilder, private route: ActivatedRoute,
    private router:Router,private genericService:GenericService,private messageService: MessageService) {
      let id = this.route.snapshot.paramMap.get('id');
      this.OptionBtn = id !== null ? true : false;
      this.initForm();
      if(id !== null){
        this.Option ="Actualizar usuario";
        this.GetById(parseInt(id));
      }
      else{
        this.Option ="Crear usuario";
      }
    }

  ngOnInit(): void {
    this.GetAllDocument();
    this.GetAllRole();
  }

  GetAllRole(){
    this.genericService.GetAll("", this.ctrl.role).subscribe((role) =>{      
      this.rolelist = role;
      Active();
    });
  }

  GetAllDocument(){
    this.genericService.GetAll("", this.ctrl.documenttype).subscribe((ser) =>{
      this.doclist = ser;
    });
  }

  GetById(id){
    this.genericService.GetById(id, this.ctrl.user).subscribe(result =>{
      debugger;
      this.user = JSON.parse(JSON.stringify(result));
      this.browserForm.patchValue(this.user);
    })
  }
  
  
    private initForm():void{
      let val1 = this.OptionBtn == false ?[
        Validators.required,Validators.minLength(6), Validators.maxLength(50)]: '';

      let val2 = this.OptionBtn == false ?[ Validators.required, Validators.minLength(6),
        Validators.maxLength(50),Validators.pattern(/^[A-Za-z0-9 ]+$/)]: '';

      let val3 = this.OptionBtn == false ? Validators.required : 0;

      this.browserForm = this.fb.group({
        id:0,      
        idDocumentType: ['',[Validators.required]],
        firstName: ['',[Validators.required]],
        lastName: ['',[Validators.required]],
        docNumber: ['',[Validators.required]],
        mail: ['',[Validators.required,Validators.pattern(this.isEmail)]],
        address:['',[Validators.required]],
        phone:['',[Validators.required]],
        idRole:['',val3],
        userName:['', val1],
        userPass:['', val2],
        state:1
      });  
    }

  isValidField(field: string): string{
    const validatedField = this.browserForm.get(field);
    let result = (!validatedField.valid && validatedField.touched) ?
    'is-invalid': validatedField.touched ? 'is-valid':'';
    return result;
  }

  Create (){
    debugger;
    if(this.browserForm.valid) {
      if(this.OptionBtn == false){
        this.ActionCreate();
      }
      else{
        this.ActionUpdate();
      }
    }   
  }

  
  ActionCreate(){
    debugger;
    this.genericService.Post(this.browserForm.value, this.ctrl.user).subscribe((data:any) =>{
      debugger;
      if(data.status === 200){
        setTimeout(()=>{
          this.router.navigate(['/User']);
        }, 5000);
        this.messageService.Success('Crear Usuario', data.message);
        
      }
      else{
        this.messageService.Error('Error', data.message);
      }
    },
    (err: HttpErrorResponse) => {
      debugger;
      this.messageService.Error('Error', err.error.message);
    });
  }

  ActionUpdate(){
    debugger;
    this.genericService.Put(this.browserForm.value, this.ctrl.user).subscribe((data:any) =>{
      debugger;
      if(data.status === 200){
        setTimeout(()=>{
          this.router.navigate(['/User']);
        }, 5000);
        this.messageService.Success('Actualizar Usuario', data.message);
      }
      else{
        this.messageService.Error('Error', data.message);
      }
    },
    (err: HttpErrorResponse) => {
      debugger;
      this.messageService.Error('Error', err.error.message);
    });
  }
}

function Active(){
  $('.actionmenu').removeClass('active');
  $('.user').addClass('active');
}
