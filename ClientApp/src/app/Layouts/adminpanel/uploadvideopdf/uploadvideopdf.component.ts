import { Component, OnInit, Input, ElementRef, ViewChild, Pipe, PipeTransform } from '@angular/core';
import { Router, ActivatedRoute, Event } from '@angular/router';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';
import { HttpClient, HttpErrorResponse, HttpRequest, HttpHeaders } from '@angular/common/http';
import { LocalStorageService, LocalStorageModule } from 'angular-2-local-storage';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import Swal from 'sweetalert2';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-uploadvideopdf',
  templateUrl: './uploadvideopdf.component.html',
  //styleUrls: ['./webinar.component.css']
})
export class videopdfmanager implements OnInit {
  public selectedpage: number = 0;
  public videolink: string = "";
  public SelectedImage: string = "";
  public ButtonText: string = "Save";
  public GetSaveData: any = [];
  public pagedata: any = [];
  public pdffile: any = [];
  public pdftoupload: any;
  public orgpdfname: string = "";
  public vid_pdfid: number = 0;
  public UploadData: any = [];
  public pagedatadetail: any = [];
  public Details: any = [];
  public GetEditedData: any = [];
  public DeletedData: any = [];
  public languagedata: any = [];
  public selectedlanguage: number = 0;
  public languagedatadetail: any = [];




  @ViewChild('inputfile', { static: true }) private myInputVariabl: ElementRef;
  constructor(private http: HttpClient, private router: Router, private localstorage: LocalStorageService, private toaster: ToastrService, private loader: NgxUiLoaderService) {

  }
  ngOnInit() {
    this.getPage();
    this.Binddata();
    this.getLanguage();
  }
  //bind topic
  getPage() {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };

    var a;
    var tmpclass: any = [];
    this.http.get('api/uploadvideopdf/bindpage', options).subscribe(
      (data) => {
        debugger;
        this.pagedatadetail = data;
        if (this.pagedatadetail.Status == true) {
          this.pagedata = this.pagedatadetail.data;
        }
      }
    )
  }
  getLanguage() {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };

    var a;
    var tmpclass: any = [];
    this.http.get('api/uploadvideopdf/bindlanguage', options).subscribe(
      (data) => {
        debugger;
        this.languagedatadetail = data;
        if (this.languagedatadetail.Status == true) {
          this.languagedata = this.languagedatadetail.data;
        }
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


    if (file.type.includes("pdf") || file.type.includes("doc") || file.type.includes("docx")) {
      this.orgpdfname = file.name;
    }
    else {
      Swal.fire("", "Please Select File", "error");
      this.myInputVariabl.nativeElement.value = "";
    }
  }

  //save life coaches
  onSave() {


    debugger;
    if (this.ButtonText == "Save") {

      //validation start 

      if (this.selectedpage == 0 || this.selectedpage == undefined) {
        Swal.fire("", "Please Select Any Page", "error");
        return;
      }
      if (this.selectedlanguage == 0 || this.selectedlanguage == undefined) {
        Swal.fire("", "Please Select Any Language", "error");
        return;
      }



      if (this.videolink == "" || this.videolink == undefined) {
        Swal.fire("", "Please Enter Video Link", "error");
        return;
      }
      if (this.orgpdfname == "" || this.orgpdfname == undefined) {
        Swal.fire("", "Please Choose File", "error");
        return;
      }


      //validation end


      let input = new FormData();

      //input.append("video", this.videoToUpload);
      input.append("pdf", this.pdftoupload);
      input.append("vid_pdfid", this.vid_pdfid.toString());

      input.append("pageid", this.selectedpage.toString());
      input.append("orgpdfname", this.orgpdfname.toString());

      input.append("videolink", this.videolink);
      input.append("languageid", this.selectedlanguage.toString());

      input.append("createdby", this.localstorage.get("userid").toString());

      this.http.post('api/uploadvideopdf/saveportfoliodata', input)
        .subscribe(
          (data) => {
            debugger;
            this.UploadData = data;
            if (this.UploadData.Status == true) {
              if (this.UploadData.Message == "Video/PDF already exists") {
                Swal.fire("", "Video/PDF already exists", "error");

                return;
              }
              else {
                Swal.fire("", "Saved Successfully", "success");
                this.Binddata();
                this.onClear();
                return;
              }
            }


          })



    }
    else {
      debugger;
      if (this.selectedpage == 0 || this.selectedpage == undefined) {
        Swal.fire("", "Please Select Any Page", "error");
        return;
      }
      if (this.selectedlanguage == 0 || this.selectedlanguage == undefined) {
        Swal.fire("", "Please Select Any Language", "error");
        return;
      }


      if (this.videolink == "" || this.videolink == undefined) {
        Swal.fire("", "Please Enter Video Link", "error");
        return;
      }



      //validation end


      let input = new FormData();

      //input.append("video", this.videoToUpload);
      input.append("pdf", this.pdftoupload);
      input.append("vid_pdfid", this.vid_pdfid.toString());

      input.append("pageid", this.selectedpage.toString());
      input.append("orgpdfname", this.orgpdfname.toString());
      input.append("videolink", this.videolink);
      input.append("languageid", this.selectedlanguage.toString());

      input.append("createdby", this.localstorage.get("userid").toString());

      this.http.post('api/uploadvideopdf/updateportfoliodata', input)
        .subscribe(
          (data) => {
            this.UploadData = data;
            if (this.UploadData.Status == true) {
              if (this.UploadData.Message == "Video/PDF already exists") {
                Swal.fire("", "Video/PDF already exists", "error");

                return;
              }
              else {
                Swal.fire("", "Updated Successfully", "success");
                this.Binddata();
                this.onClear();
                return;
              }
            }

          })


    }



  }


  //bind table data
  Binddata() {
    debugger;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    this.Details = [];

    this.http.get('api/uploadvideopdf/Bindtabledata', options).subscribe(
      (data) => {
        debugger;
        this.Details = data;
        this.GetSaveData = this.Details.data;

      }
    )
  }

  onClear() {
    this.selectedpage = 0;
    this.selectedlanguage = 0;
    this.ButtonText = "Save";
    this.videolink = "";
    this.myInputVariabl.nativeElement.value = "";

  }
  //edit record
  EditData(i: number, vid_pdfid) {
    debugger;
    this.ButtonText = 'Update';
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };

    this.http.get('api/uploadvideopdf/GetEditData?vid_pdfid=' + vid_pdfid, options).subscribe(
      (data) => {
        debugger;
        this.GetEditedData = data;
        if (this.GetEditedData.Status == true) {
          this.getPage();
          this.selectedpage = this.GetEditedData.data.pageid;
          this.selectedlanguage = this.GetEditedData.data.languageid;
          this.videolink = this.GetEditedData.data.videolink;
          this.videolink = this.GetEditedData.data.videolink;
          this.vid_pdfid = this.GetEditedData.data.vid_pdfid;

        }
      }
    )
  }
  //delete record
  DeleteData(i: number, vid_pdfid) {
    debugger;
    var data;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };

    data =
    {
      "video_pdfid": vid_pdfid,
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
        this.http.post('api/uploadvideopdf/DeleteActivity', body, options).subscribe(
          (data) => {
            this.DeletedData = data;
            if (this.DeletedData.Status == true) {
              Swal.fire("", "Deleted Successfully", "success");
              this.Binddata();
              return;
            }
          }
        )
      }
    })

  }



}
