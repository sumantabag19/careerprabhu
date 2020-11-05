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
//<reference path="../../../../assets/statichtml/js/vendors.min.js" />
var core_1 = require("@angular/core");
var angular_2_local_storage_1 = require("angular-2-local-storage");
var router_1 = require("@angular/router");
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(localstorage, router) {
        this.localstorage = localstorage;
        this.router = router;
        this.roleid = 0;
    }
    HeaderComponent.prototype.loadScript = function (url) {
        var body = document.body;
        var script = document.createElement('script');
        script.innerHTML = '';
        script.src = url;
        script.async = false;
        script.defer = true;
        body.appendChild(script);
    };
    HeaderComponent.prototype.ngOnInit = function () {
        debugger;
        this.roleid = this.localstorage.get("roleid");
        // this.checkLocalStorageData();
        this.loadScript('../assets/statichtml/js/vendors.min.js');
        this.loadScript('../assets/statichtml/vendors/chartjs/Chart.min.js');
        //this.loadScript('../assets/statichtml/js/pages/dashboard-default.js');
        this.loadScript('../assets/statichtml/js/app.min.js');
    };
    HeaderComponent.prototype.LogOut = function () {
        this.localstorage.clearAll();
        this.router.navigate(['/login']);
    };
    HeaderComponent = __decorate([
        core_1.Component({
            selector: 'app-header',
            templateUrl: './header.component.html'
        }),
        __metadata("design:paramtypes", [angular_2_local_storage_1.LocalStorageService, router_1.Router])
    ], HeaderComponent);
    return HeaderComponent;
}());
exports.HeaderComponent = HeaderComponent;
//# sourceMappingURL=header.component.js.map