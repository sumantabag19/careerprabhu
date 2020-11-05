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
var lifecoachinformation = /** @class */ (function () {
    function lifecoachinformation(http, router, localstorage, toaster, loader) {
        this.http = http;
        this.router = router;
        this.localstorage = localstorage;
        this.toaster = toaster;
        this.loader = loader;
        this.selectedagenda = 0;
        this.AgendaDetails = [];
        this.AgendaData = [];
        this.topic = "";
        this.ButtonInterviewText = "Save";
        this.selectedcareer = 0;
        this.selectedtopic = 0;
        this.topicdata = [];
        this.videolink = "";
        this.SelectedImage = "";
        this.GetSaveData = [];
        this.careerdata = [];
        this.TopicDetails = [];
        this.TopicData = [];
        this.CareerDetails = [];
        this.pdffile = [];
        this.orgpdfname = "";
        this.lifecoachesdata = [];
        this.coachid = 0;
        this.Details = [];
        this.GetEditedData = [];
        this.DeletedData = [];
        this.url = "";
        this.AllCareer = false;
        this.careerid = "";
        this.coachname = "";
        this.mobileno = "";
        this.email = "";
        this.fbid = "";
        this.linkedin = "";
        this.description = "";
        this.ButtonInterviewsText = "Save";
        this.ButtonarticleText = "Save";
        this.inttitle = "";
        this.Selectedintfile = [];
        this.intdescription = "";
        this.pdffileint = [];
        this.inttoupload = [];
        this.orgintname = "";
        this.interviewrecord = 0;
        this.EditLifeInterviewData = [];
        this.journeytitle = "";
        this.journeydescription = "";
        this.ButtonjourneyText = "Save";
        this.GetSaveJourneyData = [];
        this.journeyid = 0;
    }
    lifecoachinformation.prototype.ngOnInit = function () {
        this.getTopic();
        this.BindAgenda();
        this.getCareer();
        this.BindInterviewData();
    };
    //bind topic
    lifecoachinformation.prototype.getTopic = function () {
        var _this = this;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.TopicDetails = [];
        var a;
        var tmpclass = [];
        this.http.get('api/lifecoachinformation/BindTopic', options).subscribe(function (data) {
            _this.TopicDetails = data;
            _this.TopicData = _this.TopicDetails;
        });
    };
    lifecoachinformation.prototype.BindAgenda = function () {
        var _this = this;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.AgendaDetails = [];
        var a;
        var tmpclass = [];
        this.http.get('api/lifecoachinformation/BindAgenda', options).subscribe(function (data) {
            _this.AgendaDetails = data;
            _this.AgendaData = _this.AgendaDetails;
        });
    };
    //bind career
    lifecoachinformation.prototype.getCareer = function () {
        var _this = this;
        debugger;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.TopicDetails = [];
        var a;
        var tmpclass = [];
        this.http.get('api/lifecoachinformation/BindCareer', options).subscribe(function (data) {
            _this.CareerDetails = data;
            _this.careerdata = _this.CareerDetails;
            _this.BindInterviewData();
        });
    };
    lifecoachinformation.prototype.SelectAllCareer = function () {
        debugger;
        this.careerid = "";
        if (this.AllCareer === true) {
            for (var i = 0; i < this.careerdata.length; i++) {
                this.careerdata[i].selected = true;
                if (this.careerid === '') {
                    this.careerid = this.careerdata[i].careerid;
                }
                else {
                    this.careerid = this.careerid + ',' + this.careerdata[i].careerid;
                }
            }
        }
        else {
            for (var i = 0; i < this.careerdata.length; i++) {
                this.careerdata[i].selected = false;
            }
        }
    };
    lifecoachinformation.prototype.getSelectedCareer = function () {
        debugger;
        this.careerid = "";
        var count = 0;
        for (var i = 0; i < this.careerdata.length; i++) {
            if (this.careerdata[i].selected === true) {
                if (this.careerid === '') {
                    this.careerid = this.careerdata[i].careerid;
                    count++;
                }
                else {
                    this.careerid = this.careerid + ',' + this.careerdata[i].careerid;
                    count++;
                }
            }
        }
        if (this.careerdata.length === count) {
            this.AllCareer = true;
        }
        else {
            this.AllCareer = false;
        }
    };
    //get pdf details
    lifecoachinformation.prototype.GetPhotoDetail = function (event) {
        debugger;
        this.pdffile = event;
        var file = event.target.files[0];
        var fileList = event.target.files;
        this.pdftoupload = fileList[0];
        if (file.type.includes("png") || file.type.includes("jpg") || file.type.includes("jpeg")) {
            this.orgpdfname = file.name;
        }
        else {
            sweetalert2_1.default.fire("", "Please select file", "error");
            this.myInputVariabl.nativeElement.value = "";
        }
    };
    //get interview details
    lifecoachinformation.prototype.GetIntDetail = function (event) {
        debugger;
        this.pdffileint = event;
        var fileint = event.target.files[0];
        var fileListint = event.target.files;
        this.inttoupload = fileListint[0];
        if (fileint.type.includes("pdf") || fileint.type.includes("")) {
            this.orgintname = fileint.name;
        }
        else {
            sweetalert2_1.default.fire("", "Please select file", "error");
            this.myintfileVariabl.nativeElement.value = "";
        }
    };
    //save life coaches
    lifecoachinformation.prototype.InterviewSave = function () {
        var _this = this;
        debugger;
        if (this.ButtonInterviewsText == "Save") {
            if (this.selectedtopic == 0 || this.selectedtopic == undefined) {
                sweetalert2_1.default.fire("", "Please select coach type", "error");
                return;
            }
            if (this.selectedagenda == 0 || this.selectedagenda == undefined) {
                sweetalert2_1.default.fire("", "Please select Agenda type", "error");
                return;
            }
            if (this.topic == "" || this.topic == undefined) {
                sweetalert2_1.default.fire("", "Please enter topic name", "error");
                return;
            }
            if (this.coachname == "" || this.coachname == undefined) {
                sweetalert2_1.default.fire("", "Please enter coach name", "error");
                return;
            }
            if (this.coachname.match(/[ˆ(\d|+|\-)]/)) {
                sweetalert2_1.default.fire("", "Name should not contain digit", "error");
                return;
            }
            else {
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
            if (!this.email.match('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')) {
                sweetalert2_1.default.fire("", "Please enter valid email", "error");
                return;
            }
            if (this.fbid == "" || this.fbid == undefined) {
                sweetalert2_1.default.fire("", "Please enter facebook id", "error");
                return;
            }
            if (this.linkedin == "" || this.linkedin == undefined) {
                sweetalert2_1.default.fire("", "Please enter linkedin id", "error");
                return;
            }
            if (this.orgpdfname == "" || this.orgpdfname == undefined) {
                sweetalert2_1.default.fire("", "Please select file", "error");
                return;
            }
            if (this.careerid == "" || this.careerid == undefined) {
                sweetalert2_1.default.fire("", "Please select career", "error");
                return;
            }
            if (this.description == "" || this.description == undefined) {
                sweetalert2_1.default.fire("", "Please enter description", "error");
                return;
            }
            var input = new FormData();
            input.append("photo", this.pdftoupload);
            input.append("orgphotoname", this.orgpdfname.toString());
            input.append("coachtype", this.selectedtopic.toString());
            input.append("agendatype", this.selectedagenda.toString());
            input.append("topic", this.topic.toString());
            input.append("coachname", this.coachname.toString());
            input.append("mobileno", this.mobileno.toString());
            input.append("email", this.email.toString());
            input.append("fbid", this.fbid.toString());
            input.append("linkedin", this.linkedin.toString());
            input.append("careerid", this.careerid.toString());
            input.append("description", this.description.toString());
            input.append("createdby", this.localstorage.get("userid").toString());
            this.http.post('api/lifecoachinformation/savelifecoachesdata', input)
                .subscribe(function (data) {
                debugger;
                _this.lifecoachesdata = data;
                if (_this.lifecoachesdata.Status == true) {
                    if (_this.lifecoachesdata.Message == "Coach Details Already Exists") {
                        sweetalert2_1.default.fire("", "Coach Details Already Exists", "success");
                        _this.onClearInterviews();
                        return;
                    }
                    else {
                        sweetalert2_1.default.fire("", "Successfully Saved", "success");
                        _this.onClearInterviews();
                        _this.BindInterviewData();
                        return;
                    }
                }
            });
        }
        else {
            debugger;
            if (this.selectedtopic == 0 || this.selectedtopic == undefined) {
                sweetalert2_1.default.fire("", "Please select coach type", "error");
                return;
            }
            if (this.selectedagenda == 0 || this.selectedagenda == undefined) {
                sweetalert2_1.default.fire("", "Please select Agenda type", "error");
                return;
            }
            if (this.topic == "" || this.topic == undefined) {
                sweetalert2_1.default.fire("", "Please enter topic name", "error");
                return;
            }
            if (this.coachname == "" || this.coachname == undefined) {
                sweetalert2_1.default.fire("", "Please enter coach name", "error");
                return;
            }
            if (this.coachname.match(/[ˆ(\d|+|\-)]/)) {
                sweetalert2_1.default.fire("", "Name should not contain digit", "error");
                return;
            }
            else {
            }
            if (this.mobileno == "" || this.mobileno == undefined) {
                sweetalert2_1.default.fire("", "Please enter mobile no", "error");
                return;
            }
            if (this.email == "" || this.email == undefined) {
                sweetalert2_1.default.fire("", "Please enter email", "error");
                return;
            }
            if (this.fbid == "" || this.fbid == undefined) {
                sweetalert2_1.default.fire("", "Please enter facebook id", "error");
                return;
            }
            if (this.linkedin == "" || this.linkedin == undefined) {
                sweetalert2_1.default.fire("", "Please enter linkedin id", "error");
                return;
            }
            if (this.careerid == "" || this.careerid == undefined) {
                sweetalert2_1.default.fire("", "Please select career", "error");
                return;
            }
            if (this.description == "" || this.description == undefined) {
                sweetalert2_1.default.fire("", "Please enter description", "error");
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
            var input = new FormData();
            input.append("interviewid", this.interviewid.toString());
            input.append("photo", this.pdftoupload);
            input.append("orgphotoname", this.orgpdfname.toString());
            input.append("coachtype", this.selectedtopic.toString());
            input.append("agendatype", this.selectedagenda.toString());
            input.append("topic", this.topic.toString());
            input.append("coachname", this.coachname.toString());
            input.append("mobileno", this.mobileno.toString());
            input.append("email", this.email.toString());
            input.append("fbid", this.fbid.toString());
            input.append("linkedin", this.linkedin.toString());
            input.append("careerid", this.careerid.toString());
            input.append("description", this.description.toString());
            input.append("createdby", this.localstorage.get("userid").toString());
            this.http.post('api/lifecoachinformation/updatelifecoachesdata', input)
                .subscribe(function (data) {
                debugger;
                _this.lifecoachesdata = data;
                if (_this.lifecoachesdata.Status == true) {
                    if (_this.lifecoachesdata.Message == "Coach Details Already Exists") {
                        sweetalert2_1.default.fire("", "Coach Details Already Exists", "success");
                        _this.onClearInterviews();
                        return;
                    }
                    else {
                        sweetalert2_1.default.fire("", "Successfully Updated", "success");
                        _this.onClearInterviews();
                        _this.BindInterviewData();
                        return;
                    }
                }
            });
        }
    };
    //bind table data
    lifecoachinformation.prototype.BindInterviewData = function () {
        var _this = this;
        debugger;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.Details = [];
        this.http.get('api/lifecoachinformation/BindInterviewData', options).subscribe(function (data) {
            debugger;
            _this.Details = data;
            _this.GetSaveData = _this.Details.data;
            _this.interviewrecord = _this.GetSaveData.length;
            var a;
            var b;
            var c;
            for (var i = 0; i < _this.GetSaveData.length; i++) {
                var classname = "";
                var streamname = "";
                var careername = "";
                debugger;
                for (var j = 0; j < _this.GetSaveData[i].careername.length; j++) {
                    c = _this.GetSaveData[i].careername.split(",");
                }
                for (var k = 0; k < c.length; k++) {
                    for (var l = 0; l < _this.careerdata.length; l++) {
                        if (c[k] == _this.careerdata[l].careerid) {
                            if (k > 0) {
                                careername = careername + ", " + _this.careerdata[l].careername;
                            }
                            else {
                                careername = careername + _this.careerdata[l].careername;
                            }
                        }
                    }
                }
                _this.GetSaveData[i].careername = careername;
            }
        });
    };
    //Edit interview data
    lifecoachinformation.prototype.EditInterview = function (i, Id) {
        var _this = this;
        debugger;
        this.BindAgenda();
        this.getCareer();
        this.getTopic();
        this.ButtonInterviewsText = 'Update';
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.http.get('api/lifecoachinformation/GetEditData?interviewid=' + Id, options).subscribe(function (data) {
            debugger;
            _this.GetEditedData = data;
            if (_this.GetEditedData.Status == true) {
                debugger;
                _this.EditLifeInterviewData = data;
                _this.interviewid = _this.EditLifeInterviewData.data.interviewid;
                _this.selectedtopic = _this.EditLifeInterviewData.data.coachtype;
                _this.selectedagenda = _this.EditLifeInterviewData.data.agendatype;
                _this.topic = _this.EditLifeInterviewData.data.topic;
                _this.careerid = _this.EditLifeInterviewData.data.careerid;
                _this.coachname = _this.EditLifeInterviewData.data.coachname;
                _this.fbid = _this.EditLifeInterviewData.data.fbid;
                _this.mobileno = _this.EditLifeInterviewData.data.mobileno;
                _this.email = _this.EditLifeInterviewData.data.email;
                _this.linkedin = _this.EditLifeInterviewData.data.linkedinid;
                _this.description = _this.EditLifeInterviewData.data.description;
                var tmpCareerid = _this.EditLifeInterviewData.data.careerid.split(",");
                for (var i = 0; i < _this.careerdata.length; i++) {
                    for (var j = 0; j < tmpCareerid.length; j++) {
                        if (_this.careerdata[i].careerid == tmpCareerid[j]) {
                            _this.careerdata[i].selected = true;
                        }
                    }
                }
                if (_this.careerdata.length == tmpCareerid.length) {
                    _this.AllCareer = true;
                }
                else {
                    _this.AllCareer = false;
                }
            }
        });
    };
    lifecoachinformation.prototype.onClearInterviews = function () {
        this.selectedtopic = 0;
        this.selectedcareer = 0;
        this.selectedagenda = 0;
        this.topic = "";
        this.coachname = "";
        this.fbid = "";
        this.email = "";
        this.linkedin = "";
        this.mobileno = "";
        this.description = "";
        this.inttitle = "";
        this.intdescription = "";
        this.videolink = "";
        this.ButtonInterviewsText = "Save";
        this.myInputVariabl.nativeElement.value = "";
        this.pdftoupload = [];
        this.orgpdfname = "";
        this.ButtonarticleText = "Save";
        this.ButtonjourneyText = "Save";
        this.inttoupload = [];
        this.orgintname = "";
        this.BindInterviewData();
        for (var i = 0; i < this.careerdata.length; i++) {
            this.careerdata[i].selected = false;
            this.AllCareer = false;
        }
    };
    //delete record
    lifecoachinformation.prototype.DeleteInterview = function (i, Id) {
        var _this = this;
        var data;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        data =
            {
                "interviewid": Id,
                "createdby": parseInt(this.localstorage.get("userid"))
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
                _this.http.post('api/lifecoachinformation/DeleteActivity', body, options).subscribe(function (data) {
                    _this.DeletedData = data;
                    if (_this.DeletedData.Status == true) {
                        sweetalert2_1.default.fire("", "Deleted Successfully", "success");
                        _this.BindInterviewData();
                        _this.onClearInterviews();
                        return;
                    }
                });
            }
        });
    };
    __decorate([
        core_1.ViewChild('inputfile', { static: true }),
        __metadata("design:type", core_1.ElementRef)
    ], lifecoachinformation.prototype, "myInputVariabl", void 0);
    __decorate([
        core_1.ViewChild('intfile', { static: true }),
        __metadata("design:type", core_1.ElementRef)
    ], lifecoachinformation.prototype, "myintfileVariabl", void 0);
    lifecoachinformation = __decorate([
        core_1.Component({
            selector: 'app-lifecoachinformation',
            templateUrl: './lifecoachinformation.component.html',
        }),
        __metadata("design:paramtypes", [http_1.HttpClient, router_1.Router, angular_2_local_storage_1.LocalStorageService, ngx_toastr_1.ToastrService, ngx_ui_loader_1.NgxUiLoaderService])
    ], lifecoachinformation);
    return lifecoachinformation;
}());
exports.lifecoachinformation = lifecoachinformation;
//# sourceMappingURL=lifecoachinformation.component.js.map