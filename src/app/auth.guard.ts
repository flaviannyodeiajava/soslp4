import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private isLogged: boolean = false;

  constructor(){
    this.isLogged = false;
  }

  setIsLogged(b){
    this.isLogged = b;
  }

  canActivate(): boolean {
    return this.isLogged;
  }
}
