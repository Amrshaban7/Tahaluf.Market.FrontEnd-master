import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class EmptyProductGuard implements CanActivate {
  
  constructor(private router: Router,  private toastr: ToastrService ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    const product = localStorage.getItem('loadedProductId')
    if(product == "" || product == null) {
      this.toastr.error("No Product Is Loaded Yet!");
      this.router.navigateByUrl('/');
      return false;
    }
    
    else
    return true;
  }
  
}
