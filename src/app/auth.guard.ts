import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router); // 注入 Router 依賴
  const cookieService = inject(CookieService);


  const token = cookieService.get('token');

  if (token) {
    return true;
  } else {

    router.navigate(['/login']);
    return false;
  }
};
