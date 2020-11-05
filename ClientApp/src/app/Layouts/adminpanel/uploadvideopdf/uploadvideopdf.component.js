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
var videopdfmanager = /** @class */ (function () {
    function videopdfmanager(http, router, localstorage, toaster, loader) {
        this.http = http;
        this.router = router;
        this.localstorage = localstorage;
        this.toaster = toaster;
        this.loader = loader;
        this.selectedpage = 0;
        this.videolink = "";
        this.SelectedImage = "";
        this.ButtonText = "Save";
        this.GetSaveData = [];
        this.pagedata = [];
        this.pdffile = [];
        this.orgpdfname = "";
        this.vid_pdfid = 0;
        this.UploadData = [];
        this.pagedatadetail = [];
        this.Details = [];
        this.GetEditedData = [];
        this.DeletedData = [];
        this.languagedata = [];
        this.selectedlanguage = 0;
        this.languagedatadetail = [];
    }
    videopdfmanager.prototype.ngOnInit = function () {
        this.getPage();
        this.Binddata();
        this.getLanguage();
    };
    //bind topic
    videopdfmanager.prototype.getPage = function () {
        var _this = this;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        var a;
        var tmpclass = [];
        this.http.get('api/uploadvideopdf/bindpage', options).subscribe(function (data) {
            debugger;
            _this.pagedatadetail = data;
            if (_this.pagedatadetail.Status == true) {
                _this.pagedata = _this.pagedatadetail.data;
            }
        });
    };
    videopdfmanager.prototype.getLanguage = function () {
        var _this = this;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        var a;
        var tmpclass = [];
        this.http.get('api/uploadvideopdf/bindlanguage', options).subscribe(function (data) {
            debugger;
            _this.languagedatadetail = data;
            if (_this.languagedatadetail.Status == true) {
                _this.languagedata = _this.languagedatadetail.data;
            }
        });
    };
    //get pdf details
    videopdfmanager.prototype.GetPdfDetail = function (event) {
        debugger;
        this.pdffile = event;
        var file = event.target.files[0];
        var fileList = event.target.files;
        this.pdftoupload = fileList[0];
        if (file.type.includes("pdf") || file.type.includes("doc") || file.type.includes("docx")) {
            this.orgpdfname = file.name;
        }
        else {
            sweetalert2_1.default.fire("", "Please Select File", "error");
            this.myInputVariabl.nativeElement.value = "";
        }
    };
    //save life coaches
    videopdfmanager.prototype.onSave = function () {
        var _this = this;
        debugger;
        if (this.ButtonText == "Save") {
            //validation start 
            if (this.selectedpage == 0 || this.selectedpage == undefined) {
                sweetalert2_1.default.fire("", "Please Select Any Page", "error");
                return;
            }
            if (this.selectedlanguage == 0 || this.selectedlanguage == undefined) {
                sweetalert2_1.default.fire("", "Please Select Any Language", "error");
                return;
            }
            if (this.videolink == "" || this.videolink == undefined) {
                sweetalert2_1.default.fire("", "Please Enter Video Link", "error");
                return;
            }
            if (this.orgpdfname == "" || this.orgpdfname == undefined) {
                sweetalert2_1.default.fire("", "Please Choose File", "error");
                return;
            }
            //validation end
            var input = new FormData();
            //input.append("video", this.videoToUpload);
            input.append("pdf", this.pdftoupload);
            input.append("vid_pdfid", this.vid_pdfid.toString());
            input.append("pageid", this.selectedpage.toString());
            input.append("orgpdfname", this.orgpdfname.toString());
            input.append("videolink", this.videolink);
            input.append("languageid", this.selectedlanguage.toString());
            input.append("createdby", this.localstorage.get("userid").toString());
            this.http.post('api/uploadvideopdf/saveportfoliodata', input)
                .subscribe(function (data) {
                debugger;
                _this.UploadData = data;
                if (_this.UploadData.Status == true) {
                    if (_this.UploadData.Message == "Video/PDF already exists") {
                        sweetalert2_1.default.fire("", "Video/PDF already exists", "error");
                        return;
                    }
                    else {
                        sweetalert2_1.default.fire("", "Saved Successfully", "success");
                        _this.Binddata();
                        _this.onClear();
                        return;
                    }
                }
            });
        }
        else {
            debugger;
            if (this.selectedpage == 0 || this.selectedpage == undefined) {
                sweetalert2_1.default.fire("", "Please Select Any Page", "error");
                return;
            }
            if (this.selectedlanguage == 0 || this.selectedlanguage == undefined) {
                sweetalert2_1.default.fire("", "Please Select Any Language", "error");
                return;
            }
            if (this.videolink == "" || this.videolink == undefined) {
                sweetalert2_1.default.fire("", "Please Enter Video Link", "error");
                return;
            }
            //validation end
            var input = new FormData();
            //input.append("video", this.videoToUpload);
            input.append("pdf", this.pdftoupload);
            input.append("vid_pdfid", this.vid_pdfid.toString());
            input.append("pageid", this.selectedpage.toString());
            input.append("orgpdfname", this.orgpdfname.toString());
            input.append("videolink", this.videolink);
            input.append("languageid", this.selectedlanguage.toString());
            input.append("createdby", this.localstorage.get("userid").toString());
            this.http.post('api/uploadvideopdf/updateportfoliodata', input)
                .subscribe(function (data) {
                _this.UploadData = data;
                if (_this.UploadData.Status == true) {
                    if (_this.UploadData.Message == "Video/PDF already exists") {
                        sweetalert2_1.default.fire("", "Video/PDF already exists", "error");
                        return;
                    }
                    else {
                        sweetalert2_1.default.fire("", "Updated Successfully", "success");
                        _this.Binddata();
                        _this.onClear();
                        return;
                    }
                }
            });
        }
    };
    //bind table data
    videopdfmanager.prototype.Binddata = function () {
        var _this = this;
        debugger;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.Details = [];
        this.http.get('api/uploadvideopdf/Bindtabledata', options).subscribe(function (data) {
            debugger;
            _this.Details = data;
            _this.GetSaveData = _this.Details.data;
        });
    };
    videopdfmanager.prototype.onClear = function () {
        this.selectedpage = 0;
        this.selectedlanguage = 0;
        this.ButtonText = "Save";
        this.videolink = "";
        this.myInputVariabl.nativeElement.value = "";
    };
    //edit record
    videopdfmanager.prototype.EditData = function (i, vid_pdfid) {
        var _this = this;
        debugger;
        this.ButtonText = 'Update';
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.http.get('api/uploadvideopdf/GetEditData?vid_pdfid=' + vid_pdfid, options).subscribe(function (data) {
            debugger;
            _this.GetEditedData = data;
            if (_this.GetEditedData.Status == true) {
                _this.getPage();
                _this.selectedpage = _this.GetEditedData.data.pageid;
                _this.selectedlanguage = _this.GetEditedData.data.languageid;
                _this.videolink = _this.GetEditedData.data.videolink;
                _this.videolink = _this.GetEditedData.data.videolink;
                _this.vid_pdfid = _this.GetEditedData.data.vid_pdfid;
            }
        });
    };
    //delete record
    videopdfmanager.prototype.DeleteData = function (i, vid_pdfid) {
        var _this = this;
        debugger;
        var data;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        data =
            {
                "video_pdfid": vid_pdfid,
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
                _this.http.post('api/uploadvideopdf/DeleteActivity', body, options).subscribe(function (data) {
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
    ], videopdfmanager.prototype, "myInputVariabl", void 0);
    videopdfmanager = __decorate([
        core_1.Component({
            selector: 'app-uploadvideopdf',
            templateUrl: './uploadvideopdf.component.html',
        }),
        __metadata("design:paramtypes", [http_1.HttpClient, router_1.Router, angular_2_local_storage_1.LocalStorageService, ngx_toastr_1.ToastrService, ngx_ui_loader_1.NgxUiLoaderService])
    ], videopdfmanager);
    return videopdfmanager;
}());
exports.videopdfmanager = videopdfmanager;
//# sourceMappingURL=uploadvideopdf.component.js.map