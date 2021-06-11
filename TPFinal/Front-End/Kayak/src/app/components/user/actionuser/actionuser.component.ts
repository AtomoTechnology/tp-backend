import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/classes/user.class';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentType } from '../../../classes/document';
import { UserService } from 'src/app/services/user/user.service';
import { DocumenttypeService } from '../../../services/documenttype/documenttype.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Role } from '../../../classes/role';
import { MessageService } from '../../../services/message/message.service';
import { RoleService } from 'src/app/services/role/role.service';

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

  browserForm: FormGroup;
  private isEmail = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

  constructor(private roleService: RoleService, private fb:FormBuilder, private route: ActivatedRoute,
    private router:Router,private userService: UserService,private messageService: MessageService,
    private docservice:DocumenttypeService) {
      let id = this.route.snapshot.paramMap.get('id');
      this.initForm();
      if(id !== null){
        this.Option ="Actualizar usuario";
        this.OptionBtn = true;
        this.GetById(parseInt(id));
      }
      else{
        this.Option ="Crear usuario";
        this.OptionBtn = false;
      }
    }

  ngOnInit(): void {
    debugger;
    this.GetAllDocument();
    this.GetAllRole();
  }

  GetAllRole(){
    this.roleService.GetAll().subscribe((role) =>{
      
      this.rolelist = role;
    });
  }

  GetAllDocument(){
    this.docservice.GetAll().subscribe((ser) =>{
      debugger;
      this.doclist = ser;
    });
  }

  GetById(id){
    this.userService.GetById(id).subscribe(result =>{
      this.user = JSON.parse(JSON.stringify(result));
      this.browserForm.patchValue(this.user);
    })
  }
  
  
    private initForm():void{
      this.browserForm = this.fb.group({
        id:0,      
        idDocumentType: ['',[Validators.required]],
        firstName: ['',[Validators.required]],
        lastName: ['',[Validators.required]],
        docNumber: ['',[Validators.required]],
        mail: ['',[Validators.required,Validators.pattern(this.isEmail)]],
        address:['',[Validators.required]],
        phone:['',[Validators.required]],
        idRole:['',[Validators.required]],
        userName:['',[Validators.required, Validators.minLength(6),Validators.maxLength(50)]],
        userPass:['',[Validators.required, Validators.minLength(6),Validators.maxLength(50),Validators.pattern(/^[A-Za-z0-9 ]+$/)]],
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
    this.userService.Post(this.browserForm.value).subscribe((data:any) =>{
      debugger;
      if(data.status === 201){
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
    this.userService.Put(this.browserForm.value).subscribe((data:any) =>{
      if(data.status === 201){
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
      this.messageService.Error('Error', err.error.message);
    });
  }
}
