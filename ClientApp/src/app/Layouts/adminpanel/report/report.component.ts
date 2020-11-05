import { Component, OnInit, Input, PipeTransform, Pipe } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';
import { HttpClient, HttpErrorResponse, HttpRequest, HttpHeaders } from '@angular/common/http';
import { LocalStorageService, LocalStorageModule } from 'angular-2-local-storage';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import Swal from 'sweetalert2';
import { SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { NgbDateAdapter, NgbDateNativeAdapter, NgbTimepickerConfig, NgbTimeStruct, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.css'],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }, NgbTimepickerConfig]

})
export class ReportManager implements OnInit {
  noofappdownloader: number = 0;
  noofnotregistered: number = 0;
  noofthroughapp: number = 0;
  noofbackend: number = 0;
  studentdetails: any = [];
  countdetails: any = [];
  DownloaderData: any = [];
  AppDownloaderData: any = [];
  public s_date: any;
  public e_date: any;
  public SelectedDate: Date;
  public SelectedEndDate: Date;
  public SelectedDate1: Date;
  public SelectedEndDate1: Date;
  public SelectedDate2: Date;
  public SelectedEndDate2: Date;
  public SelectedDate3: Date;
  public SelectedEndDate3: Date;
  public SelectedDate5: Date;
  public SelectedEndDate6: Date;
  public SelectedDate7: Date;
  public SelectedEndDate8: Date;
  public SelectedDate9: Date;
  public SelectedEndDate10: Date;
  public SelectedDate11: Date;
  public SelectedEndDate12: Date;
  public SelectedDate13: Date;
  public SelectedEndDate14: Date;
  public SelectedDate15: Date;
  public SelectedEndDate16: Date;
  public SelectedDate17: Date;
  public SelectedEndDate18: Date;
  public SelectedDate19: Date;
  public SelectedEndDate20: Date;
  public SelectedDate21: Date;
  public SelectedEndDate22: Date;
  public SelectedDate23: Date;
  public SelectedEndDate24: Date;
  public SelectedDate25: Date;
  public SelectedEndDate26: Date;
  public SelectedDate27: Date;
  public SelectedEndDate28: Date;
  public SelectedDate29: Date;
  public SelectedEndDate30: Date;

  public SelectedDate51: Date;
  public SelectedDate52: Date;

  public SelectedDate54: Date;
  public SelectedDate55: Date;

  public SelectedDate59: Date;
  public SelectedDate60: Date;

  public SelectedDate61: Date;
  public SelectedDate62: Date;
  selectedbuilder: number = 0;
  selectedstudentq: number = 0;
  StudentData: any = [];
  statedat: any = [];
  StateData: any = [];
  citdata: any = [];
  selectedstate: number = 0;
  selectedstatef: number = 0;
  selectedstateg: number = 0;
  selectedstateh: number = 0;
  selectedstateq: number = 0;
  selectedstatepl: number = 0;
  GetPaymentDetails: any = [];

  CityData: any = [];
  schdata: any = [];
  selectedcity: number = 0;
  selectedcityf: number = 0;
  selectedcityg: number = 0;
  selectedcityh: number = 0;
  selectedcityq: number = 0;
  selectedcitypl: number = 0;


  SchoolData: any = [];
  classdat: any = [];
  ClassData: any = [];
  streamdat: any = [];
  StreamData: any = [];
  selectedschool: number = 0;
  selectedschoolf: number = 0;
  selectedschoolg: number = 0;
  selectedschoolh: number = 0;
  selectedschoolq: number = 0;

  selectedclass: number = 0;
  selectedclassf: number = 0;
  selectedclassg: number = 0;
  selectedclassh: number = 0;
  selectedclassi: number = 0;
  selectedclassj: number = 0;
  selectedclassq: number = 0;
  selectedclasspl: number = 0;


  selectedstream: number = 0;
  selectedstreamf: number = 0;
  selectedstreamg: number = 0;
  selectedstreamh: number = 0;
  selectedstreami: number = 0;
  selectedstreamj: number = 0;
  selectedstreamq: number = 0;
  selectedstreampl: number = 0;


  getunregisteredstudent: any = [];
  Getstudentdetails: any = [];
  getfreeuser: any = [];
  GetFreeUserDetails: any = [];
  getnotsubclickpaid: any = [];
  GetClickPaidNotSub: any = [];
  GetSubscribed: any = [];
  getsubscribeduser: any = [];
  getscholarshipdata: any = [];
  GetScholarshipDetails: any = [];
  getentrancedata: any = [];
  GetEntranceExamDetails: any = [];
  noofsummerschool: number = 0;
  Schooldetails: any = [];
  summercountdetails: any = [];
  SummerData: any = [];
  SummerSchoolData: any = [];
  selectedcountry: number = 0;
  location: number = 0;
  city: number = 0;
  univercity: number = 0;
  UniversityData: any = [];
  CityDataCareer: any = [];
  LocationData: any = [];
  CountryData: any = [];
  selectedinterest: number = 0;
  AreaData: number = 0;
  AreaDetails: any = [];
  CountryDetails: any = [];
  locdata: any = [];
  univdata: any = [];
  getsummerschooldata: any = [];
  GetSummerSchoolDetails: any = [];
  studata: any = [];
  StudentDatas: any = [];
  getquerydata: any = [];
  GetQueryDetails: any = [];
  selectedcareer: string = "";
  CareerData: any = [];
  keyword: string = "";
  careerdta: any = [];
  getfaqdata: any = [];
  GetFaqDetails: any = [];
  selectedcareer1: string = "";
  getfaqissuedata: any = [];
  GetFaqissueDetails: any = [];
  keyword1: string = "";
  getarticledata: any = [];
  GetArticleDetails: any = [];
  Coachtypedetails: any = [];
  TopicData: any = [];
  Coachdetail: any = [];
  CoachData: any = [];
  selectedtopic: number = 0;
  selectedcoach: number = 0;
  getcoachdata: any = [];
  GetcoachDetails: any = [];
  getplaceddata: any = [];
  GetplacedDetails: any = [];
  getdatapaid: any = [];
  getclickdata: any = [];
  GetClickDetails: any = [];
  getbuilderdata: any = [];
  GetBuilderDetails: any = [];
  selectedcat: number = 0;
  selectedsubcat: number = 0;
  selectedstatus: number = 0;
  getusagedata: any = [];
  GetUsageDetails: any = [];

