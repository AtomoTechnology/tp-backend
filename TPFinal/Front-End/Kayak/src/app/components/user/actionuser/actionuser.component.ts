import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/classes/user.class';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-actionuser',
  templateUrl: './actionuser.component.html',
  styleUrls: ['./actionuser.component.css']
})
export class ActionuserComponent implements OnInit {
  Option: string ="Crear usuario";
  OptionBtn: boolean = false;
  user :User;
  browserForm: FormGroup;

  constructor(private fb:FormBuilder, private route: ActivatedRoute,
    private router:Router) {
      let id = this.route.snapshot.paramMap.get('id');
      this.initForm();
      if(id !== null){
        this.Option ="Actualizar permiso";
        this.OptionBtn = true;
        this.GetById(parseInt(id));
      }
      else{
        this.Option ="Crear permiso";
        this.OptionBtn = false;
      }
    }

  ngOnInit(): void {
  }

  private initForm():void{
    this.browserForm = this.fb.group({
      id:0,
      name: ['',[Validators.required]],
      description:'',
      creationDate:'',
      state:''
    });
  }

  isValidField(field: string): string{
    const validatedField = this.browserForm.get(field);
    let result = (!validatedField.valid && validatedField.touched) ?
    'is-invalid': validatedField.touched ? 'is-valid':'';
    return result;
  }

  GetById(id){
    // this.roleService.GetById(id).subscribe(result =>{
    //   this.role = JSON.parse(JSON.stringify(result));
    //   let roleid ={
    //     id:  this.role.id,
    //     name:  this.role.name,
    //     description:  this.role.description,
    //     creationDate:  this.role.creationDate,
    //     state:  this.role.state
    //   }
    //   this.browserForm.patchValue(roleid);
    // })
  }
}
