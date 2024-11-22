import { Component } from '@angular/core';
import {Button} from "primeng/button";
import {CardModule} from "primeng/card";
import {DividerModule} from "primeng/divider";
import {InputTextModule} from "primeng/inputtext";
import {PaginatorModule} from "primeng/paginator";
import {Router, RouterLink} from "@angular/router";
import {InputGroupModule} from 'primeng/inputgroup';
import {InputGroupAddonModule} from 'primeng/inputgroupaddon';
import {NgIf} from '@angular/common';
import {LoginService} from '../login/login.service';
import Swal from 'sweetalert2';
import {HttpResponseData} from '../interface/response';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    Button,
    CardModule,
    DividerModule,
    InputTextModule,
    PaginatorModule,
    RouterLink,
    InputGroupModule,
    InputGroupAddonModule,
    NgIf,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  loginService: LoginService | undefined;
  router: Router | undefined;
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(loginService: LoginService, router: Router) {
    this.loginService = loginService;
    this.router = router;
  }

  onSubmit(form: any) {
    console.log(form)
    if (form.valid) {
      const registerData = {// 假設有 `name` 綁定到 ngModel
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword
      };
      this.loginService?.register(registerData).subscribe({
        next: (res:HttpResponseData) => {
          console.log(res);
          if(res.responseCode === 200){
            Swal.fire({
              icon: "success",
              title: "註冊成功",
            }).then((result) => {
              // @ts-ignore
              this.router.navigate(['/login']);
            });
          }else {

          }

        },
        error: (error) => {
          console.error('載入審核詳情時發生錯誤:', error);
        }
      })
      console.log('Form Submitted!', this.email, this.password,this.confirmPassword);
    } else {
      console.log('Form is invalid!');
    }
  }

}

