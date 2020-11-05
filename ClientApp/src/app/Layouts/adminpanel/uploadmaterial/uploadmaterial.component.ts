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
  selector: 'app-uploadmaterial',
  templateUrl: './uploadmaterial.component.html',
  //styleUrls: ['./uploadmaterial.component.css'],
})
export class uploadmaterialmanager implements OnInit {
  public ButtonText: string = "Save";
  public selectedprepcatagory: number = 0;
  public selectedtitle: number = 0;
  public prepdetails: any = [];
  public PrepData: any = [];
  public title: any = [];
  public TitleData: any = [];
  public pdffile: any = [];
  public pdftoupload: any;
  public orgpdfname: string = "";
  public imagefile: any = [];
  public imagetoupload: any;
  public orgimagename: string = "";
  public pname: string = "";
  public ptext: string = "";
  public purl: string = "";
  public prevyearid: number = 0;
  public prevyeardata: any = [];
  public Details: any = [];
  public GetSaveData: any = [];
  public GetPrevyearEditedData: any = [];
  public DeleteprevdData: any = [];



  public Selectedfile: any = [];
  public SelectedImage: any = [];
  public Selectedsamplefile: any = [];
  public SelectedsampleImage: any = [];


  public Selectedadhocfile: any = [];
  public SelectedadhocImage: any = [];

  //sample paper variable
  public ButtonSampleText: string = "Save";
  public samplepdffile: any = [];
  public samplepdftoupload: any;
  public sampleorgpdfname: string = "";
  public sampleimagefile: any = [];
  public sampleimagetoupload: any;
  public sampleorgimagename: string = "";
  public sname: string = "";
  public stext: string = "";
  public surl: string = "";
  public sampleid: number = 0;
  public SampleDetails: any = [];
  public GetSavesampleData: any = [];
  public GetSampleEditedData: any = [];
  public DeletesampledData: any = [];
  public sampledata: any = [];

  //Mock test variable
  public ButtonMockText: string = "Save";
  public mockdata: any = [];
  public mname: string = "";
  public mtext: string = "";
  public murl: string = "";
  public mockid: number = 0;
  public MockDetails: any = [];
  public GetSavemockData: any = [];
  public GetMockEditedData: any = [];
  public DeletemockData: any = [];

  //Adhoc Material variable
  public ButtonAdhocText: string = "Save";
  public adhocdata: any = [];
  public aname: string = "";
  public atext: string = "";
  public aurl: string = "";
  public adhocid: number = 0;
  public AdhocDetails: any = [];
  public GetSaveadhocData: any = [];
  public GetadhocEditedData: any = [];
  public DeleteadhocData: any = [];

  //prepratory material variable
  public ButtonResourceText: string = "Save";
  public resourcedata: any = [];
  public rname: string = "";
  public rtext: string = "";
  public rurl: string = "";
  public author: string = "";
  public publish: string = "";
  public description: string = "";
  public resourceid: number = 0;
  public ResourceDetails: any = [];
  public GetSaveresourceData: any = [];
  public GetresourceEditedData: any = [];
  public DeleteresourceData: any = [];

  //online free variable
  public ButtonFreeText: string = "Save";
  public fname: string = "";
  public ftext: string = "";
  public furl: string = "";
  public freedata: any = [];
  public fdescription: string = "";
  public freeid: number = 0;
  public FreeDetails: any = [];
  public GetSavefreeData: any = [];
  public GetfreeEditedData: any = [];
  public DeletefreeData: any = [];


  //variable for paid link
  
  public ButtonpaidText: string = "Save";
  public paidname: string = "";
  public paidtext: string = "";
  public paidurl: string = "";
  public paiddata: any = [];
  public paiddescription: string = "";
  public paidid: number = 0;
  public PaidDetails: any = [];
  public GetSavepaidData: any = [];
  public GetpaidEditedData: any = [];
  public DeletepaidData: any = [];
  public subjectList: any = [];
  public attachmentfile: any = [];
  public subjectid: number = 0;
  public sectionid: number = 0;
  //public url: string = "";
  //public yt: any;

    @ViewChild('prevyearfile', { static: true }) private myInputVariableprefile: ElementRef;
    @ViewChild('prevyearimage', { static: true }) private myInputVariablepreimage: ElementRef;

    @ViewChild('inputsamplefile', { static: true }) private myInputVariablesamplefile: ElementRef;
  @ViewChild('inputsampleimage', { static: true }) private myInputVariablesampleimage: ElementRef;


  @ViewChild('inputadhocfile', { static: true }) private myInputVariableadhocfile: ElementRef;
  @ViewChild('inputadhocimage', { static: true }) private myInputVariableadhocimage: ElementRef;
  search: string = "";
  search1: string = "";
  search2: string = "";
  search3: string = "";
  search4: string = "";
  search5: string = "";
  search6: string = "";
  prevyearrecord: number = 0;
  samplerecord: number = 0;
  Mockrecord: number = 0;
  adhocrecord: number = 0;
  resourcerecord: number = 0;
  freerecord: number = 0;
  paidrecord: number = 0;

  

  constructor(private http: HttpClient, private router: Router, private localstorage: LocalStorageService, private toaster: ToastrService, private loader: NgxUiLoaderService) {

  }
  ngOnInit() {
    this.bindprepcategory();
    this.Bindprevyeardata();
    this.Bindsampledata();
    this.Bindmockdata();
    this.Bindadhocdata();
    this.Bindresourcedata();
    this.Bindfreedata();
    this.Bindpaiddata();
    this.Bindprevyeardata();
  }


