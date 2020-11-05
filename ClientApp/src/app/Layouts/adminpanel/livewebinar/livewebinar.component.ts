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

declare var $: any;






@Component({
  selector: 'app-livewebinar',
  templateUrl: './livewebinar.component.html',
  styleUrls: ['./livewebinar.component.css'],

  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }, NgbTimepickerConfig]
})
export class LiveWebinarManager implements OnInit {
  // public page: number = 0;
  //public pageSize: number = 10;
  GetStudentData: any = [];
  StudentData: any = [];
  studentid: string = "";
  AllStudent: boolean = false;
  public SelectedTopic: number = 0;
  public videofile: any = [];
  public imagefile: any = [];
  public TopicData: any = [];
  public statedat: any = [];
  public StateData: any = [];
  public citdata: any = [];
  public CityData: any = [];
  public selectedstate: number = 0;
  public selectedcity: number = 0;
  public selectedschool: number = 0;
  public schdata: any = [];
  public SchoolData: any = [];
  public Detail: any = [];
  public SelectedClass: number = 0;
  public ClassData: any=[];
  public topicid: number = 0;
  public SelectedStream: number = 0;
  public StreamData: any = [];
  public ButtonText: string = 'Save';
  public HeaderData: any = [];
  public GetSaveData: any = [];
  public SelectedVideo: string = "";
  public SelectedImage: string = "";
  public Id: number = 0;
  //search: string = "";
  public SelectedDate: Date;
  public SelectedEndDate: Date;
  public st_time: Time;

  public end_time: Time;
  public meridian: boolean = true;


  public GetEditedData: any = [];
  public DeletedData: any = [];
  public PlannedActivityData: any = [];
  public orgVideoName: string = "";
  public orgImageName: string = "";
  public ClassDetails: any = [];
  public StreamDetails: any = [];
  public videouploaded: String = "0";
  public videouploaddiv: boolean = false;
  public videoToUpload: any;
  public imageToUpload: any;
  public video: string = "";
  public image: string = "";
  public vname: boolean = false;
  public display: any = "none";
  public url: string = "";
  public yt: any;
  @ViewChild('inputFile', { static: true }) private myInputVariable: ElementRef;
  public Details: any = [];
  public classid: string = "";
  public AllClass: boolean = false;
  public streamid: string = "";
  public AllStream: boolean = false;
  public s_date: any;
  public e_date: any;
  public todaydate: any;
  public starttime: NgbTimeStruct;
  public endtime: NgbTimeStruct;
  public checklink: boolean = false;
  public Selecteduser: number = 0;
  public UserDetails: any = [];
  public UserData: any = [];
  public showstream: number = 0;
  //public publish: number = 0;
  public checklink_v: boolean = false;

  //public publish: boolean = false;
  public publish: number = 0;
  public IsSchool: boolean = false;
  chatlink: string = "";
  StateIds: string = "";
  AllState: boolean = false;
  CityIds: string = "";
  AllCity: boolean = false;
  SchoolIds: string = "";
  AllSchool: boolean = false;
  GetSchoolData: any = [];
  GetCityData: any = [];
  selectedwebtype: number = 0;


  constructor(private http: HttpClient, private router: Router, private localstorage: LocalStorageService, private toaster: ToastrService, private Loader: NgxUiLoaderService, private renderer: Renderer2, config: NgbTimepickerConfig, private config1: NgbDatepickerConfig) {
    config.seconds = false;
    config.spinners = false;
    config.meridian = true;


    const current = new Date();
    config1.minDate = {
      year: current.getFullYear(), month:
        current.getMonth() + 1, day: current.getDate()
    };
    //config.maxDate = { year: 2099, month: 12, day: 31 };
    config1.outsideDays = 'hidden';


  }
  ngOnInit() {
    //this.renderer.setAttribute(this.myDiv.nativeElement, 'innerHTML', this.content);


    this.GetTopic();
    //this.getClass();
    this.GetData();
    //this.BindState();
    this.GetClass();
    this.GetStream();
    this.BindUser();
    this.GetData1();
  }

  BindWebinar(id: number) {
    debugger;
    // this.GetData1();
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    this.Detail = [];

    this.http.get('api/LiveWebinar/GetSavedDataFilter?acttype=' + 'GetSavedData' + '&id=' + id, options).subscribe(
      (data) => {
        debugger;
        this.Detail = data;
        this.GetSaveData = this.Detail.data;
        //if (this.GetSaveData[0].Image == "") {
        //  this.checklink = true;
        //}
        //else {
        //  this.checklink = false;
        //}


        var state;
        var city;
        var school;



        var a;
        var b;
        debugger;
        //this.GetSaveData = data;
        for (var i = 0; i < this.GetSaveData.length; i++) {
          var classname = "";
          var streamname = "";
          for (var j = 0; j < this.GetSaveData[i].Class.length; j++) {
            a = this.GetSaveData[i].Class.split(",");
            b = this.GetSaveData[i].Stream.split(",");
          }
          if (this.ClassData != undefined) {
            for (var k = 0; k < a.length; k++) {
              for (var l = 0; l < this.ClassData.length; l++) {
                if (a[k] == this.ClassData[l].classid) {
                  if (k > 0) {
                    classname = classname + ", " + this.ClassData[l].classname;
                  }
                  else {
                    classname = classname + this.ClassData[l].classname;
                  }
                }
              }
            }
          }
          if (this.StreamData != undefined) {
            for (var k = 0; k < a.length; k++) {
              for (var l = 0; l < this.StreamData.length; l++) {
                if (b[k] == this.StreamData[l].streamid) {
                  if (k > 0) {
                    streamname = streamname + ", " + this.StreamData[l].streamname;
                  }
                  else {
                    streamname = streamname + this.StreamData[l].streamname;
                  }
                }
              }
            }
          }

          this.GetSaveData[i].Class = classname;

          if (classname == "8th" || classname == "9th" || classname == "10th") {
            this.GetSaveData[i].Stream = "";
          }
          else {
            this.GetSaveData[i].Stream = streamname;
          }


        }









        for (var i = 0; i < this.GetSaveData.length; i++) {
          var statename = "";
          var cityname = "";
          var schoolname = "";
          //for (var j = 0; j < this.GetSaveData[i].State.length; j++) {
          state = this.GetSaveData[i].state.split(",");
          city = this.GetSaveData[i].city.split(",");
          school = this.GetSaveData[i].school.split(",");
          //}
          //state
          for (var k = 0; k < state.length; k++) {
            for (var l = 0; l < this.StateData.length; l++) {
              if (state[k] == this.StateData[l].stateId) {
                if (k > 0) {
                  statename = statename + ", " + this.StateData[l].statename;
                }
                else {
                  statename = statename + this.StateData[l].statename;
                }
              }
            }
          }


          //city
          for (var k = 0; k < city.length; k++) {
            for (var l = 0; l < this.CityData.length; l++) {
              if (city[k] == this.CityData[l].cityid) {
                if (k > 0) {
                  cityname = cityname + ", " + this.CityData[l].cityname;
                }
                else {
                  cityname = cityname + this.CityData[l].cityname;
                }
              }
            }
          }
          //school

          for (var k = 0; k < this.SchoolData.length; k++) {
            for (var l = 0; l < this.SchoolData.length; l++) {
              if (school[k] == this.SchoolData[l].schoolid) {
                if (k > 0) {
                  schoolname = schoolname + ", " + this.SchoolData[l].schoolname;
                }
                else {
                  schoolname = schoolname + this.SchoolData[l].schoolname;
                }
              }
            }
          }

          this.GetSaveData[i].statename = statename;
          this.GetSaveData[i].cityname = cityname;
          this.GetSaveData[i].schoolname = schoolname;
        }





        // this.HeaderData = Object.keys(this.GetSaveData[0]);




      }
    )
  }




