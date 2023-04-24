import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {

  constructor(private auth : AuthService, private router: Router) { }

  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //     if(this.auth.isLoggedin()){
  //   return true;
  //     }
  //     else{
  //       this.router.navigateByUrl('/login', { state: { checked: 'login' } });
  //       return false;
  //     }

  // }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this.auth.userValue;
    console.log(user);
    if (user) {
        // check if route is restricted by role
        const { roles } = route.data;

        if (roles && !roles.includes(user.role)) {
            // role not authorized so redirect to home page
            this.router.navigate(['/']);
            return false;
        }

        // authorized so return true
        return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { state: { checked: 'login' } });
    return false;
  }
  
}
