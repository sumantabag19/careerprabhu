import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';
import { HttpClient, HttpErrorResponse, HttpRequest, HttpHeaders } from '@angular/common/http';
import { LocalStorageService, LocalStorageModule } from 'angular-2-local-storage';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-prepratorymaterial',
  templateUrl: './prepratorymaterial.component.html',
  //styleUrls: ['./webinar.component.css']
})

export class prepratorymaterialManager implements OnInit {

  public ClassData: any = [];
  public Details: any = {};
  public StreamDetails: any = {};
  public classid: string = "";
  public AllClass: boolean = false;
  public AllStream: boolean = false;
  public SelectedStream: any = [];
  public ButtonText: string = 'Save';
  public SelectedClass: any = [];
  public Topic: string = "";
  public StreamData: any = [];
  public streamid: string = "";
  public streamname: string = "";
  public WebinarData: any = [];
  public GetSaveData: any = [];
  public HeaderData: any = [];
  public EditSubsscriptionData: any = [];
  public ID: number = 0;
  public showstream: number = 0;
  @ViewChild('prevyearfile', { static: true }) private myInputVariableprefile: ElementRef;
  public pdffile: any = [];
  public pdftoupload: any;
  public orgpdfname: string = "";
  docname: string = "";
  getsampledata: any = [];
  Selectedfile: any = [];
  selectedlogo: string = "";
  LogoData: any = [];
  Detail: any = [];

  constructor(private http: HttpClient, private router: Router, private localstorage: LocalStorageService, private toaster: ToastrService, private loader: NgxUiLoaderService) {

  }

  ngOnInit() {
    //this.GetClass();
    //this.GetStream();
    this.GetSavedData();
    this.bindlogo();
  }

  bindlogo() {
    debugger;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
  
    let input = new FormData();



    

    this.http.get('api/prepratorymaterial/BindLogo').subscribe(
      (data) => {
        debugger;
        this.Detail = data;
        this.LogoData = this.Detail.data;

      }
    )
  }



  //get pdf details
  GetPdfDetail(event) {
    debugger;
    this.pdffile = event
    let file = event.target.files[0];
    let fileList: FileList = event.target.files;
    this.pdftoupload = fileList[0];
    if (file.type.includes("png") || file.type.includes("jpg") || file.type.includes("jpeg")) {

      this.orgpdfname = file.name;
    }
    else {
      Swal.fire("", "Please Select Logo", "error");
      this.myInputVariableprefile.nativeElement.value = "";

    }

  }






  //Get all data for bind dropdowns
  //GetClass() {
  //  let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //  let options = { headers: headers };


  //  this.http.get('api/prepratorymaterial/GetPrepClass', options).subscribe(

  //    (data) => {

  //      this.Details = data;

  //      if (this.Details.status == true) {
  //        this.ClassData = this.Details.data;
  //        this.GetStream();
  //      }
  //      else {
  //        this.toaster.error(this.Details.message.toString(), '', { easeTime: 1000, timeOut: 3000 })
  //      }
  //    }
  //  )
  //}

  //Delete Subscription Data
  DeleteData(i: number, id: number) {
    debugger;
    var data
    if (this.classid == null) { this.classid = ""; }
    if (this.streamid == null) { this.streamid = ""; }

    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers }
    debugger;
    data =
      {
        "acttype": "delete",
        "classid": "",
        "streamid": "",
        "topic": "",
        "createdby": parseInt(this.localstorage.get("userid")),
        "ID": id
      };

    let body = JSON.stringify(data);
    debugger;
    //this.http.post('api/Webinar/deleteWebinar', body, options).subscribe(

