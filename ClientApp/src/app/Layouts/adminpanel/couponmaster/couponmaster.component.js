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
var couponmaster = /** @class */ (function () {
    function couponmaster(http, router, localstorage, toaster, loader, renderer, config, config1) {
        this.http = http;
        this.router = router;
        this.localstorage = localstorage;
        this.toaster = toaster;
        this.loader = loader;
        this.renderer = renderer;
        this.config1 = config1;
        this.ButtonText = "Save";
        this.coupon = "";
        this.couponid = 0;
        this.Coupondata = [];
        this.Detail = [];
        this.GetSaveData = [];
        this.GetEditedData = [];
        this.DeletedData = [];
        var current = new Date();
        config1.minDate = {
            year: current.getFullYear(), month: current.getMonth() + 1, day: current.getDate()
        };
        config1.outsideDays = 'hidden';
    }
    couponmaster.prototype.ngOnInit = function () {
        this.GetData();
    };
    couponmaster.prototype.onSubmit = function () {
        var _this = this;
        debugger;
        if (this.ButtonText == "Save") {
            if (this.SelectedDate == null || this.SelectedDate == undefined) {
                sweetalert2_1.default.fire("", "Please enter start date ", "error");
                return;
            }
            if (this.coupon == "" || this.coupon == undefined) {
                sweetalert2_1.default.fire("", "Please enter coupon", "error");
                return;
            }
            if (this.discount == 0 || this.discount == undefined) {
                sweetalert2_1.default.fire("", "Please enter discount", "error");
                return;
            }
            this.s_date = this.SelectedDate.toISOString().slice(0, 10);
            var input = new FormData();
            input.append("couponid", this.couponid.toString());
            input.append("expirydate", this.s_date.toString());
            input.append("discount", this.discount.toString());
            input.append("couponname", this.coupon.toString());
            input.append("createdby", this.localstorage.get("userid").toString());
            this.http.post('api/couponmaster/SaveCoupon', input)
                .subscribe(function (data) {
                debugger;
                _this.Coupondata = data;
                if (_this.Coupondata.Status == true) {
                    if (_this.Coupondata.Message == "Coupon Already Exists") {
                        sweetalert2_1.default.fire("", "Coupon Name Already Exists", "success");
                        return;
                    }
                    else {
                        sweetalert2_1.default.fire("", "Saved Successfully", "success");
                        _this.GetData();
                        _this.Reset();
                        return;
                    }
                }
            });
        }
        else {
            debugger;
            if (this.SelectedDate == null || this.SelectedDate == undefined) {
                sweetalert2_1.default.fire("", "Please enter start date ", "error");
                return;
            }
            if (this.coupon == "" || this.coupon == undefined) {
                sweetalert2_1.default.fire("", "Please enter coupon", "error");
                return;
            }
            if (this.discount == 0 || this.discount == undefined) {
                sweetalert2_1.default.fire("", "Please enter discount", "error");
                return;
            }
            this.s_date = this.SelectedDate.toISOString().slice(0, 10);
            var input = new FormData();
            input.append("couponid", this.couponid.toString());
            input.append("expirydate", this.s_date.toString());
            input.append("discount", this.discount.toString());
            input.append("couponname", this.coupon.toString());
            input.append("createdby", this.localstorage.get("userid").toString());
            this.http.post('api/couponmaster/UpdateCoupon', input)
                .subscribe(function (data) {
                _this.Coupondata = data;
                if (_this.Coupondata.Status == true) {
                    sweetalert2_1.default.fire("", "Updated Successfully", "success");
                    _this.GetData();
                    _this.Reset();
                    return;
                }
            });
        }
    };
    couponmaster.prototype.GetData = function () {
        var _this = this;
        debugger;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.http.get('api/couponmaster/GetSavedData', options).subscribe(function (data) {
            debugger;
            _this.Detail = data;
            _this.GetSaveData = _this.Detail.data;
        });
    };
    couponmaster.prototype.EditData = function (i, Id) {
        var _this = this;
        this.Reset();
        this.ButtonText = 'Update';
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.http.get('api/couponmaster/GetEditData?couponid=' + Id, options).subscribe(function (data) {
            debugger;
            _this.GetEditedData = data;
            if (_this.GetEditedData.Status == true) {
                var mdate = new Date(_this.GetEditedData.data.expirydate);
                _this.couponid = _this.GetEditedData.data.couponid;
                _this.coupon = _this.GetEditedData.data.couponname;
                _this.SelectedDate = mdate;
                _this.discount = _this.GetEditedData.data.discount;
            }
        });
    };
    couponmaster.prototype.Reset = function () {
        this.SelectedDate = null;
        this.s_date = null;
        this.coupon = "";
        this.discount = null;
        this.ButtonText = "Save";
        this.GetData();
    };
    couponmaster.prototype.DeleteData = function (i, Id) {
        var _this = this;
        var data;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        data =
            {
                "couponid": Id
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
                _this.http.post('api/couponmaster/DeleteActivity', body, options).subscribe(function (data) {
                    _this.DeletedData = data;
                    if (_this.DeletedData.Status == true) {
                        sweetalert2_1.default.fire("", "Deleted Successfully", "success");
                        _this.GetData();
                        _this.Reset();
                        return;
                    }
                });
            }
        });
    };
    couponmaster = __decorate([
        core_1.Component({
            selector: 'app-couponmaster',
            templateUrl: './couponmaster.component.html',
            //styleUrls: ['./plannedactivity.component.css']
            providers: [{ provide: ng_bootstrap_1.NgbDateAdapter, useClass: ng_bootstrap_1.NgbDateNativeAdapter }, ng_bootstrap_1.NgbTimepickerConfig]
        }),
        __metadata("design:paramtypes", [http_1.HttpClient, router_1.Router, angular_2_local_storage_1.LocalStorageService, ngx_toastr_1.ToastrService, ngx_ui_loader_1.NgxUiLoaderService, core_1.Renderer2, ng_bootstrap_1.NgbTimepickerConfig, ng_bootstrap_1.NgbDatepickerConfig])
    ], couponmaster);
    return couponmaster;
}());
exports.couponmaster = couponmaster;
//# sourceMappingURL=couponmaster.component.js.map