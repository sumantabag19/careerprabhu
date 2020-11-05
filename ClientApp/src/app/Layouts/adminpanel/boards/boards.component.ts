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
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  //styleUrls: ['./webinar.component.css']
})
export class boards implements OnInit {


  
  boardname: string = "";
  ButtonText: string = "Save";
  boardid: number = 0;
  BoardData: any = [];
  Detail: any = [];
  GetSaveData: any = [];
  GetEditedData: any = [];
  DeletedData: any = [];


  constructor(private http: HttpClient, private router: Router, private localstorage: LocalStorageService, private toaster: ToastrService, private loader: NgxUiLoaderService) {

  }
  ngOnInit() {
    
    this.GetData();
    //this.GetSavedData();
  }
  
  onSubmit() {
    debugger;
    if (this.ButtonText == "Save") {

      if (this.boardname == "" || this.boardname == undefined) {
        Swal.fire("", "Please enter board name", "error");
        return;
      }
      //if (this.boardname.match(/[ˆ(\d|+|\-)]/)) {
      //  Swal.fire("", "Name should not contain digit", "error");
      //  return;
      //}
     

      let input = new FormData();

      input.append("boardid", "0");

      
      input.append("boardname", this.boardname.toString());

      input.append("createdby", this.localstorage.get("userid").toString());

      this.http.post('api/boards/SaveBoards', input)
        .subscribe(
          (data) => {
            debugger;
            this.BoardData = data;
            if (this.BoardData.Status == true) {
              if (this.BoardData.Message == "Board already assigned") {
                Swal.fire("", "Board already assigned", "error");
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


      if (this.boardname == "" || this.boardname == undefined) {
        Swal.fire("", "Please enter board name", "error");
        return;
      }
      //if (this.boardname.match(/[ˆ(\d|+|\-)]/)) {
      //  Swal.fire("", "Name should not contain digit", "error");
      //  return;
      //}

      let input = new FormData();

      input.append("boardid", this.boardid.toString());


      input.append("boardname", this.boardname.toString());

      input.append("createdby", this.localstorage.get("userid").toString());
      this.http.post('api/boards/UpdateBoards', input)
        .subscribe(
          (data) => {
            this.BoardData = data;
            if (this.BoardData.Status == true) {
              if (this.BoardData.Message == "Board already assigned") {
                Swal.fire("", "Board already assigned", "error");
                this.onClear();

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

    this.http.get('api/boards/GetSavedData', options).subscribe(
      (data) => {
        debugger;
        this.Detail = data;
        this.GetSaveData = this.Detail.data;

      }
    )
  }
  EditData(i: number, Id) {
    this.onClear();
   
    this.ButtonText = 'Update';
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };

    this.http.get('api/boards/GetEditData?boardid=' + Id, options).subscribe(
      (data) => {
        debugger;
        this.GetEditedData = data;
        if (this.GetEditedData.Status == true) {
          this.boardid = this.GetEditedData.data.boardid;
          this.boardname = this.GetEditedData.data.boardname;






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
      "boardid": Id
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
        this.http.post('api/boards/DeleteActivity', body, options).subscribe(
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
    
    this.boardname = "";
    this.ButtonText = "Save";
    this.GetData();
  }


}
