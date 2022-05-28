import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/services/auth/task.service';
import decode from 'jwt-decode';

declare var $: any;
@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styles: [
  ]
})
export class PrincipalComponent implements OnInit {
  isVisible: boolean = false;
  accountForm: FormGroup;
  islogincorrect: boolean;
  errmsg: string;
  
  images: any[];  
  responsiveOptions:any[] = [
      {
          breakpoint: '1024px',
          numVisible: 5
      },
      {
          breakpoint: '768px',
          numVisible: 3
      },
      {
          breakpoint: '560px',
          numVisible: 1
      }
  ];

  constructor(private task: TaskService,
    private router: Router, private fb:FormBuilder) {
      this.initForm(); }

  ngOnInit(): void {
    debugger;
    this.task.doLogoutUser();
    $('.pro').on('click', function(){
      alert('Estoy aqui clickeame');
      $('.pro').css
    })
    

    this.images = [
      {
        previewImageSrc: '../assets/img/kayak2.jpg',
        thumbnailImageSrc:'../assets/img/kayak1.jpg'
      },
      {
        previewImageSrc: '../assets/img/kayak1.jpg',
        thumbnailImageSrc:'../assets/img/kayak3.jpg'
      },
      {
        previewImageSrc: '../assets/img/kayak3.jpg',
        thumbnailImageSrc:'../assets/img/kayak4.jpg'
      },
      {
        previewImageSrc: '../assets/img/kayak4.jpg',
        thumbnailImageSrc:'../assets/img/kayak2.jpg'
      },
      {
        previewImageSrc: '../assets/img/kayak2.jpg',
        thumbnailImageSrc:'../assets/img/kayak3.jpg'
      }
    ];
    this.initForm();
  }
  private initForm():void{
    this.accountForm = this.fb.group({
      userName: ['',[Validators.required]],
      userPass: ['',[Validators.required]]
    });
  }

  ShowContact(){
    // debugger;
    // this.isVisible = !this.isVisible;
    $('.consulta-form').toggleClass('active');
  }

  isValidField(field: string): string{
    const validatedField = this.accountForm.get(field);
    return(!validatedField.valid && validatedField.touched) ?
      'is-invalid': validatedField.touched ? 'is-valid':'';
  }
  OnSubmit() {
    debugger;
    if(this.accountForm.valid) {
      this.task.Authentication(this.accountForm.value).subscribe(
        (success) => {
          debugger;
          if (success) {
          let decodotken = decode(this.task.getJwtToken());
           let role = decodotken['role'];
            if (this.task.loggedIn() && role === ('admin').toLowerCase()) {
              this.router.navigate(['/Browser']);
            } else if (this.task.loggedIn() && role === ('socio').toLowerCase()) {
              this.router.navigate(['/socio']);
            } else if (this.task.loggedIn() && role === ('employee').toLowerCase()) {
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
