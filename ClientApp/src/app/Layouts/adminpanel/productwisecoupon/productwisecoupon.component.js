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
var ProductCoupon = /** @class */ (function () {
    function ProductCoupon(http, router, localstorage, toaster, loader, renderer, config, config1) {
        this.http = http;
        this.router = router;
        this.localstorage = localstorage;
        this.toaster = toaster;
        this.loader = loader;
        this.renderer = renderer;
        this.config1 = config1;
        this.ButtonText = "Save";
        this.statedat = [];
        this.StateData = [];
        this.citdata = [];
        this.CityData = [];
        this.selectedstate = 0;
        this.selectedcity = 0;
        this.productdat = [];
        this.Products = [];
        this.selectproduct = 0;
        this.partnername = "";
        this.mobile = "";
        //couponname: string = "";
        this.district = "";
        this.email = "";
        this.pwd = "";
        this.whatsappno = "";
        this.regid = 0;
        this.PartnerData = [];
        this.Detail = [];
        this.GetSaveData = [];
        this.GetEditedData = [];
        this.DeletedData = [];
        this.Couponid = "";
        this.CouponData = [];
        this.getcoupon = [];
    }
    ProductCoupon.prototype.ngOnInit = function () {
        this.BindState();
        this.BindProducts();
        this.BindCoupon();
        this.GetData();
    };
    ProductCoupon.prototype.BindState = function () {
        var _this = this;
        debugger;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.statedat = [];
        var tmpclass = [];
        this.http.post('api/partner/Bindstate', options).subscribe(function (data) {
            _this.statedat = data;
            if (_this.statedat.Status == true) {
                _this.StateData = _this.statedat.data;
            }
            else {
                _this.StateData = _this.statedat.data;
            }
        });
    };
    ProductCoupon.prototype.BindCity = function () {
        var _this = this;
        debugger;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.citdata = [];
        var body = {
            "stateid": this.selectedstate
        };
        var tmpclass = [];
        this.http.post('api/partner/BindCity', body, options).subscribe(function (data) {
            _this.citdata = data;
            if (_this.citdata.Status == true) {
                _this.CityData = _this.citdata.data;
            }
            else {
                _this.CityData = _this.citdata.data;
            }
        });
    };
    ProductCoupon.prototype.BindCoupon = function () {
        var _this = this;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.http.get('api/partner/BindCoupon', options).subscribe(function (data) {
            debugger;
            _this.Detail = data;
            if (_this.Detail.status = true) {
                _this.CouponData = _this.Detail.data;
                _this.GetData();
            }
            else {
                _this.toaster.error(_this.Detail.message.toString(), '', { easeTime: 1000, timeOut: 3000 });
            }
            if (_this.GetEditedData.Status == true) {
                _this.Couponid = _this.GetEditedData.data[0].Couponid;
                var tmpCouponid = _this.GetEditedData.data[0].Couponid.split(",");
                for (var i = 0; i < _this.CouponData.length; i++) {
                    for (var j = 0; j < tmpCouponid.length; j++) {
                        if (_this.CouponData[i].Couponid == tmpCouponid[j]) {
                            _this.CouponData[i].selected = true;
                        }
                    }
                }
                if (_this.CouponData.length == tmpCouponid.length) {
                    _this.AllCoupon = true;
                }
                else {
                    _this.AllCoupon = false;
                }
            }
            else {
            }
        });
    };
    ProductCoupon.prototype.SelectAllCoupon = function () {
        debugger;
        this.Couponid = "";
        if (this.AllCoupon === true) {
            for (var i = 0; i < this.CouponData.length; i++) {
                this.CouponData[i].selected = true;
                if (this.Couponid === '') {
                    this.Couponid = this.CouponData[i].Couponid;
                }
                else {
                    this.Couponid = this.Couponid + ',' + this.CouponData[i].Couponid;
                }
            }
        }
        else {
            for (var i = 0; i < this.CouponData.length; i++) {
                this.CouponData[i].selected = false;
            }
        }
    };
    ProductCoupon.prototype.getSelectedCoupon = function () {
        this.Couponid = "";
        var count = 0;
        for (var i = 0; i < this.CouponData.length; i++) {
            if (this.CouponData[i].selected === true) {
                if (this.Couponid === '') {
                    this.Couponid = this.CouponData[i].Couponid;
                    count++;
                }
                else {
                    this.Couponid = this.Couponid + ',' + this.CouponData[i].Couponid;
                    count++;
                }
            }
        }
        if (this.CouponData.length === count) {
            this.AllCoupon = true;
        }
        else {
            this.AllCoupon = false;
        }
    };
    ProductCoupon.prototype.BindProducts = function () {
        var _this = this;
        debugger;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.productdat = [];
        var tmpclass = [];
        this.http.post('api/partner/BindProducts', options).subscribe(function (data) {
            debugger;
            _this.productdat = data;
            if (_this.productdat.Status == true) {
                _this.Products = _this.productdat.data;
            }
            else {
                _this.Products = _this.productdat.data;
            }
        });
    };
    ProductCoupon.prototype.onSubmit = function () {
        var _this = this;
        debugger;
        if (this.ButtonText == "Save") {
            if (this.selectproduct == 0 || this.selectproduct == undefined) {
                sweetalert2_1.default.fire("", "Please select product", "error");
                return;
            }
            if (this.Couponid == "" || this.Couponid == undefined) {
                sweetalert2_1.default.fire("", "Please select coupon name", "error");
                return;
            }
            var input = new FormData();
            input.append("pid", this.regid.toString());
            input.append("productid", this.selectproduct.toString());
            input.append("Couponid", this.Couponid.toString());
            input.append("createdby", this.localstorage.get("userid").toString());
            this.http.post('api/partner/SaveProductCoupon', input)
                .subscribe(function (data) {
                debugger;
                _this.PartnerData = data;
                if (_this.PartnerData.Status == true) {
                    if (_this.PartnerData.Message == "Already Exists") {
                        sweetalert2_1.default.fire("", "Already Exists", "success");
                        return;
                    }
                    else {
                        sweetalert2_1.default.fire("", "Successfully Saved", "success");
                        _this.GetData();
                        _this.onClear();
                        return;
                    }
                }
            });
        }
        else {
            debugger;
            if (this.selectproduct == 0 || this.selectproduct == undefined) {
                sweetalert2_1.default.fire("", "Please select product", "error");
                return;
            }
            if (this.Couponid == "" || this.Couponid == undefined) {
                sweetalert2_1.default.fire("", "Please select coupon name", "error");
                return;
            }
            var input = new FormData();
            input.append("pid", this.regid.toString());
            input.append("productid", this.selectproduct.toString());
            input.append("Couponid", this.Couponid.toString());
            input.append("createdby", this.localstorage.get("userid").toString());
            this.http.post('api/partner/UpdateProductCoupon', input)
                .subscribe(function (data) {
                debugger;
                _this.PartnerData = data;
                if (_this.PartnerData.Status == true) {
                    sweetalert2_1.default.fire("", "Successfully Updated", "success");
                    _this.GetData();
                    _this.onClear();
                    return;
                }
            });
        }
    };
    ProductCoupon.prototype.onClear = function () {
        this.selectedcity = 0;
        this.selectproduct = 0;
        this.selectedstate = 0;
        this.discount = null;
        this.partnername = "";
        this.mobile = "";
        this.district = "";
        for (var i = 0; i < this.CouponData.length; i++) {
            this.CouponData[i].selected = false;
        }
        this.AllCoupon = false;
        this.email = "";
        this.whatsappno = "";
        this.ButtonText = "Save";
    };
    ProductCoupon.prototype.GetData = function () {
        var _this = this;
        debugger;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.Detail = [];
        this.http.get('api/partner/GetProductCouponData', options).subscribe(function (data) {
            debugger;
            _this.getcoupon = data;
            var coupon;
            debugger;
            _this.GetSaveData = _this.getcoupon.data;
            for (var i = 0; i < _this.GetSaveData.length; i++) {
                var couponname = "";
                //for (var j = 0; j < this.GetSaveData[i].State.length; j++) {
                coupon = _this.GetSaveData[i].CouponName.split(",");
                //}
                //state
                debugger;
                for (var k = 0; k < coupon.length; k++) {
                    for (var l = 0; l < _this.CouponData.length; l++) {
                        if (coupon[k] == _this.CouponData[l].Couponid) {
                            if (k > 0) {
                                couponname = couponname + ", " + _this.CouponData[l].Couponname;
                            }
                            else {
                                couponname = couponname + _this.CouponData[l].Couponname;
                            }
                        }
                    }
                }
                _this.GetSaveData[i].Couponname = couponname;
            }
        });
    };
    ProductCoupon.prototype.EditData = function (i, Id) {
        var _this = this;
        this.BindProducts();
        this.BindState();
        //this.BindCoupon();
        this.ButtonText = 'Update';
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.http.get('api/partner/GetEditProductCoupon?regid=' + Id, options).subscribe(function (data) {
            debugger;
            _this.GetEditedData = data;
            if (_this.GetEditedData.Status == true) {
                _this.BindProducts();
                _this.selectproduct = _this.GetEditedData.data[0].productid;
                _this.BindCoupon();
                _this.mobile = _this.GetEditedData.data[0].mobileno;
                _this.regid = _this.GetEditedData.data[0].regid;
            }
        });
    };
    ProductCoupon.prototype.DeleteData = function (i, Id) {
        var _this = this;
        var data;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        data =
            {
                "regid": Id
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
                _this.http.post('api/partner/DeletePartnerCoupon', body, options).subscribe(function (data) {
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
    ProductCoupon = __decorate([
        core_1.Component({
            selector: 'app-productwisecoupon',
            templateUrl: './productwisecoupon.component.html',
        }),
        __metadata("design:paramtypes", [http_1.HttpClient, router_1.Router, angular_2_local_storage_1.LocalStorageService, ngx_toastr_1.ToastrService, ngx_ui_loader_1.NgxUiLoaderService, core_1.Renderer2, ng_bootstrap_1.NgbTimepickerConfig, ng_bootstrap_1.NgbDatepickerConfig])
    ], ProductCoupon);
    return ProductCoupon;
}());
exports.ProductCoupon = ProductCoupon;
//# sourceMappingURL=productwisecoupon.component.js.map