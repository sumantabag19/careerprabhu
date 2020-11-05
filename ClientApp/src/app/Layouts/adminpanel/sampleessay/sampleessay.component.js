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
var SampleEssayManager = /** @class */ (function () {
    function SampleEssayManager(http, router, localstorage, toaster, loader, renderer) {
        this.http = http;
        this.router = router;
        this.localstorage = localstorage;
        this.toaster = toaster;
        this.loader = loader;
        this.renderer = renderer;
        this.selectedcountry = 0;
        this.CountryData = [];
        this.university = 0;
        this.UnivData = [];
        this.essaytitle = "";
        this.essaydetail = "";
        this.description = "";
        this.ButtonText = "Save";
        this.GetSaveData = [];
        this.link = "";
        this.SelectedImage = "";
        this.LocationData = [];
        this.UniversityData = [];
        this.Countryids = "";
        this.Locationids = "";
        this.GetUniversityData = [];
        this.GetLocationData = [];
        this.EditSamplePortfolioData = [];
        this.Universityids = "";
        this.Details = [];
        this.sampleessayid = 0;
        this.pdffile = [];
        this.pdftoupload = [];
        this.orgpdfname = "";
        this.sampleessaydata = [];
        this.getsampleessay = [];
        this.EditSampleEssayData = [];
        this.DeleteSampleEssayData = [];
        this.search = "";
    }
    SampleEssayManager.prototype.ngOnInit = function () {
        this.GetData();
        this.GetSavedData();
    };
    SampleEssayManager.prototype.GetPdfDetail = function (event) {
        debugger;
        this.pdffile = event;
        var file = event.target.files[0];
        var fileList = event.target.files;
        this.pdftoupload = fileList[0];
        if (file.type.includes("pdf") || file.type.includes("doc") || file.type.includes("docx")) {
            this.orgpdfname = file.name;
        }
        else {
            sweetalert2_1.default.fire("", "Please Select File", "error");
            this.myInputVariableprefile.nativeElement.value = "";
        }
    };
    SampleEssayManager.prototype.onSave = function () {
        var _this = this;
        if (this.ButtonText == "Save") {
            if (this.Countryids == '') {
                sweetalert2_1.default.fire("", "Please select country", "error");
                return;
            }
            if (this.Locationids == '') {
                sweetalert2_1.default.fire("", "Please select location", "error");
                return;
            }
            if (this.Universityids == '') {
                sweetalert2_1.default.fire("", "Please select university", "error");
                return;
            }
            if (this.essaytitle == "" || this.essaytitle == "") {
                sweetalert2_1.default.fire("", "Please enter essay title", "error");
                return;
            }
            if (this.essaydetail == "" || this.essaydetail == "") {
                sweetalert2_1.default.fire("", "Please enter essay detail", "error");
                return;
            }
            var input = new FormData();
            input.append("sampleessayid", this.sampleessayid.toString());
            input.append("essaydetail", this.essaydetail.toString());
            input.append("essaytitle", this.essaytitle.toString());
            input.append("link", this.link.toString());
            input.append("description", this.description.toString());
            input.append("pdf", this.pdftoupload);
            input.append("orgpdfname", this.orgpdfname.toString());
            input.append("countryid", this.Countryids.toString());
            input.append("locationid", this.Locationids.toString());
            input.append("universityid", this.Universityids.toString());
            input.append("createdby", this.localstorage.get("userid").toString());
            this.http.post('api/SampleEssay/SaveSampleEssayData', input)
                .subscribe(function (data) {
                debugger;
                _this.sampleessaydata = data;
                if (_this.sampleessaydata.length > 10) {
                    sweetalert2_1.default.fire("", "Saved Successfully", "success");
                    _this.onClear();
                    _this.GetSavedData();
                    return;
                }
            });
        }
        else {
            if (this.Countryids == '') {
                sweetalert2_1.default.fire("", "Please select country", "error");
                return;
            }
            if (this.Locationids == '') {
                sweetalert2_1.default.fire("", "Please select location", "error");
                return;
            }
            if (this.Universityids == '') {
                sweetalert2_1.default.fire("", "Please select university", "error");
                return;
            }
            if (this.essaytitle == "" || this.essaytitle == "") {
                sweetalert2_1.default.fire("", "Please enter essay title", "error");
                return;
            }
            if (this.essaydetail == "" || this.essaydetail == "") {
                sweetalert2_1.default.fire("", "Please enter essay detail", "error");
                return;
            }
            var input = new FormData();
            input.append("sampleessayid", this.sampleessayid.toString());
            input.append("essaydetail", this.essaydetail.toString());
            input.append("essaytitle", this.essaytitle.toString());
            input.append("link", this.link.toString());
            input.append("description", this.description.toString());
            input.append("pdf", this.pdftoupload);
            input.append("orgpdfname", this.orgpdfname.toString());
            input.append("countryid", this.Countryids.toString());
            input.append("locationid", this.Locationids.toString());
            input.append("universityid", this.Universityids.toString());
            input.append("createdby", this.localstorage.get("userid").toString());
            this.http.post('api/SampleEssay/UpdateSampleEssayData', input)
                .subscribe(function (data) {
                debugger;
                _this.sampleessaydata = data;
                if (_this.sampleessaydata.length > 10) {
                    sweetalert2_1.default.fire("", "Updated Successfully", "success");
                    _this.onClear();
                    _this.GetSavedData();
                    return;
                }
            });
        }
    };
    SampleEssayManager.prototype.GetSavedData = function () {
        var _this = this;
        debugger;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.http.get('api/SampleEssay/BindSampleEssayData', options).subscribe(function (data) {
            debugger;
            _this.getsampleessay = data;
            //start
            var country;
            var location;
            var university;
            debugger;
            _this.GetSaveData = _this.getsampleessay.data;
            for (var i = 0; i < _this.GetSaveData.length; i++) {
                var countryname = "";
                var locationname = "";
                var universityname = "";
                //for (var j = 0; j < this.GetSaveData[i].State.length; j++) {
                country = _this.GetSaveData[i].countryname.split(",");
                location = _this.GetSaveData[i].location.split(",");
                university = _this.GetSaveData[i].universityname.split(",");
                //}
                //state
                for (var k = 0; k < country.length; k++) {
                    for (var l = 0; l < _this.CountryData.length; l++) {
                        if (country[k] == _this.CountryData[l].countryid) {
                            if (k > 0) {
                                countryname = countryname + ", " + _this.CountryData[l].countryname;
                            }
                            else {
                                countryname = countryname + _this.CountryData[l].countryname;
                            }
                        }
                    }
                }
                //city
                for (var k = 0; k < location.length; k++) {
                    for (var l = 0; l < _this.LocationData.length; l++) {
                        if (location[k] == _this.LocationData[l].locationid) {
                            if (k > 0) {
                                locationname = locationname + ", " + _this.LocationData[l].location;
                            }
                            else {
                                locationname = locationname + _this.LocationData[l].location;
                            }
                        }
                    }
                }
                //school
                for (var k = 0; k < university.length; k++) {
                    for (var l = 0; l < _this.UniversityData.length; l++) {
                        if (university[k] == _this.UniversityData[l].universityid) {
                            if (k > 0) {
                                universityname = universityname + ", " + _this.UniversityData[l].universityname;
                            }
                            else {
                                universityname = universityname + _this.UniversityData[l].universityname;
                            }
                        }
                    }
                }
                _this.GetSaveData[i].countryname = countryname;
                _this.GetSaveData[i].location = locationname;
                _this.GetSaveData[i].universityname = universityname;
            }
            //end
        });
    };
    SampleEssayManager.prototype.onClear = function () {
        this.link = "";
        this.myInputVariableprefile.nativeElement.value = "";
        this.AllCountry = false;
        this.AllLocation = false;
        this.AllUniversity = false;
        this.essaytitle = "";
        this.essaydetail = "";
        this.orgpdfname = "";
        this.ButtonText = "Save";
        this.pdftoupload = [];
        this.description = "";
        this.orgpdfname = "";
        for (var i = 0; i < this.CountryData.length; i++) {
            this.CountryData[i].selected = false;
        }
        for (var i = 0; i < this.LocationData.length; i++) {
            this.LocationData[i].selected = false;
        }
        for (var i = 0; i < this.UniversityData.length; i++) {
            this.UniversityData[i].selected = false;
        }
    };
    SampleEssayManager.prototype.EditData = function (i, sampleessayid) {
        var _this = this;
        debugger;
        this.ButtonText = 'Update';
        var index = i;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.http.get('api/SampleEssay/EditSampleEssay?sampleessayid=' + sampleessayid, options).subscribe(function (data) {
            debugger;
            _this.EditSampleEssayData = data;
            _this.sampleessayid = _this.EditSampleEssayData.data[0].sampleessayid;
            _this.link = _this.EditSampleEssayData.data[0].link;
            _this.essaytitle = _this.EditSampleEssayData.data[0].essaytitle;
            _this.essaydetail = _this.EditSampleEssayData.data[0].essaydetail;
            _this.essaydetail = _this.EditSampleEssayData.data[0].essaydetail;
            _this.description = _this.EditSampleEssayData.data[0].description;
            _this.GetData();
        });
    };
    SampleEssayManager.prototype.DeleteData = function (i, sampleessayid) {
        var _this = this;
        debugger;
        var data;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        data =
            {
                "sampleessayid": sampleessayid
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
                _this.http.post('api/SampleEssay/DeleteSampleEssayData', body, options).subscribe(function (data) {
                    _this.DeleteSampleEssayData = data;
                    if (_this.DeleteSampleEssayData.Status == true) {
                        sweetalert2_1.default.fire("", "Deleted Successfully", "success");
                        _this.GetSavedData();
                        return;
                    }
                });
            }
        });
    };
    //Bind all multi cheeckbox
    SampleEssayManager.prototype.GetData = function () {
        var _this = this;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.http.get('api/SampleEssay/GetData', options).subscribe(function (data) {
            debugger;
            _this.Details = data;
            if (_this.Details.status = true) {
                _this.CountryData = _this.Details.countrydata;
                _this.LocationData = _this.Details.locationdata;
                _this.UniversityData = _this.Details.universitydata;
                // this.GetSavedData();
            }
            else {
                _this.toaster.error(_this.Details.message.toString(), '', { easeTime: 1000, timeOut: 3000 });
            }
            if (_this.EditSampleEssayData.Status == true) {
                _this.Countryids = _this.EditSampleEssayData.data[0].countryid;
                var tmpcountryid = _this.EditSampleEssayData.data[0].countryid.split(",");
                for (var i = 0; i < _this.CountryData.length; i++) {
                    for (var j = 0; j < tmpcountryid.length; j++) {
                        if (_this.CountryData[i].countryid == tmpcountryid[j]) {
                            _this.CountryData[i].selected = true;
                        }
                    }
                }
                if (_this.CountryData.length == tmpcountryid.length) {
                    _this.AllCountry = true;
                }
                else {
                    _this.AllCountry = false;
                }
                _this.OnChnageOfCountryToGetLocation();
            }
            else {
            }
        });
    };
    //get selected all country
    SampleEssayManager.prototype.SelectAllCountry = function () {
        debugger;
        this.Countryids = "";
        if (this.AllCountry === true) {
            for (var i = 0; i < this.CountryData.length; i++) {
                this.CountryData[i].selected = true;
                if (this.Countryids === '') {
                    this.Countryids = this.CountryData[i].countryid;
                }
                else {
                    this.Countryids = this.Countryids + ',' + this.CountryData[i].countryid;
                }
            }
        }
        else {
            for (var i = 0; i < this.CountryData.length; i++) {
                this.CountryData[i].selected = false;
            }
        }
    };
    //get perticular selected country
    SampleEssayManager.prototype.getSelectedCountry = function () {
        this.Countryids = "";
        var count = 0;
        for (var i = 0; i < this.CountryData.length; i++) {
            if (this.CountryData[i].selected === true) {
                if (this.Countryids === '') {
                    this.Countryids = this.CountryData[i].countryid;
                    count++;
                }
                else {
                    this.Countryids = this.Countryids + ',' + this.CountryData[i].countryid;
                    count++;
                }
            }
        }
        if (this.CountryData.length === count) {
            this.AllCountry = true;
        }
        else {
            this.AllCountry = false;
        }
    };
    //get all selected location
    SampleEssayManager.prototype.SelectAllLocation = function () {
        debugger;
        this.Locationids = "";
        if (this.AllLocation === true) {
            for (var i = 0; i < this.LocationData.length; i++) {
                this.LocationData[i].selected = true;
                if (this.Locationids === '') {
                    this.Locationids = this.LocationData[i].locationid;
                }
                else {
                    this.Locationids = this.Locationids + ',' + this.LocationData[i].locationid;
                }
            }
        }
        else {
            for (var i = 0; i < this.LocationData.length; i++) {
                this.LocationData[i].selected = false;
            }
        }
    };
    //get perticular selected location
    SampleEssayManager.prototype.getSelectedLocation = function () {
        this.Locationids = "";
        var count = 0;
        for (var i = 0; i < this.LocationData.length; i++) {
            if (this.LocationData[i].selected === true) {
                if (this.Locationids === '') {
                    this.Locationids = this.LocationData[i].locationid;
                    count++;
                }
                else {
                    this.Locationids = this.Locationids + ',' + this.LocationData[i].locationid;
                    count++;
                }
            }
        }
        if (this.LocationData.length === count) {
            this.AllLocation = true;
        }
        else {
            this.AllLocation = false;
        }
    };
    //get all selected university
    SampleEssayManager.prototype.SelectAllUniversity = function () {
        debugger;
        this.Universityids = "";
        if (this.AllUniversity === true) {
            for (var i = 0; i < this.UniversityData.length; i++) {
                this.UniversityData[i].selected = true;
                if (this.Universityids === '') {
                    this.Universityids = this.UniversityData[i].universityid;
                }
                else {
                    this.Universityids = this.Universityids + ',' + this.UniversityData[i].universityid;
                }
            }
        }
        else {
            for (var i = 0; i < this.UniversityData.length; i++) {
                this.UniversityData[i].selected = false;
            }
        }
    };
    //get perticular selected location
    SampleEssayManager.prototype.getSelectedUniversity = function () {
        this.Universityids = "";
        var count = 0;
        for (var i = 0; i < this.UniversityData.length; i++) {
            if (this.UniversityData[i].selected === true) {
                if (this.Universityids === '') {
                    this.Universityids = this.UniversityData[i].universityid;
                    count++;
                }
                else {
                    this.Universityids = this.Universityids + ',' + this.UniversityData[i].universityid;
                    count++;
                }
            }
        }
        if (this.UniversityData.length === count) {
            this.AllUniversity = true;
        }
        else {
            this.AllUniversity = false;
        }
    };
    //on change of country to get location
    SampleEssayManager.prototype.OnChnageOfCountryToGetLocation = function () {
        var _this = this;
        debugger;
        if (this.Countryids == null) {
            this.Countryids = "";
        }
        if (this.Locationids == null) {
            this.Locationids = "";
        }
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.http.get('api/SamplePortfolio/GetCountryFilter?countryid=' + this.Countryids, options).subscribe(function (data) {
            _this.GetLocationData = data;
            if (_this.GetLocationData.Status == true) {
                _this.LocationData = _this.GetLocationData.locationdata;
            }
            if (_this.EditSampleEssayData.Status == true) {
                _this.Locationids = _this.EditSampleEssayData.data[0].locationid;
                var tmplocationid = _this.EditSampleEssayData.data[0].locationid.split(",");
                for (var i = 0; i < _this.LocationData.length; i++) {
                    for (var j = 0; j < tmplocationid.length; j++) {
                        if (_this.LocationData[i].locationid == tmplocationid[j]) {
                            _this.LocationData[i].selected = true;
                        }
                    }
                }
                if (_this.LocationData.length == tmplocationid.length) {
                    _this.AllLocation = true;
                }
                else {
                    _this.AllLocation = false;
                }
                _this.OnChangeOfCountryToGetUniv();
            }
            else {
            }
        }, function (err) {
        });
    };
    //on change of location to get university
    SampleEssayManager.prototype.OnChangeOfCountryToGetUniv = function () {
        var _this = this;
        debugger;
        if (this.Countryids == null) {
            this.Countryids = "";
        }
        if (this.Locationids == null) {
            this.Locationids = "";
        }
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.http.get('api/SamplePortfolio/GetUniversityFilter?countryid=' + this.Countryids + '&locationid=' + this.Locationids, options).subscribe(function (data) {
            debugger;
            _this.GetUniversityData = data;
            if (_this.GetUniversityData.Status == true) {
                _this.UniversityData = _this.GetUniversityData.universitydata;
            }
            else {
                _this.UniversityData = [];
            }
            if (_this.GetLocationData.Status == true) {
                _this.LocationData = _this.GetLocationData.locationdata;
            }
            else {
                _this.LocationData = [];
            }
            if (_this.EditSampleEssayData.Status == true) {
                _this.Universityids = _this.EditSampleEssayData.data[0].universityid;
                var tmpuniversityid = _this.EditSampleEssayData.data[0].universityid.split(",");
                for (var i = 0; i < _this.UniversityData.length; i++) {
                    for (var j = 0; j < tmpuniversityid.length; j++) {
                        if (_this.UniversityData[i].universityid == tmpuniversityid[j]) {
                            _this.UniversityData[i].selected = true;
                        }
                    }
                }
                if (_this.UniversityData.length == tmpuniversityid.length) {
                    _this.AllUniversity = true;
                }
                else {
                    _this.AllUniversity = false;
                }
            }
            else {
            }
        }, function (err) {
        });
    };
    __decorate([
        core_1.ViewChild('inputfile', { static: true }),
        __metadata("design:type", core_1.ElementRef)
    ], SampleEssayManager.prototype, "myInputVariableprefile", void 0);
    SampleEssayManager = __decorate([
        core_1.Component({
            selector: 'app-sampleessay',
            templateUrl: './sampleessay.component.html',
        }),
        __metadata("design:paramtypes", [http_1.HttpClient, router_1.Router, angular_2_local_storage_1.LocalStorageService, ngx_toastr_1.ToastrService, ngx_ui_loader_1.NgxUiLoaderService, core_1.Renderer2])
    ], SampleEssayManager);
    return SampleEssayManager;
}());
exports.SampleEssayManager = SampleEssayManager;
//# sourceMappingURL=sampleessay.component.js.map