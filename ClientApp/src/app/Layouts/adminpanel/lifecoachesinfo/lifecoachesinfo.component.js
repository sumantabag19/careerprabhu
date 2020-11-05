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
var lifecoachesinfo = /** @class */ (function () {
    function lifecoachesinfo(http, router, localstorage, toaster, loader) {
        this.http = http;
        this.router = router;
        this.localstorage = localstorage;
        this.toaster = toaster;
        this.loader = loader;
        this.selectedtopic = 0;
        this.TopicData = [];
        this.selectedcoach = 0;
        this.CoachData = [];
        this.inttitle = "";
        this.Selectedintfile = [];
        this.intsubtitle = "";
        this.ButtonInterviewsText = "Save";
        this.GetSaveData = [];
        this.journeytitle = "";
        this.Selectedjourneyfile = [];
        this.jousubtitle = "";
        this.ButtonjourneyText = "Save";
        this.GetSaveJourneyData = [];
        this.articletitle = "";
        this.Selectedarticlefile = [];
        this.articlesubtitle = "";
        this.ButtonarticleText = "Save";
        this.pdffileint = [];
        this.inttoupload = [];
        this.orgintname = "";
        this.pdffilejou = [];
        this.joutoupload = [];
        this.orgjouname = "";
        this.Coachtypedetails = [];
        this.Coachdetail = [];
        this.lifeinterviewid = 0;
        this.interviewdata = [];
        this.Details = [];
        this.EditInterviewData = [];
        this.dleteinterviewdata = [];
        this.journeyid = 0;
        this.journeydata = [];
        this.journeydetails = [];
        this.EditJourneyData = [];
        this.dletejourneydata = [];
        this.articleid = 0;
        this.articledata = [];
        this.pdffilearticle = [];
        this.articletoupload = [];
        this.orgarticle = "";
        this.GetSaveArticleData = [];
        this.Articledetails = [];
        this.EditArticleData = [];
        this.dletearticledata = [];
    }
    lifecoachesinfo.prototype.ngOnInit = function () {
        this.BindCoachType();
        this.BindInterviewData();
        this.BindJourneyData();
        this.BindArticleData();
    };
    lifecoachesinfo.prototype.GetIntDetail = function (event) {
        debugger;
        this.pdffileint = event;
        var fileint = event.target.files[0];
        var fileListint = event.target.files;
        this.inttoupload = fileListint[0];
        if (fileint.type.includes("pdf") || fileint.type.includes("doc") || fileint.type.includes("docx")) {
            this.orgintname = fileint.name;
        }
        else {
            sweetalert2_1.default.fire("", "Please select file", "error");
            this.myintfileVariabl.nativeElement.value = "";
        }
    };
    lifecoachesinfo.prototype.GetjourneyDetail = function (event) {
        debugger;
        this.pdffilejou = event;
        var filejou = event.target.files[0];
        var fileListjou = event.target.files;
        this.joutoupload = fileListjou[0];
        if (filejou.type.includes("pdf") || filejou.type.includes("doc") || filejou.type.includes("docx")) {
            this.orgjouname = filejou.name;
        }
        else {
            sweetalert2_1.default.fire("", "Please select file", "error");
            this.myintfileVariabl1.nativeElement.value = "";
        }
    };
    lifecoachesinfo.prototype.GetarticleDetail = function (event) {
        debugger;
        this.pdffilearticle = event;
        var filearticle = event.target.files[0];
        var fileListarticle = event.target.files;
        this.articletoupload = fileListarticle[0];
        if (filearticle.type.includes("pdf") || filearticle.type.includes("doc") || filearticle.type.includes("docx")) {
            this.orgarticle = filearticle.name;
        }
        else {
            sweetalert2_1.default.fire("", "Please select file", "error");
            this.myintfileVariabl2.nativeElement.value = "";
        }
    };
    lifecoachesinfo.prototype.BindCoachType = function () {
        var _this = this;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        var a;
        var tmpclass = [];
        this.http.get('api/lifecoachesinfo/BindCoachType', options).subscribe(function (data) {
            debugger;
            _this.Coachtypedetails = data;
            _this.TopicData = _this.Coachtypedetails.data;
        });
    };
    lifecoachesinfo.prototype.BindCoach = function () {
        var _this = this;
        debugger;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        var body = {
            "coachtype": this.selectedtopic
        };
        var tmpclass = [];
        this.http.post('api/lifecoachesinfo/BindCoach', body, options).subscribe(function (data) {
            _this.Coachdetail = data;
            _this.CoachData = _this.Coachdetail.data;
        });
    };
    //save interview data
    lifecoachesinfo.prototype.InterviewSave = function () {
        var _this = this;
        if (this.ButtonInterviewsText == "Save") {
            if (this.selectedtopic == 0 || this.selectedtopic == undefined) {
                sweetalert2_1.default.fire("", "Please select coach type", "error");
                return;
            }
            if (this.selectedcoach == 0 || this.selectedcoach == undefined) {
                sweetalert2_1.default.fire("", "Please select coach", "error");
                return;
            }
            if (this.inttitle == "" || this.inttitle == undefined) {
                sweetalert2_1.default.fire("", "Please define title", "error");
                return;
            }
            if (this.intsubtitle == "" || this.intsubtitle == undefined) {
                sweetalert2_1.default.fire("", "Please entrt subtitle", "error");
                return;
            }
            var input = new FormData();
            input.append("pdf", this.inttoupload);
            input.append("orgpdfname", this.orgintname.toString());
            input.append("lifeinterviewid", this.lifeinterviewid.toString());
            input.append("coachtypeid", this.selectedtopic.toString());
            input.append("coachname", this.selectedcoach.toString());
            input.append("title", this.inttitle.toString());
            input.append("subtitle", this.intsubtitle.toString());
            input.append("createdby", this.localstorage.get("userid").toString());
            this.http.post('api/lifecoachesinfo/saveinterviewdata', input)
                .subscribe(function (data) {
                debugger;
                _this.interviewdata = data;
                if (_this.interviewdata.length > 10) {
                    sweetalert2_1.default.fire("", "Saved Successfully", "success");
                    _this.onClearInterviews();
                    _this.BindInterviewData();
                    return;
                }
            });
        }
        else {
            if (this.selectedtopic == 0 || this.selectedtopic == undefined) {
                sweetalert2_1.default.fire("", "Please select coach type", "error");
                return;
            }
            if (this.selectedcoach == 0 || this.selectedcoach == undefined) {
                sweetalert2_1.default.fire("", "Please select coach", "error");
                return;
            }
            if (this.inttitle == "" || this.inttitle == undefined) {
                sweetalert2_1.default.fire("", "Please define title", "error");
                return;
            }
            if (this.intsubtitle == "" || this.intsubtitle == undefined) {
                sweetalert2_1.default.fire("", "Please entrt subtitle", "error");
                return;
            }
            var input = new FormData();
            input.append("pdf", this.inttoupload);
            input.append("orgpdfname", this.orgintname.toString());
            input.append("lifeinterviewid", this.lifeinterviewid.toString());
            input.append("coachtypeid", this.selectedtopic.toString());
            input.append("coachname", this.selectedcoach.toString());
            input.append("title", this.inttitle.toString());
            input.append("subtitle", this.intsubtitle.toString());
            input.append("createdby", this.localstorage.get("userid").toString());
            this.http.post('api/lifecoachesinfo/updateinterviewdata', input)
                .subscribe(function (data) {
                debugger;
                _this.interviewdata = data;
                if (_this.interviewdata.length > 10) {
                    sweetalert2_1.default.fire("", "Updated Successfully", "success");
                    _this.onClearInterviews();
                    _this.BindInterviewData();
                    return;
                }
            });
        }
    };
    lifecoachesinfo.prototype.BindInterviewData = function () {
        var _this = this;
        debugger;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.Details = [];
        this.http.get('api/lifecoachesinfo/Bindtabledata', options).subscribe(function (data) {
            debugger;
            _this.Details = data;
            _this.GetSaveData = _this.Details.data;
        });
    };
    lifecoachesinfo.prototype.EditInterview = function (i, Id) {
        var _this = this;
        debugger;
        this.ButtonInterviewsText = 'Update';
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.http.get('api/lifecoachesinfo/GetEditInterviewData?lifeinterviewid=' + Id, options).subscribe(function (data) {
            debugger;
            _this.EditInterviewData = data;
            if (_this.EditInterviewData.Status == true) {
                _this.BindCoachType();
                _this.selectedtopic = _this.EditInterviewData.data.coachtypeid;
                _this.BindCoach();
                _this.selectedcoach = _this.EditInterviewData.data.coachid;
                _this.inttitle = _this.EditInterviewData.data.title;
                _this.intsubtitle = _this.EditInterviewData.data.subtitle;
                _this.lifeinterviewid = _this.EditInterviewData.data.lifeinterviewid;
            }
        });
    };
    lifecoachesinfo.prototype.DeleteInterview = function (i, Id) {
        var _this = this;
        var data;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        data =
            {
                "lifeinterviewid": Id
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
                _this.http.post('api/lifecoachesinfo/Deleteinterviewdata', body, options).subscribe(function (data) {
                    _this.dleteinterviewdata = data;
                    if (_this.dleteinterviewdata.Status == true) {
                        sweetalert2_1.default.fire("", "Deleted Successfully", "success");
                        _this.BindInterviewData();
                        return;
                    }
                });
            }
        });
    };
    lifecoachesinfo.prototype.onClearInterviews = function () {
        this.selectedtopic = 0;
        this.selectedcoach = 0;
        this.inttitle = "";
        this.intsubtitle = "";
        this.inttoupload = [];
        this.orgintname = "";
        this.ButtonInterviewsText = "Save";
        this.myintfileVariabl.nativeElement.value = "";
        this.BindInterviewData();
    };
    //Coding for save journey data
    lifecoachesinfo.prototype.journeySave = function () {
        var _this = this;
        if (this.ButtonjourneyText == "Save") {
            if (this.selectedtopic == 0 || this.selectedtopic == undefined) {
                sweetalert2_1.default.fire("", "Please select coach type", "error");
                return;
            }
            if (this.selectedcoach == 0 || this.selectedcoach == undefined) {
                sweetalert2_1.default.fire("", "Please select coach", "error");
                return;
            }
            if (this.journeytitle == "" || this.journeytitle == undefined) {
                sweetalert2_1.default.fire("", "Please define title", "error");
                return;
            }
            if (this.jousubtitle == "" || this.jousubtitle == undefined) {
                sweetalert2_1.default.fire("", "Please entrt subtitle", "error");
                return;
            }
            var input = new FormData();
            input.append("pdf", this.joutoupload);
            input.append("orgpdfname", this.orgjouname.toString());
            input.append("journeyid", this.journeyid.toString());
            input.append("coachtypeid", this.selectedtopic.toString());
            input.append("coachname", this.selectedcoach.toString());
            input.append("title", this.journeytitle.toString());
            input.append("subtitle", this.jousubtitle.toString());
            input.append("createdby", this.localstorage.get("userid").toString());
            this.http.post('api/lifecoachesinfo/savejourneydata', input)
                .subscribe(function (data) {
                debugger;
                _this.journeydata = data;
                if (_this.journeydata.length > 10) {
                    sweetalert2_1.default.fire("", "Saved Successfully", "success");
                    _this.onClearInterviews();
                    _this.BindJourneyData();
                    return;
                }
            });
        }
        else {
            if (this.selectedtopic == 0 || this.selectedtopic == undefined) {
                sweetalert2_1.default.fire("", "Please select coach type", "error");
                return;
            }
            if (this.selectedcoach == 0 || this.selectedcoach == undefined) {
                sweetalert2_1.default.fire("", "Please select coach", "error");
                return;
            }
            if (this.journeytitle == "" || this.journeytitle == undefined) {
                sweetalert2_1.default.fire("", "Please define title", "error");
                return;
            }
            if (this.jousubtitle == "" || this.jousubtitle == undefined) {
                sweetalert2_1.default.fire("", "Please entrt subtitle", "error");
                return;
            }
            var input = new FormData();
            input.append("pdf", this.joutoupload);
            input.append("orgpdfname", this.orgjouname.toString());
            input.append("journeyid", this.journeyid.toString());
            input.append("coachtypeid", this.selectedtopic.toString());
            input.append("coachname", this.selectedcoach.toString());
            input.append("title", this.journeytitle.toString());
            input.append("subtitle", this.jousubtitle.toString());
            input.append("createdby", this.localstorage.get("userid").toString());
            this.http.post('api/lifecoachesinfo/updatejourneydata', input)
                .subscribe(function (data) {
                debugger;
                _this.journeydata = data;
                if (_this.journeydata.length > 10) {
                    sweetalert2_1.default.fire("", "Updated Successfully", "success");
                    _this.onClearInterviews();
                    _this.BindJourneyData();
                    return;
                }
            });
        }
    };
    lifecoachesinfo.prototype.BindJourneyData = function () {
        var _this = this;
        debugger;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.http.get('api/lifecoachesinfo/Bindjourneytabledata', options).subscribe(function (data) {
            debugger;
            _this.journeydetails = data;
            _this.GetSaveJourneyData = _this.journeydetails.data;
        });
    };
    lifecoachesinfo.prototype.EditJourney = function (i, Id) {
        var _this = this;
        debugger;
        this.ButtonjourneyText = 'Update';
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.http.get('api/lifecoachesinfo/GetEditjourneyData?journeyid=' + Id, options).subscribe(function (data) {
            debugger;
            _this.EditJourneyData = data;
            if (_this.EditJourneyData.Status == true) {
                _this.BindCoachType();
                _this.selectedtopic = _this.EditJourneyData.data.coachtypeid;
                _this.BindCoach();
                _this.selectedcoach = _this.EditJourneyData.data.coachid;
                _this.journeytitle = _this.EditJourneyData.data.title;
                _this.jousubtitle = _this.EditJourneyData.data.subtitle;
                _this.journeyid = _this.EditJourneyData.data.journeyid;
            }
        });
    };
    lifecoachesinfo.prototype.DeleteJourney = function (i, Id) {
        var _this = this;
        var data;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        data =
            {
                "journeyid": Id
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
                _this.http.post('api/lifecoachesinfo/Deletejourneydata', body, options).subscribe(function (data) {
                    _this.dletejourneydata = data;
                    if (_this.dletejourneydata.Status == true) {
                        sweetalert2_1.default.fire("", "Deleted Successfully", "success");
                        _this.BindJourneyData();
                        return;
                    }
                });
            }
        });
    };
    lifecoachesinfo.prototype.onClearJOurney = function () {
        this.selectedtopic = 0;
        this.selectedcoach = 0;
        this.journeytitle = "";
        this.jousubtitle = "";
        this.joutoupload = [];
        this.orgjouname = "";
        this.ButtonjourneyText = "Save";
        this.myintfileVariabl1.nativeElement.value = "";
        this.BindJourneyData();
    };
    //coding for article data
    lifecoachesinfo.prototype.articleSave = function () {
        var _this = this;
        if (this.ButtonarticleText == "Save") {
            if (this.selectedtopic == 0 || this.selectedtopic == undefined) {
                sweetalert2_1.default.fire("", "Please select coach type", "error");
                return;
            }
            if (this.selectedcoach == 0 || this.selectedcoach == undefined) {
                sweetalert2_1.default.fire("", "Please select coach", "error");
                return;
            }
            if (this.articletitle == "" || this.articletitle == undefined) {
                sweetalert2_1.default.fire("", "Please define title", "error");
                return;
            }
            if (this.articlesubtitle == "" || this.articlesubtitle == undefined) {
                sweetalert2_1.default.fire("", "Please entrt subtitle", "error");
                return;
            }
            var input = new FormData();
            input.append("pdf", this.articletoupload);
            input.append("orgpdfname", this.orgarticle.toString());
            input.append("articleid", this.articleid.toString());
            input.append("coachtypeid", this.selectedtopic.toString());
            input.append("coachname", this.selectedcoach.toString());
            input.append("title", this.articletitle.toString());
            input.append("subtitle", this.articlesubtitle.toString());
            input.append("createdby", this.localstorage.get("userid").toString());
            this.http.post('api/lifecoachesinfo/savearticledata', input)
                .subscribe(function (data) {
                debugger;
                _this.articledata = data;
                if (_this.articledata.length > 10) {
                    sweetalert2_1.default.fire("", "Saved Successfully", "success");
                    _this.onClearArticle();
                    _this.BindArticleData();
                    return;
                }
            });
        }
        else {
            if (this.selectedtopic == 0 || this.selectedtopic == undefined) {
                sweetalert2_1.default.fire("", "Please select coach type", "error");
                return;
            }
            if (this.selectedcoach == 0 || this.selectedcoach == undefined) {
                sweetalert2_1.default.fire("", "Please select coach", "error");
                return;
            }
            if (this.articletitle == "" || this.articletitle == undefined) {
                sweetalert2_1.default.fire("", "Please define title", "error");
                return;
            }
            if (this.articlesubtitle == "" || this.articlesubtitle == undefined) {
                sweetalert2_1.default.fire("", "Please entrt subtitle", "error");
                return;
            }
            var input = new FormData();
            input.append("pdf", this.articletoupload);
            input.append("orgpdfname", this.orgarticle.toString());
            input.append("articleid", this.articleid.toString());
            input.append("coachtypeid", this.selectedtopic.toString());
            input.append("coachname", this.selectedcoach.toString());
            input.append("title", this.articletitle.toString());
            input.append("subtitle", this.articlesubtitle.toString());
            input.append("createdby", this.localstorage.get("userid").toString());
            this.http.post('api/lifecoachesinfo/updatearticledata', input)
                .subscribe(function (data) {
                debugger;
                _this.articledata = data;
                if (_this.articledata.length > 10) {
                    sweetalert2_1.default.fire("", "Updated Successfully", "success");
                    _this.onClearArticle();
                    _this.BindArticleData();
                    return;
                }
            });
        }
    };
    lifecoachesinfo.prototype.onClearArticle = function () {
        this.selectedtopic = 0;
        this.selectedcoach = 0;
        this.articletitle = "";
        this.articlesubtitle = "";
        this.articletoupload = [];
        this.orgarticle = "";
        this.ButtonjourneyText = "Save";
        this.myintfileVariabl2.nativeElement.value = "";
        this.BindArticleData();
    };
    lifecoachesinfo.prototype.BindArticleData = function () {
        var _this = this;
        debugger;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.http.get('api/lifecoachesinfo/BindArticletabledata', options).subscribe(function (data) {
            debugger;
            _this.Articledetails = data;
            _this.GetSaveArticleData = _this.Articledetails.data;
        });
    };
    lifecoachesinfo.prototype.EditArticle = function (i, Id) {
        var _this = this;
        debugger;
        this.ButtonarticleText = 'Update';
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.http.get('api/lifecoachesinfo/GetEditArticleidData?articleid=' + Id, options).subscribe(function (data) {
            debugger;
            _this.EditArticleData = data;
            if (_this.EditArticleData.Status == true) {
                _this.BindCoachType();
                _this.selectedtopic = _this.EditArticleData.data.coachtypeid;
                _this.BindCoach();
                _this.selectedcoach = _this.EditArticleData.data.coachid;
                _this.articletitle = _this.EditArticleData.data.title;
                _this.articlesubtitle = _this.EditArticleData.data.subtitle;
                _this.articleid = _this.EditArticleData.data.articleid;
            }
        });
    };
    lifecoachesinfo.prototype.DeleteArticle = function (i, Id) {
        var _this = this;
        var data;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        data =
            {
                "articleid": Id
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
                _this.http.post('api/lifecoachesinfo/DeleteArticledata', body, options).subscribe(function (data) {
                    _this.dletearticledata = data;
                    if (_this.dletearticledata.Status == true) {
                        sweetalert2_1.default.fire("", "Deleted Successfully", "success");
                        _this.BindArticleData();
                        return;
                    }
                });
            }
        });
    };
    __decorate([
        core_1.ViewChild('intfile', { static: true }),
        __metadata("design:type", core_1.ElementRef)
    ], lifecoachesinfo.prototype, "myintfileVariabl", void 0);
    __decorate([
        core_1.ViewChild('journeyfile', { static: true }),
        __metadata("design:type", core_1.ElementRef)
    ], lifecoachesinfo.prototype, "myintfileVariabl1", void 0);
    __decorate([
        core_1.ViewChild('articlefile', { static: true }),
        __metadata("design:type", core_1.ElementRef)
    ], lifecoachesinfo.prototype, "myintfileVariabl2", void 0);
    lifecoachesinfo = __decorate([
        core_1.Component({
            selector: 'app-lifecoachesinfo',
            templateUrl: './lifecoachesinfo.component.html'
        }),
        __metadata("design:paramtypes", [http_1.HttpClient, router_1.Router, angular_2_local_storage_1.LocalStorageService, ngx_toastr_1.ToastrService, ngx_ui_loader_1.NgxUiLoaderService])
    ], lifecoachesinfo);
    return lifecoachesinfo;
}());
exports.lifecoachesinfo = lifecoachesinfo;
//# sourceMappingURL=lifecoachesinfo.component.js.map