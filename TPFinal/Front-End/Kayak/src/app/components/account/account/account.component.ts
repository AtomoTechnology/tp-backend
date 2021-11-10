import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import decode from 'jwt-decode';
import { TaskService } from 'src/app/services/auth/task.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  accountForm: FormGroup;
  islogincorrect: boolean;
  errmsg: string;
  constructor( private userService: TaskService,
    private router: Router, private fb:FormBuilder) {
      this.initForm();
     }

  ngOnInit(): void {
    this.initForm();
  }
  private initForm():void{
    this.accountForm = this.fb.group({
      userName: ['',[Validators.required]],
      userPass: ['',[Validators.required]]
    });
  }
  isValidField(field: string): string{
    const validatedField = this.accountForm.get(field);
    return(!validatedField.valid && validatedField.touched) ?
      'is-invalid': validatedField.touched ? 'is-valid':'';
  }
  OnSubmit() {
    if(this.accountForm.valid) {
      this.userService.Authentication(this.accountForm.value).subscribe(
        (success) => {
          debugger;
          if (success) {
          let decodotken = decode(this.userService.getJwtToken());
           let role = decodotken['role'];
            if (this.userService.loggedIn() && role === ('admin').toLowerCase()) {
              this.router.navigate(['/Browser']);
            } else if (this.userService.loggedIn() && role === ('socio').toLowerCase()) {
              this.router.navigate(['/socio']);
            } else if (this.userService.loggedIn() && role === ('employee').toLowerCase()) {
              this.router.navigate(['/employee']);
            } else {
              this.router.navigate(['/error']);
            }
          }
        },
        (err: HttpErrorResponse) => {
          debugger;
          this.islogincorrect = true;
          this.errmsg = err.message;
        }
      );
    }
  }
}
