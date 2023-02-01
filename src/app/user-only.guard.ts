import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserOnlyGuard implements CanActivate {

  constructor(private router: Router,  private toastr: ToastrService ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    

      const token = localStorage.getItem('token')
      
      if(token){
    
        let user:any = localStorage.getItem('User');

        user = JSON.parse(user);

        if(user){
          if(user.role == 'User'){
            this.toastr.info("Guard Allowed User!");
            return true;
          }
          else{
            this.toastr.error("Admin Is Not Allowed To Access User Pages!");
            return false
          }
        }
    }
    else{
      this.toastr.error("This Page Requires You To Be Logged In!");
      this.router.navigateByUrl('/Account/Login');
      return false;
    }

        this.router.navigate(['']);
    return false;

  }
  
}
