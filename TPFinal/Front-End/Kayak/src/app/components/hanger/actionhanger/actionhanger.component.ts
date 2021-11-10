import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiController } from 'src/app/apicontroller/api.controller';
import { Hanger } from 'src/app/classes/hanger';
import { GenericService } from 'src/app/services/generic/generic.service';
import { MessageService } from 'src/app/services/message/message.service';

@Component({
  selector: 'app-actionhanger',
  templateUrl: './actionhanger.component.html',
  styleUrls: ['./actionhanger.component.css']
})
export class ActionhangerComponent implements OnInit {
  Option: string ="Crear perchas";
  OptionBtn: boolean = false;
  lists :Array<DocumentType> = [];
  hanger:Hanger;
  private ctrl = new ApiController();

  browserForm: FormGroup;
  private isEmail = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  constructor(private fb:FormBuilder, private route: ActivatedRoute,
    private router:Router,private genericService:GenericService,private messageService: MessageService) {
      let id = this.route.snapshot.paramMap.get('id');
      this.OptionBtn = id !== null ? true : false;
      this.initForm();
      if(id !== null){
        this.Option ="Actualizar perchas";
        this.GetById(parseInt(id));
      }
      else{
        this.Option ="Crear perchas";
      }
     }

     ngOnInit(): void {
      this.GetAllUbication();
    }
  
    GetAllUbication(){
      this.genericService.GetAll("", this.ctrl.location).subscribe((data) =>{
        this.lists = data;
      });
    }
  
    GetById(id){
      this.genericService.GetById(id, this.ctrl.hanger).subscribe(result =>{
        debugger;
        this.hanger = JSON.parse(JSON.stringify(result));
        this.browserForm.patchValue(this.hanger);
      })
    }
    
    
      private initForm():void{  
        this.browserForm = this.fb.group({
          id:0,      
          idLocation: ['',[Validators.required]],
          nrohanger: ['',[Validators.required]],          
          description:'',
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
      this.genericService.Post(this.browserForm.value, this.ctrl.hanger).subscribe((data:any) =>{
        debugger;
        if(data.status === 200){
          setTimeout(()=>{
            this.router.navigate(['/Hanger']);
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
      debugger;
      this.genericService.Put(this.browserForm.value, this.ctrl.hanger).subscribe((data:any) =>{
        debugger;
        if(data.status === 200){
          setTimeout(()=>{
            this.router.navigate(['/Hanger']);
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
