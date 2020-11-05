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
  selector: 'app-entranceexam',
  templateUrl: './entranceexam.component.html',
  //styleUrls: ['./plannedactivity.component.css']

  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }, NgbTimepickerConfig]
})
export class EntranceExamManager implements OnInit {
  StreamDetails: any = [];
  StreamData: any = [];
  public AllStream: boolean = false;
  streamid: string = "";
  ButtonText: string = "Save";
  public SelectedDate: Date;
  public s_date: any;
  exam: string = "";
  examid: number = 0;
  Examdata: any = [];
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
    this.GetStream();
    this.GetData();
  }
  GetStream() {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    this.http.get('api/EntranceExam/getStream', options).subscribe(

      (data) => {

        this.StreamDetails = data;

        if (this.StreamDetails.status == true) {
          this.StreamData = this.StreamDetails.data;     
        }
        else {
          this.toaster.error(this.StreamDetails.message.toString(), '', { easeTime: 1000, timeOut: 3000 })
        }
      }
    )
  }
  SelectAllStream() {
    debugger;
    this.streamid = "";
    if (this.AllStream === true) {
      for (var i = 0; i < this.StreamData.length; i++) {
        this.StreamData[i].selected = true;
        if (this.streamid === '') {
          this.streamid = this.StreamData[i].streamid;
        }
        else {
          this.streamid = this.streamid + ',' + this.StreamData[i].streamid;
        }
      }
    }
    else {
      for (var i = 0; i < this.StreamData.length; i++) {
        this.StreamData[i].selected = false;
      }
    }

  }
  getSelectedStream() {
    debugger;
    this.streamid = "";
    var count = 0;
    for (var i = 0; i < this.StreamData.length; i++) {

      if (this.StreamData[i].selected === true) {

        if (this.streamid === '') {
          this.streamid = this.StreamData[i].streamid;
          count++;
        }
        else {
          this.streamid = this.streamid + ',' + this.StreamData[i].streamid;
          count++;
        }
      }
    }
    if (this.StreamData.length === count) {
      this.AllStream = true;
    }
    else {
      this.AllStream = false;
    }
  }


  onSubmit() {
    debugger;
    if (this.ButtonText == "Save") {
      if (this.SelectedDate == null || this.SelectedDate == undefined) {
        Swal.fire("", "Please enter start date ", "error");
        return;
      }
      if (this.streamid == "" || this.streamid == undefined) {
        Swal.fire("", "Please select stream", "error");
        return;
      }
      if (this.exam == "" || this.exam == undefined) {
        Swal.fire("", "Please enter exam name", "error");
        return;
      }
     
      this.s_date = this.SelectedDate.toISOString().slice(0, 10);
    
      let input = new FormData();

      input.append("examid", this.examid.toString());
      input.append("startdate", this.s_date.toString());     
      input.append("streamid", this.streamid.toString());
      input.append("examname", this.exam.toString());
      input.append("createdby", this.localstorage.get("userid").toString());
      this.http.post('api/EntranceExam/SaveExam', input)
        .subscribe(
          (data) => {
            debugger;
            this.Examdata = data;
            if (this.Examdata.Status == true) {
              Swal.fire("", "Saved Successfully", "success");
              this.GetData();
              this.Reset();
              return;
            }
          })
    }
    else {
      debugger;
      if (this.SelectedDate == null || this.SelectedDate == undefined) {
        Swal.fire("", "Please enter start date ", "error");
        return;
      }
      if (this.streamid == "" || this.streamid == undefined) {
        Swal.fire("", "Please select stream", "error");
        return;
      }
      if (this.exam == "" || this.exam == undefined) {
        Swal.fire("", "Please enter exam name", "error");
        return;
      }

      this.s_date = this.SelectedDate.toISOString().slice(0, 10);
      let input = new FormData();

      input.append("examid", this.examid.toString());
      input.append("startdate", this.s_date.toString());

      input.append("streamid", this.streamid.toString());

      input.append("examname", this.exam.toString());
      input.append("createdby", this.localstorage.get("userid").toString());

      this.http.post('api/EntranceExam/UpdateExam', input)
        .subscribe(
          (data) => {
            this.Examdata = data;
            if (this.Examdata.Status ==true) {
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
    this.http.get('api/EntranceExam/GetSavedData', options).subscribe(
      (data) => {
        debugger;
        this.Detail = data;
        this.GetSaveData = this.Detail.data;
        var a;
        var b;
        debugger;
        for (var i = 0; i < this.GetSaveData.length; i++) {
          var classname = "";
          var streamname = "";
          for (var j = 0; j < this.GetSaveData[i].streamid.length; j++) {
            b = this.GetSaveData[i].streamid.split(",");
          }
          if (this.StreamData != undefined) {
            for (var k = 0; k < b.length; k++) {
              for (var l = 0; l < this.StreamData.length; l++) {
                if (b[k] == this.StreamData[l].streamid) {
                  if (k > 0) {
                    streamname = streamname + ", " + this.StreamData[l].streamname;
                  }
                  else {
                    streamname = streamname + this.StreamData[l].streamname;
                  }
                }
              }
            }
          }
          this.GetSaveData[i].Stream = streamname;
        }
      }
    )
  }

  EditData(i: number, Id) {
    this.GetStream();
    this.Reset();
    this.ButtonText = 'Update';
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };

    this.http.get('api/EntranceExam/GetEditData?examid=' + Id, options).subscribe(
      (data) => {
        debugger;
        this.GetEditedData = data;
        if (this.GetEditedData.Status == true) {
          this.streamid = this.GetEditedData.data.streamId;
          var tmpStreamid = this.GetEditedData.data.streamId.split(",");
          for (var i = 0; i < this.StreamData.length; i++) {
            for (var j = 0; j < tmpStreamid.length; j++) {
              if (this.StreamData[i].streamid == tmpStreamid[j]) {
                this.StreamData[i].selected = true;
              }
            }
          }
          if (this.StreamData.length == tmpStreamid.length) {
            this.AllStream = true;
          }
          else {
            this.AllStream = false;
          }
          var mdate = new Date(this.GetEditedData.data.startdate);
          this.examid = this.GetEditedData.data.examid;
          this.SelectedDate = mdate;
          this.exam = this.GetEditedData.data.examname;
          if (tmpStreamid.length == 6) {
            this.AllStream = true;
          }
        }
      }
    )
  }

  Reset() {
    this.SelectedDate = null;
    this.s_date = null;
    this.exam = "";
    for (var i = 0; i < this.StreamData.length; i++) {
      this.StreamData[i].selected = false;
    }
    this.AllStream = false;
    this.ButtonText = "Save";
    this.GetData();
  }

  DeleteData(i: number, Id) {
    var data;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };

    data =
    {
      "examid": Id
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
        this.http.post('api/EntranceExam/DeleteActivity', body, options).subscribe(
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
