import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';
import { HttpClient, HttpErrorResponse, HttpRequest, HttpHeaders } from '@angular/common/http';
import { LocalStorageService, LocalStorageModule } from 'angular-2-local-storage';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-webinar',
  templateUrl: './webinar.component.html',
  //styleUrls: ['./webinar.component.css']
})

export class WebinarManager implements OnInit {

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
  public classgroup: number = 0;
  
  public showstream: number = 0;
  
  constructor(private http: HttpClient, private router: Router, private localstorage: LocalStorageService, private toaster: ToastrService, private loader: NgxUiLoaderService) {

  }

  ngOnInit() {
    //this.GetClass();
    //this.GetStream();
    this.GetSavedData();
  }
  //Get all data for bind dropdowns
  //GetClass() {
  //  let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //  let options = { headers: headers };


  //  this.http.get('api/Webinar/GetClass', options).subscribe(

  //    (data) => {
  //      debugger;
  //      this.Details = data;

  //      if (this.Details.status == true) {
  //        this.ClassData = this.Details.data;

         
          
  //        //this.GetStream();
         
          
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
          this.http.post('api/Webinar/deleteWebinar', body, options).subscribe(

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


  //  this.http.get('api/Webinar/getStream', options).subscribe(

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
  
  //  for (var i = 0; i < this.ClassData.length; i++) {
  //    if (this.ClassData[i].selected === true) {
  //      if (this.ClassData[i].classid == 1 || this.ClassData[i].classid == 2 || this.ClassData[i].classid == 3) {
  //        this.showstream = 0;
  //      }
  //      else {
  //        this.showstream = 1;
  //        this.GetStream();
  //      }
  //    }
  //    else {
  //      this.showstream = 0;
  //    }
      
  //  }



  //  if (this.ClassData.length === count) {
  //    this.AllClass = true;
  //    //this.showstream = 1;
  //    //this.GetStream();
  //  }
  //  else {
  //    this.AllClass = false;
  //    //this.showstream = 0;
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
    //if (this.classid == '')
    //{
    //  Swal.fire("", "Please select Class", "error");
    //  return;
    //}
    
  
    if (this.Topic == "" || this.Topic == undefined) {
      Swal.fire("", "Please enter your topic", "error");
      return;
    }
    var data
    if (this.ButtonText == "Update") {
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      let options = { headers: headers }
      debugger;
      data =
        {
        "acttype": "update",
        "classid": 0,
        "streamid": 0,
        "topic": this.Topic,
        "createdby": parseInt(this.localstorage.get("userid")),
        "ID": this.ID
        };

      let body = JSON.stringify(data);
      debugger;
      this.http.post('api/Webinar/UpdateWebinar', body, options).subscribe(

        (data) => {
          debugger;
          this.StreamDetails = data;
          if (this.StreamDetails.Status == true) {
            if (this.StreamDetails.Message == "Topic Already Exists") {
              Swal.fire("", "Topic Already Exists", "success");
              this.onClear();
              this.GetSavedData();
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

      data =
        {
          "acttype": "save",
        "classid": 0,
        "streamid": 0,
          "topic": this.Topic,
        "createdby": parseInt(this.localstorage.get("userid")),
          "ID":0
        };

      let body = JSON.stringify(data);

      this.http.post('api/Webinar/SaveWebinar', body, options).subscribe(

        (data) => {
          debugger;
          this.WebinarData = data;
          if (this.WebinarData.status == true) {
            if (this.WebinarData.Message == "Topic Already Exists") {
              Swal.fire("", "Topic Already Exists", "success");
              this.onClear();
              this.GetSavedData();
              return;
            }
            else {
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
    this.http.get('api/Webinar/GetSavedData', options).subscribe(

      (data) => {
        var a;
        var b;
        debugger;
        this.GetSaveData = data;
        //for (var i = 0; i < this.GetSaveData.length; i++) {
        //  var classname = "";
        //  var streamname = "";
        //  for (var j = 0; j < this.GetSaveData[i].Class.length; j++) {
        //    a = this.GetSaveData[i].Class.split(",");
        //    b = this.GetSaveData[i].Stream.split(",");
        //  }
        //  for (var k = 0; k < a.length; k++) {
        //    for (var l = 0; l < this.ClassData.length; l++) {
        //      if (a[k] == this.ClassData[l].classid) {
        //      if (k > 0) {
        //        classname = classname + ", " + this.ClassData[l].classname;
        //      }
        //      else {
        //        classname = classname + this.ClassData[l].classname;
        //      }
        //    }
        //    }
        //  }
        //  for (var k = 0; k < a.length; k++) {
        //    for (var l = 0; l < this.StreamData.length; l++) {
        //      if (b[k] == this.StreamData[l].streamid) {
        //        if (k > 0) {
        //          streamname = streamname + ", " + this.StreamData[l].streamname;
        //        }
        //        else {
        //          streamname = streamname + this.StreamData[l].streamname;
        //        }
        //      }
        //    }
        //  }
        //  this.GetSaveData[i].Class = classname;

        //  if (classname == "8th" || classname == "9th" || classname == "10th") {
        //    this.GetSaveData[i].Stream = "";
        //  }
        //  else {
        //    this.GetSaveData[i].Stream = streamname;
        //  }

          
        //}
        //for (var i = 0; i < a.length; i++) {
        //  for (var j = 0; j < this.ClassData.length; j++) {
        //    if (a[i] == this.ClassData[j].classid) {
        //      if (j>0) {
        //        classname = ","+ classname + this.ClassData[j].classname;
        //      }
        //      else {
        //        classname = classname + this.ClassData[j].classname;
        //      }
        //    }
        //  }
        //}
        //this.GetSaveData.Class = classname;
        this.HeaderData = Object.keys(this.GetSaveData[0]);
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
  //    this.showstream = 1;
  //  }
  //  else {
  //    for (var i = 0; i < this.ClassData.length; i++) {
  //      this.ClassData[i].selected = false;
  //    }
  //    this.showstream = 0;
  //  }

  //  //this.showstream = 1;
  //  //this.GetStream();

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
    //this.showstream = 0;
    this.ButtonText = 'Save';
      this.Topic = "";
    //  this.AllClass = false;
    //  this.AllStream = false;
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
    this.http.get('api/Webinar/EditWebinAr?ID=' + ID, options).subscribe(

      (data) => {
        debugger;
        this.EditSubsscriptionData = data;
        this.ID = this.EditSubsscriptionData.data.ID;
       // this.classid = this.EditSubsscriptionData.data.Classid;
        //this.streamid = this.EditSubsscriptionData.data.streamId;
        this.Topic = this.EditSubsscriptionData.data.Topic;

        //var tmpClassId = this.EditSubsscriptionData.data.Classid.split(",");
        //for (var i = 0; i < this.ClassData.length; i++) {
        //  for (var j = 0; j < tmpClassId.length; j++) {
        //    if (this.ClassData[i].classid == tmpClassId[j]) {
        //      this.ClassData[i].selected = true;
        //    }

        //  }
        //}
        //for (var i = 0; i < this.ClassData.length; i++) {
        //  if (this.ClassData[i].selected === true) {
        //    if (this.ClassData[i].classid == 1 || this.ClassData[i].classid == 2 || this.ClassData[i].classid == 3) {
        //      this.showstream = 0;
        //    }
        //    else {
        //      this.showstream = 1;
        //     // this.GetStream();
        //    }
        //  }
        //  else {
        //    this.showstream = 0;
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

        ////if (this.StreamData.length == tmpStreamid.length) {
        ////  this.AllStream = true;
        ////}
        ////else {
        ////  this.AllStream = false;
        ////}
        //if (tmpClassId.length == 6) {
        //  this.AllClass = true;
        //}
        //if (tmpStreamid.length == 6) {
        //  this.AllStream = true;
        //}


      }
    )
  }
}