  GetData1() {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };


    this.http.get('api/Subscription/GetData', options).subscribe(

      (data) => {
        debugger;

        this.Details = data;

        if (this.Details.status = true) {
          this.StateData = this.Details.statedata;
          this.CityData = this.Details.citydata;
          this.SchoolData = this.Details.schooldata;

          this.StudentData = this.Details.studentdata;



        }
        else {
          this.toaster.error(this.Details.message.toString(), '', { easeTime: 1000, timeOut: 3000 })
        }

        //if (this.GetEditedData.Status != undefined) {
        //  if (this.GetEditedData.Status == true) {
        //    this.StateIds = this.GetEditedData.data.stateid;
        //    var tmpstateId = this.GetEditedData.data.stateid.split(",");
        //    for (var i = 0; i < this.StateData.length; i++) {
        //      for (var j = 0; j < tmpstateId.length; j++) {
        //        if (this.StateData[i].stateId == tmpstateId[j]) {
        //          this.StateData[i].selected = true;


        //        }
        //      }
        //    }
        //    this.onChangeOfMultiCheckBoxToGetCity();
        //  }









        //  // this.onChangeOfMultiCheckBoxToGetSchool();
        //}
        //else {
        //}








      }
    )
  }

  //pubchange() {
  //  this.model.published = true;
  //  this.publish = 1;

  //}
  //unpubchange() {
  //  debugger;
  //  this.model.unpublished = true;
  //  this.publish = 0;
  //}

  //onChangeOfCheckBox() {
  //  this.IsSchool = true;
  //}

  //Bind User
  BindUser() {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };


    this.http.get('api/LiveWebinar/BindUser', options).subscribe(

      (data) => {
        debugger;

        this.UserDetails = data;

        if (this.UserDetails.status = true) {
          this.UserData = this.UserDetails.data;

        }
        else {
          this.toaster.error(this.UserDetails.message.toString(), '', { easeTime: 1000, timeOut: 3000 })
        }


      }
    )
  }

  //Get all data for bind dropdowns
  GetTopic() {
    debugger;
    let stateid = this.selectedstate;
    let cityid = this.selectedcity;
    let schoolid = this.selectedschool;
    let classid = this.SelectedClass;
    let streamid = this.SelectedStream;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };


    this.http.get('api/LiveWebinar/GetTopicData?acttype=' + 'Topic', options).subscribe(

      (data) => {
        debugger;
        this.Detail = data;

        if (this.Detail.Status == true) {
          this.TopicData = this.Detail.data;
        }
        else {
          this.toaster.error(this.Detail.Message.toString(), '', { easeTime: 1000, timeOut: 3000 })
          //this.SelectedTopic = 0;
          this.TopicData = [];
        }
      }
    )
  }
  BindState() {
    debugger;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    this.statedat = [];

    var tmpclass: any = [];
    this.http.post('api/LiveWebinar/Bindstate', options).subscribe(

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
    this.http.post('api/LiveWebinar/BindCity', body, options).subscribe(

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
    this.http.post('api/LiveWebinar/BindSchool', body, options).subscribe(

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

  GetClass() {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };


    this.http.get('api/LiveWebinar/GetClass', options).subscribe(

      (data) => {

        this.Details = data;

        if (this.Details.status == true) {
          this.ClassData = this.Details.data;



        }
        else {
          this.toaster.error(this.Details.message.toString(), '', { easeTime: 1000, timeOut: 3000 })
        }
      }
    )
  }
  //get stream
  GetStream() {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };


    this.http.get('api/LiveWebinar/getStream', options).subscribe(

      (data) => {

        this.StreamDetails = data;

        if (this.StreamDetails.status == true) {
          this.StreamData = this.StreamDetails.data;
          this.GetData();
        }
        else {
          this.toaster.error(this.StreamDetails.message.toString(), '', { easeTime: 1000, timeOut: 3000 })
        }
      }
    )
  }

  //get selected class
  getSelectedClass() {
    debugger;
    this.classid = "";
    var count = 0;
    for (var i = 0; i < this.ClassData.length; i++) {

      if (this.ClassData[i].selected === true) {

        if (this.classid === '') {
          this.classid = this.ClassData[i].classid;
          count++;
        }
        else {

          this.classid = this.classid + ',' + this.ClassData[i].classid;

          count++;

        }
      }
      else {
        this.showstream = 0;
      }
    }



    for (var i = 0; i < this.ClassData.length; i++) {
      if (this.ClassData[i].selected === true) {
        if (this.ClassData[i].classid == 1 || this.ClassData[i].classid == 2 || this.ClassData[i].classid == 3) {
          this.showstream = 0;
        }
        else {
          this.showstream = 1;
          this.GetStream();
        }
      }
      //else {
      //  this.showstream = 0;
      //}

    }




    if (this.ClassData.length === count) {
      this.AllClass = true;
      //this.GetTopic();
    }
    else {
      this.AllClass = false;
      //this.GetTopic();
    }
    //this.GetTopic();

  }

  //get selected stream
  //get stream
  getSelectedStream() {
    debugger;
    this.streamid = "";
    var count = 0;
    for (var i = 0; i < this.StreamData.length; i++) {

      if (this.StreamData[i].selected === true) {

        if (this.streamid === '') {
          this.streamid = this.StreamData[i].streamid;
          count++;
        }
        else {
          this.streamid = this.streamid + ',' + this.StreamData[i].streamid;
          count++;
        }
      }
    }
    if (this.StreamData.length === count) {
      this.AllStream = true;
    }
    else {
      this.AllStream = false;
    }
    // this.GetTopic();
  }


  //Select All function for class
  SelectAllClass() {
    debugger;
    this.classid = "";


    if (this.AllClass === true) {
      for (var i = 0; i < this.ClassData.length; i++) {
        this.ClassData[i].selected = true;
        if (this.classid === '') {
          this.classid = this.ClassData[i].classid;
        }
        else {
          this.classid = this.classid + ',' + this.ClassData[i].classid;
        }
      }
      this.showstream = 1;
    }
    else {
      for (var i = 0; i < this.ClassData.length; i++) {
        this.ClassData[i].selected = false;
      }
      this.showstream = 0;
    }
    //this.GetTopic();

  }

  //Select All function for stream
  SelectAllStream() {
    debugger;
    this.streamid = "";
    if (this.AllStream === true) {
      for (var i = 0; i < this.StreamData.length; i++) {
        this.StreamData[i].selected = true;
        if (this.streamid === '') {
          this.streamid = this.StreamData[i].streamid;
        }
        else {
          this.streamid = this.streamid + ',' + this.StreamData[i].streamid;
        }
      }
    }
    else {
      for (var i = 0; i < this.StreamData.length; i++) {
        this.StreamData[i].selected = false;
      }
    }

  }


  //getClass() {
  //  let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //  let options = { headers: headers };
  //  this.ClassDetails = [];
  //  var a;
  //  var tmpclass: any = [];
  //  this.http.get('api/Plannedactivity/GetClassAndStream?acttype=' + 'Class', options).subscribe(
  //    (data) => {
  //      this.ClassDetails = data;
  //      if (this.ClassDetails.Status == true) {
  //        this.ClassData = this.ClassDetails.data;
  //      }
  //    }
  //  )
  //}



  // for stream data


  //getStream() {
  //  this.SelectedStream = 0;
  //  let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //  let options = { headers: headers };
  //  this.StreamDetails = [];
  //  var a;
  //  var tmpStream: any = [];
  //  this.http.get('api/Plannedactivity/GetClassAndStream?acttype=' + 'Stream', options).subscribe(
  //    (data) => {
  //      this.StreamDetails = data;
  //      if (this.StreamDetails.Status == true) {
  //        this.StreamData = this.StreamDetails.data;
  //        this.SelectedTopic = 0;
  //      }
  //    }
  //  )
  //}
  //Get Saved Data


  GetData() {
    debugger;
    //this.GetData1();
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    this.Detail = [];

    this.http.get('api/LiveWebinar/GetSavedData?acttype=' + 'GetSavedData', options).subscribe(
      (data) => {
        debugger;
        //this.Loader.stop();

        this.Detail = data;
        this.GetSaveData = this.Detail.data;
        //if (this.GetSaveData[0].Image == "") {
        //  this.checklink = true;
        //}
        //else {
        //  this.checklink = false;
        //}


        var state;
        var city;
        var school;
        var student;


        var a;
        var b;
        debugger;
        //this.GetSaveData = data;
        for (var i = 0; i < this.GetSaveData.length; i++) {
          var classname = "";
          var streamname = "";
          for (var j = 0; j < this.GetSaveData[i].Class.length; j++) {
            a = this.GetSaveData[i].Class.split(",");
            b = this.GetSaveData[i].Stream.split(",");
          }
          if (this.ClassData != undefined) {
            for (var k = 0; k < a.length; k++) {
              for (var l = 0; l < this.ClassData.length; l++) {
                if (a[k] == this.ClassData[l].classid) {
                  if (k > 0) {
                    classname = classname + ", " + this.ClassData[l].classname;
                  }
                  else {
                    classname = classname + this.ClassData[l].classname;
                  }
                }
              }
            }
          }
          if (this.StreamData != undefined) {
            for (var k = 0; k < a.length; k++) {
              for (var l = 0; l < this.StreamData.length; l++) {
                if (b[k] == this.StreamData[l].streamid) {
                  if (k > 0) {
                    streamname = streamname + ", " + this.StreamData[l].streamname;
                  }
                  else {
                    streamname = streamname + this.StreamData[l].streamname;
                  }
                }
              }
            }
          }

          this.GetSaveData[i].Class = classname;

          if (classname == "8th" || classname == "9th" || classname == "10th") {
            this.GetSaveData[i].Stream = "";
          }
          else {
            this.GetSaveData[i].Stream = streamname;
          }


        }









        for (var i = 0; i < this.GetSaveData.length; i++) {
          var statename = "";
          var cityname = "";
          var schoolname = "";
          var studentname = "";
          //for (var j = 0; j < this.GetSaveData[i].State.length; j++) {
          state = this.GetSaveData[i].state.split(",");
          city = this.GetSaveData[i].city.split(",");
          school = this.GetSaveData[i].school.split(",");
          student = this.GetSaveData[i].student.split(",");
          //}
          //state
          for (var k = 0; k < state.length; k++) {
            for (var l = 0; l < this.StateData.length; l++) {
              if (state[k] == this.StateData[l].stateId) {
                if (k > 0) {
                  statename = statename + ", " + this.StateData[l].statename;
                }
                else {
                  statename = statename + this.StateData[l].statename;
                }
              }
            }
          }


          //city
          for (var k = 0; k < city.length; k++) {
            for (var l = 0; l < this.CityData.length; l++) {
              if (city[k] == this.CityData[l].cityid) {
                if (k > 0) {
                  cityname = cityname + ", " + this.CityData[l].cityname;
                }
                else {
                  cityname = cityname + this.CityData[l].cityname;
                }
              }
            }
          }
          //school

          for (var k = 0; k < this.SchoolData.length; k++) {
            for (var l = 0; l < this.SchoolData.length; l++) {
              if (school[k] == this.SchoolData[l].schoolid) {
                if (k > 0) {
                  schoolname = schoolname + ", " + this.SchoolData[l].schoolname;
                }
                else {
                  schoolname = schoolname + this.SchoolData[l].schoolname;
                }
              }
            }
          }


          for (var k = 0; k < this.StudentData.length; k++) {
            for (var l = 0; l < this.StudentData.length; l++) {
              if (student[k] == this.StudentData[l].studentid) {
                if (k > 0) {
                  studentname = studentname + ", " + this.StudentData[l].studentname;
                }
                else {
                  studentname = studentname + this.StudentData[l].studentname;
                }
              }
            }
          }
     
          this.GetSaveData[i].statename = statename;
          this.GetSaveData[i].cityname = cityname;
          this.GetSaveData[i].schoolname = schoolname;
          this.GetSaveData[i].studentname = studentname;
        }





        // this.HeaderData = Object.keys(this.GetSaveData[0]);




      }
    )
  }
  //For Getting Video File Detail


  //GetVideoDetail(event) {
  //  debugger;
  //  this.videofile = event;
  //  let file = event.target.files[0];
  //  let fileList: FileList = event.target.files;
  //   this.videoToUpload = fileList[0];
  //  if (file.type.includes("video")) {
  //    this.orgVideoName = file.name;
  //  }
  //  else {
  //    Swal.fire("", "Please select a video file", "error");
  //  }
  //}



  //For Getting Image Detail



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






  //new save plan activity

  onSubmit() {
    debugger;
    if (this.ButtonText == "Save") {

      //validation start 


      if (this.SelectedDate == null || this.SelectedDate == undefined) {
        Swal.fire("", "Please enter start date ", "error");
        return;
      }
      var res = this.SelectedVideo.match(/vimeo/g);
      if (res == null || res == undefined) {
        Swal.fire("", "Please enter only vimeo video link", "error");
        return;
      }

      //if (this.SelectedVideo == "" || this.SelectedDate == undefined || this.SelectedVideo.match("")) {
      //  Swal.fire("", "Please enter start date ", "error");
      //  return;
      //}

      if (this.SelectedEndDate == null || this.SelectedEndDate == undefined) {
        Swal.fire("", "Please enter end date ", "error");
        return;
      }
      if (this.starttime == null || this.starttime == undefined) {
        Swal.fire("", "Please enter start time", "error");
        return;
      }
      if (this.endtime == null || this.endtime == undefined) {
        Swal.fire("", "Please enter end time", "error");
        return;
      }

      if (this.Selecteduser == 0 || this.Selecteduser == undefined) {
        Swal.fire("", "Please select user type", "error");
        return;
      }
      if (this.IsSchool == false) {
        this.publish = 0;
      }
      else {
        this.publish = 1;
      }



      this.s_date = this.SelectedDate.toISOString().slice(0, 10);
      this.e_date = this.SelectedEndDate.toISOString().slice(0, 10);
      this.todaydate = new Date().toISOString().slice(0, 10);
      var st_time = this.starttime.hour.toString() + ':' + this.starttime.minute.toString() + ':' + this.starttime.second.toString();
      var end_time = this.endtime.hour.toString() + ':' + this.endtime.minute.toString() + ':' + this.endtime.second.toString();
      if (this.s_date == this.e_date) {
        if (this.s_date < this.todaydate) {
          Swal.fire("", "Start date should contains future date", "error");
          return;
        }
        if (this.e_date < this.todaydate) {
          Swal.fire("", "End date should contain future date", "error");
          return;
        }

        if ((this.starttime.hour > this.endtime.hour) || ((this.starttime.hour == this.endtime.hour && this.starttime.minute >= this.endtime.minute))) {
          Swal.fire("", "Start time always less then end time", "error");
          return;
        }
      }
      else {
        if (this.s_date < this.todaydate) {
          Swal.fire("", "Start date should contains future date", "error");
          return;
        }
        if (this.e_date < this.todaydate) {
          Swal.fire("", "End date should contain future date", "error");
          return;
        }


        if (this.s_date > this.e_date) {
          Swal.fire("", "End date always greater then start date", "error");
          return;
        }
      }



      if (this.selectedstate == 0 || this.selectedstate == undefined) {
        this.selectedstate = 0;
      }
      if (this.selectedcity == 0 || this.selectedcity == undefined) {
        this.selectedcity = 0;
      }
      if (this.selectedschool == 0 || this.selectedschool == undefined) {
        this.selectedschool = 0;
      }

      if (this.classid == "" || this.classid == undefined) {
        Swal.fire("", "Please select class", "error");
        return;
      }
      if (this.SelectedTopic == 0 || this.SelectedTopic == undefined) {
        Swal.fire("", "Please select topic", "error");
        return;
      }
      if (this.selectedwebtype == 0 || this.selectedwebtype == undefined) {
        Swal.fire("", "Please select webinar type", "error");
        return;
      }


      //if (this.SelectedVideo == "" || this.SelectedVideo == undefined) {
      //  Swal.fire("", "Please enter video link", "error");
      //  return;
      //}
      //if (this.orgImageName == "" || this.orgImageName == undefined) {
      //  Swal.fire("", "Please choose image", "error");
      //  return;
      //}


      //validation end


      let input = new FormData();

      //input.append("video", this.videoToUpload);
      input.append("image", this.imageToUpload);

      input.append("acttype", "Save");
      input.append("Id", this.Id.toString());

      input.append("topicid", this.SelectedTopic.toString());
      //input.append("classid", this.SelectedClass.toString());
      input.append("classid", this.classid.toString());
      // input.append("streamid", this.SelectedStream.toString());
      input.append("streamid", this.streamid.toString());

      input.append("studentid", this.studentid.toString());


      input.append("orgvideoname", this.SelectedVideo);
      input.append("chatlink", this.chatlink);
      input.append("orgimagename", this.orgImageName);

      input.append("ondate", this.s_date.toString());
      input.append("enddatetime", this.e_date.toString());

      input.append("starttime", st_time.toString());
      input.append("endtime", end_time.toString());
      input.append("stateid", this.StateIds.toString());
      input.append("schoolid", this.SchoolIds.toString());
      input.append("cityid", this.CityIds.toString());
      input.append("usertype", this.Selecteduser.toString());
      input.append("published", this.publish.toString());
      input.append("webinartype", this.selectedwebtype.toString());

      input.append("createdby", this.localstorage.get("userid").toString());

      this.http.post('api/LiveWebinar/SavePlannActivity', input)
        .subscribe(
          (data) => {
            debugger;
            this.PlannedActivityData = data;
            if (this.PlannedActivityData.length > 10) {
              Swal.fire("", "Saved Successfully", "success");
              this.onClear();
              this.GetData();

              this.AllCity = false;
              this.AllState = false;
              this.AllSchool = false;

              for (var i = 0; i < this.ClassData.length; i++) {
                this.ClassData[i].selected = false;
              }
              for (var i = 0; i < this.StreamData.length; i++) {
                this.StreamData[i].selected = false;
              }
              for (var i = 0; i < this.StateData.length; i++) {
                this.StateData[i].selected = false;
              }
              for (var i = 0; i < this.CityData.length; i++) {
                this.CityData[i].selected = false;
              }
              for (var i = 0; i < this.SchoolData.length; i++) {
                this.SchoolData[i].selected = false;
              }

              return;
            }

          })



    }
    else {
      debugger;
      if (this.SelectedDate == null || this.SelectedDate == undefined) {
        Swal.fire("", "Please enter start date ", "error");
        return;
      }
      var res = this.SelectedVideo.match(/vimeo/g);
      if (res == null || res == undefined) {
        Swal.fire("", "Please enter only vimeo video link", "error");
        return;
      }

      if (this.SelectedEndDate == null || this.SelectedEndDate == undefined) {
        Swal.fire("", "Please enter end date ", "error");
        return;
      }
      if (this.starttime == null || this.starttime == undefined) {
        Swal.fire("", "Please enter start time", "error");
        return;
      }
      if (this.endtime == null || this.endtime == undefined) {
        Swal.fire("", "Please enter end time", "error");
        return;
      }

      if (this.IsSchool == false) {
        this.publish = 0;
      }
      else {
        this.publish = 1;
      }
      this.s_date = this.SelectedDate.toISOString().slice(0, 10);
      this.e_date = this.SelectedEndDate.toISOString().slice(0, 10);
      this.todaydate = new Date().toISOString().slice(0, 10);
      var st_time = this.starttime.hour.toString() + ':' + this.starttime.minute.toString() + ':' + this.starttime.second.toString();
      var end_time = this.endtime.hour.toString() + ':' + this.endtime.minute.toString() + ':' + this.endtime.second.toString();
      if (this.s_date == this.e_date) {
        //if (this.s_date < this.todaydate) {
        //  Swal.fire("", "Start date should contains future date", "error");
        //  return;
        //}
        //if (this.e_date < this.todaydate) {
        //  Swal.fire("", "End date should contain future date", "error");
        //  return;
        //}

        if ((this.starttime.hour > this.endtime.hour) || ((this.starttime.hour == this.endtime.hour && this.starttime.minute >= this.endtime.minute))) {
          Swal.fire("", "Start time always less then end time", "error");
          return;
        }
      }
      else {
        //if (this.s_date < this.todaydate) {
        //  Swal.fire("", "Start date should contains future date", "error");
        //  return;
        //}
        //if (this.e_date < this.todaydate) {
        //  Swal.fire("", "End date should contain future date", "error");
        //  return;
        //}


        if (this.s_date > this.e_date) {
          Swal.fire("", "End date always greater then start date", "error");
          return;
        }
      }


      if (this.selectedstate == 0 || this.selectedstate == undefined) {
        this.selectedstate = 0;
      }
      if (this.selectedcity == 0 || this.selectedcity == undefined) {
        this.selectedcity = 0;
      }
      if (this.selectedschool == 0 || this.selectedschool == undefined) {
        this.SchoolIds = this.selectedschool.toString();
      }

      if (this.classid == "" || this.classid == undefined) {
        Swal.fire("", "Please select class", "error");
        return;
      }

      if (this.SelectedTopic == 0 || this.SelectedTopic == undefined) {
        Swal.fire("", "Please select any topic", "error");
        return;
      }
      if (this.selectedwebtype == 0 || this.selectedwebtype == undefined) {
        Swal.fire("", "Please select webinar type", "error");
        return;
      }


      //if (this.orgVideoName == "" || this.orgVideoName == undefined) {
      //  Swal.fire("", "Please Choose any video", "error");
      //  return;
      //}
      //if (this.orgImageName == "" || this.orgImageName == undefined) {
      //  Swal.fire("", "Please Choose any image", "error");
      //  return;
      //}


      //validation end


      let input = new FormData();

      //input.append("video", this.videoToUpload);
      input.append("image", this.imageToUpload);

      input.append("acttype", "Update");
      input.append("Id", this.Id.toString());

      input.append("topicid", this.SelectedTopic.toString());
      //input.append("classid", this.SelectedClass.toString());
      input.append("classid", this.classid.toString());
      // input.append("streamid", this.SelectedStream.toString());
      input.append("streamid", this.streamid.toString());
      input.append("studentid", this.studentid.toString());

      input.append("orgvideoname", this.SelectedVideo);
      input.append("chatlink", this.chatlink);
      input.append("orgimagename", this.orgImageName);

      input.append("ondate", this.s_date.toString());
      input.append("enddatetime", this.e_date.toString());
      input.append("starttime", st_time.toString());
      input.append("endtime", end_time.toString());
      input.append("stateid", this.StateIds.toString());
      input.append("schoolid", this.SchoolIds.toString());
      input.append("cityid", this.CityIds.toString());
      input.append("usertype", this.Selecteduser.toString());
      input.append("published", this.publish.toString());
      input.append("webinartype", this.selectedwebtype.toString());

      input.append("createdby", this.localstorage.get("userid").toString());

      this.http.post('api/LiveWebinar/SavePlannActivity', input)
        .subscribe(
          (data) => {
            debugger;
            this.PlannedActivityData = data;
            if (this.PlannedActivityData.length > 10) {
              Swal.fire("", "Updated Successfully", "success");
              this.onClear();
              this.GetData();
              this.AllCity = false;
              this.AllState = false;
              this.AllSchool = false;
              this.AllStudent = false;
              for (var i = 0; i < this.ClassData.length; i++) {
                this.ClassData[i].selected = false;
              }
              for (var i = 0; i < this.StreamData.length; i++) {
                this.StreamData[i].selected = false;
              }
              for (var i = 0; i < this.StateData.length; i++) {
                this.StateData[i].selected = false;
              }
              for (var i = 0; i < this.CityData.length; i++) {
                this.CityData[i].selected = false;
              }
              for (var i = 0; i < this.SchoolData.length; i++) {
                this.SchoolData[i].selected = false;
              }
              return;
            }

          })


    }



  }



  //check valid file
  validateFile(name: string) {

    var ext = name.substring(name.lastIndexOf('.') + 1);

    if (ext.toLowerCase() == 'docx' || ext.toLowerCase() == 'doc' || ext.toLowerCase() == 'pdf' || ext.toLowerCase() == 'xls' || ext.toLowerCase() == 'xlsx' || ext.toLowerCase() == 'ppt') {
      return true;
    }
    else {
      return false;
    }
  }




  //Reset Button

  onClear() {
    debugger;
    this.StateIds = "";
    this.CityIds = "";
    this.SchoolIds = "";

    this.ButtonText = 'Save';
    this.showstream = 0;
    this.SelectedTopic = 0;
    this.IsSchool = false;
    this.publish = 0;
    //this.model.published = false;
    //this.model.unpublished = false;
    //this.publish = false;
    // this.publish_v = 0;

    //this.SelectedClass = 0;
    //this.SelectedStream = 0;
    //this.SelectedDate = "";
    //this.SelectedEndDate = "";
    this.selectedstate = 0;
    this.selectedcity = 0;
    this.selectedschool = 0;
    this.Selecteduser = 0;
    this.SelectedTopic = 0;
    this.orgVideoName = "";
    this.orgImageName = "";
    this.SelectedVideo = "";
    //this.SelectedDate = new Date("");
    //this.s_date = "";
    //this.SelectedEndDate = new Date("");
    //this.e_date = "";
    this.SelectedDate = null;
    this.SelectedEndDate = null;
    this.st_time = null;
    this.end_time = null;
    this.s_date = null;
    this.e_date = null;
    this.starttime = null;
    this.endtime = null;
    this.AllClass = false;
    this.AllStream = false;
    this.chatlink = "";
    this.AllCity = false;
    this.AllState = false;
    this.AllSchool = false;
    this.AllStudent = false;
    // this.GetData();


    for (var i = 0; i < this.ClassData.length; i++) {
      this.ClassData[i].selected = false;
    }
    for (var i = 0; i < this.StreamData.length; i++) {
      this.StreamData[i].selected = false;
    }
    for (var i = 0; i < this.StateData.length; i++) {
      this.StateData[i].selected = false;
    }
    for (var i = 0; i < this.CityData.length; i++) {
      this.CityData[i].selected = false;
    }
    for (var i = 0; i < this.SchoolData.length; i++) {
      this.SchoolData[i].selected = false;
    }
    for (var i = 0; i < this.StudentData.length; i++) {
      this.StudentData[i].selected = false;
    }

    this.myInputVariable.nativeElement.value = "";
    this.selectedwebtype = 0;


  }
  //For Delete Data
  DeleteData(i: number, Id) {
    var data;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };

    data =
    {
      "activity_id": Id,
      "acttype": "Delete",
      "createdby": parseInt(this.localstorage.get("userid"))
    };

    let body = JSON.stringify(data);

    //this.http.post('api/Plannedactivity/DeleteActivity', body, options).subscribe(
    //  (data) => {
    //    this.DeletedData = data;
    //    if (this.DeletedData.Status == true) {
    //      Swal.fire("", "Successfully Deleted", "success");
    //      this.GetData();
    //      return;
    //    }
    //  }
    //  )
    Swal.fire({
      //title: 'Confirmation',
      text: 'Are you sure to delete this record?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.http.post('api/LiveWebinar/DeleteActivity', body, options).subscribe(
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
    // For more information about handling dismissals please visit
    // https://sweetalert2.github.io/#handling-dismissals

  }
  //for Edit Data
  EditData(i: number, Id) {
    //this.GetTopic();
    //this.getClass();
    //this.getStream();
    // this.onClear();
    this.BindUser();
    // this.BindState();
    this.GetData1();
    this.ButtonText = 'Update';
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };

    this.http.get('api/LiveWebinar/GetEditData?acttype=' + 'Edit&activity_id=' + Id, options).subscribe(
      (data) => {
        debugger;
        this.GetEditedData = data;
        if (this.GetEditedData.Status == true) {
          // this.GetData1();

          if (this.GetEditedData.data.stateid == "0" && this.GetEditedData.data.cityid == "0" && this.GetEditedData.data.schoolid == "0" && this.GetEditedData.data.studentid == "0") {
            this.AllState = true;
            this.AllCity = true;
            this.AllSchool = true;
            this.AllStudent = true;
          }
          else {
            if (this.GetEditedData.Status != undefined) {
              if (this.GetEditedData.Status == true) {
                this.StateIds = this.GetEditedData.data.stateid;
                var tmpstateId = this.GetEditedData.data.stateid.split(",");
                for (var i = 0; i < this.StateData.length; i++) {
                  for (var j = 0; j < tmpstateId.length; j++) {
                    if (this.StateData[i].stateId == tmpstateId[j]) {
                      this.StateData[i].selected = true;


                    }
                  }
                }


                this.onChangeOfMultiCheckBoxToGetCity();
              }
            }
          }



          //this.onChangeOfMultiCheckBoxToGetStudent();



          this.classid = this.GetEditedData.data.Classid;
          this.streamid = this.GetEditedData.data.streamId;


          var tmpClassId = this.GetEditedData.data.Classid.split(",");
          for (var i = 0; i < this.ClassData.length; i++) {
            for (var j = 0; j < tmpClassId.length; j++) {
              if (this.ClassData[i].classid == tmpClassId[j]) {
                this.ClassData[i].selected = true;
              }
            }
          }



          for (var i = 0; i < this.ClassData.length; i++) {
            if (this.ClassData[i].selected === true) {
              if (this.ClassData[i].classid == 1 || this.ClassData[i].classid == 2 || this.ClassData[i].classid == 3) {
                this.showstream = 0;
              }
              else {
                this.showstream = 1;
                // this.GetStream();
              }
            }
            //else {
            //  this.showstream = 0;
            //}

          }


          if (this.ClassData.length == tmpClassId.length) {
            this.AllClass = true;
          }
          else {
            this.AllClass = false;
          }



          var tmpStreamid = this.GetEditedData.data.streamId.split(",");
          for (var i = 0; i < this.StreamData.length; i++) {
            for (var j = 0; j < tmpStreamid.length; j++) {
              if (this.StreamData[i].streamid == tmpStreamid[j]) {
                this.StreamData[i].selected = true;
              }
            }
          }


          if (this.StreamData.length == tmpStreamid.length) {
            this.AllStream = true;
          }
          else {
            this.AllStream = false;
          }


          var mdate = new Date(this.GetEditedData.data.Date);
          var edate = new Date(this.GetEditedData.data.endDate);

          this.GetTopic();
          this.Id = this.GetEditedData.data.Id;
          //this.SelectedDate = new Date(Date.parse(this.GetEditedData.data.Date));
          this.SelectedDate = mdate;
          this.SelectedEndDate = edate
          this.SelectedVideo = this.GetEditedData.data.VideoName;
          this.chatlink = this.GetEditedData.data.chatlink;
          //this.orgImageName = this.GetEditedData.data.ImageName;


          var mtime = this.GetEditedData.data.starttime.split(":");
          var etime = this.GetEditedData.data.endtime.split(":");

          this.starttime = { hour: parseInt(mtime[0]), minute: parseInt(mtime[1]), second: parseInt(mtime[2]) };
          this.endtime = { hour: parseInt(etime[0]), minute: parseInt(etime[1]), second: parseInt(etime[2]) };



          this.Selecteduser = this.GetEditedData.data.usertype;
          //  this.model.published = this.GetEditedData.data.published == 0 ? false : true;
          //if (this.GetEditedData.data.publish == 0) {
          //  this.model.unpublished = true;

          //  this.publish = 0;
          //}
          //else {
          //  this.model.published = true;
          //  this.publish = 1;
          //}

          this.IsSchool = this.GetEditedData.data.publish == 0 ? false : true;





          //if (this.GetEditedData.data.publish == 0) {
          //  this.publish = 0;
          //}
          //else {
          //  this.publish = 1;
          //}
          if (tmpClassId.length == 6) {
            this.AllClass = true;
          }
          if (tmpStreamid.length == 6) {
            this.AllStream = true;
          }


          //this.st_time = this.GetEditedData.data.starttime;
          //this.end_time = this.GetEditedData.data.endtime;


          this.SelectedTopic = this.GetEditedData.data.ID;
          this.selectedwebtype = this.GetEditedData.data.webinartype;

        }
      }
    )
  }

  //Watchvideoupdate(url: string) {
  //  debugger;
  //  if (url.length > 0) {
  //    this.openModal();
  //  }
  //  else {
  //    this.onCloseHandled();
  //  }
  //}
  //openModal() {
  //  this.display = "block";
  //}
  //onCloseHandled() {

  //  this.display = 'none';
  //}





  //Select All function for State
  SelectAllState() {
    debugger;
    this.StateIds = "";
    if (this.AllState === true) {
      for (var i = 0; i < this.StateData.length; i++) {
        this.StateData[i].selected = true;
        if (this.StateIds === '') {
          this.StateIds = this.StateData[i].stateId;
        }
        else {
          this.StateIds = this.StateIds + ',' + this.StateData[i].stateId;
        }
      }

      this.StateIds = '0';
    }
    else {
      for (var i = 0; i < this.StateData.length; i++) {
        this.StateData[i].selected = false;
      }
    }

  }

  //convert Selected state in String format
  SelectedState() {
    debugger;
    this.StateIds = "";
    var count = 0;
    for (var i = 0; i < this.StateData.length; i++) {

      if (this.StateData[i].selected === true) {

        if (this.StateIds === '') {
          this.StateIds = this.StateData[i].stateId;
          count++;
        }
        else {
          this.StateIds = this.StateIds + ',' + this.StateData[i].stateId;
          count++;
        }
      }
    }
    if (this.StateData.length === count) {
      this.AllState = true;
      this.StateIds = '0';
    }
    else {
      this.AllState = false;
    }

  }


  //Select All function for City
  SelectAllCity() {
    debugger;
    this.CityIds = "";
    if (this.AllCity === true) {
      for (var i = 0; i < this.CityData.length; i++) {
        this.CityData[i].selected = true;
        if (this.CityIds === '') {
          this.CityIds = this.CityData[i].cityid;
        }
        else {
          this.CityIds = this.CityIds + ',' + this.CityData[i].cityid;
        }
      }
      this.CityIds = '0';
    }
    else {
      for (var i = 0; i < this.CityData.length; i++) {
        this.CityData[i].selected = false;
      }
    }

  }

  //convert Selected city in String format
  SelectedCity() {
    debugger;
    this.CityIds = "";
    var count = 0;
    for (var i = 0; i < this.CityData.length; i++) {

      if (this.CityData[i].selected === true) {

        if (this.CityIds === '') {
          this.CityIds = this.CityData[i].cityid;
          count++;
        }
        else {
          this.CityIds = this.CityIds + ',' + this.CityData[i].cityid;
          count++;
        }
      }
    }
    if (this.CityData.length === count) {
      this.AllCity = true;
      this.CityIds = '0';
    }
    else {
      this.AllCity = false;
    }

  }


  //Select All function for City
  SelectAllSchool() {
    debugger;
    this.SchoolIds = "";
    if (this.AllSchool === true) {
      for (var i = 0; i < this.SchoolData.length; i++) {
        this.SchoolData[i].selected = true;
        if (this.SchoolIds === '') {
          this.SchoolIds = this.SchoolData[i].schoolid;
        }
        else {
          this.SchoolIds = this.SchoolIds + ',' + this.SchoolData[i].schoolid;
        }
      }

      this.SchoolIds = '0';

    }
    else {
      for (var i = 0; i < this.SchoolData.length; i++) {
        this.SchoolData[i].selected = false;
      }
    }

  }

  //convert Selected city in String format
  SelectedSchool() {

    this.SchoolIds = "";
    var count = 0;
    for (var i = 0; i < this.SchoolData.length; i++) {

      if (this.SchoolData[i].selected === true) {

        if (this.SchoolIds === '') {
          this.SchoolIds = this.SchoolData[i].schoolid;
          count++;
        }
        else {
          this.SchoolIds = this.SchoolIds + ',' + this.SchoolData[i].schoolid;
          count++;
        }
      }
    }
    if (this.SchoolData.length === count) {
      this.AllSchool = true;
      this.SchoolIds = '0';
    }
    else {
      this.AllSchool = false;
    }

  }

  //Multi check box filter
  onChangeOfMultiCheckBoxToGetCity() {
    debugger;
    if (this.StateIds == null) { this.StateIds = ""; }
    if (this.CityIds == null) { this.CityIds = ""; }

    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    this.http.get('api/Subscription/getcityfilter?StateId=' + this.StateIds, options).subscribe(
      (data) => {
        this.GetCityData = data;

        if (this.GetCityData.Status == true) {
          this.CityData = this.GetCityData.citydata;
        }


        if (this.GetEditedData.Status != undefined) {
          if (this.GetEditedData.Status == true) {
            this.CityIds = this.GetEditedData.data.cityid;
            var tmpcityid = this.GetEditedData.data.cityid.split(",");
            for (var i = 0; i < this.CityData.length; i++) {
              for (var j = 0; j < tmpcityid.length; j++) {
                if (this.CityData[i].cityid == tmpcityid[j]) {
                  this.CityData[i].selected = true;

                }
              }
            }
            this.onChangeOfMultiCheckBoxToGetSchool();
          }
          else {
          }
        }




        //if (this.EditSubsscriptionData.Status == true) {
        //  this.CityIds = this.EditSubsscriptionData.data[0].cityid;
        //  var tmpcityid = this.EditSubsscriptionData.data[0].cityid.split(",");
        //  for (var i = 0; i < this.CityData.length; i++) {
        //    for (var j = 0; j < tmpcityid.length; j++) {
        //      if (this.CityData[i].cityid == tmpcityid[j]) {
        //        this.CityData[i].selected = true;

        //      }
        //    }
        //  }
        //  this.onChangeOfMultiCheckBoxToGetSchool();
        //}
        //else {
        //}

      },
      (err) => {

      }
    );
  }
  onChangeOfMultiCheckBoxToGetSchool() {
    debugger;
    if (this.StateIds == null) { this.StateIds = ""; }
    if (this.CityIds == null) { this.CityIds = ""; }

    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    this.http.get('api/Subscription/getschoolfilter?StateId=' + this.StateIds + '&CityId=' + this.CityIds, options).subscribe(
      (data) => {
        this.GetSchoolData = data;

        if (this.GetSchoolData.Status == true) {
          this.SchoolData = this.GetSchoolData.schooldata;
        }

        if (this.GetCityData.Status == true) {
          this.CityData = this.GetCityData.citydata;
        }


        if (this.GetEditedData.Status != undefined) {
          if (this.GetEditedData.Status == true) {
            this.SchoolIds = this.GetEditedData.data.schoolid;
            var tmpschoolid = this.GetEditedData.data.schoolid.split(",");
            for (var i = 0; i < this.SchoolData.length; i++) {
              for (var j = 0; j < tmpschoolid.length; j++) {
                if (this.SchoolData[i].schoolid == tmpschoolid[j]) {
                  this.SchoolData[i].selected = true;

                }
              }

            }


            this.onChangeOfMultiCheckBoxToGetStudent();
          }
          else {
          }
        }




        //if (this.EditSubsscriptionData.Status == true) {
        //  this.SchoolIds = this.EditSubsscriptionData.data[0].schoolid;
        //  var tmpschoolid = this.EditSubsscriptionData.data[0].schoolid.split(",");
        //  for (var i = 0; i < this.SchoolData.length; i++) {
        //    for (var j = 0; j < tmpschoolid.length; j++) {
        //      if (this.SchoolData[i].schoolid == tmpschoolid[j]) {
        //        this.SchoolData[i].selected = true;

        //      }
        //    }

        //  }
        //}
        //else {
        //}


      },
      (err) => {

      }
    );
  }


  
  //Select All function for City
  SelectAllStuent() {
    debugger;
    this.studentid = "";
    if (this.AllStudent === true) {
      for (var i = 0; i < this.StudentData.length; i++) {
        this.StudentData[i].selected = true;
        if (this.studentid === '') {
          this.studentid = this.StudentData[i].studentid;
        }
        else {
          this.studentid = this.studentid + ',' + this.StudentData[i].studentid;
        }
      }
      this.studentid = '0';
    }
    else {
      for (var i = 0; i < this.StudentData.length; i++) {
        this.StudentData[i].selected = false;
      }
    }

  }

  //convert Selected city in String format
  getSelectedStudent() {
    debugger;
    this.studentid = "";
    var count = 0;
    for (var i = 0; i < this.StudentData.length; i++) {

      if (this.StudentData[i].selected === true) {

        if (this.studentid === '') {
          this.studentid = this.StudentData[i].studentid;
          count++;
        }
        else {
          this.studentid = this.studentid + ',' + this.StudentData[i].studentid;
          count++;
        }
      }
    }
    if (this.StudentData.length === count) {
      this.AllStudent = true;
      this.studentid = '0';
    }
    else {
      this.AllStudent = false;
    }

  }


  onChangeOfMultiCheckBoxToGetStudent() {
    debugger;
    //this.GetData1();
    if (this.StateIds == null) { this.StateIds = ""; }
    if (this.CityIds == null) { this.CityIds = ""; }
    if (this.SchoolIds == null) { this.SchoolIds = ""; }
    if (this.classid == null) { this.classid = ""; }
    if (this.streamid == null) { this.streamid = ""; }

    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    this.http.get('api/Subscription/getstudentfilter?SchoolId=' + this.SchoolIds + '&ClassId=' + this.classid + '&StreamId=' + this.streamid, options).subscribe(
      (data) => {
        debugger;
        this.GetStudentData = data;
         
        if (this.GetStudentData.Status == true) {
          this.StudentData = this.GetStudentData.schooldata;
        }


        if (this.GetEditedData.Status != undefined) {
          if (this.GetEditedData.Status == true) {
            this.studentid = this.GetEditedData.data.studentid;
            var tmpschoolid = this.GetEditedData.data.studentid.split(",");
            for (var i = 0; i < this.StudentData.length; i++) {
              for (var j = 0; j < tmpschoolid.length; j++) {
                if (this.StudentData[i].studentid == tmpschoolid[j]) {
                  this.StudentData[i].selected = true;

                }
              }

            }


          }
          else {
          }
        }

      

      },
      (err) => {

      }
    );
  }





  //handleButtonClick(link: string) {
  //  debugger;
  //  this.url = link;
  //  this.yt = '<iframe width="727" height="409" src="' + this.url + '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
  //}
  //toggleMeridian() {
  //  this.meridian = !this.meridian;
  //}

}
