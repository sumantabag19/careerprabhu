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
var prepnameManager = /** @class */ (function () {
    function prepnameManager(http, router, localstorage, toaster, loader) {
        this.http = http;
        this.router = router;
        this.localstorage = localstorage;
        this.toaster = toaster;
        this.loader = loader;
        this.ButtonText = "Save";
        this.Details = [];
        this.ClassData = [];
        this.StreamDetails = [];
        this.StreamData = [];
        this.CareerDetails = [];
        this.CareerData = [];
        this.selectedprepcatagory = 0;
        this.AllClass = false;
        this.AllStream = false;
        this.AllCareer = false;
        this.classid = "";
        this.streamid = "";
        this.careerid = "";
        this.prepdetails = [];
        this.PrepData = [];
        this.description = "";
        this.prepname = "";
        this.prepnameid = 0;
        this.saveddatadetail = [];
        this.GetSaveData = [];
        this.HeaderData = [];
        this.EditPrepData = [];
        this.DeletedData = [];
        this.showstream = 0;
        this.search = "";
    }
    prepnameManager.prototype.ngOnInit = function () {
        this.bindprepcategory();
        this.GetClass();
        this.GetStream();
        this.GetCareer();
        this.GetSavedData();
    };
    //bind prepratory ategory
    prepnameManager.prototype.bindprepcategory = function () {
        var _this = this;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.prepdetails = [];
        var a;
        var tmpclass = [];
        this.http.get('api/prepratoryname/bindprepcategory', options).subscribe(function (data) {
            _this.prepdetails = data;
            if (_this.prepdetails.Status == true) {
                _this.PrepData = _this.prepdetails.data;
            }
        });
    };
    //Get all data for bind dropdowns
    prepnameManager.prototype.GetClass = function () {
        var _this = this;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.http.get('api/prepratoryname/GetPrepClass', options).subscribe(function (data) {
            _this.Details = data;
            if (_this.Details.status == true) {
                _this.ClassData = _this.Details.data;
            }
            else {
                _this.toaster.error(_this.Details.message.toString(), '', { easeTime: 1000, timeOut: 3000 });
            }
        });
    };
    // Get Streams Data
    prepnameManager.prototype.GetStream = function () {
        var _this = this;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.http.get('api/prepratoryname/GetPrepStream', options).subscribe(function (data) {
            _this.StreamDetails = data;
            if (_this.StreamDetails.status == true) {
                _this.StreamData = _this.StreamDetails.data;
            }
            else {
                _this.toaster.error(_this.StreamDetails.message.toString(), '', { easeTime: 1000, timeOut: 3000 });
            }
        });
    };
    //get career data
    prepnameManager.prototype.GetCareer = function () {
        var _this = this;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.http.get('api/prepratoryname/GetPrepCareer', options).subscribe(function (data) {
            _this.CareerDetails = data;
            if (_this.CareerDetails.status == true) {
                _this.CareerData = _this.CareerDetails.data;
            }
            else {
                _this.toaster.error(_this.CareerDetails.message.toString(), '', { easeTime: 1000, timeOut: 3000 });
            }
        });
    };
    //Select All function for class
    prepnameManager.prototype.SelectAllClass = function () {
        debugger;
        this.classid = "";
        if (this.AllClass === true) {
            for (var i = 0; i < this.ClassData.length; i++) {
                this.ClassData[i].selected = true;
                if (this.classid === '') {
                    this.classid = this.ClassData[i].classid;
                }
                else {
                    this.classid = this.classid + ',' + this.ClassData[i].classid;
                }
            }
            this.showstream = 1;
        }
        else {
            for (var i = 0; i < this.ClassData.length; i++) {
                this.ClassData[i].selected = false;
            }
            this.showstream = 0;
        }
    };
    //Select All function for stream
    prepnameManager.prototype.SelectAllStream = function () {
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
    //Select All function for career
    prepnameManager.prototype.SelectAllCareer = function () {
        debugger;
        this.careerid = "";
        if (this.AllCareer === true) {
            for (var i = 0; i < this.CareerData.length; i++) {
                this.CareerData[i].selected = true;
                if (this.careerid === '') {
                    this.careerid = this.CareerData[i].careerid;
                }
                else {
                    this.careerid = this.careerid + ',' + this.CareerData[i].careerid;
                }
            }
        }
        else {
            for (var i = 0; i < this.CareerData.length; i++) {
                this.CareerData[i].selected = false;
            }
        }
    };
    //get selected class
    prepnameManager.prototype.getSelectedClass = function () {
        debugger;
        this.classid = "";
        var count = 0;
        for (var i = 0; i < this.ClassData.length; i++) {
            if (this.ClassData[i].selected === true) {
                if (this.classid === '') {
                    this.classid = this.ClassData[i].classid;
                    count++;
                }
                else {
                    this.classid = this.classid + ',' + this.ClassData[i].classid;
                    count++;
                }
            }
            else {
                this.showstream = 0;
            }
        }
        for (var i = 0; i < this.ClassData.length; i++) {
            if (this.ClassData[i].selected === true) {
                if (this.ClassData[i].classid == 1 || this.ClassData[i].classid == 2 || this.ClassData[i].classid == 3) {
                    this.showstream = 0;
                }
                else {
                    this.showstream = 1;
                    this.GetStream();
                }
            }
            //else {
            //  this.showstream = 0;
            //}
        }
        if (this.ClassData.length === count) {
            this.AllClass = true;
        }
        else {
            this.AllClass = false;
        }
    };
    //get selected stream
    prepnameManager.prototype.getSelectedStream = function () {
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
    //get selected career
    prepnameManager.prototype.getSelectedCareer = function () {
        debugger;
        this.careerid = "";
        var count = 0;
        for (var i = 0; i < this.CareerData.length; i++) {
            if (this.CareerData[i].selected === true) {
                if (this.careerid === '') {
                    this.careerid = this.CareerData[i].careerid;
                    count++;
                }
                else {
                    this.careerid = this.careerid + ',' + this.CareerData[i].careerid;
                    count++;
                }
            }
        }
        if (this.CareerData.length === count) {
            this.AllCareer = true;
        }
        else {
            this.AllCareer = false;
        }
    };
    prepnameManager.prototype.onSubmit = function () {
        var _this = this;
        if (this.ButtonText == "Save") {
            if (this.classid == '' || this.classid == undefined) {
                sweetalert2_1.default.fire("", "Please select class", "error");
                return;
            }
            if (this.streamid == '' || this.streamid == undefined) {
                this.streamid = "";
            }
            if (this.careerid == '' || this.careerid == undefined) {
                this.careerid = "";
            }
            if (this.selectedprepcatagory == 0 || this.selectedprepcatagory == undefined) {
                sweetalert2_1.default.fire("", "Please enter Category", "error");
                return;
            }
            if (this.description == '' || this.description == undefined) {
                sweetalert2_1.default.fire("", "Please enter description", "error");
                return;
            }
            if (this.prepname == '' || this.prepname == undefined) {
                sweetalert2_1.default.fire("", "Please enter prepratory name", "error");
                return;
            }
            var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
            var options = { headers: headers };
            debugger;
            var data = {
                "prepnameid": this.prepnameid,
                "prepid": this.selectedprepcatagory,
                "classid": this.classid,
                "streamid": this.streamid,
                "careerid": this.careerid,
                "description": this.description,
                "prepname": this.prepname,
                "createdby": parseInt(this.localstorage.get("userid"))
            };
            var body = JSON.stringify(data);
            this.http.post('api/prepratoryname/SavePrepname', body, options).subscribe(function (data) {
                debugger;
                _this.saveddatadetail = data;
                if (_this.saveddatadetail.status == true) {
                    if (_this.saveddatadetail.Message == "Prepratory Title Already Exists") {
                        _this.GetSavedData();
                        sweetalert2_1.default.fire("", "Prepratory Title Already Exists", "success");
                        //this.onClear();
                        return;
                    }
                    else {
                        _this.GetSavedData();
                        sweetalert2_1.default.fire("", "Saved Successfully", "success");
                        _this.onClear();
                        return;
                    }
                }
            });
        }
        else {
            if (this.classid == '' || this.classid == undefined) {
                sweetalert2_1.default.fire("", "Please select class", "error");
                return;
            }
            if (this.streamid == '' || this.streamid == undefined) {
                this.streamid = "";
            }
            if (this.careerid == '' || this.careerid == undefined) {
                this.careerid = "";
            }
            if (this.selectedprepcatagory == 0 || this.selectedprepcatagory == undefined) {
                sweetalert2_1.default.fire("", "Please enter Category", "error");
                return;
            }
            if (this.description == '' || this.description == undefined) {
                sweetalert2_1.default.fire("", "Please enter description", "error");
                return;
            }
            if (this.prepname == '' || this.prepname == undefined) {
                sweetalert2_1.default.fire("", "Please enter prepratory name", "error");
                return;
            }
            var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
            var options = { headers: headers };
            debugger;
            var data = {
                "prepnameid": this.prepnameid,
                "prepid": this.selectedprepcatagory,
                "classid": this.classid,
                "streamid": this.streamid,
                "careerid": this.careerid,
                "description": this.description,
                "prepname": this.prepname,
                "createdby": parseInt(this.localstorage.get("userid"))
            };
            var body = JSON.stringify(data);
            this.http.post('api/prepratoryname/UpdatePrepName', body, options).subscribe(function (data) {
                debugger;
                _this.saveddatadetail = data;
                if (_this.saveddatadetail.status == true) {
                    if (_this.saveddatadetail.Message == "Prepratory Title Already Exists") {
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
    };
    //reset all field
    prepnameManager.prototype.onClear = function () {
        this.selectedprepcatagory = 0;
        this.description = "";
        this.prepname = "";
        this.ButtonText = "Save";
        for (var i = 0; i < this.ClassData.length; i++) {
            this.ClassData[i].selected = false;
            this.AllClass = false;
        }
        for (var i = 0; i < this.StreamData.length; i++) {
            this.StreamData[i].selected = false;
            this.AllStream = false;
        }
        for (var i = 0; i < this.CareerData.length; i++) {
            this.CareerData[i].selected = false;
            this.AllCareer = false;
        }
    };
    //bind table data
    //Get Saved Webinar data in table 
    prepnameManager.prototype.GetSavedData = function () {
        var _this = this;
        debugger;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.http.get('api/prepratoryname/GetPrepSavedData', options).subscribe(function (data) {
            var a;
            var b;
            var c;
            debugger;
            _this.GetSaveData = data;
            for (var i = 0; i < _this.GetSaveData.length; i++) {
                var classname = "";
                var streamname = "";
                var careername = "";
                debugger;
                for (var j = 0; j < _this.GetSaveData[i].classname.length; j++) {
                    a = _this.GetSaveData[i].classname.split(",");
                    b = _this.GetSaveData[i].streamname.split(",");
                    c = _this.GetSaveData[i].careername.split(",");
                }
                for (var k = 0; k < a.length; k++) {
                    for (var l = 0; l < _this.ClassData.length; l++) {
                        if (a[k] == _this.ClassData[l].classid) {
                            if (k > 0) {
                                classname = classname + ", " + _this.ClassData[l].classname;
                            }
                            else {
                                classname = classname + _this.ClassData[l].classname;
                            }
                        }
                    }
                }
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
                for (var k = 0; k < c.length; k++) {
                    for (var l = 0; l < _this.CareerData.length; l++) {
                        if (c[k] == _this.CareerData[l].careerid) {
                            if (k > 0) {
                                careername = careername + ", " + _this.CareerData[l].careername;
                            }
                            else {
                                careername = careername + _this.CareerData[l].careername;
                            }
                        }
                    }
                }
                _this.GetSaveData[i].classname = classname;
                _this.GetSaveData[i].streamname = streamname;
                _this.GetSaveData[i].careername = careername;
            }
            _this.HeaderData = Object.keys(_this.GetSaveData[0]);
        });
    };
    //Edit Subscription Data 
    prepnameManager.prototype.EditData = function (i, ID) {
        var _this = this;
        debugger;
        this.onClear();
        this.ButtonText = 'Update';
        var index = i;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.http.get('api/prepratoryname/EditPrepratory?prepnameid=' + ID, options).subscribe(function (data) {
            debugger;
            _this.EditPrepData = data;
            _this.prepnameid = _this.EditPrepData.data.prepnameid;
            _this.classid = _this.EditPrepData.data.classid;
            //this.GetCareer();
            _this.streamid = _this.EditPrepData.data.streamid;
            //this.GetStream();
            _this.careerid = _this.EditPrepData.data.careerid;
            _this.description = _this.EditPrepData.data.description;
            _this.prepname = _this.EditPrepData.data.prepname;
            _this.bindprepcategory();
            _this.selectedprepcatagory = _this.EditPrepData.data.prepid;
            var tmpClassId = _this.EditPrepData.data.classid.split(",");
            for (var i = 0; i < _this.ClassData.length; i++) {
                for (var j = 0; j < tmpClassId.length; j++) {
                    if (_this.ClassData[i].classid == tmpClassId[j]) {
                        _this.ClassData[i].selected = true;
                    }
                }
            }
            if (_this.ClassData.length == tmpClassId.length) {
                _this.AllClass = true;
            }
            else {
                _this.AllClass = false;
            }
            for (var i = 0; i < _this.ClassData.length; i++) {
                if (_this.ClassData[i].selected === true) {
                    if ((_this.ClassData[i].classid == 1 || _this.ClassData[i].classid == 2 || _this.ClassData[i].classid == 3)) {
                        _this.showstream = 0;
                    }
                    else {
                        _this.showstream = 1;
                        // this.GetStream();
                    }
                }
                //else {
                //  this.showstream = 0;
                //}
            }
            var tmpStreamid = _this.EditPrepData.data.streamid.split(",");
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
            var tmpCareerid = _this.EditPrepData.data.careerid.split(",");
            for (var i = 0; i < _this.CareerData.length; i++) {
                for (var j = 0; j < tmpCareerid.length; j++) {
                    if (_this.CareerData[i].careerid == tmpCareerid[j]) {
                        _this.CareerData[i].selected = true;
                    }
                }
            }
            if (_this.CareerData.length == tmpCareerid.length) {
                _this.AllCareer = true;
            }
            else {
                _this.AllCareer = false;
            }
        });
    };
    //delete record
    prepnameManager.prototype.DeleteData = function (i, Id) {
        var _this = this;
        var data;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        data =
            {
                "prepnameid": Id,
                "createdby": parseInt(this.localstorage.get("userid"))
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
                _this.http.post('api/prepratoryname/DeletePrepname', body, options).subscribe(function (data) {
                    _this.DeletedData = data;
                    if (_this.DeletedData.status == true) {
                        sweetalert2_1.default.fire("", "Deleted Successfully", "success");
                        _this.GetSavedData();
                        _this.onClear();
                        return;
                    }
                });
            }
        });
    };
    prepnameManager = __decorate([
        core_1.Component({
            selector: 'app-prepname',
            templateUrl: './prepname.component.html',
        }),
        __metadata("design:paramtypes", [http_1.HttpClient, router_1.Router, angular_2_local_storage_1.LocalStorageService, ngx_toastr_1.ToastrService, ngx_ui_loader_1.NgxUiLoaderService])
    ], prepnameManager);
    return prepnameManager;
}());
exports.prepnameManager = prepnameManager;
//# sourceMappingURL=prepname.component.js.map