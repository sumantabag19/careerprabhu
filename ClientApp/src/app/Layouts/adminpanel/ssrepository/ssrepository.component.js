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
var RepositoryManager = /** @class */ (function () {
    function RepositoryManager(http, router, localstorage, toaster, loader) {
        this.http = http;
        this.router = router;
        this.localstorage = localstorage;
        this.toaster = toaster;
        this.loader = loader;
        this.ClassData = [];
        this.Details = {};
        this.StreamDetails = {};
        this.classid = "";
        this.AllClass = false;
        this.AllStream = false;
        this.SelectedStream = [];
        this.ButtonText = 'Save';
        this.SelectedClass = [];
        this.repositoryname = "";
        this.StreamData = [];
        this.streamid = "";
        this.streamname = "";
        this.WebinarData = [];
        this.GetSaveData = [];
        this.HeaderData = [];
        this.EditRepoData = [];
        this.ID = 0;
    }
    RepositoryManager.prototype.ngOnInit = function () {
        //this.GetClass();
        //this.GetStream();
        this.GetSavedData();
    };
    //Delete Subscription Data
    RepositoryManager.prototype.DeleteData = function (i, id) {
        var _this = this;
        debugger;
        var data;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        debugger;
        data =
            {
                "acttype": "delete",
                "ID": id
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
                _this.http.post('api/repository/deleteRepository', body, options).subscribe(function (data) {
                    debugger;
                    _this.StreamDetails = data;
                    if (_this.StreamDetails.Status == true) {
                        _this.GetSavedData();
                        sweetalert2_1.default.fire("", "Deleted Successfully", "success");
                        _this.onClear();
                        return;
                    }
                });
            }
        });
    };
    //On Save
    RepositoryManager.prototype.onSubmit = function () {
        var _this = this;
        debugger;
        if (this.repositoryname == "" || this.repositoryname == undefined) {
            sweetalert2_1.default.fire("", "Please enter interest area", "error");
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
                    "repositoryname": this.repositoryname,
                    "ID": this.ID
                };
            var body = JSON.stringify(data);
            debugger;
            this.http.post('api/repository/UpdateRepository', body, options).subscribe(function (data) {
                debugger;
                _this.StreamDetails = data;
                if (_this.StreamDetails.Status == true) {
                    if (_this.StreamDetails.Message == "Intrest Area Already Exists") {
                        _this.GetSavedData();
                        sweetalert2_1.default.fire("", "Intrest Area Already Exists", "success");
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
                    //"classid": this.classid,
                    //"streamid": this.streamid,
                    "repositoryname": this.repositoryname,
                    //"createdby": parseInt(this.localstorage.get("userid")),
                    "ID": 0
                };
            var body = JSON.stringify(data);
            this.http.post('api/repository/SaveRepositoryDetail', body, options).subscribe(function (data) {
                debugger;
                _this.WebinarData = data;
                if (_this.WebinarData.status == true) {
                    if (_this.WebinarData.Message == "Intrest Area Already Exists") {
                        _this.GetSavedData();
                        sweetalert2_1.default.fire("", "Intrest Area Already Exists", "success");
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
    //Get Saved Webinar data in table 
    RepositoryManager.prototype.GetSavedData = function () {
        var _this = this;
        debugger;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.http.get('api/repository/GetrepositorySavedData', options).subscribe(function (data) {
            var a;
            var b;
            debugger;
            _this.GetSaveData = data;
            _this.HeaderData = Object.keys(_this.GetSaveData[0]);
        });
    };
    //Select All function for stream
    RepositoryManager.prototype.onClear = function () {
        debugger;
        this.ButtonText = 'Save';
        this.repositoryname = "";
    };
    //Edit Subscription Data
    RepositoryManager.prototype.EditRepositoryData = function (i, ID) {
        var _this = this;
        debugger;
        this.ButtonText = 'Update';
        var index = i;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.http.get('api/repository/EditRepository?ID=' + ID, options).subscribe(function (data) {
            debugger;
            _this.EditRepoData = data;
            _this.ID = _this.EditRepoData.ID;
            _this.repositoryname = _this.EditRepoData.repositoryname;
        });
    };
    RepositoryManager = __decorate([
        core_1.Component({
            selector: 'app-ssrepository',
            templateUrl: './ssrepository.component.html',
        }),
        __metadata("design:paramtypes", [http_1.HttpClient, router_1.Router, angular_2_local_storage_1.LocalStorageService, ngx_toastr_1.ToastrService, ngx_ui_loader_1.NgxUiLoaderService])
    ], RepositoryManager);
    return RepositoryManager;
}());
exports.RepositoryManager = RepositoryManager;
//# sourceMappingURL=ssrepository.component.js.map