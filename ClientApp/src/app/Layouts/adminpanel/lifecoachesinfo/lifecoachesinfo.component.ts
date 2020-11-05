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
  selector: 'app-lifecoachesinfo',
  templateUrl: './lifecoachesinfo.component.html'
})
export class lifecoachesinfo implements OnInit {
  selectedtopic: number = 0;
  TopicData: any = [];
  selectedcoach: number = 0;
  CoachData: any = [];
  inttitle: string = "";
  Selectedintfile: any = [];
  intsubtitle: string = "";
  ButtonInterviewsText: string = "Save";
  GetSaveData: any = [];
  journeytitle: string = "";
  Selectedjourneyfile: any = [];
  jousubtitle: string = "";
  ButtonjourneyText: string = "Save";
  GetSaveJourneyData: any = [];
  articletitle: string = "";
  Selectedarticlefile: any = [];
  articlesubtitle: string = "";
  ButtonarticleText: string = "Save";
  @ViewChild('intfile', { static: true }) private myintfileVariabl: ElementRef;
  @ViewChild('journeyfile', { static: true }) private myintfileVariabl1: ElementRef;
  @ViewChild('articlefile', { static: true }) private myintfileVariabl2: ElementRef;
  pdffileint: any = [];
  inttoupload: any = [];
  orgintname: string = "";
  pdffilejou: any = [];
  joutoupload: any = [];
  orgjouname: string = "";
  Coachtypedetails: any = [];
  Coachdetail: any = [];
  lifeinterviewid: number = 0;
  interviewdata: any = [];
  Details: any = [];
  EditInterviewData: any = [];
  dleteinterviewdata: any = [];
  journeyid: number = 0;
  journeydata: any = [];
  journeydetails: any = [];
  EditJourneyData: any = [];
  dletejourneydata: any = [];
  articleid: number = 0;
  articledata: any = [];
  pdffilearticle: any = [];
  articletoupload: any = [];
  orgarticle: string = "";
  GetSaveArticleData: any = [];
  Articledetails: any = [];
  EditArticleData: any = [];
  dletearticledata: any = [];
  constructor(private http: HttpClient, private router: Router, private localstorage: LocalStorageService, private toaster: ToastrService, private loader: NgxUiLoaderService) {

  }
  ngOnInit() {
    this.BindCoachType();
    this.BindInterviewData();
    this.BindJourneyData();
    this.BindArticleData();

  }
  GetIntDetail(event) {
    debugger;
    this.pdffileint = event
    let fileint = event.target.files[0];
    let fileListint: FileList = event.target.files;
    this.inttoupload = fileListint[0];
    if (fileint.type.includes("pdf") || fileint.type.includes("doc") || fileint.type.includes("docx")) {

      this.orgintname = fileint.name;
    }
    else {
      Swal.fire("", "Please select file", "error");
      this.myintfileVariabl.nativeElement.value = "";
    }
  }
  GetjourneyDetail(event) {
    debugger;
    this.pdffilejou = event
    let filejou = event.target.files[0];
    let fileListjou: FileList = event.target.files;
    this.joutoupload = fileListjou[0];
    if (filejou.type.includes("pdf") || filejou.type.includes("doc") || filejou.type.includes("docx")) {

      this.orgjouname = filejou.name;
    }
    else {
      Swal.fire("", "Please select file", "error");
      this.myintfileVariabl1.nativeElement.value = "";
    }
  }

  GetarticleDetail(event) {
    debugger;
    this.pdffilearticle = event
    let filearticle = event.target.files[0];
    let fileListarticle: FileList = event.target.files;
    this.articletoupload = fileListarticle[0];
    if (filearticle.type.includes("pdf") || filearticle.type.includes("doc") || filearticle.type.includes("docx")) {

      this.orgarticle = filearticle.name;
    }
    else {
      Swal.fire("", "Please select file", "error");
      this.myintfileVariabl2.nativeElement.value = "";
    }
  }

  BindCoachType() {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };

