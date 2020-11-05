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
import * as xlsx from 'xlsx';
declare var $: any;

@Component({
  selector: 'app-collegerepository',
  templateUrl: './collegerepository.component.html',
  //styleUrls: ['./plannedactivity.component.css']

  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }, NgbTimepickerConfig]
})
export class collegerepository implements OnInit {
  // public page: number = 0;
  //public pageSize: number = 10;
  public SelectedVideo:string="";
  public collegename: string = "";
  public imagefile: any = [];
  public Selectedcareer: number = 0;
  public CareerData: any = [];
  public careerdat: any = [];
  public Selecteduniversity: number = 0;
  public UniversityData: any = [];
  public universitydat: any = [];
  @ViewChild('inputFile', { static: true }) private myInputVariable: ElementRef;
  public description: string = "";
  public Detail: any = [];
  public ButtonText: string = 'Save';
  public HeaderData: any = [];
  public GetSaveData: any = [];
  public SelectedImage: string = "";
  public repositoryid: number = 0;
  public GetEditedData: any = [];
  public DeletedData: any = [];
  public collegerepositoryData: any = [];
  public orgImageName: string = "";
  public imageToUpload: any;
  public image: string = "";
  public display: any = "none";
  public Details: any = [];
  public checklink: boolean = false;
  public checklink_v: boolean = false;
  selectedlanguage: number = 0;
  languagedata: any = [];
  languagedatadetail: any = [];
  //public IsSchool: boolean = false;  SelectedImage: any = [];
  SelectedImage1: any = [];
  @ViewChild('fileInput', { static: true }) private myInputVariableprefile: ElementRef;
  excelfile: any = [];
  arrayBuffer: any = [];
  exceldata: any = [];
  GetData1: any = [];
  dw: string = "";


  constructor(private http: HttpClient, private router: Router, private localstorage: LocalStorageService, private toaster: ToastrService, private loader: NgxUiLoaderService, private renderer: Renderer2, config: NgbTimepickerConfig, private config1: NgbDatepickerConfig) {



  }
  ngOnInit() {
    this.BindCareer();
    this.Bindcollege();
    this.GetData();
    this.getLanguage();
    this.dw = "http://admin.careerprabhu.com/collegerepository.xlsx";
  }




  incomingfile(event) {

    this.excelfile = event.target.files[0];
    //if (!this.excelfile.type.includes(".sheet")) {
    //  this.toaster.warning("Please upload only Excel files.", '', { easeTime: 1000, timeOut: 3000 });
    //  var $el = $('#UploadedFile');
    //  $el.wrap('<form>').closest('form').get(0).reset();
    //  $el.unwrap();
    //  this.excelfile = null;
    //}
  }



  Uploadexcel() {
    debugger;
    if (this.excelfile != undefined || this.excelfile != null) {
      let fileReader = new FileReader();
      fileReader.onload = (e) => {
        this.arrayBuffer = fileReader.result;
        var data = new Uint8Array(this.arrayBuffer);
        var arr = new Array();
        for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
        var bstr = arr.join("");
        var workbook = xlsx.read(bstr, { type: "binary" });
        var first_sheet_name = workbook.SheetNames[0];
        var worksheet = workbook.Sheets[first_sheet_name];

        //console.log(xlsx.utils.sheet_to_json(worksheet, { raw: true }));
        //
        this.exceldata = xlsx.utils.sheet_to_json(worksheet, { raw: true });
        this.ValidateExcel(this.exceldata);
        //var $el = $('#UploadedFile');
        //$el.wrap('<form>').closest('form').get(0).reset();
        //$el.unwrap();
        //this.excelfile = null;
      }
      fileReader.readAsArrayBuffer(this.excelfile);
    }
    else {
      this.toaster.warning("Please choose an Excel file.");
    }

  }


