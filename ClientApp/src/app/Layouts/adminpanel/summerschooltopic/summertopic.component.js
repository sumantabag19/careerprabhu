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
var SummerTopicManager = /** @class */ (function () {
    function SummerTopicManager(http, router, localstorage, toaster, loader) {
        this.http = http;
        this.router = router;
        this.localstorage = localstorage;
        this.toaster = toaster;
        this.loader = loader;
        this.ButtonText = "Save";
        this.GetSaveData = [];
        this.summertopic = "";
        this.summrtopicid = 0;
        this.SummerTopicDetail = [];
        this.EditTopicData = [];
        this.TopicDeleteDetail = [];
    }
    SummerTopicManager.prototype.ngOnInit = function () {
        this.GetSavedData();
    };
    //save summr topic
    SummerTopicManager.prototype.onSubmit = function () {
        var _this = this;
        debugger;
        if (this.summertopic == "" || this.summertopic == undefined) {
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
                    "summertopicid": this.summrtopicid,
                    "summertopic": this.summertopic
                };
            var body = JSON.stringify(data);
            debugger;
            this.http.post('api/summertopic/UpdateTopic', body, options).subscribe(function (data) {
                debugger;
                _this.SummerTopicDetail = data;
                if (_this.SummerTopicDetail.Status == true) {
                    if (_this.SummerTopicDetail.Message == "Topic Already Exists") {
                        _this.GetSavedData();
                        sweetalert2_1.default.fire("", "Updated Successfully", "success");
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
                    "summertopic": this.summertopic,
                    "summrtopicid": 0
                };
            var body = JSON.stringify(data);
            this.http.post('api/summertopic/SaveTopicDetail', body, options).subscribe(function (data) {
                debugger;
                _this.SummerTopicDetail = data;
                if (_this.SummerTopicDetail.Status == true) {
                    if (_this.SummerTopicDetail.Message == "Topic Already Exists") {
                        //this.GetSavedData();
                        sweetalert2_1.default.fire("", "Topic Already Exists", "success");
                        _this.onClear();
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
    };
    //bind table data
    SummerTopicManager.prototype.GetSavedData = function () {
        var _this = this;
        debugger;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.http.get('api/summertopic/GetTopicSavedData', options).subscribe(function (data) {
            debugger;
            _this.GetSaveData = data;
            //this.HeaderData = Object.keys(this.GetSaveData[0]);
        });
    };
    SummerTopicManager.prototype.onClear = function () {
        this.summertopic = "";
        this.ButtonText = "Save";
        this.GetSavedData();
    };
    //edit topic data
    SummerTopicManager.prototype.EditTopic = function (i, summertopicid) {
        var _this = this;
        this.ButtonText = 'Update';
        var index = i;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.http.get('api/summertopic/EditTopic?summertopicid=' + summertopicid, options).subscribe(function (data) {
            debugger;
            _this.EditTopicData = data;
            _this.summrtopicid = _this.EditTopicData.summertopicid;
            _this.summertopic = _this.EditTopicData.summertopic;
        });
    };
    //delete summer topic
    SummerTopicManager.prototype.DeleteTopic = function (i, summertopicid) {
        var _this = this;
        debugger;
        var data;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        debugger;
        data =
            {
                "acttype": "delete",
                "summertopicid": summertopicid
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
                _this.http.post('api/summertopic/deleteSummerTopic', body, options).subscribe(function (data) {
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
    SummerTopicManager = __decorate([
        core_1.Component({
            selector: 'app-summertopic',
            templateUrl: './summertopic.component.html',
        }),
        __metadata("design:paramtypes", [http_1.HttpClient, router_1.Router, angular_2_local_storage_1.LocalStorageService, ngx_toastr_1.ToastrService, ngx_ui_loader_1.NgxUiLoaderService])
    ], SummerTopicManager);
    return SummerTopicManager;
}());
exports.SummerTopicManager = SummerTopicManager;
//# sourceMappingURL=summertopic.component.js.map