import { Component, OnInit, Input, ElementRef, ViewChild, PipeTransform, Pipe } from '@angular/core';
import { Router, ActivatedRoute, Event } from '@angular/router';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';
import { HttpClient, HttpErrorResponse, HttpRequest, HttpHeaders } from '@angular/common/http';
import { LocalStorageService, LocalStorageModule } from 'angular-2-local-storage';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import Swal from 'sweetalert2';
import { SafeResourceUrl, SafeUrl, SafeScript, SafeStyle, SafeHtml, DomSanitizer } from '@angular/platform-browser';



//declare var $: any;


//@Pipe({
//  name: 'safe'
//})
//export class SafePipePortfolio implements PipeTransform {

//  constructor(protected sanitizer: DomSanitizer) { }

//  public transform(value: any, type: string): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
//    console.log(`Pipe Called!`);
//    switch (type) {
//      case 'html': return this.sanitizer.bypassSecurityTrustHtml(value);
//      case 'style': return this.sanitizer.bypassSecurityTrustStyle(value);
//      case 'script': return this.sanitizer.bypassSecurityTrustScript(value);
//      case 'url': return this.sanitizer.bypassSecurityTrustUrl(value);
//      case 'resourceUrl': return this.sanitizer.bypassSecurityTrustResourceUrl(value);
//      default: throw new Error(`Invalid safe type specified: ${type}`);
//    }
//  }
//}

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  //styleUrls: ['./webinar.component.css']
})
export class portfoliomanager implements OnInit {

  public intrestareadetail: any = [];
  public IntrestData: any = [];
  public SelectedIntrest: number = 0;
  public ButtonText: string = "Save";
  public pdffile: any = [];
  public pdftoupload: any;
  public orgpdfname: string = "";
  public intrestarea: string = "";
  public videolink: string = "";
  public portfolioid: number = 0;
  public portfoliodata: any = [];
  public Details: any = [];
  public GetSaveData: any = [];
  public GetEditedData: any = [];
  public DeletedData: any = [];
  public SelectedImage: any = [];
  public url: string = "";
    public yt: any;
    @ViewChild('inputfile', { static: true }) private myInputVariabl: ElementRef;

  constructor(private http: HttpClient, private router: Router, private localstorage: LocalStorageService, private toaster: ToastrService, private loader: NgxUiLoaderService) {

  }
  ngOnInit() {
    this.bindintrestarea();
    this.SelectedIntrest = 0;
    this.Binddata();
   
  }

  //bind intrest area

  bindintrestarea() {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    this.intrestareadetail = [];
    var a;
    var tmpclass: any = [];
    this.http.get('api/portfolio/bindintrestarea', options).subscribe(
      (data) => {
        this.intrestareadetail = data;
        if (this.intrestareadetail.Status == true) {
          this.IntrestData = this.intrestareadetail.data;
        }
      }
    )
  }

  //fet pdf details
  GetPdfDetail(event) {
    debugger;
    this.pdffile = event
      let file = event.target.files[0];


    //let file = event.filesData[0];
    let fileList: FileList = event.target.files;
    //let fileList: FileList = file;
      this.pdftoupload = fileList[0];


    if (file.type.includes("pdf")) {
        this.orgpdfname = file.name;
    }
    else {
        Swal.fire("", "Please select file", "error");
        this.myInputVariabl.nativeElement.value = "";
    }
  }



  //save portfolio
  onSave() {
    if (this.ButtonText == "Save") {

      if (this.SelectedIntrest == 0 || this.SelectedIntrest == undefined) {
        Swal.fire("", "Please select intrest area", "error");
        return;
      }
      if (this.intrestarea == "" || this.intrestarea == undefined) {
        Swal.fire("", "Please define intrest area", "error");
        return;
      }
      if (this.videolink == "" || this.videolink == undefined) {
        this.videolink == "";
      }

      if (this.orgpdfname == "" || this.orgpdfname == undefined) {
        this.orgpdfname == "";
      }


      let input = new FormData();


      input.append("pdf", this.pdftoupload);

      input.append("portfolioid", this.portfolioid.toString());

      input.append("repositoryid", this.SelectedIntrest.toString());
      input.append("intrestarea", this.intrestarea.toString());

      input.append("videolink", this.videolink.toString());
      input.append("orgpdfname", this.orgpdfname.toString());
      input.append("createdby", this.localstorage.get("userid").toString());



      this.http.post('api/portfolio/saveportfoliodata', input)
        .subscribe(
          (data) => {
            debugger;
            this.portfoliodata = data;
            if (this.portfoliodata.length > 10) {
              Swal.fire("", "Saved Successfully", "success");
              this.onClear();
              this.Binddata();
              return;
            }

          })


    }
    else {
      debugger;
      if (this.SelectedIntrest == 0 || this.SelectedIntrest == undefined) {
        Swal.fire("", "Please select intrest area", "error");
        return;
      }
      if (this.intrestarea == "" || this.intrestarea == undefined) {
        Swal.fire("", "Please define intrest area", "error");
        return;
      }
      if (this.videolink == "" || this.videolink == undefined) {
        this.videolink == "";
      }

      if (this.orgpdfname == "" || this.orgpdfname == undefined) {
        this.orgpdfname == "";
      }


      let input = new FormData();


      input.append("pdf", this.pdftoupload);

      input.append("portfolioid", this.portfolioid.toString());

      input.append("repositoryid", this.SelectedIntrest.toString());
      input.append("intrestarea", this.intrestarea.toString());

      input.append("videolink", this.videolink.toString());
      input.append("orgpdfname", this.orgpdfname.toString());
      input.append("createdby", this.localstorage.get("userid").toString());


      this.http.post('api/portfolio/updateportfoliodata', input)
        .subscribe(
          (data) => {
            debugger;
            this.portfoliodata = data;
            if (this.portfoliodata.length > 10) {
              Swal.fire("", "Updated Successfully", "success");
              this.onClear();
              this.Binddata();
              return;
            }

          })

    }

  }

  //edit record
  EditData(i: number, Id) {
    debugger;
    this.ButtonText = 'Update';
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };

    this.http.get('api/portfolio/GetEditData?portfolioid=' + Id, options).subscribe(
      (data) => {
        debugger;
        this.GetEditedData = data;
        if (this.GetEditedData.Status == true) {
          this.bindintrestarea();
          this.SelectedIntrest = this.GetEditedData.data.repositoryid;
          this.videolink = this.GetEditedData.data.videolink;
          this.intrestarea = this.GetEditedData.data.intrestarea;
          this.portfolioid = this.GetEditedData.data.portfolioid;

        }
      }
    )
  }



  //delete record
  DeleteData(i: number, Id) {
    var data;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };

    data =
      {
        "portfolioid": Id,

        "createdby": parseInt(this.localstorage.get("userid"))
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
        this.http.post('api/portfolio/DeleteActivity', body, options).subscribe(
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




  //reset field
  onClear() {
    this.SelectedIntrest = 0;
    this.intrestarea = "";
    this.videolink = "";
      this.ButtonText = "Save";
      this.Binddata();
      this.myInputVariabl.nativeElement.value = "";
   
  }

  //bind table data
  Binddata() {
    debugger;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    this.Details = [];

    this.http.get('api/portfolio/Bindtabledata', options).subscribe(
      (data) => {
        debugger;
        this.Details = data;
        this.GetSaveData = this.Details.data;

      }
    )
  }

  //handleButtonClick(link: string) {
  //  debugger;
  //  this.url = link;
  //  this.yt = '<iframe width="727" height="409" src="' + this.url + '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
  //}


}