  ValidateExcel(Data: any) {

    var Validate = true;
    var cols = ["college", "career", "language", "description", "videolink"];
    for (var i = 0; i < cols.length; i++) {
      //for (var j = 0; j < Data.length; j++) {
      //  if (Data[j][cols[i]] == undefined) {
      //    Swal.fire('Oops...', cols[i] + " is not available at  row number " + (j + 2), 'warning')
      //    var Validate = false;
      //    return;
      //  }
      //}
    }
    if (Validate == true) {
      debugger;
      let headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
      let options = { headers: headers }
      var data = {

        "schoolDatas": Data
      };
      let body = JSON.stringify(data);

      // this.Loader.start();
      this.http.post('api/collegerepository/Upload', body, options).subscribe(
        (data) => {
          // this.Loader.stop();
          debugger;
          this.GetData1 = data;
          if (this.GetData1.Status == true) {
            Swal.fire("", "Data Imported Succesfully", "success");

            //this.onClear();
            this.GetData();
            this.myInputVariableprefile.nativeElement.value = "";
            this.excelfile = [];
            return;

          }
          else {
            Swal.fire("", "Something Went Wrong", "success");
            // this.onClear();
            this.GetData();
            this.myInputVariableprefile.nativeElement.value = "";
            this.excelfile = [];
            return;
          }
        }
      );
    }
  }
















  getLanguage() {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };

