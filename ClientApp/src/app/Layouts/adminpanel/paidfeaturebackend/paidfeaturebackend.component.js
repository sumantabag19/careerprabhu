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
var paidfeaturebackend = /** @class */ (function () {
    function paidfeaturebackend(http, router, localstorage, toaster, loader) {
        this.http = http;
        this.router = router;
        this.localstorage = localstorage;
        this.toaster = toaster;
        this.loader = loader;
        this.Selectedclass = 0;
        this.Selectedproduct = 0;
        this.fees = "";
        this.gst = "";
        this.conveniencefees = "";
        this.ClassData = [];
        this.ProductData = [];
        this.productdat = [];
        this.classdata = [];
        this.ButtonText = "Save";
        this.pricingid = 0;
        this.paidfeaturebackendData = [];
        this.Detail = [];
        this.GetSaveData = [];
        this.GetEditedData = [];
        this.DeletedData = [];
    }
    paidfeaturebackend.prototype.ngOnInit = function () {
        this.BindClass();
        this.BindProduct();
        this.GetData();
        //this.GetSavedData();
    };
    paidfeaturebackend.prototype.BindClass = function () {
        var _this = this;
        debugger;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.classdata = [];
        var tmpclass = [];
        this.http.post('api/paidfeaturebackend/Bindclass', options).subscribe(function (data) {
            _this.classdata = data;
            if (_this.classdata.Status == true) {
                _this.ClassData = _this.classdata.data;
            }
            else {
                _this.ClassData = _this.classdata.data;
            }
        });
    };
    //binds  stream code
    paidfeaturebackend.prototype.BindProduct = function () {
        var _this = this;
        debugger;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.productdat = [];
        var tmpclass = [];
        this.http.post('api/paidfeaturebackend/BindProduct', options).subscribe(function (data) {
            _this.productdat = data;
            if (_this.productdat.Status == true) {
                _this.ProductData = _this.productdat.data;
            }
            else {
                _this.ProductData = _this.productdat.data;
            }
        });
    };
    paidfeaturebackend.prototype.onSubmit = function () {
        var _this = this;
        debugger;
        if (this.ButtonText == "Save") {
            if (this.Selectedclass == 0 || this.Selectedclass == undefined) {
                sweetalert2_1.default.fire("", "Please select class", "error");
                return;
            }
            if (this.Selectedproduct == 0 || this.Selectedproduct == undefined) {
                sweetalert2_1.default.fire("", "Please select product", "error");
                return;
            }
            if (this.fees == "" || this.fees == undefined) {
                sweetalert2_1.default.fire("", "Please enter fees", "error");
                return;
            }
            if (!this.fees.match(/^([1-9][0-9]{,2}(,[0-9]{3})*|[0-9]+)(\.[0-9]{1,9})?$/)) {
                sweetalert2_1.default.fire("", "Please enter valid fee", "error");
                return;
            }
            if (this.gst == "" || this.gst == undefined) {
                sweetalert2_1.default.fire("", "Please enter gst", "error");
                return;
            }
            if (!this.gst.match(/^([1-9][0-9]{,2}(,[0-9]{3})*|[0-9]+)(\.[0-9]{1,9})?$/)) {
                sweetalert2_1.default.fire("", "Please enter valid GST", "error");
                return;
            }
            if (this.conveniencefees == "" || this.conveniencefees == undefined) {
                sweetalert2_1.default.fire("", "Please enter  Convenience fees", "error");
                return;
            }
            if (!this.conveniencefees.match(/^([1-9][0-9]{,2}(,[0-9]{3})*|[0-9]+)(\.[0-9]{1,9})?$/)) {
                sweetalert2_1.default.fire("", "Please enter valid Convenience fees ", "error");
                return;
            }
            var input = new FormData();
            input.append("pricingid", this.pricingid.toString());
            input.append("classid", this.Selectedclass.toString());
            input.append("productid", this.Selectedproduct.toString());
            input.append("fees", this.fees.toString());
            input.append("gst", this.gst.toString());
            input.append("conveniencefees", this.conveniencefees.toString());
            input.append("createdby", this.localstorage.get("userid").toString());
            this.http.post('api/paidfeaturebackend/Savepaidfeature', input)
                .subscribe(function (data) {
                debugger;
                _this.paidfeaturebackendData = data;
                if (_this.paidfeaturebackendData.Status == true) {
                    sweetalert2_1.default.fire("", "Saved Successfully", "success");
                    _this.GetData();
                    _this.onClear();
                    return;
                }
            });
        }
        else {
            debugger;
            if (this.Selectedclass == 0 || this.Selectedclass == undefined) {
                sweetalert2_1.default.fire("", "Please select class", "error");
                return;
            }
            if (this.Selectedproduct == 0 || this.Selectedproduct == undefined) {
                sweetalert2_1.default.fire("", "Please select product", "error");
                return;
            }
            if (this.fees == "" || this.fees == undefined) {
                sweetalert2_1.default.fire("", "Please enter fees", "error");
                return;
            }
            if (!this.fees.match(/^([1-9][0-9]{,2}(,[0-9]{3})*|[0-9]+)(\.[0-9]{1,9})?$/)) {
                sweetalert2_1.default.fire("", "Please enter valid fee", "error");
                return;
            }
            if (this.gst == "" || this.gst == undefined) {
                sweetalert2_1.default.fire("", "Please enter gst", "error");
                return;
            }
            if (!this.gst.match(/^([1-9][0-9]{,2}(,[0-9]{3})*|[0-9]+)(\.[0-9]{1,9})?$/)) {
                sweetalert2_1.default.fire("", "Please enter valid GST", "error");
                return;
            }
            if (this.conveniencefees == "" || this.conveniencefees == undefined) {
                sweetalert2_1.default.fire("", "Please enter  Convenience fees", "error");
                return;
            }
            if (!this.conveniencefees.match(/^([1-9][0-9]{,2}(,[0-9]{3})*|[0-9]+)(\.[0-9]{1,9})?$/)) {
                sweetalert2_1.default.fire("", "Please enter valid Convenience fees ", "error");
                return;
            }
            var input = new FormData();
            input.append("pricingid", this.pricingid.toString());
            input.append("classid", this.Selectedclass.toString());
            input.append("productid", this.Selectedproduct.toString());
            input.append("fees", this.fees.toString());
            input.append("gst", this.gst.toString());
            input.append("conveniencefees", this.conveniencefees.toString());
            input.append("createdby", this.localstorage.get("userid").toString());
            this.http.post('api/paidfeaturebackend/Updatepaidfeature', input)
                .subscribe(function (data) {
                _this.paidfeaturebackendData = data;
                if (_this.paidfeaturebackendData.Status == true) {
                    sweetalert2_1.default.fire("", "Updated Successfully", "success");
                    _this.GetData();
                    _this.onClear();
                    return;
                }
            });
        }
    };
    paidfeaturebackend.prototype.GetData = function () {
        var _this = this;
        debugger;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.Detail = [];
        this.http.get('api/paidfeaturebackend/GetSavedData', options).subscribe(function (data) {
            debugger;
            _this.Detail = data;
            _this.GetSaveData = _this.Detail.data;
        });
    };
    paidfeaturebackend.prototype.EditData = function (i, Id) {
        var _this = this;
        this.BindClass();
        this.BindProduct();
        this.ButtonText = 'Update';
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.http.get('api/paidfeaturebackend/GetEditData?pricingid=' + Id, options).subscribe(function (data) {
            debugger;
            _this.GetEditedData = data;
            if (_this.GetEditedData.Status == true) {
                _this.pricingid = _this.GetEditedData.data.pricingid;
                _this.Selectedclass = _this.GetEditedData.data.classid;
                _this.Selectedproduct = _this.GetEditedData.data.productid;
                _this.fees = _this.GetEditedData.data.fees;
                _this.gst = _this.GetEditedData.data.gst;
                _this.conveniencefees = _this.GetEditedData.data.conveniencefees;
            }
        });
    };
    paidfeaturebackend.prototype.DeleteData = function (i, Id) {
        var _this = this;
        var data;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        data =
            {
                "pricingid": Id
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
                _this.http.post('api/paidfeaturebackend/DeleteActivity', body, options).subscribe(function (data) {
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
    paidfeaturebackend.prototype.onClear = function () {
        this.Selectedclass = 0;
        this.Selectedproduct = 0;
        this.fees = "";
        this.gst = "";
        this.conveniencefees = "";
        this.ButtonText = "Save";
    };
    paidfeaturebackend = __decorate([
        core_1.Component({
            selector: 'app-paidfeaturebackend',
            templateUrl: './paidfeaturebackend.component.html',
        }),
        __metadata("design:paramtypes", [http_1.HttpClient, router_1.Router, angular_2_local_storage_1.LocalStorageService, ngx_toastr_1.ToastrService, ngx_ui_loader_1.NgxUiLoaderService])
    ], paidfeaturebackend);
    return paidfeaturebackend;
}());
exports.paidfeaturebackend = paidfeaturebackend;
//# sourceMappingURL=paidfeaturebackend.component.js.map