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
var xlsx = require("xlsx");
var UniversityManager = /** @class */ (function () {
    function UniversityManager(http, router, localstorage, toaster, loader) {
        this.http = http;
        this.router = router;
        this.localstorage = localstorage;
        this.toaster = toaster;
        this.loader = loader;
        this.selectedcountry = 0;
        this.CountryData = [];
        this.university = "";
        this.ButtonText = "Save";
        this.GetSaveData = [];
        this.location = "";
        this.selectedlocation = 0;
        this.LocationData = [];
        this.CountryDetails = [];
        this.LocButtonText = "Save";
        this.LocationSavedData = [];
        this.locdata = [];
        this.UniversityData = [];
        this.Detail = [];
        this.GetEditedData = [];
        this.universityid = 0;
        this.DeleteUniversityData = [];
        this.selectedcity = 0;
        this.CityButtonText = "Save";
        this.city = "";
        this.CitySavedData = [];
        this.Citydata = [];
        this.CityNewData = [];
        this.message = "";
        this.excelfile = [];
        this.arrayBuffer = [];
        this.exceldata = [];
        this.GetData1 = [];
        this.dw = "";
        this.SelectedImage = [];
    }
    UniversityManager.prototype.ngOnInit = function () {
        this.getCountry();
        this.GetData();
        this.dw = "http://admin.careerprabhu.com/Book1.xlsx";
    };
    UniversityManager.prototype.incomingfile = function (event) {
        this.excelfile = event.target.files[0];
        //if (!this.excelfile.type.includes(".sheet")) {
        //  this.toaster.warning("Please upload only Excel files.", '', { easeTime: 1000, timeOut: 3000 });
        //  var $el = $('#UploadedFile');
        //  $el.wrap('<form>').closest('form').get(0).reset();
        //  $el.unwrap();
        //  this.excelfile = null;
        //}
    };
    UniversityManager.prototype.Uploadexcel = function () {
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
    UniversityManager.prototype.ValidateExcel = function (Data) {
        var _this = this;
        var Validate = true;
        var cols = ["country", "state", "city", "university"];
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
            this.http.post('api/InstituteMaster/Upload', body, options).subscribe(function (data) {
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
    //bind country data
    UniversityManager.prototype.getCountry = function () {
        var _this = this;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.CountryDetails = [];
        var a;
        var tmpclass = [];
        this.http.get('api/InstituteMaster/Bindcountry', options).subscribe(function (data) {
            debugger;
            _this.CountryDetails = data;
            _this.CountryData = _this.CountryDetails;
        });
    };
    //save location 
    UniversityManager.prototype.onSubmitLoc = function () {
        var _this = this;
        debugger;
        if (this.selectedcountry == 0 || this.selectedcountry == undefined) {
            sweetalert2_1.default.fire("", "Please select country", "error");
            return;
        }
        if (this.location == "" || this.location == undefined) {
            sweetalert2_1.default.fire("", "Please enter location", "error");
            return;
        }
        //save operation
        var data;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        data =
            {
                "locationid": 0,
                "countryid": this.selectedcountry,
                "location": this.location
                //"createdby": parseInt(this.localstorage.get("userid"))
            };
        var body = JSON.stringify(data);
        this.http.post('api/InstituteMaster/SaveLocation', body, options).subscribe(function (data) {
            _this.LocationSavedData = data;
            if (_this.LocationSavedData.Status == true) {
                if (_this.LocationSavedData.Message == "Location Already Exists") {
                    sweetalert2_1.default.fire("", "Location Already Exists", "success");
                    //this.onClear();
                    //this.GetData();
                    _this.location = "";
                    _this.BindLocation();
                    return;
                }
                else {
                    sweetalert2_1.default.fire("", "Saved Successfully", "success");
                    //this.onClear();
                    //this.GetData();
                    _this.location = "";
                    _this.BindLocation();
                    return;
                }
            }
        });
    };
    //save city
    UniversityManager.prototype.onSubmitCity = function () {
        var _this = this;
        debugger;
        if (this.selectedcountry == 0 || this.selectedcountry == undefined) {
            sweetalert2_1.default.fire("", "Please select country", "error");
            return;
        }
        if (this.selectedlocation == 0 || this.selectedlocation == undefined) {
            sweetalert2_1.default.fire("", "Please select state", "error");
            return;
        }
        if (this.city == "" || this.city == undefined) {
            sweetalert2_1.default.fire("", "Please enter city", "error");
            return;
        }
        //save operation
        var data;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        data =
            {
                "cityid": 0,
                "countryid": this.selectedcountry,
                "locationid": this.selectedlocation,
                "cityname": this.city
                //"createdby": parseInt(this.localstorage.get("userid"))
            };
        var body = JSON.stringify(data);
        this.http.post('api/InstituteMaster/SaveCity', body, options).subscribe(function (data) {
            _this.CitySavedData = data;
            if (_this.CitySavedData.Status == true) {
                if (_this.CitySavedData.Message == "City Already Exists") {
                    sweetalert2_1.default.fire("", "City Already Exists", "success");
                    //this.onClear();
                    //this.GetData();
                    _this.city = "";
                    _this.BindCity();
                    return;
                }
                else {
                    sweetalert2_1.default.fire("", "Saved Successfully", "success");
                    //this.onClear();
                    //this.GetData();
                    _this.city = "";
                    _this.BindCity();
                    return;
                }
            }
        });
    };
    //get location
    UniversityManager.prototype.BindLocation = function () {
        var _this = this;
        debugger;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.locdata = [];
        var body = {
            "countryid": this.selectedcountry
        };
        var tmpclass = [];
        this.http.post('api/InstituteMaster/BindLocation', body, options).subscribe(function (data) {
            _this.locdata = data;
            if (_this.locdata.Status == true) {
                _this.LocationData = _this.locdata.data;
            }
            else {
                _this.LocationData = _this.locdata.data;
            }
        });
    };
    //get city
    UniversityManager.prototype.BindCity = function () {
        var _this = this;
        debugger;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.locdata = [];
        var body = {
            "countryid": this.selectedcountry,
            "locationid": this.selectedlocation
        };
        var tmpclass = [];
        this.http.post('api/InstituteMaster/BindCity', body, options).subscribe(function (data) {
            _this.Citydata = data;
            if (_this.Citydata.Status == true) {
                _this.CityNewData = _this.Citydata.data;
            }
            else {
                _this.CityNewData = _this.Citydata.data;
            }
        });
    };
    UniversityManager.prototype.onSubmit = function () {
        var _this = this;
        if (this.selectedcountry == 0 || this.selectedcountry == undefined) {
            sweetalert2_1.default.fire("", "Please select country", "error");
            return;
        }
        if (this.selectedlocation == 0 || this.selectedlocation == undefined) {
            sweetalert2_1.default.fire("", "Please select location", "error");
            return;
        }
        if (this.selectedcity == 0 || this.selectedcity == undefined) {
            sweetalert2_1.default.fire("", "Please select city", "error");
            return;
        }
        if (this.university == "" || this.university == undefined) {
            sweetalert2_1.default.fire("", "Please enter university", "error");
            return;
        }
        var data;
        if (this.ButtonText == "Save") {
            var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
            var options = { headers: headers };
            data =
                {
                    "universityid": 0,
                    "countryid": this.selectedcountry,
                    "locationid": this.selectedlocation,
                    "cityid": this.selectedcity,
                    "university": this.university,
                };
            var body = JSON.stringify(data);
            this.http.post('api/InstituteMaster/SaveUniversity', body, options).subscribe(function (data) {
                _this.UniversityData = data;
                if (_this.UniversityData.Status == true) {
                    if (_this.UniversityData.Message == "University Already Exists") {
                        sweetalert2_1.default.fire("", "University Already Exists", "success");
                        _this.onClear();
                        //this.GetData();
                        return;
                    }
                    else {
                        sweetalert2_1.default.fire("", "Saved Successfully", "success");
                        _this.onClear();
                        _this.GetData();
                        return;
                    }
                }
            });
        }
        else {
            debugger;
            var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
            var options = { headers: headers };
            data =
                {
                    "universityid": this.universityid,
                    "countryid": this.selectedcountry,
                    "locationid": this.selectedlocation,
                    "cityid": this.selectedcity,
                    "university": this.university,
                };
            var body = JSON.stringify(data);
            this.http.post('api/InstituteMaster/UpdateUniversity', body, options).subscribe(function (data) {
                _this.UniversityData = data;
                if (_this.UniversityData.Status == true) {
                    sweetalert2_1.default.fire("", "Updated Successfully", "success");
                    _this.onClear();
                    _this.GetData();
                    return;
                }
            });
        }
    };
    //get data for bind table
    UniversityManager.prototype.GetData = function () {
        var _this = this;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.Detail = [];
        this.http.get('api/InstituteMaster/GetUniversityData', options).subscribe(function (data) {
            debugger;
            _this.Detail = data;
            _this.GetSaveData = _this.Detail.data;
            //this.HeaderData = Object.keys(this.GetSaveData[0]);
        });
    };
    UniversityManager.prototype.onClear = function () {
        this.selectedcountry = 0;
        this.selectedlocation = 0;
        this.city = "";
        this.location = "";
        this.selectedcity = 0;
        this.ButtonText = "Save";
        this.university = "";
        this.myInputVariableprefile.nativeElement.value = "";
        this.excelfile = [];
        this.GetData();
    };
    UniversityManager.prototype.EditData = function (i, universityid) {
        var _this = this;
        debugger;
        this.getCountry();
        this.ButtonText = 'Update';
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.http.get('api/InstituteMaster/EditUniversityData?universityid=' + universityid, options).subscribe(function (data) {
            debugger;
            _this.GetEditedData = data;
            if (_this.GetEditedData.Status == true) {
                _this.selectedcountry = _this.GetEditedData.countryid;
                _this.BindLocation();
                _this.selectedlocation = _this.GetEditedData.locationid;
                _this.location = _this.GetEditedData.location;
                _this.BindCity();
                _this.selectedcity = _this.GetEditedData.cityid;
                _this.city = _this.GetEditedData.cityname;
                _this.university = _this.GetEditedData.universityname;
                _this.universityid = _this.GetEditedData.universityid;
            }
        });
    };
    UniversityManager.prototype.DeleteData = function (i, universityid) {
        var _this = this;
        debugger;
        var data;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        debugger;
        data =
            {
                "universityid": universityid
            };
        var body = JSON.stringify(data);
        debugger;
        sweetalert2_1.default.fire({
            text: 'Are you sure to delete this record?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No'
        }).then(function (result) {
            if (result.value) {
                _this.http.post('api/InstituteMaster/DeleteUniversity', body, options).subscribe(function (data) {
                    debugger;
                    _this.DeleteUniversityData = data;
                    if (_this.DeleteUniversityData.Status == true) {
                        _this.GetData();
                        sweetalert2_1.default.fire("", "Deleted Successfully", "success");
                        _this.onClear();
                        return;
                    }
                });
            }
        });
    };
    __decorate([
        core_1.ViewChild('fileInput', { static: true }),
        __metadata("design:type", core_1.ElementRef)
    ], UniversityManager.prototype, "myInputVariableprefile", void 0);
    UniversityManager = __decorate([
        core_1.Component({
            selector: 'app-universitymaster',
            templateUrl: './universitymaster.component.html',
        }),
        __metadata("design:paramtypes", [http_1.HttpClient, router_1.Router, angular_2_local_storage_1.LocalStorageService, ngx_toastr_1.ToastrService, ngx_ui_loader_1.NgxUiLoaderService])
    ], UniversityManager);
    return UniversityManager;
}());
exports.UniversityManager = UniversityManager;
//# sourceMappingURL=universitymaster.component.js.map