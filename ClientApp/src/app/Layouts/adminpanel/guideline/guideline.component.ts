import { Component, OnInit, Input, PipeTransform, Pipe } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';
import { HttpClient, HttpErrorResponse, HttpRequest, HttpHeaders } from '@angular/common/http';
import { LocalStorageService, LocalStorageModule } from 'angular-2-local-storage';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import Swal from 'sweetalert2';
import { SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-guideline',
  templateUrl: './guideline.component.html',
  //styleUrls: ['./webinar.component.css']
})
export class guideline implements OnInit {

  public selectedpage: number = 0;
  public pagedata: any = [];
  public pagedatadetail: any = [];

  public guideline: string = "";
  public ButtonText: string = "Save";
  public GetSaveData: any = [];
  Detail: any = [];
  guidelineData: any = [];
  regdid: number = 0;

  GetEditedData: any = [];
  DeletedData: any = [];

  constructor(private http: HttpClient, private router: Router, private localstorage: LocalStorageService, private toaster: ToastrService, private loader: NgxUiLoaderService) {

  }
  ngOnInit() {
    this.bindpage();
    this.GetData();
    
  }
  bindpage() {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };

    var a;
    var tmpclass: any = [];
    this.http.get('api/guideline/bindpage', options).subscribe(
      (data) => {
        debugger;
        this.pagedatadetail = data;
        if (this.pagedatadetail.Status == true) {
          this.pagedata = this.pagedatadetail.data;
        }
      }
    )
  }
  onSubmit() {
    debugger;
    if (this.ButtonText == "Save") {

      if (this.selectedpage == 0 || this.selectedpage == undefined) {
        Swal.fire("", "Please Select Any Page", "error");
        return;
      }


      if (this.guideline == "" || this.guideline == undefined) {
        Swal.fire("", "Please enter guideline", "error");
        return;
      }


      let input = new FormData();

      input.append("regdid", "0");
      //input.append("regdid", this.selectedpage.toString());
      input.append("pageid", this.selectedpage.toString());

      input.append("guideline", this.guideline.toString());

      input.append("createdby", this.localstorage.get("userid").toString());

      this.http.post('api/guideline/Saveguideline', input)
        .subscribe(
          (data) => {
            debugger;
            this.guidelineData = data;
            if (this.guidelineData.Status == true) {
              Swal.fire("", "Saved Successfully", "success");
              this.GetData();
              this.onClear();
              return;
            }

          })



    }
    else {
      debugger;
      if (this.selectedpage == 0 || this.selectedpage == undefined) {
        Swal.fire("", "Please Select Any Page", "error");
        return;
      }

      if (this.guideline == "" || this.guideline == undefined) {
        Swal.fire("", "Please enter guideline", "error");
        return;
      }


      let input = new FormData();

      input.append("regdid", this.regdid.toString());
      input.append("pageid", this.selectedpage.toString());

      input.append("guideline", this.guideline.toString());

      input.append("createdby", this.localstorage.get("userid").toString());

      this.http.post('api/guideline/Updateguideline', input)
        .subscribe(
          (data) => {
            this.guidelineData = data;
            if (this.guidelineData.Status == true) {
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

    this.http.get('api/guideline/GetSavedData', options).subscribe(
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

    this.http.get('api/guideline/GetEditData?regdid=' + Id, options).subscribe(
      (data) => {
        debugger;
        this.GetEditedData = data;
        if (this.GetEditedData.Status == true) {
          this.regdid = this.GetEditedData.data.regdid;
          this.selectedpage = this.GetEditedData.data.pageid;

          this.guideline = this.GetEditedData.data.guideline;






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
      "regdid": Id
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
        this.http.post('api/guideline/DeleteActivity', body, options).subscribe(
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
    
    this.selectedpage = 0;

    this.guideline = "";
    this.ButtonText = "Save";
    this.GetData();
  }


}
