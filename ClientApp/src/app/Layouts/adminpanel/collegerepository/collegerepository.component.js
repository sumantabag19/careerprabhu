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
var xlsx = require("xlsx");
var collegerepository = /** @class */ (function () {
    function collegerepository(http, router, localstorage, toaster, loader, renderer, config, config1) {
        this.http = http;
        this.router = router;
        this.localstorage = localstorage;
        this.toaster = toaster;
        this.loader = loader;
        this.renderer = renderer;
        this.config1 = config1;
        // public page: number = 0;
        //public pageSize: number = 10;
        this.SelectedVideo = "";
        this.collegename = "";
        this.imagefile = [];
        this.Selectedcareer = 0;
        this.CareerData = [];
        this.careerdat = [];
        this.Selecteduniversity = 0;
        this.UniversityData = [];
        this.universitydat = [];
        this.description = "";
        this.Detail = [];
        this.ButtonText = 'Save';
        this.HeaderData = [];
        this.GetSaveData = [];
        this.SelectedImage = "";
        this.repositoryid = 0;
        this.GetEditedData = [];
        this.DeletedData = [];
        this.collegerepositoryData = [];
        this.orgImageName = "";
        this.image = "";
        this.display = "none";
        this.Details = [];
        this.checklink = false;
        this.checklink_v = false;
        this.selectedlanguage = 0;
        this.languagedata = [];
        this.languagedatadetail = [];
        //public IsSchool: boolean = false;  SelectedImage: any = [];
        this.SelectedImage1 = [];
        this.excelfile = [];
        this.arrayBuffer = [];
        this.exceldata = [];
        this.GetData1 = [];
        this.dw = "";
    }
    collegerepository.prototype.ngOnInit = function () {
        this.BindCareer();
        this.Bindcollege();
        this.GetData();
        this.getLanguage();
        this.dw = "http://admin.careerprabhu.com/collegerepository.xlsx";
    };
    collegerepository.prototype.incomingfile = function (event) {
        this.excelfile = event.target.files[0];
        //if (!this.excelfile.type.includes(".sheet")) {
        //  this.toaster.warning("Please upload only Excel files.", '', { easeTime: 1000, timeOut: 3000 });
        //  var $el = $('#UploadedFile');
        //  $el.wrap('<form>').closest('form').get(0).reset();
        //  $el.unwrap();
        //  this.excelfile = null;
        //}
    };
    collegerepository.prototype.Uploadexcel = function () {
        var _this = this;
        debugger;
        if (this.excelfile != undefined || this.excelfile != null) {
            var fileReader_1 = new FileReader();
            fileReader_1.onload = function (e) {
                _this.arrayBuffer = fileReader_1.result;
                var data = new Uint8Array(_this.arrayBuffer);
                var arr = new Array();
                for (var i = 0; i != data.length; ++i)
                    arr[i] = String.fromCharCode(data[i]);
                var bstr = arr.join("");
                var workbook = xlsx.read(bstr, { type: "binary" });
                var first_sheet_name = workbook.SheetNames[0];
                var worksheet = workbook.Sheets[first_sheet_name];
                //console.log(xlsx.utils.sheet_to_json(worksheet, { raw: true }));
                //
                _this.exceldata = xlsx.utils.sheet_to_json(worksheet, { raw: true });
                _this.ValidateExcel(_this.exceldata);
                //var $el = $('#UploadedFile');
                //$el.wrap('<form>').closest('form').get(0).reset();
                //$el.unwrap();
                //this.excelfile = null;
            };
            fileReader_1.readAsArrayBuffer(this.excelfile);
        }
        else {
            this.toaster.warning("Please choose an Excel file.");
        }
    };
    collegerepository.prototype.ValidateExcel = function (Data) {
        var _this = this;
        var Validate = true;
        var cols = ["college", "career", "language", "description", "videolink"];
        for (var i = 0; i < cols.length; i++) {
            //for (var j = 0; j < Data.length; j++) {
            //  if (Data[j][cols[i]] == undefined) {
            //    Swal.fire('Oops...', cols[i] + " is not available at  row number " + (j + 2), 'warning')
            //    var Validate = false;
            //    return;
            //  }
            //}
        }
        if (Validate == true) {
            debugger;
            var headers = new http_1.HttpHeaders({
                'Content-Type': 'application/json'
            });
            var options = { headers: headers };
            var data = {
                "schoolDatas": Data
            };
            var body = JSON.stringify(data);
            // this.Loader.start();
            this.http.post('api/collegerepository/Upload', body, options).subscribe(function (data) {
                // this.Loader.stop();
                debugger;
                _this.GetData1 = data;
                if (_this.GetData1.Status == true) {
                    sweetalert2_1.default.fire("", "Data Imported Succesfully", "success");
                    //this.onClear();
                    _this.GetData();
                    _this.myInputVariableprefile.nativeElement.value = "";
                    _this.excelfile = [];
                    return;
                }
                else {
                    sweetalert2_1.default.fire("", "Something Went Wrong", "success");
                    // this.onClear();
                    _this.GetData();
                    _this.myInputVariableprefile.nativeElement.value = "";
                    _this.excelfile = [];
                    return;
                }
            });
        }
    };
    collegerepository.prototype.getLanguage = function () {
        var _this = this;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        var a;
        var tmpclass = [];
        this.http.get('api/collegerepository/bindlanguage', options).subscribe(function (data) {
            debugger;
            _this.languagedatadetail = data;
            if (_this.languagedatadetail.Status == true) {
                _this.languagedata = _this.languagedatadetail.data;
            }
        });
    };
    collegerepository.prototype.BindCareer = function () {
        var _this = this;
        debugger;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.careerdat = [];
        var tmpclass = [];
        this.http.post('api/collegerepository/BindCareer', options).subscribe(function (data) {
            _this.careerdat = data;
            if (_this.careerdat.Status == true) {
                _this.CareerData = _this.careerdat.data;
            }
            else {
                _this.CareerData = _this.careerdat.data;
            }
        });
    };
    collegerepository.prototype.Bindcollege = function () {
        var _this = this;
        debugger;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.careerdat = [];
        var tmpclass = [];
        this.http.post('api/collegerepository/Bindcollege', options).subscribe(function (data) {
            _this.universitydat = data;
            if (_this.universitydat.Status == true) {
                _this.UniversityData = _this.universitydat.data;
            }
            else {
                _this.UniversityData = _this.universitydat.data;
            }
        });
    };
    collegerepository.prototype.GetImageDetail = function (event) {
        debugger;
        this.imagefile = event;
        var file = event.target.files[0];
        //let file = event.filesData[0];
        var fileList = event.target.files;
        //let fileList: FileList = file;
        //this.imageToUpload = file.rawFile;
        this.imageToUpload = fileList[0];
        if (file.type.includes("png") || file.type.includes("jpg") || file.type.includes("jpeg")) {
            //this.orgImageName = event.filesData[0].name;
            this.orgImageName = file.name;
        }
        else {
            sweetalert2_1.default.fire("", "Please Select Image", "error");
            this.myInputVariable.nativeElement.value = "";
        }
    };
    collegerepository.prototype.onSubmit = function () {
        var _this = this;
        debugger;
        if (this.ButtonText == "Save") {
            if (this.Selecteduniversity == 0 || this.Selecteduniversity == undefined) {
                sweetalert2_1.default.fire("", "Please enter collegename", "error");
                return;
            }
            //if (this.Selectedcollege.match(/[ˆ(\d|+|\-)]/)) {
            //  Swal.fire("", "Name should not contain digit", "error");
            //  return;
            //}
            if (this.Selectedcareer == 0 || this.Selectedcareer == undefined) {
                sweetalert2_1.default.fire("", "Please select career type", "error");
                return;
            }
            if (this.selectedlanguage == 0 || this.selectedlanguage == undefined) {
                sweetalert2_1.default.fire("", "Please select language", "error");
                return;
            }
            if (this.description == "" || this.description == undefined) {
                sweetalert2_1.default.fire("", "Please enter description", "error");
                return;
            }
            if (this.orgImageName == "" || this.orgImageName == undefined) {
                this.orgImageName == "";
            }
            //if (this.selectedvideo == "" || this.selectedvideo == undefined) {
            //  Swal.fire("", "Please choose videolink", "error");
            //  return;
            //}
            var input = new FormData();
            input.append("image", this.imageToUpload);
            input.append("videourl", this.SelectedVideo);
            input.append("repositoryid", "0");
            input.append("collegename", this.Selecteduniversity.toString());
            input.append("languageid", this.selectedlanguage.toString());
            input.append("careerid", this.Selectedcareer.toString());
            input.append("description", this.description.toString());
            input.append("orgimagename", this.orgImageName.toString());
            input.append("createdby", this.localstorage.get("userid").toString());
            this.http.post('api/collegerepository/savecollegerepository', input)
                .subscribe(function (data) {
                debugger;
                _this.collegerepositoryData = data;
                if (_this.collegerepositoryData.Status == true) {
                    if (_this.collegerepositoryData.Message == "Video Already Exists For College") {
                        sweetalert2_1.default.fire("", "Video Already Exists For College", "success");
                        _this.GetData();
                        return;
                    }
                    else {
                        sweetalert2_1.default.fire("", "Saved Successfully", "success");
                        _this.GetData();
                        _this.onClear();
                        return;
                    }
                }
            });
        }
        else {
            debugger;
            if (this.Selecteduniversity == 0 || this.Selecteduniversity == undefined) {
                sweetalert2_1.default.fire("", "Please enter collegename", "error");
                return;
            }
            //if (this.collegename.match(/[ˆ(\d|+|\-)]/)) {
            //  Swal.fire("", "Name should not contain digit", "error");
            //  return;
            //}
            if (this.Selectedcareer == 0 || this.Selectedcareer == undefined) {
                sweetalert2_1.default.fire("", "Please select career type", "error");
                return;
            }
            if (this.selectedlanguage == 0 || this.selectedlanguage == undefined) {
                sweetalert2_1.default.fire("", "Please select language", "error");
                return;
            }
            if (this.description == "" || this.description == undefined) {
                sweetalert2_1.default.fire("", "Please enter description", "error");
                return;
            }
            if (this.orgImageName == "" || this.orgImageName == undefined) {
                this.orgImageName == "";
            }
            //if (this.SelectedVideo == "" || this.SelectedVideo == undefined) {
            //  Swal.fire("", "Please choose videolink", "error");
            //  return;
            //}
            var input = new FormData();
            input.append("image", this.imageToUpload);
            input.append("repositoryid", this.repositoryid.toString());
            input.append("collegename", this.Selecteduniversity.toString());
            input.append("languageid", this.selectedlanguage.toString());
            input.append("careerid", this.Selectedcareer.toString());
            input.append("description", this.description.toString());
            input.append("orgimagename", this.orgImageName.toString());
            input.append("videourl", this.SelectedVideo);
            input.append("createdby", this.localstorage.get("userid").toString());
            this.http.post('api/collegerepository/updatecollegerepository', input)
                .subscribe(function (data) {
                debugger;
                _this.collegerepositoryData = data;
                if (_this.collegerepositoryData.Status == true) {
                    if (_this.collegerepositoryData.Message == "Video Already Exists For College") {
                        sweetalert2_1.default.fire("", "Video Already Exists For College", "success");
                        _this.GetData();
                        return;
                    }
                    else {
                        sweetalert2_1.default.fire("", "Updated Successfully", "success");
                        _this.GetData();
                        _this.onClear();
                        return;
                    }
                }
            });
        }
    };
    collegerepository.prototype.GetData = function () {
        var _this = this;
        debugger;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.Detail = [];
        this.http.get('api/collegerepository/GetSavedData', options).subscribe(function (data) {
            debugger;
            _this.Detail = data;
            _this.GetSaveData = _this.Detail.data;
            if (_this.GetSaveData[0].Image == "") {
                _this.checklink = true;
            }
            else {
                _this.checklink = false;
            }
        });
    };
    collegerepository.prototype.EditData = function (i, Id) {
        var _this = this;
        this.onClear();
        this.BindCareer();
        this.Bindcollege();
        this.getLanguage();
        this.ButtonText = 'Update';
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.http.get('api/collegerepository/GetEditData?repositoryid=' + Id, options).subscribe(function (data) {
            debugger;
            _this.GetEditedData = data;
            if (_this.GetEditedData.Status == true) {
                _this.repositoryid = _this.GetEditedData.data.repositoryid;
                _this.Selecteduniversity = _this.GetEditedData.data.collegename;
                _this.selectedlanguage = _this.GetEditedData.data.languageid;
                _this.Selectedcareer = _this.GetEditedData.data.careerid;
                _this.description = _this.GetEditedData.data.description;
                _this.SelectedVideo = _this.GetEditedData.data.videourl;
            }
        });
    };
    collegerepository.prototype.DeleteData = function (i, Id) {
        var _this = this;
        var data;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        data =
            {
                "repositoryid": Id
            };
        var body = JSON.stringify(data);
        sweetalert2_1.default.fire({
            text: 'Are you sure to delete this record?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No'
        }).then(function (result) {
            if (result.value) {
                _this.http.post('api/collegerepository/DeleteActivity', body, options).subscribe(function (data) {
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
    collegerepository.prototype.onClear = function () {
        debugger;
        this.Selecteduniversity = 0;
        this.ButtonText = 'Save';
        this.Selectedcareer = 0;
        this.SelectedVideo = "";
        this.SelectedImage = "";
        this.selectedlanguage = 0;
        this.orgImageName = "";
        this.description = "";
        this.myInputVariable.nativeElement.value = "";
    };
    __decorate([
        core_1.ViewChild('inputFile', { static: true }),
        __metadata("design:type", core_1.ElementRef)
    ], collegerepository.prototype, "myInputVariable", void 0);
    __decorate([
        core_1.ViewChild('fileInput', { static: true }),
        __metadata("design:type", core_1.ElementRef)
    ], collegerepository.prototype, "myInputVariableprefile", void 0);
    collegerepository = __decorate([
        core_1.Component({
            selector: 'app-collegerepository',
            templateUrl: './collegerepository.component.html',
            //styleUrls: ['./plannedactivity.component.css']
            providers: [{ provide: ng_bootstrap_1.NgbDateAdapter, useClass: ng_bootstrap_1.NgbDateNativeAdapter }, ng_bootstrap_1.NgbTimepickerConfig]
        }),
        __metadata("design:paramtypes", [http_1.HttpClient, router_1.Router, angular_2_local_storage_1.LocalStorageService, ngx_toastr_1.ToastrService, ngx_ui_loader_1.NgxUiLoaderService, core_1.Renderer2, ng_bootstrap_1.NgbTimepickerConfig, ng_bootstrap_1.NgbDatepickerConfig])
    ], collegerepository);
    return collegerepository;
}());
exports.collegerepository = collegerepository;
//# sourceMappingURL=collegerepository.component.js.map