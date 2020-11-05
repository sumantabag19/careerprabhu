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
var PlacementStudentManager = /** @class */ (function () {
    function PlacementStudentManager(http, router, localstorage, toaster, loader) {
        this.http = http;
        this.router = router;
        this.localstorage = localstorage;
        this.toaster = toaster;
        this.loader = loader;
        this.Details = [];
        this.GetSaveData = [];
        this.selectedstate = 0;
        this.selectedcity = 0;
        this.StateData = [];
        this.CityData = [];
        this.statedat = [];
        this.citdata = [];
        this.search = "";
    }
    PlacementStudentManager.prototype.ngOnInit = function () {
        this.BindTableData();
        this.BindState();
    };
    //bind state
    PlacementStudentManager.prototype.BindState = function () {
        var _this = this;
        debugger;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.statedat = [];
        var tmpclass = [];
        this.http.post('api/studentplacement/Bindstate', options).subscribe(function (data) {
            _this.statedat = data;
            if (_this.statedat.Status == true) {
                _this.StateData = _this.statedat.data;
            }
            else {
                _this.StateData = _this.statedat.data;
            }
        });
    };
    //bindc  city code
    PlacementStudentManager.prototype.BindCity = function () {
        var _this = this;
        debugger;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.citdata = [];
        var body = {
            "stateid": this.selectedstate
        };
        var tmpclass = [];
        this.http.post('api/studentplacement/BindCity', body, options).subscribe(function (data) {
            _this.citdata = data;
            if (_this.citdata.Status == true) {
                _this.CityData = _this.citdata.data;
            }
            else {
                _this.CityData = _this.citdata.data;
            }
        });
    };
    //bind table data
    PlacementStudentManager.prototype.BindTableData = function () {
        var _this = this;
        debugger;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.Details = [];
        var body = {
            "stateid": this.selectedstate,
            "cityid": this.selectedcity
        };
        this.http.post('api/studentplacement/BindPlacementData', body, options).subscribe(function (data) {
            debugger;
            _this.Details = data;
            _this.GetSaveData = _this.Details.data;
        });
    };
    PlacementStudentManager.prototype.Reset = function () {
        this.selectedcity = 0;
        this.selectedstate = 0;
        this.search = "";
        this.BindTableData();
    };
    PlacementStudentManager = __decorate([
        core_1.Component({
            selector: 'app-placement',
            templateUrl: './placement.component.html',
        }),
        __metadata("design:paramtypes", [http_1.HttpClient, router_1.Router, angular_2_local_storage_1.LocalStorageService, ngx_toastr_1.ToastrService, ngx_ui_loader_1.NgxUiLoaderService])
    ], PlacementStudentManager);
    return PlacementStudentManager;
}());
exports.PlacementStudentManager = PlacementStudentManager;
//# sourceMappingURL=placement.component.js.map