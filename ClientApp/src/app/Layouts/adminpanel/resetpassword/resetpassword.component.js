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
var sweetalert2_1 = require("sweetalert2");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var resetpassword = /** @class */ (function () {
    function resetpassword(http, router, localstorage, toaster, loader, renderer, config, config1) {
        this.http = http;
        this.router = router;
        this.localstorage = localstorage;
        this.toaster = toaster;
        this.loader = loader;
        this.renderer = renderer;
        this.config1 = config1;
        this.ButtonText = "Update";
        this.currentpassword = "";
        this.newpassword = "";
        this.confirmpassword = "";
        this.passwordData = [];
    }
    resetpassword.prototype.ngOnInit = function () {
    };
    resetpassword.prototype.onSubmit = function () {
        var _this = this;
        debugger;
        if (this.ButtonText == "Update") {
            if (this.newpassword === this.confirmpassword) {
            }
            else {
                sweetalert2_1.default.fire("Password Mismatch!!!!!");
                return;
            }
            var input = new FormData();
            input.append("confirmpassword", this.confirmpassword.toString());
            input.append("createdby", this.localstorage.get("userid").toString());
            this.http.post('api/resetpassword/Updatepassword', input)
                .subscribe(function (data) {
                _this.passwordData = data;
                if (_this.passwordData.Status == true) {
                    sweetalert2_1.default.fire("", "Updated Successfully", "success");
                    return;
                }
            });
        }
    };
    resetpassword.prototype.onClear = function () {
        this.currentpassword = "";
        this.newpassword = "";
        this.confirmpassword = "";
        this.ButtonText = "Update";
    };
    resetpassword = __decorate([
        core_1.Component({
            selector: 'app-resetpassword',
            templateUrl: './resetpassword.component.html',
        }),
        __metadata("design:paramtypes", [http_1.HttpClient, router_1.Router, angular_2_local_storage_1.LocalStorageService, ngx_toastr_1.ToastrService, ngx_ui_loader_1.NgxUiLoaderService, core_1.Renderer2, ng_bootstrap_1.NgbTimepickerConfig, ng_bootstrap_1.NgbDatepickerConfig])
    ], resetpassword);
    return resetpassword;
}());
exports.resetpassword = resetpassword;
//# sourceMappingURL=resetpassword.component.js.map