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
var xlsx = require("xlsx");
var AddPlacementManager = /** @class */ (function () {
    function AddPlacementManager(http, router, localstorage, toaster, loader, renderer, config, config1) {
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
        this.StreamData = [];
        this.streamdat = [];
        this.AcademicYearData = [];
        this.selectedyear = 0;
        this.yeardat = [];
        this.selectedstream = 0;
        this.studentname = "";
        this.mobile = "";
        this.fathername = "";
        this.university = "";
        this.college = "";
        this.course = "";
        this.specialization = "";
        this.placedid = 0;
        this.PlacementData = [];
        this.Detail = [];
        this.GetSaveData = [];
        this.GetEditedData = [];
        this.DeletedData = [];
        this.search = "";
        this.excelfile = [];
        this.arrayBuffer = [];
        this.exceldata = [];
        this.GetData1 = [];
        this.dw = "";
        this.SelectedImage = [];
    }
    AddPlacementManager.prototype.ngOnInit = function () {
        this.BindState();
        this.BindStream();
        this.BindAcademicYear();
        this.GetData();
        this.dw = "http://admin.careerprabhu.com/placement.xlsx";
    };
    AddPlacementManager.prototype.incomingfile = function (event) {
        this.excelfile = event.target.files[0];
        //if (!this.excelfile.type.includes(".sheet")) {
        //  this.toaster.warning("Please upload only Excel files.", '', { easeTime: 1000, timeOut: 3000 });
        //  var $el = $('#UploadedFile');
        //  $el.wrap('<form>').closest('form').get(0).reset();
        //  $el.unwrap();
        //  this.excelfile = null;
        //}
    };
    AddPlacementManager.prototype.Uploadexcel = function () {
        var _this = this;
        debugger;
        if (this.excelfile != undefined || this.excelfile != null) {
            var fileReader_1 = new FileReader();
            fileReader_1.onload = function (e) {
                _this.arrayBuffer = fileReader_1.result;
                var data = new Uint8Array(_this.arrayBuffer);
                var arr = new Array();
                for (var i = 0; i != data.length; ++i)
                    arr[i] = String.fromCharCode(data[i]);
                var bstr = arr.join("");
                var workbook = xlsx.read(bstr, { type: "binary" });
                var first_sheet_name = workbook.SheetNames[0];
                var worksheet = workbook.Sheets[first_sheet_name];
                //console.log(xlsx.utils.sheet_to_json(worksheet, { raw: true }));
                //
                _this.exceldata = xlsx.utils.sheet_to_json(worksheet, { raw: true });
                _this.ValidateExcel(_this.exceldata);
                //var $el = $('#UploadedFile');
                //$el.wrap('<form>').closest('form').get(0).reset();
                //$el.unwrap();
                //this.excelfile = null;
            };
            fileReader_1.readAsArrayBuffer(this.excelfile);
        }
        else {
            this.toaster.warning("Please choose an Excel file.");
        }
    };
    AddPlacementManager.prototype.ValidateExcel = function (Data) {
        var _this = this;
        var Validate = true;
        var cols = ["studentname", "mobileno", "fathername", "state", "city", "university", "college", "stream", "course", "specialization", "academicyear"];
        for (var i = 0; i < cols.length; i++) {
            for (var j = 0; j < Data.length; j++) {
                if (Data[j][cols[i]] == undefined) {
                    sweetalert2_1.default.fire('Oops...', cols[i] + " is not available at  row number " + (j + 2), 'warning');
                    var Validate = false;
                    return;
                }
            }
        }
        if (Validate == true) {
            debugger;
            var headers = new http_1.HttpHeaders({
                'Content-Type': 'application/json'
            });
            var options = { headers: headers };
            var data = {
                "schoolDatas": Data
            };
            var body = JSON.stringify(data);
            // this.Loader.start();
            this.http.post('api/placement/Upload', body, options).subscribe(function (data) {
                // this.Loader.stop();
                debugger;
                _this.GetData1 = data;
                if (_this.GetData1.Status == true) {
                    sweetalert2_1.default.fire("", "Data Imported Succesfully", "success");
                    //this.onClear();
                    _this.GetData();
                    _this.myInputVariableprefile.nativeElement.value = "";
                    _this.excelfile = [];
                    return;
                }
                else {
                    sweetalert2_1.default.fire("", "Something Went Wrong", "success");
                    // this.onClear();
                    _this.GetData();
                    _this.myInputVariableprefile.nativeElement.value = "";
                    _this.excelfile = [];
                    return;
                }
            });
        }
    };
    //bind state
    AddPlacementManager.prototype.BindState = function () {
        var _this = this;
        debugger;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.statedat = [];
        var tmpclass = [];
        this.http.post('api/placement/Bindstate', options).subscribe(function (data) {
            _this.statedat = data;
            if (_this.statedat.Status == true) {
                _this.StateData = _this.statedat.data;
            }
            else {
                _this.StateData = _this.statedat.data;
            }
        });
    };
    //bindc  city code
    AddPlacementManager.prototype.BindCity = function () {
        var _this = this;
        debugger;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.citdata = [];
        var body = {
            "stateid": this.selectedstate
        };
        var tmpclass = [];
        this.http.post('api/placement/BindCity', body, options).subscribe(function (data) {
            _this.citdata = data;
            if (_this.citdata.Status == true) {
                _this.CityData = _this.citdata.data;
            }
            else {
                _this.CityData = _this.citdata.data;
            }
        });
    };
    //BindSchool() {
    //  debugger;
    //  let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    //  let options = { headers: headers };
    //  this.schdata = [];
    //  var body = {
    //    "stateid": this.selectedstate,
    //    "cityid": this.selectedcity
    //  }
    //  var tmpclass: any = [];
    //  this.http.post('api/placement/BindSchool', body, options).subscribe(
    //    (data) => {
    //      this.schdata = data;
    //      if (this.schdata.Status == true) {
    //        this.SchoolData = this.schdata.data;
    //      }
    //      else {
    //        this.SchoolData = this.schdata.data;
    //      }
    //    }
    //  )
    //}
    AddPlacementManager.prototype.BindStream = function () {
        var _this = this;
        debugger;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.streamdat = [];
        var tmpclass = [];
        this.http.post('api/placement/BindStream', options).subscribe(function (data) {
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
    AddPlacementManager.prototype.BindAcademicYear = function () {
        var _this = this;
        debugger;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.yeardat = [];
        var tmpclass = [];
        this.http.post('api/placement/BindYear', options).subscribe(function (data) {
            _this.yeardat = data;
            if (_this.yeardat.Status == true) {
                _this.AcademicYearData = _this.yeardat.data;
            }
            else {
                _this.AcademicYearData = _this.yeardat.data;
            }
        });
    };
    //Save placement data
    AddPlacementManager.prototype.onSubmit = function () {
        var _this = this;
        debugger;
        if (this.ButtonText == "Save") {
            if (this.studentname == "" || this.studentname == undefined) {
                sweetalert2_1.default.fire("", "Please enter student name ", "error");
                return;
            }
            if (this.studentname.match(/[ˆ(\d|+|\-)]/)) {
                sweetalert2_1.default.fire("", "Name should not contain digit", "error");
                return;
            }
            else {
            }
            if (this.mobile == "" || this.mobile == undefined) {
                sweetalert2_1.default.fire("", "Please enter mobile no ", "error");
                return;
            }
            if (!this.mobile.match(/^(\+\d{1,3}[- ]?)?\d{10}$/)) {
                sweetalert2_1.default.fire("", "Please enter valid mobile no ", "error");
                return;
            }
            if (this.fathername == "" || this.fathername == undefined) {
                sweetalert2_1.default.fire("", "Please enter father name", "error");
                return;
            }
            if (this.fathername.match(/[ˆ(\d|+|\-)]/)) {
                sweetalert2_1.default.fire("", "Name should not contain digit", "error");
                return;
            }
            else {
            }
            if (this.selectedstate == 0 || this.selectedstate == undefined) {
                sweetalert2_1.default.fire("", "Please select state", "error");
                return;
            }
            if (this.selectedcity == 0 || this.selectedcity == undefined) {
                sweetalert2_1.default.fire("", "Please select city", "error");
                return;
            }
            //if (this.selectedschool == 0 || this.selectedschool == undefined) {
            //  Swal.fire("", "Please select school", "error");
            //  return;
            //}
            if (this.selectedstream == 0 || this.selectedstream == undefined) {
                sweetalert2_1.default.fire("", "Please select stream", "error");
                return;
            }
            if (this.selectedyear == 0 || this.selectedyear == undefined) {
                sweetalert2_1.default.fire("", "Please select academic year", "error");
                return;
            }
            if (this.university == "" || this.university == undefined) {
                sweetalert2_1.default.fire("", "Please enter university", "error");
                return;
            }
            if (this.college == "" || this.college == undefined) {
                sweetalert2_1.default.fire("", "Please enter college name", "error");
                return;
            }
            if (this.course == "" || this.course == undefined) {
                sweetalert2_1.default.fire("", "Please enter course", "error");
                return;
            }
            if (this.specialization == "" || this.specialization == undefined) {
                sweetalert2_1.default.fire("", "Please enter specialization", "error");
                return;
            }
            var input = new FormData();
            input.append("placedid", this.placedid.toString());
            input.append("stateid", this.selectedstate.toString());
            //input.append("schoolid", this.selectedschool.toString());
            input.append("cityid", this.selectedcity.toString());
            input.append("streamid", this.selectedstream.toString());
            input.append("yearid", this.selectedyear.toString());
            input.append("studentname", this.studentname);
            input.append("mobileno", this.mobile);
            input.append("fathername", this.fathername.toString());
            input.append("university", this.university.toString());
            input.append("collegename", this.college.toString());
            input.append("course", this.course.toString());
            input.append("specialization", this.specialization.toString());
            input.append("createdby", this.localstorage.get("userid").toString());
            this.http.post('api/placement/SavePlacement', input)
                .subscribe(function (data) {
                debugger;
                _this.PlacementData = data;
                if (_this.PlacementData.Status == true) {
                    sweetalert2_1.default.fire("", "Saved Successfully", "success");
                    _this.GetData();
                    _this.onClear();
                    return;
                }
            });
        }
        else {
            debugger;
            if (this.studentname == "" || this.studentname == undefined) {
                sweetalert2_1.default.fire("", "Please enter student name ", "error");
                return;
            }
            if (this.studentname.match(/[ˆ(\d|+|\-)]/)) {
                sweetalert2_1.default.fire("", "Name should not contain digit", "error");
                return;
            }
            else {
            }
            if (this.mobile == "" || this.mobile == undefined) {
                sweetalert2_1.default.fire("", "Please enter mobile no ", "error");
                return;
            }
            if (!this.mobile.match(/^(\+\d{1,3}[- ]?)?\d{10}$/)) {
                sweetalert2_1.default.fire("", "Please enter valid mobile no ", "error");
                return;
            }
            if (this.fathername == "" || this.fathername == undefined) {
                sweetalert2_1.default.fire("", "Please enter father name", "error");
                return;
            }
            if (this.fathername.match(/[ˆ(\d|+|\-)]/)) {
                sweetalert2_1.default.fire("", "Name should not contain digit", "error");
                return;
            }
            else {
            }
            if (this.selectedstate == 0 || this.selectedstate == undefined) {
                sweetalert2_1.default.fire("", "Please select state", "error");
                return;
            }
            if (this.selectedcity == 0 || this.selectedcity == undefined) {
                sweetalert2_1.default.fire("", "Please select city", "error");
                return;
            }
            //if (this.selectedschool == 0 || this.selectedschool == undefined) {
            //  Swal.fire("", "Please select school", "error");
            //  return;
            //}
            if (this.selectedstream == 0 || this.selectedstream == undefined) {
                sweetalert2_1.default.fire("", "Please select stream", "error");
                return;
            }
            if (this.selectedyear == 0 || this.selectedyear == undefined) {
                sweetalert2_1.default.fire("", "Please select academic year", "error");
                return;
            }
            if (this.university == "" || this.university == undefined) {
                sweetalert2_1.default.fire("", "Please enter university", "error");
                return;
            }
            if (this.college == "" || this.college == undefined) {
                sweetalert2_1.default.fire("", "Please enter college name", "error");
                return;
            }
            if (this.course == "" || this.course == undefined) {
                sweetalert2_1.default.fire("", "Please enter course", "error");
                return;
            }
            if (this.specialization == "" || this.specialization == undefined) {
                sweetalert2_1.default.fire("", "Please enter specialization", "error");
                return;
            }
            var input = new FormData();
            input.append("placedid", this.placedid.toString());
            input.append("stateid", this.selectedstate.toString());
            //input.append("schoolid", this.selectedschool.toString());
            input.append("cityid", this.selectedcity.toString());
            input.append("streamid", this.selectedstream.toString());
            input.append("yearid", this.selectedyear.toString());
            input.append("studentname", this.studentname);
            input.append("mobileno", this.mobile);
            input.append("fathername", this.fathername.toString());
            input.append("university", this.university.toString());
            input.append("collegename", this.college.toString());
            input.append("course", this.course.toString());
            input.append("specialization", this.specialization.toString());
            input.append("createdby", this.localstorage.get("userid").toString());
            this.http.post('api/placement/UpdatePlacement', input)
                .subscribe(function (data) {
                _this.PlacementData = data;
                if (_this.PlacementData.Status == true) {
                    sweetalert2_1.default.fire("", "Updated Successfully", "success");
                    _this.GetData();
                    _this.onClear();
                    return;
                }
            });
        }
    };
    AddPlacementManager.prototype.GetData = function () {
        var _this = this;
        debugger;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.Detail = [];
        this.http.get('api/placement/GetSavedData', options).subscribe(function (data) {
            debugger;
            _this.Detail = data;
            _this.GetSaveData = _this.Detail.data;
        });
    };
    AddPlacementManager.prototype.EditData = function (i, Id) {
        var _this = this;
        this.BindStream();
        this.BindAcademicYear();
        this.BindState();
        this.ButtonText = 'Update';
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.http.get('api/placement/GetEditData?placedid=' + Id, options).subscribe(function (data) {
            debugger;
            _this.GetEditedData = data;
            if (_this.GetEditedData.Status == true) {
                _this.selectedstream = _this.GetEditedData.data.streamid;
                _this.selectedyear = _this.GetEditedData.data.yearid;
                _this.selectedstate = _this.GetEditedData.data.stateid;
                _this.BindCity();
                _this.selectedcity = _this.GetEditedData.data.cityid;
                //this.BindSchool();
                // this.selectedschool = this.GetEditedData.data.schoolid;
                _this.studentname = _this.GetEditedData.data.studentname;
                _this.mobile = _this.GetEditedData.data.mobileno;
                _this.fathername = _this.GetEditedData.data.fathername;
                _this.university = _this.GetEditedData.data.university;
                _this.college = _this.GetEditedData.data.college;
                _this.course = _this.GetEditedData.data.course;
                _this.specialization = _this.GetEditedData.data.specialization;
                _this.placedid = _this.GetEditedData.data.placedid;
            }
        });
    };
    AddPlacementManager.prototype.DeleteData = function (i, Id) {
        var _this = this;
        var data;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        data =
            {
                "placedid": Id
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
                _this.http.post('api/placement/DeleteActivity', body, options).subscribe(function (data) {
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
    AddPlacementManager.prototype.onClear = function () {
        this.selectedcity = 0;
        // this.selectedschool = 0;
        this.selectedstate = 0;
        this.selectedstream = 0;
        this.selectedyear = 0;
        this.studentname = "";
        this.mobile = "";
        this.fathername = "";
        this.university = "";
        this.college = "";
        this.course = "";
        this.specialization = "";
        this.ButtonText = "Save";
    };
    __decorate([
        core_1.ViewChild('fileInput', { static: true }),
        __metadata("design:type", core_1.ElementRef)
    ], AddPlacementManager.prototype, "myInputVariableprefile", void 0);
    AddPlacementManager = __decorate([
        core_1.Component({
            selector: 'app-placement',
            templateUrl: './placement.component.html',
        }),
        __metadata("design:paramtypes", [http_1.HttpClient, router_1.Router, angular_2_local_storage_1.LocalStorageService, ngx_toastr_1.ToastrService, ngx_ui_loader_1.NgxUiLoaderService, core_1.Renderer2, ng_bootstrap_1.NgbTimepickerConfig, ng_bootstrap_1.NgbDatepickerConfig])
    ], AddPlacementManager);
    return AddPlacementManager;
}());
exports.AddPlacementManager = AddPlacementManager;
//# sourceMappingURL=placement.component.js.map