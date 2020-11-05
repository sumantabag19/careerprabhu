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
var PrincipalRegistration = /** @class */ (function () {
    function PrincipalRegistration(http, router, localstorage, toaster, loader) {
        this.http = http;
        this.router = router;
        this.localstorage = localstorage;
        this.toaster = toaster;
        this.loader = loader;
        this.Buttonsave = "Save";
        this.StateData = [];
        this.selectedstate = 0;
        this.SatatDetail = [];
        this.citdata = [];
        this.CityData = [];
        this.selectedschool = 0;
        this.selectedboard = 0;
        this.schdata = [];
        this.SchoolData = 0;
        this.boarddat = [];
        this.BoardData = 0;
        this.selectedcity = 0;
        this.principalname = "";
        this.mobileno = "";
        this.email = "";
        this.SelectedImage = [];
        this.pdffile = [];
        this.pdftoupload = [];
        this.orgpdfname = "";
        this.principaldata = [];
        this.GetSaveData = [];
        this.Details = [];
        this.GetEditedData = [];
        this.EditPrincipalData = [];
        this.principalid = 0;
        this.showmobile = 1;
        this.showmail = 1;
        this.DeletedData = [];
        this.schooltype = 0;
    }
    PrincipalRegistration.prototype.ngOnInit = function () {
        this.BindState();
        this.BindTableData();
        this.BindBoard();
    };
    PrincipalRegistration.prototype.GetPhotoDetail = function (event) {
        debugger;
        this.pdffile = event;
        var file = event.target.files[0];
        var fileList = event.target.files;
        this.pdftoupload = fileList[0];
        if (file.type.includes("png") || file.type.includes("jpg") || file.type.includes("jpeg")) {
            this.orgpdfname = file.name;
        }
        else {
            sweetalert2_1.default.fire("", "Please select photo", "error");
            this.myInputVariabl.nativeElement.value = "";
        }
    };
    PrincipalRegistration.prototype.BindState = function () {
        var _this = this;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        var a;
        var tmpclass = [];
        this.http.get('api/principalregistration/BindState', options).subscribe(function (data) {
            _this.SatatDetail = data;
            _this.StateData = _this.SatatDetail;
        });
    };
    PrincipalRegistration.prototype.BindCIty = function () {
        var _this = this;
        debugger;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        var body = {
            "stateid": this.selectedstate
        };
        var tmpclass = [];
        this.http.post('api/principalregistration/BindCity', body, options).subscribe(function (data) {
            _this.citdata = data;
            if (_this.citdata.Status == true) {
                _this.CityData = _this.citdata.data;
            }
            else {
                _this.CityData = _this.citdata.data;
            }
        });
    };
    PrincipalRegistration.prototype.BindSchool = function () {
        var _this = this;
        debugger;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        var body = {
            "stateid": this.selectedstate,
            "cityid": this.selectedcity
        };
        var tmpclass = [];
        this.http.post('api/principalregistration/BindSchool', body, options).subscribe(function (data) {
            _this.schdata = data;
            if (_this.schdata.Status == true) {
                _this.SchoolData = _this.schdata.data;
            }
            else {
                _this.SchoolData = _this.schdata.data;
            }
        });
    };
    PrincipalRegistration.prototype.BindBoard = function () {
        var _this = this;
        debugger;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.boarddat = [];
        var tmpclass = [];
        this.http.post('api/principalregistration/BindBoard', options).subscribe(function (data) {
            _this.boarddat = data;
            if (_this.boarddat.Status == true) {
                _this.BoardData = _this.boarddat.data;
            }
            else {
                _this.BoardData = _this.boarddat.data;
            }
        });
    };
    PrincipalRegistration.prototype.Save = function () {
        var _this = this;
        debugger;
        if (this.Buttonsave == "Save") {
            if (this.principalname == "" || this.principalname == undefined) {
                sweetalert2_1.default.fire("", "Please Enter principal name", "error");
                return;
            }
            if (this.principalname.match(/[ˆ(\d|+|\-)]/)) {
                sweetalert2_1.default.fire("", "Name should not contain digit", "error");
                return;
            }
            if (this.selectedstate == 0 || this.selectedstate == undefined) {
                sweetalert2_1.default.fire("", "Please select state", "error");
                return;
            }
            if (this.selectedcity == 0 || this.selectedcity == undefined) {
                sweetalert2_1.default.fire("", "Please select city", "error");
                return;
            }
            if (this.selectedschool == 0 || this.selectedschool == undefined) {
                sweetalert2_1.default.fire("", "Please select school", "error");
                return;
            }
            if (this.mobileno == "" || this.mobileno == undefined) {
                sweetalert2_1.default.fire("", "Please enter mobile no", "error");
                return;
            }
            if (!this.mobileno.match(/^(\+\d{1,3}[- ]?)?\d{10}$/)) {
                sweetalert2_1.default.fire("", "Please enter valid mobile no ", "error");
                return;
            }
            if (this.email == "" || this.email == undefined) {
                sweetalert2_1.default.fire("", "Please enter email", "error");
                return;
            }
            if (this.orgpdfname == "" || this.orgpdfname == undefined) {
                sweetalert2_1.default.fire("", "Please select photo", "error");
                return;
            }
            if (!this.email.match('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')) {
                sweetalert2_1.default.fire("", "Please enter valid email", "error");
                return;
            }
            if (this.selectedboard == 0 || this.selectedboard == undefined) {
                this.selectedboard = 0;
            }
            if (this.schooltype == 0 || this.schooltype == undefined) {
                this.schooltype = 0;
            }
            var input = new FormData();
            input.append("photo", this.pdftoupload);
            input.append("orgphotoname", this.orgpdfname.toString());
            input.append("principalname", this.principalname.toString());
            input.append("stateid", this.selectedstate.toString());
            input.append("cityid", this.selectedcity.toString());
            input.append("schoolid", this.selectedschool.toString());
            input.append("email", this.email.toString());
            input.append("mobileno", this.mobileno.toString());
            input.append("boardid", this.selectedboard.toString());
            input.append("schooltype", this.schooltype.toString());
            input.append("createdby", this.localstorage.get("userid").toString());
            this.http.post('api/principalregistration/saveprincipaldata', input)
                .subscribe(function (data) {
                debugger;
                _this.principaldata = data;
                if (_this.principaldata.status == true) {
                    sweetalert2_1.default.fire("", "Saved Successfully", "success");
                    _this.BindTableData();
                    _this.Reset();
                    return;
                }
            });
        }
        else {
            debugger;
            if (this.principalname == "" || this.principalname == undefined) {
                sweetalert2_1.default.fire("", "Please principal name", "error");
                return;
            }
            if (this.principalname.match(/[ˆ(\d|+|\-)]/)) {
                sweetalert2_1.default.fire("", "Name should not contain digit", "error");
                return;
            }
            if (this.selectedstate == 0 || this.selectedstate == undefined) {
                sweetalert2_1.default.fire("", "Please select state", "error");
                return;
            }
            if (this.selectedcity == 0 || this.selectedcity == undefined) {
                sweetalert2_1.default.fire("", "Please select city", "error");
                return;
            }
            if (this.selectedschool == 0 || this.selectedschool == undefined) {
                sweetalert2_1.default.fire("", "Please select school", "error");
                return;
            }
            if (this.mobileno == "" || this.mobileno == undefined) {
                sweetalert2_1.default.fire("", "Please enter mobile no", "error");
                return;
            }
            if (this.email == "" || this.email == undefined) {
                sweetalert2_1.default.fire("", "Please enter email", "error");
                return;
            }
            if (!this.email.match('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')) {
                sweetalert2_1.default.fire("", "Please enter valid email", "error");
                return;
            }
            if (!this.mobileno.match(/^(\+\d{1,3}[- ]?)?\d{10}$/)) {
                sweetalert2_1.default.fire("", "Please enter valid mobile no ", "error");
                return;
            }
            if (this.selectedboard == 0 || this.selectedboard == undefined) {
                this.selectedboard = 0;
            }
            if (this.schooltype == 0 || this.schooltype == undefined) {
                this.schooltype = 0;
            }
            var input = new FormData();
            input.append("photo", this.pdftoupload);
            input.append("principalid", this.principalid.toString());
            input.append("orgphotoname", this.orgpdfname.toString());
            input.append("principalname", this.principalname.toString());
            input.append("stateid", this.selectedstate.toString());
            input.append("cityid", this.selectedcity.toString());
            input.append("schoolid", this.selectedschool.toString());
            input.append("email", this.email.toString());
            input.append("mobileno", this.mobileno.toString());
            input.append("boardid", this.selectedboard.toString());
            input.append("schooltype", this.schooltype.toString());
            this.http.post('api/principalregistration/updateprincipaldata', input)
                .subscribe(function (data) {
                debugger;
                _this.principaldata = data;
                if (_this.principaldata.status == true) {
                    sweetalert2_1.default.fire("", "Updated Successfully", "success");
                    _this.BindTableData();
                    _this.Reset();
                    return;
                }
            });
        }
    };
    PrincipalRegistration.prototype.Edit = function (i, Id) {
        var _this = this;
        debugger;
        this.showmail = 0;
        this.showmobile = 0;
        this.BindBoard();
        this.Buttonsave = 'Update';
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.http.get('api/principalregistration/GetEditData?principalid=' + Id, options).subscribe(function (data) {
            debugger;
            _this.GetEditedData = data;
            if (_this.GetEditedData.Status == true) {
                debugger;
                _this.EditPrincipalData = data;
                _this.principalid = _this.EditPrincipalData.data.principalid;
                _this.principalname = _this.EditPrincipalData.data.principalname;
                _this.BindState();
                _this.selectedstate = _this.EditPrincipalData.data.stateid;
                _this.BindCIty();
                _this.selectedcity = _this.EditPrincipalData.data.cityid;
                _this.BindSchool();
                _this.selectedschool = _this.EditPrincipalData.data.schoolid;
                _this.mobileno = _this.EditPrincipalData.data.mobileno;
                _this.email = _this.EditPrincipalData.data.email;
                _this.selectedboard = _this.EditPrincipalData.data.boardid;
                _this.schooltype = _this.EditPrincipalData.data.schooltype;
            }
        });
    };
    PrincipalRegistration.prototype.Reset = function () {
        this.selectedcity = 0;
        this.selectedstate = 0;
        this.selectedschool = 0;
        this.principalname = "";
        this.principalid = 0;
        this.mobileno = "";
        this.email = "";
        this.pdftoupload = [];
        this.pdffile = [];
        this.orgpdfname = "";
        this.showmail = 1;
        this.showmobile = 1;
        this.myInputVariabl.nativeElement.value = "";
        this.BindTableData();
        this.selectedboard = 0;
        this.schooltype = 0;
        this.Buttonsave = "Save";
    };
    PrincipalRegistration.prototype.BindTableData = function () {
        var _this = this;
        debugger;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.Details = [];
        this.http.get('api/principalregistration/BindData', options).subscribe(function (data) {
            debugger;
            _this.Details = data;
            _this.GetSaveData = _this.Details.data;
        });
    };
    PrincipalRegistration.prototype.Delete = function (i, Id) {
        var _this = this;
        var data;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        data =
            {
                "principalid": Id
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
                _this.http.post('api/principalregistration/DeleteActivity', body, options).subscribe(function (data) {
                    _this.DeletedData = data;
                    if (_this.DeletedData.Status == true) {
                        sweetalert2_1.default.fire("", "Deleted Successfully", "success");
                        _this.BindTableData();
                        _this.Reset();
                        return;
                    }
                });
            }
        });
    };
    __decorate([
        core_1.ViewChild('inputfile', { static: true }),
        __metadata("design:type", core_1.ElementRef)
    ], PrincipalRegistration.prototype, "myInputVariabl", void 0);
    PrincipalRegistration = __decorate([
        core_1.Component({
            selector: 'app-principalregistration',
            templateUrl: './principalregistration.component.html',
        }),
        __metadata("design:paramtypes", [http_1.HttpClient, router_1.Router, angular_2_local_storage_1.LocalStorageService, ngx_toastr_1.ToastrService, ngx_ui_loader_1.NgxUiLoaderService])
    ], PrincipalRegistration);
    return PrincipalRegistration;
}());
exports.PrincipalRegistration = PrincipalRegistration;
//# sourceMappingURL=principalregistration.component.js.map