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




@Component({
  selector: 'app-lifecoachinformation',
  templateUrl: './lifecoachinformation.component.html',
  //styleUrls: ['./webinar.component.css']
})
export class lifecoachinformation implements OnInit {
  public selectedagenda: number = 0;
  public AgendaDetails: any = [];
  public AgendaData: any = [];
  public topic: string = "";
  public ButtonInterviewText: string = "Save";
  public selectedcareer: number = 0;
  public selectedtopic: number = 0;
  public topicdata: any = [];
  public videolink: string = "";
  public SelectedImage: string = "";
  public GetSaveData: any = [];
  public careerdata: any = [];
  public TopicDetails: any = [];
  public TopicData: any = [];
  public CareerDetails: any = [];
  public pdffile: any = [];
  public pdftoupload: any;
  public orgpdfname: string = "";
  public lifecoachesdata: any = [];
  public coachid: number = 0;
  public Details: any = [];
  public GetEditedData: any = [];
  public DeletedData: any = [];
  public url: string = "";
  public yt: any;
  @ViewChild('inputfile', { static: true }) private myInputVariabl: ElementRef;

  public AllCareer: boolean = false;
  public careerid: string = "";
  coachname: string = "";
  mobileno: string = "";
  email: string = "";
  fbid: string = "";
  linkedin: string = "";
  description: string = "";
  ButtonInterviewsText: string = "Save";
  ButtonarticleText: string = "Save";

  inttitle: string = "";
  Selectedintfile: any = [];
  intdescription: string = "";
  @ViewChild('intfile', { static: true }) private myintfileVariabl: ElementRef;
  pdffileint: any = [];
  inttoupload: any = [];
  orgintname: string = "";
  interviewrecord: number = 0;
  EditLifeInterviewData: any = [];
  interviewid: number;
  journeytitle: string = "";
  journeydescription: string = "";
  ButtonjourneyText: string = "Save";
  GetSaveJourneyData: any = [];
  journeyid: number = 0;


  constructor(private http: HttpClient, private router: Router, private localstorage: LocalStorageService, private toaster: ToastrService, private loader: NgxUiLoaderService) {

  }
  ngOnInit() {
    this.getTopic();
    this.BindAgenda();
    this.getCareer();
    this.BindInterviewData();

  }

  //bind topic
  getTopic() {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    this.TopicDetails = [];
    var a;
    var tmpclass: any = [];
    this.http.get('api/lifecoachinformation/BindTopic', options).subscribe(
      (data) => {
        this.TopicDetails = data;

        this.TopicData = this.TopicDetails;

      }
    )
  }
  BindAgenda() {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    this.AgendaDetails = [];
    var a;
    var tmpclass: any = [];
    this.http.get('api/lifecoachinformation/BindAgenda', options).subscribe(
      (data) => {
        this.AgendaDetails = data;

        this.AgendaData = this.AgendaDetails;

      }
    )
  }
  //bind career
  getCareer() {
    debugger;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    this.TopicDetails = [];
    var a;
    var tmpclass: any = [];
    this.http.get('api/lifecoachinformation/BindCareer', options).subscribe(
      (data) => {

        this.CareerDetails = data;

        this.careerdata = this.CareerDetails;
        this.BindInterviewData();
      }
    )
  }
  
  
  SelectAllCareer() {
    debugger;
    this.careerid = "";
    if (this.AllCareer === true) {
      for (var i = 0; i < this.careerdata.length; i++) {
        this.careerdata[i].selected = true;
        if (this.careerid === '') {
          this.careerid = this.careerdata[i].careerid;
        }
        else {
          this.careerid = this.careerid + ',' + this.careerdata[i].careerid;
        }
      }
    }
    else {
      for (var i = 0; i < this.careerdata.length; i++) {
        this.careerdata[i].selected = false;
      }
    }

  }