  constructor(private http: HttpClient, private router: Router, private localstorage: LocalStorageService, private toaster: ToastrService, private loader: NgxUiLoaderService, config: NgbTimepickerConfig, private config1: NgbDatepickerConfig) {
    config.seconds = false;
    config.spinners = false;
    config.meridian = true;



    //const current = new Date();
    //config1.minDate = {
    //  year: current.getFullYear(), month:
    //    current.getMonth() + 1, day: current.getDate()
    //};
    ////config.maxDate = { year: 2099, month: 12, day: 31 };
    //config1.outsideDays = 'hidden';

  }
  ngOnInit() {
    this.GetAppDownloadCount();
    this.GetSummerSchoolCount();
    this.BindState();
    this.BindClass();
    this.BindStream();
    this.getArea();
    this.getcareer();
    this.BindCoachType();
    //this.GetPaidDetails();

   // this.SubscribedButNot(3);
  }


  GetPaidDetails() {
    if (this.selectedclassq == 0 || this.selectedclassq == undefined) {
      this.selectedclassq = 0
    }
    if (this.selectedstreamq == 0 || this.selectedstreamq == undefined) {
      this.selectedstreamq = 0
    }
    if (this.selectedstateq == 0 || this.selectedstateq == undefined) {
      this.selectedstateq = 0
    }
    if (this.selectedcityq == 0 || this.selectedcityq == undefined) {
      this.selectedcityq = 0
    }
    if (this.selectedschoolq == 0 || this.selectedschoolq == undefined) {
      this.selectedschoolq = 0
    }
    if (this.selectedstatus == 0 || this.selectedstatus == undefined) {
      this.selectedstatus = 0
    }

    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    var a;
    var tmpclass: any = [];
    this.http.get('api/reports/GetPaidStudentDetails?classid=' + this.selectedclassq + '&streamid=' + this.selectedstreamq + '&stateid=' + this.selectedstateq + '&cityid=' + this.selectedcityq + '&paidstatus=' + this.selectedstatus, options).subscribe(
      (data) => {
        debugger;
        this.getdatapaid = data;
        this.GetPaymentDetails = this.getdatapaid.data;
      }
    )
  }



  DisplaypaymentReport() {
    debugger;

    if (this.selectedclassq == 0 || this.selectedclassq == undefined) {
      this.selectedclassq = 0
    }
    if (this.selectedstreamq == 0 || this.selectedstreamq == undefined) {
      this.selectedstreamq = 0
    }
    if (this.selectedstateq == 0 || this.selectedstateq == undefined) {
      this.selectedstateq = 0
    }
    if (this.selectedcityq == 0 || this.selectedcityq == undefined) {
      this.selectedcityq = 0
    }
    if (this.selectedschoolq == 0 || this.selectedschoolq == undefined) {
      this.selectedschoolq = 0
    }




    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    var a;
    var tmpclass: any = [];
    this.http.get('api/reports/GetQueryReport?classid=' + this.selectedclassq + '&streamid=' + this.selectedstreamq + '&stateid=' + this.selectedstateq + '&cityid=' + this.selectedcityq + '&enddate=' + this.e_date.toString(), options).subscribe(
      (data) => {
        debugger;
        this.getquerydata = data;
        this.GetQueryDetails = this.getquerydata.data;
      }
    )
  }






  BindCoachType() {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };

