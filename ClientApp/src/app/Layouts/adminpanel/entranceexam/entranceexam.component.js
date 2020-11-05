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
var EntranceExamManager = /** @class */ (function () {
    function EntranceExamManager(http, router, localstorage, toaster, loader, renderer, config, config1) {
        this.http = http;
        this.router = router;
        this.localstorage = localstorage;
        this.toaster = toaster;
        this.loader = loader;
        this.renderer = renderer;
        this.config1 = config1;
        this.StreamDetails = [];
        this.StreamData = [];
        this.AllStream = false;
        this.streamid = "";
        this.ButtonText = "Save";
        this.exam = "";
        this.examid = 0;
        this.Examdata = [];
        this.Detail = [];
        this.GetSaveData = [];
        this.GetEditedData = [];
        this.DeletedData = [];
        var current = new Date();
        config1.minDate = {
            year: current.getFullYear(), month: current.getMonth() + 1, day: current.getDate()
        };
        config1.outsideDays = 'hidden';
    }
    EntranceExamManager.prototype.ngOnInit = function () {
        this.GetStream();
        this.GetData();
    };
    EntranceExamManager.prototype.GetStream = function () {
        var _this = this;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.http.get('api/EntranceExam/getStream', options).subscribe(function (data) {
            _this.StreamDetails = data;
            if (_this.StreamDetails.status == true) {
                _this.StreamData = _this.StreamDetails.data;
            }
            else {
                _this.toaster.error(_this.StreamDetails.message.toString(), '', { easeTime: 1000, timeOut: 3000 });
            }
        });
    };
    EntranceExamManager.prototype.SelectAllStream = function () {
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
    EntranceExamManager.prototype.getSelectedStream = function () {
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
    };
    EntranceExamManager.prototype.onSubmit = function () {
        var _this = this;
        debugger;
        if (this.ButtonText == "Save") {
            if (this.SelectedDate == null || this.SelectedDate == undefined) {
                sweetalert2_1.default.fire("", "Please enter start date ", "error");
                return;
            }
            if (this.streamid == "" || this.streamid == undefined) {
                sweetalert2_1.default.fire("", "Please select stream", "error");
                return;
            }
            if (this.exam == "" || this.exam == undefined) {
                sweetalert2_1.default.fire("", "Please enter exam name", "error");
                return;
            }
            this.s_date = this.SelectedDate.toISOString().slice(0, 10);
            var input = new FormData();
            input.append("examid", this.examid.toString());
            input.append("startdate", this.s_date.toString());
            input.append("streamid", this.streamid.toString());
            input.append("examname", this.exam.toString());
            input.append("createdby", this.localstorage.get("userid").toString());
            this.http.post('api/EntranceExam/SaveExam', input)
                .subscribe(function (data) {
                debugger;
                _this.Examdata = data;
                if (_this.Examdata.Status == true) {
                    sweetalert2_1.default.fire("", "Saved Successfully", "success");
                    _this.GetData();
                    _this.Reset();
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
            if (this.streamid == "" || this.streamid == undefined) {
                sweetalert2_1.default.fire("", "Please select stream", "error");
                return;
            }
            if (this.exam == "" || this.exam == undefined) {
                sweetalert2_1.default.fire("", "Please enter exam name", "error");
                return;
            }
            this.s_date = this.SelectedDate.toISOString().slice(0, 10);
            var input = new FormData();
            input.append("examid", this.examid.toString());
            input.append("startdate", this.s_date.toString());
            input.append("streamid", this.streamid.toString());
            input.append("examname", this.exam.toString());
            input.append("createdby", this.localstorage.get("userid").toString());
            this.http.post('api/EntranceExam/UpdateExam', input)
                .subscribe(function (data) {
                _this.Examdata = data;
                if (_this.Examdata.Status == true) {
                    sweetalert2_1.default.fire("", "Updated Successfully", "success");
                    _this.GetData();
                    _this.Reset();
                    return;
                }
            });
        }
    };
    EntranceExamManager.prototype.GetData = function () {
        var _this = this;
        debugger;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.http.get('api/EntranceExam/GetSavedData', options).subscribe(function (data) {
            debugger;
            _this.Detail = data;
            _this.GetSaveData = _this.Detail.data;
            var a;
            var b;
            debugger;
            for (var i = 0; i < _this.GetSaveData.length; i++) {
                var classname = "";
                var streamname = "";
                for (var j = 0; j < _this.GetSaveData[i].streamid.length; j++) {
                    b = _this.GetSaveData[i].streamid.split(",");
                }
                if (_this.StreamData != undefined) {
                    for (var k = 0; k < b.length; k++) {
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
                _this.GetSaveData[i].Stream = streamname;
            }
        });
    };
    EntranceExamManager.prototype.EditData = function (i, Id) {
        var _this = this;
        this.GetStream();
        this.Reset();
        this.ButtonText = 'Update';
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.http.get('api/EntranceExam/GetEditData?examid=' + Id, options).subscribe(function (data) {
            debugger;
            _this.GetEditedData = data;
            if (_this.GetEditedData.Status == true) {
                _this.streamid = _this.GetEditedData.data.streamId;
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
                var mdate = new Date(_this.GetEditedData.data.startdate);
                _this.examid = _this.GetEditedData.data.examid;
                _this.SelectedDate = mdate;
                _this.exam = _this.GetEditedData.data.examname;
                if (tmpStreamid.length == 6) {
                    _this.AllStream = true;
                }
            }
        });
    };
    EntranceExamManager.prototype.Reset = function () {
        this.SelectedDate = null;
        this.s_date = null;
        this.exam = "";
        for (var i = 0; i < this.StreamData.length; i++) {
            this.StreamData[i].selected = false;
        }
        this.AllStream = false;
        this.ButtonText = "Save";
        this.GetData();
    };
    EntranceExamManager.prototype.DeleteData = function (i, Id) {
        var _this = this;
        var data;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        data =
            {
                "examid": Id
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
                _this.http.post('api/EntranceExam/DeleteActivity', body, options).subscribe(function (data) {
                    _this.DeletedData = data;
                    if (_this.DeletedData.Status == true) {
                        sweetalert2_1.default.fire("", "Deleted Successfully", "success");
                        _this.GetData();
                        _this.Reset();
                        return;
                    }
                });
            }
        });
    };
    EntranceExamManager = __decorate([
        core_1.Component({
            selector: 'app-entranceexam',
            templateUrl: './entranceexam.component.html',
            //styleUrls: ['./plannedactivity.component.css']
            providers: [{ provide: ng_bootstrap_1.NgbDateAdapter, useClass: ng_bootstrap_1.NgbDateNativeAdapter }, ng_bootstrap_1.NgbTimepickerConfig]
        }),
        __metadata("design:paramtypes", [http_1.HttpClient, router_1.Router, angular_2_local_storage_1.LocalStorageService, ngx_toastr_1.ToastrService, ngx_ui_loader_1.NgxUiLoaderService, core_1.Renderer2, ng_bootstrap_1.NgbTimepickerConfig, ng_bootstrap_1.NgbDatepickerConfig])
    ], EntranceExamManager);
    return EntranceExamManager;
}());
exports.EntranceExamManager = EntranceExamManager;
//# sourceMappingURL=entranceexam.component.js.map