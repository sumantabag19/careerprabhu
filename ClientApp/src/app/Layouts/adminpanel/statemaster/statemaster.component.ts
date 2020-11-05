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
  selector: 'app-statemaster',
  templateUrl: './statemaster.component.html',

})
export class statemaster implements OnInit {
  ButtonText: string = "Save";
  countrydat: any = [];
  CountryData: any = [];
  selectedcountry: number = 0;
  
  statename: string;
  locationid: number = 0;
  statemasterData: any = [];
  Detail: any = [];
  GetSaveData: any = [];
  GetEditedData: any = [];
  DeletedData: any = [];
  @ViewChild('fileInput', { static: true }) private myInputVariableprefile: ElementRef;
  SelectedImage: any = [];

  message: string = "";
  excelfile: any = [];
  arrayBuffer: any = [];
  exceldata: any = [];
  GetData1: any = [];
  dw: string = "";


  constructor(private http: HttpClient, private router: Router, private localstorage: LocalStorageService, private toaster: ToastrService, private loader: NgxUiLoaderService, private renderer: Renderer2, config: NgbTimepickerConfig, private config1: NgbDatepickerConfig) {


  }
  ngOnInit() {
    this.BindCountry();
    this.GetData();
    this.dw = "http://admin.careerprabhu.com/state.xlsx";

  }




  incomingfile(event) {

    this.excelfile = event.target.files[0];
    //if (!this.excelfile.type.includes(".sheet")) {
    //  this.toaster.warning("Please upload only Excel files.", '', { easeTime: 1000, timeOut: 3000 });
    //  var $el = $('#UploadedFile');
    //  $el.wrap('<form>').closest('form').get(0).reset();
    //  $el.unwrap();
    //  this.excelfile = null;
    //}
  }



  Uploadexcel() {
    debugger;
    if (this.excelfile != undefined || this.excelfile != null) {
      let fileReader = new FileReader();
      fileReader.onload = (e) => {
        this.arrayBuffer = fileReader.result;
        var data = new Uint8Array(this.arrayBuffer);
        var arr = new Array();
        for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
        var bstr = arr.join("");
        var workbook = xlsx.read(bstr, { type: "binary" });
        var first_sheet_name = workbook.SheetNames[0];
        var worksheet = workbook.Sheets[first_sheet_name];

        //console.log(xlsx.utils.sheet_to_json(worksheet, { raw: true }));
        //
        this.exceldata = xlsx.utils.sheet_to_json(worksheet, { raw: true });
        this.ValidateExcel(this.exceldata);
        //var $el = $('#UploadedFile');
        //$el.wrap('<form>').closest('form').get(0).reset();
        //$el.unwrap();
        //this.excelfile = null;
      }
      fileReader.readAsArrayBuffer(this.excelfile);
    }
    else {
      this.toaster.warning("Please choose an Excel file.");
    }

  }


  ValidateExcel(Data: any) {

    var Validate = true;
    var cols = ["country", "state"];
    for (var i = 0; i < cols.length; i++) {
      for (var j = 0; j < Data.length; j++) {
        if (Data[j][cols[i]] == undefined) {
          Swal.fire('Oops...', cols[i] + " is not available at  row number " + (j + 2), 'warning')
          var Validate = false;
          return;
        }
      }
    }
    if (Validate == true) {
      debugger;
      let headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
      let options = { headers: headers }
      var data = {

        "schoolDatas": Data
      };
      let body = JSON.stringify(data);

      // this.Loader.start();
      this.http.post('api/statemaster/Upload', body, options).subscribe(
        (data) => {
          // this.Loader.stop();
          debugger;
          this.GetData1 = data;
          if (this.GetData1.Status == true) {
            Swal.fire("", "Data Imported Succesfully", "success");

            //this.onClear();
            this.GetData();
            this.myInputVariableprefile.nativeElement.value = "";
            this.excelfile = [];
            return;

          }
          else {
            Swal.fire("", "Something Went Wrong", "success");
            // this.onClear();
            this.GetData();
            this.myInputVariableprefile.nativeElement.value = "";
            this.excelfile = [];
            return;
          }
        }
      );
    }
  }
















  BindCountry() {
    debugger;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    this.countrydat = [];

    var tmpclass: any = [];
    this.http.post('api/statemaster/BindCountry', options).subscribe(

      (data) => {
        this.countrydat = data;
        if (this.countrydat.Status == true) {
          this.CountryData = this.countrydat.data;
        }
        else {
          this.CountryData = this.countrydat.data;
        }
      }
    )
  }
  

  





  onSubmit() {
    debugger;
    if (this.ButtonText == "Save") {


      if (this.selectedcountry == 0 || this.selectedcountry == undefined) {
        Swal.fire("", "Please select country name", "error");
        return;
      }
      if (this.statename == "" || this.statename == undefined) {
        Swal.fire("", "Please select state", "error");
        return;
      }
      


      let input = new FormData();

      input.append("locationid", "0");
      input.append("countryid", this.selectedcountry.toString());

      input.append("statename", this.statename.toString());


      input.append("createdby", this.localstorage.get("userid").toString());

      this.http.post('api/statemaster/Savestatemaster', input)
        .subscribe(
          (data) => {
            debugger;
            this.statemasterData = data;
            if (this.statemasterData.Status == true) {
              if (this.statemasterData.Message == "Location Already Exists") {

                Swal.fire("", "State Already Exists", "success");
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
      if (this.selectedcountry == 0 || this.selectedcountry == undefined) {
        Swal.fire("", "Please select country name", "error");
        return;
      }
     
      if (this.statename == "" || this.statename == undefined) {
        Swal.fire("", "Please select State", "error");
        return;
      }
      let input = new FormData();


      input.append("locationid", this.locationid.toString());

      input.append("statename", this.statename.toString());
      input.append("countryid", this.selectedcountry.toString());


      input.append("createdby", this.localstorage.get("userid").toString());

      this.http.post('api/statemaster/Updatestatemaster', input)
        .subscribe(
          (data) => {
            debugger;
            this.statemasterData = data;
            if (this.statemasterData.Status == true) {
              if (this.statemasterData.Message == "State Already Exists") {

                Swal.fire("", "State Already Exists", "success");
                return;
              }
              else {
                Swal.fire("", "Successfully Updated", "success");



                this.GetData();
                this.onClear();
                return;

              }
            }

          })
    }

  }
  onClear() {
    this.statename = "";
    this.selectedcountry = 0;

    this.ButtonText = "Save";
  }
  GetData() {
    debugger;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    this.Detail = [];

    this.http.get('api/statemaster/GetSavedData', options).subscribe(
      (data) => {
        debugger;
        this.Detail = data;
        this.GetSaveData = this.Detail.data;


      }
    )
  }
  EditData(i: number, Id) {

    this.BindCountry();
    //this.BindCoupon();
    this.ButtonText = 'Update';
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };

    this.http.get('api/statemaster/GetEditData?locationid=' + Id, options).subscribe(
      (data) => {
        debugger;
        this.GetEditedData = data;
        if (this.GetEditedData.Status == true) {
          this.BindCountry();
          this.selectedcountry = this.GetEditedData.data.countryid;

         
          this.statename = this.GetEditedData.data.statename;

          this.locationid = this.GetEditedData.data.locationid;


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
      "locationid": Id
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
        this.http.post('api/statemaster/DeleteActivity', body, options).subscribe(
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
