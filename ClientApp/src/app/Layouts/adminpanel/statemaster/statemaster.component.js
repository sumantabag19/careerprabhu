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
var statemaster = /** @class */ (function () {
    function statemaster(http, router, localstorage, toaster, loader, renderer, config, config1) {
        this.http = http;
        this.router = router;
        this.localstorage = localstorage;
        this.toaster = toaster;
        this.loader = loader;
        this.renderer = renderer;
        this.config1 = config1;
        this.ButtonText = "Save";
        this.countrydat = [];
        this.CountryData = [];
        this.selectedcountry = 0;
        this.locationid = 0;
        this.statemasterData = [];
        this.Detail = [];
        this.GetSaveData = [];
        this.GetEditedData = [];
        this.DeletedData = [];
        this.SelectedImage = [];
        this.message = "";
        this.excelfile = [];
        this.arrayBuffer = [];
        this.exceldata = [];
        this.GetData1 = [];
        this.dw = "";
    }
    statemaster.prototype.ngOnInit = function () {
        this.BindCountry();
        this.GetData();
        this.dw = "http://admin.careerprabhu.com/state.xlsx";
    };
    statemaster.prototype.incomingfile = function (event) {
        this.excelfile = event.target.files[0];
        //if (!this.excelfile.type.includes(".sheet")) {
        //  this.toaster.warning("Please upload only Excel files.", '', { easeTime: 1000, timeOut: 3000 });
        //  var $el = $('#UploadedFile');
        //  $el.wrap('<form>').closest('form').get(0).reset();
        //  $el.unwrap();
        //  this.excelfile = null;
        //}
    };
    statemaster.prototype.Uploadexcel = function () {
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
    statemaster.prototype.ValidateExcel = function (Data) {
        var _this = this;
        var Validate = true;
        var cols = ["country", "state"];
        for (var i = 0; i < cols.length; i++) {
            for (var j = 0; j < Data.length; j++) {
                if (Data[j][cols[i]] == undefined) {
                    sweetalert2_1.default.fire('Oops...', cols[i] + " is not available at  row number " + (j + 2), 'warning');
                    var Validate = false;
                    return;
                }
            }
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
            this.http.post('api/statemaster/Upload', body, options).subscribe(function (data) {
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
    statemaster.prototype.BindCountry = function () {
        var _this = this;
        debugger;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.countrydat = [];
        var tmpclass = [];
        this.http.post('api/statemaster/BindCountry', options).subscribe(function (data) {
            _this.countrydat = data;
            if (_this.countrydat.Status == true) {
                _this.CountryData = _this.countrydat.data;
            }
            else {
                _this.CountryData = _this.countrydat.data;
            }
        });
    };
    statemaster.prototype.onSubmit = function () {
        var _this = this;
        debugger;
        if (this.ButtonText == "Save") {
            if (this.selectedcountry == 0 || this.selectedcountry == undefined) {
                sweetalert2_1.default.fire("", "Please select country name", "error");
                return;
            }
            if (this.statename == "" || this.statename == undefined) {
                sweetalert2_1.default.fire("", "Please select state", "error");
                return;
            }
            var input = new FormData();
            input.append("locationid", "0");
            input.append("countryid", this.selectedcountry.toString());
            input.append("statename", this.statename.toString());
            input.append("createdby", this.localstorage.get("userid").toString());
            this.http.post('api/statemaster/Savestatemaster', input)
                .subscribe(function (data) {
                debugger;
                _this.statemasterData = data;
                if (_this.statemasterData.Status == true) {
                    if (_this.statemasterData.Message == "Location Already Exists") {
                        sweetalert2_1.default.fire("", "State Already Exists", "success");
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
            if (this.selectedcountry == 0 || this.selectedcountry == undefined) {
                sweetalert2_1.default.fire("", "Please select country name", "error");
                return;
            }
            if (this.statename == "" || this.statename == undefined) {
                sweetalert2_1.default.fire("", "Please select State", "error");
                return;
            }
            var input = new FormData();
            input.append("locationid", this.locationid.toString());
            input.append("statename", this.statename.toString());
            input.append("countryid", this.selectedcountry.toString());
            input.append("createdby", this.localstorage.get("userid").toString());
            this.http.post('api/statemaster/Updatestatemaster', input)
                .subscribe(function (data) {
                debugger;
                _this.statemasterData = data;
                if (_this.statemasterData.Status == true) {
                    if (_this.statemasterData.Message == "State Already Exists") {
                        sweetalert2_1.default.fire("", "State Already Exists", "success");
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
    statemaster.prototype.onClear = function () {
        this.statename = "";
        this.selectedcountry = 0;
        this.ButtonText = "Save";
    };
    statemaster.prototype.GetData = function () {
        var _this = this;
        debugger;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.Detail = [];
        this.http.get('api/statemaster/GetSavedData', options).subscribe(function (data) {
            debugger;
            _this.Detail = data;
            _this.GetSaveData = _this.Detail.data;
        });
    };
    statemaster.prototype.EditData = function (i, Id) {
        var _this = this;
        this.BindCountry();
        //this.BindCoupon();
        this.ButtonText = 'Update';
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.http.get('api/statemaster/GetEditData?locationid=' + Id, options).subscribe(function (data) {
            debugger;
            _this.GetEditedData = data;
            if (_this.GetEditedData.Status == true) {
                _this.BindCountry();
                _this.selectedcountry = _this.GetEditedData.data.countryid;
                _this.statename = _this.GetEditedData.data.statename;
                _this.locationid = _this.GetEditedData.data.locationid;
            }
        });
    };
    statemaster.prototype.DeleteData = function (i, Id) {
        var _this = this;
        var data;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        data =
            {
                "locationid": Id
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
                _this.http.post('api/statemaster/DeleteActivity', body, options).subscribe(function (data) {
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
    __decorate([
        core_1.ViewChild('fileInput', { static: true }),
        __metadata("design:type", core_1.ElementRef)
    ], statemaster.prototype, "myInputVariableprefile", void 0);
    statemaster = __decorate([
        core_1.Component({
            selector: 'app-statemaster',
            templateUrl: './statemaster.component.html',
        }),
        __metadata("design:paramtypes", [http_1.HttpClient, router_1.Router, angular_2_local_storage_1.LocalStorageService, ngx_toastr_1.ToastrService, ngx_ui_loader_1.NgxUiLoaderService, core_1.Renderer2, ng_bootstrap_1.NgbTimepickerConfig, ng_bootstrap_1.NgbDatepickerConfig])
    ], statemaster);
    return statemaster;
}());
exports.statemaster = statemaster;
//# sourceMappingURL=statemaster.component.js.map