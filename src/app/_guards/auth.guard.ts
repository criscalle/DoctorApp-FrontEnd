import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SharedService } from '../shared/shared.service'; 
import { jwtDecode } from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';

export const authGuard: CanActivateFn = (route, state) => {

const sharedService = inject(SharedService)
const router = inject(Router);
const cookieService = inject(CookieService);
const usuario = sharedService.getSession();
let token = cookieService.get('Authorization');
if(token && usuario)
   {
      token = token.replace('Bearer ', '');
      const decodedToken: any = jwtDecode(token);
      const fechaExpiracion = decodedToken.exp * 1000;
      const fechaActual = new Date().getTime();
      if(fechaExpiracion < fechaActual) { 
         router.navigate(['/login']);
         return false;
      }

    return true;
   }
   else{
    router.navigate(['/login']);
    return false;
   }
};