  getSelectedCareer() {
    debugger;
    this.careerid = "";
    var count = 0;
    for (var i = 0; i < this.careerdata.length; i++) {

      if (this.careerdata[i].selected === true) {

        if (this.careerid === '') {
          this.careerid = this.careerdata[i].careerid;
          count++;
        }
        else {
          this.careerid = this.careerid + ',' + this.careerdata[i].careerid;
          count++;
        }
      }
    }
    if (this.careerdata.length === count) {
      this.AllCareer = true;
    }
    else {
      this.AllCareer = false;
    }

  }

  //get pdf details

  GetPhotoDetail(event) {
    debugger;
    this.pdffile = event
    let file = event.target.files[0];
    let fileList: FileList = event.target.files;
    this.pdftoupload = fileList[0];
    if (file.type.includes("png") || file.type.includes("jpg") || file.type.includes("jpeg")) {

      this.orgpdfname = file.name;
    }
    else {
      Swal.fire("", "Please select file", "error");
      this.myInputVariabl.nativeElement.value = "";
    }
  }

  //get interview details
  GetIntDetail(event) {
    debugger;
    this.pdffileint = event
    let fileint = event.target.files[0];
    let fileListint: FileList = event.target.files;
    this.inttoupload = fileListint[0];
    if (fileint.type.includes("pdf") || fileint.type.includes("")) {

      this.orgintname = fileint.name;
    }
    else {
      Swal.fire("", "Please select file", "error");
      this.myintfileVariabl.nativeElement.value = "";
    }
  }

