import { CrudService } from './crud.service';


import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
private apiUrl = environment.apiUrl;
  constructor(private service: CrudService, 
    private router: Router) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let isLoggedIn =this.service.isEmployerIn() || this.service.isEntrepriseIn() || this.service.isParticulierIn();
    if (isLoggedIn) {
      return true;
    }else{
      this.router.navigate(['/']);

      return false;
    }
    
  }

}
