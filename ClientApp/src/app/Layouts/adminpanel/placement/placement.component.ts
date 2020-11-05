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
  selector: 'app-placement',
  templateUrl: './placement.component.html',

})
export class AddPlacementManager implements OnInit {
  ButtonText: string = "Save";
  statedat: any = [];
  StateData: any = [];
  citdata: any = [];
  CityData: any = [];
  selectedstate: number = 0;
  selectedcity: number = 0;
  selectedschool: number = 0;
  schdata: any = [];
  SchoolData: any = [];
  StreamData: any = [];
  streamdat: any = [];
  AcademicYearData: any = [];
  selectedyear: number = 0;
  yeardat: any = [];
  selectedstream: number = 0;
  studentname: string = "";
  mobile: string = "";
  fathername: string = "";
  university: string = "";
  college: string = "";
  course: string = "";
  specialization: string = "";
  placedid: number = 0;
  PlacementData: any = [];
  Detail: any = [];
  GetSaveData: any = [];
  GetEditedData: any = [];
  DeletedData: any = [];
  search: string = "";



  @ViewChild('fileInput', { static: true }) private myInputVariableprefile: ElementRef;
  excelfile: any = [];
  arrayBuffer: any = [];
  exceldata: any = [];
  GetData1: any = [];
  dw: string = "";
  SelectedImage: any = [];

