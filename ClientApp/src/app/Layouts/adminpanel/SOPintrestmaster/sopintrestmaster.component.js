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
var SOPIntrestManager = /** @class */ (function () {
    function SOPIntrestManager(http, router, localstorage, toaster, loader) {
        this.http = http;
        this.router = router;
        this.localstorage = localstorage;
        this.toaster = toaster;
        this.loader = loader;
        this.ButtonText = "Save";
        this.GetSaveData = [];
        this.intrest = "";
        this.intrestid = 0;
        this.SopIntrestDetail = [];
        this.EditIntrestData = [];
        this.SopIntrestDeleteDetail = [];
    }
    SOPIntrestManager.prototype.ngOnInit = function () {
        this.GetSavedData();
    };
    //save sop intrest area
    SOPIntrestManager.prototype.onSubmit = function () {
        var _this = this;
        debugger;
        if (this.intrest == "" || this.intrest == undefined) {
            sweetalert2_1.default.fire("", "Please Enter Interest Area", "error");
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
                    "intrestname": this.intrest,
                    "intrestid": this.intrestid
                };
            var body = JSON.stringify(data);
            debugger;
            this.http.post('api/sopintrestmaster/UpdateSopIntrestDetail', body, options).subscribe(function (data) {
                debugger;
                _this.SopIntrestDetail = data;
                if (_this.SopIntrestDetail.Status == true) {
                    if (_this.SopIntrestDetail.Message == "Intrest Already Exists") {
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
                    "intrestname": this.intrest,
                    "intrestid": 0
                };
            var body = JSON.stringify(data);
            this.http.post('api/sopintrestmaster/SaveSopIntrestDetail', body, options).subscribe(function (data) {
                debugger;
                _this.SopIntrestDetail = data;
                if (_this.SopIntrestDetail.Status == true) {
                    if (_this.SopIntrestDetail.Message == "Intrest Already Exists") {
                        _this.GetSavedData();
                        sweetalert2_1.default.fire("", "Intrest Already Exists", "success");
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
    SOPIntrestManager.prototype.GetSavedData = function () {
        var _this = this;
        debugger;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.http.get('api/sopintrestmaster/GetSopIntrestSavedData', options).subscribe(function (data) {
            debugger;
            _this.GetSaveData = data;
            //this.HeaderData = Object.keys(this.GetSaveData[0]);
        });
    };
    SOPIntrestManager.prototype.onClear = function () {
        this.intrest = "";
        this.GetSaveData();
        this.ButtonText = "Save";
    };
    SOPIntrestManager.prototype.EditSopIntrstData = function (i, intrestid) {
        var _this = this;
        this.ButtonText = 'Update';
        var index = i;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.http.get('api/sopintrestmaster/EditSopIntrest?intrestid=' + intrestid, options).subscribe(function (data) {
            debugger;
            _this.EditIntrestData = data;
            _this.intrestid = _this.EditIntrestData.intrestid;
            _this.intrest = _this.EditIntrestData.intrestname;
        });
    };
    SOPIntrestManager.prototype.DeleteData = function (i, intresrid) {
        var _this = this;
        debugger;
        var data;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        debugger;
        data =
            {
                "acttype": "delete",
                "intrestid": intresrid
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
                _this.http.post('api/sopintrestmaster/deleteSopIntrest', body, options).subscribe(function (data) {
                    debugger;
                    _this.SopIntrestDeleteDetail = data;
                    if (_this.SopIntrestDeleteDetail.Status == true) {
                        _this.GetSavedData();
                        sweetalert2_1.default.fire("", "Deleted Successfully", "success");
                        _this.onClear();
                        return;
                    }
                });
            }
        });
    };
    SOPIntrestManager = __decorate([
        core_1.Component({
            selector: 'app-sopintrestmaster',
            templateUrl: './sopintrestmaster.component.html',
        }),
        __metadata("design:paramtypes", [http_1.HttpClient, router_1.Router, angular_2_local_storage_1.LocalStorageService, ngx_toastr_1.ToastrService, ngx_ui_loader_1.NgxUiLoaderService])
    ], SOPIntrestManager);
    return SOPIntrestManager;
}());
exports.SOPIntrestManager = SOPIntrestManager;
//# sourceMappingURL=sopintrestmaster.component.js.map