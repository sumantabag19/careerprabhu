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
var addstudent = /** @class */ (function () {
    function addstudent(http, router, localstorage, toaster, loader, renderer, config, config1) {
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
        this.selectedschool = 0;
        this.schdata = [];
        this.SchoolData = [];
        this.selectedclass = 0;
        this.ClassData = [];
        this.classdat = [];
        this.StreamData = [];
        this.streamdat = [];
        this.selectedstream = 0;
        this.studentname = "";
        this.email = "";
        this.mobileno = "";
        this.fathersname = "";
        this.parentemail = "";
        this.parentmobileno = "";
        this.studentid = 0;
        this.StudentData = [];
        this.Detail = [];
        this.GetSaveData = [];
        this.GetEditedData = [];
        this.DeletedData = [];
    }
    addstudent.prototype.ngOnInit = function () {
        this.BindState();
        this.BindClass();
        this.BindStream();
        this.GetData();
    };
    addstudent.prototype.BindState = function () {
        var _this = this;
        debugger;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.statedat = [];
        var tmpclass = [];
        this.http.post('api/addstudent/Bindstate', options).subscribe(function (data) {
            _this.statedat = data;
            if (_this.statedat.Status == true) {
                _this.StateData = _this.statedat.data;
            }
            else {
                _this.StateData = _this.statedat.data;
            }
        });
    };
    addstudent.prototype.BindCity = function () {
        var _this = this;
        debugger;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.citdata = [];
        var body = {
            "stateid": this.selectedstate
        };
        var tmpclass = [];
        this.http.post('api/addstudent/BindCity', body, options).subscribe(function (data) {
            _this.citdata = data;
            if (_this.citdata.Status == true) {
                _this.CityData = _this.citdata.data;
            }
            else {
                _this.CityData = _this.citdata.data;
            }
        });
    };
    addstudent.prototype.BindSchool = function () {
        var _this = this;
        debugger;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.schdata = [];
        var body = {
            "stateid": this.selectedstate,
            "cityid": this.selectedcity
        };
        var tmpclass = [];
        this.http.post('api/addstudent/BindSchool', body, options).subscribe(function (data) {
            _this.schdata = data;
            if (_this.schdata.Status == true) {
                _this.SchoolData = _this.schdata.data;
            }
            else {
                _this.SchoolData = _this.schdata.data;
            }
        });
    };
    addstudent.prototype.BindClass = function () {
        var _this = this;
        debugger;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.classdat = [];
        var tmpclass = [];
        this.http.post('api/addstudent/Bindclass', options).subscribe(function (data) {
            _this.classdat = data;
            if (_this.classdat.Status == true) {
                _this.ClassData = _this.classdat.data;
            }
            else {
                _this.ClassData = _this.classdat.data;
            }
        });
    };
    //binds  stream code
    addstudent.prototype.BindStream = function () {
        var _this = this;
        debugger;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.streamdat = [];
        var tmpclass = [];
        this.http.post('api/addstudent/BindStream', options).subscribe(function (data) {
            debugger;
            _this.streamdat = data;
            if (_this.streamdat.Status == true) {
                _this.StreamData = _this.streamdat.data;
            }
            else {
                _this.StreamData = _this.streamdat.data;
            }
        });
    };
    addstudent.prototype.onSubmit = function () {
        var _this = this;
        debugger;
        if (this.ButtonText == "Save") {
            if (this.studentname == "" || this.studentname == undefined) {
                sweetalert2_1.default.fire("", "Please enter student name ", "error");
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
            if (this.selectedclass == 0 || this.selectedclass == undefined) {
                sweetalert2_1.default.fire("", "Please select class", "error");
                return;
            }
            if (this.selectedstream == 0 || this.selectedstream == undefined) {
                sweetalert2_1.default.fire("", "Please select stream", "error");
                return;
            }
            if (this.email == "" || this.email == undefined) {
                sweetalert2_1.default.fire("", "Please select email", "error");
                return;
            }
            if (!this.email.match('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')) {
                sweetalert2_1.default.fire("", "Please enter valid email", "error");
                return;
            }
            if (this.mobileno == "" || this.mobileno == undefined) {
                sweetalert2_1.default.fire("", "Please enter mobileno", "error");
                return;
            }
            if (!this.mobileno.match(/^(\+\d{1,3}[- ]?)?\d{10}$/)) {
                sweetalert2_1.default.fire("", "Please enter valid mobile no ", "error");
                return;
            }
            if (this.fathersname == "" || this.fathersname == undefined) {
                sweetalert2_1.default.fire("", "Please enter fathers name", "error");
                return;
            }
            if (this.parentemail == "" || this.parentemail == undefined) {
                sweetalert2_1.default.fire("", "Please enter parents email", "error");
                return;
            }
            if (!this.parentemail.match('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')) {
                sweetalert2_1.default.fire("", "Please enter valid parent email", "error");
                return;
            }
            if (this.parentmobileno == "" || this.parentmobileno == undefined) {
                sweetalert2_1.default.fire("", "Please enter parents mobileno", "error");
                return;
            }
            if (!this.parentmobileno.match(/^(\+\d{1,3}[- ]?)?\d{10}$/)) {
                sweetalert2_1.default.fire("", "Please enter valid parents mobileno ", "error");
                return;
            }
            var input = new FormData();
            input.append("studentid", this.studentid.toString());
            input.append("studentname", this.studentname);
            input.append("stateid", this.selectedstate.toString());
            input.append("schoolid", this.selectedschool.toString());
            input.append("cityid", this.selectedcity.toString());
            input.append("classid", this.selectedclass.toString());
            input.append("streamid", this.selectedstream.toString());
            input.append("email", this.email);
            input.append("mobileno", this.mobileno);
            input.append("fathersname", this.fathersname.toString());
            input.append("parentemail", this.parentemail.toString());
            input.append("parentmobileno", this.parentmobileno.toString());
            input.append("createdby", this.localstorage.get("userid").toString());
            this.http.post('api/addstudent/SaveStudent', input)
                .subscribe(function (data) {
                debugger;
                _this.StudentData = data;
                if (_this.StudentData.Status == true) {
                    if (_this.StudentData.Message == "Student Details Already Exists") {
                        sweetalert2_1.default.fire("", "Student Details Already Exists", "success");
                        _this.onClear();
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
            if (this.studentname == "" || this.studentname == undefined) {
                sweetalert2_1.default.fire("", "Please enter student name ", "error");
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
            if (this.selectedclass == 0 || this.selectedclass == undefined) {
                sweetalert2_1.default.fire("", "Please select class", "error");
                return;
            }
            if (this.selectedstream == 0 || this.selectedstream == undefined) {
                sweetalert2_1.default.fire("", "Please select stream", "error");
                return;
            }
            if (this.email == "" || this.email == undefined) {
                sweetalert2_1.default.fire("", "Please select email", "error");
                return;
            }
            if (!this.email.match('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')) {
                sweetalert2_1.default.fire("", "Please enter valid email", "error");
                return;
            }
            if (this.mobileno == "" || this.mobileno == undefined) {
                sweetalert2_1.default.fire("", "Please enter mobileno", "error");
                return;
            }
            if (this.fathersname == "" || this.fathersname == undefined) {
                sweetalert2_1.default.fire("", "Please enter fathers name", "error");
                return;
            }
            if (this.parentemail == "" || this.parentemail == undefined) {
                sweetalert2_1.default.fire("", "Please enter parents email", "error");
                return;
            }
            if (!this.parentemail.match('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')) {
                sweetalert2_1.default.fire("", "Please enter valid parent email", "error");
                return;
            }
            if (this.parentmobileno == "" || this.parentmobileno == undefined) {
                sweetalert2_1.default.fire("", "Please enter parents mobileno", "error");
                return;
            }
            if (!this.parentmobileno.match(/^(\+\d{1,3}[- ]?)?\d{10}$/)) {
                sweetalert2_1.default.fire("", "Please enter valid parents mobileno ", "error");
                return;
            }
            var input = new FormData();
            input.append("studentid", this.studentid.toString());
            input.append("studentname", this.studentname);
            input.append("stateid", this.selectedstate.toString());
            input.append("schoolid", this.selectedschool.toString());
            input.append("cityid", this.selectedcity.toString());
            input.append("classid", this.selectedclass.toString());
            input.append("streamid", this.selectedstream.toString());
            input.append("email", this.email);
            input.append("mobileno", this.mobileno);
            input.append("fathersname", this.fathersname.toString());
            input.append("parentemail", this.parentemail.toString());
            input.append("parentmobileno", this.parentmobileno.toString());
            input.append("createdby", this.localstorage.get("userid").toString());
            this.http.post('api/addstudent/UpdateStudent', input)
                .subscribe(function (data) {
                debugger;
                _this.StudentData = data;
                if (_this.StudentData.Status == true) {
                    if (_this.StudentData.Message == "Student Details Already Exists") {
                        _this.GetData();
                        sweetalert2_1.default.fire("", "Student Details Already Exists", "success");
                        _this.onClear();
                        return;
                    }
                    else {
                        _this.GetData();
                        sweetalert2_1.default.fire("", "Successfully Updated", "success");
                        _this.onClear();
                        return;
                    }
                }
            });
        }
    };
    addstudent.prototype.GetData = function () {
        var _this = this;
        debugger;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.Detail = [];
        this.http.get('api/addstudent/GetSavedData', options).subscribe(function (data) {
            debugger;
            _this.Detail = data;
            _this.GetSaveData = _this.Detail.data;
        });
    };
    addstudent.prototype.EditData = function (i, Id) {
        var _this = this;
        this.BindClass();
        this.BindStream();
        this.BindState();
        this.ButtonText = 'Update';
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.http.get('api/addstudent/GetEditData?studentid=' + Id, options).subscribe(function (data) {
            debugger;
            _this.GetEditedData = data;
            if (_this.GetEditedData.Status == true) {
                _this.studentid = _this.GetEditedData.data.studentid;
                _this.studentname = _this.GetEditedData.data.studentname;
                _this.selectedstate = _this.GetEditedData.data.stateid;
                _this.BindCity();
                _this.selectedcity = _this.GetEditedData.data.cityid;
                _this.BindSchool();
                _this.selectedschool = _this.GetEditedData.data.schoolid;
                _this.selectedclass = _this.GetEditedData.data.classid;
                _this.selectedstream = _this.GetEditedData.data.streamid;
                _this.email = _this.GetEditedData.data.email;
                _this.mobileno = _this.GetEditedData.data.mobileno;
                _this.fathersname = _this.GetEditedData.data.fathersname;
                _this.parentemail = _this.GetEditedData.data.parentemail;
                _this.parentmobileno = _this.GetEditedData.data.parentmobileno;
            }
        });
    };
    addstudent.prototype.DeleteData = function (i, Id) {
        var _this = this;
        var data;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        data =
            {
                "studentid": Id
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
                _this.http.post('api/addstudent/DeleteActivity', body, options).subscribe(function (data) {
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
    addstudent.prototype.onClear = function () {
        this.selectedclass = 0;
        this.selectedstream = 0;
        this.selectedcity = 0;
        this.selectedschool = 0;
        this.selectedstate = 0;
        this.studentname = "";
        this.email = "";
        this.mobileno = "";
        this.fathersname = "";
        this.parentemail = "";
        this.parentmobileno = "";
        this.ButtonText = "Save";
    };
    addstudent = __decorate([
        core_1.Component({
            selector: 'app-addstudent',
            templateUrl: './addstudent.component.html',
        }),
        __metadata("design:paramtypes", [http_1.HttpClient, router_1.Router, angular_2_local_storage_1.LocalStorageService, ngx_toastr_1.ToastrService, ngx_ui_loader_1.NgxUiLoaderService, core_1.Renderer2, ng_bootstrap_1.NgbTimepickerConfig, ng_bootstrap_1.NgbDatepickerConfig])
    ], addstudent);
    return addstudent;
}());
exports.addstudent = addstudent;
//# sourceMappingURL=addstudent.component.js.map