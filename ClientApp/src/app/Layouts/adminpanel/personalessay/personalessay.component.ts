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


//@Pipe({
//  name: 'safe'
//})
//export class SafePipePersonal implements PipeTransform {

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
  selector: 'app-personalessay',
  templateUrl: './personalessay.component.html',
  //styleUrls: ['./webinar.component.css']
})
export class personalessaymanager implements OnInit {
  public ButtonText: string = "Save";
  public subjectlist: any = [];
  public subjectdata: any = [];
  public selectedsubject: number = 0;
  public videofile: any = [];
  public imagefile: any = [];
  //public videoToUpload: any;
  public imageToUpload: any;
  public orgVideoName: string = "";
  public orgImageName: string = "";
  public personalessayid: number = 0;
  public personalessaydata: any = [];
  public ClassDetails: any = [];
  public ClassData: any = [];
  public SelectedClass: number = 0;
  public cid: number = 0;
  public Detail: any = [];
  public GetSaveData: any = [];
  public HeaderData: any = [];
  public GetEditedData: any = [];
  public DeletedData: any = [];
  public video: string = "";
  public pdf: string = "";
  public orgvideo: string = "";
  public orgpdf: string = "";
  public ClassName: string = "";
  public SubjectName: string = "";
  public SelectedImage: string = "";
  public SelectedVideo: string = "";
  public url: string = "";
    public yt: any;
    @ViewChild('inputfile', { static: true }) private myInputVariabl: ElementRef;

  constructor(private http: HttpClient, private router: Router, private localstorage: LocalStorageService, private toaster: ToastrService, private loader: NgxUiLoaderService) {

  }
  ngOnInit() {
    //this.Bindsubject();
    this.getClass();
    this.Binddata();
    this.SelectedClass = 0;
    this.selectedsubject = 0;
  }

  //get video detail

  //GetVideoDetail(event) {
  //  debugger;
  //  this.videofile = event;
  //  let file = event.target.files[0];
  //  let fileList: FileList = event.target.files;
  //  this.videoToUpload = fileList[0];
  //  if (file.type.includes("video")) {
  //    this.orgVideoName = file.name;
  //  }
  //  else {
  //    Swal.fire("", "Please select a video file", "error");
  //  }
  //}

  //get pdf detail
  GetPdfDetail(event) {
    debugger;
    this.imagefile = event
      let file = event.target.files[0];

    //let file = event.filesData[0];

    let fileList: FileList = event.target.files;
    //let fileList: FileList = file;
      this.imageToUpload = fileList[0];


    if (file.type.includes("pdf")) {
        this.orgImageName = file.name;
    }
    else {
        Swal.fire("", "Please Select File", "error");
        this.myInputVariabl.nativeElement.value = "";
    }
  }


  //bind class
  getClass() {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    this.ClassDetails = [];
    var a;
    var tmpclass: any = [];
    this.http.get('api/personalessay/bindclass', options).subscribe(
      (data) => {
        this.ClassDetails = data;
        if (this.ClassDetails.Status == true) {
          this.ClassData = this.ClassDetails.data;

          //this.SelectedClass = this.ClassDetails.data.class_id;
         

        }
      }
    )
  }

  //bind school
  Bindsubject() {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    var body = {
      "classid": this.SelectedClass
    }
    this.subjectlist = [];
   
    var tmpclass: any = [];
    this.http.post('api/personalessay/bindsubject', body, options).subscribe(
      (data) => {
        this.subjectlist = data;
        if (this.subjectlist.Status == true) {
          this.subjectdata = this.subjectlist.data;
        }
      }
    )
  }


  //save personal essay data