  //save life coaches
  InterviewSave() {
    debugger;
    if (this.ButtonInterviewsText == "Save") {

      if (this.selectedtopic == 0 || this.selectedtopic == undefined) {
        Swal.fire("", "Please select coach type", "error");
        return;
      }
      if (this.selectedagenda == 0 || this.selectedagenda == undefined) {
        Swal.fire("", "Please select Agenda type", "error");
        return;
      }
      if (this.topic == "" || this.topic == undefined) {
        Swal.fire("", "Please enter topic name", "error");
        return;
      }
      if (this.coachname == "" || this.coachname == undefined) {
        Swal.fire("", "Please enter coach name", "error");
        return;
      }
      if (this.coachname.match(/[ˆ(\d|+|\-)]/)) {
        Swal.fire("", "Name should not contain digit", "error");
        return;
      }
      else {

      }
      if (this.mobileno == "" || this.mobileno == undefined) {
        Swal.fire("", "Please enter mobile no", "error");
        return;
      }


      if (!this.mobileno.match(/^(\+\d{1,3}[- ]?)?\d{10}$/)) {
        Swal.fire("", "Please enter valid mobile no ", "error");
        return;
      }
      if (this.email == "" || this.email == undefined) {
        Swal.fire("", "Please enter email", "error");
        return;
      }
      if (!this.email.match('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')) {
        Swal.fire("", "Please enter valid email", "error");
        return;
      }
      if (this.fbid == "" || this.fbid == undefined) {
        Swal.fire("", "Please enter facebook id", "error");
        return;
      }
      if (this.linkedin == "" || this.linkedin == undefined) {
        Swal.fire("", "Please enter linkedin id", "error");
        return;
      }
      if (this.orgpdfname == "" || this.orgpdfname == undefined) {
        Swal.fire("", "Please select file", "error");
        return;
      }
      if (this.careerid == "" || this.careerid == undefined) {
        Swal.fire("", "Please select career", "error");
        return;
      }

      if (this.description == "" || this.description == undefined) {
        Swal.fire("", "Please enter description", "error");
        return;
      }


      let input = new FormData();
      input.append("photo", this.pdftoupload);

      input.append("orgphotoname", this.orgpdfname.toString());

      input.append("coachtype", this.selectedtopic.toString());
      input.append("agendatype", this.selectedagenda.toString());
      input.append("topic", this.topic.toString());

      input.append("coachname", this.coachname.toString());
      input.append("mobileno", this.mobileno.toString());
      input.append("email", this.email.toString());
      input.append("fbid", this.fbid.toString());
      input.append("linkedin", this.linkedin.toString());
      input.append("careerid", this.careerid.toString());
      input.append("description", this.description.toString());

      input.append("createdby", this.localstorage.get("userid").toString());
      this.http.post('api/lifecoachinformation/savelifecoachesdata', input)
        .subscribe(
          (data) => {
            debugger;
            this.lifecoachesdata = data;
            if (this.lifecoachesdata.Status == true) {
              if (this.lifecoachesdata.Message == "Coach Details Already Exists") {

                Swal.fire("", "Coach Details Already Exists", "success");
                this.onClearInterviews();

                return;
              }
              else {

                Swal.fire("", "Successfully Saved", "success");

                this.onClearInterviews();
                this.BindInterviewData();
                return;
              }
            }

          })
        
    }
    else {
      debugger;
      if (this.selectedtopic == 0 || this.selectedtopic == undefined) {
        Swal.fire("", "Please select coach type", "error");
        return;
      }
      if (this.selectedagenda == 0 || this.selectedagenda == undefined) {
        Swal.fire("", "Please select Agenda type", "error");
        return;
      }
      if (this.topic == "" || this.topic == undefined) {
        Swal.fire("", "Please enter topic name", "error");
        return;
      }
      if (this.coachname == "" || this.coachname == undefined) {
        Swal.fire("", "Please enter coach name", "error");
        return;
      }
      if (this.coachname.match(/[ˆ(\d|+|\-)]/)) {
        Swal.fire("", "Name should not contain digit", "error");
        return;
      }
      else {

      }
      if (this.mobileno == "" || this.mobileno == undefined) {
        Swal.fire("", "Please enter mobile no", "error");
        return;
      }
      if (this.email == "" || this.email == undefined) {
        Swal.fire("", "Please enter email", "error");
        return;
      }
      if (this.fbid == "" || this.fbid == undefined) {
        Swal.fire("", "Please enter facebook id", "error");
        return;
      }
      if (this.linkedin == "" || this.linkedin == undefined) {
        Swal.fire("", "Please enter linkedin id", "error");
        return;
      }

      if (this.careerid == "" || this.careerid == undefined) {
        Swal.fire("", "Please select career", "error");
        return;
      }

      if (this.description == "" || this.description == undefined) {
        Swal.fire("", "Please enter description", "error");
        return;
      }
      if (!this.email.match('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')) {
        Swal.fire("", "Please enter valid email", "error");
        return;
      }

      if (!this.mobileno.match(/^(\+\d{1,3}[- ]?)?\d{10}$/)) {
        Swal.fire("", "Please enter valid mobile no ", "error");
        return;
      }


      let input = new FormData();
      input.append("interviewid", this.interviewid.toString());
      input.append("photo", this.pdftoupload);

      input.append("orgphotoname", this.orgpdfname.toString());

      input.append("coachtype", this.selectedtopic.toString());
      input.append("agendatype", this.selectedagenda.toString());
      input.append("topic", this.topic.toString());
      input.append("coachname", this.coachname.toString());
      input.append("mobileno", this.mobileno.toString());
      input.append("email", this.email.toString());
      input.append("fbid", this.fbid.toString());
      input.append("linkedin", this.linkedin.toString());
      input.append("careerid", this.careerid.toString());
      input.append("description", this.description.toString());

      input.append("createdby", this.localstorage.get("userid").toString());



      this.http.post('api/lifecoachinformation/updatelifecoachesdata', input)
         .subscribe(
           (data) => {
             debugger;
             this.lifecoachesdata = data;
             if (this.lifecoachesdata.Status == true) {
               if (this.lifecoachesdata.Message == "Coach Details Already Exists") {

                 Swal.fire("", "Coach Details Already Exists", "success");
                 this.onClearInterviews();

                 return;
               }
               else {

                 Swal.fire("", "Successfully Updated", "success");

                 this.onClearInterviews();
                 this.BindInterviewData();
                 return;
               }
             }

           })

    }

  }
  //bind table data
  BindInterviewData() {
    debugger;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    this.Details = [];

    this.http.get('api/lifecoachinformation/BindInterviewData', options).subscribe(
      (data) => {
        debugger;
        this.Details = data;
        this.GetSaveData = this.Details.data;
        this.interviewrecord = this.GetSaveData.length;


        var a;
        var b;
        var c;

        for (var i = 0; i < this.GetSaveData.length; i++) {
          var classname = "";
          var streamname = "";
          var careername = "";
          debugger;
          for (var j = 0; j < this.GetSaveData[i].careername.length; j++) {

            c = this.GetSaveData[i].careername.split(",");
          }



          for (var k = 0; k < c.length; k++) {
            for (var l = 0; l < this.careerdata.length; l++) {
              if (c[k] == this.careerdata[l].careerid) {
                if (k > 0) {
                  careername = careername + ", " + this.careerdata[l].careername;
                }
                else {
                  careername = careername + this.careerdata[l].careername;
                }
              }
            }
          }

          this.GetSaveData[i].careername = careername;

        }





      }
    )
  }

