import { Component, OnInit, Input, PipeTransform, Pipe, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';
import { HttpClient, HttpErrorResponse, HttpRequest, HttpHeaders } from '@angular/common/http';
import { LocalStorageService, LocalStorageModule } from 'angular-2-local-storage';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import Swal from 'sweetalert2';
import { SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-selfanalysis',
  templateUrl: './selfanalysis.component.html',
  //styleUrls: ['./webinar.component.css']
})
export class Selfanalysis implements OnInit {


  Selectedclass: number = 0;
  Selectedstream: number = 0;
  description: string = "";
  instruction: string = "";
  ClassData: any = [];
  StreamData: any = [];
  streamdata: any = [];
  classdata: any = [];
  ButtonText: string = "Save";
  analysisid: number = 0;
  SelfanalysisData: any = [];
  Detail: any = [];
  GetSaveData: any = [];
  GetEditedData: any = [];
  DeletedData: any = [];
  showstream: number = 0;


  constructor(private http: HttpClient, private router: Router, private localstorage: LocalStorageService, private toaster: ToastrService, private loader: NgxUiLoaderService) {

  }
  ngOnInit() {
    this.BindClass();
    this.BindStream();
    this.GetData();
    //this.GetSavedData();
  }
  //bind class
  BindClass() {
    debugger;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    this.classdata = [];

    var tmpclass: any = [];
    this.http.post('api/selfanalysis/Bindclass', options).subscribe(

      (data) => {
        this.classdata = data;
        if (this.classdata.Status == true) {
          this.ClassData = this.classdata.data;
        }
        else {
          this.ClassData = this.classdata.data;
        }

      }
    )
  }
  BindStreamOnChnageClass() {
    if (this.Selectedclass > 3) {
      this.BindStream();
      this.showstream = 1;
    }
    else {
      this.showstream = 0;
    }
  }
  //binds  stream code
  BindStream() {
    debugger;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    this.streamdata = [];

    var tmpclass: any = [];
    this.http.post('api/selfanalysis/BindStream', options).subscribe(

      (data) => {
        this.streamdata = data;
        if (this.streamdata.Status == true) {
          this.StreamData = this.streamdata.data;
        }
        else {
          this.StreamData = this.streamdata.data;
        }
      }
    )
  }
  onSubmit() {
    debugger;
    if (this.ButtonText == "Save") {




      if (this.Selectedclass == 0 || this.Selectedclass == undefined) {
        Swal.fire("", "Please select class", "error");
        return;
      }

      if (this.Selectedclass > 3) {
        if (this.Selectedstream == 0 || this.Selectedstream == undefined) {
          Swal.fire("", "Please select stream", "error");
          return;
        }

      }
      else {
        this.Selectedstream = 0;
      }




      if (this.description == "" || this.description == undefined) {
        Swal.fire("", "Please enter description", "error");
        return;
      }
      if (this.instruction == "" || this.instruction == undefined) {
        Swal.fire("", "Please enter instruction", "error");
        return;
      }


      let input = new FormData();

      input.append("analysisid", "0");

      input.append("classid", this.Selectedclass.toString());
      input.append("streamid", this.Selectedstream.toString());


      input.append("description", this.description.toString());
      input.append("instruction", this.instruction.toString());

      input.append("createdby", this.localstorage.get("userid").toString());

      this.http.post('api/selfanalysis/Saveselfanalysis', input)
        .subscribe(
          (data) => {
            debugger;
            this.SelfanalysisData = data;
            if (this.SelfanalysisData.Status == true) {
              if (this.SelfanalysisData.Message == "Exam instruction already assigned to the class") {
                Swal.fire("", "Exam instruction already assigned to the class", "error");

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


      if (this.Selectedclass == 0 || this.Selectedclass == undefined) {
        Swal.fire("", "Please select class", "error");
        return;
      }
      if (this.Selectedclass > 3) {
        if (this.Selectedstream == 0 || this.Selectedstream == undefined) {
          Swal.fire("", "Please select stream", "error");
          return;
        }

      }
      else {
        this.Selectedstream = 0;
      }

      if (this.description == "" || this.description == undefined) {
        Swal.fire("", "Please enter description", "error");
        return;
      }
      if (this.instruction == "" || this.instruction == undefined) {
        Swal.fire("", "Please enter instruction", "error");
        return;
      }

      let input = new FormData();

      input.append("analysisid", this.analysisid.toString());

      input.append("streamid", this.Selectedstream.toString());
      input.append("classid", this.Selectedclass.toString());


      input.append("description", this.description.toString());
      input.append("instruction", this.instruction.toString());

      input.append("createdby", this.localstorage.get("userid").toString());

      this.http.post('api/selfanalysis/UpdateAnalysis', input)
        .subscribe(
          (data) => {
            this.SelfanalysisData = data;
            if (this.SelfanalysisData.Status == true) {
              if (this.SelfanalysisData.Message == "Exam instruction already assigned to the class") {
                Swal.fire("", "Exam instruction already assigned to the class", "error");

                return;
              }
              else {
                Swal.fire("", "Updated Successfully", "success");
                this.GetData();
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

    this.http.get('api/selfanalysis/GetSavedData', options).subscribe(
      (data) => {
        debugger;
        this.Detail = data;
        this.GetSaveData = this.Detail.data;

      }
    )
  }
  EditData(i: number, Id) {
    this.onClear();
    this.BindClass();
    this.BindStream();
    this.ButtonText = 'Update';
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };

    this.http.get('api/selfanalysis/GetEditData?analysisid=' + Id, options).subscribe(
      (data) => {
        debugger;
        this.GetEditedData = data;
        if (this.GetEditedData.Status == true) {
          this.analysisid = this.GetEditedData.data.analysisid;
          this.Selectedclass = this.GetEditedData.data.classid;
          this.Selectedstream = this.GetEditedData.data.streamid;
          if (this.Selectedclass > 3) {
            this.showstream = 1;
            this.Selectedstream = this.GetEditedData.data.streamid;
          }
          else {
            this.showstream = 0;
          }

          this.description = this.GetEditedData.data.description;
          this.instruction = this.GetEditedData.data.instruction;






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
      "analysisid": Id
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
        this.http.post('api/selfanalysis/DeleteActivity', body, options).subscribe(
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
    this.Selectedclass = 0;
    this.Selectedstream = 0;
    this.showstream = 0;
    this.description = "";
    this.instruction = "";
    this.ButtonText = "Save";
    this.GetData();
  }


}
