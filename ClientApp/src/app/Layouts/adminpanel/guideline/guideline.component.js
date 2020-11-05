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
var guideline = /** @class */ (function () {
    function guideline(http, router, localstorage, toaster, loader) {
        this.http = http;
        this.router = router;
        this.localstorage = localstorage;
        this.toaster = toaster;
        this.loader = loader;
        this.selectedpage = 0;
        this.pagedata = [];
        this.pagedatadetail = [];
        this.guideline = "";
        this.ButtonText = "Save";
        this.GetSaveData = [];
        this.Detail = [];
        this.guidelineData = [];
        this.regdid = 0;
        this.GetEditedData = [];
        this.DeletedData = [];
    }
    guideline.prototype.ngOnInit = function () {
        this.bindpage();
        this.GetData();
    };
    guideline.prototype.bindpage = function () {
        var _this = this;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        var a;
        var tmpclass = [];
        this.http.get('api/guideline/bindpage', options).subscribe(function (data) {
            debugger;
            _this.pagedatadetail = data;
            if (_this.pagedatadetail.Status == true) {
                _this.pagedata = _this.pagedatadetail.data;
            }
        });
    };
    guideline.prototype.onSubmit = function () {
        var _this = this;
        debugger;
        if (this.ButtonText == "Save") {
            if (this.selectedpage == 0 || this.selectedpage == undefined) {
                sweetalert2_1.default.fire("", "Please Select Any Page", "error");
                return;
            }
            if (this.guideline == "" || this.guideline == undefined) {
                sweetalert2_1.default.fire("", "Please enter guideline", "error");
                return;
            }
            var input = new FormData();
            input.append("regdid", "0");
            //input.append("regdid", this.selectedpage.toString());
            input.append("pageid", this.selectedpage.toString());
            input.append("guideline", this.guideline.toString());
            input.append("createdby", this.localstorage.get("userid").toString());
            this.http.post('api/guideline/Saveguideline', input)
                .subscribe(function (data) {
                debugger;
                _this.guidelineData = data;
                if (_this.guidelineData.Status == true) {
                    sweetalert2_1.default.fire("", "Saved Successfully", "success");
                    _this.GetData();
                    _this.onClear();
                    return;
                }
            });
        }
        else {
            debugger;
            if (this.selectedpage == 0 || this.selectedpage == undefined) {
                sweetalert2_1.default.fire("", "Please Select Any Page", "error");
                return;
            }
            if (this.guideline == "" || this.guideline == undefined) {
                sweetalert2_1.default.fire("", "Please enter guideline", "error");
                return;
            }
            var input = new FormData();
            input.append("regdid", this.regdid.toString());
            input.append("pageid", this.selectedpage.toString());
            input.append("guideline", this.guideline.toString());
            input.append("createdby", this.localstorage.get("userid").toString());
            this.http.post('api/guideline/Updateguideline', input)
                .subscribe(function (data) {
                _this.guidelineData = data;
                if (_this.guidelineData.Status == true) {
                    sweetalert2_1.default.fire("", "Updated Successfully", "success");
                    _this.GetData();
                    _this.onClear();
                    return;
                }
            });
        }
    };
    guideline.prototype.GetData = function () {
        var _this = this;
        debugger;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.Detail = [];
        this.http.get('api/guideline/GetSavedData', options).subscribe(function (data) {
            debugger;
            _this.Detail = data;
            _this.GetSaveData = _this.Detail.data;
        });
    };
    guideline.prototype.EditData = function (i, Id) {
        var _this = this;
        this.onClear();
        this.ButtonText = 'Update';
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.http.get('api/guideline/GetEditData?regdid=' + Id, options).subscribe(function (data) {
            debugger;
            _this.GetEditedData = data;
            if (_this.GetEditedData.Status == true) {
                _this.regdid = _this.GetEditedData.data.regdid;
                _this.selectedpage = _this.GetEditedData.data.pageid;
                _this.guideline = _this.GetEditedData.data.guideline;
            }
        });
    };
    guideline.prototype.DeleteData = function (i, Id) {
        var _this = this;
        var data;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        data =
            {
                "regdid": Id
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
                _this.http.post('api/guideline/DeleteActivity', body, options).subscribe(function (data) {
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
    guideline.prototype.onClear = function () {
        this.selectedpage = 0;
        this.guideline = "";
        this.ButtonText = "Save";
        this.GetData();
    };
    guideline = __decorate([
        core_1.Component({
            selector: 'app-guideline',
            templateUrl: './guideline.component.html',
        }),
        __metadata("design:paramtypes", [http_1.HttpClient, router_1.Router, angular_2_local_storage_1.LocalStorageService, ngx_toastr_1.ToastrService, ngx_ui_loader_1.NgxUiLoaderService])
    ], guideline);
    return guideline;
}());
exports.guideline = guideline;
//# sourceMappingURL=guideline.component.js.map