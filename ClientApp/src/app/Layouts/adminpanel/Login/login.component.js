"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var animations_1 = require("@angular/animations");
var http_1 = require("@angular/common/http");
var angular_2_local_storage_1 = require("angular-2-local-storage");
var ngx_toastr_1 = require("ngx-toastr");
//import swal from 'sweetalert2'
var LoginManager = /** @class */ (function () {
    function LoginManager(router, http, LocalStorage, toaster) {
        this.router = router;
        this.http = http;
        this.LocalStorage = LocalStorage;
        this.toaster = toaster;
        this.UserName = "";
        this.Password = "";
        this.UserNameError = false;
        this.PasswordError = false;
        this.states = {};
    }
    LoginManager.prototype.loadScript = function (url) {
        var body = document.body;
        var script = document.createElement('script');
        script.innerHTML = '';
        script.src = url;
        script.async = false;
        script.defer = true;
        body.appendChild(script);
    };
    LoginManager.prototype.ngOnInit = function () {
        //this.loadScript('../assets/statichtml/js/vendors.min.js');
        //this.loadScript('../assets/statichtml/vendors/chartjs/Chart.min.js');
        //this.loadScript('../assets/statichtml/js/pages/dashboard-default.js');
        //this.loadScript('../assets/statichtml/js/app.min.js');
    };
    LoginManager.prototype.shakeend = function (stateVar, event) {
        this.states[stateVar] = 'shakeend';
    };
    LoginManager.prototype.Login = function (val) {
        var _this = this;
        this.UserNameError = false;
        this.PasswordError = false;
        if (val == false) {
            this.states['state1'] = (this.states['state1'] === 'shakestart' ? 'shakeend' : 'shakestart');
        }
        else {
            if ((this.UserName == "" || this.UserName == null) && (this.Password == "" || this.Password == null)) {
                this.UserNameError = true;
                this.PasswordError = true;
                return;
            }
            if ((this.UserName != "" || this.UserName != null) && (this.Password == "" || this.Password == null)) {
                this.UserNameError = false;
                this.PasswordError = true;
                return;
            }
            if ((this.UserName == "" || this.UserName == null) && (this.Password != "" || this.Password != null)) {
                this.UserNameError = true;
                this.PasswordError = false;
                return;
            }
            if ((this.UserName != "" || this.UserName != null) && (this.Password != "" || this.Password != null)) {
                this.UserNameError = false;
                this.PasswordError = false;
            }
            var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
            var options = { headers: headers };
            var data = { "UserName": this.UserName, "Password": this.Password };
            var body = JSON.stringify(data);
            this.http.post('api/Login/LoginManager', body, options).subscribe(function (data) {
                debugger;
                _this.GetData = data;
                if (_this.GetData.Status == true) {
                    _this.LocalStorage.set('token', _this.GetData.res.Token.toString());
                    _this.LocalStorage.set('userid', _this.GetData.res.userid);
                    _this.LocalStorage.set('username', _this.GetData.res.username);
                    _this.LocalStorage.set('roleid', _this.GetData.res.roleid);
                    _this.LocalStorage.set('cityid', _this.GetData.res.cityid);
                    _this.router.navigate(['/WelcomeManager']);
                    var i = _this.LocalStorage.get('username').toString().indexOf("@");
                    _this.toaster.success(_this.GetData.Message.toString() + ' ' + _this.LocalStorage.get('username').toString().substring(0, i), '', { easeTime: 400 });
                }
                else {
                    _this.toaster.warning(_this.GetData.Message.toString(), '', { easeTime: 1000, timeOut: 3000 });
                }
            }, function (err) {
                _this.toaster.warning(err.statusText, '', { easeTime: 3000 });
                debugger;
            });
        }
    };
    LoginManager = __decorate([
        core_1.Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            animations: [
                animations_1.trigger('shakeit', [
                    animations_1.state('shakestart', animations_1.style({
                        transform: 'scale(1)',
                    })),
                    animations_1.state('shakeend', animations_1.style({
                        transform: 'scale(1)',
                    })),
                    animations_1.transition('shakestart => shakeend', animations_1.animate('1000ms ease-in', animations_1.keyframes([
                        animations_1.style({ transform: 'translate3d(-1px, 0, 0)', offset: 0.1 }),
                        animations_1.style({ transform: 'translate3d(4px, 0, 0)', offset: 0.2 }),
                        animations_1.style({ transform: 'translate3d(-6px, 0, 0)', offset: 0.3 }),
                        animations_1.style({ transform: 'translate3d(6px, 0, 0)', offset: 0.4 }),
                        animations_1.style({ transform: 'translate3d(-6px, 0, 0)', offset: 0.5 }),
                        animations_1.style({ transform: 'translate3d(6px, 0, 0)', offset: 0.6 }),
                        animations_1.style({ transform: 'translate3d(-6px, 0, 0)', offset: 0.7 }),
                        animations_1.style({ transform: 'translate3d(4px, 0, 0)', offset: 0.8 }),
                        animations_1.style({ transform: 'translate3d(-1px, 0, 0)', offset: 0.9 }),
                    ]))),
                ])
            ]
        }),
        __metadata("design:paramtypes", [router_1.Router, http_1.HttpClient, angular_2_local_storage_1.LocalStorageService, ngx_toastr_1.ToastrService])
    ], LoginManager);
    return LoginManager;
}());
exports.LoginManager = LoginManager;
//# sourceMappingURL=login.component.js.map