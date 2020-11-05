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
  selector: 'app-principalregistration',
  templateUrl: './principalregistration.component.html',
  //styleUrls: ['./webinar.component.css']
})
export class PrincipalRegistration implements OnInit {
  Buttonsave: string = "Save";
  StateData: any = [];
  selectedstate: number = 0;
  SatatDetail: any = [];
  citdata: any = [];
  CityData: any = [];
  selectedschool: number = 0;
  selectedboard: number = 0;
  schdata: any = [];
  SchoolData: number = 0;
  boarddat: any = [];
  BoardData: number = 0;
  selectedcity: number = 0;
  principalname: string = "";
  mobileno: string = "";
  email: string = "";
  SelectedImage: any = [];
  @ViewChild('inputfile', { static: true }) private myInputVariabl: ElementRef;
  pdffile: any = [];
  pdftoupload: any = [];
  orgpdfname: string = "";
  principaldata: any = [];
  GetSaveData: any = [];
  Details: any = [];
  GetEditedData: any = [];
  EditPrincipalData: any = [];
  principalid: number = 0;
  showmobile: number = 1;
  showmail: number = 1;
  DeletedData: any = [];
  schooltype: number = 0;

  constructor(private http: HttpClient, private router: Router, private localstorage: LocalStorageService, private toaster: ToastrService, private loader: NgxUiLoaderService) {

  }
  ngOnInit() {

    this.BindState();
    this.BindTableData();
    this.BindBoard();
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
      Swal.fire("", "Please select photo", "error");
      this.myInputVariabl.nativeElement.value = "";
    }
  }

  BindState() {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
 
    var a;
    var tmpclass: any = [];
    this.http.get('api/principalregistration/BindState', options).subscribe(
      (data) => {
        this.SatatDetail = data;

        this.StateData = this.SatatDetail;

      }
    )
  }


  BindCIty() {
    debugger;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    
    var body = {
      "stateid": this.selectedstate

    }
    var tmpclass: any = [];
    this.http.post('api/principalregistration/BindCity', body, options).subscribe(

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

    var body = {
      "stateid": this.selectedstate,
      "cityid": this.selectedcity

    }
    var tmpclass: any = [];
    this.http.post('api/principalregistration/BindSchool', body, options).subscribe(

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
  BindBoard() {
    debugger;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    this.boarddat = [];

    var tmpclass: any = [];
    this.http.post('api/principalregistration/BindBoard', options).subscribe(

      (data) => {
        this.boarddat = data;
        if (this.boarddat.Status == true) {
          this.BoardData = this.boarddat.data;
        }
        else {
          this.BoardData = this.boarddat.data;
        }
      }
    )
  }

  
  Save() {
    debugger;
    if (this.Buttonsave == "Save") {
      if (this.principalname == "" || this.principalname == undefined) {
        Swal.fire("", "Please Enter principal name", "error");
        return;
      }
      if (this.principalname.match(/[ˆ(\d|+|\-)]/)) {
        Swal.fire("", "Name should not contain digit", "error");
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
      if (this.mobileno == "" || this.mobileno == undefined) {
        Swal.fire("", "Please enter mobile no", "error");
        return;
      }
      if (!this.mobileno.match(/^(\+\d{1,3}[- ]?)?\d{10}$/)) {
        Swal.fire("", "Please enter valid mobile no ", "error");
        return;
      }
      if (this.email == "" || this.email == undefined) {
        Swal.fire("", "Please enter email", "error");
        return;
      }
    
      if (this.orgpdfname == "" || this.orgpdfname == undefined) {
        Swal.fire("", "Please select photo", "error");
        return;
      }
   
      if (!this.email.match('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')) {
        Swal.fire("", "Please enter valid email", "error");
        return;
      }
      if (this.selectedboard == 0 || this.selectedboard == undefined) {
        this.selectedboard = 0;
      }
      if (this.schooltype == 0 || this.schooltype == undefined) {
        this.schooltype = 0;
      }

 


      let input = new FormData();
      input.append("photo", this.pdftoupload);

      input.append("orgphotoname", this.orgpdfname.toString());
      input.append("principalname", this.principalname.toString());

      input.append("stateid", this.selectedstate.toString());
      input.append("cityid", this.selectedcity.toString());
      input.append("schoolid", this.selectedschool.toString());
      input.append("email", this.email.toString());
      input.append("mobileno", this.mobileno.toString());
      input.append("boardid", this.selectedboard.toString());
      input.append("schooltype", this.schooltype.toString());
   

      input.append("createdby", this.localstorage.get("userid").toString());
      this.http.post('api/principalregistration/saveprincipaldata', input)
        .subscribe(
          (data) => {
            debugger;
            this.principaldata = data;
            if (this.principaldata.status == true) {
              Swal.fire("", "Saved Successfully", "success");
              this.BindTableData();
              this.Reset();
              return;
            }

          })

    }
    else {
      debugger;
      if (this.principalname == "" || this.principalname == undefined) {
        Swal.fire("", "Please principal name", "error");
        return;
      }
      if (this.principalname.match(/[ˆ(\d|+|\-)]/)) {
        Swal.fire("", "Name should not contain digit", "error");
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
      if (this.mobileno == "" || this.mobileno == undefined) {
        Swal.fire("", "Please enter mobile no", "error");
        return;
      }
      if (this.email == "" || this.email == undefined) {
        Swal.fire("", "Please enter email", "error");
        return;
      }

      

      if (!this.email.match('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')) {
        Swal.fire("", "Please enter valid email", "error");
        return;
      }

      if (!this.mobileno.match(/^(\+\d{1,3}[- ]?)?\d{10}$/)) {
        Swal.fire("", "Please enter valid mobile no ", "error");
        return;
      }
      if (this.selectedboard == 0 || this.selectedboard == undefined) {
        this.selectedboard = 0;
      }
      if (this.schooltype == 0 || this.schooltype == undefined) {
        this.schooltype = 0;
      }


      let input = new FormData();
      input.append("photo", this.pdftoupload);
      input.append("principalid", this.principalid.toString());
      input.append("orgphotoname", this.orgpdfname.toString());
      input.append("principalname", this.principalname.toString());
      input.append("stateid", this.selectedstate.toString());
      input.append("cityid", this.selectedcity.toString());
      input.append("schoolid", this.selectedschool.toString());
      input.append("email", this.email.toString());
      input.append("mobileno", this.mobileno.toString());

      input.append("boardid", this.selectedboard.toString());
      input.append("schooltype", this.schooltype.toString());


      this.http.post('api/principalregistration/updateprincipaldata', input)
        .subscribe(
          (data) => {
            debugger;
            this.principaldata = data;
            if (this.principaldata.status ==true) {

              Swal.fire("", "Updated Successfully", "success");
              this.BindTableData();
              this.Reset();
              return;

            }

          })

    }

  }
  Edit(i: number, Id) {
    debugger;
    this.showmail = 0;
    this.showmobile = 0;
    this.BindBoard();
    this.Buttonsave = 'Update';
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };

    this.http.get('api/principalregistration/GetEditData?principalid=' + Id, options).subscribe(
      (data) => {
        debugger;
        this.GetEditedData = data;
        if (this.GetEditedData.Status == true) {

          debugger;
          this.EditPrincipalData = data;


          this.principalid = this.EditPrincipalData.data.principalid;
          this.principalname = this.EditPrincipalData.data.principalname;
          this.BindState();
          this.selectedstate = this.EditPrincipalData.data.stateid;
          this.BindCIty();
          this.selectedcity = this.EditPrincipalData.data.cityid;
          this.BindSchool();
          this.selectedschool = this.EditPrincipalData.data.schoolid;
          

          this.mobileno = this.EditPrincipalData.data.mobileno;
          this.email = this.EditPrincipalData.data.email;

   
          this.selectedboard = this.EditPrincipalData.data.boardid;
          this.schooltype = this.EditPrincipalData.data.schooltype;


          
        }
      }
    )
  }


  Reset() {
    this.selectedcity = 0;
    this.selectedstate = 0;
    this.selectedschool = 0;
    this.principalname = "";
    this.principalid = 0;
    this.mobileno = "";
    this.email = "";
    this.pdftoupload = [];
    this.pdffile = [];
    this.orgpdfname = "";
    this.showmail = 1;
    this.showmobile = 1;
    this.myInputVariabl.nativeElement.value = "";
    this.BindTableData();
    this.selectedboard = 0;
    this.schooltype = 0;
    this.Buttonsave = "Save";
  }

  BindTableData() {
    debugger;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    this.Details = [];

    this.http.get('api/principalregistration/BindData', options).subscribe(
      (data) => {
        debugger;
        this.Details = data;
        this.GetSaveData = this.Details.data;

      }
    )
  }


  Delete(i: number, Id) {
    var data;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };

    data =
    {
      "principalid": Id
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
        this.http.post('api/principalregistration/DeleteActivity', body, options).subscribe(
          (data) => {
            this.DeletedData = data;
            if (this.DeletedData.Status == true) {
              Swal.fire("", "Deleted Successfully", "success");
              this.BindTableData();
              this.Reset();
              return;
            }
          }
        )
      }
    })

  }



}
