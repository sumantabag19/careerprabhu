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
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var ReportManager = /** @class */ (function () {
    function ReportManager(http, router, localstorage, toaster, loader, config, config1) {
        this.http = http;
        this.router = router;
        this.localstorage = localstorage;
        this.toaster = toaster;
        this.loader = loader;
        this.config1 = config1;
        this.noofappdownloader = 0;
        this.noofnotregistered = 0;
        this.noofthroughapp = 0;
        this.noofbackend = 0;
        this.studentdetails = [];
        this.countdetails = [];
        this.DownloaderData = [];
        this.AppDownloaderData = [];
        this.selectedbuilder = 0;
        this.selectedstudentq = 0;
        this.StudentData = [];
        this.statedat = [];
        this.StateData = [];
        this.citdata = [];
        this.selectedstate = 0;
        this.selectedstatef = 0;
        this.selectedstateg = 0;
        this.selectedstateh = 0;
        this.selectedstateq = 0;
        this.selectedstatepl = 0;
        this.GetPaymentDetails = [];
        this.CityData = [];
        this.schdata = [];
        this.selectedcity = 0;
        this.selectedcityf = 0;
        this.selectedcityg = 0;
        this.selectedcityh = 0;
        this.selectedcityq = 0;
        this.selectedcitypl = 0;
        this.SchoolData = [];
        this.classdat = [];
        this.ClassData = [];
        this.streamdat = [];
        this.StreamData = [];
        this.selectedschool = 0;
        this.selectedschoolf = 0;
        this.selectedschoolg = 0;
        this.selectedschoolh = 0;
        this.selectedschoolq = 0;
        this.selectedclass = 0;
        this.selectedclassf = 0;
        this.selectedclassg = 0;
        this.selectedclassh = 0;
        this.selectedclassi = 0;
        this.selectedclassj = 0;
        this.selectedclassq = 0;
        this.selectedclasspl = 0;
        this.selectedstream = 0;
        this.selectedstreamf = 0;
        this.selectedstreamg = 0;
        this.selectedstreamh = 0;
        this.selectedstreami = 0;
        this.selectedstreamj = 0;
        this.selectedstreamq = 0;
        this.selectedstreampl = 0;
        this.getunregisteredstudent = [];
        this.Getstudentdetails = [];
        this.getfreeuser = [];
        this.GetFreeUserDetails = [];
        this.getnotsubclickpaid = [];
        this.GetClickPaidNotSub = [];
        this.GetSubscribed = [];
        this.getsubscribeduser = [];
        this.getscholarshipdata = [];
        this.GetScholarshipDetails = [];
        this.getentrancedata = [];
        this.GetEntranceExamDetails = [];
        this.noofsummerschool = 0;
        this.Schooldetails = [];
        this.summercountdetails = [];
        this.SummerData = [];
        this.SummerSchoolData = [];
        this.selectedcountry = 0;
        this.location = 0;
        this.city = 0;
        this.univercity = 0;
        this.UniversityData = [];
        this.CityDataCareer = [];
        this.LocationData = [];
        this.CountryData = [];
        this.selectedinterest = 0;
        this.AreaData = 0;
        this.AreaDetails = [];
        this.CountryDetails = [];
        this.locdata = [];
        this.univdata = [];
        this.getsummerschooldata = [];
        this.GetSummerSchoolDetails = [];
        this.studata = [];
        this.StudentDatas = [];
        this.getquerydata = [];
        this.GetQueryDetails = [];
        this.selectedcareer = "";
        this.CareerData = [];
        this.keyword = "";
        this.careerdta = [];
        this.getfaqdata = [];
        this.GetFaqDetails = [];
        this.selectedcareer1 = "";
        this.getfaqissuedata = [];
        this.GetFaqissueDetails = [];
        this.keyword1 = "";
        this.getarticledata = [];
        this.GetArticleDetails = [];
        this.Coachtypedetails = [];
        this.TopicData = [];
        this.Coachdetail = [];
        this.CoachData = [];
        this.selectedtopic = 0;
        this.selectedcoach = 0;
        this.getcoachdata = [];
        this.GetcoachDetails = [];
        this.getplaceddata = [];
        this.GetplacedDetails = [];
        this.getdatapaid = [];
        this.getclickdata = [];
        this.GetClickDetails = [];
        this.getbuilderdata = [];
        this.GetBuilderDetails = [];
        this.selectedcat = 0;
        this.selectedsubcat = 0;
        this.selectedstatus = 0;
        this.getusagedata = [];
        this.GetUsageDetails = [];
        config.seconds = false;
        config.spinners = false;
        config.meridian = true;
        //const current = new Date();
        //config1.minDate = {
        //  year: current.getFullYear(), month:
        //    current.getMonth() + 1, day: current.getDate()
        //};
        ////config.maxDate = { year: 2099, month: 12, day: 31 };
        //config1.outsideDays = 'hidden';
    }
    ReportManager.prototype.ngOnInit = function () {
        this.GetAppDownloadCount();
        this.GetSummerSchoolCount();
        this.BindState();
        this.BindClass();
        this.BindStream();
        this.getArea();
        this.getcareer();
        this.BindCoachType();
        //this.GetPaidDetails();
        // this.SubscribedButNot(3);
    };
    ReportManager.prototype.GetPaidDetails = function () {
        var _this = this;
        if (this.selectedclassq == 0 || this.selectedclassq == undefined) {
            this.selectedclassq = 0;
        }
        if (this.selectedstreamq == 0 || this.selectedstreamq == undefined) {
            this.selectedstreamq = 0;
        }
        if (this.selectedstateq == 0 || this.selectedstateq == undefined) {
            this.selectedstateq = 0;
        }
        if (this.selectedcityq == 0 || this.selectedcityq == undefined) {
            this.selectedcityq = 0;
        }
        if (this.selectedschoolq == 0 || this.selectedschoolq == undefined) {
            this.selectedschoolq = 0;
        }
        if (this.selectedstatus == 0 || this.selectedstatus == undefined) {
            this.selectedstatus = 0;
        }
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        var a;
        var tmpclass = [];
        this.http.get('api/reports/GetPaidStudentDetails?classid=' + this.selectedclassq + '&streamid=' + this.selectedstreamq + '&stateid=' + this.selectedstateq + '&cityid=' + this.selectedcityq + '&paidstatus=' + this.selectedstatus, options).subscribe(function (data) {
            debugger;
            _this.getdatapaid = data;
            _this.GetPaymentDetails = _this.getdatapaid.data;
        });
    };
    ReportManager.prototype.DisplaypaymentReport = function () {
        var _this = this;
        debugger;
        if (this.selectedclassq == 0 || this.selectedclassq == undefined) {
            this.selectedclassq = 0;
        }
        if (this.selectedstreamq == 0 || this.selectedstreamq == undefined) {
            this.selectedstreamq = 0;
        }
        if (this.selectedstateq == 0 || this.selectedstateq == undefined) {
            this.selectedstateq = 0;
        }
        if (this.selectedcityq == 0 || this.selectedcityq == undefined) {
            this.selectedcityq = 0;
        }
        if (this.selectedschoolq == 0 || this.selectedschoolq == undefined) {
            this.selectedschoolq = 0;
        }
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        var a;
        var tmpclass = [];
        this.http.get('api/reports/GetQueryReport?classid=' + this.selectedclassq + '&streamid=' + this.selectedstreamq + '&stateid=' + this.selectedstateq + '&cityid=' + this.selectedcityq + '&enddate=' + this.e_date.toString(), options).subscribe(function (data) {
            debugger;
            _this.getquerydata = data;
            _this.GetQueryDetails = _this.getquerydata.data;
        });
    };
    ReportManager.prototype.BindCoachType = function () {
        var _this = this;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        var a;
        var tmpclass = [];
        this.http.get('api/lifecoachactivity/BindCoachType', options).subscribe(function (data) {
            debugger;
            _this.Coachtypedetails = data;
            _this.TopicData = _this.Coachtypedetails.data;
        });
    };
    ReportManager.prototype.BindCoach = function () {
        var _this = this;
        debugger;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        var body = {
            "coachtypeid": this.selectedtopic
        };
        var tmpclass = [];
        this.http.post('api/lifecoachactivity/BindCoach', body, options).subscribe(function (data) {
            _this.Coachdetail = data;
            _this.CoachData = _this.Coachdetail.data;
        });
    };
    ReportManager.prototype.getArea = function () {
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
    ReportManager.prototype.getCountry = function () {
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
    ReportManager.prototype.BindLocation = function () {
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
    ReportManager.prototype.BindCityCareer = function () {
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
    ReportManager.prototype.BindUniversity = function () {
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
    ReportManager.prototype.BindState = function () {
        var _this = this;
        debugger;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.statedat = [];
        var tmpclass = [];
        this.http.post('api/addstudentpartner/Bindstate', options).subscribe(function (data) {
            _this.statedat = data;
            if (_this.statedat.Status == true) {
                _this.StateData = _this.statedat.data;
            }
            else {
                _this.StateData = _this.statedat.data;
            }
        });
    };
    ReportManager.prototype.BindCity = function () {
        var _this = this;
        debugger;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.citdata = [];
        var body = {
            "stateid": this.selectedstate
        };
        var tmpclass = [];
        this.http.post('api/addstudentpartner/BindCity', body, options).subscribe(function (data) {
            _this.citdata = data;
            if (_this.citdata.Status == true) {
                _this.CityData = _this.citdata.data;
            }
            else {
                _this.CityData = _this.citdata.data;
            }
        });
    };
    ReportManager.prototype.BindCityf = function () {
        var _this = this;
        debugger;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.citdata = [];
        var body = {
            "stateid": this.selectedstatef
        };
        var tmpclass = [];
        this.http.post('api/addstudentpartner/BindCity', body, options).subscribe(function (data) {
            _this.citdata = data;
            if (_this.citdata.Status == true) {
                _this.CityData = _this.citdata.data;
            }
            else {
                _this.CityData = _this.citdata.data;
            }
        });
    };
    ReportManager.prototype.BindCityg = function () {
        var _this = this;
        debugger;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.citdata = [];
        var body = {
            "stateid": this.selectedstateg
        };
        var tmpclass = [];
        this.http.post('api/addstudentpartner/BindCity', body, options).subscribe(function (data) {
            _this.citdata = data;
            if (_this.citdata.Status == true) {
                _this.CityData = _this.citdata.data;
            }
            else {
                _this.CityData = _this.citdata.data;
            }
        });
    };
    ReportManager.prototype.BindCityh = function () {
        var _this = this;
        debugger;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.citdata = [];
        var body = {
            "stateid": this.selectedstateh
        };
        var tmpclass = [];
        this.http.post('api/addstudentpartner/BindCity', body, options).subscribe(function (data) {
            _this.citdata = data;
            if (_this.citdata.Status == true) {
                _this.CityData = _this.citdata.data;
            }
            else {
                _this.CityData = _this.citdata.data;
            }
        });
    };
    ReportManager.prototype.BindCityq = function () {
        var _this = this;
        debugger;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.citdata = [];
        var body = {
            "stateid": this.selectedstateq
        };
        var tmpclass = [];
        this.http.post('api/addstudentpartner/BindCity', body, options).subscribe(function (data) {
            _this.citdata = data;
            if (_this.citdata.Status == true) {
                _this.CityData = _this.citdata.data;
            }
            else {
                _this.CityData = _this.citdata.data;
            }
        });
    };
    ReportManager.prototype.BindCitypl = function () {
        var _this = this;
        debugger;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.citdata = [];
        var body = {
            "stateid": this.selectedstatepl
        };
        var tmpclass = [];
        this.http.post('api/addstudentpartner/BindCity', body, options).subscribe(function (data) {
            _this.citdata = data;
            if (_this.citdata.Status == true) {
                _this.CityData = _this.citdata.data;
            }
            else {
                _this.CityData = _this.citdata.data;
            }
        });
    };
    ReportManager.prototype.BindSchool = function () {
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
        this.http.post('api/addstudentpartner/BindSchool', body, options).subscribe(function (data) {
            _this.schdata = data;
            if (_this.schdata.Status == true) {
                _this.SchoolData = _this.schdata.data;
            }
            else {
                _this.SchoolData = _this.schdata.data;
            }
        });
    };
    ReportManager.prototype.BindSchoolf = function () {
        var _this = this;
        debugger;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.schdata = [];
        var body = {
            "stateid": this.selectedstatef,
            "cityid": this.selectedcityf
        };
        var tmpclass = [];
        this.http.post('api/addstudentpartner/BindSchool', body, options).subscribe(function (data) {
            _this.schdata = data;
            if (_this.schdata.Status == true) {
                _this.SchoolData = _this.schdata.data;
            }
            else {
                _this.SchoolData = _this.schdata.data;
            }
        });
    };
    ReportManager.prototype.BindSchoolg = function () {
        var _this = this;
        debugger;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.schdata = [];
        var body = {
            "stateid": this.selectedstateg,
            "cityid": this.selectedcityg
        };
        var tmpclass = [];
        this.http.post('api/addstudentpartner/BindSchool', body, options).subscribe(function (data) {
            _this.schdata = data;
            if (_this.schdata.Status == true) {
                _this.SchoolData = _this.schdata.data;
            }
            else {
                _this.SchoolData = _this.schdata.data;
            }
        });
    };
    ReportManager.prototype.BindSchoolh = function () {
        var _this = this;
        debugger;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.schdata = [];
        var body = {
            "stateid": this.selectedstateh,
            "cityid": this.selectedcityh
        };
        var tmpclass = [];
        this.http.post('api/addstudentpartner/BindSchool', body, options).subscribe(function (data) {
            _this.schdata = data;
            if (_this.schdata.Status == true) {
                _this.SchoolData = _this.schdata.data;
            }
            else {
                _this.SchoolData = _this.schdata.data;
            }
        });
    };
    ReportManager.prototype.BindSchoolq = function () {
        var _this = this;
        debugger;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.schdata = [];
        var body = {
            "stateid": this.selectedstateq,
            "cityid": this.selectedcityq
        };
        var tmpclass = [];
        this.http.post('api/addstudentpartner/BindSchool', body, options).subscribe(function (data) {
            _this.schdata = data;
            if (_this.schdata.Status == true) {
                _this.SchoolData = _this.schdata.data;
            }
            else {
                _this.SchoolData = _this.schdata.data;
            }
        });
    };
    ReportManager.prototype.BindClass = function () {
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
    ReportManager.prototype.BindStream = function () {
        var _this = this;
        debugger;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.streamdat = [];
        var tmpclass = [];
        this.http.post('api/addstudentpartner/BindStream', options).subscribe(function (data) {
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
    ReportManager.prototype.getcareer = function () {
        var _this = this;
        debugger;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.classdat = [];
        var tmpclass = [];
        this.http.post('api/addstudentpartner/BindCareer', options).subscribe(function (data) {
            _this.careerdta = data;
            if (_this.careerdta.Status == true) {
                _this.CareerData = _this.careerdta.data;
            }
            else {
                _this.CareerData = _this.careerdta.data;
            }
        });
    };
    ReportManager.prototype.GetSummerSchoolCount = function () {
        var _this = this;
        debugger;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        var a;
        var tmpclass = [];
        this.http.get('api/reports/GetCountSummerSchool', options).subscribe(function (data) {
            debugger;
            _this.Schooldetails = data;
            _this.summercountdetails = _this.Schooldetails;
            _this.noofsummerschool = _this.summercountdetails.data[0].noofschool;
        });
    };
    ReportManager.prototype.GetAppDownloadCount = function () {
        var _this = this;
        debugger;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        var a;
        var tmpclass = [];
        this.http.get('api/reports/GetCountStudent', options).subscribe(function (data) {
            debugger;
            _this.studentdetails = data;
            _this.countdetails = _this.studentdetails;
            _this.noofappdownloader = _this.countdetails.data[0].noofregstudent;
            _this.noofnotregistered = _this.countdetails.data[0].noofnotregstudent;
            _this.noofthroughapp = _this.countdetails.data[0].noofaddfromapp;
            _this.noofbackend = _this.countdetails.data[0].noofaddfrombackend;
        });
    };
    ReportManager.prototype.AppDownloder = function (i) {
        var _this = this;
        debugger;
        var index = i;
        if (index == 1) {
            if (this.SelectedDate == undefined) {
                this.s_date = "1900-01-01";
            }
            else {
                this.s_date = this.SelectedDate.toISOString().slice(0, 10);
            }
            if (this.SelectedEndDate == undefined) {
                this.e_date = "1900-01-01";
            }
            else {
                this.e_date = this.SelectedEndDate.toISOString().slice(0, 10);
            }
        }
        if (index == 2) {
            if (this.SelectedDate1 == undefined) {
                this.s_date = "1900-01-01";
            }
            else {
                this.s_date = this.SelectedDate1.toISOString().slice(0, 10);
            }
            if (this.SelectedEndDate1 == undefined) {
                this.e_date = "1900-01-01";
            }
            else {
                this.e_date = this.SelectedEndDate1.toISOString().slice(0, 10);
            }
        }
        if (index == 3) {
            if (this.SelectedDate2 == undefined) {
                this.s_date = "1900-01-01";
            }
            else {
                this.s_date = this.SelectedDate2.toISOString().slice(0, 10);
            }
            if (this.SelectedEndDate2 == undefined) {
                this.e_date = "1900-01-01";
            }
            else {
                this.e_date = this.SelectedEndDate2.toISOString().slice(0, 10);
            }
        }
        if (index == 4) {
            if (this.SelectedDate3 == undefined) {
                this.s_date = "1900-01-01";
            }
            else {
                this.s_date = this.SelectedDate3.toISOString().slice(0, 10);
            }
            if (this.SelectedEndDate3 == undefined) {
                this.e_date = "1900-01-01";
            }
            else {
                this.e_date = this.SelectedEndDate3.toISOString().slice(0, 10);
            }
        }
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.http.get('api/reports/appdownloader?id=' + index + '&startdate=' + this.s_date.toString() + '&enddate=' + this.e_date.toString(), options).subscribe(
        //this.http.get('api/reports/appdownloader?id=' + index, options).subscribe(
        function (data) {
            debugger;
            _this.DownloaderData = data;
            _this.AppDownloaderData = _this.DownloaderData.data;
        });
    };
    ReportManager.prototype.SubscribedButNot = function (i) {
        var _this = this;
        debugger;
        var index = i;
        if (this.selectedstate == 0 || this.selectedstate == undefined) {
            this.selectedstate = 0;
        }
        if (this.selectedcity == 0 || this.selectedcity == undefined) {
            this.selectedcity = 0;
        }
        if (this.selectedschool == 0 || this.selectedschool == undefined) {
            this.selectedschool = 0;
        }
        if (this.selectedclass == 0 || this.selectedclass == undefined) {
            this.selectedclass = 0;
        }
        if (this.selectedstream == 0 || this.selectedstream == undefined) {
            this.selectedstream = 0;
        }
        if (this.SelectedDate3 == undefined) {
            this.s_date = "1900-01-01";
        }
        else {
            this.s_date = this.SelectedDate3.toISOString().slice(0, 10);
        }
        if (this.SelectedEndDate3 == undefined) {
            this.e_date = "1900-01-01";
        }
        else {
            this.e_date = this.SelectedEndDate3.toISOString().slice(0, 10);
        }
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        var a;
        var tmpclass = [];
        this.http.get('api/reports/GetUnRegisteredStudent?stateid=' + this.selectedstate + '&cityid=' + this.selectedcity + ' &schoolid=' + this.selectedschool + '&classid=' + this.selectedclass + '&streamid=' + this.selectedstream + '&id=' + index + '&startdate=' + this.s_date.toString() + '&enddate=' + this.e_date.toString(), options).subscribe(function (data) {
            debugger;
            _this.getunregisteredstudent = data;
            _this.Getstudentdetails = _this.getunregisteredstudent.data;
        });
    };
    ReportManager.prototype.FreeUser = function (i) {
        var _this = this;
        debugger;
        var index = i;
        if (this.selectedstatef == 0 || this.selectedstatef == undefined) {
            this.selectedstatef = 0;
        }
        if (this.selectedcityf == 0 || this.selectedcityf == undefined) {
            this.selectedcityf = 0;
        }
        if (this.selectedschoolf == 0 || this.selectedschoolf == undefined) {
            this.selectedschoolf = 0;
        }
        if (this.selectedclassf == 0 || this.selectedclassf == undefined) {
            this.selectedclassf = 0;
        }
        if (this.selectedstreamf == 0 || this.selectedstreamf == undefined) {
            this.selectedstreamf = 0;
        }
        if (this.SelectedDate7 == undefined) {
            this.s_date = "1900-01-01";
        }
        else {
            this.s_date = this.SelectedDate7.toISOString().slice(0, 10);
        }
        if (this.SelectedEndDate8 == undefined) {
            this.e_date = "1900-01-01";
        }
        else {
            this.e_date = this.SelectedEndDate8.toISOString().slice(0, 10);
        }
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        var a;
        var tmpclass = [];
        this.http.get('api/reports/GetFreeUser?stateid=' + this.selectedstatef + '&cityid=' + this.selectedcityf + ' &schoolid=' + this.selectedschoolf + '&classid=' + this.selectedclassf + '&streamid=' + this.selectedstreamf + '&id=' + index + '&startdate=' + this.s_date.toString() + '&enddate=' + this.e_date.toString(), options).subscribe(function (data) {
            debugger;
            _this.getfreeuser = data;
            _this.GetFreeUserDetails = _this.getfreeuser.data;
        });
    };
    ReportManager.prototype.ClickPaidNotSub = function (i) {
        var _this = this;
        debugger;
        var index = i;
        if (this.selectedstateg == 0 || this.selectedstateg == undefined) {
            this.selectedstateg = 0;
        }
        if (this.selectedcityg == 0 || this.selectedcityg == undefined) {
            this.selectedcityg = 0;
        }
        if (this.selectedschoolg == 0 || this.selectedschoolg == undefined) {
            this.selectedschoolg = 0;
        }
        if (this.selectedclassg == 0 || this.selectedclassg == undefined) {
            this.selectedclassg = 0;
        }
        if (this.selectedstreamg == 0 || this.selectedstreamg == undefined) {
            this.selectedstreamg = 0;
        }
        if (this.SelectedDate9 == undefined) {
            this.s_date = "1900-01-01";
        }
        else {
            this.s_date = this.SelectedDate9.toISOString().slice(0, 10);
        }
        if (this.SelectedEndDate10 == undefined) {
            this.e_date = "1900-01-01";
        }
        else {
            this.e_date = this.SelectedEndDate10.toISOString().slice(0, 10);
        }
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        var a;
        var tmpclass = [];
        this.http.get('api/reports/GetClickPaidNotSub?stateid=' + this.selectedstateg + '&cityid=' + this.selectedcityg + ' &schoolid=' + this.selectedschoolg + '&classid=' + this.selectedclassg + '&streamid=' + this.selectedstreamg + '&id=' + index + '&startdate=' + this.s_date.toString() + '&enddate=' + this.e_date.toString(), options).subscribe(function (data) {
            debugger;
            _this.getnotsubclickpaid = data;
            _this.GetClickPaidNotSub = _this.getnotsubclickpaid.data;
        });
    };
    ReportManager.prototype.SubscribedUser = function (i) {
        var _this = this;
        debugger;
        var index = i;
        if (this.selectedstateh == 0 || this.selectedstateh == undefined) {
            this.selectedstateh = 0;
        }
        if (this.selectedcityh == 0 || this.selectedcityh == undefined) {
            this.selectedcityh = 0;
        }
        if (this.selectedschoolh == 0 || this.selectedschoolh == undefined) {
            this.selectedschoolh = 0;
        }
        if (this.selectedclassh == 0 || this.selectedclassh == undefined) {
            this.selectedclassh = 0;
        }
        if (this.selectedstreamh == 0 || this.selectedstreamh == undefined) {
            this.selectedstreamh = 0;
        }
        if (this.SelectedDate11 == undefined) {
            this.s_date = "1900-01-01";
        }
        else {
            this.s_date = this.SelectedDate11.toISOString().slice(0, 10);
        }
        if (this.SelectedEndDate12 == undefined) {
            this.e_date = "1900-01-01";
        }
        else {
            this.e_date = this.SelectedEndDate12.toISOString().slice(0, 10);
        }
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        var a;
        var tmpclass = [];
        this.http.get('api/reports/GetSubscribedUsers?stateid=' + this.selectedstateh + '&cityid=' + this.selectedcityh + ' &schoolid=' + this.selectedschoolh + '&classid=' + this.selectedclassh + '&streamid=' + this.selectedstreamh + '&id=' + index + '&startdate=' + this.s_date.toString() + '&enddate=' + this.e_date.toString(), options).subscribe(function (data) {
            debugger;
            _this.getsubscribeduser = data;
            _this.GetSubscribed = _this.getsubscribeduser.data;
        });
    };
    ReportManager.prototype.GetScholarship = function () {
        var _this = this;
        debugger;
        if (this.selectedclassi == 0 || this.selectedclassi == undefined) {
            this.selectedclassi = 0;
        }
        if (this.selectedstreami == 0 || this.selectedstreami == undefined) {
            this.selectedstreami = 0;
        }
        if (this.SelectedDate13 == undefined) {
            this.s_date = "1900-01-01";
        }
        else {
            this.s_date = this.SelectedDate13.toISOString().slice(0, 10);
        }
        if (this.SelectedEndDate14 == undefined) {
            this.e_date = "1900-01-01";
        }
        else {
            this.e_date = this.SelectedEndDate14.toISOString().slice(0, 10);
        }
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        var a;
        var tmpclass = [];
        this.http.get('api/reports/GetScholarship?classid=' + this.selectedclassi + '&stream=' + this.selectedstreami + '&startdate=' + this.s_date.toString() + '&enddate=' + this.e_date.toString(), options).subscribe(function (data) {
            debugger;
            _this.getscholarshipdata = data;
            _this.GetScholarshipDetails = _this.getscholarshipdata.data;
        });
    };
    ReportManager.prototype.GetEntranceExam = function () {
        var _this = this;
        debugger;
        if (this.selectedclassj == 0 || this.selectedclassj == undefined) {
            this.selectedclassj = 0;
        }
        if (this.selectedstreamj == 0 || this.selectedstreamj == undefined) {
            this.selectedstreamj = 0;
        }
        if (this.SelectedDate15 == undefined) {
            this.s_date = "1900-01-01";
        }
        else {
            this.s_date = this.SelectedDate15.toISOString().slice(0, 10);
        }
        if (this.SelectedEndDate16 == undefined) {
            this.e_date = "1900-01-01";
        }
        else {
            this.e_date = this.SelectedEndDate16.toISOString().slice(0, 10);
        }
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        var a;
        var tmpclass = [];
        this.http.get('api/reports/GetEntranceExam?classid=' + this.selectedclassj + '&stream=' + this.selectedstreamj + '&startdate=' + this.s_date.toString() + '&enddate=' + this.e_date.toString(), options).subscribe(function (data) {
            debugger;
            _this.getentrancedata = data;
            _this.GetEntranceExamDetails = _this.getentrancedata.data;
        });
    };
    ReportManager.prototype.GetSummer = function (i) {
        var _this = this;
        debugger;
        var index = i;
        if (index == 1) {
            if (this.SelectedDate17 == undefined) {
                this.s_date = "1900-01-01";
            }
            else {
                this.s_date = this.SelectedDate17.toISOString().slice(0, 10);
            }
            if (this.SelectedEndDate18 == undefined) {
                this.e_date = "1900-01-01";
            }
            else {
                this.e_date = this.SelectedEndDate18.toISOString().slice(0, 10);
            }
        }
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.http.get('api/reports/GetAddSummerSchool?id=' + index + '&startdate=' + this.s_date.toString() + '&enddate=' + this.e_date.toString(), options).subscribe(
        //this.http.get('api/reports/appdownloader?id=' + index, options).subscribe(
        function (data) {
            debugger;
            _this.SummerData = data;
            _this.AppDownloaderData = _this.SummerData.data;
        });
    };
    ReportManager.prototype.GetSummerList = function () {
        var _this = this;
        debugger;
        if (this.selectedinterest == 0 || this.selectedinterest == undefined) {
            this.selectedinterest = 0;
        }
        if (this.selectedcountry == 0 || this.selectedcountry == undefined) {
            this.selectedcountry = 0;
        }
        if (this.location == 0 || this.location == undefined) {
            this.location = 0;
        }
        if (this.city == 0 || this.city == undefined) {
            this.city = 0;
        }
        if (this.univercity == 0 || this.univercity == undefined) {
            this.univercity = 0;
        }
        if (this.SelectedDate19 == undefined) {
            this.s_date = "1900-01-01";
        }
        else {
            this.s_date = this.SelectedDate19.toISOString().slice(0, 10);
        }
        if (this.SelectedEndDate20 == undefined) {
            this.e_date = "1900-01-01";
        }
        else {
            this.e_date = this.SelectedEndDate20.toISOString().slice(0, 10);
        }
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        var a;
        var tmpclass = [];
        this.http.get('api/reports/GetSummerSchool?countryid=' + this.selectedcountry + '&stateid=' + this.location + '&cityid=' + this.city + '&universityid=' + this.univercity + '&interestarea=' + this.selectedinterest + '&startdate=' + this.s_date.toString() + '&enddate=' + this.e_date.toString(), options).subscribe(function (data) {
            debugger;
            _this.getsummerschooldata = data;
            _this.GetSummerSchoolDetails = _this.getsummerschooldata.data;
        });
    };
    ReportManager.prototype.GetQueryReport = function () {
        var _this = this;
        debugger;
        if (this.selectedclassq == 0 || this.selectedclassq == undefined) {
            this.selectedclassq = 0;
        }
        if (this.selectedstreamq == 0 || this.selectedstreamq == undefined) {
            this.selectedstreamq = 0;
        }
        if (this.selectedstateq == 0 || this.selectedstateq == undefined) {
            this.selectedstateq = 0;
        }
        if (this.selectedcityq == 0 || this.selectedcityq == undefined) {
            this.selectedcityq = 0;
        }
        if (this.selectedschoolq == 0 || this.selectedschoolq == undefined) {
            this.selectedschoolq = 0;
        }
        if (this.selectedstudentq == 0 || this.selectedstudentq == undefined) {
            this.selectedstudentq = 0;
        }
        if (this.SelectedDate21 == undefined) {
            this.s_date = "1900-01-01";
        }
        else {
            this.s_date = this.SelectedDate21.toISOString().slice(0, 10);
        }
        if (this.SelectedEndDate22 == undefined) {
            this.e_date = "1900-01-01";
        }
        else {
            this.e_date = this.SelectedEndDate22.toISOString().slice(0, 10);
        }
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        var a;
        var tmpclass = [];
        this.http.get('api/reports/GetQueryReport?classid=' + this.selectedclassq + '&streamid=' + this.selectedstreamq + '&stateid=' + this.selectedstateq + '&cityid=' + this.selectedcityq + '&schoolid=' + this.selectedschoolq + '&studentid=' + this.selectedstudentq + '&startdate=' + this.s_date.toString() + '&enddate=' + this.e_date.toString(), options).subscribe(function (data) {
            debugger;
            _this.getquerydata = data;
            _this.GetQueryDetails = _this.getquerydata.data;
        });
    };
    ReportManager.prototype.GetUsagePatternReport = function () {
        var _this = this;
        debugger;
        if (this.selectedclassq == 0 || this.selectedclassq == undefined) {
            this.selectedclassq = 0;
        }
        if (this.selectedstreamq == 0 || this.selectedstreamq == undefined) {
            this.selectedstreamq = 0;
        }
        if (this.selectedstateq == 0 || this.selectedstateq == undefined) {
            this.selectedstateq = 0;
        }
        if (this.selectedcityq == 0 || this.selectedcityq == undefined) {
            this.selectedcityq = 0;
        }
        if (this.selectedschoolq == 0 || this.selectedschoolq == undefined) {
            this.selectedschoolq = 0;
        }
        if (this.selectedstudentq == 0 || this.selectedstudentq == undefined) {
            this.selectedstudentq = 0;
        }
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        var a;
        var tmpclass = [];
        this.http.get('api/reports/GetUsagepatternReport?classid=' + this.selectedclassq + '&streamid=' + this.selectedstreamq + '&stateid=' + this.selectedstateq + '&cityid=' + this.selectedcityq + '&schoolid=' + this.selectedschoolq + '&studentid=' + this.selectedstudentq, options).subscribe(function (data) {
            debugger;
            _this.getusagedata = data;
            _this.GetUsageDetails = _this.getusagedata.data;
        });
    };
    ReportManager.prototype.BindStudentq = function () {
        var _this = this;
        debugger;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.schdata = [];
        var body = {
            "stateid": this.selectedstateq,
            "cityid": this.selectedcityq,
            "schoolid": this.selectedschoolq,
            "classid": this.selectedclassq,
            "streamid": this.selectedstreamq
        };
        var tmpclass = [];
        this.http.post('api/addstudentpartner/BindStudent', body, options).subscribe(function (data) {
            _this.studata = data;
            if (_this.studata.Status == true) {
                _this.StudentDatas = _this.studata.data;
            }
            else {
                _this.StudentDatas = _this.studata.data;
            }
        });
    };
    ReportManager.prototype.GetFaqReport = function () {
        var _this = this;
        debugger;
        if (this.selectedcareer == "" || this.selectedcareer == undefined) {
            this.selectedcareer = "";
        }
        if (this.keyword == "" || this.keyword == undefined) {
            this.keyword = "";
        }
        if (this.SelectedDate23 == undefined) {
            this.s_date = "1900-01-01";
        }
        else {
            this.s_date = this.SelectedDate23.toISOString().slice(0, 10);
        }
        if (this.SelectedEndDate24 == undefined) {
            this.e_date = "1900-01-01";
        }
        else {
            this.e_date = this.SelectedEndDate24.toISOString().slice(0, 10);
        }
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        var a;
        var tmpclass = [];
        this.http.get('api/reports/GetFaqData?careername=' + this.selectedcareer + '&keyword=' + this.keyword + '&startdate=' + this.s_date.toString() + '&enddate=' + this.e_date.toString(), options).subscribe(function (data) {
            debugger;
            _this.getfaqdata = data;
            _this.GetFaqDetails = _this.getfaqdata.data;
        });
    };
    ReportManager.prototype.GetFaqIssueReport = function () {
        var _this = this;
        debugger;
        if (this.selectedcareer1 == "" || this.selectedcareer1 == undefined) {
            this.selectedcareer1 = "";
        }
        if (this.SelectedDate25 == undefined) {
            this.s_date = "1900-01-01";
        }
        else {
            this.s_date = this.SelectedDate25.toISOString().slice(0, 10);
        }
        if (this.SelectedEndDate26 == undefined) {
            this.e_date = "1900-01-01";
        }
        else {
            this.e_date = this.SelectedEndDate26.toISOString().slice(0, 10);
        }
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        var a;
        var tmpclass = [];
        this.http.get('api/reports/GetFaqIssueData?careername=' + this.selectedcareer1 + '&startdate=' + this.s_date.toString() + '&enddate=' + this.e_date.toString(), options).subscribe(function (data) {
            debugger;
            _this.getfaqissuedata = data;
            _this.GetFaqissueDetails = _this.getfaqissuedata.data;
        });
    };
    ReportManager.prototype.GetArticleReport = function () {
        var _this = this;
        debugger;
        if (this.keyword1 == "" || this.keyword1 == undefined) {
            this.keyword1 = "";
        }
        if (this.SelectedDate27 == undefined) {
            this.s_date = "1900-01-01";
        }
        else {
            this.s_date = this.SelectedDate27.toISOString().slice(0, 10);
        }
        if (this.SelectedEndDate28 == undefined) {
            this.e_date = "1900-01-01";
        }
        else {
            this.e_date = this.SelectedEndDate28.toISOString().slice(0, 10);
        }
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        var a;
        var tmpclass = [];
        this.http.get('api/reports/GetArticleData?keyword=' + this.keyword1 + '&startdate=' + this.s_date.toString() + '&enddate=' + this.e_date.toString(), options).subscribe(function (data) {
            debugger;
            _this.getarticledata = data;
            _this.GetArticleDetails = _this.getarticledata.data;
        });
    };
    ReportManager.prototype.GetCoachList = function () {
        var _this = this;
        debugger;
        if (this.selectedtopic == 0 || this.selectedtopic == undefined) {
            this.selectedtopic = 0;
        }
        if (this.selectedcoach == 0 || this.selectedcoach == undefined) {
            this.selectedcoach = 0;
        }
        if (this.SelectedDate29 == undefined) {
            this.s_date = "1900-01-01";
        }
        else {
            this.s_date = this.SelectedDate29.toISOString().slice(0, 10);
        }
        if (this.SelectedEndDate30 == undefined) {
            this.e_date = "1900-01-01";
        }
        else {
            this.e_date = this.SelectedEndDate30.toISOString().slice(0, 10);
        }
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        var a;
        var tmpclass = [];
        this.http.get('api/reports/GetCoachData?coachtype=' + this.selectedtopic + '&coach=' + this.selectedcoach + '&startdate=' + this.s_date.toString() + '&enddate=' + this.e_date.toString(), options).subscribe(function (data) {
            debugger;
            _this.getcoachdata = data;
            _this.GetcoachDetails = _this.getcoachdata.data;
        });
    };
    ReportManager.prototype.GetPlacement = function () {
        var _this = this;
        debugger;
        if (this.selectedstatepl == 0 || this.selectedstatepl == undefined) {
            this.selectedstatepl = 0;
        }
        if (this.selectedcitypl == 0 || this.selectedcitypl == undefined) {
            this.selectedcitypl = 0;
        }
        if (this.selectedclasspl == 0 || this.selectedclasspl == undefined) {
            this.selectedclasspl = 0;
        }
        if (this.selectedstreampl == 0 || this.selectedstreampl == undefined) {
            this.selectedstreampl = 0;
        }
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        var a;
        var tmpclass = [];
        this.http.get('api/reports/GetPlacementData?stateid=' + this.selectedstatepl + '&cityid=' + this.selectedcitypl + '&classid=' + this.selectedclasspl + '&streamid=' + this.selectedstreampl, options).subscribe(function (data) {
            debugger;
            _this.getplaceddata = data;
            _this.GetplacedDetails = _this.getplaceddata.data;
        });
    };
    ReportManager.prototype.ReadMoreCompAndScholarship = function () {
        var _this = this;
        debugger;
        if (this.selectedclassq == 0 || this.selectedclassq == undefined) {
            this.selectedclassq = 0;
        }
        if (this.selectedstreamq == 0 || this.selectedstreamq == undefined) {
            this.selectedstreamq = 0;
        }
        if (this.SelectedDate51 == undefined) {
            this.s_date = "1900-01-01";
        }
        else {
            this.s_date = this.SelectedDate51.toISOString().slice(0, 10);
        }
        if (this.SelectedDate52 == undefined) {
            this.e_date = "1900-01-01";
        }
        else {
            this.e_date = this.SelectedDate52.toISOString().slice(0, 10);
        }
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        var a;
        var tmpclass = [];
        this.http.get('api/reports/GetClickReport?classid=' + this.selectedclassq + '&streamid=' + this.selectedstreamq + '&startdate=' + this.s_date.toString() + '&enddate=' + this.e_date.toString(), options).subscribe(function (data) {
            debugger;
            _this.getclickdata = data;
            _this.GetClickDetails = _this.getclickdata.data;
        });
    };
    ReportManager.prototype.ReadMoreEntranceRxam = function () {
        var _this = this;
        debugger;
        if (this.selectedclassq == 0 || this.selectedclassq == undefined) {
            this.selectedclassq = 0;
        }
        if (this.selectedstreamq == 0 || this.selectedstreamq == undefined) {
            this.selectedstreamq = 0;
        }
        if (this.SelectedDate54 == undefined) {
            this.s_date = "1900-01-01";
        }
        else {
            this.s_date = this.SelectedDate54.toISOString().slice(0, 10);
        }
        if (this.SelectedDate55 == undefined) {
            this.e_date = "1900-01-01";
        }
        else {
            this.e_date = this.SelectedDate55.toISOString().slice(0, 10);
        }
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        var a;
        var tmpclass = [];
        this.http.get('api/reports/GetClickEntranceReport?classid=' + this.selectedclassq + '&streamid=' + this.selectedstreamq + '&startdate=' + this.s_date.toString() + '&enddate=' + this.e_date.toString(), options).subscribe(function (data) {
            debugger;
            _this.getclickdata = data;
            _this.GetClickDetails = _this.getclickdata.data;
        });
    };
    ReportManager.prototype.GetSummerClickData = function () {
        var _this = this;
        debugger;
        if (this.SelectedDate59 == undefined) {
            this.s_date = "1900-01-01";
        }
        else {
            this.s_date = this.SelectedDate59.toISOString().slice(0, 10);
        }
        if (this.SelectedDate60 == undefined) {
            this.e_date = "1900-01-01";
        }
        else {
            this.e_date = this.SelectedDate60.toISOString().slice(0, 10);
        }
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        var a;
        var tmpclass = [];
        this.http.get('api/reports/GetClickSummerReport?startdate=' + this.s_date.toString() + '&enddate=' + this.e_date.toString(), options).subscribe(function (data) {
            debugger;
            _this.getclickdata = data;
            _this.GetClickDetails = _this.getclickdata.data;
        });
    };
    ReportManager.prototype.Getbuldingusage = function () {
        var _this = this;
        debugger;
        if (this.selectedstatepl == 0 || this.selectedstatepl == undefined) {
            this.selectedstatepl = 0;
        }
        if (this.selectedcitypl == 0 || this.selectedcitypl == undefined) {
            this.selectedcitypl = 0;
        }
        if (this.selectedclasspl == 0 || this.selectedclasspl == undefined) {
            this.selectedclasspl = 0;
        }
        if (this.selectedstreampl == 0 || this.selectedstreampl == undefined) {
            this.selectedstreampl = 0;
        }
        if (this.selectedbuilder == 0 || this.selectedbuilder == undefined) {
            this.selectedbuilder = 0;
        }
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        var a;
        var tmpclass = [];
        this.http.get('api/reports/GetBuildingUsageData?stateid=' + this.selectedstatepl + '&cityid=' + this.selectedcitypl + '&classid=' + this.selectedclasspl + '&streamid=' + this.selectedstreampl + '&op=' + this.selectedbuilder, options).subscribe(function (data) {
            debugger;
            _this.getbuilderdata = data;
            _this.GetBuilderDetails = _this.getbuilderdata.data;
        });
    };
    ReportManager.prototype.GetMaterialusage = function () {
        var _this = this;
        debugger;
        if (this.selectedstatepl == 0 || this.selectedstatepl == undefined) {
            this.selectedstatepl = 0;
        }
        if (this.selectedcitypl == 0 || this.selectedcitypl == undefined) {
            this.selectedcitypl = 0;
        }
        if (this.selectedclasspl == 0 || this.selectedclasspl == undefined) {
            this.selectedclasspl = 0;
        }
        if (this.selectedstreampl == 0 || this.selectedstreampl == undefined) {
            this.selectedstreampl = 0;
        }
        if (this.selectedcat == 0 || this.selectedcat == undefined) {
            this.selectedcat = 0;
        }
        if (this.selectedsubcat == 0 || this.selectedsubcat == undefined) {
            this.selectedsubcat = 0;
        }
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        var a;
        var tmpclass = [];
        this.http.get('api/reports/GetMaterialUsageData?stateid=' + this.selectedstatepl + '&cityid=' + this.selectedcitypl + '&classid=' + this.selectedclasspl + '&streamid=' + this.selectedstreampl + '&category=' + this.selectedbuilder + '&subcategory=' + this.selectedsubcat, options).subscribe(function (data) {
            debugger;
            _this.getbuilderdata = data;
            _this.GetBuilderDetails = _this.getbuilderdata.data;
        });
    };
    ReportManager.prototype.ResetPpaymentReport = function () {
        this.GetPaymentDetails = [];
    };
    ReportManager.prototype.ResetUsageReport = function () {
        this.selectedstateq = 0;
        this.selectedcityq = 0;
        this.selectedschoolq = 0;
        this.selectedstudentq = 0;
        this.selectedclassq = 0;
        this.selectedstreamq = 0;
        this.selectedstudentq = 0;
        this.GetUsageDetails = [];
    };
    ReportManager.prototype.ResetMaterial = function () {
        this.selectedstatepl = 0;
        this.selectedcitypl = 0;
        this.selectedclasspl = 0;
        this.selectedstreampl = 0;
        this.selectedbuilder = 0;
        this.selectedcat = 0;
        this.selectedsubcat = 0;
        this.GetBuilderDetails = [];
    };
    ReportManager.prototype.ResetBulder = function () {
        this.selectedstatepl = 0;
        this.selectedcitypl = 0;
        this.selectedclasspl = 0;
        this.selectedstreampl = 0;
        this.selectedbuilder = 0;
        this.GetBuilderDetails = [];
    };
    ReportManager.prototype.ResetPlacement = function () {
        this.selectedstatepl = 0;
        this.selectedcitypl = 0;
        this.selectedclasspl = 0;
        this.selectedstreampl = 0;
        this.GetplacedDetails = [];
    };
    ReportManager.prototype.ResetCoach = function () {
        this.selectedtopic = 0;
        this.selectedcoach = 0;
        this.SelectedDate29 = null;
        this.SelectedEndDate30 = null;
        this.GetcoachDetails = [];
    };
    ReportManager.prototype.ResetArticleReport = function () {
        this.keyword1 = "";
        this.SelectedDate27 = null;
        this.SelectedEndDate28 = null;
        this.GetArticleDetails = [];
    };
    ReportManager.prototype.ResetFaqIssueReport = function () {
        this.selectedcareer1 = "";
        this.SelectedDate25 = null;
        this.SelectedEndDate26 = null;
        this.GetFaqissueDetails = [];
    };
    ReportManager.prototype.ResetFaqReport = function () {
        this.selectedcareer = "";
        this.keyword = "";
        this.SelectedDate23 = null;
        this.SelectedEndDate24 = null;
        this.GetFaqDetails = [];
    };
    ReportManager.prototype.ResetClickReport = function () {
        this.selectedclassq = 0;
        this.selectedstreamq = 0;
        this.selectedstudentq = 0;
        this.SelectedDate51 = null;
        this.SelectedDate52 = null;
        this.GetClickDetails = [];
    };
    ReportManager.prototype.ResetQueryReport = function () {
        this.selectedstateq = 0;
        this.selectedcityq = 0;
        this.selectedschoolq = 0;
        this.selectedstudentq = 0;
        this.selectedclassq = 0;
        this.selectedstreamq = 0;
        this.selectedstudentq = 0;
        this.SelectedDate21 = null;
        this.SelectedEndDate22 = null;
        this.GetQueryDetails = [];
    };
    ReportManager.prototype.ResetSummer = function () {
        this.selectedcountry = 0;
        this.location = 0;
        this.city = 0;
        this.univercity = 0;
        this.selectedinterest = 0;
        this.SelectedDate19 = null;
        this.SelectedEndDate20 = null;
        this.GetSummerSchoolDetails = [];
    };
    ReportManager.prototype.OnSummerClear = function () {
        this.SelectedDate17 = null;
        this.SelectedEndDate18 = null;
        this.AppDownloaderData = [];
    };
    ReportManager.prototype.ResetScholarship = function () {
        this.selectedclassi = 0;
        this.selectedstreami = 0;
        this.SelectedDate13 = null;
        this.SelectedEndDate14 = null;
        this.GetScholarshipDetails = [];
    };
    ReportManager.prototype.ResetEntrance = function () {
        this.selectedclassj = 0;
        this.selectedstreamj = 0;
        this.SelectedDate15 = null;
        this.SelectedEndDate16 = null;
        this.GetEntranceExamDetails = [];
    };
    ReportManager.prototype.onClear = function () {
        this.SelectedDate = null;
        this.SelectedEndDate = null;
        this.SelectedDate1 = null;
        this.SelectedEndDate1 = null;
        this.SelectedDate2 = null;
        this.SelectedEndDate2 = null;
        this.SelectedDate3 = null;
        this.SelectedEndDate3 = null;
        this.s_date = null;
        this.e_date = null;
    };
    ReportManager.prototype.Reset = function () {
        this.selectedstate = 0;
        this.selectedschool = 0;
        this.selectedcity = 0;
        this.selectedclass = 0;
        this.selectedstream = 0;
        this.SelectedDate5 = null;
        this.SelectedEndDate6 = null;
        this.Getstudentdetails = [];
        //this.SubscribedButNot(3);
    };
    ReportManager.prototype.ResetFreeUser = function () {
        this.selectedstatef = 0;
        this.selectedschoolf = 0;
        this.selectedcityf = 0;
        this.selectedclassf = 0;
        this.selectedstreamf = 0;
        this.SelectedDate7 = null;
        this.SelectedEndDate8 = null;
        this.GetFreeUserDetails = [];
        //this.SubscribedButNot(3);
    };
    ReportManager.prototype.RestNotSub = function () {
        this.selectedstateg = 0;
        this.selectedschoolg = 0;
        this.selectedcityg = 0;
        this.selectedclassg = 0;
        this.selectedstreamg = 0;
        this.SelectedDate9 = null;
        this.SelectedEndDate10 = null;
        this.GetClickPaidNotSub = [];
    };
    ReportManager.prototype.RestSubscribed = function () {
        this.selectedstateh = 0;
        this.selectedschoolh = 0;
        this.selectedcityh = 0;
        this.selectedclassh = 0;
        this.selectedstreamh = 0;
        this.SelectedDate11 = null;
        this.SelectedEndDate12 = null;
        this.GetSubscribed = [];
    };
    ReportManager = __decorate([
        core_1.Component({
            selector: 'app-report',
            templateUrl: './report.component.html',
            styleUrls: ['./report.css'],
            providers: [{ provide: ng_bootstrap_1.NgbDateAdapter, useClass: ng_bootstrap_1.NgbDateNativeAdapter }, ng_bootstrap_1.NgbTimepickerConfig]
        }),
        __metadata("design:paramtypes", [http_1.HttpClient, router_1.Router, angular_2_local_storage_1.LocalStorageService, ngx_toastr_1.ToastrService, ngx_ui_loader_1.NgxUiLoaderService, ng_bootstrap_1.NgbTimepickerConfig, ng_bootstrap_1.NgbDatepickerConfig])
    ], ReportManager);
    return ReportManager;
}());
exports.ReportManager = ReportManager;
//# sourceMappingURL=report.component.js.map