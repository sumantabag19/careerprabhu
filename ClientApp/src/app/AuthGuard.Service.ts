import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild } from '@angular/router';
import { Routes, RouterModule, Router } from '@angular/router';
import { LocalStorageService, LocalStorageModule } from 'angular-2-local-storage';

@Injectable({ providedIn: 'root'})
export class AuthguardService implements CanActivate, CanActivateChild {
  public onlineOffline: boolean = navigator.onLine;
  constructor(private route: Router, private LocalStorage: LocalStorageService) {

  }

  //It Check Internet Conection If there is no internet then it redirect to checkconnectivity page
  canActivate()
  {

    if (!navigator.onLine) {
      this.route.navigate(['/checkconnectivity']);
      return false
    }
    else {
      return true
    }
  }
  canActivateChild()
  {
    
    if (this.LocalStorage.get("userid") == null || this.LocalStorage.get("userid") == undefined || this.LocalStorage.get("userid") == 0 || this.LocalStorage.get("userid") == ""
      || this.LocalStorage.get("token") == null || this.LocalStorage.get("token") == undefined || this.LocalStorage.get("token") == "")
    {
      this.route.navigate(['/login']);
      return false;
    }
    else
    {
      return true
    }
  }
}
