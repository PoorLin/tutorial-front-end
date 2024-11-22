import { Component } from '@angular/core';
import {CardModule} from 'primeng/card';
import {FloatLabelModule} from 'primeng/floatlabel';
import {PaginatorModule} from 'primeng/paginator';
import {InputTextModule} from 'primeng/inputtext';
import {DividerModule} from 'primeng/divider';
import {Button} from 'primeng/button';
import {NgClass, NgIf} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {LoginService} from './login.service';
import {HttpResponseData} from '../interface/response';
import Swal from  'sweetalert2';
import {InputGroupModule} from 'primeng/inputgroup';
import {InputGroupAddonModule} from 'primeng/inputgroupaddon';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
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
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email: string = '';
  password: string = '';

  constructor(private loginService: LoginService,private router: Router,private cookieService: CookieService) {

  }




  onLogin(): void {
    console.log("login");
        const loginData = {
          email: this.email,
          password: this.password,
        };
        console.log( this.loginService);
        this.loginService.login(loginData).subscribe({
          next:(response: HttpResponseData) => {
            this.cookieService.set("token",response.responseData.token);
            this.cookieService.set("id",response.responseData.userId);
                      Swal.fire({
                        icon: 'success',
                        title: '登入成功',
                      }).then(() => {
                        this.router.navigate(['/tutorial']);
                      });

            console.log(response);
          }
        })
  }

  // onSubmit(form: any) {
  //   console.log(form);
  //   if (!this.email || !this.password) {
  //     Swal.fire({
  //       icon: 'error',
  //       title: '請填寫完整的登錄資訊',
  //     });
  //     return;
  //   }
  //
  //   if (form.valid) {
  //     const loginData = {
  //       email: this.email,
  //       password: this.password,
  //     };
  //     console.log(loginData);
  //     this.loginService.login(loginData).subscribe({
  //       next: (res: HttpResponseData) => {
  //         console.log(res);
  //         if (res.responseCode === 200) {
  //           Swal.fire({
  //             icon: 'success',
  //             title: '登入成功',
  //           }).then(() => {
  //             this.router.navigate(['/']);
  //           });
  //         } else {
  //           Swal.fire({
  //             icon: 'error',
  //             title: '登入失敗',
  //           });
  //         }
  //       },
  //       error: (error) => {
  //         console.error('錯誤:', error);
  //         Swal.fire({
  //           icon: 'error',
  //           title: '登入失敗',
  //           text: '請確認帳號密碼是否正確。',
  //         });
  //       },
  //     });
  //   } else {
  //     console.log('Form is invalid!');
  //   }
  // }

}
