import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiController } from 'src/app/apicontroller/api.controller';
import { Role } from 'src/app/classes/role';
import { User } from 'src/app/classes/user.class';
import { GenericService } from 'src/app/services/generic/generic.service';
import { MessageService } from 'src/app/services/message/message.service';
import { Kayak } from '../../../../classes/kayak';


declare var $: any;

@Component({
  selector: 'app-actionkayaktype',
  templateUrl: './actionkayaktype.component.html',
  styleUrls: ['./actionkayaktype.component.css']
})
export class ActionkayaktypeComponent implements OnInit {

  Option: string ="Crear tipo de kayak";
  OptionBtn: boolean = false;
  kayak:Kayak;
  private ctrl = new ApiController();

  browserForm: FormGroup;
  private isEmail = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  
  constructor(private fb:FormBuilder, private route: ActivatedRoute,
    private router:Router,private genericService:GenericService,private messageService: MessageService) { 
      let id = this.route.snapshot.paramMap.get('id');
      this.OptionBtn = id !== null ? true : false;
      this.initForm();
      if(id !== null){
        this.Option ="Actualizar tipo de kayak";
        this.GetById(parseInt(id));
      }
      else{
        this.Option ="Crear tipo de kayak";
      }
    }

    ngOnInit(): void {
    }
  
    GetById(id){
      this.genericService.GetById(id, this.ctrl.kayaktype).subscribe(result =>{
        debugger;
        this.kayak = JSON.parse(JSON.stringify(result));
        this.browserForm.patchValue(this.kayak);
      })
    }
    
    
      private initForm():void{
        this.browserForm = this.fb.group({
          id:0,      
          name: ['',[Validators.required]],
          description: [''],
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
      this.genericService.Post(this.browserForm.value, this.ctrl.kayaktype).subscribe((data:any) =>{
        debugger;
        if(data.status === 200){
          setTimeout(()=>{
            this.router.navigate(['/Kayak/KayakType']);
          }, 5000);
          this.messageService.Success(data.title, data.message);
          
        }
        else{
          this.messageService.Error(data.title, data.message);
        }
      },
      (err: HttpErrorResponse) => {
        debugger;
        this.messageService.Error(err.error.title, err.error.message);
      });
    }
  
    ActionUpdate(){
      this.genericService.Put(this.browserForm.value, this.ctrl.kayaktype).subscribe((data:any) =>{
        debugger;
        if(data.status === 200){
          setTimeout(()=>{
            this.router.navigate(['/Kayak/KayakType']);
          }, 5000);
          this.messageService.Success(data.title, data.message);
        }
        else{
          this.messageService.Error(data.title, data.message);
        }
      },
      (err: HttpErrorResponse) => {
        debugger;
        this.messageService.Error(err.error.title, err.error.message);
      });
    }
  
  }
  
  function Active(){
    $('.actionmenu').removeClass('active');
    $('.user').addClass('active');
  }
