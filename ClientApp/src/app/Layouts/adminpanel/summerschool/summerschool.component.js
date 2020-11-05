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
//import * as $ from 'jquery';
//@Pipe({
//  name: 'safe'
//})
//export class SafePipeHtml implements PipeTransform {
//  constructor(protected sanitizer: DomSanitizer) { }
//  public transform(value: any, type: string): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
//    console.log(`Pipe Called!`);
//    switch (type) {
//      case 'html': return this.sanitizer.bypassSecurityTrustHtml(value);
//      case 'style': return this.sanitizer.bypassSecurityTrustStyle(value);
//      case 'script': return this.sanitizer.bypassSecurityTrustScript(value);
//      case 'url': return this.sanitizer.bypassSecurityTrustUrl(value);
//      case 'resourceUrl': return this.sanitizer.bypassSecurityTrustResourceUrl(value);
//      default: throw new Error(`Invalid safe type specified: ${type}`);
//    }
//  }
//}
var SummerSchoolManager = /** @class */ (function () {
    function SummerSchoolManager(http, router, localstorage, toaster, loader, config1) {
        this.http = http;
        this.router = router;
        this.localstorage = localstorage;
        this.toaster = toaster;
        this.loader = loader;
        this.config1 = config1;
        //public page: number = 0;
        //public pageSize: number = 10;
        this.selectedarea = 0;
        this.AreaDetails = [];
        this.search = "";
        this.selectedcountry = 0;
        this.CountryDetails = [];
        this.location = 0;
        this.univercity = 0;
        this.selectedtopic = 0;
        this.TopicDetails = [];
        this.description = "";
        this.fees = "";
        this.duration = "";
        this.link = "";
        this.applicationlink = "";
        this.ButtonText = "Save";
        this.summerschoolData = [];
        this.Detail = [];
        this.GetSaveData = [];
        this.HeaderData = [];
        this.GetEditedData = [];
        this.SummerSchoolDetails = [];
        this.schoolid = 0;
        this.url = "";
        this.intrestid = "";
        this.AllIntrest = false;
        this.locdata = [];
        this.LocationData = [];
        this.univdata = [];
        this.UniversityData = [];
        this.CurrencyData = [];
        this.CurrencyDetails = [];
        this.selectedcurrency = 0;
        this.city = 0;
        this.citdata = [];
        this.Durationdata = [];
        this.CityData = [];
        this.SelectedImage = [];
        this.excelfile = [];
        this.arrayBuffer = [];
        this.exceldata = [];
        this.GetData1 = [];
        this.dw = "";
        this.selectedinterest = 0;
        var current = new Date();
        config1.minDate = {
            year: current.getFullYear(), month: current.getMonth() + 1, day: current.getDate()
        };
        //config.maxDate = { year: 2099, month: 12, day: 31 };
        config1.outsideDays = 'hidden';
    }
    SummerSchoolManager.prototype.ngOnInit = function () {
        this.getArea();
        this.getCountry();
        this.getTopic();
        this.GetData();
        this.BindCurrency();
        this.dw = "http://admin.careerprabhu.com/summerschool.xlsx";
    };
    SummerSchoolManager.prototype.incomingfile = function (event) {
        this.excelfile = event.target.files[0];
        //if (!this.excelfile.type.includes(".sheet")) {
        //  this.toaster.warning("Please upload only Excel files.", '', { easeTime: 1000, timeOut: 3000 });
        //  var $el = $('#UploadedFile');
        //  $el.wrap('<form>').closest('form').get(0).reset();
        //  $el.unwrap();
        //  this.excelfile = null;
        //}
    };
    SummerSchoolManager.prototype.Uploadexcel = function () {
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
    SummerSchoolManager.prototype.ValidateExcel = function (Data) {
        var _this = this;
        var Validate = true;
        var cols = ["country", "state", "city", "university", "interest", "topic", "link", "applicationlink", "currency", "fees", "description", "duration"];
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
            this.http.post('api/summerschool/Upload', body, options).subscribe(function (data) {
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
    SummerSchoolManager.prototype.CalculateDuration = function () {
        var _this = this;
        debugger;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.CurrencyDetails = [];
        this.sc_date = this.SelectedStartDate.toISOString().slice(0, 10);
        this.ec_date = this.SelectedEndDate.toISOString().slice(0, 10);
        var body = {
            "startdate": this.sc_date.toString(),
            "enddate": this.ec_date.toString()
        };
        this.http.post('api/summerschool/CalculateDuration', body, options).subscribe(function (data) {
            debugger;
            var re = /-/gi;
            _this.Durationdata = data;
            //this.duration = this.Durationdata[0].diff;
            _this.duration = _this.Durationdata[0].diff.toString().replace(re, "");
        });
    };
    SummerSchoolManager.prototype.BindCurrency = function () {
        var _this = this;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.CurrencyDetails = [];
        this.http.get('api/summerschool/Bindcurrency', options).subscribe(function (data) {
            debugger;
            _this.CurrencyDetails = data;
            _this.CurrencyData = _this.CurrencyDetails;
        });
    };
    SummerSchoolManager.prototype.BindCity = function () {
        var _this = this;
        debugger;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.locdata = [];
        var body = {
            "countryid": this.selectedcountry,
            "locationid": this.location
        };
        var tmpclass = [];
        this.http.post('api/summerschool/BindCity', body, options).subscribe(function (data) {
            _this.citdata = data;
            if (_this.citdata.Status == true) {
                _this.CityData = _this.citdata.data;
            }
            else {
                _this.CityData = _this.citdata.data;
            }
            //if (this.GetEditedData.Status == true) {
            //    this.location = this.GetEditedData.location;
            //}
        });
    };
    SummerSchoolManager.prototype.getArea = function () {
        var _this = this;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.AreaDetails = [];
        var a;
        var tmpclass = [];
        this.http.get('api/summerschool/Bindintrestarea', options).subscribe(function (data) {
            debugger;
            _this.AreaDetails = data;
            _this.AreaData = _this.AreaDetails;
        });
    };
    SummerSchoolManager.prototype.getCountry = function () {
        var _this = this;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.CountryDetails = [];
        var a;
        var tmpclass = [];
        this.http.get('api/summerschool/Bindcountry', options).subscribe(function (data) {
            debugger;
            _this.CountryDetails = data;
            _this.CountryData = _this.CountryDetails;
        });
    };
    SummerSchoolManager.prototype.getTopic = function () {
        var _this = this;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.TopicDetails = [];
        var a;
        var tmpclass = [];
        this.http.get('api/summerschool/BindTopic', options).subscribe(function (data) {
            _this.TopicDetails = data;
            _this.TopicData = _this.TopicDetails;
        });
    };
    SummerSchoolManager.prototype.BindLocation = function () {
        var _this = this;
        debugger;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.locdata = [];
        var body = {
            "countryid": this.selectedcountry
        };
        var tmpclass = [];
        this.http.post('api/summerschool/BindLocation', body, options).subscribe(function (data) {
            _this.locdata = data;
            if (_this.locdata.Status == true) {
                _this.LocationData = _this.locdata.data;
            }
            else {
                _this.LocationData = _this.locdata.data;
            }
            //if (this.GetEditedData.Status == true) {
            //    this.location = this.GetEditedData.location;
            //}
        });
    };
    SummerSchoolManager.prototype.BindUniversity = function () {
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
        this.http.post('api/summerschool/BindUniversity', body, options).subscribe(function (data) {
            _this.univdata = data;
            if (_this.univdata.Status == true) {
                _this.UniversityData = _this.univdata.data;
            }
            else {
                _this.UniversityData = _this.univdata.data;
            }
            //if (this.GetEditedData.Status == true) {
            //    this.univercity = this.GetEditedData.univercityname;
            //}
        });
    };
    //save summer school detail
    SummerSchoolManager.prototype.onSave = function () {
        var _this = this;
        debugger;
        if (this.selectedinterest == 0 || this.selectedinterest == undefined) {
            sweetalert2_1.default.fire("", "Please select intrest area", "error");
            return;
        }
        if (this.selectedcountry == 0 || this.selectedcountry == undefined) {
            sweetalert2_1.default.fire("", "Please select country", "error");
            return;
        }
        if (this.location == 0 || this.location == undefined) {
            sweetalert2_1.default.fire("", "Please select location", "error");
            return;
        }
        if (this.city == 0 || this.city == undefined) {
            sweetalert2_1.default.fire("", "Please select city", "error");
            return;
        }
        if (this.univercity == 0 || this.univercity == undefined) {
            sweetalert2_1.default.fire("", "Please select university", "error");
            return;
        }
        if (this.selectedtopic == 0 || this.selectedtopic == undefined) {
            sweetalert2_1.default.fire("", "Please select topic", "error");
            return;
        }
        if (this.description == "" || this.description == undefined) {
            sweetalert2_1.default.fire("", "Please enter description", "error");
            return;
        }
        if (this.selectedcurrency == 0 || this.selectedcurrency == undefined) {
            sweetalert2_1.default.fire("", "Please select currency", "error");
            return;
        }
        if (this.fees == "" || this.fees == undefined) {
            sweetalert2_1.default.fire("", "Please enter fees", "error");
            return;
        }
        if (this.fees.match("^[a-zA-Z]*$")) {
            sweetalert2_1.default.fire("", "Fees contains only integer", "error");
            return;
        }
        if (this.duration == "" || this.duration == undefined) {
            sweetalert2_1.default.fire("", "Please enter duration", "error");
            return;
        }
        if (this.duration.toString().match(/^[0-9]*$/)) {
        }
        else {
            sweetalert2_1.default.fire("", "Duration should not contain alphabet", "error");
            return;
        }
        if (this.link == "" || this.link == undefined) {
            sweetalert2_1.default.fire("", "Please enter link", "error");
            return;
        }
        if (this.applicationlink == "" || this.applicationlink == undefined) {
            sweetalert2_1.default.fire("", "Please enter application link", "error");
            return;
        }
        if (this.SelectedStartDate == null || this.SelectedStartDate == undefined) {
            this.SelectedStartDate = null;
        }
        if (this.SelectedEndDate == null || this.SelectedEndDate == undefined) {
            this.SelectedEndDate == null;
        }
        if (this.SelectedEndDate == null) {
            this.s_date = "";
            this.e_date = "";
        }
        else {
            this.s_date = this.SelectedStartDate.toISOString().slice(0, 10);
            this.e_date = this.SelectedEndDate.toISOString().slice(0, 10);
            this.todaydate = new Date().toISOString().slice(0, 10);
            if (this.s_date < this.todaydate) {
                sweetalert2_1.default.fire("", "Start date should contains future date", "error");
                return;
            }
            if (this.e_date < this.todaydate) {
                sweetalert2_1.default.fire("", "End date should contain future date", "error");
                return;
            }
            if (this.s_date > this.e_date) {
                sweetalert2_1.default.fire("", "Start date should always less then end date", "error");
                return;
            }
        }
        var data;
        if (this.ButtonText == "Save") {
            var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
            var options = { headers: headers };
            data =
                {
                    "schoolid": 0,
                    "repositoryid": this.selectedinterest,
                    "countryid": this.selectedcountry,
                    "location": this.location,
                    "cityid": this.city,
                    "univercity": this.univercity,
                    "ID": this.selectedtopic,
                    "description": this.description,
                    "currency": this.selectedcurrency,
                    "fees": this.fees,
                    "duration": this.duration,
                    "link": this.link,
                    "applicationlink": this.applicationlink,
                    "startdate": this.s_date.toString(),
                    "enddate": this.e_date.toString(),
                    "updatedby": parseInt(this.localstorage.get("userid")),
                    "createdby": parseInt(this.localstorage.get("userid"))
                };
            var body = JSON.stringify(data);
            this.http.post('api/summerschool/SaveSummerSchool', body, options).subscribe(function (data) {
                _this.summerschoolData = data;
                if (_this.summerschoolData.Status == true) {
                    sweetalert2_1.default.fire("", "Saved Successfully", "success");
                    _this.onClear();
                    _this.GetData();
                    return;
                }
            });
        }
        else {
            debugger;
            var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
            var options = { headers: headers };
            data =
                {
                    "schoolid": this.GetEditedData.schoolid,
                    "repositoryid": this.selectedinterest,
                    "countryid": this.selectedcountry,
                    "location": this.location,
                    "cityid": this.city,
                    "univercity": this.univercity,
                    "ID": this.selectedtopic,
                    "description": this.description,
                    "currency": this.selectedcurrency,
                    "fees": this.fees,
                    "duration": this.duration,
                    "link": this.link,
                    "applicationlink": this.applicationlink,
                    "startdate": this.s_date.toString(),
                    "enddate": this.e_date.toString(),
                    "updatedby": parseInt(this.localstorage.get("userid")),
                    "createdby": parseInt(this.localstorage.get("userid"))
                };
            var body = JSON.stringify(data);
            this.http.post('api/summerschool/UpdateSummerSchool', body, options).subscribe(function (data) {
                _this.summerschoolData = data;
                if (_this.summerschoolData.Status == true) {
                    sweetalert2_1.default.fire("", "Updated Successfully", "success");
                    _this.onClear();
                    _this.GetData();
                    return;
                }
            });
        }
    };
    //reset data
    SummerSchoolManager.prototype.onClear = function () {
        this.selectedcurrency = 0;
        this.selectedarea = 0;
        this.selectedcountry = 0;
        this.selectedtopic = 0;
        this.location = 0;
        this.univercity = 0;
        this.city = 0;
        this.description = "";
        this.fees = "";
        this.duration = "";
        this.link = "";
        this.applicationlink = "";
        this.selectedinterest = 0;
        this.SelectedStartDate = null;
        this.SelectedEndDate = null;
        this.AllIntrest = false;
        for (var i = 0; i < this.AreaData.length; i++) {
            this.AreaData[i].selected = false;
        }
        for (var i = 0; i < this.AreaData.length; i++) {
            this.AreaData[i].selected = false;
        }
        this.ButtonText = "Save";
    };
    //get data (table bind)
    SummerSchoolManager.prototype.GetData = function () {
        var _this = this;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.Detail = [];
        this.http.get('api/summerschool/getSummerSchoolData', options).subscribe(function (data) {
            debugger;
            _this.Detail = data;
            _this.GetSaveData = _this.Detail.data;
            _this.startdate = _this.GetSaveData[0].startdate.slice(0, -6);
            _this.enddate = _this.GetSaveData[0].enddate.slice(0, -6);
            //var a;
            //var b;
            //debugger;
            ////this.GetSaveData = data;
            //for (var i = 0; i < this.GetSaveData.length; i++) {
            //    var repositoryname = "";
            //  a = [];
            //    for (var j = 0; j < this.GetSaveData[i].repositoryid.length; j++) {
            //        a = this.GetSaveData[i].repositoryid.split(",");
            //    }
            //    for (var k = 0; k < a.length; k++) {
            //        for (var l = 0; l < this.AreaData.length; l++) {
            //            if (a[k] == this.AreaData[l].repositoryid) {
            //                if (k > 0) {
            //                    repositoryname = repositoryname + ", " + this.AreaData[l].repositoryname;
            //                }
            //                else {
            //                    repositoryname = repositoryname + this.AreaData[l].repositoryname;
            //                }
            //            }
            //        }
            //    }
            //    this.GetSaveData[i].repositoryid = repositoryname;
            //}
            _this.HeaderData = Object.keys(_this.GetSaveData[0]);
        });
    };
    //for Edit Data
    SummerSchoolManager.prototype.EditData = function (i, schoolid) {
        var _this = this;
        debugger;
        this.getArea();
        this.getCountry();
        this.getTopic();
        this.BindCurrency();
        this.ButtonText = 'Update';
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.http.get('api/summerschool/EditSummerSchoolData?schoolid=' + schoolid, options).subscribe(function (data) {
            debugger;
            _this.GetEditedData = data;
            if (_this.GetEditedData.Status == true) {
                //this.selectedarea = this.GetEditedData.repositoryid;
                _this.selectedinterest = _this.GetEditedData.repositoryid;
                //  var tmpClassId = this.GetEditedData.repositoryid.split(",");
                //  for (var i = 0; i < this.AreaData.length; i++) {
                //      for (var j = 0; j < tmpClassId.length; j++) {
                //          if (this.AreaData[i].repositoryid == tmpClassId[j]) {
                //              this.AreaData[i].selected = true;
                //          }
                //      }
                //  }
                //  if (this.AreaData.length == tmpClassId.length) {
                //      this.AllIntrest = true;
                //}
                if (_this.GetEditedData.startdate == "0000-00-00" || _this.GetEditedData.startdate == "") {
                    _this.SelectedStartDate = null;
                }
                else {
                    var mdate = new Date(_this.GetEditedData.startdate);
                    _this.SelectedStartDate = mdate;
                }
                if (_this.GetEditedData.enddate == "0000-00-00" || _this.GetEditedData.enddate == "") {
                    _this.SelectedEndDate = null;
                }
                else {
                    var edate = new Date(_this.GetEditedData.enddate);
                    _this.SelectedEndDate = edate;
                }
                // var edate = new Date(this.GetEditedData.enddate);
                _this.selectedtopic = _this.GetEditedData.topicid;
                _this.selectedcountry = _this.GetEditedData.countryid;
                _this.BindLocation();
                _this.location = _this.GetEditedData.location;
                _this.BindCity();
                _this.city = _this.GetEditedData.cityid;
                _this.BindUniversity();
                _this.univercity = _this.GetEditedData.univercityname;
                _this.description = _this.GetEditedData.description;
                _this.fees = _this.GetEditedData.fees;
                _this.duration = _this.GetEditedData.duration;
                _this.link = _this.GetEditedData.link;
                _this.applicationlink = _this.GetEditedData.applicationlink;
                _this.selectedcurrency = _this.GetEditedData.currencyid;
                _this.intrestid = _this.GetEditedData.repositoryid.toString();
            }
        });
    };
    //Delete Subscription Data
    SummerSchoolManager.prototype.DeleteData = function (i, schoolid) {
        var _this = this;
        debugger;
        var data;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        debugger;
        data =
            {
                "acttype": "delete",
                "schoolid": schoolid
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
                _this.http.post('api/summerschool/deletesummerschool', body, options).subscribe(function (data) {
                    debugger;
                    _this.SummerSchoolDetails = data;
                    if (_this.SummerSchoolDetails.Status == true) {
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
    ], SummerSchoolManager.prototype, "myInputVariableprefile", void 0);
    SummerSchoolManager = __decorate([
        core_1.Component({
            selector: 'app-summerschool',
            templateUrl: './summerschool.component.html',
            //styleUrls: ['./webinar.component.css']
            providers: [{ provide: ng_bootstrap_1.NgbDateAdapter, useClass: ng_bootstrap_1.NgbDateNativeAdapter }]
        }),
        __metadata("design:paramtypes", [http_1.HttpClient, router_1.Router, angular_2_local_storage_1.LocalStorageService, ngx_toastr_1.ToastrService, ngx_ui_loader_1.NgxUiLoaderService, ng_bootstrap_1.NgbDatepickerConfig])
    ], SummerSchoolManager);
    return SummerSchoolManager;
}());
exports.SummerSchoolManager = SummerSchoolManager;
//# sourceMappingURL=summerschool.component.js.map