  //Edit interview data
  EditInterview(i: number, Id) {
    debugger;
    this.BindAgenda();
    this.getCareer();
    this.getTopic();
    this.ButtonInterviewsText = 'Update';
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };

    this.http.get('api/lifecoachinformation/GetEditData?interviewid=' + Id, options).subscribe(
      (data) => {
        debugger;
        this.GetEditedData = data;
        if (this.GetEditedData.Status == true) {

          debugger;
          this.EditLifeInterviewData = data;


          this.interviewid = this.EditLifeInterviewData.data.interviewid;
          this.selectedtopic = this.EditLifeInterviewData.data.coachtype;
          this.selectedagenda = this.EditLifeInterviewData.data.agendatype;
          this.topic = this.EditLifeInterviewData.data.topic;

          this.careerid = this.EditLifeInterviewData.data.careerid;
          this.coachname = this.EditLifeInterviewData.data.coachname;
          this.fbid = this.EditLifeInterviewData.data.fbid;

          this.mobileno = this.EditLifeInterviewData.data.mobileno;
          this.email = this.EditLifeInterviewData.data.email;
          this.linkedin = this.EditLifeInterviewData.data.linkedinid;

          this.description = this.EditLifeInterviewData.data.description;



          var tmpCareerid = this.EditLifeInterviewData.data.careerid.split(",");
          for (var i = 0; i < this.careerdata.length; i++) {
            for (var j = 0; j < tmpCareerid.length; j++) {
              if (this.careerdata[i].careerid == tmpCareerid[j]) {
                this.careerdata[i].selected = true;
              }

            }
          }

          if (this.careerdata.length == tmpCareerid.length) {
            this.AllCareer = true;
          }
          else {
            this.AllCareer = false;
          }
        }
      }
    )
  }




  onClearInterviews() {
    this.selectedtopic = 0;
    this.selectedcareer = 0;
    this.selectedagenda = 0;
    this.topic = "";
    this.coachname = "";
    this.fbid = "";
    this.email = "";
    this.linkedin = "";
    this.mobileno = "";
    this.description = "";
    this.inttitle = "";
    this.intdescription = "";
    this.videolink = "";
    this.ButtonInterviewsText = "Save";
    this.myInputVariabl.nativeElement.value = "";

    this.pdftoupload = [];
    this.orgpdfname = "";
    this.ButtonarticleText = "Save";
    this.ButtonjourneyText = "Save";
    this.inttoupload = [];
    this.orgintname = "";
    this.BindInterviewData();
    for (var i = 0; i < this.careerdata.length; i++) {
      this.careerdata[i].selected = false;
      this.AllCareer = false;
    }

  }

  //delete record
  DeleteInterview(i: number, Id) {
    var data;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };

    data =
    {
      "interviewid": Id,

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
        this.http.post('api/lifecoachinformation/DeleteActivity', body, options).subscribe(
          (data) => {
            this.DeletedData = data;
            if (this.DeletedData.Status == true) {
              Swal.fire("", "Deleted Successfully", "success");
              this.BindInterviewData();
              this.onClearInterviews();
              return;
            }
          }
        )
      }
    })

  }




}
