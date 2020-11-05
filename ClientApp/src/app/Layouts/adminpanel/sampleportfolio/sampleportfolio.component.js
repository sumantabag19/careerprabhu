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
var SamplePortfolioManager = /** @class */ (function () {
    function SamplePortfolioManager(http, router, localstorage, toaster, loader) {
        this.http = http;
        this.router = router;
        this.localstorage = localstorage;
        this.toaster = toaster;
        this.loader = loader;
        this.SelectedTrait = 0;
        this.guideline = "";
        this.link = "";
        this.SelectedFile = "";
        this.CountryData = [];
        this.UniversityData = [];
        this.GetSaveData = [];
        this.ButtonText = "Save";
        this.TraitData = [];
        this.TraitDetails = [];
        this.pdffile = [];
        this.orgpdfname = "";
        this.GetAllCheckboxData = [];
        this.Details = [];
        this.Countryids = "";
        this.Locationids = "";
        this.Universityids = "";
        this.GetLocationData = [];
        this.GetUniversityData = [];
        this.sampleportfolioid = 0;
        this.sampleportfoliodata = [];
        this.getsample = [];
        this.EditSamplePortfolioData = [];
        this.DeleteSamplePortfolioData = [];
        this.checklink = false;
        this.CountryDetails = [];
        this.selectedcountry = 0;
        this.locdata = [];
        this.location = 0;
        this.citdata = [];
        this.city = 0;
        this.univdata = [];
        this.univercity = 0;
        this.CityData = [];
        this.description = "";
        this.subtrait = "";
        this.search = "";
        this.selectedlanguage = 0;
        this.languagedata = [];
        this.languagedatadetail = [];
    }
    SamplePortfolioManager.prototype.ngOnInit = function () {
        this.BindTrait();
        this.getCountry();
        this.GetSavedData();
        this.getLanguage();
    };
    SamplePortfolioManager.prototype.getLanguage = function () {
        var _this = this;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        var a;
        var tmpclass = [];
        this.http.get('api/SamplePortfolio/bindlanguage', options).subscribe(function (data) {
            debugger;
            _this.languagedatadetail = data;
            if (_this.languagedatadetail.Status == true) {
                _this.languagedata = _this.languagedatadetail.data;
            }
        });
    };
    //Bind Trait
    SamplePortfolioManager.prototype.BindTrait = function () {
        var _this = this;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.TraitDetails = [];
        var a;
        var tmpclass = [];
        this.http.get('api/SamplePortfolio/BindTrait', options).subscribe(function (data) {
            _this.TraitDetails = data;
            if (_this.TraitDetails.Status == true) {
                _this.TraitData = _this.TraitDetails.data;
            }
        });
    };
    //get file detail
    SamplePortfolioManager.prototype.GetPdfDetail = function (event) {
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
    SamplePortfolioManager.prototype.getCountry = function () {
        var _this = this;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.CountryDetails = [];
        var a;
        var tmpclass = [];
        this.http.get('api/SamplePortfolio/Bindcountry', options).subscribe(function (data) {
            debugger;
            _this.CountryDetails = data;
            _this.CountryData = _this.CountryDetails;
        });
    };
    SamplePortfolioManager.prototype.BindLocation = function () {
        var _this = this;
        debugger;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.locdata = [];
        var body = {
            "countryid": this.selectedcountry
        };
        var tmpclass = [];
        this.http.post('api/SamplePortfolio/BindLocation', body, options).subscribe(function (data) {
            debugger;
            _this.locdata = data;
            if (_this.locdata.Status == true) {
                _this.LocationData = _this.locdata.data;
            }
            else {
                _this.LocationData = _this.locdata.data;
            }
        });
    };
    SamplePortfolioManager.prototype.BindCity = function () {
        var _this = this;
        debugger;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        var body = {
            "countryid": this.selectedcountry,
            "locationid": this.location
        };
        var tmpclass = [];
        this.http.post('api/SamplePortfolio/BindCity', body, options).subscribe(function (data) {
            _this.citdata = data;
            if (_this.citdata.Status == true) {
                _this.CityData = _this.citdata.data;
            }
            else {
                _this.CityData = _this.citdata.data;
            }
        });
    };
    SamplePortfolioManager.prototype.BindUniversity = function () {
        var _this = this;
        debugger;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.univdata = [];
        var body = {
            "countryid": this.selectedcountry,
            "locationid": this.location,
            "cityid": this.city
        };
        var tmpclass = [];
        this.http.post('api/SamplePortfolio/BindUniversity', body, options).subscribe(function (data) {
            _this.univdata = data;
            if (_this.univdata.Status == true) {
                _this.UniversityData = _this.univdata.data;
            }
            else {
                _this.UniversityData = _this.univdata.data;
            }
        });
    };
    //save and update data
    SamplePortfolioManager.prototype.onSubmit = function () {
        var _this = this;
        if (this.ButtonText == "Save") {
            if (this.SelectedTrait == 0 || this.SelectedTrait == undefined) {
                sweetalert2_1.default.fire("", "Please select trait", "error");
                return;
            }
            if (this.guideline == "" || this.guideline == undefined) {
                sweetalert2_1.default.fire("", "Please enter guideline", "error");
                return;
            }
            if (this.link == "" || this.link == undefined) {
                this.link == "";
            }
            if (this.orgpdfname == "" || this.orgpdfname == undefined) {
                this.orgpdfname == "";
            }
            if (this.description == "" && this.description == undefined) {
                sweetalert2_1.default.fire("", "Please enter description", "error");
                return;
            }
            if (this.subtrait == "" && this.subtrait == undefined) {
                sweetalert2_1.default.fire("", "Please enter subtrait", "error");
                return;
            }
            if (this.selectedcountry == 0 && this.selectedcountry == undefined) {
                sweetalert2_1.default.fire("", "Please select country", "error");
                return;
            }
            if (this.location == 0 && this.location == undefined) {
                sweetalert2_1.default.fire("", "Please select location", "error");
                return;
            }
            if (this.city == 0 && this.city == undefined) {
                sweetalert2_1.default.fire("", "Please select city", "error");
                return;
            }
            if (this.univercity == 0 && this.univercity == undefined) {
                sweetalert2_1.default.fire("", "Please select university", "error");
                return;
            }
            var input = new FormData();
            input.append("sampleportfolioid", this.sampleportfolioid.toString());
            input.append("traitid", this.SelectedTrait.toString());
            input.append("subtrait", this.subtrait.toString());
            input.append("guideline", this.guideline.toString());
            input.append("description", this.description.toString());
            input.append("languageid", this.selectedlanguage.toString());
            input.append("link", this.link.toString());
            input.append("pdf", this.pdftoupload);
            input.append("orgpdfname", this.orgpdfname.toString());
            input.append("countryid", this.selectedcountry.toString());
            input.append("locationid", this.location.toString());
            input.append("universityid", this.univercity.toString());
            input.append("cityid", this.city.toString());
            input.append("createdby", this.localstorage.get("userid").toString());
            this.http.post('api/SamplePortfolio/SaveSamplePortfolioData', input)
                .subscribe(function (data) {
                debugger;
                _this.sampleportfoliodata = data;
                if (_this.sampleportfoliodata.Status == true) {
                    if (_this.sampleportfoliodata.Message == "Subtrait Already Exists") {
                        sweetalert2_1.default.fire("", "Subtrait Already Exists", "success");
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
            if (this.SelectedTrait == 0 || this.SelectedTrait == undefined) {
                sweetalert2_1.default.fire("", "Please select trait", "error");
                return;
            }
            if (this.guideline == "" || this.guideline == undefined) {
                sweetalert2_1.default.fire("", "Please enter guideline", "error");
                return;
            }
            if (this.link == "" || this.link == undefined) {
                this.link == "";
            }
            if (this.orgpdfname == "" || this.orgpdfname == undefined) {
                this.orgpdfname == "";
            }
            if (this.description == "" && this.description == undefined) {
                sweetalert2_1.default.fire("", "Please enter description", "error");
                return;
            }
            if (this.subtrait == "" && this.subtrait == undefined) {
                sweetalert2_1.default.fire("", "Please enter subtrait", "error");
                return;
            }
            if (this.selectedcountry == 0 && this.selectedcountry == undefined) {
                sweetalert2_1.default.fire("", "Please select country", "error");
                return;
            }
            if (this.location == 0 && this.location == undefined) {
                sweetalert2_1.default.fire("", "Please select location", "error");
                return;
            }
            if (this.city == 0 && this.city == undefined) {
                sweetalert2_1.default.fire("", "Please select city", "error");
                return;
            }
            if (this.univercity == 0 && this.univercity == undefined) {
                sweetalert2_1.default.fire("", "Please select university", "error");
                return;
            }
            var input = new FormData();
            input.append("sampleportfolioid", this.sampleportfolioid.toString());
            input.append("traitid", this.SelectedTrait.toString());
            input.append("subtrait", this.subtrait.toString());
            input.append("guideline", this.guideline.toString());
            input.append("description", this.description.toString());
            input.append("link", this.link.toString());
            input.append("pdf", this.pdftoupload);
            input.append("orgpdfname", this.orgpdfname.toString());
            input.append("countryid", this.selectedcountry.toString());
            input.append("locationid", this.location.toString());
            input.append("universityid", this.univercity.toString());
            input.append("cityid", this.city.toString());
            input.append("languageid", this.selectedlanguage.toString());
            input.append("createdby", this.localstorage.get("userid").toString());
            this.http.post('api/SamplePortfolio/UpdateSamplePortfolioData', input)
                .subscribe(function (data) {
                debugger;
                _this.sampleportfoliodata = data;
                if (_this.sampleportfoliodata.Status == true) {
                    if (_this.sampleportfoliodata.Message == "Subtrait Already Exists") {
                        sweetalert2_1.default.fire("", "Subtrait Already Exists", "success");
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
    //get data for display
    SamplePortfolioManager.prototype.GetSavedData = function () {
        var _this = this;
        debugger;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.http.get('api/SamplePortfolio/BindSamplePortfolioData', options).subscribe(function (data) {
            debugger;
            _this.getsample = data;
            _this.GetSaveData = _this.getsample.data;
        });
    };
    SamplePortfolioManager.prototype.onClear = function () {
        this.ButtonText = "Save";
        this.SelectedTrait = 0;
        this.guideline = "";
        this.link = "";
        this.myInputVariableprefile.nativeElement.value = "";
        this.SelectedFile = "";
        this.orgpdfname = "";
        this.pdftoupload = [];
        this.selectedlanguage = 0;
        this.orgpdfname = "";
        this.description = "";
        this.selectedcountry = 0;
        this.location = 0;
        this.city = 0;
        this.univercity = 0;
        this.subtrait = "";
    };
    //edit data
    SamplePortfolioManager.prototype.EditData = function (i, sampleportfolioid) {
        var _this = this;
        debugger;
        this.getLanguage();
        this.ButtonText = 'Update';
        var index = i;
        var SubscriptionId = SubscriptionId;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.http.get('api/SamplePortfolio/EditSamplePortfolio?sampleportfolioid=' + sampleportfolioid, options).subscribe(function (data) {
            debugger;
            _this.EditSamplePortfolioData = data;
            _this.sampleportfolioid = _this.EditSamplePortfolioData.data[0].sampleportfolioid;
            _this.link = _this.EditSamplePortfolioData.data[0].link;
            _this.BindTrait();
            _this.SelectedTrait = _this.EditSamplePortfolioData.data[0].traitid;
            _this.getCountry();
            _this.selectedcountry = _this.EditSamplePortfolioData.data[0].countryid;
            _this.BindLocation();
            _this.location = _this.EditSamplePortfolioData.data[0].locationid;
            _this.BindCity();
            _this.city = _this.EditSamplePortfolioData.data[0].cityid;
            _this.BindUniversity();
            _this.univercity = _this.EditSamplePortfolioData.data[0].universityid;
            _this.guideline = _this.EditSamplePortfolioData.data[0].guideline;
            _this.subtrait = _this.EditSamplePortfolioData.data[0].subtrait;
            _this.description = _this.EditSamplePortfolioData.data[0].description;
            _this.selectedlanguage = _this.EditSamplePortfolioData.data[0].languageid;
        });
    };
    //delete sample portfolio data
    SamplePortfolioManager.prototype.DeleteData = function (i, sampleportfolioid) {
        var _this = this;
        var data;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        data =
            {
                "sampleportfolioid": sampleportfolioid
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
                _this.http.post('api/SamplePortfolio/DeleteSamplePortfolioData', body, options).subscribe(function (data) {
                    _this.DeleteSamplePortfolioData = data;
                    if (_this.DeleteSamplePortfolioData.Status == true) {
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
    ], SamplePortfolioManager.prototype, "myInputVariableprefile", void 0);
    SamplePortfolioManager = __decorate([
        core_1.Component({
            selector: 'app-sampleportfolio',
            templateUrl: './sampleportfolio.component.html',
        }),
        __metadata("design:paramtypes", [http_1.HttpClient, router_1.Router, angular_2_local_storage_1.LocalStorageService, ngx_toastr_1.ToastrService, ngx_ui_loader_1.NgxUiLoaderService])
    ], SamplePortfolioManager);
    return SamplePortfolioManager;
}());
exports.SamplePortfolioManager = SamplePortfolioManager;
//# sourceMappingURL=sampleportfolio.component.js.map