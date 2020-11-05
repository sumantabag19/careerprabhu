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
  selector: 'app-lifecoachagenda',
  templateUrl: './lifecoachagenda.component.html',

})
export class lifecoachagenda implements OnInit {
  ButtonText: string = "Save";
  public TopicDetails: any = [];
  public TopicData: any = [];
  selectedtopic: number = 0;

  agenda: string;
  coachid: number = 0;
  lifecoachagendaData: any = [];
  Detail: any = [];
  GetSaveData: any = [];
  GetEditedData: any = [];
  DeletedData: any = [];






  constructor(private http: HttpClient, private router: Router, private localstorage: LocalStorageService, private toaster: ToastrService, private loader: NgxUiLoaderService, private renderer: Renderer2, config: NgbTimepickerConfig, private config1: NgbDatepickerConfig) {


  }
  ngOnInit() {
    this.getTopic();
    this.GetData();
  }
  getTopic() {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    this.TopicDetails = [];
    var a;
    var tmpclass: any = [];
    this.http.get('api/lifecoachagenda/BindTopic', options).subscribe(
      (data) => {
        this.TopicDetails = data;

        this.TopicData = this.TopicDetails;

      }
    )
  }






  onSubmit() {
    debugger;
    if (this.ButtonText == "Save") {


      if (this.selectedtopic == 0 || this.selectedtopic == undefined) {
        Swal.fire("", "Please select Coach Type ", "error");
        return;
      }
      if (this.agenda == "" || this.agenda == undefined) {
        Swal.fire("", "Please select Agenda", "error");
        return;
      }



      let input = new FormData();

      input.append("coachid", "0");
      input.append("coachtype", this.selectedtopic.toString());

      input.append("agenda", this.agenda.toString());


      input.append("createdby", this.localstorage.get("userid").toString());

      this.http.post('api/lifecoachagenda/Savelifecoachagenda', input)
        .subscribe(
          (data) => {
            debugger;
            this.lifecoachagendaData = data;
            if (this.lifecoachagendaData.Status == true) {
              if (this.lifecoachagendaData.Message == "Coach Details Already Exists") {

                Swal.fire("", "Coach Details Already Exists", "success");
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
      if (this.selectedtopic == 0 || this.selectedtopic == undefined) {
        Swal.fire("", "Please select Coach Type ", "error");
        return;
      }
      if (this.agenda == "" || this.agenda == undefined) {
        Swal.fire("", "Please select Agenda", "error");
        return;
      }
      let input = new FormData();


      input.append("coachid", this.coachid.toString());

      input.append("coachtype", this.selectedtopic.toString());

      input.append("agenda", this.agenda.toString());


      input.append("createdby", this.localstorage.get("userid").toString());

      this.http.post('api/lifecoachagenda/Updatelifecoachagenda', input)
        .subscribe(
          (data) => {
            debugger;
            this.lifecoachagendaData = data;
            if (this.lifecoachagendaData.Status == true) {
              if (this.lifecoachagendaData.Message == "Coach Details Already Exists") {

                Swal.fire("", "Coach Details Already Exists", "success");
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
    this.agenda = "";
    this.selectedtopic = 0;

    this.ButtonText = "Save";
  }
  GetData() {
    debugger;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    this.Detail = [];

    this.http.get('api/lifecoachagenda/GetSavedData', options).subscribe(
      (data) => {
        debugger;
        this.Detail = data;
        this.GetSaveData = this.Detail.data;


      }
    )
  }
  EditData(i: number, Id) {

    this.getTopic();
    //this.BindCoupon();
    this.ButtonText = 'Update';
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };

    this.http.get('api/lifecoachagenda/GetEditData?coachid=' + Id, options).subscribe(
      (data) => {
        debugger;
        this.GetEditedData = data;
        if (this.GetEditedData.Status == true) {
          this.getTopic();
          this.selectedtopic = this.GetEditedData.data.coachtype;


          this.agenda = this.GetEditedData.data.agenda;

          this.coachid = this.GetEditedData.data.coachid;


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
      "coachid": Id
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
        this.http.post('api/lifecoachagenda/DeleteActivity', body, options).subscribe(
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
