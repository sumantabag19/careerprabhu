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
var SubscriptionManager = /** @class */ (function () {
    function SubscriptionManager(http, router, localstorage, toaster, loader, config, config1) {
        this.http = http;
        this.router = router;
        this.localstorage = localstorage;
        this.toaster = toaster;
        this.loader = loader;
        this.config1 = config1;
        this.page = 0;
        this.pageSize = 10;
        this.Subscriptionid = 0;
        this.StateIds = "";
        this.CityIds = "";
        this.SchoolIds = "";
        this.ClassId = 0;
        this.StreamId = 0;
        this.StudentId = 0;
        this.Message = "";
        this.IsParent = false;
        this.IsStudent = false;
        this.IsSchool = false;
        this.SubscriptionData = [];
        this.Details = {};
        this.StateData = [];
        this.CityData = [];
        this.SchoolData = [];
        this.StudentData = [];
        this.ClassData = [];
        this.ButtonText = 'Save';
        this.SelectedStudent = [];
        this.SelectedStream = [];
        this.SelectedClass = [];
        this.AllState = false;
        this.AllCity = false;
        this.AllSchool = false;
        this.ShowDiv = false;
        this.HeaderData = [];
        this.GetSaveData = [];
        this.EditSubsscriptionData = [];
        this.subscriptiondata = [];
        this.schid = "";
        this.showstream = 1;
        this.testimonial = "";
        this.Detail = [];
        config.seconds = false;
        config.spinners = false;
        config.meridian = true;
        var current = new Date();
        config1.minDate = {
            year: current.getFullYear(), month: current.getMonth() + 1, day: current.getDate()
        };
        //config.maxDate = { year: 2099, month: 12, day: 31 };
        config1.outsideDays = 'hidden';
    }
    SubscriptionManager.prototype.ngOnInit = function () {
        this.GetData();
    };
    //Get Saved subscription data in table 
    SubscriptionManager.prototype.GetSavedData = function () {
        var _this = this;
        debugger;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.http.get('api/Subscription/getsubscriptiondata', options).subscribe(function (data) {
            debugger;
            //this.Detail = data;
            _this.GetSaveData = data;
            for (var i = 0; i < _this.GetSaveData.length; i++) {
                if (_this.GetSaveData[i].State == "") {
                    _this.GetSaveData[i].City = "N/A";
                    _this.GetSaveData[i].School = "N/A";
                    _this.GetSaveData[i].State = "N/A";
                }
            }
            //start
            var state;
            var city;
            var school;
            debugger;
            _this.GetSaveData = data;
            for (var i = 0; i < _this.GetSaveData.length; i++) {
                var statename = "";
                var cityname = "";
                var schoolname = "";
                //for (var j = 0; j < this.GetSaveData[i].State.length; j++) {
                state = _this.GetSaveData[i].State.split(",");
                city = _this.GetSaveData[i].City.split(",");
                school = _this.GetSaveData[i].School.split(",");
                //}
                //state
                if (state == "N/A") {
                    _this.GetSaveData[i].State = "N/A";
                    _this.GetSaveData[i].City = "N/A";
                    _this.GetSaveData[i].School = "N/A";
                }
                else {
                    for (var k = 0; k < state.length; k++) {
                        for (var l = 0; l < _this.StateData.length; l++) {
                            if (state[k] == _this.StateData[l].stateId) {
                                if (k > 0) {
                                    statename = statename + ", " + _this.StateData[l].statename;
                                }
                                else {
                                    statename = statename + _this.StateData[l].statename;
                                }
                            }
                        }
                    }
                    //city
                    for (var k = 0; k < city.length; k++) {
                        for (var l = 0; l < _this.CityData.length; l++) {
                            if (city[k] == _this.CityData[l].cityid) {
                                if (k > 0) {
                                    cityname = cityname + ", " + _this.CityData[l].cityname;
                                }
                                else {
                                    cityname = cityname + _this.CityData[l].cityname;
                                }
                            }
                        }
                    }
                    //school
                    for (var k = 0; k < school.length; k++) {
                        for (var l = 0; l < _this.SchoolData.length; l++) {
                            if (school[k] == _this.SchoolData[l].schoolid) {
                                if (k > 0) {
                                    schoolname = schoolname + ", " + _this.SchoolData[l].schoolname;
                                }
                                else {
                                    schoolname = schoolname + _this.SchoolData[l].schoolname;
                                }
                            }
                        }
                    }
                    _this.GetSaveData[i].State = statename;
                    _this.GetSaveData[i].City = cityname;
                    _this.GetSaveData[i].School = schoolname;
                }
            }
            //end
            _this.HeaderData = Object.keys(_this.GetSaveData[0]);
        });
    };
    //Edit Subscription Data 
    SubscriptionManager.prototype.EditData = function (i, SubscriptionId) {
        //this.SelectAllState();
        //this.SelectedState();
        var _this = this;
        //this.SelectAllCity();
        //this.SelectedCity();
        //this.SelectAllSchool();
        //this.SelectedSchool();
        this.GetData();
        this.ButtonText = 'Update';
        var index = i;
        var SubscriptionId = SubscriptionId;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.http.get('api/Subscription/editsubscription?SubscriptionId=' + SubscriptionId, options).subscribe(function (data) {
            debugger;
            _this.EditSubsscriptionData = data;
            _this.Subscriptionid = _this.EditSubsscriptionData.data[0].SubscriptionId;
            _this.IsSchool = _this.EditSubsscriptionData.data[0].IsSchool == 0 ? false : true;
            _this.IsParent = _this.EditSubsscriptionData.data[0].IsParent == 0 ? false : true;
            _this.IsStudent = _this.EditSubsscriptionData.data[0].IsStudent == 0 ? false : true;
            _this.SelectedClass = _this.EditSubsscriptionData.data[0].classid;
            _this.SelectedStream = _this.EditSubsscriptionData.data[0].streamname;
            _this.testimonial = _this.EditSubsscriptionData.data[0].testimonial;
            var mdate = new Date(_this.EditSubsscriptionData.data[0].startdate);
            var edate = new Date(_this.EditSubsscriptionData.data[0].enddate);
            _this.startdate = mdate;
            _this.enddate = edate;
            var mtime = _this.EditSubsscriptionData.data[0].starttime.split(":");
            var etime = _this.EditSubsscriptionData.data[0].endtime.split(":");
            _this.starttime = { hour: parseInt(mtime[0]), minute: parseInt(mtime[1]), second: parseInt(mtime[2]) };
            _this.endtime = { hour: parseInt(etime[0]), minute: parseInt(etime[1]), second: parseInt(etime[2]) };
            //this.GetData();
            //this.StateIds = this.EditSubsscriptionData.data[0].stateid;
            //var tmpstateId = this.EditSubsscriptionData.data[0].stateid.split(",");
            //for (var i = 0; i < this.StateData.length; i++) {
            //  for (var j = 0; j < tmpstateId.length; j++) {
            //    if (this.StateData[i].stateId == tmpstateId[j]) {
            //      this.StateData[i].selected = true;
            //    }
            //  }
            //}
            // this.onChangeOfMultiCheckBoxToGetCity();
            //this.CityIds = this.EditSubsscriptionData.data[0].cityid;
            //var tmpcityid = this.EditSubsscriptionData.data[0].cityid.split(",");
            //for (var i = 0; i < this.CityData.length; i++) {
            //  for (var j = 0; j < tmpcityid.length; j++) {
            //    if (this.CityData[i].cityid == tmpcityid[j]) {
            //      this.CityData[i].selected = true;
            //    }
            //  }
            //}
            //this.onChangeOfMultiCheckBoxToGetSchool();
            //this.SchoolIds = this.EditSubsscriptionData.data[0].schoolid;
            //var tmpschoolid = this.EditSubsscriptionData.data[0].schoolid.split(",");
            //for (var i = 0; i < this.SchoolData.length; i++) {
            //  for (var j = 0; j < tmpschoolid.length; j++) {
            //    if (this.SchoolData[i].schoolid == tmpschoolid[j]) {
            //      this.SchoolData[i].selected = true;
            //    }
            //  }
            //}
            //this.SelectedSchool();
            if (_this.IsSchool == true) {
                for (var i = 0; i < _this.CityData.length; i++) {
                    if (_this.CityData.cityid == _this.EditSubsscriptionData.data[0].CityId) {
                        _this.CityData.selected = _this.EditSubsscriptionData.data[0].CityId;
                    }
                }
                _this.ShowDiv = false;
            }
            if (_this.IsParent == true || _this.IsStudent == true) {
                _this.ShowDiv = true;
            }
            _this.onChangeOfdropdown();
            _this.SelectedStudent = _this.EditSubsscriptionData.data[0].studentid;
            _this.Message = _this.EditSubsscriptionData.data[0].Message;
        });
    };
    //Get all data for bind dropdowns
    SubscriptionManager.prototype.GetData = function () {
        var _this = this;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.http.get('api/Subscription/GetData', options).subscribe(function (data) {
            debugger;
            _this.Details = data;
            if (_this.Details.status = true) {
                _this.StateData = _this.Details.statedata;
                _this.CityData = _this.Details.citydata;
                _this.SchoolData = _this.Details.schooldata;
                _this.ClassData = _this.Details.classdata;
                //this.StudentData = this.Details.studentdata;
                _this.GetSavedData();
            }
            else {
                _this.toaster.error(_this.Details.message.toString(), '', { easeTime: 1000, timeOut: 3000 });
            }
            if (_this.EditSubsscriptionData.Status == true) {
                _this.StateIds = _this.EditSubsscriptionData.data[0].stateid;
                var tmpstateId = _this.EditSubsscriptionData.data[0].stateid.split(",");
                for (var i = 0; i < _this.StateData.length; i++) {
                    for (var j = 0; j < tmpstateId.length; j++) {
                        if (_this.StateData[i].stateId == tmpstateId[j]) {
                            _this.StateData[i].selected = true;
                        }
                    }
                }
                _this.onChangeOfMultiCheckBoxToGetCity();
                // this.onChangeOfMultiCheckBoxToGetSchool();
            }
            else {
            }
            //if (this.EditSubsscriptionData.Status == true) {
            //    this.StateIds = this.EditSubsscriptionData.data[0].stateid;
            //    var tmpstateId = this.EditSubsscriptionData.data[0].stateid.split(",");
            //    for (var i = 0; i < this.StateData.length; i++) {
            //        for (var j = 0; j < tmpstateId.length; j++) {
            //            if (this.StateData[i].stateId == tmpstateId[j]) {
            //                this.StateData[i].selected = true;
            //            }
            //        }
            //    }
            //     this.onChangeOfMultiCheckBoxToGetSchool();
            //}
            //else {
            //}
        });
    };
    //On change of class Students are bind
    SubscriptionManager.prototype.onChangeOfdropdown = function () {
        var _this = this;
        debugger;
        var classid = 0;
        var stream = "";
        if (this.SelectedClass == undefined || this.SelectedClass == 0) {
            classid = 0;
            this.SelectedStream = 0;
        }
        else if (this.SelectedClass == 1 || this.SelectedClass == 2 || this.SelectedClass == 3) {
            this.showstream = 0;
            this.SelectedStream = 0;
        }
        else {
            this.showstream = 1;
            classid = parseInt(this.SelectedClass);
        }
        if (this.SelectedStream == "" || this.SelectedStream == undefined || this.SelectedStream == null) {
            stream = "";
        }
        else {
            stream = this.SelectedStream;
        }
        if ((this.SchoolIds.length) > 0) {
            this.SelectedStudent = 0;
        }
        else {
            this.schid = this.SchoolIds;
        }
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.http.get('api/Subscription/GetFilterData?ClassId=' + classid + '&Stream=' + stream + '&School=' + this.schid, options).subscribe(function (data) {
            debugger;
            _this.GetFilterData = data;
            if (_this.GetFilterData.Status == true) {
                _this.StudentData = _this.GetFilterData.classData;
            }
            else {
                _this.StudentData = [];
            }
        }, function (err) {
        });
    };
    //Show div on change of check box
    SubscriptionManager.prototype.onChangeOfCheckBox = function () {
        debugger;
        if (this.IsParent == true || this.IsStudent == true) {
            this.ShowDiv = true;
            this.SelectedClass = 0;
            this.SelectedStream = 0;
            this.SelectedStudent = 0;
        }
        else {
            this.ShowDiv = false;
        }
    };
    //Select All function for State
    SubscriptionManager.prototype.SelectAllState = function () {
        debugger;
        this.StateIds = "";
        if (this.AllState === true) {
            for (var i = 0; i < this.StateData.length; i++) {
                this.StateData[i].selected = true;
                if (this.StateIds === '') {
                    this.StateIds = this.StateData[i].stateId;
                }
                else {
                    this.StateIds = this.StateIds + ',' + this.StateData[i].StateData;
                }
            }
        }
        else {
            for (var i = 0; i < this.StateData.length; i++) {
                this.StateData[i].selected = false;
            }
        }
    };
    //convert Selected state in String format
    SubscriptionManager.prototype.SelectedState = function () {
        this.StateIds = "";
        var count = 0;
        for (var i = 0; i < this.StateData.length; i++) {
            if (this.StateData[i].selected === true) {
                if (this.StateIds === '') {
                    this.StateIds = this.StateData[i].stateId;
                    count++;
                }
                else {
                    this.StateIds = this.StateIds + ',' + this.StateData[i].stateId;
                    count++;
                }
            }
        }
        if (this.StateData.length === count) {
            this.AllState = true;
        }
        else {
            this.AllState = false;
        }
    };
    //Select All function for City
    SubscriptionManager.prototype.SelectAllCity = function () {
        debugger;
        this.CityIds = "";
        if (this.AllCity === true) {
            for (var i = 0; i < this.CityData.length; i++) {
                this.CityData[i].selected = true;
                if (this.CityIds === '') {
                    this.CityIds = this.CityData[i].cityid;
                }
                else {
                    this.CityIds = this.CityIds + ',' + this.CityData[i].cityid;
                }
            }
        }
        else {
            for (var i = 0; i < this.CityData.length; i++) {
                this.CityData[i].selected = false;
            }
        }
    };
    //convert Selected city in String format
    SubscriptionManager.prototype.SelectedCity = function () {
        debugger;
        this.CityIds = "";
        var count = 0;
        for (var i = 0; i < this.CityData.length; i++) {
            if (this.CityData[i].selected === true) {
                if (this.CityIds === '') {
                    this.CityIds = this.CityData[i].cityid;
                    count++;
                }
                else {
                    this.CityIds = this.CityIds + ',' + this.CityData[i].cityid;
                    count++;
                }
            }
        }
        if (this.CityData.length === count) {
            this.AllCity = true;
        }
        else {
            this.AllCity = false;
        }
    };
    //Select All function for City
    SubscriptionManager.prototype.SelectAllSchool = function () {
        debugger;
        this.SchoolIds = "";
        if (this.AllSchool === true) {
            for (var i = 0; i < this.SchoolData.length; i++) {
                this.SchoolData[i].selected = true;
                if (this.SchoolIds === '') {
                    this.SchoolIds = this.SchoolData[i].schoolid;
                }
                else {
                    this.SchoolIds = this.SchoolIds + ',' + this.SchoolData[i].schoolid;
                }
            }
        }
        else {
            for (var i = 0; i < this.SchoolData.length; i++) {
                this.SchoolData[i].selected = false;
            }
        }
    };
    //convert Selected city in String format
    SubscriptionManager.prototype.SelectedSchool = function () {
        this.SchoolIds = "";
        var count = 0;
        for (var i = 0; i < this.SchoolData.length; i++) {
            if (this.SchoolData[i].selected === true) {
                if (this.SchoolIds === '') {
                    this.SchoolIds = this.SchoolData[i].schoolid;
                    count++;
                }
                else {
                    this.SchoolIds = this.SchoolIds + ',' + this.SchoolData[i].schoolid;
                    count++;
                }
            }
        }
        if (this.SchoolData.length === count) {
            this.AllSchool = true;
        }
        else {
            this.AllSchool = false;
        }
    };
    //Multi check box filter
    SubscriptionManager.prototype.onChangeOfMultiCheckBoxToGetCity = function () {
        var _this = this;
        debugger;
        if (this.StateIds == null) {
            this.StateIds = "";
        }
        if (this.CityIds == null) {
            this.CityIds = "";
        }
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.http.get('api/Subscription/getcityfilter?StateId=' + this.StateIds, options).subscribe(function (data) {
            _this.GetCityData = data;
            if (_this.GetCityData.Status == true) {
                _this.CityData = _this.GetCityData.citydata;
            }
            if (_this.EditSubsscriptionData.Status == true) {
                _this.CityIds = _this.EditSubsscriptionData.data[0].cityid;
                var tmpcityid = _this.EditSubsscriptionData.data[0].cityid.split(",");
                for (var i = 0; i < _this.CityData.length; i++) {
                    for (var j = 0; j < tmpcityid.length; j++) {
                        if (_this.CityData[i].cityid == tmpcityid[j]) {
                            _this.CityData[i].selected = true;
                        }
                    }
                }
                _this.onChangeOfMultiCheckBoxToGetSchool();
            }
            else {
            }
        }, function (err) {
        });
    };
    SubscriptionManager.prototype.onChangeOfMultiCheckBoxToGetSchool = function () {
        var _this = this;
        debugger;
        if (this.StateIds == null) {
            this.StateIds = "";
        }
        if (this.CityIds == null) {
            this.CityIds = "";
        }
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.http.get('api/Subscription/getschoolfilter?StateId=' + this.StateIds + '&CityId=' + this.CityIds, options).subscribe(function (data) {
            _this.GetSchoolData = data;
            if (_this.GetSchoolData.Status == true) {
                _this.SchoolData = _this.GetSchoolData.schooldata;
            }
            if (_this.GetCityData.Status == true) {
                _this.CityData = _this.GetCityData.citydata;
            }
            if (_this.EditSubsscriptionData.Status == true) {
                _this.SchoolIds = _this.EditSubsscriptionData.data[0].schoolid;
                var tmpschoolid = _this.EditSubsscriptionData.data[0].schoolid.split(",");
                for (var i = 0; i < _this.SchoolData.length; i++) {
                    for (var j = 0; j < tmpschoolid.length; j++) {
                        if (_this.SchoolData[i].schoolid == tmpschoolid[j]) {
                            _this.SchoolData[i].selected = true;
                        }
                    }
                }
            }
            else {
            }
        }, function (err) {
        });
    };
    //Delete Subscription Data
    SubscriptionManager.prototype.DeleteData = function (i, id) {
        var _this = this;
        debugger;
        if (this.StateIds == null) {
            this.StateIds = "";
        }
        if (this.CityIds == null) {
            this.CityIds = "";
        }
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        //this.http.get('api/Subscription/deletesubscription?SubscriptionId=' + id + '&createdBy=' + this.localstorage.get("userid"), options).subscribe(
        //  (data) => {
        //    //  this.GetSavedData();
        //    this.subscriptiondata = data;
        //    if (this.subscriptiondata.status == true) {
        //      Swal.fire("", "Delete successfully", "success");
        //      this.GetSavedData();
        //      return;
        //    }
        sweetalert2_1.default.fire({
            //title: 'Confirmation',
            text: 'Are you sure to delete this record?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No'
        }).then(function (result) {
            if (result.value) {
                _this.http.get('api/Subscription/deletesubscription?SubscriptionId=' + id + '&createdBy=' + _this.localstorage.get("userid"), options).subscribe(function (data) {
                    //  this.GetSavedData();
                    _this.subscriptiondata = data;
                    if (_this.subscriptiondata.status == true) {
                        sweetalert2_1.default.fire("", "Deleted Successfully", "success");
                        _this.GetSavedData();
                        return;
                    }
                });
            }
        });
    };
    //Save Subscription Details
    SubscriptionManager.prototype.onSubmit = function () {
        var _this = this;
        debugger;
        if (this.startdate == null || this.startdate == undefined) {
            sweetalert2_1.default.fire("", "Please enter start date ", "error");
            return;
        }
        if (this.enddate == null || this.enddate == undefined) {
            sweetalert2_1.default.fire("", "Please enter end date ", "error");
            return;
        }
        if (this.starttime == null || this.starttime == undefined) {
            sweetalert2_1.default.fire("", "Please enter start time", "error");
            return;
        }
        if (this.endtime == null || this.endtime == undefined) {
            sweetalert2_1.default.fire("", "Please enter end time", "error");
            return;
        }
        if (this.testimonial == "" || this.testimonial == undefined) {
            sweetalert2_1.default.fire("", "Please enter testimonials", "error");
            return;
        }
        this.s_date = this.startdate.toISOString().slice(0, 10);
        this.e_date = this.enddate.toISOString().slice(0, 10);
        this.todaydate = new Date().toISOString().slice(0, 10);
        var st_time = this.starttime.hour.toString() + ':' + this.starttime.minute.toString() + ':' + this.starttime.second.toString();
        var end_time = this.endtime.hour.toString() + ':' + this.endtime.minute.toString() + ':' + this.endtime.second.toString();
        if (this.s_date == this.e_date) {
            if (this.s_date < this.todaydate) {
                sweetalert2_1.default.fire("", "Start date should contains future date", "error");
                return;
            }
            if (this.e_date < this.todaydate) {
                sweetalert2_1.default.fire("", "End date should contain future date", "error");
                return;
            }
            if ((this.starttime.hour > this.endtime.hour) || ((this.starttime.hour == this.endtime.hour && this.starttime.minute >= this.endtime.minute))) {
                sweetalert2_1.default.fire("", "Start time always less then end time", "error");
                return;
            }
        }
        else {
            if (this.s_date < this.todaydate) {
                sweetalert2_1.default.fire("", "Start date should contains future date", "error");
                return;
            }
            if (this.e_date < this.todaydate) {
                sweetalert2_1.default.fire("", "End date should contain future date", "error");
                return;
            }
            if (this.s_date > this.e_date) {
                sweetalert2_1.default.fire("", "End date always greater then start date", "error");
                return;
            }
        }
        if (this.StateIds == '') {
            this.StateIds == '';
        }
        if (this.CityIds == '') {
            this.CityIds == '';
        }
        if (this.SchoolIds == '') {
            this.SchoolIds == '';
        }
        if (this.Message == '' || this.Message == undefined) {
            sweetalert2_1.default.fire("", "Please enter message", "error");
            return;
        }
        if (this.IsParent == false && this.IsStudent == false && this.IsSchool == false) {
            sweetalert2_1.default.fire("", "Please choose an option", "error");
            return;
        }
        if (this.IsParent == true || this.IsStudent == true) {
            if (this.SelectedClass == 0 || this.SelectedClass == 1 || this.SelectedClass == 2 || this.SelectedClass == 3 || this.SelectedClass == undefined) {
                this.SelectedStream = 0;
            }
            else {
                if (this.SelectedStream == 0 || this.SelectedStream == undefined) {
                    sweetalert2_1.default.fire("", "Please select stream", "error");
                    return;
                }
            }
            //if (this.SelectedStudent.studentid == 0 || this.SelectedStudent == undefined) {
            //  Swal.fire("", "Please select student", "error");
            //  return;
            //}
        }
        else {
            this.SelectedClass = 0;
            this.SelectedStream = 0;
            this.SelectedStudent = 0;
        }
        var data;
        if (this.ButtonText == "Update") {
            var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
            var options = { headers: headers };
            debugger;
            data =
                {
                    "SubscriptionId": this.Subscriptionid,
                    "stateid": this.StateIds,
                    "cityid": this.CityIds,
                    "SchoolId": this.SchoolIds,
                    "isschool": this.IsSchool == true ? 1 : 0,
                    "isparent": this.IsParent == true ? 1 : 0,
                    "isstudents": this.IsStudent == true ? 1 : 0,
                    "classid": this.SelectedClass,
                    "streamid": this.SelectedStream,
                    "studentid": this.SelectedStudent,
                    "message": this.Message,
                    "startdate": this.startdate,
                    "enddate": this.enddate,
                    "testimonials": this.testimonial,
                    "starttime": st_time,
                    "endtime": end_time,
                    "createdby": parseInt(this.localstorage.get("userid"))
                };
            var body = JSON.stringify(data);
            debugger;
            this.http.post('api/Subscription/updatesubscription', body, options).subscribe(function (data) {
                debugger;
                _this.SubscriptionData = data;
                if (_this.SubscriptionData.Status == true) {
                    sweetalert2_1.default.fire("", "Updated Successfully", "success");
                    _this.onClear();
                    _this.GetSavedData();
                    return;
                }
            });
        }
        else {
            var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
            var options = { headers: headers };
            data =
                {
                    "acttype": "save",
                    "StateId": this.StateIds,
                    "CityId": this.CityIds,
                    "SchoolId": this.SchoolIds,
                    "ClassId": this.SelectedClass,
                    "StreamId": this.SelectedStream,
                    "StudentId": this.SelectedStudent,
                    "Message": this.Message,
                    "startdate": this.startdate,
                    "enddate": this.enddate,
                    "testimonials": this.testimonial,
                    "starttime": st_time,
                    "endtime": end_time,
                    "IsParent": this.IsParent == true ? 1 : 0,
                    "IsStudents": this.IsStudent == true ? 1 : 0,
                    "IsSchool": this.IsSchool == true ? 1 : 0,
                    "createdBy": parseInt(this.localstorage.get("userid"))
                };
            var body = JSON.stringify(data);
            this.http.post('api/Subscription/SaveSubscription', body, options).subscribe(function (data) {
                _this.SubscriptionData = data;
                if (_this.SubscriptionData.Status == true) {
                    sweetalert2_1.default.fire("", "Saved Successfully", "success");
                    _this.onClear();
                    _this.GetSavedData();
                    return;
                }
            });
        }
    };
    //Reset All Fields 
    SubscriptionManager.prototype.onClear = function () {
        debugger;
        this.ButtonText = 'Save';
        this.Message = "";
        this.IsParent = false;
        this.IsSchool = false;
        this.IsStudent = false;
        this.SelectedClass = "0";
        this.SelectedStream = "0";
        this.SelectedStudent = "0";
        this.ShowDiv = false;
        this.startdate = null;
        this.enddate = null;
        this.starttime = null;
        this.endtime = null;
        this.testimonial = "";
        for (var i = 0; i < this.StateData.length; i++) {
            this.StateData[i].selected = false;
        }
        for (var i = 0; i < this.CityData.length; i++) {
            this.CityData[i].selected = false;
        }
        for (var i = 0; i < this.SchoolData.length; i++) {
            this.SchoolData[i].selected = false;
        }
    };
    SubscriptionManager = __decorate([
        core_1.Component({
            selector: 'app-subscription',
            templateUrl: './subscription.component.html',
            styleUrls: ['./subscription.component.css'],
            providers: [{ provide: ng_bootstrap_1.NgbDateAdapter, useClass: ng_bootstrap_1.NgbDateNativeAdapter }, ng_bootstrap_1.NgbTimepickerConfig]
        }),
        __metadata("design:paramtypes", [http_1.HttpClient, router_1.Router, angular_2_local_storage_1.LocalStorageService, ngx_toastr_1.ToastrService, ngx_ui_loader_1.NgxUiLoaderService, ng_bootstrap_1.NgbTimepickerConfig, ng_bootstrap_1.NgbDatepickerConfig])
    ], SubscriptionManager);
    return SubscriptionManager;
}());
exports.SubscriptionManager = SubscriptionManager;
//# sourceMappingURL=subscription.component.js.map