    //  (data) => {
    //    debugger;
    //    this.StreamDetails = data
    //    if (this.StreamDetails.Status == true) {
    //      this.GetSavedData();
    //      Swal.fire("", "Successfully deleted", "success");
    //      this.onClear();
    //      return;
    //    }
    //  }
    //)
    Swal.fire({
      //title: 'Confirmation',
      text: 'Are you sure to delete this record?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.http.post('api/prepratorymaterial/deletePrep', body, options).subscribe(

          (data) => {
            debugger;
            this.StreamDetails = data
            if (this.StreamDetails.Status == true) {
              this.GetSavedData();
              Swal.fire("", "Successfully deleted", "success");
              this.onClear();
              return;
            }
          }
        )
      }
    })
  }

  // Get Streams Data
  //GetStream() {
  //  let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //  let options = { headers: headers };


  //  this.http.get('api/prepratorymaterial/GetPrepStream', options).subscribe(

  //    (data) => {

  //      this.StreamDetails = data;

  //      if (this.StreamDetails.status == true) {
  //        this.StreamData = this.StreamDetails.data;
  //        this.GetSavedData();
  //      }
  //      else {
  //        this.toaster.error(this.StreamDetails.message.toString(), '', { easeTime: 1000, timeOut: 3000 })
  //      }
  //    }
  //  )
  //}
  //getSelectedClass() {
  //  debugger;
  //  this.classid = "";
  //  var count = 0;
  //  for (var i = 0; i < this.ClassData.length; i++) {

  //    if (this.ClassData[i].selected === true) {

  //      if (this.classid === '') {
  //        this.classid = this.ClassData[i].classid;
  //        count++;
  //      }
  //      else {
  //        this.classid = this.classid + ',' + this.ClassData[i].classid;
  //        count++;
  //      }
  //    }
  //  }






  //  if (this.ClassData.length === count) {
  //    this.AllClass = true;
  //  }
  //  else {
  //    this.AllClass = false;
  //  }

  //}
  //get stream
  //getSelectedStream() {
  //  debugger;
  //  this.streamid = "";
  //  var count = 0;
  //  for (var i = 0; i < this.StreamData.length; i++) {

  //    if (this.StreamData[i].selected === true) {

  //      if (this.streamid === '') {
  //        this.streamid = this.StreamData[i].streamid;
  //        count++;
  //      }
  //      else {
  //        this.streamid = this.streamid + ',' + this.StreamData[i].streamid;
  //        count++;
  //      }
  //    }
  //  }
  //  if (this.StreamData.length === count) {
  //    this.AllStream = true;
  //  }
  //  else {
  //    this.AllStream = false;
  //  }

  //}

  //On Save
  onSubmit() {
    debugger
    
    if (this.Topic == "" || this.Topic == undefined) {
      Swal.fire("", "Please enter catagory name", "error");
      return;
    }
    //if (this.orgpdfname == "" || this.orgpdfname == undefined) {
    //  this.orgpdfname = "";
    //}
    var data
    if (this.ButtonText == "Update") {
      debugger;
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      let options = { headers: headers }
      debugger;
     
      let input = new FormData();
      input.append("pdf", this.pdftoupload);
      input.append("acttype", "update");

      input.append("classid", "");
      input.append("logoid", "");

      input.append("streamid", "");
      input.append("topic", this.Topic.toString());
      input.append("orgpdfname", this.selectedlogo.toString());

      input.append("createdby", this.localstorage.get("userid").toString());
      input.append("ID", this.ID.toString());
      




      debugger;
      this.http.post('api/prepratorymaterial/UpdatePrepratory', input).subscribe(

        (data) => {
          debugger;
          this.StreamDetails = data;
          if (this.StreamDetails.Status == true) {
            if (this.StreamDetails.Message == "Category Already Exists") {
              this.GetSavedData();
              Swal.fire("", "Updated Successfully", "success");
              this.onClear();
              return;
            }
            else {
              this.GetSavedData();
              Swal.fire("", "Updated Successfully", "success");
              this.onClear();
              return;
            }
           
          }
        }
      )
    }
    else {
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      let options = { headers: headers }

      let input = new FormData();
      input.append("pdf", this.pdftoupload);
      input.append("acttype", "save");

      input.append("classid", "");

      input.append("streamid", "");
      input.append("topic", this.Topic.toString());
      input.append("orgpdfname", this.selectedlogo.toString());

      input.append("createdby", this.localstorage.get("userid").toString());
      input.append("ID", this.ID.toString());

      this.http.post('api/prepratorymaterial/SavePrepratory', input).subscribe(

        (data) => {
          this.WebinarData = data;
          if (this.WebinarData.status == true) {
            if (this.WebinarData.Message == "Category Already Exists") {
              this.GetSavedData();
              Swal.fire("", "Category Already Exists", "success");
             // this.onClear();
              return;
            } else {
              Swal.fire("", "Saved Successfully", "success");
              this.onClear();
              this.GetSavedData();
              return;
            }
           
          }
        }
      )
    }
  }
  //Get Saved Webinar data in table 
  GetSavedData() {
    debugger
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    this.http.get('api/prepratorymaterial/GetPrepSavedData', options).subscribe(

      (data) => {
        var a=0;
        var b;
        debugger;
        this.getsampledata = data;
        this.GetSaveData = this.getsampledata.data;

       
      
       
        this.HeaderData = Object.keys(this.GetSaveData);
      }
    )
  }

  //Select All function for class
  //SelectAllClass() {
  //  debugger;
  //  this.classid = "";
  //  if (this.AllClass === true) {
  //    for (var i = 0; i < this.ClassData.length; i++) {
  //      this.ClassData[i].selected = true;
  //      if (this.classid === '') {
  //        this.classid = this.ClassData[i].classid;
  //      }
  //      else {
  //        this.classid = this.classid + ',' + this.ClassData[i].classid;
  //      }
  //    }
  //  }
  //  else {
  //    for (var i = 0; i < this.ClassData.length; i++) {
  //      this.ClassData[i].selected = false;
  //    }
  //  }

  //}

  //Select All function for stream
  //SelectAllStream() {
  //  debugger;
  //  this.streamid = "";
  //  if (this.AllStream === true) {
  //    for (var i = 0; i < this.StreamData.length; i++) {
  //      this.StreamData[i].selected = true;
  //      if (this.streamid === '') {
  //        this.streamid = this.StreamData[i].streamid;
  //      }
  //      else {
  //        this.streamid = this.streamid + ',' + this.StreamData[i].streamid;
  //      }
  //    }
  //  }
  //  else {
  //    for (var i = 0; i < this.StreamData.length; i++) {
  //      this.StreamData[i].selected = false;
  //    }
  //  }

  //}
  onClear() {
    debugger;
    this.ButtonText = 'Save';
    this.Topic = "";
    this.orgpdfname = "";
    this.pdftoupload = [];
    this.orgpdfname = "";
    this.myInputVariableprefile.nativeElement.value = "";
    this.GetSavedData();
    this.selectedlogo = "";
    //for (var i = 0; i < this.ClassData.length; i++) {
    //  this.ClassData[i].selected = false;
    //}
    //for (var i = 0; i < this.StreamData.length; i++) {
    //  this.StreamData[i].selected = false;
    //}
  }
  //Edit Subscription Data 
  EditData(i: number, ID) {
    debugger;
    this.ButtonText = 'Update';
    var index = i;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    this.http.get('api/prepratorymaterial/EditPrepratory?ID=' + ID, options).subscribe(

      (data) => {
        debugger;
        this.EditSubsscriptionData = data;
        this.ID = this.EditSubsscriptionData.data.ID;
        //this.classid = this.EditSubsscriptionData.data.Classid;
        //this.streamid = this.EditSubsscriptionData.data.streamId;
        this.Topic = this.EditSubsscriptionData.data.Topic;
        this.selectedlogo = this.EditSubsscriptionData.data.selectedlogo;

        //var tmpClassId = this.EditSubsscriptionData.data.Classid.split(",");
        //for (var i = 0; i < this.ClassData.length; i++) {
        //  for (var j = 0; j < tmpClassId.length; j++) {
        //    if (this.ClassData[i].classid == tmpClassId[j]) {
        //      this.ClassData[i].selected = true;
        //    }
        //  }
        //}

        //var tmpStreamid = this.EditSubsscriptionData.data.streamId.split(",");
        //for (var i = 0; i < this.StreamData.length; i++) {
        //  for (var j = 0; j < tmpStreamid.length; j++) {
        //    if (this.StreamData[i].streamid == tmpStreamid[j]) {
        //      this.StreamData[i].selected = true;
        //    }
        //  }
        //}
      }
    )
  }
}




