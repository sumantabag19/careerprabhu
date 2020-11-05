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
var ProductManager = /** @class */ (function () {
    function ProductManager(http, router, localstorage, toaster, loader) {
        this.http = http;
        this.router = router;
        this.localstorage = localstorage;
        this.toaster = toaster;
        this.loader = loader;
        this.testimonial = "";
        this.SelectedImage = "";
        this.ButtonText = "Save";
        this.GetSaveData = [];
        this.imagefile = [];
        this.imagetoupload = [];
        this.orgimagename = [];
        this.soppropid = 0;
        this.soppropdata = [];
        this.getsopprop = [];
        this.EditSopPropData = [];
        this.DeleteSopPropData = [];
        this.profname = "";
        this.checklink = false;
    }
    ProductManager.prototype.ngOnInit = function () {
        this.GetSavedData();
    };
    ProductManager.prototype.GetImageDetail = function (event) {
        debugger;
        this.imagefile = event;
        var file = event.target.files[0];
        var fileList = event.target.files;
        this.imagetoupload = fileList[0];
        if (file.type.includes("png") || file.type.includes("jpg") || file.type.includes("jpeg")) {
            this.orgimagename = file.name;
        }
        else {
            sweetalert2_1.default.fire("", "Please Select Image", "error");
            this.myInputVariableprefile.nativeElement.value = "";
        }
    };
    //save seek professional help master
    ProductManager.prototype.onSave = function () {
        var _this = this;
        debugger;
        if (this.ButtonText == "Save") {
            if (this.testimonial == "" || this.testimonial == undefined) {
                sweetalert2_1.default.fire("", "Please enter testimonial", "error");
                return;
            }
            if (this.profname == "" || this.profname == undefined) {
                sweetalert2_1.default.fire("", "Please enter name", "error");
                return;
            }
            if (this.profname.match(/[ˆ(\d|+|\-)]/)) {
                sweetalert2_1.default.fire("", "Name should not contain digit", "error");
                return;
            }
            var input = new FormData();
            input.append("soppropid", this.soppropid.toString());
            input.append("profname", this.profname.toString());
            input.append("testimonial", this.testimonial.toString());
            input.append("image", this.imagetoupload);
            input.append("orgimagename", this.orgimagename.toString());
            input.append("createdby", this.localstorage.get("userid").toString());
            this.http.post('api/premiumproduct/SaveSopPropData', input)
                .subscribe(function (data) {
                debugger;
                _this.soppropdata = data;
                if (_this.soppropdata.Status == true) {
                    if (_this.soppropdata.Message == "Product Already Exists") {
                        sweetalert2_1.default.fire("", "Poroduct Already Exists", "success");
                        _this.onClear();
                        _this.GetSavedData();
                        return;
                    }
                    else {
                        sweetalert2_1.default.fire("", "Saved Successfully", "success");
                        _this.onClear();
                        _this.GetSavedData();
                        return;
                    }
                }
            });
        }
        else {
            if (this.testimonial == "" || this.testimonial == undefined) {
                sweetalert2_1.default.fire("", "Please enter testimonial", "error");
                return;
            }
            if (this.profname == "" || this.profname == undefined) {
                sweetalert2_1.default.fire("", "Please enter name", "error");
                return;
            }
            if (this.profname.match(/[ˆ(\d|+|\-)]/)) {
                sweetalert2_1.default.fire("", "Name should not contain digit", "error");
                return;
            }
            var input = new FormData();
            input.append("soppropid", this.soppropid.toString());
            input.append("profname", this.profname.toString());
            input.append("testimonial", this.testimonial.toString());
            input.append("image", this.imagetoupload);
            input.append("orgimagename", this.orgimagename.toString());
            input.append("createdby", this.localstorage.get("userid").toString());
            this.http.post('api/premiumproduct/UpdateSopPropData', input)
                .subscribe(function (data) {
                debugger;
                _this.soppropdata = data;
                if (_this.soppropdata.Status == true) {
                    if (_this.soppropdata.Message == "Product Already Exists") {
                        sweetalert2_1.default.fire("", "Poroduct Already Exists", "success");
                        _this.onClear();
                        _this.GetSavedData();
                        return;
                    }
                    else {
                        sweetalert2_1.default.fire("", "Updated Successfully", "success");
                        _this.onClear();
                        _this.GetSavedData();
                        return;
                    }
                }
            });
        }
    };
    //get saved data for bind
    ProductManager.prototype.GetSavedData = function () {
        var _this = this;
        debugger;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.http.get('api/premiumproduct/BindSOPPropData', options).subscribe(function (data) {
            debugger;
            _this.getsopprop = data;
            debugger;
            _this.GetSaveData = _this.getsopprop.data;
        });
    };
    ProductManager.prototype.onClear = function () {
        this.testimonial = "";
        this.ButtonText = "Save";
        this.imagefile = [];
        this.imagetoupload = [];
        this.orgimagename = "";
        this.profname = "";
        this.myInputVariableprefile.nativeElement.value = "";
    };
    ProductManager.prototype.EditData = function (i, soppropid) {
        var _this = this;
        debugger;
        this.ButtonText = 'Update';
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.http.get('api/premiumproduct/EditSopProp?soppropid=' + soppropid, options).subscribe(function (data) {
            debugger;
            _this.EditSopPropData = data;
            _this.soppropid = _this.EditSopPropData.data[0].soppropid;
            _this.profname = _this.EditSopPropData.data[0].testimonialname;
            _this.testimonial = _this.EditSopPropData.data[0].testimonial;
        });
    };
    ProductManager.prototype.DeleteData = function (i, soppropid) {
        var _this = this;
        var data;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        data =
            {
                "soppropid": soppropid
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
                _this.http.post('api/premiumproduct/DeleteSopProp', body, options).subscribe(function (data) {
                    _this.DeleteSopPropData = data;
                    if (_this.DeleteSopPropData.Status == true) {
                        sweetalert2_1.default.fire("", "Deleted Successfully", "success");
                        _this.GetSavedData();
                        return;
                    }
                });
            }
        });
    };
    __decorate([
        core_1.ViewChild('inputfile', { static: true }),
        __metadata("design:type", core_1.ElementRef)
    ], ProductManager.prototype, "myInputVariableprefile", void 0);
    ProductManager = __decorate([
        core_1.Component({
            selector: 'app-productmaster',
            templateUrl: './productmaster.component.html',
        }),
        __metadata("design:paramtypes", [http_1.HttpClient, router_1.Router, angular_2_local_storage_1.LocalStorageService, ngx_toastr_1.ToastrService, ngx_ui_loader_1.NgxUiLoaderService])
    ], ProductManager);
    return ProductManager;
}());
exports.ProductManager = ProductManager;
//# sourceMappingURL=productmaster.js.map