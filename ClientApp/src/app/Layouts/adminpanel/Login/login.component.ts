import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';
import { HttpClient, HttpErrorResponse, HttpRequest, HttpHeaders } from '@angular/common/http';
import { LocalStorageService, LocalStorageModule } from 'angular-2-local-storage';
import { ToastrService } from 'ngx-toastr';


//import swal from 'sweetalert2'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',

  animations: [
    trigger('shakeit', [
      state('shakestart', style({
        transform: 'scale(1)',
      })),
      state('shakeend', style({
        transform: 'scale(1)',
      })),
      transition('shakestart => shakeend', animate('1000ms ease-in', keyframes([
        style({ transform: 'translate3d(-1px, 0, 0)', offset: 0.1 }),
        style({ transform: 'translate3d(4px, 0, 0)', offset: 0.2 }),
        style({ transform: 'translate3d(-6px, 0, 0)', offset: 0.3 }),
        style({ transform: 'translate3d(6px, 0, 0)', offset: 0.4 }),
        style({ transform: 'translate3d(-6px, 0, 0)', offset: 0.5 }),
        style({ transform: 'translate3d(6px, 0, 0)', offset: 0.6 }),
        style({ transform: 'translate3d(-6px, 0, 0)', offset: 0.7 }),
        style({ transform: 'translate3d(4px, 0, 0)', offset: 0.8 }),
        style({ transform: 'translate3d(-1px, 0, 0)', offset: 0.9 }),
      ]))),
    ])

  ]

})
export class LoginManager implements OnInit
{
  public UserName: string = "";
  public Password: string = "";
  public GetData: any;
  public UserNameError: boolean = false;
  public PasswordError: boolean = false;
  public states = {};
  public loadScript(url: string) {
    const body = <HTMLDivElement>document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }



  constructor(public router: Router, private http: HttpClient, private LocalStorage: LocalStorageService, private toaster: ToastrService) {

  }

  
  ngOnInit()
  {

    //this.loadScript('../assets/statichtml/js/vendors.min.js');
    //this.loadScript('../assets/statichtml/vendors/chartjs/Chart.min.js');
    //this.loadScript('../assets/statichtml/js/pages/dashboard-default.js');
    //this.loadScript('../assets/statichtml/js/app.min.js');
  }

  shakeend(stateVar: string, event) {
    this.states[stateVar] = 'shakeend';
  }

  Login(val)
  {
    
    this.UserNameError = false; this.PasswordError = false;
    if (val == false) {
      this.states['state1'] = (this.states['state1'] === 'shakestart' ? 'shakeend' : 'shakestart');
    }
    else {

      if ((this.UserName == "" || this.UserName == null) &&( this.Password == "" || this.Password == null)) { this.UserNameError = true; this.PasswordError = true; return; }
      if ((this.UserName != "" || this.UserName != null) && (this.Password == "" || this.Password == null)) { this.UserNameError = false; this.PasswordError = true; return; }
      if ((this.UserName == "" || this.UserName == null) &&( this.Password != "" || this.Password != null)) { this.UserNameError = true; this.PasswordError = false; return; }
      if ((this.UserName != "" || this.UserName != null) && (this.Password != "" || this.Password != null)) { this.UserNameError = false; this.PasswordError = false;  }
     

        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        let options = { headers: headers }
        var data = { "UserName": this.UserName, "Password": this.Password };
        let body = JSON.stringify(data);
        

          this.http.post('api/Login/LoginManager', body , options). subscribe(
            (data) =>
            {
              debugger;
                this.GetData = data;

                if (this.GetData.Status == true)
                {
                  this.LocalStorage.set('token', this.GetData.res.Token.toString());
                  this.LocalStorage.set('userid', this.GetData.res.userid);
                  this.LocalStorage.set('username', this.GetData.res.username);
                  this.LocalStorage.set('roleid', this.GetData.res.roleid);
                  this.LocalStorage.set('cityid', this.GetData.res.cityid);
                  this.router.navigate(['/WelcomeManager']);
                  var i=this.LocalStorage.get('username').toString().indexOf("@");
                  this.toaster.success(this.GetData.Message.toString()+' '+this.LocalStorage.get('username').toString().substring(0,i), '', { easeTime: 400 });

                }
                else
                {
                  this.toaster.warning(this.GetData.Message.toString(), '', { easeTime: 1000, timeOut: 3000 });
                }
            },
            (err) =>
            {
              this.toaster.warning(err.statusText, '', { easeTime: 3000 });
              debugger;
            }
          )
      }
  }


}
