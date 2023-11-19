import { AuthService } from 'src/app/component/service/auth/auth.service';
import { Observable } from 'rxjs';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class authGuard implements CanActivate {
  constructor(
    private AuthService: AuthService,
    private router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const credential = this.AuthService.isAuthenticated();
    console.log(credential);
    
    if (credential?.docs?.role == 'admin') {
      // this.router.navigate(['/admin'])
      return true;
    } else {
      this.router.navigate(['/signin']);
      return false;
    }
  }
}