  onSave() {
    if (this.ButtonText == "Save") {

      if (this.SelectedClass == 0 || this.SelectedClass == undefined) {
        Swal.fire("", "Please select class", "error");
        return;
      }

      if (this.selectedsubject == 0 || this.selectedsubject == undefined) {
        Swal.fire("", "Please select subject", "error");
        return;
      }
      if (this.SelectedVideo == "" || this.SelectedVideo == undefined) {
        Swal.fire("", "Enter link", "error");
        return;
      }
      if (this.orgImageName == "" || this.orgImageName == undefined) {
        Swal.fire("", "Please choose any file", "error");
        return;
      }


      let input = new FormData();

      //input.append("video", this.videoToUpload);
      input.append("image", this.imageToUpload);

      input.append("personalessayid", this.personalessayid.toString());

      input.append("subjectid", this.selectedsubject.toString());
      input.append("classid", this.SelectedClass.toString());

      input.append("orgvideoname", this.SelectedVideo);
      input.append("orgimagename", this.orgImageName);
      input.append("createdby", this.localstorage.get("userid").toString());



      this.http.post('api/personalessay/savepersonalessay', input)
        .subscribe(
          (data) => {
            debugger;
            this.personalessaydata = data;
            if (this.personalessaydata.length > 10) {
              Swal.fire("", "Saved Successfully", "success");
              this.onClear();
              this.Binddata();
              return;
            }

          })


    }
    else {
      debugger;
      if (this.SelectedClass == 0 || this.SelectedClass == undefined) {
        Swal.fire("", "Please select class", "error");
        return;
      }

      if (this.selectedsubject == 0 || this.selectedsubject == undefined) {
        Swal.fire("", "Please select subject", "error");
        return;
      }
      if (this.SelectedVideo == "" || this.SelectedVideo == undefined) {
        Swal.fire("", "Enter link", "error");
        return;
      }
      //if (this.orgImageName == "" || this.orgImageName == undefined) {
      //  Swal.fire("", "Please Choose any pdf", "error");
      //  return;
      //}


      let input = new FormData();

      //input.append("video", this.videoToUpload);
      input.append("image", this.imageToUpload);

      input.append("personalessayid", this.personalessayid.toString());

      input.append("subjectid", this.selectedsubject.toString());
      input.append("classid", this.SelectedClass.toString());

      input.append("orgvideoname", this.SelectedVideo);
      input.append("orgimagename", this.orgImageName);
      input.append("createdby", this.localstorage.get("userid").toString());



      this.http.post('api/personalessay/updatepersonalessay', input)
        .subscribe(
          (data) => {
            debugger;
            this.personalessaydata = data;
            if (this.personalessaydata.length > 10) {
              Swal.fire("", "Updated Successfully", "success");
              this.onClear();
              this.Binddata();
              return;
            }

          })



    }
  }

  //reset all field
  onClear() {
    this.selectedsubject = 0;
    this.SelectedClass = 0;
    this.SelectedVideo = "";
    this.ButtonText = "Save";
    this.myInputVariabl.nativeElement.value = "";
  }

  //bind table data
  Binddata() {
    debugger;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    this.Detail = [];

    this.http.get('api/personalessay/Bindtabledata', options).subscribe(
      (data) => {
        debugger;
        this.Detail = data;
        this.GetSaveData = this.Detail.data;
        //this.HeaderData = Object.keys(this.GetSaveData[0]);




       


        //this.orgvideo = this.GetSaveData[0].orgVideo;
        //this.orgpdf = this.GetSaveData[0].orgpdf;

      }
    )
  }

  //edit record
  EditData(i: number, Id) {
    debugger;
    this.ButtonText = 'Update';
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };

    this.http.get('api/personalessay/GetEditData?personalessayid=' + Id, options).subscribe(
      (data) => {
        debugger;
        this.GetEditedData = data;
        if (this.GetEditedData.Status == true) {
          this.getClass();
          this.SelectedClass = this.GetEditedData.data.classid;
          this.Bindsubject();
          this.selectedsubject = this.GetEditedData.data.subjectid;

          this.personalessayid = this.GetEditedData.data.personalessayid;
          this.SelectedVideo = this.GetEditedData.data.VideoName;
       
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
        "personalessayid": Id,
        
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
        this.http.post('api/personalessay/DeleteActivity', body, options).subscribe(
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

  //handleButtonClick(link: string) {
  //  debugger;
  //  this.url = link;
  //  this.yt = '<iframe width="727" height="409" src="' + this.url + '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
  //}


}
