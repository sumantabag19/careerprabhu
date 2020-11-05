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
  selector: 'app-paidfeature',
  templateUrl: './paidfeature.component.html',
  //styleUrls: ['./webinar.component.css']
})
export class PaidFeaturemanager implements OnInit {
  ShowDiv: number = 0;
  IsParent: boolean = false;
  IsStudent: boolean = false;
  ButtonText: string = "Save";
  testimonials: string = "";
  selectedphoto: any = [];
  video: string = "";
  StreamData: any = [];
  selectedstream: number = 0;
  ClassData: any = [];
  selectedclass: number = 0;
  school: string = "";
  name: string = "";
  description: string = "";
  selectedimage: any = [];
  link: string = "";
  convfees: number = 0;
  gst: number = 0;
  fees: number = 0;
  CategoryData: any = [];
  selectedcategory: number = 0;
  pdffile: any = [];
  pdftoupload: any = [];
  @ViewChild('inputfile', { static: true }) private myInputVariabl: ElementRef;
  @ViewChild('inputfile1', { static: true }) private myInputVariabl1: ElementRef;
  orgpdfname: string = "";
  photofile: any = [];
  phototoupload: any = [];
  orgphotoname: string = "";
  CategoryData_d: any = [];
  classdata_d: any = [];
  StreamData_d: any = [];
  paiddata: any = [];
  GetSaveData: any = [];
  constructor(private http: HttpClient, private router: Router, private localstorage: LocalStorageService, private toaster: ToastrService, private loader: NgxUiLoaderService) {

  }
  ngOnInit() {
    this.BindCategory();
    this.BindClass();
    this.BindStream();

  }
  onChangeOfCheckBox() {
    if (this.IsParent == true) {
      this.ShowDiv = 1;
      this.IsStudent=false
    }
    else {
      this.ShowDiv = 0;
    }   
  }
  onChangeOfCheckBox1() {
    if (this.IsStudent == true) {
      this.ShowDiv = 1;
      this.IsParent = false
    }
    else {
      this.ShowDiv = 0;
    }
  }
  EditData(i: number, traitid) {

  }
  DeleteData(i: number, traitid) {

  }
  onClear() {

  }
  GetPhotoDetail(event) {
    debugger;
    this.pdffile = event
    let file = event.target.files[0];
    let fileList: FileList = event.target.files;
    this.pdftoupload = fileList[0];
    if (file.type.includes("png") || file.type.includes("jpg") || file.type.includes("jpeg")) {

      this.orgpdfname = file.name;
    }
    else {
      Swal.fire("", "Please select image", "error");
      this.myInputVariabl.nativeElement.value = "";
    }
  }

  GetPhoto_Detail(event) {
    debugger;
    this.photofile = event
    let file = event.target.files[0];
    let fileList: FileList = event.target.files;
    this.phototoupload = fileList[0];
    if (file.type.includes("png") || file.type.includes("jpg") || file.type.includes("jpeg")) {

      this.orgphotoname = file.name;
    }
    else {
      Swal.fire("", "Please select image", "error");
      this.myInputVariabl1.nativeElement.value = "";
    }
  }
  BindCategory() {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    this.CategoryData = [];
    var a;
    var tmpclass: any = [];
    this.http.get('api/paidfeature/BindCategory', options).subscribe(
      (data) => {
        this.CategoryData_d = data;

        this.CategoryData = this.CategoryData_d;

      }
    )
  }


  BindClass() {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    this.ClassData = [];
    var a;
    var tmpclass: any = [];
    this.http.get('api/paidfeature/BindClass', options).subscribe(
      (data) => {
        this.classdata_d = data;

        this.ClassData = this.classdata_d;

      }
    )
  }
  BindStream() {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    this.StreamData = [];
    var a;
    var tmpclass: any = [];
    this.http.get('api/paidfeature/BindStream', options).subscribe(
      (data) => {
        this.StreamData_d = data;

        this.StreamData = this.StreamData_d;

      }
    )
  }