    var a;
    var tmpclass: any = [];
    this.http.get('api/lifecoachesinfo/BindCoachType', options).subscribe(
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
      "coachtype": this.selectedtopic
    }
    var tmpclass: any = [];
    this.http.post('api/lifecoachesinfo/BindCoach', body, options).subscribe(

      (data) => {
        this.Coachdetail = data;
        this.CoachData = this.Coachdetail.data;
      }
    )
  }



  //save interview data
  InterviewSave() {
    if (this.ButtonInterviewsText == "Save") {
      if (this.selectedtopic == 0 || this.selectedtopic == undefined) {
        Swal.fire("", "Please select coach type", "error");
        return;
      }
      if (this.selectedcoach == 0 || this.selectedcoach == undefined) {
        Swal.fire("", "Please select coach", "error");
        return;
      }
      if (this.inttitle == "" || this.inttitle == undefined) {
        Swal.fire("", "Please define title", "error");
        return;
      }

      if (this.intsubtitle == "" || this.intsubtitle == undefined) {
        Swal.fire("", "Please entrt subtitle", "error");
        return;
      }



      let input = new FormData();


      input.append("pdf", this.inttoupload);
      input.append("orgpdfname", this.orgintname.toString());

      input.append("lifeinterviewid", this.lifeinterviewid.toString());

      input.append("coachtypeid", this.selectedtopic.toString());
      input.append("coachname", this.selectedcoach.toString());

      input.append("title", this.inttitle.toString());
      input.append("subtitle", this.intsubtitle.toString());

      input.append("createdby", this.localstorage.get("userid").toString());

      this.http.post('api/lifecoachesinfo/saveinterviewdata', input)
        .subscribe(
          (data) => {
            debugger;
            this.interviewdata = data;
            if (this.interviewdata.length > 10) {
              Swal.fire("", "Saved Successfully", "success");
              this.onClearInterviews();
              this.BindInterviewData();
              return;
            }

          })


    }
    else {

      if (this.selectedtopic == 0 || this.selectedtopic == undefined) {
        Swal.fire("", "Please select coach type", "error");
        return;
      }
      if (this.selectedcoach == 0 || this.selectedcoach == undefined) {
        Swal.fire("", "Please select coach", "error");
        return;
      }
      if (this.inttitle == "" || this.inttitle == undefined) {
        Swal.fire("", "Please define title", "error");
        return;
      }

      if (this.intsubtitle == "" || this.intsubtitle == undefined) {
        Swal.fire("", "Please entrt subtitle", "error");
        return;
      }
      let input = new FormData();


      input.append("pdf", this.inttoupload);
      input.append("orgpdfname", this.orgintname.toString());

      input.append("lifeinterviewid", this.lifeinterviewid.toString());

      input.append("coachtypeid", this.selectedtopic.toString());
      input.append("coachname", this.selectedcoach.toString());

      input.append("title", this.inttitle.toString());
      input.append("subtitle", this.intsubtitle.toString());

      input.append("createdby", this.localstorage.get("userid").toString());

      this.http.post('api/lifecoachesinfo/updateinterviewdata', input)
        .subscribe(
          (data) => {
            debugger;
            this.interviewdata = data;
            if (this.interviewdata.length > 10) {
              Swal.fire("", "Updated Successfully", "success");
              this.onClearInterviews();
              this.BindInterviewData();
              return;
            }

          })

    }
  }

  BindInterviewData() {
    debugger;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    this.Details = [];

    this.http.get('api/lifecoachesinfo/Bindtabledata', options).subscribe(
      (data) => {
        debugger;
        this.Details = data;
        this.GetSaveData = this.Details.data;


      }
    )
  }

  EditInterview(i: number, Id) {
    debugger;
    this.ButtonInterviewsText = 'Update';
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };

    this.http.get('api/lifecoachesinfo/GetEditInterviewData?lifeinterviewid=' + Id, options).subscribe(
      (data) => {
        debugger;
        this.EditInterviewData = data;
        if (this.EditInterviewData.Status == true) {
          this.BindCoachType();
          this.selectedtopic = this.EditInterviewData.data.coachtypeid;
          this.BindCoach();
          this.selectedcoach = this.EditInterviewData.data.coachid;
          this.inttitle = this.EditInterviewData.data.title;
          this.intsubtitle = this.EditInterviewData.data.subtitle;
          this.lifeinterviewid = this.EditInterviewData.data.lifeinterviewid;

        }
      }
    )
  }

  DeleteInterview(i: number, Id) {
    var data;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };

    data =
    {
      "lifeinterviewid": Id
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
        this.http.post('api/lifecoachesinfo/Deleteinterviewdata', body, options).subscribe(
          (data) => {
            this.dleteinterviewdata = data;
            if (this.dleteinterviewdata.Status == true) {
              Swal.fire("", "Deleted Successfully", "success");
              this.BindInterviewData();
              return;
            }
          }
        )
      }
    })


  }




  onClearInterviews() {
    this.selectedtopic = 0;
    this.selectedcoach = 0;
    this.inttitle = "";
    this.intsubtitle = "";
    this.inttoupload = [];
    this.orgintname = "";
    this.ButtonInterviewsText = "Save";
    this.myintfileVariabl.nativeElement.value = "";
    this.BindInterviewData();
  }


  //Coding for save journey data
  journeySave() {
    if (this.ButtonjourneyText == "Save") {
      if (this.selectedtopic == 0 || this.selectedtopic == undefined) {
        Swal.fire("", "Please select coach type", "error");
        return;
      }
      if (this.selectedcoach == 0 || this.selectedcoach == undefined) {
        Swal.fire("", "Please select coach", "error");
        return;
      }
      if (this.journeytitle == "" || this.journeytitle == undefined) {
        Swal.fire("", "Please define title", "error");
        return;
      }

      if (this.jousubtitle == "" || this.jousubtitle == undefined) {
        Swal.fire("", "Please entrt subtitle", "error");
        return;
      }



      let input = new FormData();


      input.append("pdf", this.joutoupload);
      input.append("orgpdfname", this.orgjouname.toString());

      input.append("journeyid", this.journeyid.toString());

      input.append("coachtypeid", this.selectedtopic.toString());
      input.append("coachname", this.selectedcoach.toString());

      input.append("title", this.journeytitle.toString());
      input.append("subtitle", this.jousubtitle.toString());

      input.append("createdby", this.localstorage.get("userid").toString());

      this.http.post('api/lifecoachesinfo/savejourneydata', input)
        .subscribe(
          (data) => {
            debugger;
            this.journeydata = data;
            if (this.journeydata.length > 10) {
              Swal.fire("", "Saved Successfully", "success");
              this.onClearInterviews();
              this.BindJourneyData();
              return;
            }

          })


    }
    else {

      if (this.selectedtopic == 0 || this.selectedtopic == undefined) {
        Swal.fire("", "Please select coach type", "error");
        return;
      }
      if (this.selectedcoach == 0 || this.selectedcoach == undefined) {
        Swal.fire("", "Please select coach", "error");
        return;
      }
      if (this.journeytitle == "" || this.journeytitle == undefined) {
        Swal.fire("", "Please define title", "error");
        return;
      }

      if (this.jousubtitle == "" || this.jousubtitle == undefined) {
        Swal.fire("", "Please entrt subtitle", "error");
        return;
      }
      let input = new FormData();


      input.append("pdf", this.joutoupload);
      input.append("orgpdfname", this.orgjouname.toString());

      input.append("journeyid", this.journeyid.toString());

      input.append("coachtypeid", this.selectedtopic.toString());
      input.append("coachname", this.selectedcoach.toString());

      input.append("title", this.journeytitle.toString());
      input.append("subtitle", this.jousubtitle.toString());

      input.append("createdby", this.localstorage.get("userid").toString());

      this.http.post('api/lifecoachesinfo/updatejourneydata', input)
        .subscribe(
          (data) => {
            debugger;
            this.journeydata = data;
            if (this.journeydata.length > 10) {
              Swal.fire("", "Updated Successfully", "success");
              this.onClearInterviews();
              this.BindJourneyData();
              return;
            }

          })

    }
  }

  BindJourneyData() {
    debugger;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };


    this.http.get('api/lifecoachesinfo/Bindjourneytabledata', options).subscribe(
      (data) => {
        debugger;
        this.journeydetails = data;
        this.GetSaveJourneyData = this.journeydetails.data;


      }
    )
  }

  EditJourney(i: number, Id) {
    debugger;
    this.ButtonjourneyText = 'Update';
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };

    this.http.get('api/lifecoachesinfo/GetEditjourneyData?journeyid=' + Id, options).subscribe(
      (data) => {
        debugger;
        this.EditJourneyData = data;
        if (this.EditJourneyData.Status == true) {
          this.BindCoachType();
          this.selectedtopic = this.EditJourneyData.data.coachtypeid;
          this.BindCoach();
          this.selectedcoach = this.EditJourneyData.data.coachid;
          this.journeytitle = this.EditJourneyData.data.title;
          this.jousubtitle = this.EditJourneyData.data.subtitle;
          this.journeyid = this.EditJourneyData.data.journeyid;

        }
      }
    )
  }

  DeleteJourney(i: number, Id) {
    var data;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };

    data =
    {
      "journeyid": Id
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
        this.http.post('api/lifecoachesinfo/Deletejourneydata', body, options).subscribe(
          (data) => {
            this.dletejourneydata = data;
            if (this.dletejourneydata.Status == true) {
              Swal.fire("", "Deleted Successfully", "success");
              this.BindJourneyData();
              return;
            }
          }
        )
      }
    })


  }

  onClearJOurney() {
    this.selectedtopic = 0;
    this.selectedcoach = 0;
    this.journeytitle = "";
    this.jousubtitle = "";
    this.joutoupload = [];
    this.orgjouname = "";
    this.ButtonjourneyText = "Save";
    this.myintfileVariabl1.nativeElement.value = "";
    this.BindJourneyData();
  }



  //coding for article data

  articleSave() {
    if (this.ButtonarticleText == "Save") {
      if (this.selectedtopic == 0 || this.selectedtopic == undefined) {
        Swal.fire("", "Please select coach type", "error");
        return;
      }
      if (this.selectedcoach == 0 || this.selectedcoach == undefined) {
        Swal.fire("", "Please select coach", "error");
        return;
      }
      if (this.articletitle == "" || this.articletitle == undefined) {
        Swal.fire("", "Please define title", "error");
        return;
      }

      if (this.articlesubtitle == "" || this.articlesubtitle == undefined) {
        Swal.fire("", "Please entrt subtitle", "error");
        return;
      }



      let input = new FormData();


      input.append("pdf", this.articletoupload);
      input.append("orgpdfname", this.orgarticle.toString());

      input.append("articleid", this.articleid.toString());

      input.append("coachtypeid", this.selectedtopic.toString());
      input.append("coachname", this.selectedcoach.toString());

      input.append("title", this.articletitle.toString());
      input.append("subtitle", this.articlesubtitle.toString());

      input.append("createdby", this.localstorage.get("userid").toString());

      this.http.post('api/lifecoachesinfo/savearticledata', input)
        .subscribe(
          (data) => {
            debugger;
            this.articledata = data;
            if (this.articledata.length > 10) {
              Swal.fire("", "Saved Successfully", "success");
              this.onClearArticle();
              this.BindArticleData();
              return;
            }

          })


    }
    else {

      if (this.selectedtopic == 0 || this.selectedtopic == undefined) {
        Swal.fire("", "Please select coach type", "error");
        return;
      }
      if (this.selectedcoach == 0 || this.selectedcoach == undefined) {
        Swal.fire("", "Please select coach", "error");
        return;
      }
      if (this.articletitle == "" || this.articletitle == undefined) {
        Swal.fire("", "Please define title", "error");
        return;
      }

      if (this.articlesubtitle == "" || this.articlesubtitle == undefined) {
        Swal.fire("", "Please entrt subtitle", "error");
        return;
      }
      let input = new FormData();


      input.append("pdf", this.articletoupload);
      input.append("orgpdfname", this.orgarticle.toString());

      input.append("articleid", this.articleid.toString());

      input.append("coachtypeid", this.selectedtopic.toString());
      input.append("coachname", this.selectedcoach.toString());

      input.append("title", this.articletitle.toString());
      input.append("subtitle", this.articlesubtitle.toString());

      input.append("createdby", this.localstorage.get("userid").toString());

      this.http.post('api/lifecoachesinfo/updatearticledata', input)
        .subscribe(
          (data) => {
            debugger;
            this.articledata = data;
            if (this.articledata.length > 10) {
              Swal.fire("", "Updated Successfully", "success");
              this.onClearArticle();
              this.BindArticleData();
              return;
            }

          })

    }
  }
  onClearArticle() {
    this.selectedtopic = 0;
    this.selectedcoach = 0;
    this.articletitle = "";
    this.articlesubtitle = "";
    this.articletoupload = [];
    this.orgarticle = "";
    this.ButtonjourneyText = "Save";
    this.myintfileVariabl2.nativeElement.value = "";
    this.BindArticleData();
  }


  BindArticleData() {
    debugger;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };


    this.http.get('api/lifecoachesinfo/BindArticletabledata', options).subscribe(
      (data) => {
        debugger;
        this.Articledetails = data;
        this.GetSaveArticleData = this.Articledetails.data;


      }
    )
  }

  EditArticle(i: number, Id) {
    debugger;
    this.ButtonarticleText = 'Update';
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };

    this.http.get('api/lifecoachesinfo/GetEditArticleidData?articleid=' + Id, options).subscribe(
      (data) => {
        debugger;
        this.EditArticleData = data;
        if (this.EditArticleData.Status == true) {
          this.BindCoachType();
          this.selectedtopic = this.EditArticleData.data.coachtypeid;
          this.BindCoach();
          this.selectedcoach = this.EditArticleData.data.coachid;
          this.articletitle = this.EditArticleData.data.title;
          this.articlesubtitle = this.EditArticleData.data.subtitle;
          this.articleid = this.EditArticleData.data.articleid;

        }
      }
    )
  }

  DeleteArticle(i: number, Id) {
    var data;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };

    data =
    {
      "articleid": Id
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
        this.http.post('api/lifecoachesinfo/DeleteArticledata', body, options).subscribe(
          (data) => {
            this.dletearticledata = data;
            if (this.dletearticledata.Status == true) {
              Swal.fire("", "Deleted Successfully", "success");
              this.BindArticleData();
              return;
            }
          }
        )
      }
    })


  }







}
