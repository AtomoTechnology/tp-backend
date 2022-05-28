import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiController } from 'src/app/apicontroller/api.controller';
import { Role } from 'src/app/classes/role';
import { User } from 'src/app/classes/user.class';
import { GenericService } from 'src/app/services/generic/generic.service';
import { MessageService } from 'src/app/services/message/message.service';
import { TaskService } from '../../../services/auth/task.service';

@Component({
  selector: 'app-actionuser',
  templateUrl: './actionuser.component.html',
  styles: [`
  .info{
    float: right;
    position: relative;
    top: 7%;
    font-size: 1.4rem
}
  `
  ]
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
    private router:Router,private genericService:GenericService,
    private messageService: MessageService, private task: TaskService) {
      debugger;
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
        debugger;   
        this.rolelist = role;
        Active();
      });
    }
  
    GetAllDocument(){
      debugger;
      this.genericService.GetAll("", this.ctrl.documenttype).subscribe((ser) =>{
        debugger;
        this.doclist = ser;
      });
    }
  
    GetById(id){
      this.genericService.GetById(id, this.ctrl.user).subscribe(result =>{
        debugger;
        this.user = JSON.parse(JSON.stringify(result));
        this.browserForm.patchValue(result);
      })
    }
    
    
      private initForm():void{
        let val1 = this.OptionBtn == false ?[
          Validators.required,Validators.minLength(6), Validators.maxLength(50)]: '';
  
        let val2 = this.OptionBtn == false ?[ Validators.required, Validators.minLength(6),
          Validators.maxLength(50),Validators.pattern(/^[A-Za-z0-9 ]+$/)]: '';
  
        let val3 = this.OptionBtn == false ? Validators.required : 0;
  debugger;
        this.browserForm = this.fb.group({
          id:0,      
          documentTypeId: ['',[Validators.required]],
          firstName: ['',[Validators.required]],
          lastName: ['',[Validators.required]],
          docNumber: ['',[Validators.required]],
          mail: ['',[Validators.required,Validators.pattern(this.isEmail)]],
          address:['',[Validators.required]],
          phone:['',[Validators.required]],
          roleId:['',val3],
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
          this.browserForm.value.roleId = parseInt(this.task.GetRoleId())
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
            this.router.navigate(['Browser/User']);
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
            this.router.navigate(['Browser/User']);
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