    var a;
    var tmpclass: any = [];
    this.http.get('api/collegerepository/bindlanguage', options).subscribe(
      (data) => {
        debugger;
        this.languagedatadetail = data;
        if (this.languagedatadetail.Status == true) {
          this.languagedata = this.languagedatadetail.data;
        }
      }
    )
  }
  BindCareer() {
    debugger;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    this.careerdat = [];

    var tmpclass: any = [];
    this.http.post('api/collegerepository/BindCareer', options).subscribe(

      (data) => {
        this.careerdat = data;
        if (this.careerdat.Status == true) {
          this.CareerData = this.careerdat.data;
        }
        else {
          this.CareerData = this.careerdat.data;
        }
      }
    )
  }
  Bindcollege() {
    debugger;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    this.careerdat = [];

    var tmpclass: any = [];
    this.http.post('api/collegerepository/Bindcollege', options).subscribe(

      (data) => {
        this.universitydat = data;
        if (this.universitydat.Status == true) {
          this.UniversityData = this.universitydat.data;
        }
        else {
          this.UniversityData = this.universitydat.data;
        }
      }
    )
  }
  GetImageDetail(event) {
    debugger;
    this.imagefile = event
    let file = event.target.files[0];


    //let file = event.filesData[0];

    let fileList: FileList = event.target.files;

    //let fileList: FileList = file;
    //this.imageToUpload = file.rawFile;

    this.imageToUpload = fileList[0];

    if (file.type.includes("png") || file.type.includes("jpg") || file.type.includes("jpeg")) {
      //this.orgImageName = event.filesData[0].name;
      this.orgImageName = file.name;
    }
    else {
      Swal.fire("", "Please Select Image", "error");
      this.myInputVariable.nativeElement.value = "";

    }
  }
  onSubmit() {
    debugger;
    if (this.ButtonText == "Save") {
      if (this.Selecteduniversity == 0 || this.Selecteduniversity == undefined) {
        Swal.fire("", "Please enter collegename", "error");
        return;
      }
      //if (this.Selectedcollege.match(/[ˆ(\d|+|\-)]/)) {
      //  Swal.fire("", "Name should not contain digit", "error");
      //  return;
      //}
      if (this.Selectedcareer == 0 || this.Selectedcareer == undefined) {
        Swal.fire("", "Please select career type", "error");
        return;
      }

      if (this.selectedlanguage == 0 || this.selectedlanguage == undefined) {
        Swal.fire("", "Please select language", "error");
        return;
      }

      if (this.description == "" || this.description == undefined) {
        Swal.fire("", "Please enter description", "error");
        return;
      }
      if (this.orgImageName == "" || this.orgImageName == undefined) {
        this.orgImageName == ""
      }
      //if (this.selectedvideo == "" || this.selectedvideo == undefined) {
      //  Swal.fire("", "Please choose videolink", "error");
      //  return;
      //}
     


      let input = new FormData();
      input.append("image", this.imageToUpload);

      input.append("videourl", this.SelectedVideo);

      input.append("repositoryid", "0");
      input.append("collegename", this.Selecteduniversity.toString());
      input.append("languageid", this.selectedlanguage.toString());
      input.append("careerid", this.Selectedcareer.toString());
      input.append("description", this.description.toString());
      input.append("orgimagename", this.orgImageName.toString());


      


      input.append("createdby", this.localstorage.get("userid").toString());

      this.http.post('api/collegerepository/savecollegerepository', input)
        .subscribe(
          (data) => {
            debugger;
            this.collegerepositoryData = data;
            if (this.collegerepositoryData.Status == true) {
              if (this.collegerepositoryData.Message == "Video Already Exists For College") {
                Swal.fire("", "Video Already Exists For College", "success");
                this.GetData();


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
      if (this.Selecteduniversity == 0 || this.Selecteduniversity == undefined) {
        Swal.fire("", "Please enter collegename", "error");
        return;
      }
      //if (this.collegename.match(/[ˆ(\d|+|\-)]/)) {
      //  Swal.fire("", "Name should not contain digit", "error");
      //  return;
      //}
      if (this.Selectedcareer == 0 || this.Selectedcareer == undefined) {
        Swal.fire("", "Please select career type", "error");
        return;
      }

      if (this.selectedlanguage == 0 || this.selectedlanguage == undefined) {
        Swal.fire("", "Please select language", "error");
        return;
      }

      if (this.description == "" || this.description == undefined) {
        Swal.fire("", "Please enter description", "error");
        return;
      }
      if (this.orgImageName == "" || this.orgImageName == undefined) {
        this.orgImageName == "" 
      }
      //if (this.SelectedVideo == "" || this.SelectedVideo == undefined) {
      //  Swal.fire("", "Please choose videolink", "error");
      //  return;
      //}


      let input = new FormData();
      input.append("image", this.imageToUpload);


      input.append("repositoryid", this.repositoryid.toString());
      input.append("collegename", this.Selecteduniversity.toString());
      input.append("languageid", this.selectedlanguage.toString());
      input.append("careerid", this.Selectedcareer.toString());
      input.append("description", this.description.toString());
      input.append("orgimagename", this.orgImageName.toString());
      input.append("videourl", this.SelectedVideo);

      input.append("createdby", this.localstorage.get("userid").toString());



      this.http.post('api/collegerepository/updatecollegerepository', input)
        .subscribe(
          (data) => {
            debugger;
            this.collegerepositoryData = data;
            if (this.collegerepositoryData.Status ==true) {
              if (this.collegerepositoryData.Message == "Video Already Exists For College") {
                Swal.fire("", "Video Already Exists For College", "success");
                this.GetData();

             
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

    this.http.get('api/collegerepository/GetSavedData', options).subscribe(
      (data) => {
        debugger;
        this.Detail = data;
        this.GetSaveData = this.Detail.data;
        if (this.GetSaveData[0].Image == "") {
          this.checklink = true;
        }
        else {
          this.checklink = false;
        }

      }
    )
  }
  EditData(i: number, Id) {
   
    this.onClear();
    this.BindCareer();
    this.Bindcollege();
    this.getLanguage();
    this.ButtonText = 'Update';
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };

    this.http.get('api/collegerepository/GetEditData?repositoryid=' + Id, options).subscribe(
      (data) => {
        debugger;
        this.GetEditedData = data;
        if (this.GetEditedData.Status == true) {
          this.repositoryid = this.GetEditedData.data.repositoryid;
          this.Selecteduniversity = this.GetEditedData.data.collegename;
          this.selectedlanguage = this.GetEditedData.data.languageid;
          this.Selectedcareer = this.GetEditedData.data.careerid;
          this.description = this.GetEditedData.data.description;
          this.SelectedVideo = this.GetEditedData.data.videourl;



          

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
      "repositoryid": Id
    };

    let body = JSON.stringify(data);

    Swal.fire({
      
      text: 'Are you sure to delete this record?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.http.post('api/collegerepository/DeleteActivity', body, options).subscribe(
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
    debugger;
    this.Selecteduniversity = 0;
    this.ButtonText = 'Save';
    this.Selectedcareer = 0;
    this.SelectedVideo = "";
    this.SelectedImage = "";
    this.selectedlanguage = 0;
    this.orgImageName = "";
    this.description = "";
    this.myInputVariable.nativeElement.value = "";


  }
}


