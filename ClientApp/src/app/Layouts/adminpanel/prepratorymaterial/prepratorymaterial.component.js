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
var prepratorymaterialManager = /** @class */ (function () {
    function prepratorymaterialManager(http, router, localstorage, toaster, loader) {
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
        this.showstream = 0;
        this.pdffile = [];
        this.orgpdfname = "";
        this.docname = "";
        this.getsampledata = [];
        this.Selectedfile = [];
        this.selectedlogo = "";
        this.LogoData = [];
        this.Detail = [];
    }
    prepratorymaterialManager.prototype.ngOnInit = function () {
        //this.GetClass();
        //this.GetStream();
        this.GetSavedData();
        this.bindlogo();
    };
    prepratorymaterialManager.prototype.bindlogo = function () {
        var _this = this;
        debugger;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        var input = new FormData();
        this.http.get('api/prepratorymaterial/BindLogo').subscribe(function (data) {
            debugger;
            _this.Detail = data;
            _this.LogoData = _this.Detail.data;
        });
    };
    //get pdf details
    prepratorymaterialManager.prototype.GetPdfDetail = function (event) {
        debugger;
        this.pdffile = event;
        var file = event.target.files[0];
        var fileList = event.target.files;
        this.pdftoupload = fileList[0];
        if (file.type.includes("png") || file.type.includes("jpg") || file.type.includes("jpeg")) {
            this.orgpdfname = file.name;
        }
        else {
            sweetalert2_1.default.fire("", "Please Select Logo", "error");
            this.myInputVariableprefile.nativeElement.value = "";
        }
    };
    //Get all data for bind dropdowns
    //GetClass() {
    //  let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    //  let options = { headers: headers };
    //  this.http.get('api/prepratorymaterial/GetPrepClass', options).subscribe(
    //    (data) => {
    //      this.Details = data;
    //      if (this.Details.status == true) {
    //        this.ClassData = this.Details.data;
    //        this.GetStream();
    //      }
    //      else {
    //        this.toaster.error(this.Details.message.toString(), '', { easeTime: 1000, timeOut: 3000 })
    //      }
    //    }
    //  )
    //}
    //Delete Subscription Data
    prepratorymaterialManager.prototype.DeleteData = function (i, id) {
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
                _this.http.post('api/prepratorymaterial/deletePrep', body, options).subscribe(function (data) {
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
    //  this.http.get('api/prepratorymaterial/GetPrepStream', options).subscribe(
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
    //  if (this.ClassData.length === count) {
    //    this.AllClass = true;
    //  }
    //  else {
    //    this.AllClass = false;
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
    prepratorymaterialManager.prototype.onSubmit = function () {
        var _this = this;
        debugger;
        if (this.Topic == "" || this.Topic == undefined) {
            sweetalert2_1.default.fire("", "Please enter catagory name", "error");
            return;
        }
        //if (this.orgpdfname == "" || this.orgpdfname == undefined) {
        //  this.orgpdfname = "";
        //}
        var data;
        if (this.ButtonText == "Update") {
            debugger;
            var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
            var options = { headers: headers };
            debugger;
            var input = new FormData();
            input.append("pdf", this.pdftoupload);
            input.append("acttype", "update");
            input.append("classid", "");
            input.append("logoid", "");
            input.append("streamid", "");
            input.append("topic", this.Topic.toString());
            input.append("orgpdfname", this.selectedlogo.toString());
            input.append("createdby", this.localstorage.get("userid").toString());
            input.append("ID", this.ID.toString());
            debugger;
            this.http.post('api/prepratorymaterial/UpdatePrepratory', input).subscribe(function (data) {
                debugger;
                _this.StreamDetails = data;
                if (_this.StreamDetails.Status == true) {
                    if (_this.StreamDetails.Message == "Category Already Exists") {
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
            var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
            var options = { headers: headers };
            var input = new FormData();
            input.append("pdf", this.pdftoupload);
            input.append("acttype", "save");
            input.append("classid", "");
            input.append("streamid", "");
            input.append("topic", this.Topic.toString());
            input.append("orgpdfname", this.selectedlogo.toString());
            input.append("createdby", this.localstorage.get("userid").toString());
            input.append("ID", this.ID.toString());
            this.http.post('api/prepratorymaterial/SavePrepratory', input).subscribe(function (data) {
                _this.WebinarData = data;
                if (_this.WebinarData.status == true) {
                    if (_this.WebinarData.Message == "Category Already Exists") {
                        _this.GetSavedData();
                        sweetalert2_1.default.fire("", "Category Already Exists", "success");
                        // this.onClear();
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
    prepratorymaterialManager.prototype.GetSavedData = function () {
        var _this = this;
        debugger;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.http.get('api/prepratorymaterial/GetPrepSavedData', options).subscribe(function (data) {
            var a = 0;
            var b;
            debugger;
            _this.getsampledata = data;
            _this.GetSaveData = _this.getsampledata.data;
            _this.HeaderData = Object.keys(_this.GetSaveData);
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
    //  }
    //  else {
    //    for (var i = 0; i < this.ClassData.length; i++) {
    //      this.ClassData[i].selected = false;
    //    }
    //  }
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
    prepratorymaterialManager.prototype.onClear = function () {
        debugger;
        this.ButtonText = 'Save';
        this.Topic = "";
        this.orgpdfname = "";
        this.pdftoupload = [];
        this.orgpdfname = "";
        this.myInputVariableprefile.nativeElement.value = "";
        this.GetSavedData();
        this.selectedlogo = "";
        //for (var i = 0; i < this.ClassData.length; i++) {
        //  this.ClassData[i].selected = false;
        //}
        //for (var i = 0; i < this.StreamData.length; i++) {
        //  this.StreamData[i].selected = false;
        //}
    };
    //Edit Subscription Data 
    prepratorymaterialManager.prototype.EditData = function (i, ID) {
        var _this = this;
        debugger;
        this.ButtonText = 'Update';
        var index = i;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.http.get('api/prepratorymaterial/EditPrepratory?ID=' + ID, options).subscribe(function (data) {
            debugger;
            _this.EditSubsscriptionData = data;
            _this.ID = _this.EditSubsscriptionData.data.ID;
            //this.classid = this.EditSubsscriptionData.data.Classid;
            //this.streamid = this.EditSubsscriptionData.data.streamId;
            _this.Topic = _this.EditSubsscriptionData.data.Topic;
            _this.selectedlogo = _this.EditSubsscriptionData.data.selectedlogo;
            //var tmpClassId = this.EditSubsscriptionData.data.Classid.split(",");
            //for (var i = 0; i < this.ClassData.length; i++) {
            //  for (var j = 0; j < tmpClassId.length; j++) {
            //    if (this.ClassData[i].classid == tmpClassId[j]) {
            //      this.ClassData[i].selected = true;
            //    }
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
        });
    };
    __decorate([
        core_1.ViewChild('prevyearfile', { static: true }),
        __metadata("design:type", core_1.ElementRef)
    ], prepratorymaterialManager.prototype, "myInputVariableprefile", void 0);
    prepratorymaterialManager = __decorate([
        core_1.Component({
            selector: 'app-prepratorymaterial',
            templateUrl: './prepratorymaterial.component.html',
        }),
        __metadata("design:paramtypes", [http_1.HttpClient, router_1.Router, angular_2_local_storage_1.LocalStorageService, ngx_toastr_1.ToastrService, ngx_ui_loader_1.NgxUiLoaderService])
    ], prepratorymaterialManager);
    return prepratorymaterialManager;
}());
exports.prepratorymaterialManager = prepratorymaterialManager;
//# sourceMappingURL=prepratorymaterial.component.js.map