  constructor(private http: HttpClient, private router: Router, private localstorage: LocalStorageService, private toaster: ToastrService, private loader: NgxUiLoaderService, private renderer: Renderer2, config: NgbTimepickerConfig, private config1: NgbDatepickerConfig) {
 

  }
  ngOnInit() {
    this.BindState();
    this.BindStream();
    this.BindAcademicYear();
    this.GetData();
    this.dw = "http://admin.careerprabhu.com/placement.xlsx";
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
    var cols = ["studentname", "mobileno", "fathername", "state", "city", "university", "college", "stream", "course", "specialization", "academicyear"];
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
      this.http.post('api/placement/Upload', body, options).subscribe(
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



















  //bind state
  BindState() {
    debugger;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    this.statedat = [];

    var tmpclass: any = [];
    this.http.post('api/placement/Bindstate', options).subscribe(

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
    this.http.post('api/placement/BindCity', body, options).subscribe(

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

  //BindSchool() {
  //  debugger;
  //  let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //  let options = { headers: headers };
  //  this.schdata = [];
  //  var body = {

  //    "stateid": this.selectedstate,
  //    "cityid": this.selectedcity
  //  }
  //  var tmpclass: any = [];
  //  this.http.post('api/placement/BindSchool', body, options).subscribe(

  //    (data) => {
  //      this.schdata = data;
  //      if (this.schdata.Status == true) {
  //        this.SchoolData = this.schdata.data;
  //      }
  //      else {
  //        this.SchoolData = this.schdata.data;
  //      }
  //    }
  //  )
  //}
  BindStream() {
    debugger;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    this.streamdat = [];

    var tmpclass: any = [];
    this.http.post('api/placement/BindStream', options).subscribe(

      (data) => {
        debugger;
        this.streamdat = data;
        if (this.streamdat.Status == true) {
          this.StreamData = this.streamdat.data;
        }
        else {
          this.StreamData = this.streamdat.data;
        }
      }
    )
  }
  BindAcademicYear() {
    debugger;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    this.yeardat = [];

    var tmpclass: any = [];
    this.http.post('api/placement/BindYear', options).subscribe(

      (data) => {
        this.yeardat = data;
        if (this.yeardat.Status == true) {
          this.AcademicYearData = this.yeardat.data;
        }
        else {
          this.AcademicYearData = this.yeardat.data;
        }
      }
    )
  }


  //Save placement data
  onSubmit() {
    debugger;
    if (this.ButtonText == "Save") {

      if (this.studentname == "" || this.studentname == undefined) {
        Swal.fire("", "Please enter student name ", "error");
        return;
      }
      if (this.studentname.match(/[ˆ(\d|+|\-)]/)) {


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
      if (this.fathername == "" || this.fathername == undefined) {
        Swal.fire("", "Please enter father name", "error");
        return;
      }
      if (this.fathername.match(/[ˆ(\d|+|\-)]/)) {
        Swal.fire("", "Name should not contain digit", "error");
        return;
      }
      else {

      }
      if (this.selectedstate == 0 || this.selectedstate == undefined) {
        Swal.fire("", "Please select state", "error");
        return;
      }
      if (this.selectedcity == 0 || this.selectedcity == undefined) {
        Swal.fire("", "Please select city", "error");
        return;
      }
      //if (this.selectedschool == 0 || this.selectedschool == undefined) {
      //  Swal.fire("", "Please select school", "error");
      //  return;
      //}
      if (this.selectedstream == 0 || this.selectedstream == undefined) {
        Swal.fire("", "Please select stream", "error");
        return;
      }
      if (this.selectedyear == 0 || this.selectedyear == undefined) {
        Swal.fire("", "Please select academic year", "error");
        return;
      }
      if (this.university == "" || this.university == undefined) {
        Swal.fire("", "Please enter university", "error");
        return;
      }
      if (this.college == "" || this.college == undefined) {
        Swal.fire("", "Please enter college name", "error");
        return;
      }
      if (this.course == "" || this.course == undefined) {
        Swal.fire("", "Please enter course", "error");
        return;
      }
      if (this.specialization == "" || this.specialization == undefined) {
        Swal.fire("", "Please enter specialization", "error");
        return;
      }
      
      let input = new FormData();

      input.append("placedid", this.placedid.toString());

      input.append("stateid", this.selectedstate.toString());
      //input.append("schoolid", this.selectedschool.toString());
      input.append("cityid", this.selectedcity.toString());
      input.append("streamid", this.selectedstream.toString());
      input.append("yearid", this.selectedyear.toString());

      input.append("studentname", this.studentname);
      input.append("mobileno", this.mobile);

      input.append("fathername", this.fathername.toString());
      input.append("university", this.university.toString());

      input.append("collegename", this.college.toString());
      input.append("course", this.course.toString());

      input.append("specialization", this.specialization.toString());
      
      input.append("createdby", this.localstorage.get("userid").toString());

      this.http.post('api/placement/SavePlacement', input)
        .subscribe(
          (data) => {
            debugger;
            this.PlacementData = data;
            if (this.PlacementData.Status== true) {
              Swal.fire("", "Saved Successfully", "success");
              this.GetData();
              this.onClear();
              return;
            }

          })



    }
    else {
      debugger;
      if (this.studentname == "" || this.studentname == undefined) {
        Swal.fire("", "Please enter student name ", "error");
        return;
      }
      if (this.studentname.match(/[ˆ(\d|+|\-)]/)) {


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
      if (this.fathername == "" || this.fathername == undefined) {
        Swal.fire("", "Please enter father name", "error");
        return;
      }
      if (this.fathername.match(/[ˆ(\d|+|\-)]/)) {
        Swal.fire("", "Name should not contain digit", "error");
        return;
      }
      else {

      }
      if (this.selectedstate == 0 || this.selectedstate == undefined) {
        Swal.fire("", "Please select state", "error");
        return;
      }
      if (this.selectedcity == 0 || this.selectedcity == undefined) {
        Swal.fire("", "Please select city", "error");
        return;
      }
      //if (this.selectedschool == 0 || this.selectedschool == undefined) {
      //  Swal.fire("", "Please select school", "error");
      //  return;
      //}
      if (this.selectedstream == 0 || this.selectedstream == undefined) {
        Swal.fire("", "Please select stream", "error");
        return;
      }
      if (this.selectedyear == 0 || this.selectedyear == undefined) {
        Swal.fire("", "Please select academic year", "error");
        return;
      }
      if (this.university == "" || this.university == undefined) {
        Swal.fire("", "Please enter university", "error");
        return;
      }
      if (this.college == "" || this.college == undefined) {
        Swal.fire("", "Please enter college name", "error");
        return;
      }
      if (this.course == "" || this.course == undefined) {
        Swal.fire("", "Please enter course", "error");
        return;
      }
      if (this.specialization == "" || this.specialization == undefined) {
        Swal.fire("", "Please enter specialization", "error");
        return;
      }

      let input = new FormData();

      input.append("placedid", this.placedid.toString());

      input.append("stateid", this.selectedstate.toString());
      //input.append("schoolid", this.selectedschool.toString());
      input.append("cityid", this.selectedcity.toString());
      input.append("streamid", this.selectedstream.toString());
      input.append("yearid", this.selectedyear.toString());

      input.append("studentname", this.studentname);
      input.append("mobileno", this.mobile);

      input.append("fathername", this.fathername.toString());
      input.append("university", this.university.toString());

      input.append("collegename", this.college.toString());
      input.append("course", this.course.toString());

      input.append("specialization", this.specialization.toString());

      input.append("createdby", this.localstorage.get("userid").toString());

      this.http.post('api/placement/UpdatePlacement', input)
        .subscribe(
          (data) => {
            this.PlacementData = data;
            if (this.PlacementData.Status ==true) {
              Swal.fire("", "Updated Successfully", "success");
              this.GetData();
              this.onClear();
              return;
            }

          })


    }



  }
  GetData() {
    debugger;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    this.Detail = [];

    this.http.get('api/placement/GetSavedData', options).subscribe(
      (data) => {
        debugger;
        this.Detail = data;
        this.GetSaveData = this.Detail.data;
        
      }
    )
  }


  EditData(i: number, Id) {
    this.BindStream();
    this.BindAcademicYear();
    this.BindState();
    this.ButtonText = 'Update';
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };

    this.http.get('api/placement/GetEditData?placedid=' + Id, options).subscribe(
      (data) => {
        debugger;
        this.GetEditedData = data;
        if (this.GetEditedData.Status == true) {
          this.selectedstream = this.GetEditedData.data.streamid;
          this.selectedyear = this.GetEditedData.data.yearid;
          this.selectedstate = this.GetEditedData.data.stateid;
          this.BindCity();

          this.selectedcity = this.GetEditedData.data.cityid;
          //this.BindSchool();
         // this.selectedschool = this.GetEditedData.data.schoolid;

          this.studentname = this.GetEditedData.data.studentname;
          this.mobile = this.GetEditedData.data.mobileno;

          this.fathername = this.GetEditedData.data.fathername;

          this.university = this.GetEditedData.data.university;
          this.college = this.GetEditedData.data.college;

          this.course = this.GetEditedData.data.course;
          this.specialization = this.GetEditedData.data.specialization;
          this.placedid = this.GetEditedData.data.placedid;
          


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
      "placedid": Id
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
        this.http.post('api/placement/DeleteActivity', body, options).subscribe(
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


  onClear() {
    this.selectedcity = 0;
   // this.selectedschool = 0;
    this.selectedstate = 0;
    this.selectedstream = 0;
    this.selectedyear = 0;
    this.studentname = "";
    this.mobile = "";
    this.fathername = "";
    this.university = "";
    this.college = "";
    this.course = "";
    this.specialization = "";
    this.ButtonText = "Save";
  }
  
}
