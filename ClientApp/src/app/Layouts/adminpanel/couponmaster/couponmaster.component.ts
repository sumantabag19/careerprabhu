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
@Component({
  selector: 'app-couponmaster',
  templateUrl: './couponmaster.component.html',
  //styleUrls: ['./plannedactivity.component.css']

  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }, NgbTimepickerConfig]
})
export class couponmaster implements OnInit {
  ButtonText: string = "Save";
  public SelectedDate: Date;
  public s_date: any;
  coupon: string = "";
  discount: number;
  couponid: number = 0;
  Coupondata: any = [];
  Detail: any = [];
  GetSaveData: any = [];
  GetEditedData: any = [];
  DeletedData: any = [];
  

  constructor(private http: HttpClient, private router: Router, private localstorage: LocalStorageService, private toaster: ToastrService, private loader: NgxUiLoaderService, private renderer: Renderer2, config: NgbTimepickerConfig, private config1: NgbDatepickerConfig) {

    const current = new Date();
    config1.minDate = {
      year: current.getFullYear(), month:
        current.getMonth() + 1, day: current.getDate()
    };
    config1.outsideDays = 'hidden';
  }

  ngOnInit() {
    this.GetData();
  }
  onSubmit() {
    debugger;
    if (this.ButtonText == "Save") {
 if (this.coupon == "" || this.coupon == undefined) {
        Swal.fire("", "Please enter coupon name", "error");
        return;
      }
   

      if (this.SelectedDate == null || this.SelectedDate == undefined) {
        Swal.fire("", "Please enter expiry date ", "error");
        return;
      }
     
      if (this.discount == 0 || this.discount == undefined) {
        Swal.fire("", "Please enter discount percent", "error");
        return;
      }
      if (this.discount.toString().match(/^[0-9]*$/)) {
  
      }
      else {
        Swal.fire("", "Discount amount should not contain alphabet", "error");
        return;
      }

      this.s_date = this.SelectedDate.toISOString().slice(0, 10);

      let input = new FormData();

      input.append("couponid", this.couponid.toString());
      input.append("expirydate", this.s_date.toString());
      input.append("discount", this.discount.toString());
      input.append("couponname", this.coupon.toString());
      input.append("createdby", this.localstorage.get("userid").toString());

      this.http.post('api/couponmaster/SaveCoupon', input)
        .subscribe(
          (data) => {
            debugger;
            this.Coupondata = data;
            if (this.Coupondata.Status == true) {
              if (this.Coupondata.Message == "Coupon Already Exists") {
                Swal.fire("", "Coupon Name Already Exists", "success");

                return;
              }
              else {
                Swal.fire("", "Saved Successfully", "success");
                this.GetData();
                this.Reset();
                return;
              }
             
            }
              
              
            
          })
    }
    else {
      debugger;
      if (this.coupon == "" || this.coupon == undefined) {
        Swal.fire("", "Please enter coupon name", "error");
        return;
      }
    
      if (this.SelectedDate == null || this.SelectedDate == undefined) {
        Swal.fire("", "Please enter expiry date ", "error");
        return;
      }

      if (this.discount == 0 || this.discount == undefined) {
        Swal.fire("", "Please enter discount percent", "error");
        return;
      }
      if (this.discount.toString().match(/^[0-9]*$/)) {

      }
      else {
        Swal.fire("", "Discount amount should not contain alphabet", "error");
        return;
      }


      this.s_date = this.SelectedDate.toISOString().slice(0, 10);
      let input = new FormData();

      input.append("couponid", this.couponid.toString());
      input.append("expirydate", this.s_date.toString());
      input.append("discount", this.discount.toString());
      input.append("couponname", this.coupon.toString());
      input.append("createdby", this.localstorage.get("userid").toString());


      this.http.post('api/couponmaster/UpdateCoupon', input)
        .subscribe(
          (data) => {
            this.Coupondata = data;
            if (this.Coupondata.Status == true) {
              Swal.fire("", "Updated Successfully", "success");
              this.GetData();
              this.Reset();
              return;
            }
          })
    }
  }
  GetData() {
    debugger;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    this.http.get('api/couponmaster/GetSavedData', options).subscribe(
      (data) => {
        debugger;
        this.Detail = data;
        this.GetSaveData = this.Detail.data;
      }
    )
  }
  EditData(i: number, Id) {
    this.Reset();
    //this.showmail = 0;
    //this.showmobile = 0;
    this.ButtonText = 'Update';
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };

    this.http.get('api/couponmaster/GetEditData?couponid=' + Id, options).subscribe(
      (data) => {
        debugger;
        this.GetEditedData = data;
        if (this.GetEditedData.Status == true) {

          var mdate = new Date(this.GetEditedData.data.expirydate);
          this.couponid = this.GetEditedData.data.couponid;
          this.coupon = this.GetEditedData.data.couponname;
          this.SelectedDate = mdate;
          this.discount = this.GetEditedData.data.discount;          
        }
      }
    )
  }
  Reset() {
    this.SelectedDate = null;
    this.s_date = null;
    this.coupon = "";
    this.discount=null;
    this.ButtonText = "Save";
    //this.showmail = 1;
    //this.showmobile = 1;
    this.GetData();
  }
  DeleteData(i: number, Id) {
    var data;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };

    data =
    {
      "couponid": Id
    };
    let body = JSON.stringify(data);

    Swal.fire({
      //title: 'Confirmation',
      text: 'Are you sure to delete this record?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.http.post('api/couponmaster/DeleteActivity', body, options).subscribe(
          (data) => {
            this.DeletedData = data;
            if (this.DeletedData.Status == true) {
              Swal.fire("", "Deleted Successfully", "success");
              this.GetData();
              this.Reset();
              return;
            }
          }
        )
      }
    })
  }
}
