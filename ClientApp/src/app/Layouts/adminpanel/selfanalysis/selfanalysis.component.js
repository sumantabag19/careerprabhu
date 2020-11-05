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
var Selfanalysis = /** @class */ (function () {
    function Selfanalysis(http, router, localstorage, toaster, loader) {
        this.http = http;
        this.router = router;
        this.localstorage = localstorage;
        this.toaster = toaster;
        this.loader = loader;
        this.Selectedclass = 0;
        this.Selectedstream = 0;
        this.description = "";
        this.instruction = "";
        this.ClassData = [];
        this.StreamData = [];
        this.streamdata = [];
        this.classdata = [];
        this.ButtonText = "Save";
        this.analysisid = 0;
        this.SelfanalysisData = [];
        this.Detail = [];
        this.GetSaveData = [];
        this.GetEditedData = [];
        this.DeletedData = [];
    }
    Selfanalysis.prototype.ngOnInit = function () {
        this.BindClass();
        this.BindStream();
        this.GetData();
        //this.GetSavedData();
    };
    //bind class
    Selfanalysis.prototype.BindClass = function () {
        var _this = this;
        debugger;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.classdata = [];
        var tmpclass = [];
        this.http.post('api/selfanalysis/Bindclass', options).subscribe(function (data) {
            _this.classdata = data;
            if (_this.classdata.Status == true) {
                _this.ClassData = _this.classdata.data;
            }
            else {
                _this.ClassData = _this.classdata.data;
            }
        });
    };
    //binds  stream code
    Selfanalysis.prototype.BindStream = function () {
        var _this = this;
        debugger;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.streamdata = [];
        var tmpclass = [];
        this.http.post('api/selfanalysis/BindStream', options).subscribe(function (data) {
            _this.streamdata = data;
            if (_this.streamdata.Status == true) {
                _this.StreamData = _this.streamdata.data;
            }
            else {
                _this.StreamData = _this.streamdata.data;
            }
        });
    };
    Selfanalysis.prototype.onSubmit = function () {
        var _this = this;
        debugger;
        if (this.ButtonText == "Save") {
            if (this.Selectedclass == 0 || this.Selectedclass == undefined) {
                sweetalert2_1.default.fire("", "Please select class", "error");
                return;
            }
            if (this.Selectedstream == 0 || this.Selectedstream == undefined) {
                sweetalert2_1.default.fire("", "Please select stream", "error");
                return;
            }
            if (this.description == "" || this.description == undefined) {
                sweetalert2_1.default.fire("", "Please enter description", "error");
                return;
            }
            if (this.instruction == "" || this.instruction == undefined) {
                sweetalert2_1.default.fire("", "Please enter Instruction", "error");
                return;
            }
            var input = new FormData();
            input.append("analysisid", this.analysisid.toString());
            input.append("classid", this.Selectedclass.toString());
            input.append("streamid", this.Selectedstream.toString());
            input.append("description", this.description.toString());
            input.append("instruction", this.instruction.toString());
            input.append("createdby", this.localstorage.get("userid").toString());
            this.http.post('api/selfanalysis/Saveselfanalysis', input)
                .subscribe(function (data) {
                debugger;
                _this.SelfanalysisData = data;
                if (_this.SelfanalysisData.Status == true) {
                    sweetalert2_1.default.fire("", "Saved Successfully", "success");
                    _this.GetData();
                    return;
                }
            });
        }
        else {
            debugger;
            if (this.Selectedclass == 0 || this.Selectedclass == undefined) {
                sweetalert2_1.default.fire("", "Please select class", "error");
                return;
            }
            if (this.Selectedstream == 0 || this.Selectedstream == undefined) {
                sweetalert2_1.default.fire("", "Please select stream", "error");
                return;
            }
            if (this.description == "" || this.description == undefined) {
                sweetalert2_1.default.fire("", "Please enter description", "error");
                return;
            }
            if (this.instruction == "" || this.instruction == undefined) {
                sweetalert2_1.default.fire("", "Please enter Instruction", "error");
                return;
            }
            var input = new FormData();
            input.append("analysisid", this.analysisid.toString());
            input.append("streamid", this.Selectedclass.toString());
            input.append("classid", this.Selectedstream.toString());
            input.append("description", this.description.toString());
            input.append("instruction", this.instruction.toString());
            input.append("createdby", this.localstorage.get("userid").toString());
            this.http.post('api/selfanalysis/UpdateAnalysis', input)
                .subscribe(function (data) {
                _this.SelfanalysisData = data;
                if (_this.SelfanalysisData.Status == true) {
                    sweetalert2_1.default.fire("", "Updated Successfully", "success");
                    _this.GetData();
                    return;
                }
            });
        }
    };
    Selfanalysis.prototype.GetData = function () {
        var _this = this;
        debugger;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.Detail = [];
        this.http.get('api/selfanalysis/GetSavedData', options).subscribe(function (data) {
            debugger;
            _this.Detail = data;
            _this.GetSaveData = _this.Detail.data;
        });
    };
    Selfanalysis.prototype.EditData = function (i, Id) {
        var _this = this;
        this.BindClass();
        this.BindStream();
        this.ButtonText = 'Update';
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.http.get('api/selfanalysis/GetEditData?analysisid=' + Id, options).subscribe(function (data) {
            debugger;
            _this.GetEditedData = data;
            if (_this.GetEditedData.Status == true) {
                _this.analysisid = _this.GetEditedData.data.analysisid;
                _this.Selectedclass = _this.GetEditedData.data.classid;
                _this.Selectedstream = _this.GetEditedData.data.streamid;
                _this.description = _this.GetEditedData.data.description;
                _this.instruction = _this.GetEditedData.data.instruction;
            }
        });
    };
    Selfanalysis.prototype.DeleteData = function (i, Id) {
        var _this = this;
        var data;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        data =
            {
                "analysisid": Id
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
                _this.http.post('api/selfanalysis/DeleteActivity', body, options).subscribe(function (data) {
                    _this.DeletedData = data;
                    if (_this.DeletedData.Status == true) {
                        sweetalert2_1.default.fire("", "Deleted Successfully", "success");
                        _this.GetData();
                        return;
                    }
                });
            }
        });
    };
    Selfanalysis.prototype.onClear = function () {
        this.Selectedclass = 0;
        this.Selectedstream = 0;
        this.description = "";
        this.instruction = "";
        this.ButtonText = "Save";
        this.ButtonText = 'Update';
    };
    Selfanalysis = __decorate([
        core_1.Component({
            selector: 'app-selfanalysis',
            templateUrl: './selfanalysis.component.html',
        }),
        __metadata("design:paramtypes", [http_1.HttpClient, router_1.Router, angular_2_local_storage_1.LocalStorageService, ngx_toastr_1.ToastrService, ngx_ui_loader_1.NgxUiLoaderService])
    ], Selfanalysis);
    return Selfanalysis;
}());
exports.Selfanalysis = Selfanalysis;
//# sourceMappingURL=selfanalysis.component.js.map