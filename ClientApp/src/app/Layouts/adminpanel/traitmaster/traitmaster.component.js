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
var TraitManager = /** @class */ (function () {
    function TraitManager(http, router, localstorage, toaster, loader) {
        this.http = http;
        this.router = router;
        this.localstorage = localstorage;
        this.toaster = toaster;
        this.loader = loader;
        this.trait = "";
        this.ButtonText = "Save";
        this.GetSaveData = [];
        this.traitid = 0;
        this.TraitDetail = [];
        this.EditTraitsData = [];
        this.TraitDeleteDetail = [];
    }
    TraitManager.prototype.ngOnInit = function () {
        this.GetSavedData();
    };
    //save trait
    TraitManager.prototype.onSubmit = function () {
        var _this = this;
        debugger;
        if (this.trait == "" || this.trait == undefined) {
            sweetalert2_1.default.fire("", "Please Enter Trait", "error");
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
                    "trait": this.trait,
                    "traitid": this.traitid
                };
            var body = JSON.stringify(data);
            debugger;
            this.http.post('api/traitmaster/UpdateTrait', body, options).subscribe(function (data) {
                debugger;
                _this.TraitDetail = data;
                if (_this.TraitDetail.Status == true) {
                    if (_this.TraitDetail.Message == "Trait Already Exists") {
                        _this.GetSavedData();
                        sweetalert2_1.default.fire("", "Trait Already Exists", "success");
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
                    "trait": this.trait,
                    "traitid": 0
                };
            var body = JSON.stringify(data);
            this.http.post('api/traitmaster/SaveTraitDetail', body, options).subscribe(function (data) {
                debugger;
                _this.TraitDetail = data;
                if (_this.TraitDetail.Status == true) {
                    if (_this.TraitDetail.Message == "Trait Already Exists") {
                        //this.GetSavedData();
                        sweetalert2_1.default.fire("", "Trait Already Exists", "success");
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
    TraitManager.prototype.GetSavedData = function () {
        var _this = this;
        debugger;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.http.get('api/traitmaster/GetrepositorySavedData', options).subscribe(function (data) {
            debugger;
            _this.GetSaveData = data;
            //this.HeaderData = Object.keys(this.GetSaveData[0]);
        });
    };
    TraitManager.prototype.onClear = function () {
        this.trait = "";
        this.GetSavedData();
        this.ButtonText = "Save";
    };
    //edit trait data
    TraitManager.prototype.EditTraitData = function (i, traitid) {
        var _this = this;
        this.ButtonText = 'Update';
        var index = i;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.http.get('api/traitmaster/EditTrait?traitid=' + traitid, options).subscribe(function (data) {
            debugger;
            _this.EditTraitsData = data;
            _this.traitid = _this.EditTraitsData.traitid;
            _this.trait = _this.EditTraitsData.traitname;
        });
    };
    TraitManager.prototype.DeleteTraitData = function (i, traitid) {
        var _this = this;
        debugger;
        var data;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        debugger;
        data =
            {
                "acttype": "delete",
                "traitid": traitid
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
                _this.http.post('api/traitmaster/deleteTrait', body, options).subscribe(function (data) {
                    debugger;
                    _this.TraitDeleteDetail = data;
                    if (_this.TraitDeleteDetail.Status == true) {
                        _this.GetSavedData();
                        sweetalert2_1.default.fire("", "Deleted Successfully", "success");
                        _this.onClear();
                        return;
                    }
                });
            }
        });
    };
    TraitManager = __decorate([
        core_1.Component({
            selector: 'app-traitmaster',
            templateUrl: './traitmaster.component.html',
        }),
        __metadata("design:paramtypes", [http_1.HttpClient, router_1.Router, angular_2_local_storage_1.LocalStorageService, ngx_toastr_1.ToastrService, ngx_ui_loader_1.NgxUiLoaderService])
    ], TraitManager);
    return TraitManager;
}());
exports.TraitManager = TraitManager;
//# sourceMappingURL=traitmaster.component.js.map