  onSubmit() {
    debugger;
    if (this.ButtonText == "Save") {

      if (this.selectedcategory == 0 || this.selectedcategory == undefined) {
        Swal.fire("", "Please select category", "error");
        return;
      }
      if (this.fees == 0 || this.fees == undefined) {
        Swal.fire("", "Please enter fees", "error");
        return;
      }
      if ((this.fees.toString()).match("^[a-zA-Z]*$")) {
        Swal.fire("", "Fees contains only integer", "error");
        return;
      }
     
      if (this.gst == 0 || this.gst == undefined) {
        Swal.fire("", "Please enter gst", "error");
        return;
      }
      if ((this.gst.toString()).match("^[a-zA-Z]*$")) {
        Swal.fire("", "GST contains only integer", "error");
        return;
      }
      if (this.convfees == 0 || this.convfees == undefined) {
        Swal.fire("", "Please enter convinence fees", "error");
        return;
      }
      if ((this.gst.toString()).match("^[a-zA-Z]*$")) {
        Swal.fire("", "Convinence fees contains only integer", "error");
        return;
      }
      if (this.link == "" || this.link == undefined) {
        Swal.fire("", "Please enter link", "error");
        return;
      }
      if (this.orgpdfname == "" || this.orgpdfname == undefined) {
        Swal.fire("", "Please choose photo", "error");
        return;
      }

      if (this.description == "" || this.description == undefined) {
        Swal.fire("", "Please enter description", "error");
        return;
      }
     

      if (this.IsParent == true || this.IsStudent == true) {

        if (this.name == "" || this.name == undefined) {
          Swal.fire("", "Please enter name", "error");
          return;
        }
        if (this.name.match(/[ˆ(\d|+|\-)]/)) {
          Swal.fire("", "Name should not contain digit", "error");
          return;
        }
        else {

        }
        if (this.school == "" || this.name == undefined) {
          Swal.fire("", "Please enter name", "error");
          return;
        }

        if (this.school.match(/[ˆ(\d|+|\-)]/)) {
          Swal.fire("", "School name should not contain digit", "error");
          return;
        }
        else {

        }
        if (this.selectedclass == 0 || this.selectedclass == undefined) {
          Swal.fire("", "Please select class", "error");
          return;
        }
        if (this.selectedstream == 0 || this.selectedstream == undefined) {
          Swal.fire("", "Please select stream", "error");
          return;
        }
        if (this.orgphotoname == "" || this.orgphotoname == undefined) {
          Swal.fire("", "Please choose photo", "error");
          return;
        }
        if (this.video == "" || this.video == undefined) {
          Swal.fire("", "Please enter video link", "error");
          return;
        }
        if (this.testimonials == "" || this.testimonials == undefined) {
          Swal.fire("", "Please enter testimonials", "error");
          return;
        }

      }
      else {
        Swal.fire("", "Please check testimonials", "error");
        return;
      }
      let input = new FormData();
      input.append("photo", this.pdftoupload);
      input.append("orgphotoname", this.orgpdfname.toString());
      input.append("photo_d", this.phototoupload);
      input.append("orgphotoname_d", this.orgphotoname.toString());
      input.append("categoryid", this.selectedcategory.toString());
      input.append("fees", this.fees.toString());
      input.append("gst", this.gst.toString());
      input.append("convinencefees", this.convfees.toString());
      input.append("link", this.link.toString());
      input.append("descirption", this.description.toString());
      input.append("isstudent", (this.IsStudent == true) ? '1' : '0');
      input.append("isparents", (this.IsParent == true) ? '1' : '0');
      input.append("name", this.name.toString());
      input.append("schoolname", this.school.toString());
      input.append("classid", this.selectedclass.toString());
      input.append("streamid", this.selectedstream.toString());
      input.append("video", this.video.toString());
      input.append("testimonils", this.testimonials.toString());
      input.append("createdby", this.localstorage.get("userid").toString());
      this.http.post('api/paidfeature/savepaidfeature', input)
        .subscribe(
          (data) => {
            debugger;
            this.paiddata = data;
            if (this.paiddata.length > 10) {
              Swal.fire("", "Saved Successfully", "success");
              //this.onClearInterviews();
              //this.BindInterviewData();
              return;
            }

          })

    }
    else {
      debugger;
      if (this.selectedcategory == 0 || this.selectedcategory == undefined) {
        Swal.fire("", "Please select category", "error");
        return;
      }
      if (this.fees == 0 || this.fees == undefined) {
        Swal.fire("", "Please enter fees", "error");
        return;
      }
      if ((this.fees.toString()).match("^[a-zA-Z]*$")) {
        Swal.fire("", "Fees contains only integer", "error");
        return;
      }

      if (this.gst == 0 || this.gst == undefined) {
        Swal.fire("", "Please enter gst", "error");
        return;
      }
      if ((this.gst.toString()).match("^[a-zA-Z]*$")) {
        Swal.fire("", "GST contains only integer", "error");
        return;
      }
      if (this.convfees == 0 || this.convfees == undefined) {
        Swal.fire("", "Please enter convinence fees", "error");
        return;
      }
      if ((this.gst.toString()).match("^[a-zA-Z]*$")) {
        Swal.fire("", "Convinence fees contains only integer", "error");
        return;
      }
      if (this.link == "" || this.link == undefined) {
        Swal.fire("", "Please enter link", "error");
        return;
      }
      if (this.orgpdfname == "" || this.orgpdfname == undefined) {
        Swal.fire("", "Please choose photo", "error");
        return;
      }

      if (this.description == "" || this.description == undefined) {
        Swal.fire("", "Please enter description", "error");
        return;
      }


      if (this.IsParent == true || this.IsStudent == true) {

        if (this.name == "" || this.name == undefined) {
          Swal.fire("", "Please enter name", "error");
          return;
        }
        if (this.name.match(/[ˆ(\d|+|\-)]/)) {
          Swal.fire("", "Name should not contain digit", "error");
          return;
        }
        else {

        }
        if (this.school == "" || this.name == undefined) {
          Swal.fire("", "Please enter name", "error");
          return;
        }

        if (this.school.match(/[ˆ(\d|+|\-)]/)) {
          Swal.fire("", "School name should not contain digit", "error");
          return;
        }
        else {

        }
        if (this.selectedclass == 0 || this.selectedclass == undefined) {
          Swal.fire("", "Please select class", "error");
          return;
        }
        if (this.selectedstream == 0 || this.selectedstream == undefined) {
          Swal.fire("", "Please select stream", "error");
          return;
        }
        if (this.orgphotoname == "" || this.orgphotoname == undefined) {
          Swal.fire("", "Please choose photo", "error");
          return;
        }
        if (this.video == "" || this.video == undefined) {
          Swal.fire("", "Please enter video link", "error");
          return;
        }
        if (this.testimonials == "" || this.testimonials == undefined) {
          Swal.fire("", "Please enter testimonials", "error");
          return;
        }

      }
      else {
        Swal.fire("", "Please check testimonials", "error");
        return;
      }
      let input = new FormData();
      input.append("photo", this.pdftoupload);
      input.append("orgphotoname", this.orgpdfname.toString());
      input.append("photo_d", this.phototoupload);
      input.append("orgphotoname_d", this.orgphotoname.toString());
      input.append("categoryid", this.selectedcategory.toString());
      input.append("fees", this.fees.toString());
      input.append("gst", this.gst.toString());
      input.append("convinencefees", this.convfees.toString());
      input.append("link", this.link.toString());
      input.append("descirption", this.description.toString());
      input.append("isstudent", (this.IsStudent == true) ? '1' : '0');
      input.append("isparents", (this.IsParent == true) ? '1' : '0');
      input.append("name", this.name.toString());
      input.append("schoolname", this.school.toString());
      input.append("classid", this.selectedclass.toString());
      input.append("streamid", this.selectedstream.toString());
      input.append("video", this.video.toString());
      input.append("testimonils", this.testimonials.toString());
      input.append("createdby", this.localstorage.get("userid").toString());
      this.http.post('api/paidfeature/updatepaidfeature', input)
        .subscribe(
          (data) => {
            debugger;
            this.paiddata = data;
            if (this.paiddata.length > 10) {

              Swal.fire("", "Updated Successfully", "success");
              //this.onClearInterviews();
              //this.BindInterviewData();
              return;

            }

          })

    }

  }


}
