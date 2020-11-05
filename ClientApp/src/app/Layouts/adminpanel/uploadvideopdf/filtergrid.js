"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var SearchfilterPipe = /** @class */ (function () {
    function SearchfilterPipe() {
    }
    SearchfilterPipe.prototype.transform = function (items, field) {
        debugger;
        if (!items)
            return [];
        if (field != undefined) {
            return items.filter(function (it) {
                return JSON.stringify(it).toLocaleLowerCase().indexOf(field.toLocaleLowerCase()) !== -1;
            });
        }
        //else {
        //    if (!value || value.length === 0) return items;
        //    return items.filter(e => e[field].toLowerCase().includes(value.toLocaleLowerCase()));
        //}
    };
    SearchfilterPipe = __decorate([
        core_1.Pipe({
            name: 'searchfilter'
        })
    ], SearchfilterPipe);
    return SearchfilterPipe;
}());
exports.SearchfilterPipe = SearchfilterPipe;
//# sourceMappingURL=filtergrid.js.map