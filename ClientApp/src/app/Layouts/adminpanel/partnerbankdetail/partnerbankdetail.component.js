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
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var angular_2_local_storage_1 = require("angular-2-local-storage");
var ngx_toastr_1 = require("ngx-toastr");
var ngx_ui_loader_1 = require("ngx-ui-loader");
var sweetalert2_1 = require("sweetalert2");
var Partnerbankdetail = /** @class */ (function () {
    function Partnerbankdetail(http, router, localstorage, toaster, loader, renderer, config, config1) {
        this.http = http;
        this.router = router;
        this.localstorage = localstorage;
        this.toaster = toaster;
        this.loader = loader;
        this.renderer = renderer;
        this.config1 = config1;
        this.ButtonText = "Save";
        this.accounttype = 0;
        this.accountname = "";
        this.accountno = "";
        this.ifsccode = "";
        this.bankname = "";
        this.branch = "";
        this.partnerid = 0;
        this.BankAccountData = [];
        this.Detail = [];
        this.GetSaveData = [];
        this.GetEditedData = [];
        this.DeletedData = [];
    }
    Partnerbankdetail.prototype.ngOnInit = function () {
        this.GetData();
    };
    Partnerbankdetail.prototype.onSubmit = function () {
        var _this = this;
        debugger;
        if (this.ButtonText == "Save") {
            if (this.accountname == "" || this.accountname == undefined) {
                sweetalert2_1.default.fire("", "Please enter account name", "error");
                return;
            }
            if (this.accountno == "" || this.accountno == undefined) {
                sweetalert2_1.default.fire("", "Please enter accountno", "error");
                return;
            }
            if (this.ifsccode == "" || this.ifsccode == undefined) {
                sweetalert2_1.default.fire("", "Please enter ifsc code", "error");
                return;
            }
            if (this.bankname == "" || this.bankname == undefined) {
                sweetalert2_1.default.fire("", "Please enter bank name", "error");
                return;
            }
            if (this.branch == "" || this.branch == undefined) {
                sweetalert2_1.default.fire("", "Please enter branch name", "error");
                return;
            }
            if (this.accounttype == 0 || this.accounttype == undefined) {
                sweetalert2_1.default.fire("", "Please select account type", "error");
                return;
            }
            var input = new FormData();
            input.append("partnerid", this.partnerid.toString());
            input.append("accountname", this.accountname.toString());
            input.append("accountno", this.accountno.toString());
            input.append("ifsccode", this.ifsccode.toString());
            input.append("bankname", this.bankname.toString());
            input.append("branch", this.branch.toString());
            input.append("accounttype", this.accounttype.toString());
            input.append("createdby", this.localstorage.get("userid").toString());
            this.http.post('api/partnerbankdetail/Savepartnerbankdetail', input)
                .subscribe(function (data) {
                debugger;
                _this.BankAccountData = data;
                if (_this.BankAccountData.Status == true) {
                    if (_this.BankAccountData.Message == "Account Already Exists") {
                        sweetalert2_1.default.fire("", "Account Already Exists", "success");
                        //this.onClear();
                        return;
                    }
                    else {
                        sweetalert2_1.default.fire("", "Saved Successfully", "success");
                        _this.GetData();
                        _this.onClear();
                        return;
                    }
                }
            });
        }
        else {
            debugger;
            if (this.accountname == "" || this.accountname == undefined) {
                sweetalert2_1.default.fire("", "Please enter account name", "error");
                return;
            }
            if (this.accountno == "" || this.accountno == undefined) {
                sweetalert2_1.default.fire("", "Please enter accountno", "error");
                return;
            }
            if (this.ifsccode == "" || this.ifsccode == undefined) {
                sweetalert2_1.default.fire("", "Please enter ifsc code", "error");
                return;
            }
            if (this.bankname == "" || this.bankname == undefined) {
                sweetalert2_1.default.fire("", "Please enter bank name", "error");
                return;
            }
            if (this.branch == "" || this.branch == undefined) {
                sweetalert2_1.default.fire("", "Please enter branch name", "error");
                return;
            }
            if (this.accounttype == 0 || this.accounttype == undefined) {
                sweetalert2_1.default.fire("", "Please select account type", "error");
                return;
            }
            var input = new FormData();
            input.append("partnerid", this.partnerid.toString());
            input.append("accountname", this.accountname.toString());
            input.append("accountno", this.accountno.toString());
            input.append("ifsccode", this.ifsccode.toString());
            input.append("bankname", this.bankname.toString());
            input.append("branch", this.branch.toString());
            input.append("accounttype", this.accounttype.toString());
            input.append("createdby", this.localstorage.get("userid").toString());
            this.http.post('api/partnerbankdetail/UpdateAccount', input)
                .subscribe(function (data) {
                _this.BankAccountData = data;
                if (_this.BankAccountData.Status == true) {
                    if (_this.BankAccountData.Message == "Account Already Exists") {
                        _this.GetData();
                        sweetalert2_1.default.fire("", "Account Already Exists", "success");
                        _this.onClear();
                        return;
                    }
                    else {
                        sweetalert2_1.default.fire("", "Updated Successfully", "success");
                        _this.GetData();
                        _this.onClear();
                        return;
                    }
                }
            });
        }
    };
    Partnerbankdetail.prototype.GetData = function () {
        var _this = this;
        debugger;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.Detail = [];
        var input = new FormData();
        input.append("createdby", this.localstorage.get("userid").toString());
        this.http.post('api/partnerbankdetail/GetSavedData', input).subscribe(function (data) {
            debugger;
            _this.Detail = data;
            _this.GetSaveData = _this.Detail.data;
        });
    };
    Partnerbankdetail.prototype.EditData = function (i, Id) {
        var _this = this;
        this.ButtonText = 'Update';
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.http.get('api/partnerbankdetail/GetEditData?partnerid=' + Id, options).subscribe(function (data) {
            debugger;
            _this.GetEditedData = data;
            if (_this.GetEditedData.Status == true) {
                _this.partnerid = _this.GetEditedData.data.partnerid;
                _this.accountname = _this.GetEditedData.data.accountname;
                _this.accountno = _this.GetEditedData.data.accountno;
                _this.ifsccode = _this.GetEditedData.data.ifsccode;
                _this.bankname = _this.GetEditedData.data.bankname;
                _this.branch = _this.GetEditedData.data.branch;
                _this.accounttype = _this.GetEditedData.data.accounttype;
            }
        });
    };
    Partnerbankdetail.prototype.DeleteData = function (i, Id) {
        var _this = this;
        var data;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        data =
            {
                "partnerid": Id
            };
        var body = JSON.stringify(data);
        sweetalert2_1.default.fire({
            //title: 'Confirmation',
            text: 'Are you sure to delete this record?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No'
        }).then(function (result) {
            if (result.value) {
                _this.http.post('api/partnerbankdetail/DeleteActivity', body, options).subscribe(function (data) {
                    _this.DeletedData = data;
                    if (_this.DeletedData.Status == true) {
                        sweetalert2_1.default.fire("", "Deleted Successfully", "success");
                        _this.GetData();
                        return;
                    }
                });
            }
        });
    };
    Partnerbankdetail.prototype.onClear = function () {
        this.accounttype = 0;
        this.accountname = "";
        this.accountno = "";
        this.ifsccode = "";
        this.bankname = "";
        this.branch = "";
        this.ButtonText = "Save";
    };
    Partnerbankdetail = __decorate([
        core_1.Component({
            selector: 'app-partnerbankdetail',
            templateUrl: './partnerbankdetail.component.html',
        }),
        __metadata("design:paramtypes", [http_1.HttpClient, router_1.Router, angular_2_local_storage_1.LocalStorageService, ngx_toastr_1.ToastrService, ngx_ui_loader_1.NgxUiLoaderService, core_1.Renderer2, ng_bootstrap_1.NgbTimepickerConfig, ng_bootstrap_1.NgbDatepickerConfig])
    ], Partnerbankdetail);
    return Partnerbankdetail;
}());
exports.Partnerbankdetail = Partnerbankdetail;
//# sourceMappingURL=partnerbankdetail.component.js.map