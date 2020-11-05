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
  selector: 'app-addstudent',
  templateUrl: './addstudent.component.html',

})
export class addstudent implements OnInit {
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
  selectedclass: number = 0;
  ClassData: any = [];
  classdat: any = [];
  StreamData: any = [];
  streamdat: any = [];
  selectedstream: number = 0;
  studentname: string = "";
  email: string = "";
  mobileno: string = "";
  fathersname: string = "";
  parentemail: string = "";
  parentmobileno: string = "";
  
  studentid: number = 0;
  StudentData: any = [];
  Detail: any = [];
  GetSaveData: any = [];
  GetEditedData: any = [];
  DeletedData: any = [];
  isshow: number = 1;

  constructor(private http: HttpClient, private router: Router, private localstorage: LocalStorageService, private toaster: ToastrService, private loader: NgxUiLoaderService, private renderer: Renderer2, config: NgbTimepickerConfig, private config1: NgbDatepickerConfig) {


  }
  ngOnInit() {
    this.BindState();
    this.BindClass();
    this.BindStream();
   
    this.GetData();
  }
  BindState() {
    debugger;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    this.statedat = [];

    var tmpclass: any = [];
    this.http.post('api/addstudentpartner/Bindstate', options).subscribe(

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
    this.http.post('api/addstudentpartner/BindCity', body, options).subscribe(

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

  BindSchool() {
    debugger;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    this.schdata = [];
    var body = {

      "stateid": this.selectedstate,
      "cityid": this.selectedcity
    }
    var tmpclass: any = [];
    this.http.post('api/addstudentpartner/BindSchool', body, options).subscribe(

      (data) => {
        this.schdata = data;
        if (this.schdata.Status == true) {
          this.SchoolData = this.schdata.data;
        }
        else {
          this.SchoolData = this.schdata.data;
        }
      }
    )
  }
  BindClass() {
    debugger;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    this.classdat = [];

    var tmpclass: any = [];
    this.http.post('api/addstudent/Bindclass', options).subscribe(

      (data) => {
        this.classdat = data;
        if (this.classdat.Status == true) {
          this.ClassData = this.classdat.data;
        }
        else {
          this.ClassData = this.classdat.data;
        }
      }
    )
  }
  //binds  stream code
  BindStream() {
    debugger;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    this.streamdat = [];

    var tmpclass: any = [];
    this.http.post('api/addstudentpartner/BindStream', options).subscribe(

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
  onSubmit() {
    debugger;
    if (this.ButtonText == "Save") {

      if (this.studentname == "" || this.studentname == undefined) {
        Swal.fire("", "Please enter student name ", "error");
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
      if (this.selectedschool == 0 || this.selectedschool == undefined) {
        Swal.fire("", "Please select school", "error");
        return;
      }
      if (this.selectedclass == 0 || this.selectedclass == undefined) {
        Swal.fire("", "Please select class", "error");
        return;
      }
      if (this.selectedstream == 0 || this.selectedstream == undefined) {
        Swal.fire("", "Please select stream", "error");
        return;
      }
      if (this.email == "" || this.email == undefined) {
        Swal.fire("", "Please select email", "error");
        return;
      }
      if (!this.email.match('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')) {
        Swal.fire("", "Please enter valid email", "error");
        return;
      }  
      if (this.mobileno == "" || this.mobileno == undefined) {
        Swal.fire("", "Please enter mobileno", "error");
        return;
      }
      if (!this.mobileno.match(/^(\+\d{1,3}[- ]?)?\d{10}$/)) {
        Swal.fire("", "Please enter valid mobile no ", "error");
        return;
      }
      if (this.fathersname == "" || this.fathersname == undefined) {
        Swal.fire("", "Please enter fathers name", "error");
        return;
      }
      if (this.parentemail == "" || this.parentemail == undefined) {
        Swal.fire("", "Please enter parents email", "error");
        return;
      }
      if (!this.parentemail.match('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')) {
        Swal.fire("", "Please enter valid parent email", "error");
        return;
      }  

      if (this.parentmobileno == "" || this.parentmobileno == undefined) {
        Swal.fire("", "Please enter parents mobileno", "error");
        return;
      }
      if (!this.parentmobileno.match(/^(\+\d{1,3}[- ]?)?\d{10}$/)) {
        Swal.fire("", "Please enter valid parents mobileno ", "error");
        return;
      }

      let input = new FormData();

      input.append("studentid", this.studentid.toString());
      input.append("studentname", this.studentname);
      input.append("stateid", this.selectedstate.toString());
      input.append("schoolid", this.selectedschool.toString());
      input.append("cityid", this.selectedcity.toString());
      input.append("classid", this.selectedclass.toString());

      input.append("streamid", this.selectedstream.toString());
      input.append("email", this.email);
      input.append("mobileno", this.mobileno);

      input.append("fathersname", this.fathersname.toString());
      input.append("parentemail", this.parentemail.toString());

      input.append("parentmobileno", this.parentmobileno.toString());
      input.append("createdby", this.localstorage.get("userid").toString());

      this.http.post('api/addstudentpartner/SaveStudent', input)
        .subscribe(
          (data) => {
            debugger;
            this.StudentData = data;
            if (this.StudentData.Status == true) {
              
              if (this.StudentData.Message == "Student Details Already Exists") {
                  Swal.fire("", "Student Details Already Exists", "success");
                this.onClear();
                return;
                }
                else {
                  Swal.fire("", "Saved Successfully", "success");


                  this.GetData();
                  this.onClear();
                  return;
                }

              }
            
          })

    }

    else {
      debugger;
      if (this.studentname == "" || this.studentname == undefined) {
        Swal.fire("", "Please enter student name ", "error");
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
      if (this.selectedschool == 0 || this.selectedschool == undefined) {
        Swal.fire("", "Please select school", "error");
        return;
      }
      if (this.selectedclass == 0 || this.selectedclass == undefined) {
        Swal.fire("", "Please select class", "error");
        return;
      }
      if (this.selectedstream == 0 || this.selectedstream == undefined) {
        Swal.fire("", "Please select stream", "error");
        return;
      }
      if (this.email == "" || this.email == undefined) {
        Swal.fire("", "Please select email", "error");
        return;
      }
      if (!this.email.match('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')) {
        Swal.fire("", "Please enter valid email", "error");
        return;
      }  
      if (this.mobileno == "" || this.mobileno == undefined) {
        Swal.fire("", "Please enter mobileno", "error");
        return;
      }
      if (this.fathersname == "" || this.fathersname == undefined) {
        Swal.fire("", "Please enter fathers name", "error");
        return;
      }
      if (this.parentemail == "" || this.parentemail == undefined) {
        Swal.fire("", "Please enter parents email", "error");
        return;
      }
      if (!this.parentemail.match('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')) {
        Swal.fire("", "Please enter valid parent email", "error");
        return;
      } 
      if (this.parentmobileno == "" || this.parentmobileno == undefined) {
        Swal.fire("", "Please enter parents mobileno", "error");
        return;
      }
      if (!this.parentmobileno.match(/^(\+\d{1,3}[- ]?)?\d{10}$/)) {
        Swal.fire("", "Please enter valid parents mobileno ", "error");
        return;
      }
      
      let input = new FormData();

      input.append("studentid", this.studentid.toString());
      input.append("studentname", this.studentname);
      input.append("stateid", this.selectedstate.toString());
      input.append("schoolid", this.selectedschool.toString());
      input.append("cityid", this.selectedcity.toString());
      input.append("classid", this.selectedclass.toString());

      input.append("streamid", this.selectedstream.toString());
      input.append("email", this.email);
      input.append("mobileno", this.mobileno);

      input.append("fathersname", this.fathersname.toString());
      input.append("parentemail", this.parentemail.toString());

      input.append("parentmobileno", this.parentmobileno.toString());
      input.append("createdby", this.localstorage.get("userid").toString());
        
      this.http.post('api/addstudentpartner/UpdateStudent', input)
        .subscribe(
          (data) => {
            debugger;
            this.StudentData = data;
            if (this.StudentData.Status == true) {
              if (this.StudentData.Message == "Student Details Already Exists") {
                this.GetData();
                Swal.fire("", "Student Details Already Exists", "success");
                this.onClear();
                return;
              }
              else {

                this.GetData();
                Swal.fire("", "Successfully Updated", "success");
               
                this.onClear();
                return;
              }
            }

          })

    }
  }



  
  GetData() {
    debugger;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    this.Detail = [];

    this.http.get('api/addstudentpartner/GetSavedData', options).subscribe(
      (data) => {
        debugger;
        this.Detail = data;
        this.GetSaveData = this.Detail.data;

      }
    )
  }
  EditData(i: number, Id) {
    this.BindClass();
    this.BindStream();
    this.BindState();

    this.ButtonText = 'Update';
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };

    this.http.get('api/addstudentpartner/GetEditData?studentid=' + Id, options).subscribe(
      (data) => {
        debugger;
        this.GetEditedData = data;
        if (this.GetEditedData.Status == true) {
          this.studentid = this.GetEditedData.data.studentid;
          this.studentname = this.GetEditedData.data.studentname;
          this.selectedstate = this.GetEditedData.data.stateid;
          this.BindCity();

          this.selectedcity = this.GetEditedData.data.cityid;
          this.BindSchool();
          this.selectedschool = this.GetEditedData.data.schoolid;
          this.selectedclass = this.GetEditedData.data.classid;
          this.selectedstream = this.GetEditedData.data.streamid;
          this.email = this.GetEditedData.data.email;
          this.mobileno = this.GetEditedData.data.mobileno;
          this.fathersname = this.GetEditedData.data.fathersname;
          this.parentemail = this.GetEditedData.data.parentemail;
          this.parentmobileno = this.GetEditedData.data.parentmobileno;
          this.isshow = 0;




          
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
      "studentid": Id
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
        this.http.post('api/addstudentpartner/DeleteActivity', body, options).subscribe(
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
    this.isshow = 1;
    this.selectedclass = 0;
    this.selectedstream = 0;
    this.selectedcity = 0;
    this.selectedschool = 0;
    this.selectedstate = 0;
    this.studentname = "";
    this.email = "";
    this.mobileno = "";
    this.fathersname = "";
    this.parentemail = "";
    this.parentmobileno = "";
    this.ButtonText = "Save";
 
  }


}
