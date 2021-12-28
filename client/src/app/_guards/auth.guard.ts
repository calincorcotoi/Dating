import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AccountService } from '../_services/account.service';
import { map } from 'rxjs/operators';
import { User } from '../_models/user';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private accountService: AccountService, private toastr: ToastrService){}
  canActivate(): Observable<boolean> {
    return this.accountService.currentUser$.pipe<boolean>(
      map<User, boolean>(user => {
        let status: boolean
        if (user){
          status = true;
        }else{
          status = false;
          this.toastr.error("You shall not pass!");
        }
        return status;
      })
    );
  }
  
}