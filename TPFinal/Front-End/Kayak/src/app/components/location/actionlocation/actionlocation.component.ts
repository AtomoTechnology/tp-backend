import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiController } from 'src/app/apicontroller/api.controller';
import { Role } from 'src/app/classes/role';
import { Location } from 'src/app/classes/location';
import { GenericService } from 'src/app/services/generic/generic.service';
import { MessageService } from 'src/app/services/message/message.service';

declare var $: any;

@Component({
  selector: 'app-actionlocation',
  templateUrl: './actionlocation.component.html',
  styleUrls: ['./actionlocation.component.css']
})
export class ActionlocationComponent implements OnInit {
  Option: string ="Crear ubicación";
  OptionBtn: boolean = false;
  rolelist :Array<Role> = [];
  doclist :Array<DocumentType> = [];
  location:Location;
  private ctrl = new ApiController();

  browserForm: FormGroup;
  
  constructor(private fb:FormBuilder, private route: ActivatedRoute,
    private router:Router,private genericService:GenericService,private messageService: MessageService) 
    { 
      let id = this.route.snapshot.paramMap.get('id');
    this.OptionBtn = id !== null ? true : false;
    this.initForm();
    if(id !== null){
      this.Option ="Actualizar ubicación";
      this.GetById(parseInt(id));
    }
    else{
      this.Option ="Crear ubicación";
    }
  }

  ngOnInit(): void {
  }

  GetById(id){
    this.genericService.GetById(id, this.ctrl.location).subscribe(result =>{
      debugger;
      this.location = JSON.parse(JSON.stringify(result));
      this.browserForm.patchValue(this.location);
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
    this.genericService.Post(this.browserForm.value, this.ctrl.location).subscribe((data:any) =>{
      debugger;
      if(data.status === 200){
        setTimeout(()=>{
          this.router.navigate(['/Location']);
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
    this.genericService.Put(this.browserForm.value, this.ctrl.location).subscribe((data:any) =>{
      debugger;
      if(data.status === 200){
        setTimeout(()=>{
          this.router.navigate(['/Location']);
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