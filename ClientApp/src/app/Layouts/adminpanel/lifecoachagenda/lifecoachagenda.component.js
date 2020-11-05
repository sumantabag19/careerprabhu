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
var lifecoachagenda = /** @class */ (function () {
    function lifecoachagenda(http, router, localstorage, toaster, loader, renderer, config, config1) {
        this.http = http;
        this.router = router;
        this.localstorage = localstorage;
        this.toaster = toaster;
        this.loader = loader;
        this.renderer = renderer;
        this.config1 = config1;
        this.ButtonText = "Save";
        this.TopicDetails = [];
        this.TopicData = [];
        this.selectedtopic = 0;
        this.coachid = 0;
        this.lifecoachagendaData = [];
        this.Detail = [];
        this.GetSaveData = [];
        this.GetEditedData = [];
        this.DeletedData = [];
    }
    lifecoachagenda.prototype.ngOnInit = function () {
        this.getTopic();
        this.GetData();
    };
    lifecoachagenda.prototype.getTopic = function () {
        var _this = this;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.TopicDetails = [];
        var a;
        var tmpclass = [];
        this.http.get('api/lifecoachagenda/BindTopic', options).subscribe(function (data) {
            _this.TopicDetails = data;
            _this.TopicData = _this.TopicDetails;
        });
    };
    lifecoachagenda.prototype.onSubmit = function () {
        var _this = this;
        debugger;
        if (this.ButtonText == "Save") {
            if (this.selectedtopic == 0 || this.selectedtopic == undefined) {
                sweetalert2_1.default.fire("", "Please select Coach Type ", "error");
                return;
            }
            if (this.agenda == "" || this.agenda == undefined) {
                sweetalert2_1.default.fire("", "Please select Agenda", "error");
                return;
            }
            var input = new FormData();
            input.append("coachid", "0");
            input.append("coachtype", this.selectedtopic.toString());
            input.append("agenda", this.agenda.toString());
            input.append("createdby", this.localstorage.get("userid").toString());
            this.http.post('api/lifecoachagenda/Savelifecoachagenda', input)
                .subscribe(function (data) {
                debugger;
                _this.lifecoachagendaData = data;
                if (_this.lifecoachagendaData.Status == true) {
                    if (_this.lifecoachagendaData.Message == "Coach Details Already Exists") {
                        sweetalert2_1.default.fire("", "Coach Details Already Exists", "success");
                        return;
                    }
                    else {
                        sweetalert2_1.default.fire("", "Successfully Saved", "success");
                        _this.GetData();
                        _this.onClear();
                        return;
                    }
                }
            });
        }
        else {
            debugger;
            if (this.selectedtopic == 0 || this.selectedtopic == undefined) {
                sweetalert2_1.default.fire("", "Please select Coach Type ", "error");
                return;
            }
            if (this.agenda == "" || this.agenda == undefined) {
                sweetalert2_1.default.fire("", "Please select Agenda", "error");
                return;
            }
            var input = new FormData();
            input.append("coachid", this.coachid.toString());
            input.append("coachtype", this.selectedtopic.toString());
            input.append("agenda", this.agenda.toString());
            input.append("createdby", this.localstorage.get("userid").toString());
            this.http.post('api/lifecoachagenda/Updatelifecoachagenda', input)
                .subscribe(function (data) {
                debugger;
                _this.lifecoachagendaData = data;
                if (_this.lifecoachagendaData.Status == true) {
                    if (_this.lifecoachagendaData.Message == "Coach Details Already Exists") {
                        sweetalert2_1.default.fire("", "Coach Details Already Exists", "success");
                        return;
                    }
                    else {
                        sweetalert2_1.default.fire("", "Successfully Updated", "success");
                        _this.GetData();
                        _this.onClear();
                        return;
                    }
                }
            });
        }
    };
    lifecoachagenda.prototype.onClear = function () {
        this.agenda = "";
        this.selectedtopic = 0;
        this.ButtonText = "Save";
    };
    lifecoachagenda.prototype.GetData = function () {
        var _this = this;
        debugger;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.Detail = [];
        this.http.get('api/lifecoachagenda/GetSavedData', options).subscribe(function (data) {
            debugger;
            _this.Detail = data;
            _this.GetSaveData = _this.Detail.data;
        });
    };
    lifecoachagenda.prototype.EditData = function (i, Id) {
        var _this = this;
        this.getTopic();
        //this.BindCoupon();
        this.ButtonText = 'Update';
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.http.get('api/lifecoachagenda/GetEditData?coachid=' + Id, options).subscribe(function (data) {
            debugger;
            _this.GetEditedData = data;
            if (_this.GetEditedData.Status == true) {
                _this.getTopic();
                _this.selectedtopic = _this.GetEditedData.data.coachtype;
                _this.agenda = _this.GetEditedData.data.agenda;
                _this.coachid = _this.GetEditedData.data.coachid;
            }
        });
    };
    lifecoachagenda.prototype.DeleteData = function (i, Id) {
        var _this = this;
        var data;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        data =
            {
                "coachid": Id
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
                _this.http.post('api/lifecoachagenda/DeleteActivity', body, options).subscribe(function (data) {
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
    lifecoachagenda = __decorate([
        core_1.Component({
            selector: 'app-lifecoachagenda',
            templateUrl: './lifecoachagenda.component.html',
        }),
        __metadata("design:paramtypes", [http_1.HttpClient, router_1.Router, angular_2_local_storage_1.LocalStorageService, ngx_toastr_1.ToastrService, ngx_ui_loader_1.NgxUiLoaderService, core_1.Renderer2, ng_bootstrap_1.NgbTimepickerConfig, ng_bootstrap_1.NgbDatepickerConfig])
    ], lifecoachagenda);
    return lifecoachagenda;
}());
exports.lifecoachagenda = lifecoachagenda;
//# sourceMappingURL=lifecoachagenda.component.js.map