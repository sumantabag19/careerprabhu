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
var PaidFeaturemanager = /** @class */ (function () {
    function PaidFeaturemanager(http, router, localstorage, toaster, loader) {
        this.http = http;
        this.router = router;
        this.localstorage = localstorage;
        this.toaster = toaster;
        this.loader = loader;
        this.ShowDiv = 0;
        this.IsParent = false;
        this.IsStudent = false;
        this.ButtonText = "Save";
        this.testimonials = "";
        this.selectedphoto = [];
        this.video = "";
        this.StreamData = [];
        this.selectedstream = 0;
        this.ClassData = [];
        this.selectedclass = 0;
        this.school = "";
        this.name = "";
        this.description = "";
        this.selectedimage = [];
        this.link = "";
        this.convfees = 0;
        this.gst = 0;
        this.fees = 0;
        this.CategoryData = [];
        this.selectedcategory = 0;
        this.pdffile = [];
        this.pdftoupload = [];
        this.orgpdfname = "";
        this.photofile = [];
        this.phototoupload = [];
        this.orgphotoname = "";
        this.CategoryData_d = [];
        this.classdata_d = [];
        this.StreamData_d = [];
        this.paiddata = [];
        this.GetSaveData = [];
    }
    PaidFeaturemanager.prototype.ngOnInit = function () {
        this.BindCategory();
        this.BindClass();
        this.BindStream();
    };
    PaidFeaturemanager.prototype.onChangeOfCheckBox = function () {
        if (this.IsParent == true) {
            this.ShowDiv = 1;
            this.IsStudent = false;
        }
        else {
            this.ShowDiv = 0;
        }
    };
    PaidFeaturemanager.prototype.onChangeOfCheckBox1 = function () {
        if (this.IsStudent == true) {
            this.ShowDiv = 1;
            this.IsParent = false;
        }
        else {
            this.ShowDiv = 0;
        }
    };
    PaidFeaturemanager.prototype.EditData = function (i, traitid) {
    };
    PaidFeaturemanager.prototype.DeleteData = function (i, traitid) {
    };
    PaidFeaturemanager.prototype.onClear = function () {
    };
    PaidFeaturemanager.prototype.GetPhotoDetail = function (event) {
        debugger;
        this.pdffile = event;
        var file = event.target.files[0];
        var fileList = event.target.files;
        this.pdftoupload = fileList[0];
        if (file.type.includes("png") || file.type.includes("jpg") || file.type.includes("jpeg")) {
            this.orgpdfname = file.name;
        }
        else {
            sweetalert2_1.default.fire("", "Please select image", "error");
            this.myInputVariabl.nativeElement.value = "";
        }
    };
    PaidFeaturemanager.prototype.GetPhoto_Detail = function (event) {
        debugger;
        this.photofile = event;
        var file = event.target.files[0];
        var fileList = event.target.files;
        this.phototoupload = fileList[0];
        if (file.type.includes("png") || file.type.includes("jpg") || file.type.includes("jpeg")) {
            this.orgphotoname = file.name;
        }
        else {
            sweetalert2_1.default.fire("", "Please select image", "error");
            this.myInputVariabl1.nativeElement.value = "";
        }
    };
    PaidFeaturemanager.prototype.BindCategory = function () {
        var _this = this;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.CategoryData = [];
        var a;
        var tmpclass = [];
        this.http.get('api/paidfeature/BindCategory', options).subscribe(function (data) {
            _this.CategoryData_d = data;
            _this.CategoryData = _this.CategoryData_d;
        });
    };
    PaidFeaturemanager.prototype.BindClass = function () {
        var _this = this;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.ClassData = [];
        var a;
        var tmpclass = [];
        this.http.get('api/paidfeature/BindClass', options).subscribe(function (data) {
            _this.classdata_d = data;
            _this.ClassData = _this.classdata_d;
        });
    };
    PaidFeaturemanager.prototype.BindStream = function () {
        var _this = this;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.StreamData = [];
        var a;
        var tmpclass = [];
        this.http.get('api/paidfeature/BindStream', options).subscribe(function (data) {
            _this.StreamData_d = data;
            _this.StreamData = _this.StreamData_d;
        });
    };
    PaidFeaturemanager.prototype.onSubmit = function () {
        var _this = this;
        debugger;
        if (this.ButtonText == "Save") {
            if (this.selectedcategory == 0 || this.selectedcategory == undefined) {
                sweetalert2_1.default.fire("", "Please select category", "error");
                return;
            }
            if (this.fees == 0 || this.fees == undefined) {
                sweetalert2_1.default.fire("", "Please enter fees", "error");
                return;
            }
            if ((this.fees.toString()).match("^[a-zA-Z]*$")) {
                sweetalert2_1.default.fire("", "Fees contains only integer", "error");
                return;
            }
            if (this.gst == 0 || this.gst == undefined) {
                sweetalert2_1.default.fire("", "Please enter gst", "error");
                return;
            }
            if ((this.gst.toString()).match("^[a-zA-Z]*$")) {
                sweetalert2_1.default.fire("", "GST contains only integer", "error");
                return;
            }
            if (this.convfees == 0 || this.convfees == undefined) {
                sweetalert2_1.default.fire("", "Please enter convinence fees", "error");
                return;
            }
            if ((this.gst.toString()).match("^[a-zA-Z]*$")) {
                sweetalert2_1.default.fire("", "Convinence fees contains only integer", "error");
                return;
            }
            if (this.link == "" || this.link == undefined) {
                sweetalert2_1.default.fire("", "Please enter link", "error");
                return;
            }
            if (this.orgpdfname == "" || this.orgpdfname == undefined) {
                sweetalert2_1.default.fire("", "Please choose photo", "error");
                return;
            }
            if (this.description == "" || this.description == undefined) {
                sweetalert2_1.default.fire("", "Please enter description", "error");
                return;
            }
            if (this.IsParent == true || this.IsStudent == true) {
                if (this.name == "" || this.name == undefined) {
                    sweetalert2_1.default.fire("", "Please enter name", "error");
                    return;
                }
                if (this.name.match(/[ˆ(\d|+|\-)]/)) {
                    sweetalert2_1.default.fire("", "Name should not contain digit", "error");
                    return;
                }
                else {
                }
                if (this.school == "" || this.name == undefined) {
                    sweetalert2_1.default.fire("", "Please enter name", "error");
                    return;
                }
                if (this.school.match(/[ˆ(\d|+|\-)]/)) {
                    sweetalert2_1.default.fire("", "School name should not contain digit", "error");
                    return;
                }
                else {
                }
                if (this.selectedclass == 0 || this.selectedclass == undefined) {
                    sweetalert2_1.default.fire("", "Please select class", "error");
                    return;
                }
                if (this.selectedstream == 0 || this.selectedstream == undefined) {
                    sweetalert2_1.default.fire("", "Please select stream", "error");
                    return;
                }
                if (this.orgphotoname == "" || this.orgphotoname == undefined) {
                    sweetalert2_1.default.fire("", "Please choose photo", "error");
                    return;
                }
                if (this.video == "" || this.video == undefined) {
                    sweetalert2_1.default.fire("", "Please enter video link", "error");
                    return;
                }
                if (this.testimonials == "" || this.testimonials == undefined) {
                    sweetalert2_1.default.fire("", "Please enter testimonials", "error");
                    return;
                }
            }
            else {
                sweetalert2_1.default.fire("", "Please check testimonials", "error");
                return;
            }
            var input = new FormData();
            input.append("photo", this.pdftoupload);
            input.append("orgphotoname", this.orgpdfname.toString());
            input.append("photo_d", this.phototoupload);
            input.append("orgphotoname_d", this.orgphotoname.toString());
            input.append("categoryid", this.selectedcategory.toString());
            input.append("fees", this.fees.toString());
            input.append("gst", this.gst.toString());
            input.append("convinencefees", this.convfees.toString());
            input.append("link", this.link.toString());
            input.append("descirption", this.description.toString());
            input.append("isstudent", (this.IsStudent == true) ? '1' : '0');
            input.append("isparents", (this.IsParent == true) ? '1' : '0');
            input.append("name", this.name.toString());
            input.append("schoolname", this.school.toString());
            input.append("classid", this.selectedclass.toString());
            input.append("streamid", this.selectedstream.toString());
            input.append("video", this.video.toString());
            input.append("testimonils", this.testimonials.toString());
            input.append("createdby", this.localstorage.get("userid").toString());
            this.http.post('api/paidfeature/savepaidfeature', input)
                .subscribe(function (data) {
                debugger;
                _this.paiddata = data;
                if (_this.paiddata.length > 10) {
                    sweetalert2_1.default.fire("", "Saved Successfully", "success");
                    //this.onClearInterviews();
                    //this.BindInterviewData();
                    return;
                }
            });
        }
        else {
            debugger;
            if (this.selectedcategory == 0 || this.selectedcategory == undefined) {
                sweetalert2_1.default.fire("", "Please select category", "error");
                return;
            }
            if (this.fees == 0 || this.fees == undefined) {
                sweetalert2_1.default.fire("", "Please enter fees", "error");
                return;
            }
            if ((this.fees.toString()).match("^[a-zA-Z]*$")) {
                sweetalert2_1.default.fire("", "Fees contains only integer", "error");
                return;
            }
            if (this.gst == 0 || this.gst == undefined) {
                sweetalert2_1.default.fire("", "Please enter gst", "error");
                return;
            }
            if ((this.gst.toString()).match("^[a-zA-Z]*$")) {
                sweetalert2_1.default.fire("", "GST contains only integer", "error");
                return;
            }
            if (this.convfees == 0 || this.convfees == undefined) {
                sweetalert2_1.default.fire("", "Please enter convinence fees", "error");
                return;
            }
            if ((this.gst.toString()).match("^[a-zA-Z]*$")) {
                sweetalert2_1.default.fire("", "Convinence fees contains only integer", "error");
                return;
            }
            if (this.link == "" || this.link == undefined) {
                sweetalert2_1.default.fire("", "Please enter link", "error");
                return;
            }
            if (this.orgpdfname == "" || this.orgpdfname == undefined) {
                sweetalert2_1.default.fire("", "Please choose photo", "error");
                return;
            }
            if (this.description == "" || this.description == undefined) {
                sweetalert2_1.default.fire("", "Please enter description", "error");
                return;
            }
            if (this.IsParent == true || this.IsStudent == true) {
                if (this.name == "" || this.name == undefined) {
                    sweetalert2_1.default.fire("", "Please enter name", "error");
                    return;
                }
                if (this.name.match(/[ˆ(\d|+|\-)]/)) {
                    sweetalert2_1.default.fire("", "Name should not contain digit", "error");
                    return;
                }
                else {
                }
                if (this.school == "" || this.name == undefined) {
                    sweetalert2_1.default.fire("", "Please enter name", "error");
                    return;
                }
                if (this.school.match(/[ˆ(\d|+|\-)]/)) {
                    sweetalert2_1.default.fire("", "School name should not contain digit", "error");
                    return;
                }
                else {
                }
                if (this.selectedclass == 0 || this.selectedclass == undefined) {
                    sweetalert2_1.default.fire("", "Please select class", "error");
                    return;
                }
                if (this.selectedstream == 0 || this.selectedstream == undefined) {
                    sweetalert2_1.default.fire("", "Please select stream", "error");
                    return;
                }
                if (this.orgphotoname == "" || this.orgphotoname == undefined) {
                    sweetalert2_1.default.fire("", "Please choose photo", "error");
                    return;
                }
                if (this.video == "" || this.video == undefined) {
                    sweetalert2_1.default.fire("", "Please enter video link", "error");
                    return;
                }
                if (this.testimonials == "" || this.testimonials == undefined) {
                    sweetalert2_1.default.fire("", "Please enter testimonials", "error");
                    return;
                }
            }
            else {
                sweetalert2_1.default.fire("", "Please check testimonials", "error");
                return;
            }
            var input = new FormData();
            input.append("photo", this.pdftoupload);
            input.append("orgphotoname", this.orgpdfname.toString());
            input.append("photo_d", this.phototoupload);
            input.append("orgphotoname_d", this.orgphotoname.toString());
            input.append("categoryid", this.selectedcategory.toString());
            input.append("fees", this.fees.toString());
            input.append("gst", this.gst.toString());
            input.append("convinencefees", this.convfees.toString());
            input.append("link", this.link.toString());
            input.append("descirption", this.description.toString());
            input.append("isstudent", (this.IsStudent == true) ? '1' : '0');
            input.append("isparents", (this.IsParent == true) ? '1' : '0');
            input.append("name", this.name.toString());
            input.append("schoolname", this.school.toString());
            input.append("classid", this.selectedclass.toString());
            input.append("streamid", this.selectedstream.toString());
            input.append("video", this.video.toString());
            input.append("testimonils", this.testimonials.toString());
            input.append("createdby", this.localstorage.get("userid").toString());
            this.http.post('api/paidfeature/updatepaidfeature', input)
                .subscribe(function (data) {
                debugger;
                _this.paiddata = data;
                if (_this.paiddata.length > 10) {
                    sweetalert2_1.default.fire("", "Updated Successfully", "success");
                    //this.onClearInterviews();
                    //this.BindInterviewData();
                    return;
                }
            });
        }
    };
    __decorate([
        core_1.ViewChild('inputfile', { static: true }),
        __metadata("design:type", core_1.ElementRef)
    ], PaidFeaturemanager.prototype, "myInputVariabl", void 0);
    __decorate([
        core_1.ViewChild('inputfile1', { static: true }),
        __metadata("design:type", core_1.ElementRef)
    ], PaidFeaturemanager.prototype, "myInputVariabl1", void 0);
    PaidFeaturemanager = __decorate([
        core_1.Component({
            selector: 'app-paidfeature',
            templateUrl: './paidfeature.component.html',
        }),
        __metadata("design:paramtypes", [http_1.HttpClient, router_1.Router, angular_2_local_storage_1.LocalStorageService, ngx_toastr_1.ToastrService, ngx_ui_loader_1.NgxUiLoaderService])
    ], PaidFeaturemanager);
    return PaidFeaturemanager;
}());
exports.PaidFeaturemanager = PaidFeaturemanager;
//# sourceMappingURL=paidfeature.component.js.map