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
var boards = /** @class */ (function () {
    function boards(http, router, localstorage, toaster, loader) {
        this.http = http;
        this.router = router;
        this.localstorage = localstorage;
        this.toaster = toaster;
        this.loader = loader;
        this.boardname = "";
        this.ButtonText = "Save";
        this.boardid = 0;
        this.BoardData = [];
        this.Detail = [];
        this.GetSaveData = [];
        this.GetEditedData = [];
        this.DeletedData = [];
    }
    boards.prototype.ngOnInit = function () {
        this.GetData();
        //this.GetSavedData();
    };
    boards.prototype.onSubmit = function () {
        var _this = this;
        debugger;
        if (this.ButtonText == "Save") {
            if (this.boardname == "" || this.boardname == undefined) {
                sweetalert2_1.default.fire("", "Please enter board name", "error");
                return;
            }
            //if (this.boardname.match(/[ˆ(\d|+|\-)]/)) {
            //  Swal.fire("", "Name should not contain digit", "error");
            //  return;
            //}
            var input = new FormData();
            input.append("boardid", "0");
            input.append("boardname", this.boardname.toString());
            input.append("createdby", this.localstorage.get("userid").toString());
            this.http.post('api/boards/SaveBoards', input)
                .subscribe(function (data) {
                debugger;
                _this.BoardData = data;
                if (_this.BoardData.Status == true) {
                    if (_this.BoardData.Message == "Board already assigned") {
                        sweetalert2_1.default.fire("", "Board already assigned", "error");
                        _this.onClear();
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
            if (this.boardname == "" || this.boardname == undefined) {
                sweetalert2_1.default.fire("", "Please enter board name", "error");
                return;
            }
            //if (this.boardname.match(/[ˆ(\d|+|\-)]/)) {
            //  Swal.fire("", "Name should not contain digit", "error");
            //  return;
            //}
            var input = new FormData();
            input.append("boardid", this.boardid.toString());
            input.append("boardname", this.boardname.toString());
            input.append("createdby", this.localstorage.get("userid").toString());
            this.http.post('api/boards/UpdateBoards', input)
                .subscribe(function (data) {
                _this.BoardData = data;
                if (_this.BoardData.Status == true) {
                    if (_this.BoardData.Message == "Board already assigned") {
                        sweetalert2_1.default.fire("", "Board already assigned", "error");
                        _this.onClear();
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
    boards.prototype.GetData = function () {
        var _this = this;
        debugger;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.Detail = [];
        this.http.get('api/boards/GetSavedData', options).subscribe(function (data) {
            debugger;
            _this.Detail = data;
            _this.GetSaveData = _this.Detail.data;
        });
    };
    boards.prototype.EditData = function (i, Id) {
        var _this = this;
        this.onClear();
        this.ButtonText = 'Update';
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        this.http.get('api/boards/GetEditData?boardid=' + Id, options).subscribe(function (data) {
            debugger;
            _this.GetEditedData = data;
            if (_this.GetEditedData.Status == true) {
                _this.boardid = _this.GetEditedData.data.boardid;
                _this.boardname = _this.GetEditedData.data.boardname;
            }
        });
    };
    boards.prototype.DeleteData = function (i, Id) {
        var _this = this;
        var data;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers };
        data =
            {
                "boardid": Id
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
                _this.http.post('api/boards/DeleteActivity', body, options).subscribe(function (data) {
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
    boards.prototype.onClear = function () {
        this.boardname = "";
        this.ButtonText = "Save";
        this.GetData();
    };
    boards = __decorate([
        core_1.Component({
            selector: 'app-boards',
            templateUrl: './boards.component.html',
        }),
        __metadata("design:paramtypes", [http_1.HttpClient, router_1.Router, angular_2_local_storage_1.LocalStorageService, ngx_toastr_1.ToastrService, ngx_ui_loader_1.NgxUiLoaderService])
    ], boards);
    return boards;
}());
exports.boards = boards;
//# sourceMappingURL=boards.component.js.map