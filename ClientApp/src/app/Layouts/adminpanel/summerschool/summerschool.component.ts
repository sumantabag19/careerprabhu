import { Component, OnInit, Input, PipeTransform, Pipe, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';
import { HttpClient, HttpErrorResponse, HttpRequest, HttpHeaders } from '@angular/common/http';
import { LocalStorageService, LocalStorageModule } from 'angular-2-local-storage';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import Swal from 'sweetalert2';
import { SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { NgbDateAdapter, NgbDateStruct, NgbDateNativeAdapter, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { Time } from '@angular/common';
import * as xlsx from 'xlsx';
declare var $: any;
//import * as $ from 'jquery';






//@Pipe({
//  name: 'safe'
//})
//export class SafePipeHtml implements PipeTransform {

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
  selector: 'app-summerschool',
  templateUrl: './summerschool.component.html',
  //styleUrls: ['./webinar.component.css']
    providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class SummerSchoolManager implements OnInit {
  //public page: number = 0;
  //public pageSize: number = 10;
  public selectedarea: number = 0;
  public AreaData: any[];
  public AreaDetails: any = [];
  search: string = "";
  public selectedcountry: number = 0;
  public CountryData: any[];
  public CountryDetails: any = [];
  public location: number = 0;
  public univercity: number = 0;

  public selectedtopic: number = 0;
  public TopicData: any[];
  public TopicDetails: any = [];
  public description: string = "";
  public fees: string = "";
  public duration: string = "";
  public link: string = "";
  public applicationlink: string = "";
  public ButtonText: string = "Save";

  public summerschoolData: any = [];
  public Detail: any = [];
  public GetSaveData: any = [];
  public HeaderData: any = [];
  public GetEditedData: any = [];
  public SummerSchoolDetails: any = [];
  public schoolid: number = 0;
  public url: string = "";
    public yt: any;
    public intrestid: string = "";
    public AllIntrest: Boolean = false;
    public locdata: any = [];
    public LocationData: any = [];
    public univdata: any = [];
    public UniversityData: any = [];
    public SelectedStartDate: Date;
    public SelectedEndDate: Date;
    public s_date: any;
    public e_date: any;
    public todaydate: any;
    public startdate: any;
  public enddate: any;
  CurrencyData: any = [];
  CurrencyDetails: any = [];
  selectedcurrency: number = 0;
  city: number = 0;
  citdata: any = [];
  Durationdata: any = [];
  CityData: any = [];
public sc_date: any;
    public ec_date: any;
  SelectedImage: any = [];
  @ViewChild('fileInput', { static: true }) private myInputVariableprefile: ElementRef;
  excelfile: any = [];
  arrayBuffer: any = [];
  exceldata: any = [];
  GetData1: any = [];
  dw: string = "";
  selectedinterest: number = 0;
  constructor(private http: HttpClient, private router: Router, private localstorage: LocalStorageService, private toaster: ToastrService, private loader: NgxUiLoaderService, private config1: NgbDatepickerConfig) {
    const current = new Date();
    config1.minDate = {
      year: current.getFullYear(), month:
        current.getMonth() + 1, day: current.getDate()
    };
    //config.maxDate = { year: 2099, month: 12, day: 31 };
    config1.outsideDays = 'hidden';
  }
  ngOnInit() {

    this.getArea();
    this.getCountry();
    this.getTopic();
    this.GetData();
    this.BindCurrency();
    this.dw = "http://admin.careerprabhu.com/summerschool.xlsx";

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
    var cols = ["country", "state", "city", "university","interest", "topic", "link", "applicationlink", "currency", "fees","description","duration"];
    for (var i = 0; i < cols.length; i++) {
      for (var j = 0; j < Data.length; j++) {
        if (Data[j][cols[i]] == undefined) {
          Swal.fire('Oops...', cols[i] + " is not available at  row number " + (j + 2), 'warning')
          var Validate = false;
          return;
        }
      }
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
      this.http.post('api/summerschool/Upload', body, options).subscribe(
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

















  CalculateDuration() {
    debugger;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    this.CurrencyDetails = [];
    this.sc_date = this.SelectedStartDate.toISOString().slice(0, 10);
    this.ec_date = this.SelectedEndDate.toISOString().slice(0, 10);
    var body = {
      "startdate": this.sc_date.toString(),
      "enddate": this.ec_date.toString()
    }
    this.http.post('api/summerschool/CalculateDuration', body, options).subscribe(
      (data) => {
        debugger;
        var re = /-/gi;
        this.Durationdata = data;

        //this.duration = this.Durationdata[0].diff;

        this.duration = this.Durationdata[0].diff.toString().replace(re, "");

      }
    )
  }


  BindCurrency() {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    this.CurrencyDetails = [];
 
    this.http.get('api/summerschool/Bindcurrency', options).subscribe(
      (data) => {
        debugger;
        this.CurrencyDetails = data;

        this.CurrencyData = this.CurrencyDetails;

      }
    )
  }


  BindCity() {
    debugger;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    this.locdata = [];
    var body = {
      "countryid": this.selectedcountry,
      "locationid": this.location
    }
    var tmpclass: any = [];
    this.http.post('api/summerschool/BindCity', body, options).subscribe(

      (data) => {
        this.citdata = data;
        if (this.citdata.Status == true) {
          this.CityData = this.citdata.data;
        }
        else {
          this.CityData = this.citdata.data;
        }
        //if (this.GetEditedData.Status == true) {
        //    this.location = this.GetEditedData.location;
        //}
      }
    )
  }





  getArea() {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    this.AreaDetails = [];
    var a;
    var tmpclass: any = [];
    this.http.get('api/summerschool/Bindintrestarea', options).subscribe(
      (data) => {
        debugger;
        this.AreaDetails = data;

        this.AreaData = this.AreaDetails;

      }
    )
  }

  getCountry() {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    this.CountryDetails = [];
    var a;
    var tmpclass: any = [];
    this.http.get('api/summerschool/Bindcountry', options).subscribe(
      (data) => {
        debugger;
        this.CountryDetails = data;

        this.CountryData = this.CountryDetails;

      }
    )
  }

  getTopic() {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    this.TopicDetails = [];
    var a;
    var tmpclass: any = [];
    this.http.get('api/summerschool/BindTopic', options).subscribe(
      (data) => {
        this.TopicDetails = data;

        this.TopicData = this.TopicDetails;

      }
    )
    }


    BindLocation() {
        debugger;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        let options = { headers: headers };
        this.locdata = [];
        var body = {
            "countryid": this.selectedcountry
        }
        var tmpclass: any = [];
        this.http.post('api/summerschool/BindLocation', body, options).subscribe(

            (data) => {
                this.locdata = data;
                if (this.locdata.Status == true) {
                    this.LocationData = this.locdata.data;
                }
                else {
                    this.LocationData = this.locdata.data;
                }
                //if (this.GetEditedData.Status == true) {
                //    this.location = this.GetEditedData.location;
                //}
            }
        )
    }


    BindUniversity() {
        debugger;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        let options = { headers: headers };
        this.univdata = [];
        var body = {
            "countryid": this.selectedcountry,
          "locationid": this.location,
          "cityid": this.city
        }
        var tmpclass: any = [];
        this.http.post('api/summerschool/BindUniversity', body, options).subscribe(

            (data) => {
                this.univdata = data;
                if (this.univdata.Status == true) {
                    this.UniversityData = this.univdata.data;
                }
                else {
                    this.UniversityData = this.univdata.data;
                }
                //if (this.GetEditedData.Status == true) {
                //    this.univercity = this.GetEditedData.univercityname;
                //}
            }
        )
    }


  //save summer school detail

    onSave() {
      debugger;
      if (this.selectedinterest == 0 || this.selectedinterest == undefined) {
            Swal.fire("", "Please select intrest area", "error");
            return;
        }
   
    if (this.selectedcountry == 0 || this.selectedcountry == undefined) {
      Swal.fire("", "Please select country", "error");
      return;
    }
    if (this.location == 0 || this.location == undefined) {
      Swal.fire("", "Please select location", "error");
      return;
      }
      if (this.city == 0 || this.city == undefined) {
        Swal.fire("", "Please select city", "error");
        return;
      }
    if (this.univercity == 0 || this.univercity == undefined) {
      Swal.fire("", "Please select university", "error");
      return;
    }
    if (this.selectedtopic == 0 || this.selectedtopic == undefined) {
      Swal.fire("", "Please select topic", "error");
      return;
    }
    if (this.description == "" || this.description == undefined) {
      Swal.fire("", "Please enter description", "error");
      return;
      }
      if (this.selectedcurrency == 0 || this.selectedcurrency == undefined) {
        Swal.fire("", "Please select currency", "error");
        return;
      }
    
    if (this.fees == "" || this.fees == undefined) {
      Swal.fire("", "Please enter fees", "error");
      return;
      }

      if (this.fees.match("^[a-zA-Z]*$")) {
        Swal.fire("", "Fees contains only integer", "error");
        return;
      }

    if (this.duration == "" || this.duration == undefined) {
      Swal.fire("", "Please enter duration", "error");
      return;
      }


      if (this.duration.toString().match(/^[0-9]*$/)) {

      }
      else {
        Swal.fire("", "Duration should not contain alphabet", "error");
        return;
      }




    if (this.link == "" || this.link == undefined) {
      Swal.fire("", "Please enter link", "error");
      return;
      }
      if (this.applicationlink == "" || this.applicationlink == undefined) {
        Swal.fire("", "Please enter application link", "error");
        return;
      }
      if (this.SelectedStartDate == null || this.SelectedStartDate == undefined) {
        this.SelectedStartDate = null;
      }

      if (this.SelectedEndDate == null || this.SelectedEndDate == undefined) {
        this.SelectedEndDate == null;
      }


      if (this.SelectedEndDate == null) {
        this.s_date = "";
        this.e_date = "";
      }
      else
      {
        this.s_date = this.SelectedStartDate.toISOString().slice(0, 10);
        this.e_date = this.SelectedEndDate.toISOString().slice(0, 10);
        this.todaydate = new Date().toISOString().slice(0, 10);
        if (this.s_date < this.todaydate) {
          Swal.fire("", "Start date should contains future date", "error");
          return;
        }
        if (this.e_date < this.todaydate) {
          Swal.fire("", "End date should contain future date", "error");
          return;
        }
        if (this.s_date > this.e_date) {
          Swal.fire("", "Start date should always less then end date", "error");
          return;
        }
      }



    var data;
    if (this.ButtonText == "Save") {
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      let options = { headers: headers }
      data =
        {

        "schoolid": 0,
        "repositoryid": this.selectedinterest,
        "countryid": this.selectedcountry,
        "location": this.location,
        "cityid": this.city,
        "univercity": this.univercity,
        "ID": this.selectedtopic,
        "description": this.description,
        "currency": this.selectedcurrency,
        "fees": this.fees,
        "duration": this.duration,
        "link": this.link,
        "applicationlink": this.applicationlink,
          "startdate": this.s_date.toString(),
          "enddate": this.e_date.toString(),
        "updatedby": parseInt(this.localstorage.get("userid")),
         "createdby": parseInt(this.localstorage.get("userid"))
        };
      let body = JSON.stringify(data);
      this.http.post('api/summerschool/SaveSummerSchool', body, options).subscribe(

        (data) => {
          this.summerschoolData = data;
          if (this.summerschoolData.Status == true) {
            Swal.fire("", "Saved Successfully", "success");
            this.onClear();
            this.GetData();
            return;
          }
        }
      )


    }
    else {
      debugger;
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      let options = { headers: headers }
      data =
        {

        "schoolid": this.GetEditedData.schoolid,
        "repositoryid": this.selectedinterest,
          "countryid": this.selectedcountry,
        "location": this.location,
        "cityid": this.city,
          "univercity": this.univercity,
          "ID": this.selectedtopic,
        "description": this.description,
        "currency": this.selectedcurrency,
          "fees": this.fees,
          "duration": this.duration,
        "link": this.link,
        "applicationlink": this.applicationlink,

          "startdate": this.s_date.toString(),
          "enddate": this.e_date.toString(),
          "updatedby": parseInt(this.localstorage.get("userid")),
          "createdby": parseInt(this.localstorage.get("userid"))
         
        };
      let body = JSON.stringify(data);
      this.http.post('api/summerschool/UpdateSummerSchool', body, options).subscribe(

        (data) => {
          this.summerschoolData = data;
          if (this.summerschoolData.Status == true) {
            Swal.fire("", "Updated Successfully", "success");
            this.onClear();
            this.GetData();
            return;
          }
        }
      )
    }
  }


  //reset data
  onClear() {
    this.selectedcurrency = 0;
    this.selectedarea = 0;
    this.selectedcountry = 0;
    this.selectedtopic = 0;
    this.location = 0;
    this.univercity = 0;
    this.city = 0;
    this.description = "";
    this.fees = "";
    this.duration = "";
    this.link = "";
    this.applicationlink = "";
    this.selectedinterest = 0;
    this.SelectedStartDate = null;
    this.SelectedEndDate = null;
      this.AllIntrest = false;
      for (var i = 0; i < this.AreaData.length; i++) {
          this.AreaData[i].selected = false;
      }
      for (var i = 0; i < this.AreaData.length; i++) {
          this.AreaData[i].selected = false;
      }
    this.ButtonText = "Save";

  }

  //get data (table bind)

  GetData() {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    this.Detail = [];

    this.http.get('api/summerschool/getSummerSchoolData', options).subscribe(
      (data) => {
        debugger;
        this.Detail = data;
            this.GetSaveData = this.Detail.data;
            this.startdate = this.GetSaveData[0].startdate.slice(0, -6);
            this.enddate = this.GetSaveData[0].enddate.slice(0, -6);


            //var a;
            //var b;
            //debugger;
            ////this.GetSaveData = data;
            //for (var i = 0; i < this.GetSaveData.length; i++) {
            //    var repositoryname = "";
            //  a = [];
            //    for (var j = 0; j < this.GetSaveData[i].repositoryid.length; j++) {
            //        a = this.GetSaveData[i].repositoryid.split(",");
                    
            //    }
            //    for (var k = 0; k < a.length; k++) {
            //        for (var l = 0; l < this.AreaData.length; l++) {
            //            if (a[k] == this.AreaData[l].repositoryid) {
            //                if (k > 0) {
            //                    repositoryname = repositoryname + ", " + this.AreaData[l].repositoryname;
            //                }
            //                else {
            //                    repositoryname = repositoryname + this.AreaData[l].repositoryname;
            //                }
            //            }
            //        }
            //    }
                
            //    this.GetSaveData[i].repositoryid = repositoryname;


            //}








        this.HeaderData = Object.keys(this.GetSaveData[0]);

      }
    )
  }


  //for Edit Data
  EditData(i: number, schoolid) {
    debugger;
    this.getArea();
    this.getCountry();
    this.getTopic();
    this.BindCurrency();
      
    this.ButtonText = 'Update';
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };

    this.http.get('api/summerschool/EditSummerSchoolData?schoolid=' + schoolid, options).subscribe(
      (data) => {
        debugger;
        this.GetEditedData = data;
        if (this.GetEditedData.Status == true) {
         
          //this.selectedarea = this.GetEditedData.repositoryid;

          this.selectedinterest = this.GetEditedData.repositoryid;
         
         
          //  var tmpClassId = this.GetEditedData.repositoryid.split(",");
          //  for (var i = 0; i < this.AreaData.length; i++) {
          //      for (var j = 0; j < tmpClassId.length; j++) {
          //          if (this.AreaData[i].repositoryid == tmpClassId[j]) {
          //              this.AreaData[i].selected = true;
          //          }
          //      }
          //  }
          //  if (this.AreaData.length == tmpClassId.length) {
          //      this.AllIntrest = true;
          //}


          if (this.GetEditedData.startdate == "0000-00-00" || this.GetEditedData.startdate == "") {
            this.SelectedStartDate = null;
          }
          else {
            var mdate = new Date(this.GetEditedData.startdate);
            this.SelectedStartDate = mdate;
          }
          if (this.GetEditedData.enddate == "0000-00-00" || this.GetEditedData.enddate == "") {
            this.SelectedEndDate = null;
          }
          else {
            var edate = new Date(this.GetEditedData.enddate);
            this.SelectedEndDate = edate;
          }
            
           // var edate = new Date(this.GetEditedData.enddate);


          this.selectedtopic = this.GetEditedData.topicid;
            this.selectedcountry = this.GetEditedData.countryid;
            this.BindLocation();
          this.location = this.GetEditedData.location;
          this.BindCity();
          this.city = this.GetEditedData.cityid;

            this.BindUniversity();
          this.univercity = this.GetEditedData.univercityname;
          this.description = this.GetEditedData.description;
          this.fees = this.GetEditedData.fees;
          this.duration = this.GetEditedData.duration;
          this.link = this.GetEditedData.link;
          this.applicationlink = this.GetEditedData.applicationlink;

            
         
          this.selectedcurrency = this.GetEditedData.currencyid;
          this.intrestid = this.GetEditedData.repositoryid.toString();
          


        }
      }
    )
  }
  //Delete Subscription Data
  DeleteData(i: number, schoolid: number) {
    debugger;
    var data


    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers }
    debugger;
    data =
      {
        "acttype": "delete",
      "schoolid": schoolid
      };

    let body = JSON.stringify(data);
    debugger;

    Swal.fire({
      text: 'Are you sure to delete this record?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.http.post('api/summerschool/deletesummerschool', body, options).subscribe(

          (data) => {
            debugger;
            this.SummerSchoolDetails = data
            if (this.SummerSchoolDetails.Status == true) {
              this.GetData();
              Swal.fire("", "Deleted Successfully", "success");
              this.onClear();
              return;
            }
          }
        )
      }
    })
    }


    //select all intrest area
    //SelectAllIntrest() {
    //    debugger;
    //    this.intrestid = "";
    //    if (this.AllIntrest === true) {
    //        for (var i = 0; i < this.AreaData.length; i++) {
    //            this.AreaData[i].selected = true;
    //            if (this.intrestid === '') {
    //                this.intrestid = this.AreaData[i].repositoryid;
    //            }
    //            else {
    //                this.intrestid = this.intrestid + ',' + this.AreaData[i].repositoryid;
    //            }
    //        }
    //    }
    //    else {
    //        for (var i = 0; i < this.AreaData.length; i++) {
    //            this.AreaData[i].selected = false;
    //        }
    //    }
    //}

    ////get selected intrest area
    //getSelectedIntrest() {
    //    debugger;
    //    this.intrestid = "";
    //    var count = 0;
    //    for (var i = 0; i < this.AreaData.length; i++) {

    //        if (this.AreaData[i].selected === true) {

    //            if (this.intrestid === '') {
    //                this.intrestid = this.AreaData[i].repositoryid;
    //                count++;
    //            }
    //            else {
    //                this.intrestid = this.intrestid + ',' + this.AreaData[i].repositoryid;
    //                count++;
    //            }
    //        }
    //    }
    //    if (this.AreaData.length === count) {
    //        this.AllIntrest = true;
    //    }
    //    else {
    //        this.AllIntrest = false;
    //    }


    //}

  //video modal pop up
  //handleButtonClick(link: string) {
  //  debugger;
  //  this.url = link;
  //  this.yt = '<iframe width="727" height="409" src="'+this.url+'" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
  //}

}
