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
var SampleSOPManager = /** @class */ (function () {
    function SampleSOPManager(http, router, localstorage, toaster, loader) {
        this.http = http;
        this.router = router;
        this.localstorage = localstorage;
        this.toaster = toaster;
        this.loader = loader;
        this.IntrestData = [];
        this.soptitle = "";
        this.description = "";
        this.ButtonText = "Save";
        this.GetSaveData = [];
        this.Details = [];
        this.intrestid = "";
        this.samplesopid = 0;
        this.samplesopdata = [];
        this.getsamplesop = [];
        this.EditSampleSopData = [];
        this.DeleteSampleSopData = [];
        this.search = "";
    }
    SampleSOPManager.prototype.ngOnInit = function () {
        this.BindIntrest();
        this.GetSavedData();
    };
    //Bind Intrest Area
    SampleSOPManager.prototype.BindIntrest = function () {
        var _this = this;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.http.get('api/samplesop/BindSopIntrest', options).subscribe(function (data) {
            debugger;
            _this.Details = data;
            if (_this.Details.status = true) {
                _this.IntrestData = _this.Details.data;
                _this.GetSavedData();
            }
            else {
                _this.toaster.error(_this.Details.message.toString(), '', { easeTime: 1000, timeOut: 3000 });
            }
            if (_this.EditSampleSopData.Status == true) {
                _this.intrestid = _this.EditSampleSopData.data[0].intrestid;
                var tmpintrestid = _this.EditSampleSopData.data[0].intrestid.split(",");
                for (var i = 0; i < _this.IntrestData.length; i++) {
                    for (var j = 0; j < tmpintrestid.length; j++) {
                        if (_this.IntrestData[i].intrestid == tmpintrestid[j]) {
                            _this.IntrestData[i].selected = true;
                        }
                    }
                }
                if (_this.IntrestData.length == tmpintrestid.length) {
                    _this.AllIntrest = true;
                }
                else {
                    _this.AllIntrest = false;
                }
            }
            else {
            }
        });
    };
    //save samplesop data
    SampleSOPManager.prototype.onSave = function () {
        var _this = this;
        if (this.ButtonText == "Save") {
            if (this.intrestid == '') {
                sweetalert2_1.default.fire("", "Please select interest area", "error");
                return;
            }
            if (this.soptitle == "" || this.soptitle == undefined) {
                sweetalert2_1.default.fire("", "Please enter title", "error");
                return;
            }
            var input = new FormData();
            input.append("samplesopid", this.samplesopid.toString());
            input.append("intrestid", this.intrestid.toString());
            input.append("title", this.soptitle.toString());
            input.append("description", this.description.toString());
            input.append("createdby", this.localstorage.get("userid").toString());
            this.http.post('api/samplesop/SaveSampleSopData', input)
                .subscribe(function (data) {
                debugger;
                _this.samplesopdata = data;
                if (_this.samplesopdata.Status == true) {
                    sweetalert2_1.default.fire("", "Saved Successfully", "success");
                    _this.onClear();
                    _this.GetSavedData();
                    return;
                }
            });
        }
        else {
            if (this.intrestid == '') {
                sweetalert2_1.default.fire("", "Please select intrest area", "error");
                return;
            }
            if (this.soptitle == "" || this.soptitle == undefined) {
                sweetalert2_1.default.fire("", "Please enter title", "error");
                return;
            }
            var input = new FormData();
            input.append("samplesopid", this.samplesopid.toString());
            input.append("intrestid", this.intrestid.toString());
            input.append("title", this.soptitle.toString());
            input.append("description", this.description.toString());
            input.append("createdby", this.localstorage.get("userid").toString());
            this.http.post('api/samplesop/UpdateSampleSopData', input)
                .subscribe(function (data) {
                debugger;
                _this.samplesopdata = data;
                if (_this.samplesopdata.Status == true) {
                    sweetalert2_1.default.fire("", "Updated Successfully", "success");
                    _this.onClear();
                    _this.GetSavedData();
                    return;
                }
            });
        }
    };
    SampleSOPManager.prototype.onClear = function () {
        for (var i = 0; i < this.IntrestData.length; i++) {
            this.IntrestData[i].selected = false;
        }
        this.AllIntrest = false;
        this.description = "";
        this.soptitle = "";
        this.ButtonText = "Save";
    };
    //get data for bind
    SampleSOPManager.prototype.GetSavedData = function () {
        var _this = this;
        debugger;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.http.get('api/samplesop/BindSampleSopData', options).subscribe(function (data) {
            debugger;
            _this.getsamplesop = data;
            //start
            var intrest;
            debugger;
            _this.GetSaveData = _this.getsamplesop.data;
            for (var i = 0; i < _this.GetSaveData.length; i++) {
                var intrestname = "";
                //for (var j = 0; j < this.GetSaveData[i].State.length; j++) {
                intrest = _this.GetSaveData[i].intrestname.split(",");
                //}
                //state
                for (var k = 0; k < intrest.length; k++) {
                    for (var l = 0; l < _this.IntrestData.length; l++) {
                        if (intrest[k] == _this.IntrestData[l].intrestid) {
                            if (k > 0) {
                                intrestname = intrestname + ", " + _this.IntrestData[l].intrestname;
                            }
                            else {
                                intrestname = intrestname + _this.IntrestData[l].intrestname;
                            }
                        }
                    }
                }
                _this.GetSaveData[i].intrestname = intrestname;
            }
            //end
        });
    };
    SampleSOPManager.prototype.EditData = function (i, samplesopid) {
        var _this = this;
        debugger;
        this.ButtonText = 'Update';
        var index = i;
        var samplesopid = samplesopid;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.http.get('api/samplesop/EditSampleSop?samplesopid=' + samplesopid, options).subscribe(function (data) {
            debugger;
            _this.EditSampleSopData = data;
            _this.samplesopid = _this.EditSampleSopData.data[0].samplesopid;
            _this.soptitle = _this.EditSampleSopData.data[0].title;
            _this.description = _this.EditSampleSopData.data[0].description;
            _this.BindIntrest();
        });
    };
    //delete samplesop data
    SampleSOPManager.prototype.DeleteData = function (i, samplesopid) {
        var _this = this;
        var data;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        data =
            {
                "samplesopid": samplesopid
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
                _this.http.post('api/samplesop/DeleteSampleSopData', body, options).subscribe(function (data) {
                    _this.DeleteSampleSopData = data;
                    if (_this.DeleteSampleSopData.Status == true) {
                        sweetalert2_1.default.fire("", "Deleted Successfully", "success");
                        _this.GetSavedData();
                        return;
                    }
                });
            }
        });
    };
    //select all intrest area
    SampleSOPManager.prototype.SelectAllIntrest = function () {
        debugger;
        this.intrestid = "";
        if (this.AllIntrest === true) {
            for (var i = 0; i < this.IntrestData.length; i++) {
                this.IntrestData[i].selected = true;
                if (this.intrestid === '') {
                    this.intrestid = this.IntrestData[i].intrestid;
                }
                else {
                    this.intrestid = this.intrestid + ',' + this.IntrestData[i].intrestid;
                }
            }
        }
        else {
            for (var i = 0; i < this.IntrestData.length; i++) {
                this.IntrestData[i].selected = false;
            }
        }
    };
    //get particular selected intrest area
    SampleSOPManager.prototype.getSelectedIntrest = function () {
        this.intrestid = "";
        var count = 0;
        for (var i = 0; i < this.IntrestData.length; i++) {
            if (this.IntrestData[i].selected === true) {
                if (this.intrestid === '') {
                    this.intrestid = this.IntrestData[i].intrestid;
                    count++;
                }
                else {
                    this.intrestid = this.intrestid + ',' + this.IntrestData[i].intrestid;
                    count++;
                }
            }
        }
        if (this.IntrestData.length === count) {
            this.AllIntrest = true;
        }
        else {
            this.AllIntrest = false;
        }
    };
    SampleSOPManager = __decorate([
        core_1.Component({
            selector: 'app-samplesop',
            templateUrl: './samplesop.component.html',
        }),
        __metadata("design:paramtypes", [http_1.HttpClient, router_1.Router, angular_2_local_storage_1.LocalStorageService, ngx_toastr_1.ToastrService, ngx_ui_loader_1.NgxUiLoaderService])
    ], SampleSOPManager);
    return SampleSOPManager;
}());
exports.SampleSOPManager = SampleSOPManager;
//# sourceMappingURL=samplesop.component.js.map