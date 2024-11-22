import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpResponseData} from '../interface/response';
import {ProfileData} from '../interface/profileData';
import Swal from 'sweetalert2';
import {CookieService} from 'ngx-cookie-service';
import { FieldsetModule } from 'primeng/fieldset';
import {PanelModule} from 'primeng/panel';
import {CardModule} from 'primeng/card';
import {FormsModule} from '@angular/forms';




@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    FieldsetModule,
    PanelModule,
    CardModule,
    FormsModule

  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  profileData: ProfileData | undefined;
  name:string = '';
  email:string = '';
  constructor(private route: ActivatedRoute,private router: Router,private cookieService: CookieService,) {}

  ngOnInit(): void {
    const data = this.route.snapshot.data['profileData']; // 取得 resolver 傳遞的資料
    if(data.responseCode === 200){
      this.profileData = data.responseData
      this.name = data.responseData['name'];
      this.email = data.responseData['email'];
    }else if(data.responseCode === 3000){

      Swal.fire({
        icon: 'error',
        title: '登入逾時',
      }).then(() => {
        this.router.navigate(['/login']);
        this.cookieService.delete("token");
        this.cookieService.delete("id");
      });

    }else {
      alert("查無此人")
    }


  }





}
