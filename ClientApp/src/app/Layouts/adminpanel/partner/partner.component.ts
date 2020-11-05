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
  selector: 'app-partnerregistration',
  templateUrl: './partner.component.html',

})
export class partnerregistration implements OnInit {
  ButtonText: string = "Save";
  statedat: any = [];
  StateData: any = [];
  citdata: any = [];
  CityData: any = [];
  selectedstate: number = 0;
  selectedcity: number = 0;
  productdat: any = [];
  Products: any = [];
  selectproduct: number = 0;
  partnername: string = "";
  mobile: string = "";
  //couponname: string = "";
  district: string = "";
  email: string = "";
  pwd: string = "";

  whatsappno: string = "";
  discount: number;
  regid: number = 0;
  PartnerData: any = [];
  Detail: any = [];
  GetSaveData: any = [];
  GetEditedData: any = [];
  DeletedData: any = [];
  Status: number;
  public AllCoupon: any;
  public Couponid: string = "";
  public CouponData: any = [];
  public getcoupon: any = [];





  constructor(private http: HttpClient, private router: Router, private localstorage: LocalStorageService, private toaster: ToastrService, private loader: NgxUiLoaderService, private renderer: Renderer2, config: NgbTimepickerConfig, private config1: NgbDatepickerConfig) {


  }
  ngOnInit() {
    this.BindState();
    this.BindProducts();
    this.BindCoupon();
    this.GetData();
  }
  BindState() {
    debugger;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    this.statedat = [];

    var tmpclass: any = [];
    this.http.post('api/partner/Bindstate', options).subscribe(

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



  BindCity() {
    debugger;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    this.citdata = [];
    var body = {

      "stateid": this.selectedstate
    }
    var tmpclass: any = [];
    this.http.post('api/partner/BindCity', body, options).subscribe(

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

  BindCoupon() {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };


    this.http.get('api/partner/BindCoupon', options).subscribe(

      (data) => {
        debugger;

        this.Detail = data;

        if (this.Detail.status = true) {
          this.CouponData = this.Detail.data;
          this.GetData();
        }
        else {
          this.toaster.error(this.Detail.message.toString(), '', { easeTime: 1000, timeOut: 3000 })
        }
        if (this.GetEditedData.Status == true) {
          this.Couponid = this.GetEditedData.data[0].Couponid;
          var tmpCouponid = this.GetEditedData.data[0].Couponid.split(",");
          for (var i = 0; i < this.CouponData.length; i++) {
            for (var j = 0; j < tmpCouponid.length; j++) {
              if (this.CouponData[i].Couponid == tmpCouponid[j]) {
                this.CouponData[i].selected = true;


              }
            }
          }
          if (this.CouponData.length == tmpCouponid.length) {
            this.AllCoupon = true;
          }
          else {
            this.AllCoupon = false;
          }


        }
        else {
        }
      }
    )
  }
  SelectAllCoupon() {
    debugger;
    this.Couponid = "";
    if (this.AllCoupon === true) {
      for (var i = 0; i < this.CouponData.length; i++) {
        this.CouponData[i].selected = true;
        if (this.Couponid === '') {
          this.Couponid = this.CouponData[i].Couponid;
        }
        else {
          this.Couponid = this.Couponid + ',' + this.CouponData[i].Couponid;
        }
      }
    }
    else {
      for (var i = 0; i < this.CouponData.length; i++) {
        this.CouponData[i].selected = false;
      }
    }
  }

  getSelectedCoupon() {
    this.Couponid = "";
    var count = 0;
    for (var i = 0; i < this.CouponData.length; i++) {

      if (this.CouponData[i].selected === true) {

        if (this.Couponid === '') {
          this.Couponid = this.CouponData[i].Couponid;
          count++;
        }
        else {
          this.Couponid = this.Couponid + ',' + this.CouponData[i].Couponid;
          count++;
        }
      }
    }
    if (this.CouponData.length === count) {
      this.AllCoupon = true;
    }
    else {
      this.AllCoupon = false;
    }


  }



  BindProducts() {
    debugger;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    this.productdat = [];

    var tmpclass: any = [];
    this.http.post('api/partner/BindProducts', options).subscribe(

      (data) => {
        debugger;
        this.productdat = data;
        if (this.productdat.Status == true) {
          this.Products = this.productdat.data;
        }
        else {
          this.Products = this.productdat.data;
        }
      }
    )
  }
  onSubmit() {
    debugger;
    if (this.ButtonText == "Save") {

      if (this.partnername == "" || this.partnername == undefined) {
        Swal.fire("", "Please enter partner name ", "error");
        return;
      }
      if (this.partnername.match(/[ˆ(\d|+|\-)]/)) {
        Swal.fire("", "Name should not contain digit", "error");
        return;
      }
      else {
    
      }

      if (this.mobile == "" || this.mobile == undefined) {
        Swal.fire("", "Please enter mobile no ", "error");
        return;
      }
      if (!this.mobile.match(/^(\+\d{1,3}[- ]?)?\d{10}$/)) {
        Swal.fire("", "Please enter valid mobile no ", "error");
        return;
      }
      if (this.Couponid == "" || this.Couponid == undefined) {
        Swal.fire("", "Please select coupon name", "error");
        return;
      }
      if (this.selectedstate == 0 || this.selectedstate == undefined) {
        Swal.fire("", "Please select state", "error");
        return;
      }
      if (this.selectedcity == 0 || this.selectedcity == undefined) {
        Swal.fire("", "Please select city", "error");
        return;
      }
      if (this.district == "" || this.district == undefined) {
        Swal.fire("", "Please enter district", "error");
        return;
      }
      if (this.district.match(/[ˆ(\d|+|\-)]/)) {
        Swal.fire("", "District should not contain digit", "error");
        return;
      }
      else {

      }
      if (this.email == "" || this.email == undefined) {
        Swal.fire("", "Please enter email", "error");
        return;
      }
      if (!this.email.match('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')) {
        Swal.fire("", "Please enter valid email", "error");
        return;
      }
      if (this.email == "" || this.email == undefined) {
        Swal.fire("", "Please enter email", "error");
        return;
      }
     
      if (this.whatsappno == "" || this.whatsappno == undefined) {
        Swal.fire("", "Please enter whatsapp no", "error");
        return;
      }
      if (!this.mobile.match(/^(\+\d{1,3}[- ]?)?\d{10}$/)) {
        Swal.fire("", "Please enter valid mobile no ", "error");
        return;
      }
      if (!this.whatsappno.match(/^(\+\d{1,3}[- ]?)?\d{10}$/)) {
        Swal.fire("", "Please enter valid mobile no ", "error");
        return;
      }
      if (this.discount == 0 || this.discount == undefined) {
        Swal.fire("", "Please enter discount", "error");
        return;
      }
      if (this.selectproduct == 0 || this.selectproduct == undefined) {
        Swal.fire("", "Please select product", "error");
        return;
      }
      else {
        if (this.selectproduct == 8) {
          this.Status = 1;
        }
        else {
          this.Status = 0;
        }
        
      }
      
      let input = new FormData();

      input.append("regid", this.regid.toString());

      input.append("stateid", this.selectedstate.toString());
      input.append("cityid", this.selectedcity.toString());
      input.append("productid", this.selectproduct.toString());

      input.append("partnername", this.partnername);
      input.append("mobileno", this.mobile);

      input.append("Couponid", this.Couponid.toString());
      input.append("district", this.district.toString());

      input.append("email", this.email.toString());
      input.append("pwd", this.pwd.toString());

      input.append("whatsappno", this.whatsappno.toString());

      input.append("discount", this.discount.toString());
      input.append("status", this.Status.toString());


      input.append("createdby", this.localstorage.get("userid").toString());

      this.http.post('api/partner/SavePartner', input)
        .subscribe(
          (data) => {
            debugger;
            this.PartnerData = data;
            if (this.PartnerData.Status == true) {
              if (this.PartnerData.Message == "Partner Already Exists") {
                Swal.fire("", "Partner Already Exists", "success");

                return;
              }
              else {
                Swal.fire("", "Successfully Saved", "success");
                this.GetData();
                this.onClear();
                return;
              }
            }

          })



    }
    else {
      debugger;
      if (this.partnername == "" || this.partnername == undefined) {
        Swal.fire("", "Please enter partner name ", "error");
        return;
      }
      if (this.partnername.match(/[ˆ(\d|+|\-)]/)) {
        Swal.fire("", "Name should not contain digit", "error");
        return;
      }
      else {

      }

      if (this.mobile == "" || this.mobile == undefined) {
        Swal.fire("", "Please enter mobile no ", "error");
        return;
      }
      if (!this.mobile.match(/^(\+\d{1,3}[- ]?)?\d{10}$/)) {
        Swal.fire("", "Please enter valid mobile no ", "error");
        return;
      }
      if (this.Couponid == "" || this.Couponid == undefined) {
        Swal.fire("", "Please select coupon name", "error");
        return;
      }
      if (this.selectedstate == 0 || this.selectedstate == undefined) {
        Swal.fire("", "Please select state", "error");
        return;
      }
      if (this.selectedcity == 0 || this.selectedcity == undefined) {
        Swal.fire("", "Please select city", "error");
        return;
      }
      if (this.district == "" || this.district == undefined) {
        Swal.fire("", "Please enter district", "error");
        return;
      }
      if (this.district.match(/[ˆ(\d|+|\-)]/)) {
        Swal.fire("", "District should not contain digit", "error");
        return;
      }
      else {

      }
      if (this.email == "" || this.email == undefined) {
        Swal.fire("", "Please enter email", "error");
        return;
      }
      
      if (!this.email.match('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')) {
        Swal.fire("", "Please enter valid email", "error");
        return;
      }      
      if (this.whatsappno == "" || this.whatsappno == undefined) {
        Swal.fire("", "Please enter whatsapp no", "error");
        return;
      }
      if (!this.whatsappno.match(/^(\+\d{1,3}[- ]?)?\d{10}$/)) {
        Swal.fire("", "Please enter valid mobile no ", "error");
        return;
      }
      if (this.discount == 0 || this.discount == undefined) {
        Swal.fire("", "Please enter discount", "error");
        return;
      }
      if (this.selectproduct == 0 || this.selectproduct == undefined) {
        Swal.fire("", "Please select product", "error");
        return;
      }
      else {
        if (this.selectproduct != 8) {
          this.Status = 0;
        }
        else {
          this.Status = 1;
        }

      }

      let input = new FormData();

      input.append("regid", this.regid.toString());

      input.append("stateid", this.selectedstate.toString());
      input.append("cityid", this.selectedcity.toString());
      input.append("productid", this.selectproduct.toString());

      input.append("partnername", this.partnername);
      input.append("mobileno", this.mobile);

      input.append("Couponid", this.Couponid.toString());
      input.append("district", this.district.toString());

      input.append("email", this.email.toString());
      //input.append("pwd", this.pwd.toString());

      input.append("whatsappno", this.whatsappno.toString());

      input.append("discount", this.discount.toString());
      input.append("status", this.Status.toString());

      input.append("createdby", this.localstorage.get("userid").toString());

      this.http.post('api/partner/UpdatePartner', input)
        .subscribe(
          (data) => {
            debugger;
            this.PartnerData = data;
            if (this.PartnerData.Status == true)
            {
              
                  Swal.fire("", "Successfully Updated", "success");
              this.GetData();
              this.onClear();
                return;
              
              
            }

          })

    }


  }
  onClear() {
    this.selectedcity = 0;
    this.selectproduct = 0;
    this.selectedstate = 0;
    this.discount=null;
    this.partnername = "";
    this.mobile = "";
    this.district = "";
    for (var i = 0; i < this.CouponData.length; i++) {
      this.CouponData[i].selected = false;
    }
    this.AllCoupon = false;
    this.email = "";
    this.whatsappno = "";    
    this.ButtonText = "Save";
  }
  GetData() {
    debugger;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    this.Detail = [];

    this.http.get('api/partner/GetSavedData', options).subscribe(
      (data) => {
        debugger;
        this.getcoupon = data;
        var coupon;

        debugger;
        this.GetSaveData = this.getcoupon.data;
        for (var i = 0; i < this.GetSaveData.length; i++) {
          var couponname = "";

          //for (var j = 0; j < this.GetSaveData[i].State.length; j++) {
          coupon = this.GetSaveData[i].CouponName.split(",");

          //}
          //state
          debugger;
          for (var k = 0; k < coupon.length; k++) {
            for (var l = 0; l < this.CouponData.length; l++) {
              if (coupon[k] == this.CouponData[l].Couponid) {
                if (k > 0) {
                  couponname = couponname + ", " + this.CouponData[l].Couponname;
                }
                else {
                  couponname = couponname + this.CouponData[l].Couponname;
                }
              }
            }
          }



          this.GetSaveData[i].Couponname = couponname;

        }


      }
    )
  }
  EditData(i: number, Id) {
    this.BindProducts();
    this.BindState();
    //this.BindCoupon();
    this.ButtonText = 'Update';
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };

    this.http.get('api/partner/GetEditData?regid=' + Id, options).subscribe(
      (data) => {
        debugger;
        this.GetEditedData = data;
        if (this.GetEditedData.Status == true) {
          this.BindProducts();
          this.selectproduct = this.GetEditedData.data[0].productid;
         
          this.BindState();
          this.selectedstate = this.GetEditedData.data[0].stateid;
          this.BindCity();

          this.selectedcity = this.GetEditedData.data[0].cityid;
          this.partnername = this.GetEditedData.data[0].partnername;

          this.BindCoupon();

          this.mobile = this.GetEditedData.data[0].mobileno;


          this.district = this.GetEditedData.data[0].district;
          this.email = this.GetEditedData.data[0].email;

          this.whatsappno = this.GetEditedData.data[0].whatsappno;
          this.discount = this.GetEditedData.data[0].discount;
          this.regid = this.GetEditedData.data[0].regid;        


        }
      }
    )
  }
 
  DeleteData(i: number, Id) {
    var data;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };

    data =
    {
      "regid": Id
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
        this.http.post('api/partner/DeleteActivity', body, options).subscribe(
          (data) => {
            this.DeletedData = data;
            if (this.DeletedData.Status == true) {
              Swal.fire("", "Deleted Successfully", "success");
              this.GetData();
              return;
            }
          }
        )
      }
    })

  }
}