    var a;
    var tmpclass: any = [];
    this.http.get('api/lifecoachactivity/BindCoachType', options).subscribe(
      (data) => {
        debugger;
        this.Coachtypedetails = data;

        this.TopicData = this.Coachtypedetails.data;

      }
    )
  }


  BindCoach() {
    debugger;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };

    var body = {
      "coachtypeid": this.selectedtopic
    }
    var tmpclass: any = [];
    this.http.post('api/lifecoachactivity/BindCoach', body, options).subscribe(

      (data) => {
        this.Coachdetail = data;
        this.CoachData = this.Coachdetail.data;
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
  BindCityCareer() {
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

  BindState() {
    debugger;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    this.statedat = [];

    var tmpclass: any = [];
    this.http.post('api/addstudentpartner/Bindstate', options).subscribe(

      (data) => {
        this.statedat = data;
        if (this.statedat.Status == true) {
          this.StateData = this.statedat.data;
        }
        else {
          this.StateData = this.statedat.data;
        }
      }
    )
  }

  BindCity() {
    debugger;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    this.citdata = [];
    var body = {

      "stateid": this.selectedstate
    }
    var tmpclass: any = [];
    this.http.post('api/addstudentpartner/BindCity', body, options).subscribe(

      (data) => {
        this.citdata = data;
        if (this.citdata.Status == true) {
          this.CityData = this.citdata.data;
        }
        else {
          this.CityData = this.citdata.data;
        }
      }
    )
  }

  BindCityf() {
    debugger;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    this.citdata = [];
    var body = {

      "stateid": this.selectedstatef
    }
    var tmpclass: any = [];
    this.http.post('api/addstudentpartner/BindCity', body, options).subscribe(

      (data) => {
        this.citdata = data;
        if (this.citdata.Status == true) {
          this.CityData = this.citdata.data;
        }
        else {
          this.CityData = this.citdata.data;
        }
      }
    )
  }


  BindCityg() {
    debugger;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    this.citdata = [];
    var body = {

      "stateid": this.selectedstateg
    }
    var tmpclass: any = [];
    this.http.post('api/addstudentpartner/BindCity', body, options).subscribe(

      (data) => {
        this.citdata = data;
        if (this.citdata.Status == true) {
          this.CityData = this.citdata.data;
        }
        else {
          this.CityData = this.citdata.data;
        }
      }
    )
  }


  BindCityh() {
    debugger;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    this.citdata = [];
    var body = {

      "stateid": this.selectedstateh
    }
    var tmpclass: any = [];
    this.http.post('api/addstudentpartner/BindCity', body, options).subscribe(

      (data) => {
        this.citdata = data;
        if (this.citdata.Status == true) {
          this.CityData = this.citdata.data;
        }
        else {
          this.CityData = this.citdata.data;
        }
      }
    )
  }

  BindCityq() {
    debugger;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    this.citdata = [];
    var body = {

      "stateid": this.selectedstateq
    }
    var tmpclass: any = [];
    this.http.post('api/addstudentpartner/BindCity', body, options).subscribe(

      (data) => {
        this.citdata = data;
        if (this.citdata.Status == true) {
          this.CityData = this.citdata.data;
        }
        else {
          this.CityData = this.citdata.data;
        }
      }
    )
  }

  BindCitypl() {
    debugger;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    this.citdata = [];
    var body = {

      "stateid": this.selectedstatepl
    }
    var tmpclass: any = [];
    this.http.post('api/addstudentpartner/BindCity', body, options).subscribe(

      (data) => {
        this.citdata = data;
        if (this.citdata.Status == true) {
          this.CityData = this.citdata.data;
        }
        else {
          this.CityData = this.citdata.data;
        }
      }
    )
  }



  BindSchool() {
    debugger;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    this.schdata = [];
    var body = {

      "stateid": this.selectedstate,
      "cityid": this.selectedcity
    }
    var tmpclass: any = [];
    this.http.post('api/addstudentpartner/BindSchool', body, options).subscribe(

      (data) => {
        this.schdata = data;
        if (this.schdata.Status == true) {
          this.SchoolData = this.schdata.data;
        }
        else {
          this.SchoolData = this.schdata.data;
        }
      }
    )
  }

  BindSchoolf() {
    debugger;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    this.schdata = [];
    var body = {

      "stateid": this.selectedstatef,
      "cityid": this.selectedcityf
    }
    var tmpclass: any = [];
    this.http.post('api/addstudentpartner/BindSchool', body, options).subscribe(

      (data) => {
        this.schdata = data;
        if (this.schdata.Status == true) {
          this.SchoolData = this.schdata.data;
        }
        else {
          this.SchoolData = this.schdata.data;
        }
      }
    )
  }


  BindSchoolg() {
    debugger;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    this.schdata = [];
    var body = {

      "stateid": this.selectedstateg,
      "cityid": this.selectedcityg
    }
    var tmpclass: any = [];
    this.http.post('api/addstudentpartner/BindSchool', body, options).subscribe(

      (data) => {
        this.schdata = data;
        if (this.schdata.Status == true) {
          this.SchoolData = this.schdata.data;
        }
        else {
          this.SchoolData = this.schdata.data;
        }
      }
    )
  }


  BindSchoolh() {
    debugger;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    this.schdata = [];
    var body = {

      "stateid": this.selectedstateh,
      "cityid": this.selectedcityh
    }
    var tmpclass: any = [];
    this.http.post('api/addstudentpartner/BindSchool', body, options).subscribe(

      (data) => {
        this.schdata = data;
        if (this.schdata.Status == true) {
          this.SchoolData = this.schdata.data;
        }
        else {
          this.SchoolData = this.schdata.data;
        }
      }
    )
  }

  BindSchoolq() {
    debugger;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    this.schdata = [];
    var body = {

      "stateid": this.selectedstateq,
      "cityid": this.selectedcityq
    }
    var tmpclass: any = [];
    this.http.post('api/addstudentpartner/BindSchool', body, options).subscribe(

      (data) => {
        this.schdata = data;
        if (this.schdata.Status == true) {
          this.SchoolData = this.schdata.data;
        }
        else {
          this.SchoolData = this.schdata.data;
        }
      }
    )
  }



  BindClass() {
    debugger;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    this.classdat = [];

    var tmpclass: any = [];
    this.http.post('api/addstudent/Bindclass', options).subscribe(

      (data) => {
        this.classdat = data;
        if (this.classdat.Status == true) {
          this.ClassData = this.classdat.data;
        }
        else {
          this.ClassData = this.classdat.data;
        }
      }
    )
  }
  //binds  stream code
  BindStream() {
    debugger;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    this.streamdat = [];

    var tmpclass: any = [];
    this.http.post('api/addstudentpartner/BindStream', options).subscribe(

      (data) => {
        debugger;
        this.streamdat = data;
        if (this.streamdat.Status == true) {
          this.StreamData = this.streamdat.data;
        }
        else {
          this.StreamData = this.streamdat.data;
        }
      }
    )
  }


  getcareer() {
    debugger;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    this.classdat = [];

    var tmpclass: any = [];
    this.http.post('api/addstudentpartner/BindCareer', options).subscribe(

      (data) => {
        this.careerdta = data;
        if (this.careerdta.Status == true) {
          this.CareerData = this.careerdta.data;
        }
        else {
          this.CareerData = this.careerdta.data;
        }
      }
    )
  }



  GetSummerSchoolCount() {
    debugger;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    var a;
    var tmpclass: any = [];
    this.http.get('api/reports/GetCountSummerSchool', options).subscribe(
      (data) => {
        debugger;
        this.Schooldetails = data;

        this.summercountdetails = this.Schooldetails;
        this.noofsummerschool = this.summercountdetails.data[0].noofschool;
 
      }
    )
  }


  GetAppDownloadCount() {
    debugger;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    var a;
    var tmpclass: any = [];
    this.http.get('api/reports/GetCountStudent', options).subscribe(
      (data) => {
        debugger;
        this.studentdetails = data;

        this.countdetails = this.studentdetails;
        this.noofappdownloader = this.countdetails.data[0].noofregstudent;
        this.noofnotregistered = this.countdetails.data[0].noofnotregstudent;
        this.noofthroughapp = this.countdetails.data[0].noofaddfromapp;
        this.noofbackend = this.countdetails.data[0].noofaddfrombackend;




      }
    )
  }

  AppDownloder(i:number) {
    debugger;
    var index = i;

    if (index == 1) {
      if (this.SelectedDate == undefined) {
        this.s_date = "1900-01-01";
      }
      else {
        this.s_date = this.SelectedDate.toISOString().slice(0, 10);

      }
      if (this.SelectedEndDate == undefined) {
        this.e_date = "1900-01-01";
      }
      else {
        this.e_date = this.SelectedEndDate.toISOString().slice(0, 10);
      }
    }

    if (index == 2) {
      if (this.SelectedDate1 == undefined) {
        this.s_date = "1900-01-01";
      }
      else {
        this.s_date = this.SelectedDate1.toISOString().slice(0, 10);

      }
      if (this.SelectedEndDate1 == undefined) {
        this.e_date = "1900-01-01";
      }
      else {
        this.e_date = this.SelectedEndDate1.toISOString().slice(0, 10);
      }
    }

    if (index == 3) {
      if (this.SelectedDate2 == undefined) {
        this.s_date = "1900-01-01";
      }
      else {
        this.s_date = this.SelectedDate2.toISOString().slice(0, 10);

      }
      if (this.SelectedEndDate2 == undefined) {
        this.e_date = "1900-01-01";
      }
      else {
        this.e_date = this.SelectedEndDate2.toISOString().slice(0, 10);
      }
    }


    if (index == 4) {
      if (this.SelectedDate3 == undefined) {
        this.s_date = "1900-01-01";
      }
      else {
        this.s_date = this.SelectedDate3.toISOString().slice(0, 10);

      }
      if (this.SelectedEndDate3 == undefined) {
        this.e_date = "1900-01-01";
      }
      else {
        this.e_date = this.SelectedEndDate3.toISOString().slice(0, 10);
      }
    }
  




    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    this.http.get('api/reports/appdownloader?id=' + index + '&startdate=' + this.s_date.toString() + '&enddate=' + this.e_date.toString(), options).subscribe(

    //this.http.get('api/reports/appdownloader?id=' + index, options).subscribe(

      (data) => {
        debugger;
        this.DownloaderData = data;
        this.AppDownloaderData = this.DownloaderData.data;

      }
    )
  }


  SubscribedButNot(i: number) {
    debugger;
    var index = i;
    if (this.selectedstate == 0 || this.selectedstate == undefined) {
      this.selectedstate=0
    }
    if (this.selectedcity == 0 || this.selectedcity == undefined) {
      this.selectedcity = 0
    }
    if (this.selectedschool == 0 || this.selectedschool == undefined) {
      this.selectedschool = 0
    }
    if (this.selectedclass == 0 || this.selectedclass == undefined) {
      this.selectedclass = 0
    }
    if (this.selectedstream == 0 || this.selectedstream == undefined) {
      this.selectedstream = 0
    }

    if (this.SelectedDate3 == undefined) {
      this.s_date = "1900-01-01";
    }
    else {
      this.s_date = this.SelectedDate3.toISOString().slice(0, 10);

    }
    if (this.SelectedEndDate3 == undefined) {
      this.e_date = "1900-01-01";
    }
    else {
      this.e_date = this.SelectedEndDate3.toISOString().slice(0, 10);
    }






    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    var a;
    var tmpclass: any = [];
    this.http.get('api/reports/GetUnRegisteredStudent?stateid=' + this.selectedstate + '&cityid=' + this.selectedcity + ' &schoolid=' + this.selectedschool + '&classid=' + this.selectedclass + '&streamid=' + this.selectedstream + '&id=' + index +'&startdate=' + this.s_date.toString() + '&enddate=' + this.e_date.toString(), options).subscribe(
      (data) => {
        debugger;
        this.getunregisteredstudent = data;

        this.Getstudentdetails = this.getunregisteredstudent.data;
      




      }
    )
  }


  FreeUser(i: number) {
    debugger;
    var index = i;
    if (this.selectedstatef == 0 || this.selectedstatef == undefined) {
      this.selectedstatef = 0
    }
    if (this.selectedcityf == 0 || this.selectedcityf == undefined) {
      this.selectedcityf = 0
    }
    if (this.selectedschoolf == 0 || this.selectedschoolf == undefined) {
      this.selectedschoolf = 0
    }
    if (this.selectedclassf == 0 || this.selectedclassf == undefined) {
      this.selectedclassf = 0
    }
    if (this.selectedstreamf == 0 || this.selectedstreamf == undefined) {
      this.selectedstreamf = 0
    }

    if (this.SelectedDate7 == undefined) {
      this.s_date = "1900-01-01";
    }
    else {
      this.s_date = this.SelectedDate7.toISOString().slice(0, 10);

    }
    if (this.SelectedEndDate8 == undefined) {
      this.e_date = "1900-01-01";
    }
    else {
      this.e_date = this.SelectedEndDate8.toISOString().slice(0, 10);
    }






    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    var a;
    var tmpclass: any = [];
    this.http.get('api/reports/GetFreeUser?stateid=' + this.selectedstatef + '&cityid=' + this.selectedcityf + ' &schoolid=' + this.selectedschoolf + '&classid=' + this.selectedclassf + '&streamid=' + this.selectedstreamf + '&id=' + index + '&startdate=' + this.s_date.toString() + '&enddate=' + this.e_date.toString(), options).subscribe(
      (data) => {
        debugger;
        this.getfreeuser = data;

        this.GetFreeUserDetails = this.getfreeuser.data;





      }
    )
  }


  ClickPaidNotSub(i: number) {
    debugger;
    var index = i;
    if (this.selectedstateg == 0 || this.selectedstateg == undefined) {
      this.selectedstateg = 0
    }
    if (this.selectedcityg == 0 || this.selectedcityg == undefined) {
      this.selectedcityg = 0
    }
    if (this.selectedschoolg == 0 || this.selectedschoolg == undefined) {
      this.selectedschoolg = 0
    }
    if (this.selectedclassg == 0 || this.selectedclassg == undefined) {
      this.selectedclassg = 0
    }
    if (this.selectedstreamg == 0 || this.selectedstreamg == undefined) {
      this.selectedstreamg = 0
    }

    if (this.SelectedDate9 == undefined) {
      this.s_date = "1900-01-01";
    }
    else {
      this.s_date = this.SelectedDate9.toISOString().slice(0, 10);

    }
    if (this.SelectedEndDate10 == undefined) {
      this.e_date = "1900-01-01";
    }
    else {
      this.e_date = this.SelectedEndDate10.toISOString().slice(0, 10);
    }

    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    var a;
    var tmpclass: any = [];
    this.http.get('api/reports/GetClickPaidNotSub?stateid=' + this.selectedstateg + '&cityid=' + this.selectedcityg + ' &schoolid=' + this.selectedschoolg + '&classid=' + this.selectedclassg + '&streamid=' + this.selectedstreamg + '&id=' + index + '&startdate=' + this.s_date.toString() + '&enddate=' + this.e_date.toString(), options).subscribe(
      (data) => {
        debugger;
        this.getnotsubclickpaid = data;
        this.GetClickPaidNotSub = this.getnotsubclickpaid.data;
      }
    )
  }



  SubscribedUser(i: number) {
    debugger;
    var index = i;
    if (this.selectedstateh == 0 || this.selectedstateh == undefined) {
      this.selectedstateh = 0
    }
    if (this.selectedcityh == 0 || this.selectedcityh == undefined) {
      this.selectedcityh = 0
    }
    if (this.selectedschoolh == 0 || this.selectedschoolh == undefined) {
      this.selectedschoolh = 0
    }
    if (this.selectedclassh == 0 || this.selectedclassh == undefined) {
      this.selectedclassh = 0
    }
    if (this.selectedstreamh == 0 || this.selectedstreamh == undefined) {
      this.selectedstreamh = 0
    }

    if (this.SelectedDate11 == undefined) {
      this.s_date = "1900-01-01";
    }
    else {
      this.s_date = this.SelectedDate11.toISOString().slice(0, 10);

    }
    if (this.SelectedEndDate12 == undefined) {
      this.e_date = "1900-01-01";
    }
    else {
      this.e_date = this.SelectedEndDate12.toISOString().slice(0, 10);
    }

    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    var a;
    var tmpclass: any = [];
    this.http.get('api/reports/GetSubscribedUsers?stateid=' + this.selectedstateh + '&cityid=' + this.selectedcityh + ' &schoolid=' + this.selectedschoolh + '&classid=' + this.selectedclassh + '&streamid=' + this.selectedstreamh + '&id=' + index + '&startdate=' + this.s_date.toString() + '&enddate=' + this.e_date.toString(), options).subscribe(
      (data) => {
        debugger;
        this.getsubscribeduser = data;
        this.GetSubscribed = this.getsubscribeduser.data;
      }
    )
  }

  GetScholarship() {
    debugger;
  
    if (this.selectedclassi == 0 || this.selectedclassi == undefined) {
      this.selectedclassi = 0
    }
    if (this.selectedstreami == 0 || this.selectedstreami == undefined) {
      this.selectedstreami = 0
    }

    if (this.SelectedDate13 == undefined) {
      this.s_date = "1900-01-01";
    }
    else {
      this.s_date = this.SelectedDate13.toISOString().slice(0, 10);

    }
    if (this.SelectedEndDate14 == undefined) {
      this.e_date = "1900-01-01";
    }
    else {
      this.e_date = this.SelectedEndDate14.toISOString().slice(0, 10);
    }

    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    var a;
    var tmpclass: any = [];
    this.http.get('api/reports/GetScholarship?classid=' + this.selectedclassi + '&stream=' + this.selectedstreami + '&startdate=' + this.s_date.toString() + '&enddate=' + this.e_date.toString(), options).subscribe(
      (data) => {
        debugger;
        this.getscholarshipdata = data;
        this.GetScholarshipDetails = this.getscholarshipdata.data;
      }
    )
  }


  GetEntranceExam() {
    debugger;

    if (this.selectedclassj == 0 || this.selectedclassj == undefined) {
      this.selectedclassj = 0
    }
    if (this.selectedstreamj == 0 || this.selectedstreamj == undefined) {
      this.selectedstreamj = 0
    }

    if (this.SelectedDate15 == undefined) {
      this.s_date = "1900-01-01";
    }
    else {
      this.s_date = this.SelectedDate15.toISOString().slice(0, 10);

    }
    if (this.SelectedEndDate16 == undefined) {
      this.e_date = "1900-01-01";
    }
    else {
      this.e_date = this.SelectedEndDate16.toISOString().slice(0, 10);
    }

    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    var a;
    var tmpclass: any = [];
    this.http.get('api/reports/GetEntranceExam?classid=' + this.selectedclassj + '&stream=' + this.selectedstreamj + '&startdate=' + this.s_date.toString() + '&enddate=' + this.e_date.toString(), options).subscribe(
      (data) => {
        debugger;
        this.getentrancedata = data;
        this.GetEntranceExamDetails = this.getentrancedata.data;
      }
    )
  }



  GetSummer(i: number) {
    debugger;
    var index = i;

    if (index == 1) {
      if (this.SelectedDate17 == undefined) {
        this.s_date = "1900-01-01";
      }
      else {
        this.s_date = this.SelectedDate17.toISOString().slice(0, 10);

      }
      if (this.SelectedEndDate18 == undefined) {
        this.e_date = "1900-01-01";
      }
      else {
        this.e_date = this.SelectedEndDate18.toISOString().slice(0, 10);
      }
    }

    





    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    this.http.get('api/reports/GetAddSummerSchool?id=' + index + '&startdate=' + this.s_date.toString() + '&enddate=' + this.e_date.toString(), options).subscribe(

      //this.http.get('api/reports/appdownloader?id=' + index, options).subscribe(

      (data) => {
        debugger;
        this.SummerData = data;
        this.AppDownloaderData = this.SummerData.data;

      }
    )
  }



  GetSummerList() {
    debugger;

    if (this.selectedinterest == 0 || this.selectedinterest == undefined) {
      this.selectedinterest = 0
    }
    if (this.selectedcountry == 0 || this.selectedcountry == undefined) {
      this.selectedcountry = 0
    }
    if (this.location == 0 || this.location == undefined) {
      this.location = 0
    }
    if (this.city == 0 || this.city == undefined) {
      this.city = 0
    }
    if (this.univercity == 0 || this.univercity == undefined) {
      this.univercity = 0
    }

    if (this.SelectedDate19 == undefined) {
      this.s_date = "1900-01-01";
    }
    else {
      this.s_date = this.SelectedDate19.toISOString().slice(0, 10);

    }
    if (this.SelectedEndDate20 == undefined) {
      this.e_date = "1900-01-01";
    }
    else {
      this.e_date = this.SelectedEndDate20.toISOString().slice(0, 10);
    }

    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    var a;
    var tmpclass: any = [];
    this.http.get('api/reports/GetSummerSchool?countryid=' + this.selectedcountry + '&stateid=' + this.location + '&cityid=' + this.city + '&universityid=' + this.univercity + '&interestarea=' + this.selectedinterest + '&startdate=' + this.s_date.toString() + '&enddate=' + this.e_date.toString(), options).subscribe(
      (data) => {
        debugger;
        this.getsummerschooldata = data;
        this.GetSummerSchoolDetails = this.getsummerschooldata.data;
      }
    )
  }



  GetQueryReport() {
    debugger;

    if (this.selectedclassq == 0 || this.selectedclassq == undefined) {
      this.selectedclassq = 0
    }
    if (this.selectedstreamq == 0 || this.selectedstreamq == undefined) {
      this.selectedstreamq = 0
    }
    if (this.selectedstateq == 0 || this.selectedstateq == undefined) {
      this.selectedstateq = 0
    }
    if (this.selectedcityq == 0 || this.selectedcityq == undefined) {
      this.selectedcityq = 0
    }
    if (this.selectedschoolq == 0 || this.selectedschoolq == undefined) {
      this.selectedschoolq = 0
    }
    if (this.selectedstudentq == 0 || this.selectedstudentq == undefined) {
      this.selectedstudentq = 0
    }

    if (this.SelectedDate21 == undefined) {
      this.s_date = "1900-01-01";
    }
    else {
      this.s_date = this.SelectedDate21.toISOString().slice(0, 10);

    }
    if (this.SelectedEndDate22 == undefined) {
      this.e_date = "1900-01-01";
    }
    else {
      this.e_date = this.SelectedEndDate22.toISOString().slice(0, 10);
    }

    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    var a;
    var tmpclass: any = [];
    this.http.get('api/reports/GetQueryReport?classid=' + this.selectedclassq + '&streamid=' + this.selectedstreamq + '&stateid=' + this.selectedstateq + '&cityid=' + this.selectedcityq + '&schoolid=' + this.selectedschoolq + '&studentid=' + this.selectedstudentq + '&startdate=' + this.s_date.toString() + '&enddate=' + this.e_date.toString(), options).subscribe(
      (data) => {
        debugger;
        this.getquerydata = data;
        this.GetQueryDetails = this.getquerydata.data;
      }
    )
  }




  GetUsagePatternReport() {
    debugger;

    if (this.selectedclassq == 0 || this.selectedclassq == undefined) {
      this.selectedclassq = 0
    }
    if (this.selectedstreamq == 0 || this.selectedstreamq == undefined) {
      this.selectedstreamq = 0
    }
    if (this.selectedstateq == 0 || this.selectedstateq == undefined) {
      this.selectedstateq = 0
    }
    if (this.selectedcityq == 0 || this.selectedcityq == undefined) {
      this.selectedcityq = 0
    }
    if (this.selectedschoolq == 0 || this.selectedschoolq == undefined) {
      this.selectedschoolq = 0
    }
    if (this.selectedstudentq == 0 || this.selectedstudentq == undefined) {
      this.selectedstudentq = 0
    }

  

    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    var a;
    var tmpclass: any = [];
    this.http.get('api/reports/GetUsagepatternReport?classid=' + this.selectedclassq + '&streamid=' + this.selectedstreamq + '&stateid=' + this.selectedstateq + '&cityid=' + this.selectedcityq + '&schoolid=' + this.selectedschoolq + '&studentid=' + this.selectedstudentq , options).subscribe(
      (data) => {
        debugger;
        this.getusagedata = data;
        this.GetUsageDetails = this.getusagedata.data;
      }
    )
  }






  BindStudentq() {
    debugger;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    this.schdata = [];
    var body = {

      "stateid": this.selectedstateq,
      "cityid": this.selectedcityq,
      "schoolid": this.selectedschoolq,
      "classid": this.selectedclassq,
      "streamid": this.selectedstreamq
    }
    var tmpclass: any = [];
    this.http.post('api/addstudentpartner/BindStudent', body, options).subscribe(

      (data) => {
        this.studata = data;
        if (this.studata.Status == true) {
          this.StudentDatas = this.studata.data;
        }
        else {
          this.StudentDatas = this.studata.data;
        }
      }
    )
  }

  GetFaqReport() {
    debugger;

    if (this.selectedcareer == "" || this.selectedcareer == undefined) {
      this.selectedcareer = "";
    }

    if (this.keyword == "" || this.keyword == undefined) {
      this.keyword = "";
    }
 

    if (this.SelectedDate23 == undefined) {
      this.s_date = "1900-01-01";
    }
    else {
      this.s_date = this.SelectedDate23.toISOString().slice(0, 10);

    }
    if (this.SelectedEndDate24 == undefined) {
      this.e_date = "1900-01-01";
    }
    else {
      this.e_date = this.SelectedEndDate24.toISOString().slice(0, 10);
    }

    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    var a;
    var tmpclass: any = [];
    this.http.get('api/reports/GetFaqData?careername=' + this.selectedcareer + '&keyword=' + this.keyword + '&startdate=' + this.s_date.toString() + '&enddate=' + this.e_date.toString(), options).subscribe(
      (data) => {
        debugger;
        this.getfaqdata = data;
        this.GetFaqDetails = this.getfaqdata.data;
      }
    )
  }


  GetFaqIssueReport() {
    debugger;

    if (this.selectedcareer1 == "" || this.selectedcareer1 == undefined) {
      this.selectedcareer1 = "";
    }



    if (this.SelectedDate25 == undefined) {
      this.s_date = "1900-01-01";
    }
    else {
      this.s_date = this.SelectedDate25.toISOString().slice(0, 10);

    }
    if (this.SelectedEndDate26 == undefined) {
      this.e_date = "1900-01-01";
    }
    else {
      this.e_date = this.SelectedEndDate26.toISOString().slice(0, 10);
    }

    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    var a;
    var tmpclass: any = [];
    this.http.get('api/reports/GetFaqIssueData?careername=' + this.selectedcareer1 + '&startdate=' + this.s_date.toString() + '&enddate=' + this.e_date.toString(), options).subscribe(
      (data) => {
        debugger;
        this.getfaqissuedata = data;
        this.GetFaqissueDetails = this.getfaqissuedata.data;
      }
    )
  }



  GetArticleReport() {
    debugger;

    if (this.keyword1 == "" || this.keyword1 == undefined) {
      this.keyword1 = "";
    }



    if (this.SelectedDate27 == undefined) {
      this.s_date = "1900-01-01";
    }
    else {
      this.s_date = this.SelectedDate27.toISOString().slice(0, 10);

    }
    if (this.SelectedEndDate28 == undefined) {
      this.e_date = "1900-01-01";
    }
    else {
      this.e_date = this.SelectedEndDate28.toISOString().slice(0, 10);
    }

    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    var a;
    var tmpclass: any = [];
    this.http.get('api/reports/GetArticleData?keyword=' + this.keyword1 + '&startdate=' + this.s_date.toString() + '&enddate=' + this.e_date.toString(), options).subscribe(
      (data) => {
        debugger;
        this.getarticledata = data;
        this.GetArticleDetails = this.getarticledata.data;
      }
    )
  }


  GetCoachList() {
    debugger;

    if (this.selectedtopic == 0 || this.selectedtopic == undefined) {
      this.selectedtopic = 0;
    }
    if (this.selectedcoach == 0 || this.selectedcoach == undefined) {
      this.selectedcoach = 0;
    }



    if (this.SelectedDate29 == undefined) {
      this.s_date = "1900-01-01";
    }
    else {
      this.s_date = this.SelectedDate29.toISOString().slice(0, 10);

    }
    if (this.SelectedEndDate30 == undefined) {
      this.e_date = "1900-01-01";
    }
    else {
      this.e_date = this.SelectedEndDate30.toISOString().slice(0, 10);
    }

    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    var a;
    var tmpclass: any = [];
    this.http.get('api/reports/GetCoachData?coachtype=' + this.selectedtopic + '&coach=' + this.selectedcoach + '&startdate=' + this.s_date.toString() + '&enddate=' + this.e_date.toString(), options).subscribe(
      (data) => {
        debugger;
        this.getcoachdata = data;
        this.GetcoachDetails = this.getcoachdata.data;
      }
    )
  }

  GetPlacement() {
    debugger;

    if (this.selectedstatepl == 0 || this.selectedstatepl == undefined) {
      this.selectedstatepl = 0;
    }
    if (this.selectedcitypl == 0 || this.selectedcitypl == undefined) {
      this.selectedcitypl = 0;
    }
    if (this.selectedclasspl == 0 || this.selectedclasspl == undefined) {
      this.selectedclasspl = 0;
    }
    if (this.selectedstreampl == 0 || this.selectedstreampl == undefined) {
      this.selectedstreampl = 0;
    }


 

    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    var a;
    var tmpclass: any = [];
    this.http.get('api/reports/GetPlacementData?stateid=' + this.selectedstatepl + '&cityid=' + this.selectedcitypl + '&classid=' + this.selectedclasspl + '&streamid=' + this.selectedstreampl, options).subscribe(
      (data) => {
        debugger;
        this.getplaceddata = data;
        this.GetplacedDetails = this.getplaceddata.data;
      }
    )
  }



  ReadMoreCompAndScholarship() {
    debugger;

    if (this.selectedclassq == 0 || this.selectedclassq == undefined) {
      this.selectedclassq = 0
    }
    if (this.selectedstreamq == 0 || this.selectedstreamq == undefined) {
      this.selectedstreamq = 0
    }


    if (this.SelectedDate51 == undefined) {
      this.s_date = "1900-01-01";
    }
    else {
      this.s_date = this.SelectedDate51.toISOString().slice(0, 10);

    }
    if (this.SelectedDate52 == undefined) {
      this.e_date = "1900-01-01";
    }
    else {
      this.e_date = this.SelectedDate52.toISOString().slice(0, 10);
    }

    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    var a;
    var tmpclass: any = [];
    this.http.get('api/reports/GetClickReport?classid=' + this.selectedclassq + '&streamid=' + this.selectedstreamq + '&startdate=' + this.s_date.toString() + '&enddate=' + this.e_date.toString(), options).subscribe(
      (data) => {
        debugger;
        this.getclickdata = data;
        this.GetClickDetails = this.getclickdata.data;
      }
    )
  }


  ReadMoreEntranceRxam() {
    debugger;

    if (this.selectedclassq == 0 || this.selectedclassq == undefined) {
      this.selectedclassq = 0
    }
    if (this.selectedstreamq == 0 || this.selectedstreamq == undefined) {
      this.selectedstreamq = 0
    }


    if (this.SelectedDate54 == undefined) {
      this.s_date = "1900-01-01";
    }
    else {
      this.s_date = this.SelectedDate54.toISOString().slice(0, 10);

    }
    if (this.SelectedDate55 == undefined) {
      this.e_date = "1900-01-01";
    }
    else {
      this.e_date = this.SelectedDate55.toISOString().slice(0, 10);
    }

    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    var a;
    var tmpclass: any = [];
    this.http.get('api/reports/GetClickEntranceReport?classid=' + this.selectedclassq + '&streamid=' + this.selectedstreamq + '&startdate=' + this.s_date.toString() + '&enddate=' + this.e_date.toString(), options).subscribe(
      (data) => {
        debugger;
        this.getclickdata = data;
        this.GetClickDetails = this.getclickdata.data;
      }
    )
  }



  GetSummerClickData() {
    debugger;

  

    if (this.SelectedDate59 == undefined) {
      this.s_date = "1900-01-01";
    }
    else {
      this.s_date = this.SelectedDate59.toISOString().slice(0, 10);

    }
    if (this.SelectedDate60 == undefined) {
      this.e_date = "1900-01-01";
    }
    else {
      this.e_date = this.SelectedDate60.toISOString().slice(0, 10);
    }

    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    var a;
    var tmpclass: any = [];
    this.http.get('api/reports/GetClickSummerReport?startdate=' + this.s_date.toString() + '&enddate=' + this.e_date.toString(), options).subscribe(
      (data) => {
        debugger;
        this.getclickdata = data;
        this.GetClickDetails = this.getclickdata.data;
      }
    )
  }

  Getbuldingusage() {
    debugger;

    if (this.selectedstatepl == 0 || this.selectedstatepl == undefined) {
      this.selectedstatepl = 0;
    }
    if (this.selectedcitypl == 0 || this.selectedcitypl == undefined) {
      this.selectedcitypl = 0;
    }
    if (this.selectedclasspl == 0 || this.selectedclasspl == undefined) {
      this.selectedclasspl = 0;
    }
    if (this.selectedstreampl == 0 || this.selectedstreampl == undefined) {
      this.selectedstreampl = 0;
    }
    if (this.selectedbuilder == 0 || this.selectedbuilder == undefined) {
      this.selectedbuilder = 0;
    }




    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    var a;
    var tmpclass: any = [];
    this.http.get('api/reports/GetBuildingUsageData?stateid=' + this.selectedstatepl + '&cityid=' + this.selectedcitypl + '&classid=' + this.selectedclasspl + '&streamid=' + this.selectedstreampl + '&op=' + this.selectedbuilder, options).subscribe(
      (data) => {
        debugger;
        this.getbuilderdata = data;
        this.GetBuilderDetails = this.getbuilderdata.data;
      }
    )
  }





  GetMaterialusage() {
    debugger;

    if (this.selectedstatepl == 0 || this.selectedstatepl == undefined) {
      this.selectedstatepl = 0;
    }
    if (this.selectedcitypl == 0 || this.selectedcitypl == undefined) {
      this.selectedcitypl = 0;
    }
    if (this.selectedclasspl == 0 || this.selectedclasspl == undefined) {
      this.selectedclasspl = 0;
    }
    if (this.selectedstreampl == 0 || this.selectedstreampl == undefined) {
      this.selectedstreampl = 0;
    }
    if (this.selectedcat == 0 || this.selectedcat == undefined) {
      this.selectedcat = 0;
    }
    if (this.selectedsubcat == 0 || this.selectedsubcat == undefined) {
      this.selectedsubcat = 0;
    }




    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    var a;
    var tmpclass: any = [];
    this.http.get('api/reports/GetMaterialUsageData?stateid=' + this.selectedstatepl + '&cityid=' + this.selectedcitypl + '&classid=' + this.selectedclasspl + '&streamid=' + this.selectedstreampl + '&category=' + this.selectedbuilder + '&subcategory=' + this.selectedsubcat, options).subscribe(
      (data) => {
        debugger;
        this.getbuilderdata = data;
        this.GetBuilderDetails = this.getbuilderdata.data;
      }
    )
  }

  ResetPpaymentReport() {
    this.GetPaymentDetails = [];
  }

  ResetUsageReport() {
    this.selectedstateq = 0;
    this.selectedcityq = 0;
    this.selectedschoolq = 0;
    this.selectedstudentq = 0;
    this.selectedclassq = 0;
    this.selectedstreamq = 0;
    this.selectedstudentq = 0;
  
    this.GetUsageDetails = [];
  }

  ResetMaterial() {
    this.selectedstatepl = 0;
    this.selectedcitypl = 0;
    this.selectedclasspl = 0;
    this.selectedstreampl = 0;
    this.selectedbuilder = 0;
    this.selectedcat = 0;
    this.selectedsubcat = 0;
    this.GetBuilderDetails = [];
  }


  ResetBulder() {
    this.selectedstatepl = 0;
    this.selectedcitypl = 0;
    this.selectedclasspl = 0;
    this.selectedstreampl = 0;
    this.selectedbuilder = 0;
    this.GetBuilderDetails = [];
  }
  ResetPlacement() {
    this.selectedstatepl = 0;
    this.selectedcitypl = 0;
    this.selectedclasspl = 0;
    this.selectedstreampl = 0;
    this.GetplacedDetails = [];
  }
  ResetCoach() {
    this.selectedtopic = 0;
    this.selectedcoach = 0;
    this.SelectedDate29 = null;
    this.SelectedEndDate30 = null;
    this.GetcoachDetails = [];
  }


  ResetArticleReport() {
    this.keyword1 = "";
    this.SelectedDate27 = null;
    this.SelectedEndDate28 = null;
    this.GetArticleDetails = [];
  }

  ResetFaqIssueReport() {
    this.selectedcareer1 = "";
    this.SelectedDate25 = null;
    this.SelectedEndDate26 = null;
    this.GetFaqissueDetails = [];
  }
  ResetFaqReport() {
    this.selectedcareer = "";
    this.keyword = "";
    this.SelectedDate23 = null;
    this.SelectedEndDate24 = null;
    this.GetFaqDetails = [];
  }


  ResetClickReport() {
   
    this.selectedclassq = 0;
    this.selectedstreamq = 0;
    this.selectedstudentq = 0;
    this.SelectedDate51 = null;
    this.SelectedDate52 = null;
    this.GetClickDetails = [];
  }





  ResetQueryReport() {
    this.selectedstateq = 0;
    this.selectedcityq = 0;
    this.selectedschoolq = 0;
    this.selectedstudentq = 0;
    this.selectedclassq = 0;
    this.selectedstreamq = 0;
    this.selectedstudentq = 0;
    this.SelectedDate21 = null;
    this.SelectedEndDate22 = null;
    this.GetQueryDetails = [];
  }


  ResetSummer() {
    this.selectedcountry = 0;
    this.location = 0;
    this.city = 0;
    this.univercity = 0;
    this.selectedinterest = 0;
    this.SelectedDate19 = null;
    this.SelectedEndDate20 = null;
    this.GetSummerSchoolDetails = [];
  }


  OnSummerClear() {
   
    this.SelectedDate17 = null;
    this.SelectedEndDate18 = null;
    this.AppDownloaderData = [];
  }


  ResetScholarship() {

    this.selectedclassi = 0;
    this.selectedstreami = 0;
    this.SelectedDate13 = null;
    this.SelectedEndDate14 = null;
    this.GetScholarshipDetails = [];
  }
  ResetEntrance() {

    this.selectedclassj = 0;
    this.selectedstreamj = 0;
    this.SelectedDate15 = null;
    this.SelectedEndDate16 = null;
    this.GetEntranceExamDetails = [];
  }


  onClear() {
    this.SelectedDate = null;
    this.SelectedEndDate = null;
    this.SelectedDate1 = null;
    this.SelectedEndDate1 = null;
    this.SelectedDate2 = null;
    this.SelectedEndDate2 = null;
    this.SelectedDate3 = null;
    this.SelectedEndDate3 = null;
    this.s_date = null;
    this.e_date = null;
  }
  Reset() {
    this.selectedstate = 0;
    this.selectedschool = 0;
    this.selectedcity = 0;
    this.selectedclass = 0;
    this.selectedstream = 0;
    this.SelectedDate5 = null;
    this.SelectedEndDate6 = null;
    this.Getstudentdetails = [];
    //this.SubscribedButNot(3);
  }

  ResetFreeUser() {
    this.selectedstatef = 0;
    this.selectedschoolf = 0;
    this.selectedcityf = 0;
    this.selectedclassf = 0;
    this.selectedstreamf = 0;
    this.SelectedDate7 = null;
    this.SelectedEndDate8 = null;
    this.GetFreeUserDetails = [];
    //this.SubscribedButNot(3);
  }
  RestNotSub() {
    this.selectedstateg = 0;
    this.selectedschoolg= 0;
    this.selectedcityg= 0;
    this.selectedclassg = 0;
    this.selectedstreamg = 0;
    this.SelectedDate9 = null;
    this.SelectedEndDate10 = null;
    this.GetClickPaidNotSub = [];
  }
  RestSubscribed() {
    this.selectedstateh = 0;
    this.selectedschoolh = 0;
    this.selectedcityh = 0;
    this.selectedclassh = 0;
    this.selectedstreamh = 0;
    this.SelectedDate11 = null;
    this.SelectedEndDate12 = null;
    this.GetSubscribed = [];
  }

}
