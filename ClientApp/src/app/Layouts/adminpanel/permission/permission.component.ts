import { Component, OnInit, Input, ElementRef, ViewChild, PipeTransform, Pipe, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute, Event } from '@angular/router';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';
import { HttpClient, HttpErrorResponse, HttpRequest, HttpHeaders } from '@angular/common/http';
import { LocalStorageService, LocalStorageModule } from 'angular-2-local-storage';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import Swal from 'sweetalert2';
import { EmbedVideoService } from 'ngx-embed-video';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';

import { Time } from '@angular/common';
import { NgbDateAdapter, NgbDateNativeAdapter, NgbTimepickerConfig, NgbTimeStruct, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import * as xlsx from 'xlsx';
declare var $: any;

@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',

})
export class permissionmanager implements OnInit {
  ButtonText: string = "Active";



  Detail: any = [];
  GetSaveData: any = [];
  DeletedData: any = [];





  constructor(private http: HttpClient, private router: Router, private localstorage: LocalStorageService, private toaster: ToastrService, private loader: NgxUiLoaderService, private renderer: Renderer2, config: NgbTimepickerConfig, private config1: NgbDatepickerConfig) {


  }
  ngOnInit() {
    this.GetData();

  }



















  GetData() {
    debugger;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    this.Detail = [];

    this.http.get('api/citymaster/GetSavedPermissionData', options).subscribe(
      (data) => {
        debugger;
        this.Detail = data;
        this.GetSaveData = this.Detail.data;


      }
    )
  }

  onSubmit(i: number, Id) {
    var data;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };

    data =
    {
      "countryid": Id
    };

    let body = JSON.stringify(data);

    Swal.fire({
      //title: 'Confirmation',
      text: 'Are you sure to change status of record?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.http.post('api/citymaster/Inactivepage', body, options).subscribe(
          (data) => {
            this.DeletedData = data;
            if (this.DeletedData.Status == true) {
              Swal.fire("", "Status Changed Successfully", "success");
              this.GetData();
              return;
            }
          }
        )
      }
    })

  }
}
