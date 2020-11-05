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
//@Pipe({
//  name: 'safe'
//})
//export class SafePipePersonal implements PipeTransform {
//  constructor(protected sanitizer: DomSanitizer) { }
//  public transform(value: any, type: string): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
//    console.log(`Pipe Called!`);
//    switch (type) {
//      case 'html': return this.sanitizer.bypassSecurityTrustHtml(value);
//      case 'style': return this.sanitizer.bypassSecurityTrustStyle(value);
//      case 'script': return this.sanitizer.bypassSecurityTrustScript(value);
//      case 'url': return this.sanitizer.bypassSecurityTrustUrl(value);
//      case 'resourceUrl': return this.sanitizer.bypassSecurityTrustResourceUrl(value);
//      default: throw new Error(`Invalid safe type specified: ${type}`);
//    }
//  }
//}
var personalessaymanager = /** @class */ (function () {
    function personalessaymanager(http, router, localstorage, toaster, loader) {
        this.http = http;
        this.router = router;
        this.localstorage = localstorage;
        this.toaster = toaster;
        this.loader = loader;
        this.ButtonText = "Save";
        this.subjectlist = [];
        this.subjectdata = [];
        this.selectedsubject = 0;
        this.videofile = [];
        this.imagefile = [];
        this.orgVideoName = "";
        this.orgImageName = "";
        this.personalessayid = 0;
        this.personalessaydata = [];
        this.ClassDetails = [];
        this.ClassData = [];
        this.SelectedClass = 0;
        this.cid = 0;
        this.Detail = [];
        this.GetSaveData = [];
        this.HeaderData = [];
        this.GetEditedData = [];
        this.DeletedData = [];
        this.video = "";
        this.pdf = "";
        this.orgvideo = "";
        this.orgpdf = "";
        this.ClassName = "";
        this.SubjectName = "";
        this.SelectedImage = "";
        this.SelectedVideo = "";
        this.url = "";
    }
    personalessaymanager.prototype.ngOnInit = function () {
        //this.Bindsubject();
        this.getClass();
        this.Binddata();
        this.SelectedClass = 0;
        this.selectedsubject = 0;
    };
    //get video detail
    //GetVideoDetail(event) {
    //  debugger;
    //  this.videofile = event;
    //  let file = event.target.files[0];
    //  let fileList: FileList = event.target.files;
    //  this.videoToUpload = fileList[0];
    //  if (file.type.includes("video")) {
    //    this.orgVideoName = file.name;
    //  }
    //  else {
    //    Swal.fire("", "Please select a video file", "error");
    //  }
    //}
    //get pdf detail
    personalessaymanager.prototype.GetPdfDetail = function (event) {
        debugger;
        this.imagefile = event;
        var file = event.target.files[0];
        //let file = event.filesData[0];
        var fileList = event.target.files;
        //let fileList: FileList = file;
        this.imageToUpload = fileList[0];
        if (file.type.includes("pdf")) {
            this.orgImageName = file.name;
        }
        else {
            sweetalert2_1.default.fire("", "Please Select File", "error");
            this.myInputVariabl.nativeElement.value = "";
        }
    };
    //bind class
    personalessaymanager.prototype.getClass = function () {
        var _this = this;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.ClassDetails = [];
        var a;
        var tmpclass = [];
        this.http.get('api/personalessay/bindclass', options).subscribe(function (data) {
            _this.ClassDetails = data;
            if (_this.ClassDetails.Status == true) {
                _this.ClassData = _this.ClassDetails.data;
                //this.SelectedClass = this.ClassDetails.data.class_id;
            }
        });
    };
    //bind school
    personalessaymanager.prototype.Bindsubject = function () {
        var _this = this;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        var body = {
            "classid": this.SelectedClass
        };
        this.subjectlist = [];
        var tmpclass = [];
        this.http.post('api/personalessay/bindsubject', body, options).subscribe(function (data) {
            _this.subjectlist = data;
            if (_this.subjectlist.Status == true) {
                _this.subjectdata = _this.subjectlist.data;
            }
        });
    };
    //save personal essay data
    personalessaymanager.prototype.onSave = function () {
        var _this = this;
        if (this.ButtonText == "Save") {
            if (this.SelectedClass == 0 || this.SelectedClass == undefined) {
                sweetalert2_1.default.fire("", "Please select class", "error");
                return;
            }
            if (this.selectedsubject == 0 || this.selectedsubject == undefined) {
                sweetalert2_1.default.fire("", "Please select subject", "error");
                return;
            }
            if (this.SelectedVideo == "" || this.SelectedVideo == undefined) {
                sweetalert2_1.default.fire("", "Enter link", "error");
                return;
            }
            if (this.orgImageName == "" || this.orgImageName == undefined) {
                sweetalert2_1.default.fire("", "Please choose any file", "error");
                return;
            }
            var input = new FormData();
            //input.append("video", this.videoToUpload);
            input.append("image", this.imageToUpload);
            input.append("personalessayid", this.personalessayid.toString());
            input.append("subjectid", this.selectedsubject.toString());
            input.append("classid", this.SelectedClass.toString());
            input.append("orgvideoname", this.SelectedVideo);
            input.append("orgimagename", this.orgImageName);
            input.append("createdby", this.localstorage.get("userid").toString());
            this.http.post('api/personalessay/savepersonalessay', input)
                .subscribe(function (data) {
                debugger;
                _this.personalessaydata = data;
                if (_this.personalessaydata.length > 10) {
                    sweetalert2_1.default.fire("", "Saved Successfully", "success");
                    _this.onClear();
                    _this.Binddata();
                    return;
                }
            });
        }
        else {
            debugger;
            if (this.SelectedClass == 0 || this.SelectedClass == undefined) {
                sweetalert2_1.default.fire("", "Please select class", "error");
                return;
            }
            if (this.selectedsubject == 0 || this.selectedsubject == undefined) {
                sweetalert2_1.default.fire("", "Please select subject", "error");
                return;
            }
            if (this.SelectedVideo == "" || this.SelectedVideo == undefined) {
                sweetalert2_1.default.fire("", "Enter link", "error");
                return;
            }
            //if (this.orgImageName == "" || this.orgImageName == undefined) {
            //  Swal.fire("", "Please Choose any pdf", "error");
            //  return;
            //}
            var input = new FormData();
            //input.append("video", this.videoToUpload);
            input.append("image", this.imageToUpload);
            input.append("personalessayid", this.personalessayid.toString());
            input.append("subjectid", this.selectedsubject.toString());
            input.append("classid", this.SelectedClass.toString());
            input.append("orgvideoname", this.SelectedVideo);
            input.append("orgimagename", this.orgImageName);
            input.append("createdby", this.localstorage.get("userid").toString());
            this.http.post('api/personalessay/updatepersonalessay', input)
                .subscribe(function (data) {
                debugger;
                _this.personalessaydata = data;
                if (_this.personalessaydata.length > 10) {
                    sweetalert2_1.default.fire("", "Updated Successfully", "success");
                    _this.onClear();
                    _this.Binddata();
                    return;
                }
            });
        }
    };
    //reset all field
    personalessaymanager.prototype.onClear = function () {
        this.selectedsubject = 0;
        this.SelectedClass = 0;
        this.SelectedVideo = "";
        this.ButtonText = "Save";
        this.myInputVariabl.nativeElement.value = "";
    };
    //bind table data
    personalessaymanager.prototype.Binddata = function () {
        var _this = this;
        debugger;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.Detail = [];
        this.http.get('api/personalessay/Bindtabledata', options).subscribe(function (data) {
            debugger;
            _this.Detail = data;
            _this.GetSaveData = _this.Detail.data;
            //this.HeaderData = Object.keys(this.GetSaveData[0]);
            //this.orgvideo = this.GetSaveData[0].orgVideo;
            //this.orgpdf = this.GetSaveData[0].orgpdf;
        });
    };
    //edit record
    personalessaymanager.prototype.EditData = function (i, Id) {
        var _this = this;
        debugger;
        this.ButtonText = 'Update';
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.http.get('api/personalessay/GetEditData?personalessayid=' + Id, options).subscribe(function (data) {
            debugger;
            _this.GetEditedData = data;
            if (_this.GetEditedData.Status == true) {
                _this.getClass();
                _this.SelectedClass = _this.GetEditedData.data.classid;
                _this.Bindsubject();
                _this.selectedsubject = _this.GetEditedData.data.subjectid;
                _this.personalessayid = _this.GetEditedData.data.personalessayid;
                _this.SelectedVideo = _this.GetEditedData.data.VideoName;
            }
        });
    };
    //delete record
    personalessaymanager.prototype.DeleteData = function (i, Id) {
        var _this = this;
        var data;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        data =
            {
                "personalessayid": Id,
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
                _this.http.post('api/personalessay/DeleteActivity', body, options).subscribe(function (data) {
                    _this.DeletedData = data;
                    if (_this.DeletedData.Status == true) {
                        sweetalert2_1.default.fire("", "Deleted Successfully", "success");
                        _this.Binddata();
                        return;
                    }
                });
            }
        });
    };
    __decorate([
        core_1.ViewChild('inputfile', { static: true }),
        __metadata("design:type", core_1.ElementRef)
    ], personalessaymanager.prototype, "myInputVariabl", void 0);
    personalessaymanager = __decorate([
        core_1.Component({
            selector: 'app-personalessay',
            templateUrl: './personalessay.component.html',
        }),
        __metadata("design:paramtypes", [http_1.HttpClient, router_1.Router, angular_2_local_storage_1.LocalStorageService, ngx_toastr_1.ToastrService, ngx_ui_loader_1.NgxUiLoaderService])
    ], personalessaymanager);
    return personalessaymanager;
}());
exports.personalessaymanager = personalessaymanager;
//# sourceMappingURL=personalessay.component.js.map