  GetAdhocPdfDetail(event) {
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
      this.myInputVariableadhocfile.nativeElement.value = "";

    }

  }

  //get image details
  GetAdhocImageDetail(event) {
    debugger;
    this.imagefile = event
    let file = event.target.files[0];
    let fileList: FileList = event.target.files;
    //let fileList: FileList = file;
    this.imagetoupload = fileList[0];


    if (file.type.includes("png") || file.type.includes("jpg") || file.type.includes("jpeg")) {
      this.orgimagename = file.name;
    }
    else {
      Swal.fire("", "Please Select Image", "error");
      this.myInputVariableadhocimage.nativeElement.value = "";
    }
  }



  //bind prepratory ategory
  bindprepcategory() {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    this.prepdetails = [];
    var a;
    var tmpclass: any = [];
    this.http.get('api/uploadprevyearmaterial/bindprepcategory', options).subscribe(
      (data) => {
        this.prepdetails = data;
        if (this.prepdetails.Status == true) {
          this.PrepData = this.prepdetails.data;
        }
      }
    )
  }
  //bind title
  Bindtitle() {
    debugger;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    this.title = [];
    var body = {
      "prepid": this.selectedprepcatagory
    }
    var tmpclass: any = [];
    this.http.post('api/uploadprevyearmaterial/bindtitle', body, options).subscribe(
    
      (data) => {
        this.title = data;
        if (this.title.Status == true) {
          this.TitleData = this.title.data;
        }
        else {
          this.TitleData = this.title.data;
        }
      }
    )
    }

    //bind all table

    BindAllTable() {
        debugger;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        let options = { headers: headers };
        this.title = [];
        var body = {
            "prepid": this.selectedprepcatagory,
            "prepnameid":this.selectedtitle
        }
        var tmpclass: any = [];
        this.http.post('api/uploadprevyearmaterial/BindAllTableData', body, options).subscribe(

            (data) => {
                debugger;
                this.Details = data;
            this.GetSaveData = this.Details.data1;
            this.prevyearrecord = this.GetSaveData.length;

                //this.SampleDetails = data;
            this.GetSavesampleData = this.Details.data2;
            this.samplerecord = this.GetSavesampleData.length;

               // this.MockDetails = data;
            this.GetSavemockData = this.Details.data3;
            this.Mockrecord = this.GetSavemockData.length;

                //this.AdhocDetails = data;
            this.GetSaveadhocData = this.Details.data4;
            this.adhocrecord = this.GetSaveadhocData.length;

               // this.ResourceDetails = data;
                this.GetSaveresourceData = this.Details.data5;

                //this.FreeDetails = data;
            this.GetSavefreeData = this.Details.data6;
            this.freerecord = this.GetSavefreeData.length;

                //this.PaidDetails = data;
            this.GetSavepaidData = this.Details.data7;
            this.paidrecord = this.GetSavepaidData.length;
              
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
          this.myInputVariableprefile.nativeElement.value = "";
   
    }
   
  }

  //get image details
  GetImageDetail(event) {
    debugger;
    this.imagefile = event
      let file = event.target.files[0];
    let fileList: FileList = event.target.files;
    //let fileList: FileList = file;
      this.imagetoupload = fileList[0];


    if (file.type.includes("png") || file.type.includes("jpg") || file.type.includes("jpeg")) {
        this.orgimagename = file.name;
    }
    else {
        Swal.fire("", "Please Select Image", "error");
        this.myInputVariablepreimage.nativeElement.value = "";
    }
  }


  //save previous year data
  PreviousYearSave() {
    if (this.ButtonText == "Save") {
      if (this.selectedprepcatagory == 0 || this.selectedprepcatagory == undefined) {
        Swal.fire("", "Please select category", "error");
        return;
      }
      if (this.selectedtitle == 0 || this.selectedtitle == undefined) {
        Swal.fire("", "Please select title", "error");
        return;
      }
      if (this.pname == "" || this.pname == undefined) {
        Swal.fire("", "Please define name", "error");
        return;
      }
      if (this.ptext == "" || this.ptext == undefined) {
        Swal.fire("", "Please entrt display text", "error");
        return;
      }
      if (this.purl == "" || this.purl == undefined) {
        this.purl == "";
      }

      if (this.orgpdfname == "" || this.orgpdfname == undefined) {
        Swal.fire("", "Please choose any pdf", "error");
        return;
      }
      if (this.orgimagename == "" || this.orgimagename == undefined) {
        Swal.fire("", "Please choose any image", "error");
        return;
      }

      let input = new FormData();


      input.append("pdf", this.pdftoupload);
      input.append("image", this.imagetoupload);

      input.append("prevyearid", this.prevyearid.toString());

      input.append("prepid", this.selectedprepcatagory.toString());
      input.append("prepnameid", this.selectedtitle.toString());

      input.append("pname", this.pname.toString());
      input.append("ptext", this.ptext.toString());
      input.append("purl", this.purl.toString());

      
      input.append("orgpdfname", this.orgpdfname.toString());
      input.append("orgimagename", this.orgimagename.toString());
      input.append("createdby", this.localstorage.get("userid").toString());

      this.http.post('api/uploadprevyearmaterial/savepreviousyeardata', input)
        .subscribe(
          (data) => {
            debugger;
            this.prevyeardata = data;
            if (this.prevyeardata.length > 10) {
              Swal.fire("", "Saved Successfully", "success");
              this.onClearPreviousYear();
              this.Bindprevyeardata();
              return;
            }

          })


    }
    else {

      if (this.selectedprepcatagory == 0 || this.selectedprepcatagory == undefined) {
        Swal.fire("", "Please select category", "error");
        return;
      }
      if (this.selectedtitle == 0 || this.selectedtitle == undefined) {
        Swal.fire("", "Please select title", "error");
        return;
      }
      if (this.pname == "" || this.pname == undefined) {
        Swal.fire("", "Please define name", "error");
        return;
      }
      if (this.ptext == "" || this.ptext == undefined) {
        Swal.fire("", "Please entrt display text", "error");
        return;
      }
      if (this.purl == "" || this.purl == undefined) {
        this.purl == "";
      }

     

      let input = new FormData();


      input.append("pdf", this.pdftoupload);
      input.append("image", this.imagetoupload);

      input.append("prevyearid", this.prevyearid.toString());

      input.append("prepid", this.selectedprepcatagory.toString());
      input.append("prepnameid", this.selectedtitle.toString());

      input.append("pname", this.pname.toString());
      input.append("ptext", this.ptext.toString());
      input.append("purl", this.purl.toString());


      input.append("orgpdfname", this.orgpdfname.toString());
      input.append("orgimagename", this.orgimagename.toString());
      input.append("createdby", this.localstorage.get("userid").toString());

      this.http.post('api/uploadprevyearmaterial/updatepreviousyeardata', input)
        .subscribe(
          (data) => {
            debugger;
            this.prevyeardata = data;
            if (this.prevyeardata.length > 10) {
              Swal.fire("", "Updated Successfully", "success");
              this.onClearPreviousYear();
              this.Bindprevyeardata();
              return;
            }

          })



    }
  }
  onClearPreviousYear() {
    this.selectedprepcatagory = 0;
    this.selectedtitle = 0;
    this.pname = "";
    this.ptext = "";
    this.purl = "";
    this.orgpdfname = "";
    this.orgimagename = "";
    this.pdftoupload = [];
    this.imagetoupload = [];
    this.orgpdfname = "";
    this.orgimagename = "";
      this.ButtonText = "Save";
      this.myInputVariableprefile.nativeElement.value = "";
    this.myInputVariablepreimage.nativeElement.value = "";
    this.Bindprevyeardata();

  }

  //bind table data
  Bindprevyeardata() {
    debugger;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    this.Details = [];

    this.http.get('api/uploadprevyearmaterial/Bindtabledata', options).subscribe(
      (data) => {
        debugger;
        this.Details = data;
        this.GetSaveData = this.Details.data;
        this.prevyearrecord = this.GetSaveData.length;

      }
    )
  }
  //edit record
  EditPData(i: number, Id) {
    debugger;
    this.ButtonText = 'Update';
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };

    this.http.get('api/uploadprevyearmaterial/GetEditprevyearData?prevyearid=' + Id, options).subscribe(
      (data) => {
        debugger;
        this.GetPrevyearEditedData = data;
        if (this.GetPrevyearEditedData.Status == true) {
          this.bindprepcategory();
          this.selectedprepcatagory = this.GetPrevyearEditedData.data.prepid;
          this.Bindtitle();
          this.selectedtitle = this.GetPrevyearEditedData.data.prepnameid;
          this.pname = this.GetPrevyearEditedData.data.pname;
          this.ptext = this.GetPrevyearEditedData.data.ptext;
          this.purl = this.GetPrevyearEditedData.data.purl;
          this.prevyearid = this.GetPrevyearEditedData.data.prevyearid;
         

        }
      }
    )
  }
  //delete record
  DeletePData(i: number, Id) {
    var data;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };

    data =
      {
        "prevyearid": Id
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
        this.http.post('api/uploadprevyearmaterial/Deleteprevyeardata', body, options).subscribe(
          (data) => {
            this.DeleteprevdData = data;
            if (this.DeleteprevdData.Status == true) {
              Swal.fire("", "Deleted Successfully", "success");
              this.Bindprevyeardata();
              return;
            }
          }
        )
      }
    })


  }


  //sample paper code start here

  //get pdf details
  GetSummerPdfDetail(event) {
    debugger;
    this.samplepdffile = event
      let file = event.target.files[0];

    let fileList: FileList = event.target.files;

      this.samplepdftoupload = fileList[0];
    if (file.type.includes("pdf") || file.type.includes("doc") || file.type.includes("docx")) {
        this.sampleorgpdfname = file.name;
    }
    else {
        Swal.fire("", "Please Select File", "error");
        this.myInputVariablesamplefile.nativeElement.value = "";
        
    }
  }

  //get image details
  GetSummerImageDetail(event) {
    debugger;
    this.sampleimagefile = event
    let file = event.target.files[0];
    let fileList: FileList = event.target.files;
      this.sampleimagetoupload = fileList[0];
    if (file.type.includes("png") || file.type.includes("jpg") || file.type.includes("jpeg")) {
        this.sampleorgimagename = file.name;
    }
    else {
        Swal.fire("", "Please select image", "error");
      
        this.myInputVariablesampleimage.nativeElement.value = "";
    }
  }

  //save previous year data
  SampleSave() {
    if (this.ButtonSampleText == "Save") {
      if (this.selectedprepcatagory == 0 || this.selectedprepcatagory == undefined) {
        Swal.fire("", "Please select category", "error");
        return;
      }
      if (this.selectedtitle == 0 || this.selectedtitle == undefined) {
        Swal.fire("", "Please select title", "error");
        return;
      }
      if (this.sname == "" || this.sname == undefined) {
        Swal.fire("", "Please define name", "error");
        return;
      }
      if (this.stext == "" || this.stext == undefined) {
        Swal.fire("", "Please entrt display text", "error");
        return;
      }
      if (this.surl == "" || this.surl == undefined) {
        this.surl == "";
      }

      if (this.sampleorgpdfname == "" || this.sampleorgpdfname == undefined) {
        this.sampleorgpdfname == ""
      }
      if (this.sampleorgimagename == "" || this.sampleorgimagename == undefined) {
        this.sampleorgimagename == ""
      }

      let input = new FormData();


      input.append("pdf", this.samplepdftoupload);
      input.append("image", this.sampleimagetoupload);

      input.append("sampleid", this.sampleid.toString());

      input.append("prepid", this.selectedprepcatagory.toString());
      input.append("prepnameid", this.selectedtitle.toString());

      input.append("sname", this.sname.toString());
      input.append("stext", this.stext.toString());
      input.append("surl", this.surl.toString());


      input.append("orgpdfname", this.sampleorgpdfname.toString());
      input.append("orgimagename", this.sampleorgimagename.toString());
      input.append("createdby", this.localstorage.get("userid").toString());

      this.http.post('api/uploadprevyearmaterial/savesampledata', input)
        .subscribe(
          (data) => {
            debugger;
            this.sampledata = data;
            if (this.sampledata.length > 10) {
              Swal.fire("", "Saved Successfully", "success");
              this.onClearSample();
              this.Bindsampledata();
              return;
            }

          })


    }
    else {

      if (this.selectedprepcatagory == 0 || this.selectedprepcatagory == undefined) {
        Swal.fire("", "Please select category", "error");
        return;
      }
      if (this.selectedtitle == 0 || this.selectedtitle == undefined) {
        Swal.fire("", "Please select title", "error");
        return;
      }
      if (this.sname == "" || this.sname == undefined) {
        Swal.fire("", "Please define name", "error");
        return;
      }
      if (this.stext == "" || this.stext == undefined) {
        Swal.fire("", "Please entrt display text", "error");
        return;
      }
      if (this.surl == "" || this.surl == undefined) {
        this.surl == "";
      }

    

      let input = new FormData();


      input.append("pdf", this.samplepdftoupload);
      input.append("image", this.sampleimagetoupload);

      input.append("sampleid", this.sampleid.toString());

      input.append("prepid", this.selectedprepcatagory.toString());
      input.append("prepnameid", this.selectedtitle.toString());

      input.append("sname", this.sname.toString());
      input.append("stext", this.stext.toString());
      input.append("surl", this.surl.toString());


      input.append("orgpdfname", this.sampleorgpdfname.toString());
      input.append("orgimagename", this.sampleorgimagename.toString());
      input.append("createdby", this.localstorage.get("userid").toString());

      this.http.post('api/uploadprevyearmaterial/updatesampledata', input)
        .subscribe(
          (data) => {
            debugger;
            this.sampledata = data;
            if (this.sampledata.length > 10) {
              Swal.fire("", "Updated Successfully", "success");
              this.onClearSample();
              this.Bindsampledata();
              return;
            }

          })
    }
  }
  //reset sample field
  onClearSample() {
    this.selectedprepcatagory = 0;
    this.selectedtitle = 0;
    this.sname = "";
    this.stext = "";
    this.surl = "";
    this.sampleorgpdfname = "";
    this.sampleorgimagename = "";
    this.samplepdftoupload = [];
    this.sampleimagetoupload = [];
      this.ButtonSampleText = "Save";
      this.myInputVariablesamplefile.nativeElement.value = "";
    this.myInputVariablesampleimage.nativeElement.value = "";
    this.Bindsampledata();
     
   
  }
  //bind sample table data
  Bindsampledata() {
    debugger;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    this.Details = [];

    this.http.get('api/uploadprevyearmaterial/Bindsampletabledata', options).subscribe(
      (data) => {
        debugger;
        this.SampleDetails = data;
        this.GetSavesampleData = this.SampleDetails.data;
        this.samplerecord = this.GetSavesampleData.length;
       

      }
    )
  }


  //edit sample record
  EditSData(i: number, Id) {
    debugger;
    this.ButtonSampleText = 'Update';
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };

    this.http.get('api/uploadprevyearmaterial/GetEditsampleData?sampleid=' + Id, options).subscribe(
      (data) => {
        debugger;
        this.GetSampleEditedData = data;
        if (this.GetSampleEditedData.Status == true) {
          this.bindprepcategory();
          this.selectedprepcatagory = this.GetSampleEditedData.data.prepid;
          this.Bindtitle();
          this.selectedtitle = this.GetSampleEditedData.data.prepnameid;
          this.sname = this.GetSampleEditedData.data.sname;
          this.stext = this.GetSampleEditedData.data.stext;
          this.surl = this.GetSampleEditedData.data.surl;
          this.sampleid = this.GetSampleEditedData.data.sampleid;


        }
      }
    )
  }

  //delete sample rcord
  DeleteSData(i: number, Id) {
    var data;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };

    data =
      {
        "sampleid": Id
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
        this.http.post('api/uploadprevyearmaterial/Deletesampledata', body, options).subscribe(
          (data) => {
            this.DeletesampledData = data;
            if (this.DeletesampledData.Status == true) {
              Swal.fire("", "Deleted Successfully", "success");
              this.Bindsampledata();
              return;
            }
          }
        )
      }
    })


  }


  //Mock test code start here
  //save mock test data
  MockSave() {
    if (this.ButtonMockText == "Save") {
      if (this.selectedprepcatagory == 0 || this.selectedprepcatagory == undefined) {
        Swal.fire("", "Please select category", "error");
        return;
      }
      if (this.selectedtitle == 0 || this.selectedtitle == undefined) {
        Swal.fire("", "Please select title", "error");
        return;
      }
      if (this.mname == "" || this.mname == undefined) {
        Swal.fire("", "Please define name", "error");
        return;
      }
      if (this.mtext == "" || this.mtext == undefined) {
        Swal.fire("", "Please entrt display text", "error");
        return;
      }
      if (this.murl == "" || this.murl == undefined) {
        this.murl == "";
      }

      let input = new FormData();


      input.append("mockid", this.mockid.toString());

      input.append("prepid", this.selectedprepcatagory.toString());
      input.append("prepnameid", this.selectedtitle.toString());

      input.append("mname", this.mname.toString());
      input.append("mtext", this.mtext.toString());
      input.append("murl", this.murl.toString());

      input.append("createdby", this.localstorage.get("userid").toString());

      this.http.post('api/uploadprevyearmaterial/savemockdata', input)
        .subscribe(
          (data) => {
            debugger;
            this.mockdata = data;
            if (this.mockdata.length > 10) {
              Swal.fire("", "Saved Successfully", "success");
              this.onClearMock();
              this.Bindmockdata();
              return;
            }

          })


    }
    else {

      if (this.selectedprepcatagory == 0 || this.selectedprepcatagory == undefined) {
        Swal.fire("", "Please select category", "error");
        return;
      }
      if (this.selectedtitle == 0 || this.selectedtitle == undefined) {
        Swal.fire("", "Please select title", "error");
        return;
      }
      if (this.mname == "" || this.mname == undefined) {
        Swal.fire("", "Please define name", "error");
        return;
      }
      if (this.mtext == "" || this.mtext == undefined) {
        Swal.fire("", "Please entrt display text", "error");
        return;
      }
      if (this.murl == "" || this.murl == undefined) {
        this.murl == "";
      }

   

      let input = new FormData();

      input.append("mockid", this.mockid.toString());

      input.append("prepid", this.selectedprepcatagory.toString());
      input.append("prepnameid", this.selectedtitle.toString());

      input.append("mname", this.mname.toString());
      input.append("mtext", this.mtext.toString());
      input.append("murl", this.murl.toString());

      input.append("createdby", this.localstorage.get("userid").toString());

      this.http.post('api/uploadprevyearmaterial/updatemockdata', input)
        .subscribe(
          (data) => {
            debugger;
            this.mockdata = data;
            if (this.mockdata.length > 10) {
              Swal.fire("", "Updated Successfully", "success");
              this.onClearMock();
              this.Bindmockdata();
              return;
            }

          })
    }
  }

  //reset mock test data
  onClearMock() {
    this.selectedprepcatagory = 0;
    this.selectedtitle = 0;
    this.mname = "";
    this.mtext = "";
    this.murl = "";
    this.Bindmockdata();
    this.ButtonMockText = "Save";
  }


  //bind mock test data
  Bindmockdata() {
    debugger;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    this.MockDetails = [];

    this.http.get('api/uploadprevyearmaterial/Bindmocktabledata', options).subscribe(
      (data) => {
        debugger;
        this.MockDetails = data;
        this.GetSavemockData = this.MockDetails.data;
        this.Mockrecord = this.GetSavemockData.length;


      }
    )
  }

  //edit mock test data

  EditmockData(i: number, Id) {
    debugger;
    this.ButtonMockText = 'Update';
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };

    this.http.get('api/uploadprevyearmaterial/GetEditmockData?mockid=' + Id, options).subscribe(
      (data) => {
        debugger;
        this.GetMockEditedData = data;
        if (this.GetMockEditedData.Status == true) {
          this.bindprepcategory();
          this.selectedprepcatagory = this.GetMockEditedData.data.prepid;
          this.Bindtitle();
          this.selectedtitle = this.GetMockEditedData.data.prepnameid;
          this.mname = this.GetMockEditedData.data.mname;
          this.mtext = this.GetMockEditedData.data.mtext;
          this.murl = this.GetMockEditedData.data.murl;
          this.mockid = this.GetMockEditedData.data.mockid;


        }
      }
    )
  }


  //delete mock test

  DeletemocktestData(i: number, Id) {
    var data;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };

    data =
      {
        "mockid": Id
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
        this.http.post('api/uploadprevyearmaterial/Deletemockdata', body, options).subscribe(
          (data) => {
            this.DeletemockData = data;
            if (this.DeletemockData.Status == true) {
              Swal.fire("", "Deleted Successfully", "success");
              this.Bindmockdata();
              return;
            }
          }
        )
      }
    })


  }

  //Adhoc material code start here

  //save adhoc material
  AdhocSave() {
    if (this.ButtonAdhocText == "Save") {
      if (this.selectedprepcatagory == 0 || this.selectedprepcatagory == undefined) {
        Swal.fire("", "Please select category", "error");
        return;
      }
      if (this.selectedtitle == 0 || this.selectedtitle == undefined) {
        Swal.fire("", "Please select title", "error");
        return;
      }
      if (this.aname == "" || this.aname == undefined) {
        Swal.fire("", "Please define name", "error");
        return;
      }
      if (this.atext == "" || this.atext == undefined) {
        Swal.fire("", "Please entrt display text", "error");
        return;
      }
      if (this.aurl == "" || this.aurl == undefined) {
        this.aurl == "";
      }

      let input = new FormData();

      input.append("pdf", this.pdftoupload);
      input.append("image", this.imagetoupload);
      input.append("adhocid", this.adhocid.toString());

      input.append("prepid", this.selectedprepcatagory.toString());
      input.append("prepnameid", this.selectedtitle.toString());

      input.append("aname", this.aname.toString());
      input.append("atext", this.atext.toString());
      input.append("aurl", this.aurl.toString());

      input.append("orgpdfname", this.orgpdfname.toString());
      input.append("orgimagename", this.orgimagename.toString());
      input.append("createdby", this.localstorage.get("userid").toString());

      this.http.post('api/uploadprevyearmaterial/saveadhocdata', input)
        .subscribe(
          (data) => {
            debugger;
            this.adhocdata = data;
            if (this.adhocdata.length > 10) {
              Swal.fire("", "Saved Successfully", "success");
              this.onClearAdhoc();
              this.Bindadhocdata();
              return;
            }

          })


    }
    else {

      if (this.selectedprepcatagory == 0 || this.selectedprepcatagory == undefined) {
        Swal.fire("", "Please select category", "error");
        return;
      }
      if (this.selectedtitle == 0 || this.selectedtitle == undefined) {
        Swal.fire("", "Please select title", "error");
        return;
      }
      if (this.aname == "" || this.aname == undefined) {
        Swal.fire("", "Please define name", "error");
        return;
      }
      if (this.atext == "" || this.atext == undefined) {
        Swal.fire("", "Please entrt display text", "error");
        return;
      }
      if (this.aurl == "" || this.aurl == undefined) {
        this.aurl == "";
      }

      let input = new FormData();

      input.append("pdf", this.pdftoupload);
      input.append("image", this.imagetoupload);
      input.append("adhocid", this.adhocid.toString());

      input.append("prepid", this.selectedprepcatagory.toString());
      input.append("prepnameid", this.selectedtitle.toString());

      input.append("aname", this.aname.toString());
      input.append("atext", this.atext.toString());
      input.append("aurl", this.aurl.toString());
      input.append("orgpdfname", this.orgpdfname.toString());
      input.append("orgimagename", this.orgimagename.toString());

      input.append("createdby", this.localstorage.get("userid").toString());

      this.http.post('api/uploadprevyearmaterial/updateadhocdata', input)
        .subscribe(
          (data) => {
            debugger;
            this.adhocdata = data;
            if (this.adhocdata.length > 10) {
              Swal.fire("", "Updated Successfully", "success");
              this.onClearAdhoc();
              this.Bindadhocdata();
              return;
            }

          })
    }
  }
  //reset adhoc material field
  onClearAdhoc() {
    this.selectedprepcatagory = 0;
    this.selectedtitle = 0;
    this.aname = "";
    this.atext = "";
    this.aurl = "";
    this.ButtonSampleText = "Save";
    this.Bindadhocdata();
  }

  //bind adhoc materia data
  Bindadhocdata() {
    debugger;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    this.AdhocDetails = [];

    this.http.get('api/uploadprevyearmaterial/Bindadhoctabledata', options).subscribe(
      (data) => {
        debugger;
        this.AdhocDetails = data;
        this.GetSaveadhocData = this.AdhocDetails.data;
        this.adhocrecord = this.GetSaveadhocData.length;


      }
    )
  }

  //edit adhoc data
  EditadhocData(i: number, Id) {
    debugger;
    this.ButtonAdhocText = 'Update';
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };

    this.http.get('api/uploadprevyearmaterial/GetEditadhocData?adhocid=' + Id, options).subscribe(
      (data) => {
        debugger;
        this.GetadhocEditedData = data;
        if (this.GetadhocEditedData.Status == true) {
          this.bindprepcategory();
          this.selectedprepcatagory = this.GetadhocEditedData.data.prepid;
          this.Bindtitle();
          this.selectedtitle = this.GetadhocEditedData.data.prepnameid;
          this.aname = this.GetadhocEditedData.data.aname;
          this.atext = this.GetadhocEditedData.data.atext;
          this.aurl = this.GetadhocEditedData.data.aurl;
          this.adhocid = this.GetadhocEditedData.data.adhocid;


        }
      }
    )
  }

  //delete adhoc material record
  DeleteadhoctestData(i: number, Id) {
    var data;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };

    data =
      {
        "adhocid": Id
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
        this.http.post('api/uploadprevyearmaterial/Deleteadhocdata', body, options).subscribe(
          (data) => {
            this.DeleteadhocData = data;
            if (this.DeleteadhocData.Status == true) {
              Swal.fire("", "Deleted Successfully", "success");
              this.Bindadhocdata();
              return;
            }
          }
        )
      }
    })


  }



  //prepratory Resource code start here

  //save prepratory resources
  ResourceSave() {
    if (this.ButtonResourceText == "Save") {
      if (this.selectedprepcatagory == 0 || this.selectedprepcatagory == undefined) {
        Swal.fire("", "Please select category", "error");
        return;
      }
      if (this.selectedtitle == 0 || this.selectedtitle == undefined) {
        Swal.fire("", "Please select title", "error");
        return;
      }
      if (this.author == "" || this.author == undefined) {
        Swal.fire("", "Please enter author", "error");
        return;
      }
      if (this.publish == "" || this.publish == undefined) {
        Swal.fire("", "Please enter publish", "error");
        return;
      }
      if (this.description == "" || this.description == undefined) {
        Swal.fire("", "Please enter author", "error");
        return;
      }
      if (this.rname == "" || this.rname == undefined) {
        Swal.fire("", "Please define name", "error");
        return;
      }
      if (this.rtext == "" || this.rtext == undefined) {
        Swal.fire("", "Please entrt display text", "error");
        return;
      }
      if (this.rurl == "" || this.rurl == undefined) {
        this.rurl == "";
      }

      let input = new FormData();


      input.append("resourceid", this.resourceid.toString());

      input.append("prepid", this.selectedprepcatagory.toString());
      input.append("prepnameid", this.selectedtitle.toString());

      input.append("author", this.author.toString());
      input.append("publish", this.publish.toString());
      input.append("description", this.description.toString());

      input.append("rname", this.rname.toString());
      input.append("rtext", this.rtext.toString());
      input.append("rurl", this.rurl.toString());

      input.append("createdby", this.localstorage.get("userid").toString());

      this.http.post('api/uploadprevyearmaterial/saveresourcedata', input)
        .subscribe(
          (data) => {
            debugger;
            this.resourcedata = data;
            if (this.resourcedata.length > 10) {
              Swal.fire("", "Saved Successfully", "success");
              this.onClearResource();
              this.Bindresourcedata();
              return;
            }

          })


    }
    else {

     
        if (this.selectedprepcatagory == 0 || this.selectedprepcatagory == undefined) {
          Swal.fire("", "Please select category", "error");
          return;
        }
        if (this.selectedtitle == 0 || this.selectedtitle == undefined) {
          Swal.fire("", "Please select title", "error");
          return;
        }
        if (this.author == "" || this.author == undefined) {
          Swal.fire("", "Please enter author", "error");
          return;
        }
        if (this.publish == "" || this.publish == undefined) {
          Swal.fire("", "Please enter publish", "error");
          return;
        }
        if (this.description == "" || this.description == undefined) {
          Swal.fire("", "Please enter author", "error");
          return;
        }
        if (this.rname == "" || this.rname == undefined) {
          Swal.fire("", "Please define name", "error");
          return;
        }
        if (this.rtext == "" || this.rtext == undefined) {
          Swal.fire("", "Please entrt display text", "error");
          return;
        }
        if (this.rurl == "" || this.rurl == undefined) {
          this.rurl == "";
        }

        let input = new FormData();


        input.append("resourceid", this.resourceid.toString());

        input.append("prepid", this.selectedprepcatagory.toString());
        input.append("prepnameid", this.selectedtitle.toString());

        input.append("author", this.author.toString());
        input.append("publish", this.publish.toString());
        input.append("description", this.description.toString());

        input.append("rname", this.rname.toString());
        input.append("rtext", this.rtext.toString());
        input.append("rurl", this.rurl.toString());

        input.append("createdby", this.localstorage.get("userid").toString());

        this.http.post('api/uploadprevyearmaterial/updateresourcedata', input)
          .subscribe(
            (data) => {
              debugger;
              this.resourcedata = data;
              if (this.resourcedata.length > 10) {
                Swal.fire("", "Updated Successfully", "success");
                this.onClearResource();
                this.Bindresourcedata();
                return;
              }

            })
      
    }
  }

  //reset resources
  onClearResource() {
    this.selectedprepcatagory = 0;
    this.selectedtitle = 0;
    this.rname = "";
    this.rtext = "";
    this.rurl = "";
    this.author = "";
    this.publish = "";
    this.description = "";
    this.ButtonResourceText = "Save";
    this.Bindresourcedata();
  }

  //bind resources material data
  Bindresourcedata() {
    debugger;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    this.ResourceDetails = [];

    this.http.get('api/uploadprevyearmaterial/Bindresourcetabledata', options).subscribe(
      (data) => {
        debugger;
        this.ResourceDetails = data;
        this.GetSaveresourceData = this.ResourceDetails.data;
        this.resourcerecord = this.GetSaveresourceData.length;


      }
    )
  }

  //edit resource data
  EditresourceData(i: number, Id) {
    debugger;
    this.ButtonResourceText = 'Update';
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };

    this.http.get('api/uploadprevyearmaterial/GetEditresourceData?resourceid=' + Id, options).subscribe(
      (data) => {
        debugger;
        this.GetresourceEditedData = data;
        if (this.GetresourceEditedData.Status == true) {
          this.bindprepcategory();
          this.selectedprepcatagory = this.GetresourceEditedData.data.prepid;
          this.Bindtitle();
          this.selectedtitle = this.GetresourceEditedData.data.prepnameid;
          this.author = this.GetresourceEditedData.data.author;
          this.publish = this.GetresourceEditedData.data.publish;
          this.description = this.GetresourceEditedData.data.description;
          this.rname = this.GetresourceEditedData.data.rname;
          this.rtext = this.GetresourceEditedData.data.rtext;
          this.rurl = this.GetresourceEditedData.data.rurl;
          this.resourceid = this.GetresourceEditedData.data.resourceid;


        }
      }
    )
  }

  //delete resource

  DeleteresData(i: number, Id) {
    var data;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };

    data =
      {
        "resourceid": Id
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
        this.http.post('api/uploadprevyearmaterial/Deleteresourcedata', body, options).subscribe(
          (data) => {
            this.DeleteresourceData = data;
            if (this.DeleteresourceData.Status == true) {
              Swal.fire("", "Deleted Successfully", "success");
              this.Bindresourcedata();
              return;
            }
          }
        )
      }
    })


  }

  //online link free code start here

  FreeSave() {
    debugger;
    if (this.ButtonFreeText == "Save") {
      if (this.selectedprepcatagory == 0 || this.selectedprepcatagory == undefined) {
        Swal.fire("", "Please select category", "error");
        return;
      }
      if (this.selectedtitle == 0 || this.selectedtitle == undefined) {
        Swal.fire("", "Please select title", "error");
        return;
      }
    
      if (this.fdescription == "" || this.fdescription == undefined) {
        Swal.fire("", "Please enter description", "error");
        return;
      }
      if (this.fname == "" || this.fname == undefined) {
        Swal.fire("", "Please define name", "error");
        return;
      }
      if (this.ftext == "" || this.ftext == undefined) {
        Swal.fire("", "Please entrt display text", "error");
        return;
      }
      if (this.furl == "" || this.furl == undefined) {
        this.furl == "";
      }

      let input = new FormData();


      input.append("freeid", this.freeid.toString());

      input.append("prepid", this.selectedprepcatagory.toString());
      input.append("prepnameid", this.selectedtitle.toString());
      input.append("fdescription", this.fdescription.toString());

      input.append("fname", this.fname.toString());
      input.append("ftext", this.ftext.toString());
      input.append("furl", this.furl.toString());

      input.append("createdby", this.localstorage.get("userid").toString());

      this.http.post('api/uploadprevyearmaterial/savefreedata', input)
        .subscribe(
          (data) => {
            debugger;
            this.freedata = data;
            if (this.freedata.length > 10) {
              Swal.fire("", "Saved Successfully", "success");
              this.onClearFree();
              this.Bindfreedata();
              return;
            }

          })


    }
    else {


      if (this.selectedprepcatagory == 0 || this.selectedprepcatagory == undefined) {
        Swal.fire("", "Please select category", "error");
        return;
      }
      if (this.selectedtitle == 0 || this.selectedtitle == undefined) {
        Swal.fire("", "Please select title", "error");
        return;
      }
     
      if (this.fdescription == "" || this.fdescription == undefined) {
        Swal.fire("", "Please enter description", "error");
        return;
      }
      if (this.fname == "" || this.fname == undefined) {
        Swal.fire("", "Please define name", "error");
        return;
      }
      if (this.ftext == "" || this.ftext == undefined) {
        Swal.fire("", "Please entrt display text", "error");
        return;
      }
      if (this.furl == "" || this.furl == undefined) {
        this.furl == "";
      }

      let input = new FormData();


      input.append("freeid", this.freeid.toString());

      input.append("prepid", this.selectedprepcatagory.toString());
      input.append("prepnameid", this.selectedtitle.toString());

      input.append("fdescription", this.fdescription.toString());

      input.append("fname", this.fname.toString());
      input.append("ftext", this.ftext.toString());
      input.append("furl", this.furl.toString());

      input.append("createdby", this.localstorage.get("userid").toString());

      this.http.post('api/uploadprevyearmaterial/updatefreedata', input)
        .subscribe(
          (data) => {
            debugger;
            this.freedata = data;
            if (this.freedata.length > 10) {
              Swal.fire("", "Updated Successfully", "success");
              this.onClearFree();
              this.Bindfreedata();
              return;
            }

          })

    }
  }

  //reset free online data
  onClearFree() {
    this.selectedprepcatagory = 0;
    this.selectedtitle = 0;
    this.fname = "";
    this.ftext = "";
    this.furl = "";
   
    this.fdescription = "";
    this.ButtonFreeText = "Save";
    this.Bindfreedata();
  }

  //bind online  free data
  Bindfreedata() {
    debugger;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    this.FreeDetails = [];

    this.http.get('api/uploadprevyearmaterial/Bindfreetabledata', options).subscribe(
      (data) => {
        debugger;
        this.FreeDetails = data;
        this.GetSavefreeData = this.FreeDetails.data;
        this.freerecord = this.GetSavefreeData.length;



      }
    )
  }

  //edit online free data
  EditfreeData(i: number, Id) {
    debugger;
    this.ButtonFreeText = 'Update';
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };

    this.http.get('api/uploadprevyearmaterial/GetEditfreeData?freeid=' + Id, options).subscribe(
      (data) => {
        debugger;
        this.GetfreeEditedData = data;
        if (this.GetfreeEditedData.Status == true) {
          this.bindprepcategory();
          this.selectedprepcatagory = this.GetfreeEditedData.data.prepid;
          this.Bindtitle();
          this.selectedtitle = this.GetfreeEditedData.data.prepnameid;
          this.fdescription = this.GetfreeEditedData.data.fdescription;
          this.fname = this.GetfreeEditedData.data.fname;
          this.ftext = this.GetfreeEditedData.data.ftext;
          this.furl = this.GetfreeEditedData.data.furl;
          this.freeid = this.GetfreeEditedData.data.freeid;


        }
      }
    )
  }

  //delete online free data

  DeletefData(i: number, Id) {
    var data;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };

    data =
      {
        "freeid": Id
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
        this.http.post('api/uploadprevyearmaterial/Deletefreedata', body, options).subscribe(
          (data) => {
            this.DeletefreeData = data;
            if (this.DeletefreeData.Status == true) {
              Swal.fire("", "Deleted Successfully", "success");
              this.Bindfreedata();
              return;
            }
          }
        )
      }
    })


  }


  //code start for paid links

  paidSave() {
    debugger;
    if (this.ButtonpaidText == "Save") {
      if (this.selectedprepcatagory == 0 || this.selectedprepcatagory == undefined) {
        Swal.fire("", "Please select category", "error");
        return;
      }
      if (this.selectedtitle == 0 || this.selectedtitle == undefined) {
        Swal.fire("", "Please select title", "error");
        return;
      }
      if (this.paiddescription == "" || this.paiddescription == undefined) {
        Swal.fire("", "Please enter description", "error");
        return;
      }
      if (this.paidname == "" || this.paidname == undefined) {
        Swal.fire("", "Please define name", "error");
        return;
      }
      if (this.paidtext == "" || this.paidtext == undefined) {
        Swal.fire("", "Please entrt display text", "error");
        return;
      }
      if (this.paidurl == "" || this.paidurl == undefined) {
        this.paidurl == "";
      }

      let input = new FormData();


      input.append("paidid", this.paidid.toString());

      input.append("prepid", this.selectedprepcatagory.toString());
      input.append("prepnameid", this.selectedtitle.toString());
      input.append("paiddescription", this.paiddescription.toString());

      input.append("paidname", this.paidname.toString());
      input.append("paidtext", this.paidtext.toString());
      input.append("paidurl", this.paidurl.toString());

      input.append("createdby", this.localstorage.get("userid").toString());

      this.http.post('api/uploadprevyearmaterial/savepaiddata', input)
        .subscribe(
          (data) => {
            debugger;
            this.paiddata = data;
            if (this.paiddata.length > 10) {
              Swal.fire("", "Saved Successfully", "success");
              this.onClearpaid();
              this.Bindpaiddata();
              return;
            }

          })


    }
    else {


      if (this.selectedprepcatagory == 0 || this.selectedprepcatagory == undefined) {
        Swal.fire("", "Please select category", "error");
        return;
      }
      if (this.selectedtitle == 0 || this.selectedtitle == undefined) {
        Swal.fire("", "Please select title", "error");
        return;
      }

      if (this.paiddescription == "" || this.paiddescription == undefined) {
        Swal.fire("", "Please enter description", "error");
        return;
      }
      if (this.paidname == "" || this.paidname == undefined) {
        Swal.fire("", "Please define name", "error");
        return;
      }
      if (this.paidtext == "" || this.paidtext == undefined) {
        Swal.fire("", "Please entrt display text", "error");
        return;
      }
      if (this.paidurl == "" || this.paidurl == undefined) {
        this.paidurl == "";
      }

      let input = new FormData();


      input.append("paidid", this.paidid.toString());

      input.append("prepid", this.selectedprepcatagory.toString());
      input.append("prepnameid", this.selectedtitle.toString());

      input.append("paiddescription", this.paiddescription.toString());

      input.append("paidname", this.paidname.toString());
      input.append("paidtext", this.paidtext.toString());
      input.append("paidurl", this.paidurl.toString());

      input.append("createdby", this.localstorage.get("userid").toString());

      this.http.post('api/uploadprevyearmaterial/updatepaiddata', input)
        .subscribe(
          (data) => {
            debugger;
            this.paiddata = data;
            if (this.paiddata.length > 10) {
              Swal.fire("", "Updated Successfully", "success");
              this.onClearpaid();
              this.Bindpaiddata();
              return;
            }

          })

    }
  }

  //reset paid links
  onClearpaid() {
    this.selectedprepcatagory = 0;
    this.selectedtitle = 0;
    this.paidname = "";
    this.paidtext = "";
    this.paidurl = "";

    this.paiddescription = "";
    this.ButtonpaidText = "Save";
    this.Bindpaiddata();
  }

  //bind online paid data

  Bindpaiddata () {
    debugger;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    this.FreeDetails = [];

    this.http.get('api/uploadprevyearmaterial/Bindpaidtabledata', options).subscribe(
      (data) => {
        debugger;
        this.PaidDetails = data;
        this.GetSavepaidData = this.PaidDetails.data;
        this.paidrecord = this.GetSavepaidData.length;


      }
    )
  }

  //edit online paid data
  EditpaidData (i: number, Id) {
    debugger;
    this.ButtonpaidText = 'Update';
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };

    this.http.get('api/uploadprevyearmaterial/GetEditpaidData?paidid=' + Id, options).subscribe(
      (data) => {
        debugger;
        this.GetpaidEditedData = data;
        if (this.GetpaidEditedData.Status == true) {
          this.bindprepcategory();
          this.selectedprepcatagory = this.GetpaidEditedData.data.prepid;
          this.Bindtitle();
          this.selectedtitle = this.GetpaidEditedData.data.prepnameid;
          this.paiddescription = this.GetpaidEditedData.data.paiddescription;
          this.paidname = this.GetpaidEditedData.data.paidname;
          this.paidtext = this.GetpaidEditedData.data.paidtext;
          this.paidurl = this.GetpaidEditedData.data.paidurl;
          this.paidid = this.GetpaidEditedData.data.paidid;


        }
      }
    )
  }

  //delete paid link
  DeletepaidlinkData (i: number, Id) {
    var data;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };

    data =
      {
        "paidid": Id
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
        this.http.post('api/uploadprevyearmaterial/Deletepaiddata', body, options).subscribe(
          (data) => {
            this.DeletepaidData = data;
            if (this.DeletepaidData.Status == true) {
              Swal.fire("", "Deleted Successfully", "success");
              this.Bindpaiddata();
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
  //  this.yt = '<iframe width="727" height="409" src="'+this.url+'" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
  //}



}
