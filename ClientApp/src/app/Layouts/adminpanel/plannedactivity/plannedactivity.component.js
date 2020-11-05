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
var platform_browser_1 = require("@angular/platform-browser");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var SafePipe = /** @class */ (function () {
    function SafePipe(sanitizer) {
        this.sanitizer = sanitizer;
    }
    SafePipe.prototype.transform = function (value, type) {
        console.log("Pipe Called!");
        switch (type) {
            case 'html': return this.sanitizer.bypassSecurityTrustHtml(value);
            case 'style': return this.sanitizer.bypassSecurityTrustStyle(value);
            case 'script': return this.sanitizer.bypassSecurityTrustScript(value);
            case 'url': return this.sanitizer.bypassSecurityTrustUrl(value);
            case 'resourceUrl': return this.sanitizer.bypassSecurityTrustResourceUrl(value);
            default: throw new Error("Invalid safe type specified: " + type);
        }
    };
    SafePipe = __decorate([
        core_1.Pipe({
            name: 'safe'
        }),
        __metadata("design:paramtypes", [platform_browser_1.DomSanitizer])
    ], SafePipe);
    return SafePipe;
}());
exports.SafePipe = SafePipe;
var PlannedaActivityManager = /** @class */ (function () {
    function PlannedaActivityManager(http, router, localstorage, toaster, Loader, renderer, config, config1) {
        this.http = http;
        this.router = router;
        this.localstorage = localstorage;
        this.toaster = toaster;
        this.Loader = Loader;
        this.renderer = renderer;
        this.config1 = config1;
        // public page: number = 0;
        //public pageSize: number = 10;
        this.SelectedTopic = 0;
        this.videofile = [];
        this.imagefile = [];
        this.TopicData = [];
        this.statedat = [];
        this.StateData = [];
        this.citdata = [];
        this.CityData = [];
        this.selectedstate = 0;
        this.selectedcity = 0;
        this.selectedschool = 0;
        this.schdata = [];
        this.SchoolData = [];
        this.Detail = [];
        this.SelectedClass = 0;
        this.ClassData = [];
        this.topicid = 0;
        this.SelectedStream = 0;
        this.StreamData = [];
        this.ButtonText = 'Save';
        this.HeaderData = [];
        this.GetSaveData = [];
        this.SelectedVideo = "";
        this.SelectedImage = "";
        this.Id = 0;
        this.search = "";
        this.meridian = true;
        this.GetEditedData = [];
        this.DeletedData = [];
        this.PlannedActivityData = [];
        this.orgVideoName = "";
        this.orgImageName = "";
        this.ClassDetails = [];
        this.StreamDetails = [];
        this.videouploaded = "0";
        this.videouploaddiv = false;
        this.video = "";
        this.image = "";
        this.vname = false;
        this.display = "none";
        this.url = "";
        this.Details = [];
        this.classid = "";
        this.AllClass = false;
        this.streamid = "";
        this.AllStream = false;
        this.checklink = false;
        this.Selecteduser = 0;
        this.UserDetails = [];
        this.UserData = [];
        this.showstream = 0;
        //public publish: number = 0;
        this.checklink_v = false;
        //public publish: boolean = false;
        this.publish = 0;
        this.IsSchool = false;
        this.chatlink = "";
        this.StateIds = "";
        this.AllState = false;
        this.CityIds = "";
        this.AllCity = false;
        this.SchoolIds = "";
        this.AllSchool = false;
        this.GetSchoolData = [];
        this.GetCityData = [];
        this.selectedwebtype = 0;
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
    PlannedaActivityManager.prototype.ngOnInit = function () {
        //this.renderer.setAttribute(this.myDiv.nativeElement, 'innerHTML', this.content);
        this.GetTopic();
        //this.getClass();
        this.GetData();
        //this.BindState();
        this.GetClass();
        this.GetStream();
        this.BindUser();
        this.GetData1();
    };
    PlannedaActivityManager.prototype.BindWebinar = function (id) {
        var _this = this;
        debugger;
        // this.GetData1();
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.Detail = [];
        this.http.get('api/Plannedactivity/GetSavedDataFilter?acttype=' + 'GetSavedData' + '&id=' + id, options).subscribe(function (data) {
            debugger;
            _this.Detail = data;
            _this.GetSaveData = _this.Detail.data;
            //if (this.GetSaveData[0].Image == "") {
            //  this.checklink = true;
            //}
            //else {
            //  this.checklink = false;
            //}
            var state;
            var city;
            var school;
            var a;
            var b;
            debugger;
            //this.GetSaveData = data;
            for (var i = 0; i < _this.GetSaveData.length; i++) {
                var classname = "";
                var streamname = "";
                for (var j = 0; j < _this.GetSaveData[i].Class.length; j++) {
                    a = _this.GetSaveData[i].Class.split(",");
                    b = _this.GetSaveData[i].Stream.split(",");
                }
                if (_this.ClassData != undefined) {
                    for (var k = 0; k < a.length; k++) {
                        for (var l = 0; l < _this.ClassData.length; l++) {
                            if (a[k] == _this.ClassData[l].classid) {
                                if (k > 0) {
                                    classname = classname + ", " + _this.ClassData[l].classname;
                                }
                                else {
                                    classname = classname + _this.ClassData[l].classname;
                                }
                            }
                        }
                    }
                }
                if (_this.StreamData != undefined) {
                    for (var k = 0; k < a.length; k++) {
                        for (var l = 0; l < _this.StreamData.length; l++) {
                            if (b[k] == _this.StreamData[l].streamid) {
                                if (k > 0) {
                                    streamname = streamname + ", " + _this.StreamData[l].streamname;
                                }
                                else {
                                    streamname = streamname + _this.StreamData[l].streamname;
                                }
                            }
                        }
                    }
                }
                _this.GetSaveData[i].Class = classname;
                if (classname == "8th" || classname == "9th" || classname == "10th") {
                    _this.GetSaveData[i].Stream = "";
                }
                else {
                    _this.GetSaveData[i].Stream = streamname;
                }
            }
            for (var i = 0; i < _this.GetSaveData.length; i++) {
                var statename = "";
                var cityname = "";
                var schoolname = "";
                //for (var j = 0; j < this.GetSaveData[i].State.length; j++) {
                state = _this.GetSaveData[i].state.split(",");
                city = _this.GetSaveData[i].city.split(",");
                school = _this.GetSaveData[i].school.split(",");
                //}
                //state
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
                for (var k = 0; k < _this.SchoolData.length; k++) {
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
                _this.GetSaveData[i].statename = statename;
                _this.GetSaveData[i].cityname = cityname;
                _this.GetSaveData[i].schoolname = schoolname;
            }
            // this.HeaderData = Object.keys(this.GetSaveData[0]);
        });
    };
    PlannedaActivityManager.prototype.GetData1 = function () {
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
            }
            else {
                _this.toaster.error(_this.Details.message.toString(), '', { easeTime: 1000, timeOut: 3000 });
            }
            //if (this.GetEditedData.Status != undefined) {
            //  if (this.GetEditedData.Status == true) {
            //    this.StateIds = this.GetEditedData.data.stateid;
            //    var tmpstateId = this.GetEditedData.data.stateid.split(",");
            //    for (var i = 0; i < this.StateData.length; i++) {
            //      for (var j = 0; j < tmpstateId.length; j++) {
            //        if (this.StateData[i].stateId == tmpstateId[j]) {
            //          this.StateData[i].selected = true;
            //        }
            //      }
            //    }
            //    this.onChangeOfMultiCheckBoxToGetCity();
            //  }
            //  // this.onChangeOfMultiCheckBoxToGetSchool();
            //}
            //else {
            //}
        });
    };
    //pubchange() {
    //  this.model.published = true;
    //  this.publish = 1;
    //}
    //unpubchange() {
    //  debugger;
    //  this.model.unpublished = true;
    //  this.publish = 0;
    //}
    //onChangeOfCheckBox() {
    //  this.IsSchool = true;
    //}
    //Bind User
    PlannedaActivityManager.prototype.BindUser = function () {
        var _this = this;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.http.get('api/Plannedactivity/BindUser', options).subscribe(function (data) {
            debugger;
            _this.UserDetails = data;
            if (_this.UserDetails.status = true) {
                _this.UserData = _this.UserDetails.data;
            }
            else {
                _this.toaster.error(_this.UserDetails.message.toString(), '', { easeTime: 1000, timeOut: 3000 });
            }
        });
    };
    //Get all data for bind dropdowns
    PlannedaActivityManager.prototype.GetTopic = function () {
        var _this = this;
        debugger;
        var stateid = this.selectedstate;
        var cityid = this.selectedcity;
        var schoolid = this.selectedschool;
        var classid = this.SelectedClass;
        var streamid = this.SelectedStream;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.http.get('api/Plannedactivity/GetTopicData?acttype=' + 'Topic', options).subscribe(function (data) {
            debugger;
            _this.Detail = data;
            if (_this.Detail.Status == true) {
                _this.TopicData = _this.Detail.data;
            }
            else {
                _this.toaster.error(_this.Detail.Message.toString(), '', { easeTime: 1000, timeOut: 3000 });
                //this.SelectedTopic = 0;
                _this.TopicData = [];
            }
        });
    };
    PlannedaActivityManager.prototype.BindState = function () {
        var _this = this;
        debugger;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.statedat = [];
        var tmpclass = [];
        this.http.post('api/Plannedactivity/Bindstate', options).subscribe(function (data) {
            _this.statedat = data;
            if (_this.statedat.Status == true) {
                _this.StateData = _this.statedat.data;
            }
            else {
                _this.StateData = _this.statedat.data;
            }
        });
    };
    PlannedaActivityManager.prototype.BindCity = function () {
        var _this = this;
        debugger;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.citdata = [];
        var body = {
            "stateid": this.selectedstate
        };
        var tmpclass = [];
        this.http.post('api/Plannedactivity/BindCity', body, options).subscribe(function (data) {
            _this.citdata = data;
            if (_this.citdata.Status == true) {
                _this.CityData = _this.citdata.data;
            }
            else {
                _this.CityData = _this.citdata.data;
            }
        });
    };
    PlannedaActivityManager.prototype.BindSchool = function () {
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
        this.http.post('api/Plannedactivity/BindSchool', body, options).subscribe(function (data) {
            _this.schdata = data;
            if (_this.schdata.Status == true) {
                _this.SchoolData = _this.schdata.data;
            }
            else {
                _this.SchoolData = _this.schdata.data;
            }
        });
    };
    PlannedaActivityManager.prototype.GetClass = function () {
        var _this = this;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.http.get('api/Plannedactivity/GetClass', options).subscribe(function (data) {
            _this.Details = data;
            if (_this.Details.status == true) {
                _this.ClassData = _this.Details.data;
            }
            else {
                _this.toaster.error(_this.Details.message.toString(), '', { easeTime: 1000, timeOut: 3000 });
            }
        });
    };
    //get stream
    PlannedaActivityManager.prototype.GetStream = function () {
        var _this = this;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.http.get('api/Plannedactivity/getStream', options).subscribe(function (data) {
            _this.StreamDetails = data;
            if (_this.StreamDetails.status == true) {
                _this.StreamData = _this.StreamDetails.data;
                _this.GetData();
            }
            else {
                _this.toaster.error(_this.StreamDetails.message.toString(), '', { easeTime: 1000, timeOut: 3000 });
            }
        });
    };
    //get selected class
    PlannedaActivityManager.prototype.getSelectedClass = function () {
        debugger;
        this.classid = "";
        var count = 0;
        for (var i = 0; i < this.ClassData.length; i++) {
            if (this.ClassData[i].selected === true) {
                if (this.classid === '') {
                    this.classid = this.ClassData[i].classid;
                    count++;
                }
                else {
                    this.classid = this.classid + ',' + this.ClassData[i].classid;
                    count++;
                }
            }
            else {
                this.showstream = 0;
            }
        }
        for (var i = 0; i < this.ClassData.length; i++) {
            if (this.ClassData[i].selected === true) {
                if (this.ClassData[i].classid == 1 || this.ClassData[i].classid == 2 || this.ClassData[i].classid == 3) {
                    this.showstream = 0;
                }
                else {
                    this.showstream = 1;
                    this.GetStream();
                }
            }
            //else {
            //  this.showstream = 0;
            //}
        }
        if (this.ClassData.length === count) {
            this.AllClass = true;
            //this.GetTopic();
        }
        else {
            this.AllClass = false;
            //this.GetTopic();
        }
        //this.GetTopic();
    };
    //get selected stream
    //get stream
    PlannedaActivityManager.prototype.getSelectedStream = function () {
        debugger;
        this.streamid = "";
        var count = 0;
        for (var i = 0; i < this.StreamData.length; i++) {
            if (this.StreamData[i].selected === true) {
                if (this.streamid === '') {
                    this.streamid = this.StreamData[i].streamid;
                    count++;
                }
                else {
                    this.streamid = this.streamid + ',' + this.StreamData[i].streamid;
                    count++;
                }
            }
        }
        if (this.StreamData.length === count) {
            this.AllStream = true;
        }
        else {
            this.AllStream = false;
        }
        // this.GetTopic();
    };
    //Select All function for class
    PlannedaActivityManager.prototype.SelectAllClass = function () {
        debugger;
        this.classid = "";
        if (this.AllClass === true) {
            for (var i = 0; i < this.ClassData.length; i++) {
                this.ClassData[i].selected = true;
                if (this.classid === '') {
                    this.classid = this.ClassData[i].classid;
                }
                else {
                    this.classid = this.classid + ',' + this.ClassData[i].classid;
                }
            }
            this.showstream = 1;
        }
        else {
            for (var i = 0; i < this.ClassData.length; i++) {
                this.ClassData[i].selected = false;
            }
            this.showstream = 0;
        }
        //this.GetTopic();
    };
    //Select All function for stream
    PlannedaActivityManager.prototype.SelectAllStream = function () {
        debugger;
        this.streamid = "";
        if (this.AllStream === true) {
            for (var i = 0; i < this.StreamData.length; i++) {
                this.StreamData[i].selected = true;
                if (this.streamid === '') {
                    this.streamid = this.StreamData[i].streamid;
                }
                else {
                    this.streamid = this.streamid + ',' + this.StreamData[i].streamid;
                }
            }
        }
        else {
            for (var i = 0; i < this.StreamData.length; i++) {
                this.StreamData[i].selected = false;
            }
        }
    };
    //getClass() {
    //  let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    //  let options = { headers: headers };
    //  this.ClassDetails = [];
    //  var a;
    //  var tmpclass: any = [];
    //  this.http.get('api/Plannedactivity/GetClassAndStream?acttype=' + 'Class', options).subscribe(
    //    (data) => {
    //      this.ClassDetails = data;
    //      if (this.ClassDetails.Status == true) {
    //        this.ClassData = this.ClassDetails.data;
    //      }
    //    }
    //  )
    //}
    // for stream data
    //getStream() {
    //  this.SelectedStream = 0;
    //  let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    //  let options = { headers: headers };
    //  this.StreamDetails = [];
    //  var a;
    //  var tmpStream: any = [];
    //  this.http.get('api/Plannedactivity/GetClassAndStream?acttype=' + 'Stream', options).subscribe(
    //    (data) => {
    //      this.StreamDetails = data;
    //      if (this.StreamDetails.Status == true) {
    //        this.StreamData = this.StreamDetails.data;
    //        this.SelectedTopic = 0;
    //      }
    //    }
    //  )
    //}
    //Get Saved Data
    PlannedaActivityManager.prototype.GetData = function () {
        var _this = this;
        debugger;
        //this.GetData1();
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.Detail = [];
        this.http.get('api/Plannedactivity/GetSavedData?acttype=' + 'GetSavedData', options).subscribe(function (data) {
            debugger;
            //this.Loader.stop();
            _this.Detail = data;
            _this.GetSaveData = _this.Detail.data;
            //if (this.GetSaveData[0].Image == "") {
            //  this.checklink = true;
            //}
            //else {
            //  this.checklink = false;
            //}
            var state;
            var city;
            var school;
            var a;
            var b;
            debugger;
            //this.GetSaveData = data;
            for (var i = 0; i < _this.GetSaveData.length; i++) {
                var classname = "";
                var streamname = "";
                for (var j = 0; j < _this.GetSaveData[i].Class.length; j++) {
                    a = _this.GetSaveData[i].Class.split(",");
                    b = _this.GetSaveData[i].Stream.split(",");
                }
                if (_this.ClassData != undefined) {
                    for (var k = 0; k < a.length; k++) {
                        for (var l = 0; l < _this.ClassData.length; l++) {
                            if (a[k] == _this.ClassData[l].classid) {
                                if (k > 0) {
                                    classname = classname + ", " + _this.ClassData[l].classname;
                                }
                                else {
                                    classname = classname + _this.ClassData[l].classname;
                                }
                            }
                        }
                    }
                }
                if (_this.StreamData != undefined) {
                    for (var k = 0; k < a.length; k++) {
                        for (var l = 0; l < _this.StreamData.length; l++) {
                            if (b[k] == _this.StreamData[l].streamid) {
                                if (k > 0) {
                                    streamname = streamname + ", " + _this.StreamData[l].streamname;
                                }
                                else {
                                    streamname = streamname + _this.StreamData[l].streamname;
                                }
                            }
                        }
                    }
                }
                _this.GetSaveData[i].Class = classname;
                if (classname == "8th" || classname == "9th" || classname == "10th") {
                    _this.GetSaveData[i].Stream = "";
                }
                else {
                    _this.GetSaveData[i].Stream = streamname;
                }
            }
            for (var i = 0; i < _this.GetSaveData.length; i++) {
                var statename = "";
                var cityname = "";
                var schoolname = "";
                //for (var j = 0; j < this.GetSaveData[i].State.length; j++) {
                state = _this.GetSaveData[i].state.split(",");
                city = _this.GetSaveData[i].city.split(",");
                school = _this.GetSaveData[i].school.split(",");
                //}
                //state
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
                for (var k = 0; k < _this.SchoolData.length; k++) {
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
                _this.GetSaveData[i].statename = statename;
                _this.GetSaveData[i].cityname = cityname;
                _this.GetSaveData[i].schoolname = schoolname;
            }
            // this.HeaderData = Object.keys(this.GetSaveData[0]);
        });
    };
    //For Getting Video File Detail
    //GetVideoDetail(event) {
    //  debugger;
    //  this.videofile = event;
    //  let file = event.target.files[0];
    //  let fileList: FileList = event.target.files;
    //   this.videoToUpload = fileList[0];
    //  if (file.type.includes("video")) {
    //    this.orgVideoName = file.name;
    //  }
    //  else {
    //    Swal.fire("", "Please select a video file", "error");
    //  }
    //}
    //For Getting Image Detail
    PlannedaActivityManager.prototype.GetImageDetail = function (event) {
        debugger;
        this.imagefile = event;
        var file = event.target.files[0];
        //let file = event.filesData[0];
        var fileList = event.target.files;
        //let fileList: FileList = file;
        //this.imageToUpload = file.rawFile;
        this.imageToUpload = fileList[0];
        if (file.type.includes("png") || file.type.includes("jpg") || file.type.includes("jpeg")) {
            //this.orgImageName = event.filesData[0].name;
            this.orgImageName = file.name;
        }
        else {
            sweetalert2_1.default.fire("", "Please Select Image", "error");
            this.myInputVariable.nativeElement.value = "";
        }
    };
    //new save plan activity
    PlannedaActivityManager.prototype.onSubmit = function () {
        var _this = this;
        debugger;
        if (this.ButtonText == "Save") {
            //validation start 
            if (this.SelectedDate == null || this.SelectedDate == undefined) {
                sweetalert2_1.default.fire("", "Please enter start date ", "error");
                return;
            }
            var res = this.SelectedVideo.match(/vimeo/g);
            if (res == null || res == undefined) {
                sweetalert2_1.default.fire("", "Please enter only vimeo video link", "error");
                return;
            }
            //if (this.SelectedVideo == "" || this.SelectedDate == undefined || this.SelectedVideo.match("")) {
            //  Swal.fire("", "Please enter start date ", "error");
            //  return;
            //}
            if (this.SelectedEndDate == null || this.SelectedEndDate == undefined) {
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
            if (this.Selecteduser == 0 || this.Selecteduser == undefined) {
                sweetalert2_1.default.fire("", "Please select user type", "error");
                return;
            }
            if (this.IsSchool == false) {
                this.publish = 0;
            }
            else {
                this.publish = 1;
            }
            this.s_date = this.SelectedDate.toISOString().slice(0, 10);
            this.e_date = this.SelectedEndDate.toISOString().slice(0, 10);
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
            if (this.selectedstate == 0 || this.selectedstate == undefined) {
                this.selectedstate = 0;
            }
            if (this.selectedcity == 0 || this.selectedcity == undefined) {
                this.selectedcity = 0;
            }
            if (this.selectedschool == 0 || this.selectedschool == undefined) {
                this.selectedschool = 0;
            }
            if (this.classid == "" || this.classid == undefined) {
                sweetalert2_1.default.fire("", "Please select class", "error");
                return;
            }
            if (this.SelectedTopic == 0 || this.SelectedTopic == undefined) {
                sweetalert2_1.default.fire("", "Please select topic", "error");
                return;
            }
            if (this.selectedwebtype == 0 || this.selectedwebtype == undefined) {
                sweetalert2_1.default.fire("", "Please select webinar type", "error");
                return;
            }
            //if (this.SelectedVideo == "" || this.SelectedVideo == undefined) {
            //  Swal.fire("", "Please enter video link", "error");
            //  return;
            //}
            //if (this.orgImageName == "" || this.orgImageName == undefined) {
            //  Swal.fire("", "Please choose image", "error");
            //  return;
            //}
            //validation end
            var input = new FormData();
            //input.append("video", this.videoToUpload);
            input.append("image", this.imageToUpload);
            input.append("acttype", "Save");
            input.append("Id", this.Id.toString());
            input.append("topicid", this.SelectedTopic.toString());
            //input.append("classid", this.SelectedClass.toString());
            input.append("classid", this.classid.toString());
            // input.append("streamid", this.SelectedStream.toString());
            input.append("streamid", this.streamid.toString());
            input.append("orgvideoname", this.SelectedVideo);
            input.append("chatlink", this.chatlink);
            input.append("orgimagename", this.orgImageName);
            input.append("ondate", this.s_date.toString());
            input.append("enddatetime", this.e_date.toString());
            input.append("starttime", st_time.toString());
            input.append("endtime", end_time.toString());
            input.append("stateid", this.StateIds.toString());
            input.append("schoolid", this.SchoolIds.toString());
            input.append("cityid", this.CityIds.toString());
            input.append("usertype", this.Selecteduser.toString());
            input.append("published", this.publish.toString());
            input.append("webinartype", this.selectedwebtype.toString());
            input.append("createdby", this.localstorage.get("userid").toString());
            this.http.post('api/Plannedactivity/SavePlannActivity', input)
                .subscribe(function (data) {
                debugger;
                _this.PlannedActivityData = data;
                if (_this.PlannedActivityData.length > 10) {
                    sweetalert2_1.default.fire("", "Saved Successfully", "success");
                    _this.onClear();
                    _this.GetData();
                    _this.AllCity = false;
                    _this.AllState = false;
                    _this.AllSchool = false;
                    for (var i = 0; i < _this.ClassData.length; i++) {
                        _this.ClassData[i].selected = false;
                    }
                    for (var i = 0; i < _this.StreamData.length; i++) {
                        _this.StreamData[i].selected = false;
                    }
                    for (var i = 0; i < _this.StateData.length; i++) {
                        _this.StateData[i].selected = false;
                    }
                    for (var i = 0; i < _this.CityData.length; i++) {
                        _this.CityData[i].selected = false;
                    }
                    for (var i = 0; i < _this.SchoolData.length; i++) {
                        _this.SchoolData[i].selected = false;
                    }
                    return;
                }
            });
        }
        else {
            debugger;
            if (this.SelectedDate == null || this.SelectedDate == undefined) {
                sweetalert2_1.default.fire("", "Please enter start date ", "error");
                return;
            }
            var res = this.SelectedVideo.match(/vimeo/g);
            if (res == null || res == undefined) {
                sweetalert2_1.default.fire("", "Please enter only vimeo video link", "error");
                return;
            }
            if (this.SelectedEndDate == null || this.SelectedEndDate == undefined) {
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
            if (this.IsSchool == false) {
                this.publish = 0;
            }
            else {
                this.publish = 1;
            }
            this.s_date = this.SelectedDate.toISOString().slice(0, 10);
            this.e_date = this.SelectedEndDate.toISOString().slice(0, 10);
            this.todaydate = new Date().toISOString().slice(0, 10);
            var st_time = this.starttime.hour.toString() + ':' + this.starttime.minute.toString() + ':' + this.starttime.second.toString();
            var end_time = this.endtime.hour.toString() + ':' + this.endtime.minute.toString() + ':' + this.endtime.second.toString();
            if (this.s_date == this.e_date) {
                //if (this.s_date < this.todaydate) {
                //  Swal.fire("", "Start date should contains future date", "error");
                //  return;
                //}
                //if (this.e_date < this.todaydate) {
                //  Swal.fire("", "End date should contain future date", "error");
                //  return;
                //}
                if ((this.starttime.hour > this.endtime.hour) || ((this.starttime.hour == this.endtime.hour && this.starttime.minute >= this.endtime.minute))) {
                    sweetalert2_1.default.fire("", "Start time always less then end time", "error");
                    return;
                }
            }
            else {
                //if (this.s_date < this.todaydate) {
                //  Swal.fire("", "Start date should contains future date", "error");
                //  return;
                //}
                //if (this.e_date < this.todaydate) {
                //  Swal.fire("", "End date should contain future date", "error");
                //  return;
                //}
                if (this.s_date > this.e_date) {
                    sweetalert2_1.default.fire("", "End date always greater then start date", "error");
                    return;
                }
            }
            if (this.selectedstate == 0 || this.selectedstate == undefined) {
                this.selectedstate = 0;
            }
            if (this.selectedcity == 0 || this.selectedcity == undefined) {
                this.selectedcity = 0;
            }
            if (this.selectedschool == 0 || this.selectedschool == undefined) {
                this.selectedschool = 0;
            }
            if (this.classid == "" || this.classid == undefined) {
                sweetalert2_1.default.fire("", "Please select class", "error");
                return;
            }
            if (this.SelectedTopic == 0 || this.SelectedTopic == undefined) {
                sweetalert2_1.default.fire("", "Please select any topic", "error");
                return;
            }
            if (this.selectedwebtype == 0 || this.selectedwebtype == undefined) {
                sweetalert2_1.default.fire("", "Please select webinar type", "error");
                return;
            }
            //if (this.orgVideoName == "" || this.orgVideoName == undefined) {
            //  Swal.fire("", "Please Choose any video", "error");
            //  return;
            //}
            //if (this.orgImageName == "" || this.orgImageName == undefined) {
            //  Swal.fire("", "Please Choose any image", "error");
            //  return;
            //}
            //validation end
            var input = new FormData();
            //input.append("video", this.videoToUpload);
            input.append("image", this.imageToUpload);
            input.append("acttype", "Update");
            input.append("Id", this.Id.toString());
            input.append("topicid", this.SelectedTopic.toString());
            //input.append("classid", this.SelectedClass.toString());
            input.append("classid", this.classid.toString());
            // input.append("streamid", this.SelectedStream.toString());
            input.append("streamid", this.streamid.toString());
            input.append("orgvideoname", this.SelectedVideo);
            input.append("chatlink", this.chatlink);
            input.append("orgimagename", this.orgImageName);
            input.append("ondate", this.s_date.toString());
            input.append("enddatetime", this.e_date.toString());
            input.append("starttime", st_time.toString());
            input.append("endtime", end_time.toString());
            input.append("stateid", this.StateIds.toString());
            input.append("schoolid", this.SchoolIds.toString());
            input.append("cityid", this.CityIds.toString());
            input.append("usertype", this.Selecteduser.toString());
            input.append("published", this.publish.toString());
            input.append("webinartype", this.selectedwebtype.toString());
            input.append("createdby", this.localstorage.get("userid").toString());
            this.http.post('api/Plannedactivity/SavePlannActivity', input)
                .subscribe(function (data) {
                debugger;
                _this.PlannedActivityData = data;
                if (_this.PlannedActivityData.length > 10) {
                    sweetalert2_1.default.fire("", "Updated Successfully", "success");
                    _this.onClear();
                    _this.GetData();
                    _this.AllCity = false;
                    _this.AllState = false;
                    _this.AllSchool = false;
                    for (var i = 0; i < _this.ClassData.length; i++) {
                        _this.ClassData[i].selected = false;
                    }
                    for (var i = 0; i < _this.StreamData.length; i++) {
                        _this.StreamData[i].selected = false;
                    }
                    for (var i = 0; i < _this.StateData.length; i++) {
                        _this.StateData[i].selected = false;
                    }
                    for (var i = 0; i < _this.CityData.length; i++) {
                        _this.CityData[i].selected = false;
                    }
                    for (var i = 0; i < _this.SchoolData.length; i++) {
                        _this.SchoolData[i].selected = false;
                    }
                    return;
                }
            });
        }
    };
    //check valid file
    PlannedaActivityManager.prototype.validateFile = function (name) {
        var ext = name.substring(name.lastIndexOf('.') + 1);
        if (ext.toLowerCase() == 'docx' || ext.toLowerCase() == 'doc' || ext.toLowerCase() == 'pdf' || ext.toLowerCase() == 'xls' || ext.toLowerCase() == 'xlsx' || ext.toLowerCase() == 'ppt') {
            return true;
        }
        else {
            return false;
        }
    };
    //Reset Button
    PlannedaActivityManager.prototype.onClear = function () {
        debugger;
        this.StateIds = "";
        this.CityIds = "";
        this.SchoolIds = "";
        this.ButtonText = 'Save';
        this.showstream = 0;
        this.SelectedTopic = 0;
        this.IsSchool = false;
        this.publish = 0;
        //this.model.published = false;
        //this.model.unpublished = false;
        //this.publish = false;
        // this.publish_v = 0;
        //this.SelectedClass = 0;
        //this.SelectedStream = 0;
        //this.SelectedDate = "";
        //this.SelectedEndDate = "";
        this.selectedstate = 0;
        this.selectedcity = 0;
        this.selectedschool = 0;
        this.Selecteduser = 0;
        this.SelectedTopic = 0;
        this.orgVideoName = "";
        this.orgImageName = "";
        this.SelectedVideo = "";
        //this.SelectedDate = new Date("");
        //this.s_date = "";
        //this.SelectedEndDate = new Date("");
        //this.e_date = "";
        this.SelectedDate = null;
        this.SelectedEndDate = null;
        this.st_time = null;
        this.end_time = null;
        this.s_date = null;
        this.e_date = null;
        this.starttime = null;
        this.endtime = null;
        this.AllClass = false;
        this.AllStream = false;
        this.chatlink = "";
        this.AllCity = false;
        this.AllState = false;
        this.AllSchool = false;
        // this.GetData();
        for (var i = 0; i < this.ClassData.length; i++) {
            this.ClassData[i].selected = false;
        }
        for (var i = 0; i < this.StreamData.length; i++) {
            this.StreamData[i].selected = false;
        }
        for (var i = 0; i < this.StateData.length; i++) {
            this.StateData[i].selected = false;
        }
        for (var i = 0; i < this.CityData.length; i++) {
            this.CityData[i].selected = false;
        }
        for (var i = 0; i < this.SchoolData.length; i++) {
            this.SchoolData[i].selected = false;
        }
        this.myInputVariable.nativeElement.value = "";
        this.selectedwebtype = 0;
    };
    //For Delete Data
    PlannedaActivityManager.prototype.DeleteData = function (i, Id) {
        var _this = this;
        var data;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        data =
            {
                "activity_id": Id,
                "acttype": "Delete",
                "createdby": parseInt(this.localstorage.get("userid"))
            };
        var body = JSON.stringify(data);
        //this.http.post('api/Plannedactivity/DeleteActivity', body, options).subscribe(
        //  (data) => {
        //    this.DeletedData = data;
        //    if (this.DeletedData.Status == true) {
        //      Swal.fire("", "Successfully Deleted", "success");
        //      this.GetData();
        //      return;
        //    }
        //  }
        //  )
        sweetalert2_1.default.fire({
            //title: 'Confirmation',
            text: 'Are you sure to delete this record?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No'
        }).then(function (result) {
            if (result.value) {
                _this.http.post('api/Plannedactivity/DeleteActivity', body, options).subscribe(function (data) {
                    _this.DeletedData = data;
                    if (_this.DeletedData.Status == true) {
                        sweetalert2_1.default.fire("", "Deleted Successfully", "success");
                        _this.GetData();
                        return;
                    }
                });
            }
        });
        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
    };
    //for Edit Data
    PlannedaActivityManager.prototype.EditData = function (i, Id) {
        var _this = this;
        //this.GetTopic();
        //this.getClass();
        //this.getStream();
        // this.onClear();
        this.BindUser();
        // this.BindState();
        this.ButtonText = 'Update';
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.http.get('api/Plannedactivity/GetEditData?acttype=' + 'Edit&activity_id=' + Id, options).subscribe(function (data) {
            debugger;
            _this.GetEditedData = data;
            if (_this.GetEditedData.Status == true) {
                // this.GetData1();
                if (_this.GetEditedData.Status != undefined) {
                    if (_this.GetEditedData.Status == true) {
                        _this.StateIds = _this.GetEditedData.data.stateid;
                        var tmpstateId = _this.GetEditedData.data.stateid.split(",");
                        for (var i = 0; i < _this.StateData.length; i++) {
                            for (var j = 0; j < tmpstateId.length; j++) {
                                if (_this.StateData[i].stateId == tmpstateId[j]) {
                                    _this.StateData[i].selected = true;
                                }
                            }
                        }
                        _this.onChangeOfMultiCheckBoxToGetCity();
                    }
                }
                _this.classid = _this.GetEditedData.data.Classid;
                _this.streamid = _this.GetEditedData.data.streamId;
                var tmpClassId = _this.GetEditedData.data.Classid.split(",");
                for (var i = 0; i < _this.ClassData.length; i++) {
                    for (var j = 0; j < tmpClassId.length; j++) {
                        if (_this.ClassData[i].classid == tmpClassId[j]) {
                            _this.ClassData[i].selected = true;
                        }
                    }
                }
                for (var i = 0; i < _this.ClassData.length; i++) {
                    if (_this.ClassData[i].selected === true) {
                        if (_this.ClassData[i].classid == 1 || _this.ClassData[i].classid == 2 || _this.ClassData[i].classid == 3) {
                            _this.showstream = 0;
                        }
                        else {
                            _this.showstream = 1;
                            // this.GetStream();
                        }
                    }
                    //else {
                    //  this.showstream = 0;
                    //}
                }
                if (_this.ClassData.length == tmpClassId.length) {
                    _this.AllClass = true;
                }
                else {
                    _this.AllClass = false;
                }
                var tmpStreamid = _this.GetEditedData.data.streamId.split(",");
                for (var i = 0; i < _this.StreamData.length; i++) {
                    for (var j = 0; j < tmpStreamid.length; j++) {
                        if (_this.StreamData[i].streamid == tmpStreamid[j]) {
                            _this.StreamData[i].selected = true;
                        }
                    }
                }
                if (_this.StreamData.length == tmpStreamid.length) {
                    _this.AllStream = true;
                }
                else {
                    _this.AllStream = false;
                }
                var mdate = new Date(_this.GetEditedData.data.Date);
                var edate = new Date(_this.GetEditedData.data.endDate);
                _this.GetTopic();
                _this.Id = _this.GetEditedData.data.Id;
                //this.SelectedDate = new Date(Date.parse(this.GetEditedData.data.Date));
                _this.SelectedDate = mdate;
                _this.SelectedEndDate = edate;
                _this.SelectedVideo = _this.GetEditedData.data.VideoName;
                _this.chatlink = _this.GetEditedData.data.chatlink;
                //this.orgImageName = this.GetEditedData.data.ImageName;
                var mtime = _this.GetEditedData.data.starttime.split(":");
                var etime = _this.GetEditedData.data.endtime.split(":");
                _this.starttime = { hour: parseInt(mtime[0]), minute: parseInt(mtime[1]), second: parseInt(mtime[2]) };
                _this.endtime = { hour: parseInt(etime[0]), minute: parseInt(etime[1]), second: parseInt(etime[2]) };
                _this.Selecteduser = _this.GetEditedData.data.usertype;
                //  this.model.published = this.GetEditedData.data.published == 0 ? false : true;
                //if (this.GetEditedData.data.publish == 0) {
                //  this.model.unpublished = true;
                //  this.publish = 0;
                //}
                //else {
                //  this.model.published = true;
                //  this.publish = 1;
                //}
                _this.IsSchool = _this.GetEditedData.data.publish == 0 ? false : true;
                //if (this.GetEditedData.data.publish == 0) {
                //  this.publish = 0;
                //}
                //else {
                //  this.publish = 1;
                //}
                if (tmpClassId.length == 6) {
                    _this.AllClass = true;
                }
                if (tmpStreamid.length == 6) {
                    _this.AllStream = true;
                }
                //this.st_time = this.GetEditedData.data.starttime;
                //this.end_time = this.GetEditedData.data.endtime;
                _this.SelectedTopic = _this.GetEditedData.data.ID;
                _this.selectedwebtype = _this.GetEditedData.data.webinartype;
            }
        });
    };
    //Watchvideoupdate(url: string) {
    //  debugger;
    //  if (url.length > 0) {
    //    this.openModal();
    //  }
    //  else {
    //    this.onCloseHandled();
    //  }
    //}
    //openModal() {
    //  this.display = "block";
    //}
    //onCloseHandled() {
    //  this.display = 'none';
    //}
    //Select All function for State
    PlannedaActivityManager.prototype.SelectAllState = function () {
        debugger;
        this.StateIds = "";
        if (this.AllState === true) {
            for (var i = 0; i < this.StateData.length; i++) {
                this.StateData[i].selected = true;
                if (this.StateIds === '') {
                    this.StateIds = this.StateData[i].stateId;
                }
                else {
                    this.StateIds = this.StateIds + ',' + this.StateData[i].stateId;
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
    PlannedaActivityManager.prototype.SelectedState = function () {
        debugger;
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
    PlannedaActivityManager.prototype.SelectAllCity = function () {
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
    PlannedaActivityManager.prototype.SelectedCity = function () {
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
    PlannedaActivityManager.prototype.SelectAllSchool = function () {
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
    PlannedaActivityManager.prototype.SelectedSchool = function () {
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
    PlannedaActivityManager.prototype.onChangeOfMultiCheckBoxToGetCity = function () {
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
            if (_this.GetEditedData.Status != undefined) {
                if (_this.GetEditedData.Status == true) {
                    _this.CityIds = _this.GetEditedData.data.cityid;
                    var tmpcityid = _this.GetEditedData.data.cityid.split(",");
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
            }
            //if (this.EditSubsscriptionData.Status == true) {
            //  this.CityIds = this.EditSubsscriptionData.data[0].cityid;
            //  var tmpcityid = this.EditSubsscriptionData.data[0].cityid.split(",");
            //  for (var i = 0; i < this.CityData.length; i++) {
            //    for (var j = 0; j < tmpcityid.length; j++) {
            //      if (this.CityData[i].cityid == tmpcityid[j]) {
            //        this.CityData[i].selected = true;
            //      }
            //    }
            //  }
            //  this.onChangeOfMultiCheckBoxToGetSchool();
            //}
            //else {
            //}
        }, function (err) {
        });
    };
    PlannedaActivityManager.prototype.onChangeOfMultiCheckBoxToGetSchool = function () {
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
            if (_this.GetEditedData.Status != undefined) {
                if (_this.GetEditedData.Status == true) {
                    _this.SchoolIds = _this.GetEditedData.data.schoolid;
                    var tmpschoolid = _this.GetEditedData.data.schoolid.split(",");
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
            }
            //if (this.EditSubsscriptionData.Status == true) {
            //  this.SchoolIds = this.EditSubsscriptionData.data[0].schoolid;
            //  var tmpschoolid = this.EditSubsscriptionData.data[0].schoolid.split(",");
            //  for (var i = 0; i < this.SchoolData.length; i++) {
            //    for (var j = 0; j < tmpschoolid.length; j++) {
            //      if (this.SchoolData[i].schoolid == tmpschoolid[j]) {
            //        this.SchoolData[i].selected = true;
            //      }
            //    }
            //  }
            //}
            //else {
            //}
        }, function (err) {
        });
    };
    PlannedaActivityManager.prototype.handleButtonClick = function (link) {
        debugger;
        this.url = link;
        this.yt = '<iframe width="727" height="409" src="' + this.url + '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
    };
    PlannedaActivityManager.prototype.toggleMeridian = function () {
        this.meridian = !this.meridian;
    };
    __decorate([
        core_1.ViewChild('inputFile', { static: true }),
        __metadata("design:type", core_1.ElementRef)
    ], PlannedaActivityManager.prototype, "myInputVariable", void 0);
    PlannedaActivityManager = __decorate([
        core_1.Component({
            selector: 'app-plannedactivity',
            templateUrl: './plannedactivity.component.html',
            styleUrls: ['./plannedactivity.component.css'],
            providers: [{ provide: ng_bootstrap_1.NgbDateAdapter, useClass: ng_bootstrap_1.NgbDateNativeAdapter }, ng_bootstrap_1.NgbTimepickerConfig]
        }),
        __metadata("design:paramtypes", [http_1.HttpClient, router_1.Router, angular_2_local_storage_1.LocalStorageService, ngx_toastr_1.ToastrService, ngx_ui_loader_1.NgxUiLoaderService, core_1.Renderer2, ng_bootstrap_1.NgbTimepickerConfig, ng_bootstrap_1.NgbDatepickerConfig])
    ], PlannedaActivityManager);
    return PlannedaActivityManager;
}());
exports.PlannedaActivityManager = PlannedaActivityManager;
//# sourceMappingURL=plannedactivity.component.js.map