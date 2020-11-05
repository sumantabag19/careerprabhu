//<reference path="../../../../assets/statichtml/js/vendors.min.js" />
import { Component, OnInit } from '@angular/core';
import { LocalStorageService, LocalStorageModule } from 'angular-2-local-storage';

import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  roleid: number = 0;
  public loadScript(url: string)
  {
    const body = <HTMLDivElement>document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }


  constructor(private localstorage: LocalStorageService, private router: Router) {

  }

  ngOnInit()
  {
    debugger;
    this.roleid = this.localstorage.get("roleid");
   // this.checkLocalStorageData();
    this.loadScript('../assets/statichtml/js/vendors.min.js');
    this.loadScript('../assets/statichtml/vendors/chartjs/Chart.min.js');
    //this.loadScript('../assets/statichtml/js/pages/dashboard-default.js');
    this.loadScript('../assets/statichtml/js/app.min.js');
  }
  LogOut()
  {
    this.localstorage.clearAll();
    this.router.navigate(['/login']);
  }
  
  
}
