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
var angular_2_local_storage_1 = require("angular-2-local-storage");
var AuthguardService = /** @class */ (function () {
    function AuthguardService(route, LocalStorage) {
        this.route = route;
        this.LocalStorage = LocalStorage;
        this.onlineOffline = navigator.onLine;
    }
    //It Check Internet Conection If there is no internet then it redirect to checkconnectivity page
    AuthguardService.prototype.canActivate = function () {
        if (!navigator.onLine) {
            this.route.navigate(['/checkconnectivity']);
            return false;
        }
        else {
            return true;
        }
    };
    AuthguardService.prototype.canActivateChild = function () {
        if (this.LocalStorage.get("userid") == null || this.LocalStorage.get("userid") == undefined || this.LocalStorage.get("userid") == 0 || this.LocalStorage.get("userid") == ""
            || this.LocalStorage.get("token") == null || this.LocalStorage.get("token") == undefined || this.LocalStorage.get("token") == "") {
            this.route.navigate(['/login']);
            return false;
        }
        else {
            return true;
        }
    };
    AuthguardService = __decorate([
        core_1.Injectable({ providedIn: 'root' }),
        __metadata("design:paramtypes", [router_1.Router, angular_2_local_storage_1.LocalStorageService])
    ], AuthguardService);
    return AuthguardService;
}());
exports.AuthguardService = AuthguardService;
//# sourceMappingURL=AuthGuard.Service.js.map