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
var WebinarManager = /** @class */ (function () {
    function WebinarManager(http, router, localstorage, toaster, loader) {
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
        this.Topic = "";
        this.StreamData = [];
        this.streamid = "";
        this.streamname = "";
        this.WebinarData = [];
        this.GetSaveData = [];
        this.HeaderData = [];
        this.EditSubsscriptionData = [];
        this.ID = 0;
        this.classgroup = 0;
        this.showstream = 0;
    }
    WebinarManager.prototype.ngOnInit = function () {
        //this.GetClass();
        //this.GetStream();
        this.GetSavedData();
    };
    //Get all data for bind dropdowns
    //GetClass() {
    //  let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    //  let options = { headers: headers };
    //  this.http.get('api/Webinar/GetClass', options).subscribe(
    //    (data) => {
    //      debugger;
    //      this.Details = data;
    //      if (this.Details.status == true) {
    //        this.ClassData = this.Details.data;
    //        //this.GetStream();
    //      }
    //      else {
    //        this.toaster.error(this.Details.message.toString(), '', { easeTime: 1000, timeOut: 3000 })
    //      }
    //    }
    //  )
    //}
    //Delete Subscription Data
    WebinarManager.prototype.DeleteData = function (i, id) {
        var _this = this;
        debugger;
        var data;
        if (this.classid == null) {
            this.classid = "";
        }
        if (this.streamid == null) {
            this.streamid = "";
        }
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        debugger;
        data =
            {
                "acttype": "delete",
                "classid": "",
                "streamid": "",
                "topic": "",
                "createdby": parseInt(this.localstorage.get("userid")),
                "ID": id
            };
        var body = JSON.stringify(data);
        debugger;
        //this.http.post('api/Webinar/deleteWebinar', body, options).subscribe(
        //  (data) => {
        //    debugger;
        //    this.StreamDetails = data
        //    if (this.StreamDetails.Status == true) {
        //      this.GetSavedData();
        //      Swal.fire("", "Successfully deleted", "success");
        //      this.onClear();
        //      return;
        //    }
        //  }
        //)
        sweetalert2_1.default.fire({
            //title: 'Confirmation',
            text: 'Are you sure to delete this record?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No'
        }).then(function (result) {
            if (result.value) {
                _this.http.post('api/Webinar/deleteWebinar', body, options).subscribe(function (data) {
                    debugger;
                    _this.StreamDetails = data;
                    if (_this.StreamDetails.Status == true) {
                        _this.GetSavedData();
                        sweetalert2_1.default.fire("", "Successfully deleted", "success");
                        _this.onClear();
                        return;
                    }
                });
            }
        });
    };
    // Get Streams Data
    //GetStream() {
    //  let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    //  let options = { headers: headers };
    //  this.http.get('api/Webinar/getStream', options).subscribe(
    //    (data) => {
    //      this.StreamDetails = data;
    //      if (this.StreamDetails.status == true) {
    //        this.StreamData = this.StreamDetails.data;
    //        this.GetSavedData();
    //      }
    //      else {
    //        this.toaster.error(this.StreamDetails.message.toString(), '', { easeTime: 1000, timeOut: 3000 })
    //      }
    //    }
    //  )
    //}
    //getSelectedClass() {
    //  debugger;
    //  this.classid = "";
    //  var count = 0;
    //  for (var i = 0; i < this.ClassData.length; i++) {
    //    if (this.ClassData[i].selected === true) {
    //      if (this.classid === '') {
    //        this.classid = this.ClassData[i].classid;
    //        count++;
    //      }
    //      else {
    //        this.classid = this.classid + ',' + this.ClassData[i].classid;
    //        count++;
    //      }
    //    }
    //  }
    //  for (var i = 0; i < this.ClassData.length; i++) {
    //    if (this.ClassData[i].selected === true) {
    //      if (this.ClassData[i].classid == 1 || this.ClassData[i].classid == 2 || this.ClassData[i].classid == 3) {
    //        this.showstream = 0;
    //      }
    //      else {
    //        this.showstream = 1;
    //        this.GetStream();
    //      }
    //    }
    //    else {
    //      this.showstream = 0;
    //    }
    //  }
    //  if (this.ClassData.length === count) {
    //    this.AllClass = true;
    //    //this.showstream = 1;
    //    //this.GetStream();
    //  }
    //  else {
    //    this.AllClass = false;
    //    //this.showstream = 0;
    //  }
    //}
    //get stream
    //getSelectedStream() {
    //  debugger;
    //  this.streamid = "";
    //  var count = 0;
    //  for (var i = 0; i < this.StreamData.length; i++) {
    //    if (this.StreamData[i].selected === true) {
    //      if (this.streamid === '') {
    //        this.streamid = this.StreamData[i].streamid;
    //        count++;
    //      }
    //      else {
    //        this.streamid = this.streamid + ',' + this.StreamData[i].streamid;
    //        count++;
    //      }
    //    }
    //  }
    //  if (this.StreamData.length === count) {
    //    this.AllStream = true;
    //  }
    //  else {
    //    this.AllStream = false;
    //  }
    //}
    //On Save
    WebinarManager.prototype.onSubmit = function () {
        var _this = this;
        debugger;
        //if (this.classid == '')
        //{
        //  Swal.fire("", "Please select Class", "error");
        //  return;
        //}
        if (this.Topic == "" || this.Topic == undefined) {
            sweetalert2_1.default.fire("", "Please enter your topic", "error");
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
                    "classid": 0,
                    "streamid": 0,
                    "topic": this.Topic,
                    "createdby": parseInt(this.localstorage.get("userid")),
                    "ID": this.ID
                };
            var body = JSON.stringify(data);
            debugger;
            this.http.post('api/Webinar/UpdateWebinar', body, options).subscribe(function (data) {
                debugger;
                _this.StreamDetails = data;
                if (_this.StreamDetails.Status == true) {
                    if (_this.StreamDetails.Message == "Topic Already Exists") {
                        sweetalert2_1.default.fire("", "Topic Already Exists", "success");
                        _this.onClear();
                        _this.GetSavedData();
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
            var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
            var options = { headers: headers };
            data =
                {
                    "acttype": "save",
                    "classid": 0,
                    "streamid": 0,
                    "topic": this.Topic,
                    "createdby": parseInt(this.localstorage.get("userid")),
                    "ID": 0
                };
            var body = JSON.stringify(data);
            this.http.post('api/Webinar/SaveWebinar', body, options).subscribe(function (data) {
                debugger;
                _this.WebinarData = data;
                if (_this.WebinarData.status == true) {
                    if (_this.WebinarData.Message == "Topic Already Exists") {
                        sweetalert2_1.default.fire("", "Topic Already Exists", "success");
                        _this.onClear();
                        _this.GetSavedData();
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
    WebinarManager.prototype.GetSavedData = function () {
        var _this = this;
        debugger;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.http.get('api/Webinar/GetSavedData', options).subscribe(function (data) {
            var a;
            var b;
            debugger;
            _this.GetSaveData = data;
            //for (var i = 0; i < this.GetSaveData.length; i++) {
            //  var classname = "";
            //  var streamname = "";
            //  for (var j = 0; j < this.GetSaveData[i].Class.length; j++) {
            //    a = this.GetSaveData[i].Class.split(",");
            //    b = this.GetSaveData[i].Stream.split(",");
            //  }
            //  for (var k = 0; k < a.length; k++) {
            //    for (var l = 0; l < this.ClassData.length; l++) {
            //      if (a[k] == this.ClassData[l].classid) {
            //      if (k > 0) {
            //        classname = classname + ", " + this.ClassData[l].classname;
            //      }
            //      else {
            //        classname = classname + this.ClassData[l].classname;
            //      }
            //    }
            //    }
            //  }
            //  for (var k = 0; k < a.length; k++) {
            //    for (var l = 0; l < this.StreamData.length; l++) {
            //      if (b[k] == this.StreamData[l].streamid) {
            //        if (k > 0) {
            //          streamname = streamname + ", " + this.StreamData[l].streamname;
            //        }
            //        else {
            //          streamname = streamname + this.StreamData[l].streamname;
            //        }
            //      }
            //    }
            //  }
            //  this.GetSaveData[i].Class = classname;
            //  if (classname == "8th" || classname == "9th" || classname == "10th") {
            //    this.GetSaveData[i].Stream = "";
            //  }
            //  else {
            //    this.GetSaveData[i].Stream = streamname;
            //  }
            //}
            //for (var i = 0; i < a.length; i++) {
            //  for (var j = 0; j < this.ClassData.length; j++) {
            //    if (a[i] == this.ClassData[j].classid) {
            //      if (j>0) {
            //        classname = ","+ classname + this.ClassData[j].classname;
            //      }
            //      else {
            //        classname = classname + this.ClassData[j].classname;
            //      }
            //    }
            //  }
            //}
            //this.GetSaveData.Class = classname;
            _this.HeaderData = Object.keys(_this.GetSaveData[0]);
        });
    };
    //Select All function for class
    //SelectAllClass() {
    //  debugger;
    //  this.classid = "";
    //  if (this.AllClass === true) {
    //    for (var i = 0; i < this.ClassData.length; i++) {
    //      this.ClassData[i].selected = true;
    //      if (this.classid === '') {
    //        this.classid = this.ClassData[i].classid;
    //      }
    //      else {
    //        this.classid = this.classid + ',' + this.ClassData[i].classid;
    //      }
    //    }
    //    this.showstream = 1;
    //  }
    //  else {
    //    for (var i = 0; i < this.ClassData.length; i++) {
    //      this.ClassData[i].selected = false;
    //    }
    //    this.showstream = 0;
    //  }
    //  //this.showstream = 1;
    //  //this.GetStream();
    //}
    //Select All function for stream
    //SelectAllStream() {
    //  debugger;
    //  this.streamid = "";
    //  if (this.AllStream === true) {
    //    for (var i = 0; i < this.StreamData.length; i++) {
    //      this.StreamData[i].selected = true;
    //      if (this.streamid === '') {
    //        this.streamid = this.StreamData[i].streamid;
    //      }
    //      else {
    //        this.streamid = this.streamid + ',' + this.StreamData[i].streamid;
    //      }
    //    }
    //  }
    //  else {
    //    for (var i = 0; i < this.StreamData.length; i++) {
    //      this.StreamData[i].selected = false;
    //    }
    //  }
    //}
    WebinarManager.prototype.onClear = function () {
        debugger;
        //this.showstream = 0;
        this.ButtonText = 'Save';
        this.Topic = "";
        //  this.AllClass = false;
        //  this.AllStream = false;
        //for (var i = 0; i < this.ClassData.length; i++) {
        //  this.ClassData[i].selected = false;
        //}
        //for (var i = 0; i < this.StreamData.length; i++) {
        //  this.StreamData[i].selected = false;
        //}
    };
    //Edit Subscription Data 
    WebinarManager.prototype.EditData = function (i, ID) {
        var _this = this;
        debugger;
        this.ButtonText = 'Update';
        var index = i;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.http.get('api/Webinar/EditWebinAr?ID=' + ID, options).subscribe(function (data) {
            debugger;
            _this.EditSubsscriptionData = data;
            _this.ID = _this.EditSubsscriptionData.data.ID;
            // this.classid = this.EditSubsscriptionData.data.Classid;
            //this.streamid = this.EditSubsscriptionData.data.streamId;
            _this.Topic = _this.EditSubsscriptionData.data.Topic;
            //var tmpClassId = this.EditSubsscriptionData.data.Classid.split(",");
            //for (var i = 0; i < this.ClassData.length; i++) {
            //  for (var j = 0; j < tmpClassId.length; j++) {
            //    if (this.ClassData[i].classid == tmpClassId[j]) {
            //      this.ClassData[i].selected = true;
            //    }
            //  }
            //}
            //for (var i = 0; i < this.ClassData.length; i++) {
            //  if (this.ClassData[i].selected === true) {
            //    if (this.ClassData[i].classid == 1 || this.ClassData[i].classid == 2 || this.ClassData[i].classid == 3) {
            //      this.showstream = 0;
            //    }
            //    else {
            //      this.showstream = 1;
            //     // this.GetStream();
            //    }
            //  }
            //  else {
            //    this.showstream = 0;
            //  }
            //}
            //var tmpStreamid = this.EditSubsscriptionData.data.streamId.split(",");
            //for (var i = 0; i < this.StreamData.length; i++) {
            //  for (var j = 0; j < tmpStreamid.length; j++) {
            //    if (this.StreamData[i].streamid == tmpStreamid[j]) {
            //      this.StreamData[i].selected = true;
            //    }
            //  }
            //}
            ////if (this.StreamData.length == tmpStreamid.length) {
            ////  this.AllStream = true;
            ////}
            ////else {
            ////  this.AllStream = false;
            ////}
            //if (tmpClassId.length == 6) {
            //  this.AllClass = true;
            //}
            //if (tmpStreamid.length == 6) {
            //  this.AllStream = true;
            //}
        });
    };
    WebinarManager = __decorate([
        core_1.Component({
            selector: 'app-webinar',
            templateUrl: './webinar.component.html',
        }),
        __metadata("design:paramtypes", [http_1.HttpClient, router_1.Router, angular_2_local_storage_1.LocalStorageService, ngx_toastr_1.ToastrService, ngx_ui_loader_1.NgxUiLoaderService])
    ], WebinarManager);
    return WebinarManager;
}());
exports.WebinarManager = WebinarManager;
//# sourceMappingURL=webinar.component.js.map