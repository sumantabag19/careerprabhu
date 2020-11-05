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
var LifeCoachManager = /** @class */ (function () {
    function LifeCoachManager(http, router, localstorage, toaster, loader) {
        this.http = http;
        this.router = router;
        this.localstorage = localstorage;
        this.toaster = toaster;
        this.loader = loader;
        this.ButtonText = "Save";
        this.GetSaveData = [];
        this.topicname = "";
        this.topicid = 0;
        this.CoachTopicDetail = [];
        this.EditCoachTopicData = [];
        this.TopicDeleteDetail = [];
    }
    LifeCoachManager.prototype.ngOnInit = function () {
        this.GetSavedData();
    };
    //save coach topic
    LifeCoachManager.prototype.onSubmit = function () {
        var _this = this;
        debugger;
        if (this.topicname == "" || this.topicname == undefined) {
            sweetalert2_1.default.fire("", "Please Enter Topic", "error");
            return;
        }
        var data;
        if (this.ButtonText == "Update") {
            var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
            var options = { headers: headers };
            debugger;
            data =
                {
                    "acttype": "update",
                    "topicname": this.topicname,
                    "topicid": this.topicid
                };
            var body = JSON.stringify(data);
            debugger;
            this.http.post('api/coachtopicmaster/UpdateTopicDetail', body, options).subscribe(function (data) {
                debugger;
                _this.CoachTopicDetail = data;
                if (_this.CoachTopicDetail.Status == true) {
                    if (_this.CoachTopicDetail.Message == "Topic Already Exists") {
                        _this.GetSavedData();
                        sweetalert2_1.default.fire("", "Topic Already Exists", "success");
                        _this.onClear();
                        return;
                    }
                    else {
                        _this.GetSavedData();
                        sweetalert2_1.default.fire("", "Updated Successfully", "success");
                        _this.onClear();
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
                    "acttype": "save",
                    "topicname": this.topicname,
                    "topicid": 0
                };
            var body = JSON.stringify(data);
            this.http.post('api/coachtopicmaster/SaveTopicDetail', body, options).subscribe(function (data) {
                debugger;
                _this.CoachTopicDetail = data;
                if (_this.CoachTopicDetail.Status == true) {
                    if (_this.CoachTopicDetail.Message == "Topic Already Exists") {
                        _this.GetSavedData();
                        sweetalert2_1.default.fire("", "Topic Already Exists", "success");
                        _this.onClear();
                        return;
                    }
                    else {
                        sweetalert2_1.default.fire("", "Saved Successfully", "success");
                        _this.GetSavedData();
                        _this.onClear();
                        return;
                    }
                }
            });
        }
    };
    //get saved data
    LifeCoachManager.prototype.GetSavedData = function () {
        var _this = this;
        debugger;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.http.get('api/coachtopicmaster/GetTopicSavedData', options).subscribe(function (data) {
            debugger;
            _this.GetSaveData = data;
            //this.HeaderData = Object.keys(this.GetSaveData[0]);
        });
    };
    LifeCoachManager.prototype.onClear = function () {
        this.topicname = "";
        this.GetSavedData();
        this.ButtonText = "Save";
    };
    LifeCoachManager.prototype.EditTopicData = function (i, topicid) {
        var _this = this;
        this.ButtonText = 'Update';
        var index = i;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.http.get('api/coachtopicmaster/EditTopic?topicid=' + topicid, options).subscribe(function (data) {
            debugger;
            _this.EditCoachTopicData = data;
            _this.topicid = _this.EditCoachTopicData.topicid;
            _this.topicname = _this.EditCoachTopicData.topicname;
        });
    };
    LifeCoachManager.prototype.DeleteTopicData = function (i, topicid) {
        var _this = this;
        debugger;
        var data;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        debugger;
        data =
            {
                "acttype": "delete",
                "topicid": topicid
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
                _this.http.post('api/coachtopicmaster/deleteTopic', body, options).subscribe(function (data) {
                    debugger;
                    _this.TopicDeleteDetail = data;
                    if (_this.TopicDeleteDetail.Status == true) {
                        _this.GetSavedData();
                        sweetalert2_1.default.fire("", "Deleted Successfully", "success");
                        _this.onClear();
                        return;
                    }
                });
            }
        });
    };
    LifeCoachManager = __decorate([
        core_1.Component({
            selector: 'app-lifecoachtopic',
            templateUrl: './lifecoachtopic.component.html',
        }),
        __metadata("design:paramtypes", [http_1.HttpClient, router_1.Router, angular_2_local_storage_1.LocalStorageService, ngx_toastr_1.ToastrService, ngx_ui_loader_1.NgxUiLoaderService])
    ], LifeCoachManager);
    return LifeCoachManager;
}());
exports.LifeCoachManager = LifeCoachManager;
//# sourceMappingURL=lifecoachtopic.component.js.map