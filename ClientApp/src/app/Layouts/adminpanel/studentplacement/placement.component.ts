import { Component, OnInit, Input, ElementRef, ViewChild, Pipe, PipeTransform } from '@angular/core';
import { Router, ActivatedRoute, Event } from '@angular/router';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';
import { HttpClient, HttpErrorResponse, HttpRequest, HttpHeaders } from '@angular/common/http';
import { LocalStorageService, LocalStorageModule } from 'angular-2-local-storage';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import Swal from 'sweetalert2';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
declare var $: any;

@Component({
  selector: 'app-placement',
  templateUrl: './placement.component.html',
  //styleUrls: ['./webinar.component.css']
})
export class PlacementStudentManager implements OnInit {
  Details: any = [];
  GetSaveData: any = [];
  selectedstate: number = 0;
  selectedcity: number = 0;
  StateData: any = [];
  CityData: any = [];
  statedat: any = [];
  citdata: any = [];
  search: string = "";

  constructor(private http: HttpClient, private router: Router, private localstorage: LocalStorageService, private toaster: ToastrService, private loader: NgxUiLoaderService) {

  }
  ngOnInit() {
  
    this.BindTableData();
    this.BindState();

  }
  //bind state
  BindState() {
    debugger;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    this.statedat = [];
  
    var tmpclass: any = [];
    this.http.post('api/studentplacement/Bindstate', options).subscribe(

      (data) => {
        this.statedat = data;
        if (this.statedat.Status == true) {
          this.StateData = this.statedat.data;
        }
        else {
          this.StateData = this.statedat.data;
        }
      }
    )
  }



  //bindc  city code
  BindCity() {
    debugger;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    this.citdata = [];
    var body = {

      "stateid": this.selectedstate
    }
    var tmpclass: any = [];
    this.http.post('api/studentplacement/BindCity', body, options).subscribe(

      (data) => {
        this.citdata = data;
        if (this.citdata.Status == true) {
          this.CityData = this.citdata.data;
        }
        else {
          this.CityData = this.citdata.data;
        }
      }
    )
  }




  //bind table data
  BindTableData() {
    debugger;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    this.Details = [];
    var body = {

      "stateid": this.selectedstate,
      "cityid": this.selectedcity
    }
    this.http.post('api/studentplacement/BindPlacementData', body, options).subscribe(
      (data) => {
        debugger;
        this.Details = data;
        this.GetSaveData = this.Details.data;
      }
    )
  }

  Reset() {
    this.selectedcity = 0;
    this.selectedstate = 0;
    this.search = "";
    this.BindTableData();
  }
}
