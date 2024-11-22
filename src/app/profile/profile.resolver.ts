import { ResolveFn } from '@angular/router';
import {inject} from '@angular/core';
import {LoginService} from '../login/login.service';
import {CookieService} from 'ngx-cookie-service';

export const profileResolver: ResolveFn<boolean> = (route, state) => {
  const profileService = inject(LoginService);
  const cookieService = inject(CookieService);
  const id = Number(cookieService.get('id'));
  return profileService.profile(id);
};
