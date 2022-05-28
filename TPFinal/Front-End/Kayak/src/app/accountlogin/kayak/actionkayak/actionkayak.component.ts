import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiController } from 'src/app/apicontroller/api.controller';
import { Kayak } from 'src/app/classes/kayak';
import { GenericService } from 'src/app/services/generic/generic.service';
import { MessageService } from 'src/app/services/message/message.service';
import { TaskService } from '../../../services/auth/task.service';

@Component({
  selector: 'app-actionkayak',
  templateUrl: './actionkayak.component.html',
  styles: [
  ]
})
export class ActionkayakComponent implements OnInit {
  
  Option: string ="Crear kayak";
  OptionBtn: boolean = false;
  kayak:Kayak;
  filteredUsers: any[];

  kayaktypes: any[] =[];
  private ctrl = new ApiController();
  img: string = this.ctrl.img;

  browserForm: FormGroup;
  private isEmail = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

  constructor(private fb:FormBuilder, private route: ActivatedRoute,
              private router:Router,private genericService:GenericService,
              private messageService: MessageService, private task: TaskService) {
      let id = this.route.snapshot.paramMap.get('id');
      this.OptionBtn = id !== null ? true : false;
      this.initForm();
      if(id !== null){
        this.Option ="Actualizar kayak";
        this.GetById(parseInt(id));
      }
      else{
        this.Option ="Crear kayak";
      }
     }

  ngOnInit(): void {
    this.GetAllKayakType();
  }
  GetById(id){
    debugger;
    this.genericService.GetById(id, this.ctrl.kayak).subscribe(result =>{
      debugger;
      this.kayak = JSON.parse(JSON.stringify(result));
      this.img = this.kayak.img;
      this.browserForm.patchValue(this.kayak);

      var userId = {
        userId:{   
          firstName: result.userKayak.firstName,
          id: result.userKayak.id,
          lastName: result.userKayak.lastName,
        }
      }
      
      this.browserForm.patchValue(userId);
    })
  }
  GetAllKayakType(){
    this.genericService.GetAll("", this.ctrl.kayaktype).subscribe(result =>{
      this.kayaktypes = result;
    })
  }

  filterUser(event) {
  let filter = event.query;
  this.genericService.GetAll(filter, this.ctrl.user).subscribe(result =>{
    this.filteredUsers = result;
  })
}

  onFileChanged(event) {
    var file = event.target.files[0];
    file.width = 200;
    file.height = 200;
    debugger;
    if((file.size/ 1024) > 50)
    {
      this.messageService.Warning('Error de tamañano', 'La imagen no puede superar 5 MB');
      return;
    }
    var reader = new FileReader();
    reader.onloadend = () => {
      debugger;
      this.img = reader.result.toString();
      var tam = reader.result.toString().length / 1024 ;
      this.browserForm.value.img = this.img;
    };
    reader.readAsDataURL(file);
  }

  private initForm():void{
    this.browserForm = this.fb.group({
      id:0, 
      KayaktypeId: ['',[Validators.required]], 
      userId: ['',[Validators.required]],  
      accountId: this.task.AccountId(),  
      img: this.img,
      crewmember: ['',[Validators.required]],
      shovelQuantity: ['',[Validators.required]],
      nroKayak: ['',[Validators.required]],
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
      this.browserForm.value.userId = this.browserForm.value.userId.id
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
    this.genericService.Post(this.browserForm.value, this.ctrl.kayak).subscribe((data:any) =>{
      debugger;
      if(data.status === 200){
        setTimeout(()=>{
          this.router.navigate(['/Browser/Kayak']);
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
    this.genericService.Put(this.browserForm.value, this.ctrl.kayak).subscribe((data:any) =>{
      debugger;
      if(data.status === 200){
        setTimeout(()=>{
          this.router.navigate(['/Browser/Kayak']);
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
