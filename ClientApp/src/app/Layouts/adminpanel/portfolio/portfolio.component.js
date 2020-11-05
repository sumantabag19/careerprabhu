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
//declare var $: any;
//@Pipe({
//  name: 'safe'
//})
//export class SafePipePortfolio implements PipeTransform {
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
var portfoliomanager = /** @class */ (function () {
    function portfoliomanager(http, router, localstorage, toaster, loader) {
        this.http = http;
        this.router = router;
        this.localstorage = localstorage;
        this.toaster = toaster;
        this.loader = loader;
        this.intrestareadetail = [];
        this.IntrestData = [];
        this.SelectedIntrest = 0;
        this.ButtonText = "Save";
        this.pdffile = [];
        this.orgpdfname = "";
        this.intrestarea = "";
        this.videolink = "";
        this.portfolioid = 0;
        this.portfoliodata = [];
        this.Details = [];
        this.GetSaveData = [];
        this.GetEditedData = [];
        this.DeletedData = [];
        this.SelectedImage = [];
        this.url = "";
    }
    portfoliomanager.prototype.ngOnInit = function () {
        this.bindintrestarea();
        this.SelectedIntrest = 0;
        this.Binddata();
    };
    //bind intrest area
    portfoliomanager.prototype.bindintrestarea = function () {
        var _this = this;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.intrestareadetail = [];
        var a;
        var tmpclass = [];
        this.http.get('api/portfolio/bindintrestarea', options).subscribe(function (data) {
            _this.intrestareadetail = data;
            if (_this.intrestareadetail.Status == true) {
                _this.IntrestData = _this.intrestareadetail.data;
            }
        });
    };
    //fet pdf details
    portfoliomanager.prototype.GetPdfDetail = function (event) {
        debugger;
        this.pdffile = event;
        var file = event.target.files[0];
        //let file = event.filesData[0];
        var fileList = event.target.files;
        //let fileList: FileList = file;
        this.pdftoupload = fileList[0];
        if (file.type.includes("pdf")) {
            this.orgpdfname = file.name;
        }
        else {
            sweetalert2_1.default.fire("", "Please select file", "error");
            this.myInputVariabl.nativeElement.value = "";
        }
    };
    //save portfolio
    portfoliomanager.prototype.onSave = function () {
        var _this = this;
        if (this.ButtonText == "Save") {
            if (this.SelectedIntrest == 0 || this.SelectedIntrest == undefined) {
                sweetalert2_1.default.fire("", "Please select intrest area", "error");
                return;
            }
            if (this.intrestarea == "" || this.intrestarea == undefined) {
                sweetalert2_1.default.fire("", "Please define intrest area", "error");
                return;
            }
            if (this.videolink == "" || this.videolink == undefined) {
                this.videolink == "";
            }
            if (this.orgpdfname == "" || this.orgpdfname == undefined) {
                this.orgpdfname == "";
            }
            var input = new FormData();
            input.append("pdf", this.pdftoupload);
            input.append("portfolioid", this.portfolioid.toString());
            input.append("repositoryid", this.SelectedIntrest.toString());
            input.append("intrestarea", this.intrestarea.toString());
            input.append("videolink", this.videolink.toString());
            input.append("orgpdfname", this.orgpdfname.toString());
            input.append("createdby", this.localstorage.get("userid").toString());
            this.http.post('api/portfolio/saveportfoliodata', input)
                .subscribe(function (data) {
                debugger;
                _this.portfoliodata = data;
                if (_this.portfoliodata.length > 10) {
                    sweetalert2_1.default.fire("", "Saved Successfully", "success");
                    _this.onClear();
                    _this.Binddata();
                    return;
                }
            });
        }
        else {
            debugger;
            if (this.SelectedIntrest == 0 || this.SelectedIntrest == undefined) {
                sweetalert2_1.default.fire("", "Please select intrest area", "error");
                return;
            }
            if (this.intrestarea == "" || this.intrestarea == undefined) {
                sweetalert2_1.default.fire("", "Please define intrest area", "error");
                return;
            }
            if (this.videolink == "" || this.videolink == undefined) {
                this.videolink == "";
            }
            if (this.orgpdfname == "" || this.orgpdfname == undefined) {
                this.orgpdfname == "";
            }
            var input = new FormData();
            input.append("pdf", this.pdftoupload);
            input.append("portfolioid", this.portfolioid.toString());
            input.append("repositoryid", this.SelectedIntrest.toString());
            input.append("intrestarea", this.intrestarea.toString());
            input.append("videolink", this.videolink.toString());
            input.append("orgpdfname", this.orgpdfname.toString());
            input.append("createdby", this.localstorage.get("userid").toString());
            this.http.post('api/portfolio/updateportfoliodata', input)
                .subscribe(function (data) {
                debugger;
                _this.portfoliodata = data;
                if (_this.portfoliodata.length > 10) {
                    sweetalert2_1.default.fire("", "Updated Successfully", "success");
                    _this.onClear();
                    _this.Binddata();
                    return;
                }
            });
        }
    };
    //edit record
    portfoliomanager.prototype.EditData = function (i, Id) {
        var _this = this;
        debugger;
        this.ButtonText = 'Update';
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.http.get('api/portfolio/GetEditData?portfolioid=' + Id, options).subscribe(function (data) {
            debugger;
            _this.GetEditedData = data;
            if (_this.GetEditedData.Status == true) {
                _this.bindintrestarea();
                _this.SelectedIntrest = _this.GetEditedData.data.repositoryid;
                _this.videolink = _this.GetEditedData.data.videolink;
                _this.intrestarea = _this.GetEditedData.data.intrestarea;
                _this.portfolioid = _this.GetEditedData.data.portfolioid;
            }
        });
    };
    //delete record
    portfoliomanager.prototype.DeleteData = function (i, Id) {
        var _this = this;
        var data;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        data =
            {
                "portfolioid": Id,
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
                _this.http.post('api/portfolio/DeleteActivity', body, options).subscribe(function (data) {
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
    //reset field
    portfoliomanager.prototype.onClear = function () {
        this.SelectedIntrest = 0;
        this.intrestarea = "";
        this.videolink = "";
        this.ButtonText = "Save";
        this.Binddata();
        this.myInputVariabl.nativeElement.value = "";
    };
    //bind table data
    portfoliomanager.prototype.Binddata = function () {
        var _this = this;
        debugger;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.Details = [];
        this.http.get('api/portfolio/Bindtabledata', options).subscribe(function (data) {
            debugger;
            _this.Details = data;
            _this.GetSaveData = _this.Details.data;
        });
    };
    __decorate([
        core_1.ViewChild('inputfile', { static: true }),
        __metadata("design:type", core_1.ElementRef)
    ], portfoliomanager.prototype, "myInputVariabl", void 0);
    portfoliomanager = __decorate([
        core_1.Component({
            selector: 'app-portfolio',
            templateUrl: './portfolio.component.html',
        }),
        __metadata("design:paramtypes", [http_1.HttpClient, router_1.Router, angular_2_local_storage_1.LocalStorageService, ngx_toastr_1.ToastrService, ngx_ui_loader_1.NgxUiLoaderService])
    ], portfoliomanager);
    return portfoliomanager;
}());
exports.portfoliomanager = portfoliomanager;
//# sourceMappingURL=portfolio.component.js.map