import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiController } from 'src/app/apicontroller/api.controller';
import { TaskService } from 'src/app/services/auth/task.service';
import { GenericService } from 'src/app/services/generic/generic.service';

declare var  $: any;

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {

  email: string;
  password: string;
  confirmPassword: string;
  accountForm: FormGroup;
  private ctrl = new ApiController();
  
  constructor(
    private taskService: TaskService, private genericService:GenericService,
    private router: Router, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }
  
  private initForm():void{
    this.accountForm = this.fb.group({
      id: this.taskService.AccountId(),
      userName: this.taskService.GetUserName(),
      userPass: ['',[Validators.required]],
      newUserPass: ['',[Validators.required]],
      confirmPass: ['',[Validators.required]]
    });
  }

  isValidField(field: string): string{
    const validatedField = this.accountForm.get(field);
    return(!validatedField.valid && validatedField.touched) ?
      'is-invalid': validatedField.touched ? 'is-valid':'';
  }

  OnSubmit() {
    if(this.accountForm.valid) {
      this.genericService.Put(this.accountForm.value, this.ctrl.auth).subscribe(
        (success) => {
          if (success) {
              this.router.navigate(['/Browser']);
            }else {
              this.router.navigate(['/Error']);
            }
        },
        (err: any) => {
          $('.errmessage').html(err.response.message);
        }
      );
    }
  }
}
