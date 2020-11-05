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
var http_1 = require("@angular/common/http");
var angular_2_local_storage_1 = require("angular-2-local-storage");
var ngx_toastr_1 = require("ngx-toastr");
var ngx_ui_loader_1 = require("ngx-ui-loader");
var professionalManager = /** @class */ (function () {
    function professionalManager(http, router, localstorage, toaster, loader) {
        this.http = http;
        this.router = router;
        this.localstorage = localstorage;
        this.toaster = toaster;
        this.loader = loader;
        this.testimonial = "";
        this.SelectedImage = "";
        this.ButtonText = "Save";
        this.GetSaveData = [];
    }
    professionalManager.prototype.ngOnInit = function () {
    };
    professionalManager.prototype.GetImageDetail = function (event) {
    };
    professionalManager.prototype.onSave = function () {
    };
    professionalManager.prototype.onClear = function () {
    };
    professionalManager.prototype.EditData = function (i, Id) {
    };
    professionalManager.prototype.DeleteData = function (i, Id) {
    };
    professionalManager = __decorate([
        core_1.Component({
            selector: 'app-professionalmaster',
            templateUrl: './professionalmaster.component.html',
        }),
        __metadata("design:paramtypes", [http_1.HttpClient, router_1.Router, angular_2_local_storage_1.LocalStorageService, ngx_toastr_1.ToastrService, ngx_ui_loader_1.NgxUiLoaderService])
    ], professionalManager);
    return professionalManager;
}());
exports.professionalManager = professionalManager;
//# sourceMappingURL=professionalmaster.component.js.map