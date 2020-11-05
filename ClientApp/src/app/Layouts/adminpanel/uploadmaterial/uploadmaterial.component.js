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
var uploadmaterialmanager = /** @class */ (function () {
    function uploadmaterialmanager(http, router, localstorage, toaster, loader) {
        this.http = http;
        this.router = router;
        this.localstorage = localstorage;
        this.toaster = toaster;
        this.loader = loader;
        this.ButtonText = "Save";
        this.selectedprepcatagory = 0;
        this.selectedtitle = 0;
        this.prepdetails = [];
        this.PrepData = [];
        this.title = [];
        this.TitleData = [];
        this.pdffile = [];
        this.orgpdfname = "";
        this.imagefile = [];
        this.orgimagename = "";
        this.pname = "";
        this.ptext = "";
        this.purl = "";
        this.prevyearid = 0;
        this.prevyeardata = [];
        this.Details = [];
        this.GetSaveData = [];
        this.GetPrevyearEditedData = [];
        this.DeleteprevdData = [];
        this.Selectedfile = [];
        this.SelectedImage = [];
        this.Selectedsamplefile = [];
        this.SelectedsampleImage = [];
        this.Selectedadhocfile = [];
        this.SelectedadhocImage = [];
        //sample paper variable
        this.ButtonSampleText = "Save";
        this.samplepdffile = [];
        this.sampleorgpdfname = "";
        this.sampleimagefile = [];
        this.sampleorgimagename = "";
        this.sname = "";
        this.stext = "";
        this.surl = "";
        this.sampleid = 0;
        this.SampleDetails = [];
        this.GetSavesampleData = [];
        this.GetSampleEditedData = [];
        this.DeletesampledData = [];
        this.sampledata = [];
        //Mock test variable
        this.ButtonMockText = "Save";
        this.mockdata = [];
        this.mname = "";
        this.mtext = "";
        this.murl = "";
        this.mockid = 0;
        this.MockDetails = [];
        this.GetSavemockData = [];
        this.GetMockEditedData = [];
        this.DeletemockData = [];
        //Adhoc Material variable
        this.ButtonAdhocText = "Save";
        this.adhocdata = [];
        this.aname = "";
        this.atext = "";
        this.aurl = "";
        this.adhocid = 0;
        this.AdhocDetails = [];
        this.GetSaveadhocData = [];
        this.GetadhocEditedData = [];
        this.DeleteadhocData = [];
        //prepratory material variable
        this.ButtonResourceText = "Save";
        this.resourcedata = [];
        this.rname = "";
        this.rtext = "";
        this.rurl = "";
        this.author = "";
        this.publish = "";
        this.description = "";
        this.resourceid = 0;
        this.ResourceDetails = [];
        this.GetSaveresourceData = [];
        this.GetresourceEditedData = [];
        this.DeleteresourceData = [];
        //online free variable
        this.ButtonFreeText = "Save";
        this.fname = "";
        this.ftext = "";
        this.furl = "";
        this.freedata = [];
        this.fdescription = "";
        this.freeid = 0;
        this.FreeDetails = [];
        this.GetSavefreeData = [];
        this.GetfreeEditedData = [];
        this.DeletefreeData = [];
        //variable for paid link
        this.ButtonpaidText = "Save";
        this.paidname = "";
        this.paidtext = "";
        this.paidurl = "";
        this.paiddata = [];
        this.paiddescription = "";
        this.paidid = 0;
        this.PaidDetails = [];
        this.GetSavepaidData = [];
        this.GetpaidEditedData = [];
        this.DeletepaidData = [];
        this.subjectList = [];
        this.attachmentfile = [];
        this.subjectid = 0;
        this.sectionid = 0;
        this.search = "";
        this.search1 = "";
        this.search2 = "";
        this.search3 = "";
        this.search4 = "";
        this.search5 = "";
        this.search6 = "";
        this.prevyearrecord = 0;
        this.samplerecord = 0;
        this.Mockrecord = 0;
        this.adhocrecord = 0;
        this.resourcerecord = 0;
        this.freerecord = 0;
        this.paidrecord = 0;
    }
    uploadmaterialmanager.prototype.ngOnInit = function () {
        this.bindprepcategory();
        this.Bindprevyeardata();
        this.Bindsampledata();
        this.Bindmockdata();
        this.Bindadhocdata();
        this.Bindresourcedata();
        this.Bindfreedata();
        this.Bindpaiddata();
        this.Bindprevyeardata();
    };
    uploadmaterialmanager.prototype.GetAdhocPdfDetail = function (event) {
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
            this.myInputVariableadhocfile.nativeElement.value = "";
        }
    };
    //get image details
    uploadmaterialmanager.prototype.GetAdhocImageDetail = function (event) {
        debugger;
        this.imagefile = event;
        var file = event.target.files[0];
        var fileList = event.target.files;
        //let fileList: FileList = file;
        this.imagetoupload = fileList[0];
        if (file.type.includes("png") || file.type.includes("jpg") || file.type.includes("jpeg")) {
            this.orgimagename = file.name;
        }
        else {
            sweetalert2_1.default.fire("", "Please Select Image", "error");
            this.myInputVariableadhocimage.nativeElement.value = "";
        }
    };
    //bind prepratory ategory
    uploadmaterialmanager.prototype.bindprepcategory = function () {
        var _this = this;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.prepdetails = [];
        var a;
        var tmpclass = [];
        this.http.get('api/uploadprevyearmaterial/bindprepcategory', options).subscribe(function (data) {
            _this.prepdetails = data;
            if (_this.prepdetails.Status == true) {
                _this.PrepData = _this.prepdetails.data;
            }
        });
    };
    //bind title
    uploadmaterialmanager.prototype.Bindtitle = function () {
        var _this = this;
        debugger;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.title = [];
        var body = {
            "prepid": this.selectedprepcatagory
        };
        var tmpclass = [];
        this.http.post('api/uploadprevyearmaterial/bindtitle', body, options).subscribe(function (data) {
            _this.title = data;
            if (_this.title.Status == true) {
                _this.TitleData = _this.title.data;
            }
            else {
                _this.TitleData = _this.title.data;
            }
        });
    };
    //bind all table
    uploadmaterialmanager.prototype.BindAllTable = function () {
        var _this = this;
        debugger;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.title = [];
        var body = {
            "prepid": this.selectedprepcatagory,
            "prepnameid": this.selectedtitle
        };
        var tmpclass = [];
        this.http.post('api/uploadprevyearmaterial/BindAllTableData', body, options).subscribe(function (data) {
            debugger;
            _this.Details = data;
            _this.GetSaveData = _this.Details.data1;
            _this.prevyearrecord = _this.GetSaveData.length;
            //this.SampleDetails = data;
            _this.GetSavesampleData = _this.Details.data2;
            _this.samplerecord = _this.GetSavesampleData.length;
            // this.MockDetails = data;
            _this.GetSavemockData = _this.Details.data3;
            _this.Mockrecord = _this.GetSavemockData.length;
            //this.AdhocDetails = data;
            _this.GetSaveadhocData = _this.Details.data4;
            _this.adhocrecord = _this.GetSaveadhocData.length;
            // this.ResourceDetails = data;
            _this.GetSaveresourceData = _this.Details.data5;
            //this.FreeDetails = data;
            _this.GetSavefreeData = _this.Details.data6;
            _this.freerecord = _this.GetSavefreeData.length;
            //this.PaidDetails = data;
            _this.GetSavepaidData = _this.Details.data7;
            _this.paidrecord = _this.GetSavepaidData.length;
        });
    };
    //get pdf details
    uploadmaterialmanager.prototype.GetPdfDetail = function (event) {
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
            this.myInputVariableprefile.nativeElement.value = "";
        }
    };
    //get image details
    uploadmaterialmanager.prototype.GetImageDetail = function (event) {
        debugger;
        this.imagefile = event;
        var file = event.target.files[0];
        var fileList = event.target.files;
        //let fileList: FileList = file;
        this.imagetoupload = fileList[0];
        if (file.type.includes("png") || file.type.includes("jpg") || file.type.includes("jpeg")) {
            this.orgimagename = file.name;
        }
        else {
            sweetalert2_1.default.fire("", "Please Select Image", "error");
            this.myInputVariablepreimage.nativeElement.value = "";
        }
    };
    //save previous year data
    uploadmaterialmanager.prototype.PreviousYearSave = function () {
        var _this = this;
        if (this.ButtonText == "Save") {
            if (this.selectedprepcatagory == 0 || this.selectedprepcatagory == undefined) {
                sweetalert2_1.default.fire("", "Please select category", "error");
                return;
            }
            if (this.selectedtitle == 0 || this.selectedtitle == undefined) {
                sweetalert2_1.default.fire("", "Please select title", "error");
                return;
            }
            if (this.pname == "" || this.pname == undefined) {
                sweetalert2_1.default.fire("", "Please define name", "error");
                return;
            }
            if (this.ptext == "" || this.ptext == undefined) {
                sweetalert2_1.default.fire("", "Please entrt display text", "error");
                return;
            }
            if (this.purl == "" || this.purl == undefined) {
                this.purl == "";
            }
            if (this.orgpdfname == "" || this.orgpdfname == undefined) {
                sweetalert2_1.default.fire("", "Please choose any pdf", "error");
                return;
            }
            if (this.orgimagename == "" || this.orgimagename == undefined) {
                sweetalert2_1.default.fire("", "Please choose any image", "error");
                return;
            }
            var input = new FormData();
            input.append("pdf", this.pdftoupload);
            input.append("image", this.imagetoupload);
            input.append("prevyearid", this.prevyearid.toString());
            input.append("prepid", this.selectedprepcatagory.toString());
            input.append("prepnameid", this.selectedtitle.toString());
            input.append("pname", this.pname.toString());
            input.append("ptext", this.ptext.toString());
            input.append("purl", this.purl.toString());
            input.append("orgpdfname", this.orgpdfname.toString());
            input.append("orgimagename", this.orgimagename.toString());
            input.append("createdby", this.localstorage.get("userid").toString());
            this.http.post('api/uploadprevyearmaterial/savepreviousyeardata', input)
                .subscribe(function (data) {
                debugger;
                _this.prevyeardata = data;
                if (_this.prevyeardata.length > 10) {
                    sweetalert2_1.default.fire("", "Saved Successfully", "success");
                    _this.onClearPreviousYear();
                    _this.Bindprevyeardata();
                    return;
                }
            });
        }
        else {
            if (this.selectedprepcatagory == 0 || this.selectedprepcatagory == undefined) {
                sweetalert2_1.default.fire("", "Please select category", "error");
                return;
            }
            if (this.selectedtitle == 0 || this.selectedtitle == undefined) {
                sweetalert2_1.default.fire("", "Please select title", "error");
                return;
            }
            if (this.pname == "" || this.pname == undefined) {
                sweetalert2_1.default.fire("", "Please define name", "error");
                return;
            }
            if (this.ptext == "" || this.ptext == undefined) {
                sweetalert2_1.default.fire("", "Please entrt display text", "error");
                return;
            }
            if (this.purl == "" || this.purl == undefined) {
                this.purl == "";
            }
            var input = new FormData();
            input.append("pdf", this.pdftoupload);
            input.append("image", this.imagetoupload);
            input.append("prevyearid", this.prevyearid.toString());
            input.append("prepid", this.selectedprepcatagory.toString());
            input.append("prepnameid", this.selectedtitle.toString());
            input.append("pname", this.pname.toString());
            input.append("ptext", this.ptext.toString());
            input.append("purl", this.purl.toString());
            input.append("orgpdfname", this.orgpdfname.toString());
            input.append("orgimagename", this.orgimagename.toString());
            input.append("createdby", this.localstorage.get("userid").toString());
            this.http.post('api/uploadprevyearmaterial/updatepreviousyeardata', input)
                .subscribe(function (data) {
                debugger;
                _this.prevyeardata = data;
                if (_this.prevyeardata.length > 10) {
                    sweetalert2_1.default.fire("", "Updated Successfully", "success");
                    _this.onClearPreviousYear();
                    _this.Bindprevyeardata();
                    return;
                }
            });
        }
    };
    uploadmaterialmanager.prototype.onClearPreviousYear = function () {
        this.selectedprepcatagory = 0;
        this.selectedtitle = 0;
        this.pname = "";
        this.ptext = "";
        this.purl = "";
        this.orgpdfname = "";
        this.orgimagename = "";
        this.pdftoupload = [];
        this.imagetoupload = [];
        this.orgpdfname = "";
        this.orgimagename = "";
        this.ButtonText = "Save";
        this.myInputVariableprefile.nativeElement.value = "";
        this.myInputVariablepreimage.nativeElement.value = "";
        this.Bindprevyeardata();
    };
    //bind table data
    uploadmaterialmanager.prototype.Bindprevyeardata = function () {
        var _this = this;
        debugger;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.Details = [];
        this.http.get('api/uploadprevyearmaterial/Bindtabledata', options).subscribe(function (data) {
            debugger;
            _this.Details = data;
            _this.GetSaveData = _this.Details.data;
            _this.prevyearrecord = _this.GetSaveData.length;
        });
    };
    //edit record
    uploadmaterialmanager.prototype.EditPData = function (i, Id) {
        var _this = this;
        debugger;
        this.ButtonText = 'Update';
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.http.get('api/uploadprevyearmaterial/GetEditprevyearData?prevyearid=' + Id, options).subscribe(function (data) {
            debugger;
            _this.GetPrevyearEditedData = data;
            if (_this.GetPrevyearEditedData.Status == true) {
                _this.bindprepcategory();
                _this.selectedprepcatagory = _this.GetPrevyearEditedData.data.prepid;
                _this.Bindtitle();
                _this.selectedtitle = _this.GetPrevyearEditedData.data.prepnameid;
                _this.pname = _this.GetPrevyearEditedData.data.pname;
                _this.ptext = _this.GetPrevyearEditedData.data.ptext;
                _this.purl = _this.GetPrevyearEditedData.data.purl;
                _this.prevyearid = _this.GetPrevyearEditedData.data.prevyearid;
            }
        });
    };
    //delete record
    uploadmaterialmanager.prototype.DeletePData = function (i, Id) {
        var _this = this;
        var data;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        data =
            {
                "prevyearid": Id
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
                _this.http.post('api/uploadprevyearmaterial/Deleteprevyeardata', body, options).subscribe(function (data) {
                    _this.DeleteprevdData = data;
                    if (_this.DeleteprevdData.Status == true) {
                        sweetalert2_1.default.fire("", "Deleted Successfully", "success");
                        _this.Bindprevyeardata();
                        return;
                    }
                });
            }
        });
    };
    //sample paper code start here
    //get pdf details
    uploadmaterialmanager.prototype.GetSummerPdfDetail = function (event) {
        debugger;
        this.samplepdffile = event;
        var file = event.target.files[0];
        var fileList = event.target.files;
        this.samplepdftoupload = fileList[0];
        if (file.type.includes("pdf") || file.type.includes("doc") || file.type.includes("docx")) {
            this.sampleorgpdfname = file.name;
        }
        else {
            sweetalert2_1.default.fire("", "Please Select File", "error");
            this.myInputVariablesamplefile.nativeElement.value = "";
        }
    };
    //get image details
    uploadmaterialmanager.prototype.GetSummerImageDetail = function (event) {
        debugger;
        this.sampleimagefile = event;
        var file = event.target.files[0];
        var fileList = event.target.files;
        this.sampleimagetoupload = fileList[0];
        if (file.type.includes("png") || file.type.includes("jpg") || file.type.includes("jpeg")) {
            this.sampleorgimagename = file.name;
        }
        else {
            sweetalert2_1.default.fire("", "Please select image", "error");
            this.myInputVariablesampleimage.nativeElement.value = "";
        }
    };
    //save previous year data
    uploadmaterialmanager.prototype.SampleSave = function () {
        var _this = this;
        if (this.ButtonSampleText == "Save") {
            if (this.selectedprepcatagory == 0 || this.selectedprepcatagory == undefined) {
                sweetalert2_1.default.fire("", "Please select category", "error");
                return;
            }
            if (this.selectedtitle == 0 || this.selectedtitle == undefined) {
                sweetalert2_1.default.fire("", "Please select title", "error");
                return;
            }
            if (this.sname == "" || this.sname == undefined) {
                sweetalert2_1.default.fire("", "Please define name", "error");
                return;
            }
            if (this.stext == "" || this.stext == undefined) {
                sweetalert2_1.default.fire("", "Please entrt display text", "error");
                return;
            }
            if (this.surl == "" || this.surl == undefined) {
                this.surl == "";
            }
            if (this.sampleorgpdfname == "" || this.sampleorgpdfname == undefined) {
                this.sampleorgpdfname == "";
            }
            if (this.sampleorgimagename == "" || this.sampleorgimagename == undefined) {
                this.sampleorgimagename == "";
            }
            var input = new FormData();
            input.append("pdf", this.samplepdftoupload);
            input.append("image", this.sampleimagetoupload);
            input.append("sampleid", this.sampleid.toString());
            input.append("prepid", this.selectedprepcatagory.toString());
            input.append("prepnameid", this.selectedtitle.toString());
            input.append("sname", this.sname.toString());
            input.append("stext", this.stext.toString());
            input.append("surl", this.surl.toString());
            input.append("orgpdfname", this.sampleorgpdfname.toString());
            input.append("orgimagename", this.sampleorgimagename.toString());
            input.append("createdby", this.localstorage.get("userid").toString());
            this.http.post('api/uploadprevyearmaterial/savesampledata', input)
                .subscribe(function (data) {
                debugger;
                _this.sampledata = data;
                if (_this.sampledata.length > 10) {
                    sweetalert2_1.default.fire("", "Saved Successfully", "success");
                    _this.onClearSample();
                    _this.Bindsampledata();
                    return;
                }
            });
        }
        else {
            if (this.selectedprepcatagory == 0 || this.selectedprepcatagory == undefined) {
                sweetalert2_1.default.fire("", "Please select category", "error");
                return;
            }
            if (this.selectedtitle == 0 || this.selectedtitle == undefined) {
                sweetalert2_1.default.fire("", "Please select title", "error");
                return;
            }
            if (this.sname == "" || this.sname == undefined) {
                sweetalert2_1.default.fire("", "Please define name", "error");
                return;
            }
            if (this.stext == "" || this.stext == undefined) {
                sweetalert2_1.default.fire("", "Please entrt display text", "error");
                return;
            }
            if (this.surl == "" || this.surl == undefined) {
                this.surl == "";
            }
            var input = new FormData();
            input.append("pdf", this.samplepdftoupload);
            input.append("image", this.sampleimagetoupload);
            input.append("sampleid", this.sampleid.toString());
            input.append("prepid", this.selectedprepcatagory.toString());
            input.append("prepnameid", this.selectedtitle.toString());
            input.append("sname", this.sname.toString());
            input.append("stext", this.stext.toString());
            input.append("surl", this.surl.toString());
            input.append("orgpdfname", this.sampleorgpdfname.toString());
            input.append("orgimagename", this.sampleorgimagename.toString());
            input.append("createdby", this.localstorage.get("userid").toString());
            this.http.post('api/uploadprevyearmaterial/updatesampledata', input)
                .subscribe(function (data) {
                debugger;
                _this.sampledata = data;
                if (_this.sampledata.length > 10) {
                    sweetalert2_1.default.fire("", "Updated Successfully", "success");
                    _this.onClearSample();
                    _this.Bindsampledata();
                    return;
                }
            });
        }
    };
    //reset sample field
    uploadmaterialmanager.prototype.onClearSample = function () {
        this.selectedprepcatagory = 0;
        this.selectedtitle = 0;
        this.sname = "";
        this.stext = "";
        this.surl = "";
        this.sampleorgpdfname = "";
        this.sampleorgimagename = "";
        this.samplepdftoupload = [];
        this.sampleimagetoupload = [];
        this.ButtonSampleText = "Save";
        this.myInputVariablesamplefile.nativeElement.value = "";
        this.myInputVariablesampleimage.nativeElement.value = "";
        this.Bindsampledata();
    };
    //bind sample table data
    uploadmaterialmanager.prototype.Bindsampledata = function () {
        var _this = this;
        debugger;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.Details = [];
        this.http.get('api/uploadprevyearmaterial/Bindsampletabledata', options).subscribe(function (data) {
            debugger;
            _this.SampleDetails = data;
            _this.GetSavesampleData = _this.SampleDetails.data;
            _this.samplerecord = _this.GetSavesampleData.length;
        });
    };
    //edit sample record
    uploadmaterialmanager.prototype.EditSData = function (i, Id) {
        var _this = this;
        debugger;
        this.ButtonSampleText = 'Update';
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.http.get('api/uploadprevyearmaterial/GetEditsampleData?sampleid=' + Id, options).subscribe(function (data) {
            debugger;
            _this.GetSampleEditedData = data;
            if (_this.GetSampleEditedData.Status == true) {
                _this.bindprepcategory();
                _this.selectedprepcatagory = _this.GetSampleEditedData.data.prepid;
                _this.Bindtitle();
                _this.selectedtitle = _this.GetSampleEditedData.data.prepnameid;
                _this.sname = _this.GetSampleEditedData.data.sname;
                _this.stext = _this.GetSampleEditedData.data.stext;
                _this.surl = _this.GetSampleEditedData.data.surl;
                _this.sampleid = _this.GetSampleEditedData.data.sampleid;
            }
        });
    };
    //delete sample rcord
    uploadmaterialmanager.prototype.DeleteSData = function (i, Id) {
        var _this = this;
        var data;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        data =
            {
                "sampleid": Id
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
                _this.http.post('api/uploadprevyearmaterial/Deletesampledata', body, options).subscribe(function (data) {
                    _this.DeletesampledData = data;
                    if (_this.DeletesampledData.Status == true) {
                        sweetalert2_1.default.fire("", "Deleted Successfully", "success");
                        _this.Bindsampledata();
                        return;
                    }
                });
            }
        });
    };
    //Mock test code start here
    //save mock test data
    uploadmaterialmanager.prototype.MockSave = function () {
        var _this = this;
        if (this.ButtonMockText == "Save") {
            if (this.selectedprepcatagory == 0 || this.selectedprepcatagory == undefined) {
                sweetalert2_1.default.fire("", "Please select category", "error");
                return;
            }
            if (this.selectedtitle == 0 || this.selectedtitle == undefined) {
                sweetalert2_1.default.fire("", "Please select title", "error");
                return;
            }
            if (this.mname == "" || this.mname == undefined) {
                sweetalert2_1.default.fire("", "Please define name", "error");
                return;
            }
            if (this.mtext == "" || this.mtext == undefined) {
                sweetalert2_1.default.fire("", "Please entrt display text", "error");
                return;
            }
            if (this.murl == "" || this.murl == undefined) {
                this.murl == "";
            }
            var input = new FormData();
            input.append("mockid", this.mockid.toString());
            input.append("prepid", this.selectedprepcatagory.toString());
            input.append("prepnameid", this.selectedtitle.toString());
            input.append("mname", this.mname.toString());
            input.append("mtext", this.mtext.toString());
            input.append("murl", this.murl.toString());
            input.append("createdby", this.localstorage.get("userid").toString());
            this.http.post('api/uploadprevyearmaterial/savemockdata', input)
                .subscribe(function (data) {
                debugger;
                _this.mockdata = data;
                if (_this.mockdata.length > 10) {
                    sweetalert2_1.default.fire("", "Saved Successfully", "success");
                    _this.onClearMock();
                    _this.Bindmockdata();
                    return;
                }
            });
        }
        else {
            if (this.selectedprepcatagory == 0 || this.selectedprepcatagory == undefined) {
                sweetalert2_1.default.fire("", "Please select category", "error");
                return;
            }
            if (this.selectedtitle == 0 || this.selectedtitle == undefined) {
                sweetalert2_1.default.fire("", "Please select title", "error");
                return;
            }
            if (this.mname == "" || this.mname == undefined) {
                sweetalert2_1.default.fire("", "Please define name", "error");
                return;
            }
            if (this.mtext == "" || this.mtext == undefined) {
                sweetalert2_1.default.fire("", "Please entrt display text", "error");
                return;
            }
            if (this.murl == "" || this.murl == undefined) {
                this.murl == "";
            }
            var input = new FormData();
            input.append("mockid", this.mockid.toString());
            input.append("prepid", this.selectedprepcatagory.toString());
            input.append("prepnameid", this.selectedtitle.toString());
            input.append("mname", this.mname.toString());
            input.append("mtext", this.mtext.toString());
            input.append("murl", this.murl.toString());
            input.append("createdby", this.localstorage.get("userid").toString());
            this.http.post('api/uploadprevyearmaterial/updatemockdata', input)
                .subscribe(function (data) {
                debugger;
                _this.mockdata = data;
                if (_this.mockdata.length > 10) {
                    sweetalert2_1.default.fire("", "Updated Successfully", "success");
                    _this.onClearMock();
                    _this.Bindmockdata();
                    return;
                }
            });
        }
    };
    //reset mock test data
    uploadmaterialmanager.prototype.onClearMock = function () {
        this.selectedprepcatagory = 0;
        this.selectedtitle = 0;
        this.mname = "";
        this.mtext = "";
        this.murl = "";
        this.Bindmockdata();
        this.ButtonMockText = "Save";
    };
    //bind mock test data
    uploadmaterialmanager.prototype.Bindmockdata = function () {
        var _this = this;
        debugger;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.MockDetails = [];
        this.http.get('api/uploadprevyearmaterial/Bindmocktabledata', options).subscribe(function (data) {
            debugger;
            _this.MockDetails = data;
            _this.GetSavemockData = _this.MockDetails.data;
            _this.Mockrecord = _this.GetSavemockData.length;
        });
    };
    //edit mock test data
    uploadmaterialmanager.prototype.EditmockData = function (i, Id) {
        var _this = this;
        debugger;
        this.ButtonMockText = 'Update';
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.http.get('api/uploadprevyearmaterial/GetEditmockData?mockid=' + Id, options).subscribe(function (data) {
            debugger;
            _this.GetMockEditedData = data;
            if (_this.GetMockEditedData.Status == true) {
                _this.bindprepcategory();
                _this.selectedprepcatagory = _this.GetMockEditedData.data.prepid;
                _this.Bindtitle();
                _this.selectedtitle = _this.GetMockEditedData.data.prepnameid;
                _this.mname = _this.GetMockEditedData.data.mname;
                _this.mtext = _this.GetMockEditedData.data.mtext;
                _this.murl = _this.GetMockEditedData.data.murl;
                _this.mockid = _this.GetMockEditedData.data.mockid;
            }
        });
    };
    //delete mock test
    uploadmaterialmanager.prototype.DeletemocktestData = function (i, Id) {
        var _this = this;
        var data;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        data =
            {
                "mockid": Id
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
                _this.http.post('api/uploadprevyearmaterial/Deletemockdata', body, options).subscribe(function (data) {
                    _this.DeletemockData = data;
                    if (_this.DeletemockData.Status == true) {
                        sweetalert2_1.default.fire("", "Deleted Successfully", "success");
                        _this.Bindmockdata();
                        return;
                    }
                });
            }
        });
    };
    //Adhoc material code start here
    //save adhoc material
    uploadmaterialmanager.prototype.AdhocSave = function () {
        var _this = this;
        if (this.ButtonAdhocText == "Save") {
            if (this.selectedprepcatagory == 0 || this.selectedprepcatagory == undefined) {
                sweetalert2_1.default.fire("", "Please select category", "error");
                return;
            }
            if (this.selectedtitle == 0 || this.selectedtitle == undefined) {
                sweetalert2_1.default.fire("", "Please select title", "error");
                return;
            }
            if (this.aname == "" || this.aname == undefined) {
                sweetalert2_1.default.fire("", "Please define name", "error");
                return;
            }
            if (this.atext == "" || this.atext == undefined) {
                sweetalert2_1.default.fire("", "Please entrt display text", "error");
                return;
            }
            if (this.aurl == "" || this.aurl == undefined) {
                this.aurl == "";
            }
            var input = new FormData();
            input.append("pdf", this.pdftoupload);
            input.append("image", this.imagetoupload);
            input.append("adhocid", this.adhocid.toString());
            input.append("prepid", this.selectedprepcatagory.toString());
            input.append("prepnameid", this.selectedtitle.toString());
            input.append("aname", this.aname.toString());
            input.append("atext", this.atext.toString());
            input.append("aurl", this.aurl.toString());
            input.append("orgpdfname", this.orgpdfname.toString());
            input.append("orgimagename", this.orgimagename.toString());
            input.append("createdby", this.localstorage.get("userid").toString());
            this.http.post('api/uploadprevyearmaterial/saveadhocdata', input)
                .subscribe(function (data) {
                debugger;
                _this.adhocdata = data;
                if (_this.adhocdata.length > 10) {
                    sweetalert2_1.default.fire("", "Saved Successfully", "success");
                    _this.onClearAdhoc();
                    _this.Bindadhocdata();
                    return;
                }
            });
        }
        else {
            if (this.selectedprepcatagory == 0 || this.selectedprepcatagory == undefined) {
                sweetalert2_1.default.fire("", "Please select category", "error");
                return;
            }
            if (this.selectedtitle == 0 || this.selectedtitle == undefined) {
                sweetalert2_1.default.fire("", "Please select title", "error");
                return;
            }
            if (this.aname == "" || this.aname == undefined) {
                sweetalert2_1.default.fire("", "Please define name", "error");
                return;
            }
            if (this.atext == "" || this.atext == undefined) {
                sweetalert2_1.default.fire("", "Please entrt display text", "error");
                return;
            }
            if (this.aurl == "" || this.aurl == undefined) {
                this.aurl == "";
            }
            var input = new FormData();
            input.append("pdf", this.pdftoupload);
            input.append("image", this.imagetoupload);
            input.append("adhocid", this.adhocid.toString());
            input.append("prepid", this.selectedprepcatagory.toString());
            input.append("prepnameid", this.selectedtitle.toString());
            input.append("aname", this.aname.toString());
            input.append("atext", this.atext.toString());
            input.append("aurl", this.aurl.toString());
            input.append("orgpdfname", this.orgpdfname.toString());
            input.append("orgimagename", this.orgimagename.toString());
            input.append("createdby", this.localstorage.get("userid").toString());
            this.http.post('api/uploadprevyearmaterial/updateadhocdata', input)
                .subscribe(function (data) {
                debugger;
                _this.adhocdata = data;
                if (_this.adhocdata.length > 10) {
                    sweetalert2_1.default.fire("", "Updated Successfully", "success");
                    _this.onClearAdhoc();
                    _this.Bindadhocdata();
                    return;
                }
            });
        }
    };
    //reset adhoc material field
    uploadmaterialmanager.prototype.onClearAdhoc = function () {
        this.selectedprepcatagory = 0;
        this.selectedtitle = 0;
        this.aname = "";
        this.atext = "";
        this.aurl = "";
        this.ButtonSampleText = "Save";
        this.Bindadhocdata();
    };
    //bind adhoc materia data
    uploadmaterialmanager.prototype.Bindadhocdata = function () {
        var _this = this;
        debugger;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.AdhocDetails = [];
        this.http.get('api/uploadprevyearmaterial/Bindadhoctabledata', options).subscribe(function (data) {
            debugger;
            _this.AdhocDetails = data;
            _this.GetSaveadhocData = _this.AdhocDetails.data;
            _this.adhocrecord = _this.GetSaveadhocData.length;
        });
    };
    //edit adhoc data
    uploadmaterialmanager.prototype.EditadhocData = function (i, Id) {
        var _this = this;
        debugger;
        this.ButtonAdhocText = 'Update';
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.http.get('api/uploadprevyearmaterial/GetEditadhocData?adhocid=' + Id, options).subscribe(function (data) {
            debugger;
            _this.GetadhocEditedData = data;
            if (_this.GetadhocEditedData.Status == true) {
                _this.bindprepcategory();
                _this.selectedprepcatagory = _this.GetadhocEditedData.data.prepid;
                _this.Bindtitle();
                _this.selectedtitle = _this.GetadhocEditedData.data.prepnameid;
                _this.aname = _this.GetadhocEditedData.data.aname;
                _this.atext = _this.GetadhocEditedData.data.atext;
                _this.aurl = _this.GetadhocEditedData.data.aurl;
                _this.adhocid = _this.GetadhocEditedData.data.adhocid;
            }
        });
    };
    //delete adhoc material record
    uploadmaterialmanager.prototype.DeleteadhoctestData = function (i, Id) {
        var _this = this;
        var data;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        data =
            {
                "adhocid": Id
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
                _this.http.post('api/uploadprevyearmaterial/Deleteadhocdata', body, options).subscribe(function (data) {
                    _this.DeleteadhocData = data;
                    if (_this.DeleteadhocData.Status == true) {
                        sweetalert2_1.default.fire("", "Deleted Successfully", "success");
                        _this.Bindadhocdata();
                        return;
                    }
                });
            }
        });
    };
    //prepratory Resource code start here
    //save prepratory resources
    uploadmaterialmanager.prototype.ResourceSave = function () {
        var _this = this;
        if (this.ButtonResourceText == "Save") {
            if (this.selectedprepcatagory == 0 || this.selectedprepcatagory == undefined) {
                sweetalert2_1.default.fire("", "Please select category", "error");
                return;
            }
            if (this.selectedtitle == 0 || this.selectedtitle == undefined) {
                sweetalert2_1.default.fire("", "Please select title", "error");
                return;
            }
            if (this.author == "" || this.author == undefined) {
                sweetalert2_1.default.fire("", "Please enter author", "error");
                return;
            }
            if (this.publish == "" || this.publish == undefined) {
                sweetalert2_1.default.fire("", "Please enter publish", "error");
                return;
            }
            if (this.description == "" || this.description == undefined) {
                sweetalert2_1.default.fire("", "Please enter author", "error");
                return;
            }
            if (this.rname == "" || this.rname == undefined) {
                sweetalert2_1.default.fire("", "Please define name", "error");
                return;
            }
            if (this.rtext == "" || this.rtext == undefined) {
                sweetalert2_1.default.fire("", "Please entrt display text", "error");
                return;
            }
            if (this.rurl == "" || this.rurl == undefined) {
                this.rurl == "";
            }
            var input = new FormData();
            input.append("resourceid", this.resourceid.toString());
            input.append("prepid", this.selectedprepcatagory.toString());
            input.append("prepnameid", this.selectedtitle.toString());
            input.append("author", this.author.toString());
            input.append("publish", this.publish.toString());
            input.append("description", this.description.toString());
            input.append("rname", this.rname.toString());
            input.append("rtext", this.rtext.toString());
            input.append("rurl", this.rurl.toString());
            input.append("createdby", this.localstorage.get("userid").toString());
            this.http.post('api/uploadprevyearmaterial/saveresourcedata', input)
                .subscribe(function (data) {
                debugger;
                _this.resourcedata = data;
                if (_this.resourcedata.length > 10) {
                    sweetalert2_1.default.fire("", "Saved Successfully", "success");
                    _this.onClearResource();
                    _this.Bindresourcedata();
                    return;
                }
            });
        }
        else {
            if (this.selectedprepcatagory == 0 || this.selectedprepcatagory == undefined) {
                sweetalert2_1.default.fire("", "Please select category", "error");
                return;
            }
            if (this.selectedtitle == 0 || this.selectedtitle == undefined) {
                sweetalert2_1.default.fire("", "Please select title", "error");
                return;
            }
            if (this.author == "" || this.author == undefined) {
                sweetalert2_1.default.fire("", "Please enter author", "error");
                return;
            }
            if (this.publish == "" || this.publish == undefined) {
                sweetalert2_1.default.fire("", "Please enter publish", "error");
                return;
            }
            if (this.description == "" || this.description == undefined) {
                sweetalert2_1.default.fire("", "Please enter author", "error");
                return;
            }
            if (this.rname == "" || this.rname == undefined) {
                sweetalert2_1.default.fire("", "Please define name", "error");
                return;
            }
            if (this.rtext == "" || this.rtext == undefined) {
                sweetalert2_1.default.fire("", "Please entrt display text", "error");
                return;
            }
            if (this.rurl == "" || this.rurl == undefined) {
                this.rurl == "";
            }
            var input = new FormData();
            input.append("resourceid", this.resourceid.toString());
            input.append("prepid", this.selectedprepcatagory.toString());
            input.append("prepnameid", this.selectedtitle.toString());
            input.append("author", this.author.toString());
            input.append("publish", this.publish.toString());
            input.append("description", this.description.toString());
            input.append("rname", this.rname.toString());
            input.append("rtext", this.rtext.toString());
            input.append("rurl", this.rurl.toString());
            input.append("createdby", this.localstorage.get("userid").toString());
            this.http.post('api/uploadprevyearmaterial/updateresourcedata', input)
                .subscribe(function (data) {
                debugger;
                _this.resourcedata = data;
                if (_this.resourcedata.length > 10) {
                    sweetalert2_1.default.fire("", "Updated Successfully", "success");
                    _this.onClearResource();
                    _this.Bindresourcedata();
                    return;
                }
            });
        }
    };
    //reset resources
    uploadmaterialmanager.prototype.onClearResource = function () {
        this.selectedprepcatagory = 0;
        this.selectedtitle = 0;
        this.rname = "";
        this.rtext = "";
        this.rurl = "";
        this.author = "";
        this.publish = "";
        this.description = "";
        this.ButtonResourceText = "Save";
        this.Bindresourcedata();
    };
    //bind resources material data
    uploadmaterialmanager.prototype.Bindresourcedata = function () {
        var _this = this;
        debugger;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.ResourceDetails = [];
        this.http.get('api/uploadprevyearmaterial/Bindresourcetabledata', options).subscribe(function (data) {
            debugger;
            _this.ResourceDetails = data;
            _this.GetSaveresourceData = _this.ResourceDetails.data;
            _this.resourcerecord = _this.GetSaveresourceData.length;
        });
    };
    //edit resource data
    uploadmaterialmanager.prototype.EditresourceData = function (i, Id) {
        var _this = this;
        debugger;
        this.ButtonResourceText = 'Update';
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.http.get('api/uploadprevyearmaterial/GetEditresourceData?resourceid=' + Id, options).subscribe(function (data) {
            debugger;
            _this.GetresourceEditedData = data;
            if (_this.GetresourceEditedData.Status == true) {
                _this.bindprepcategory();
                _this.selectedprepcatagory = _this.GetresourceEditedData.data.prepid;
                _this.Bindtitle();
                _this.selectedtitle = _this.GetresourceEditedData.data.prepnameid;
                _this.author = _this.GetresourceEditedData.data.author;
                _this.publish = _this.GetresourceEditedData.data.publish;
                _this.description = _this.GetresourceEditedData.data.description;
                _this.rname = _this.GetresourceEditedData.data.rname;
                _this.rtext = _this.GetresourceEditedData.data.rtext;
                _this.rurl = _this.GetresourceEditedData.data.rurl;
                _this.resourceid = _this.GetresourceEditedData.data.resourceid;
            }
        });
    };
    //delete resource
    uploadmaterialmanager.prototype.DeleteresData = function (i, Id) {
        var _this = this;
        var data;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        data =
            {
                "resourceid": Id
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
                _this.http.post('api/uploadprevyearmaterial/Deleteresourcedata', body, options).subscribe(function (data) {
                    _this.DeleteresourceData = data;
                    if (_this.DeleteresourceData.Status == true) {
                        sweetalert2_1.default.fire("", "Deleted Successfully", "success");
                        _this.Bindresourcedata();
                        return;
                    }
                });
            }
        });
    };
    //online link free code start here
    uploadmaterialmanager.prototype.FreeSave = function () {
        var _this = this;
        debugger;
        if (this.ButtonFreeText == "Save") {
            if (this.selectedprepcatagory == 0 || this.selectedprepcatagory == undefined) {
                sweetalert2_1.default.fire("", "Please select category", "error");
                return;
            }
            if (this.selectedtitle == 0 || this.selectedtitle == undefined) {
                sweetalert2_1.default.fire("", "Please select title", "error");
                return;
            }
            if (this.fdescription == "" || this.fdescription == undefined) {
                sweetalert2_1.default.fire("", "Please enter description", "error");
                return;
            }
            if (this.fname == "" || this.fname == undefined) {
                sweetalert2_1.default.fire("", "Please define name", "error");
                return;
            }
            if (this.ftext == "" || this.ftext == undefined) {
                sweetalert2_1.default.fire("", "Please entrt display text", "error");
                return;
            }
            if (this.furl == "" || this.furl == undefined) {
                this.furl == "";
            }
            var input = new FormData();
            input.append("freeid", this.freeid.toString());
            input.append("prepid", this.selectedprepcatagory.toString());
            input.append("prepnameid", this.selectedtitle.toString());
            input.append("fdescription", this.fdescription.toString());
            input.append("fname", this.fname.toString());
            input.append("ftext", this.ftext.toString());
            input.append("furl", this.furl.toString());
            input.append("createdby", this.localstorage.get("userid").toString());
            this.http.post('api/uploadprevyearmaterial/savefreedata', input)
                .subscribe(function (data) {
                debugger;
                _this.freedata = data;
                if (_this.freedata.length > 10) {
                    sweetalert2_1.default.fire("", "Saved Successfully", "success");
                    _this.onClearFree();
                    _this.Bindfreedata();
                    return;
                }
            });
        }
        else {
            if (this.selectedprepcatagory == 0 || this.selectedprepcatagory == undefined) {
                sweetalert2_1.default.fire("", "Please select category", "error");
                return;
            }
            if (this.selectedtitle == 0 || this.selectedtitle == undefined) {
                sweetalert2_1.default.fire("", "Please select title", "error");
                return;
            }
            if (this.fdescription == "" || this.fdescription == undefined) {
                sweetalert2_1.default.fire("", "Please enter description", "error");
                return;
            }
            if (this.fname == "" || this.fname == undefined) {
                sweetalert2_1.default.fire("", "Please define name", "error");
                return;
            }
            if (this.ftext == "" || this.ftext == undefined) {
                sweetalert2_1.default.fire("", "Please entrt display text", "error");
                return;
            }
            if (this.furl == "" || this.furl == undefined) {
                this.furl == "";
            }
            var input = new FormData();
            input.append("freeid", this.freeid.toString());
            input.append("prepid", this.selectedprepcatagory.toString());
            input.append("prepnameid", this.selectedtitle.toString());
            input.append("fdescription", this.fdescription.toString());
            input.append("fname", this.fname.toString());
            input.append("ftext", this.ftext.toString());
            input.append("furl", this.furl.toString());
            input.append("createdby", this.localstorage.get("userid").toString());
            this.http.post('api/uploadprevyearmaterial/updatefreedata', input)
                .subscribe(function (data) {
                debugger;
                _this.freedata = data;
                if (_this.freedata.length > 10) {
                    sweetalert2_1.default.fire("", "Updated Successfully", "success");
                    _this.onClearFree();
                    _this.Bindfreedata();
                    return;
                }
            });
        }
    };
    //reset free online data
    uploadmaterialmanager.prototype.onClearFree = function () {
        this.selectedprepcatagory = 0;
        this.selectedtitle = 0;
        this.fname = "";
        this.ftext = "";
        this.furl = "";
        this.fdescription = "";
        this.ButtonFreeText = "Save";
        this.Bindfreedata();
    };
    //bind online  free data
    uploadmaterialmanager.prototype.Bindfreedata = function () {
        var _this = this;
        debugger;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.FreeDetails = [];
        this.http.get('api/uploadprevyearmaterial/Bindfreetabledata', options).subscribe(function (data) {
            debugger;
            _this.FreeDetails = data;
            _this.GetSavefreeData = _this.FreeDetails.data;
            _this.freerecord = _this.GetSavefreeData.length;
        });
    };
    //edit online free data
    uploadmaterialmanager.prototype.EditfreeData = function (i, Id) {
        var _this = this;
        debugger;
        this.ButtonFreeText = 'Update';
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.http.get('api/uploadprevyearmaterial/GetEditfreeData?freeid=' + Id, options).subscribe(function (data) {
            debugger;
            _this.GetfreeEditedData = data;
            if (_this.GetfreeEditedData.Status == true) {
                _this.bindprepcategory();
                _this.selectedprepcatagory = _this.GetfreeEditedData.data.prepid;
                _this.Bindtitle();
                _this.selectedtitle = _this.GetfreeEditedData.data.prepnameid;
                _this.fdescription = _this.GetfreeEditedData.data.fdescription;
                _this.fname = _this.GetfreeEditedData.data.fname;
                _this.ftext = _this.GetfreeEditedData.data.ftext;
                _this.furl = _this.GetfreeEditedData.data.furl;
                _this.freeid = _this.GetfreeEditedData.data.freeid;
            }
        });
    };
    //delete online free data
    uploadmaterialmanager.prototype.DeletefData = function (i, Id) {
        var _this = this;
        var data;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        data =
            {
                "freeid": Id
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
                _this.http.post('api/uploadprevyearmaterial/Deletefreedata', body, options).subscribe(function (data) {
                    _this.DeletefreeData = data;
                    if (_this.DeletefreeData.Status == true) {
                        sweetalert2_1.default.fire("", "Deleted Successfully", "success");
                        _this.Bindfreedata();
                        return;
                    }
                });
            }
        });
    };
    //code start for paid links
    uploadmaterialmanager.prototype.paidSave = function () {
        var _this = this;
        debugger;
        if (this.ButtonpaidText == "Save") {
            if (this.selectedprepcatagory == 0 || this.selectedprepcatagory == undefined) {
                sweetalert2_1.default.fire("", "Please select category", "error");
                return;
            }
            if (this.selectedtitle == 0 || this.selectedtitle == undefined) {
                sweetalert2_1.default.fire("", "Please select title", "error");
                return;
            }
            if (this.paiddescription == "" || this.paiddescription == undefined) {
                sweetalert2_1.default.fire("", "Please enter description", "error");
                return;
            }
            if (this.paidname == "" || this.paidname == undefined) {
                sweetalert2_1.default.fire("", "Please define name", "error");
                return;
            }
            if (this.paidtext == "" || this.paidtext == undefined) {
                sweetalert2_1.default.fire("", "Please entrt display text", "error");
                return;
            }
            if (this.paidurl == "" || this.paidurl == undefined) {
                this.paidurl == "";
            }
            var input = new FormData();
            input.append("paidid", this.paidid.toString());
            input.append("prepid", this.selectedprepcatagory.toString());
            input.append("prepnameid", this.selectedtitle.toString());
            input.append("paiddescription", this.paiddescription.toString());
            input.append("paidname", this.paidname.toString());
            input.append("paidtext", this.paidtext.toString());
            input.append("paidurl", this.paidurl.toString());
            input.append("createdby", this.localstorage.get("userid").toString());
            this.http.post('api/uploadprevyearmaterial/savepaiddata', input)
                .subscribe(function (data) {
                debugger;
                _this.paiddata = data;
                if (_this.paiddata.length > 10) {
                    sweetalert2_1.default.fire("", "Saved Successfully", "success");
                    _this.onClearpaid();
                    _this.Bindpaiddata();
                    return;
                }
            });
        }
        else {
            if (this.selectedprepcatagory == 0 || this.selectedprepcatagory == undefined) {
                sweetalert2_1.default.fire("", "Please select category", "error");
                return;
            }
            if (this.selectedtitle == 0 || this.selectedtitle == undefined) {
                sweetalert2_1.default.fire("", "Please select title", "error");
                return;
            }
            if (this.paiddescription == "" || this.paiddescription == undefined) {
                sweetalert2_1.default.fire("", "Please enter description", "error");
                return;
            }
            if (this.paidname == "" || this.paidname == undefined) {
                sweetalert2_1.default.fire("", "Please define name", "error");
                return;
            }
            if (this.paidtext == "" || this.paidtext == undefined) {
                sweetalert2_1.default.fire("", "Please entrt display text", "error");
                return;
            }
            if (this.paidurl == "" || this.paidurl == undefined) {
                this.paidurl == "";
            }
            var input = new FormData();
            input.append("paidid", this.paidid.toString());
            input.append("prepid", this.selectedprepcatagory.toString());
            input.append("prepnameid", this.selectedtitle.toString());
            input.append("paiddescription", this.paiddescription.toString());
            input.append("paidname", this.paidname.toString());
            input.append("paidtext", this.paidtext.toString());
            input.append("paidurl", this.paidurl.toString());
            input.append("createdby", this.localstorage.get("userid").toString());
            this.http.post('api/uploadprevyearmaterial/updatepaiddata', input)
                .subscribe(function (data) {
                debugger;
                _this.paiddata = data;
                if (_this.paiddata.length > 10) {
                    sweetalert2_1.default.fire("", "Updated Successfully", "success");
                    _this.onClearpaid();
                    _this.Bindpaiddata();
                    return;
                }
            });
        }
    };
    //reset paid links
    uploadmaterialmanager.prototype.onClearpaid = function () {
        this.selectedprepcatagory = 0;
        this.selectedtitle = 0;
        this.paidname = "";
        this.paidtext = "";
        this.paidurl = "";
        this.paiddescription = "";
        this.ButtonpaidText = "Save";
        this.Bindpaiddata();
    };
    //bind online paid data
    uploadmaterialmanager.prototype.Bindpaiddata = function () {
        var _this = this;
        debugger;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.FreeDetails = [];
        this.http.get('api/uploadprevyearmaterial/Bindpaidtabledata', options).subscribe(function (data) {
            debugger;
            _this.PaidDetails = data;
            _this.GetSavepaidData = _this.PaidDetails.data;
            _this.paidrecord = _this.GetSavepaidData.length;
        });
    };
    //edit online paid data
    uploadmaterialmanager.prototype.EditpaidData = function (i, Id) {
        var _this = this;
        debugger;
        this.ButtonpaidText = 'Update';
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.http.get('api/uploadprevyearmaterial/GetEditpaidData?paidid=' + Id, options).subscribe(function (data) {
            debugger;
            _this.GetpaidEditedData = data;
            if (_this.GetpaidEditedData.Status == true) {
                _this.bindprepcategory();
                _this.selectedprepcatagory = _this.GetpaidEditedData.data.prepid;
                _this.Bindtitle();
                _this.selectedtitle = _this.GetpaidEditedData.data.prepnameid;
                _this.paiddescription = _this.GetpaidEditedData.data.paiddescription;
                _this.paidname = _this.GetpaidEditedData.data.paidname;
                _this.paidtext = _this.GetpaidEditedData.data.paidtext;
                _this.paidurl = _this.GetpaidEditedData.data.paidurl;
                _this.paidid = _this.GetpaidEditedData.data.paidid;
            }
        });
    };
    //delete paid link
    uploadmaterialmanager.prototype.DeletepaidlinkData = function (i, Id) {
        var _this = this;
        var data;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        data =
            {
                "paidid": Id
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
                _this.http.post('api/uploadprevyearmaterial/Deletepaiddata', body, options).subscribe(function (data) {
                    _this.DeletepaidData = data;
                    if (_this.DeletepaidData.Status == true) {
                        sweetalert2_1.default.fire("", "Deleted Successfully", "success");
                        _this.Bindpaiddata();
                        return;
                    }
                });
            }
        });
    };
    __decorate([
        core_1.ViewChild('prevyearfile', { static: true }),
        __metadata("design:type", core_1.ElementRef)
    ], uploadmaterialmanager.prototype, "myInputVariableprefile", void 0);
    __decorate([
        core_1.ViewChild('prevyearimage', { static: true }),
        __metadata("design:type", core_1.ElementRef)
    ], uploadmaterialmanager.prototype, "myInputVariablepreimage", void 0);
    __decorate([
        core_1.ViewChild('inputsamplefile', { static: true }),
        __metadata("design:type", core_1.ElementRef)
    ], uploadmaterialmanager.prototype, "myInputVariablesamplefile", void 0);
    __decorate([
        core_1.ViewChild('inputsampleimage', { static: true }),
        __metadata("design:type", core_1.ElementRef)
    ], uploadmaterialmanager.prototype, "myInputVariablesampleimage", void 0);
    __decorate([
        core_1.ViewChild('inputadhocfile', { static: true }),
        __metadata("design:type", core_1.ElementRef)
    ], uploadmaterialmanager.prototype, "myInputVariableadhocfile", void 0);
    __decorate([
        core_1.ViewChild('inputadhocimage', { static: true }),
        __metadata("design:type", core_1.ElementRef)
    ], uploadmaterialmanager.prototype, "myInputVariableadhocimage", void 0);
    uploadmaterialmanager = __decorate([
        core_1.Component({
            selector: 'app-uploadmaterial',
            templateUrl: './uploadmaterial.component.html',
        }),
        __metadata("design:paramtypes", [http_1.HttpClient, router_1.Router, angular_2_local_storage_1.LocalStorageService, ngx_toastr_1.ToastrService, ngx_ui_loader_1.NgxUiLoaderService])
    ], uploadmaterialmanager);
    return uploadmaterialmanager;
}());
exports.uploadmaterialmanager = uploadmaterialmanager;
//# sourceMappingURL=uploadmaterial.component.js.map