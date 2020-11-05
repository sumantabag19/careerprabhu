import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';
import { HttpClient, HttpErrorResponse, HttpRequest, HttpHeaders } from '@angular/common/http';
import { LocalStorageService, LocalStorageModule } from 'angular-2-local-storage';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import Swal from 'sweetalert2';
import { NgbDateAdapter, NgbDateNativeAdapter, NgbTimepickerConfig, NgbTimeStruct, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css'],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }, NgbTimepickerConfig]
})


export class SubscriptionManager implements OnInit
{
  public page: number = 0;
  public pageSize: number = 10;
  public Subscriptionid: number = 0;
  public StateIds: string = "";
  public CityIds: string = "";
  public SchoolIds: string = "";
  public ClassId: number = 0;
  public StreamId: number = 0;
  public StudentId: number = 0;
  public Message: string = "";
  public IsParent: boolean = false;
  public IsStudent: boolean = false;
  public IsSchool: boolean = false;
  public SubscriptionData: any = [];
  public Details: any = {};
  public StateData: any = [];
  public CityData: any = [];
  public SchoolData: any = [];
  public StudentData: any = [];
  public ClassData: any = [];
  public ButtonText: string = 'Save';
  public SelectedStudent: any = [];
  public SelectedStream: any = [];
  public SelectedClass: any = [];
  public AllState: boolean = false;
  public AllCity: boolean = false;
  public AllSchool: boolean = false;
  public ShowDiv: boolean = false;
  public GetFilterData: any;
  public GetCityData: any;
  public GetSchoolData: any;
  public HeaderData: any=[];
  public GetSaveData: any = [];
  public EditSubsscriptionData: any = [];
  public subscriptiondata: any = [];
  public schid: string = "";
  public showstream: number = 1;
  public starttime: NgbTimeStruct;
  public endtime: NgbTimeStruct;
  public startdate: Date;
  public enddate: Date;
  public s_date: any;
  public e_date: any;
  public todaydate: any;
  testimonial: string = "";
  Detail: any = [];
 


  constructor(private http: HttpClient, private router: Router, private localstorage: LocalStorageService, private toaster: ToastrService, private loader: NgxUiLoaderService, config: NgbTimepickerConfig, private config1: NgbDatepickerConfig) {
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
     
      this.GetData();
      
  }


  //Get Saved subscription data in table 
  GetSavedData()
  {
    debugger;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    this.http.get('api/Subscription/getsubscriptiondata', options).subscribe(

      (data) => {
        debugger;


        //this.Detail = data;
        this.GetSaveData = data;
        for (var i = 0; i < this.GetSaveData.length; i++) {
          if (this.GetSaveData[i].State == "") {
            this.GetSaveData[i].City = "N/A";
            this.GetSaveData[i].School = "N/A";
            this.GetSaveData[i].State = "N/A";
          }
        }
       
        //start
        var state;
        var city;
        var school;
        debugger;
        this.GetSaveData = data;
        for (var i = 0; i < this.GetSaveData.length; i++) {
          var statename = "";
          var cityname = "";
          var schoolname = "";
          //for (var j = 0; j < this.GetSaveData[i].State.length; j++) {
            state = this.GetSaveData[i].State.split(",");
          city = this.GetSaveData[i].City.split(",");
          school = this.GetSaveData[i].School.split(",");
          //}
          //state


          if (state == "N/A") {
            this.GetSaveData[i].State = "N/A";
            this.GetSaveData[i].City = "N/A";
            this.GetSaveData[i].School = "N/A";
          }
          else {
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
            for (var k = 0; k < school.length; k++) {
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

            this.GetSaveData[i].State = statename;
            this.GetSaveData[i].City = cityname;
            this.GetSaveData[i].School = schoolname;
          }
          
        }
        //end
        this.HeaderData = Object.keys(this.GetSaveData[0]);
      }
    )
  }
  //Edit Subscription Data 
  EditData(i: number, SubscriptionId) {
    //this.SelectAllState();
    //this.SelectedState();

    //this.SelectAllCity();
    //this.SelectedCity();

    //this.SelectAllSchool();
    //this.SelectedSchool();
      this.GetData();
    
    this.ButtonText = 'Update';
    var index = i;
    var SubscriptionId = SubscriptionId;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    this.http.get('api/Subscription/editsubscription?SubscriptionId=' + SubscriptionId, options).subscribe(

      (data) => {
        debugger;
        this.EditSubsscriptionData = data;
        this.Subscriptionid = this.EditSubsscriptionData.data[0].SubscriptionId;

        this.IsSchool = this.EditSubsscriptionData.data[0].IsSchool == 0 ? false : true;
        this.IsParent = this.EditSubsscriptionData.data[0].IsParent == 0 ? false : true;
        this.IsStudent = this.EditSubsscriptionData.data[0].IsStudent == 0 ? false : true;


        this.SelectedClass = this.EditSubsscriptionData.data[0].classid;
        this.SelectedStream = this.EditSubsscriptionData.data[0].streamname;
        this.testimonial = this.EditSubsscriptionData.data[0].testimonial;


        var mdate = new Date(this.EditSubsscriptionData.data[0].startdate);
        var edate = new Date(this.EditSubsscriptionData.data[0].enddate);


        this.startdate = mdate;
        this.enddate = edate;

        var mtime = this.EditSubsscriptionData.data[0].starttime.split(":");
        var etime = this.EditSubsscriptionData.data[0].endtime.split(":");

        this.starttime = { hour: parseInt(mtime[0]), minute: parseInt(mtime[1]), second: parseInt(mtime[2]) };
        this.endtime = { hour: parseInt(etime[0]), minute: parseInt(etime[1]), second: parseInt(etime[2]) };




        
        


          
            //this.GetData();

        //this.StateIds = this.EditSubsscriptionData.data[0].stateid;
        //var tmpstateId = this.EditSubsscriptionData.data[0].stateid.split(",");
        //for (var i = 0; i < this.StateData.length; i++) {
        //  for (var j = 0; j < tmpstateId.length; j++) {
        //    if (this.StateData[i].stateId == tmpstateId[j]) {
        //      this.StateData[i].selected = true;
              
              
        //    }
        //  }
        //}
 
            
           // this.onChangeOfMultiCheckBoxToGetCity();
          
        

        //this.CityIds = this.EditSubsscriptionData.data[0].cityid;
        //var tmpcityid = this.EditSubsscriptionData.data[0].cityid.split(",");
        //for (var i = 0; i < this.CityData.length; i++) {
        //  for (var j = 0; j < tmpcityid.length; j++) {
        //    if (this.CityData[i].cityid == tmpcityid[j]) {
        //      this.CityData[i].selected = true;
              
        //    }
        //  }
        //}

            //this.onChangeOfMultiCheckBoxToGetSchool();
          
       

        //this.SchoolIds = this.EditSubsscriptionData.data[0].schoolid;
        //var tmpschoolid = this.EditSubsscriptionData.data[0].schoolid.split(",");
        //for (var i = 0; i < this.SchoolData.length; i++) {
        //  for (var j = 0; j < tmpschoolid.length; j++) {
        //    if (this.SchoolData[i].schoolid == tmpschoolid[j]) {
        //      this.SchoolData[i].selected = true;
              
        //    }
        //  }
          
        //}
        //this.SelectedSchool();
       

        
        if (this.IsSchool == true)
        {
          for (var i = 0; i < this.CityData.length; i++) {
            if (this.CityData.cityid == this.EditSubsscriptionData.data[0].CityId) {
              this.CityData.selected = this.EditSubsscriptionData.data[0].CityId;
            }
          }
          this.ShowDiv = false;
        }
        if (this.IsParent == true || this.IsStudent ==true)
        {
          this.ShowDiv = true;
        }


        this.onChangeOfdropdown();

        this.SelectedStudent = this.EditSubsscriptionData.data[0].studentid;
        this.Message = this.EditSubsscriptionData.data[0].Message;
      }
    )
  }












  //Get all data for bind dropdowns
  GetData()
  {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };


    this.http.get('api/Subscription/GetData', options).subscribe(

      (data) => {
            debugger;
      
        this.Details = data;

        if (this.Details.status = true)
        {
          this.StateData = this.Details.statedata;
          this.CityData = this.Details.citydata;
          this.SchoolData = this.Details.schooldata;
          this.ClassData = this.Details.classdata;
          //this.StudentData = this.Details.studentdata;
          
            this.GetSavedData();
        }
        else {
          this.toaster.error(this.Details.message.toString(), '', { easeTime: 1000, timeOut: 3000 })
            }



            if (this.EditSubsscriptionData.Status == true) {
                this.StateIds = this.EditSubsscriptionData.data[0].stateid;
                var tmpstateId = this.EditSubsscriptionData.data[0].stateid.split(",");
                for (var i = 0; i < this.StateData.length; i++) {
                    for (var j = 0; j < tmpstateId.length; j++) {
                        if (this.StateData[i].stateId == tmpstateId[j]) {
                            this.StateData[i].selected = true;


                        }
                    }
                }
                this.onChangeOfMultiCheckBoxToGetCity();

                
               




               // this.onChangeOfMultiCheckBoxToGetSchool();
            }
            else {
            }


            //if (this.EditSubsscriptionData.Status == true) {
            //    this.StateIds = this.EditSubsscriptionData.data[0].stateid;
            //    var tmpstateId = this.EditSubsscriptionData.data[0].stateid.split(",");
            //    for (var i = 0; i < this.StateData.length; i++) {
            //        for (var j = 0; j < tmpstateId.length; j++) {
            //            if (this.StateData[i].stateId == tmpstateId[j]) {
            //                this.StateData[i].selected = true;


            //            }
            //        }
            //    }
              
            //     this.onChangeOfMultiCheckBoxToGetSchool();
            //}
            //else {
            //}


           

      }
    )
  }

  //On change of class Students are bind
  onChangeOfdropdown()
    {
      debugger;

    var classid = 0;
    var stream = "";
    
    
    if (this.SelectedClass == undefined || this.SelectedClass == 0) {
      classid = 0;
      this.SelectedStream = 0;
    }
    else if (this.SelectedClass == 1 || this.SelectedClass == 2 || this.SelectedClass == 3) {
      
      this.showstream = 0;
      this.SelectedStream = 0;

    }
    else {
      this.showstream = 1;
      classid = parseInt(this.SelectedClass);
      
    }
        

    if (this.SelectedStream == "" || this.SelectedStream == undefined || this.SelectedStream == null) {
      stream = "";
    }
    else {
      stream = this.SelectedStream;
    }
    if ((this.SchoolIds.length) > 0) {
      this.SelectedStudent = 0;
   
    }
    else {
      this.schid = this.SchoolIds;
    }
      

    
      let headers = new HttpHeaders({ 'Content-Type': 'application/json'});
      let options = { headers: headers };
      this.http.get('api/Subscription/GetFilterData?ClassId=' + classid + '&Stream=' + stream +'&School='+this.schid , options).subscribe(
        (data) => {
          debugger;
          this.GetFilterData = data;

          if (this.GetFilterData.Status == true) {
            this.StudentData = this.GetFilterData.classData;
          }
          else {
            this.StudentData = [];
          }
       
        },
        (err) => {
       
        }
      );

    }


  //Show div on change of check box
  onChangeOfCheckBox()
  {
    debugger;
    if (this.IsParent == true || this.IsStudent == true) {
      this.ShowDiv = true;
      this.SelectedClass = 0;
      this.SelectedStream = 0;
      this.SelectedStudent = 0;
    }
    else {
      this.ShowDiv = false;
      
    }
    
  }


  //Select All function for State
  SelectAllState()
  {
    debugger;
      this.StateIds = "";
      if (this.AllState === true)
      {
        for (var i = 0; i < this.StateData.length; i++) {
          this.StateData[i].selected = true;
          if (this.StateIds === '') {
            this.StateIds = this.StateData[i].stateId;
          }
          else {
            this.StateIds = this.StateIds + ',' + this.StateData[i].StateData;
          }
        }
      }
      else
      {
        for (var i = 0; i < this.StateData.length; i++)
        {
          this.StateData[i].selected = false;
        }
      }

  }

  //convert Selected state in String format
  SelectedState()
  {

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
    }
    else {
      for (var i = 0; i < this.CityData.length; i++) {
        this.CityData[i].selected = false;
      }
    }

  }

  //convert Selected city in String format
  SelectedCity()
  {
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
    }
    else {
      this.AllSchool = false;
    }

  }

  //Multi check box filter
  onChangeOfMultiCheckBoxToGetCity()
  {
    debugger;
    if (this.StateIds == null) { this.StateIds = ""; }
    if (this.CityIds == null) { this.CityIds = ""; }

    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    this.http.get('api/Subscription/getcityfilter?StateId=' + this.StateIds , options).subscribe(
      (data) => {
        this.GetCityData = data;
         
        if (this.GetCityData.Status == true) {
          this.CityData = this.GetCityData.citydata;
            }


            if (this.EditSubsscriptionData.Status == true) {
                this.CityIds = this.EditSubsscriptionData.data[0].cityid;
                var tmpcityid = this.EditSubsscriptionData.data[0].cityid.split(",");
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

      },
      (err) => {

      }
    );
  }
  onChangeOfMultiCheckBoxToGetSchool()
  {
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
            if (this.EditSubsscriptionData.Status == true) {
                this.SchoolIds = this.EditSubsscriptionData.data[0].schoolid;
                var tmpschoolid = this.EditSubsscriptionData.data[0].schoolid.split(",");
                for (var i = 0; i < this.SchoolData.length; i++) {
                    for (var j = 0; j < tmpschoolid.length; j++) {
                        if (this.SchoolData[i].schoolid == tmpschoolid[j]) {
                            this.SchoolData[i].selected = true;

                        }
                    }

                }
            }
            else {
            }
           

      },
      (err) => {

      }
    );
  }

  //Delete Subscription Data
  DeleteData(i:number, id:number) {
    debugger;
    if (this.StateIds == null) { this.StateIds = ""; }
    if (this.CityIds == null) { this.CityIds = ""; }

    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };

    //this.http.get('api/Subscription/deletesubscription?SubscriptionId=' + id + '&createdBy=' + this.localstorage.get("userid"), options).subscribe(
    //  (data) => {
    //    //  this.GetSavedData();

        
    //    this.subscriptiondata = data;
    //    if (this.subscriptiondata.status == true) {
    //      Swal.fire("", "Delete successfully", "success");
    //      this.GetSavedData();
    //      return;

    //    }
    Swal.fire({
      //title: 'Confirmation',
      text: 'Are you sure to delete this record?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
          this.http.get('api/Subscription/deletesubscription?SubscriptionId=' + id + '&createdBy=' + this.localstorage.get("userid"), options).subscribe(
        (data) => {
          //  this.GetSavedData();


          this.subscriptiondata = data;
          if (this.subscriptiondata.status == true) {
            Swal.fire("", "Deleted Successfully", "success");
            this.GetSavedData();
            return;

          }
          }
        )
      }
    })
  }

  //Save Subscription Details
  onSubmit()
  {
    debugger;

    if (this.startdate == null || this.startdate == undefined) {
      Swal.fire("", "Please enter start date ", "error");
      return;
    }

    if (this.enddate == null || this.enddate == undefined) {
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
    if (this.testimonial == "" || this.testimonial == undefined) {
      Swal.fire("", "Please enter testimonials", "error");
      return;
    }

    this.s_date = this.startdate.toISOString().slice(0, 10);
    this.e_date = this.enddate.toISOString().slice(0, 10);
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




    if (this.StateIds == '') {
      this.StateIds == ''
    }
    
    if (this.CityIds == '') {
      this.CityIds == ''
    }
    if (this.SchoolIds == '') {
      this.SchoolIds == ''
    }
    if (this.Message == '' || this.Message == undefined) {
      Swal.fire("", "Please enter message", "error");
      return;
    }

    if (this.IsParent == false && this.IsStudent == false && this.IsSchool==false)
    {
      Swal.fire("", "Please choose an option", "error");
      return;
    }

    if (this.IsParent == true || this.IsStudent == true)
    {

      if (this.SelectedClass == 0 || this.SelectedClass == 1 || this.SelectedClass == 2 || this.SelectedClass == 3 || this.SelectedClass == undefined) {
        this.SelectedStream = 0;

      }
      else {
        if (this.SelectedStream == 0 || this.SelectedStream == undefined) {
          Swal.fire("", "Please select stream", "error");
          return;
        }
      }
     
      //if (this.SelectedStudent.studentid == 0 || this.SelectedStudent == undefined) {
      //  Swal.fire("", "Please select student", "error");
      //  return;
      //}

    }
    else
    {
      this.SelectedClass = 0;
      this.SelectedStream = 0;
      this.SelectedStudent = 0;
    }

    


    var data
    if (this.ButtonText == "Update") {
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      let options = { headers: headers }
      debugger;
      data =
      {
        "SubscriptionId": this.Subscriptionid,
        "stateid": this.StateIds,
        "cityid": this.CityIds,
        "SchoolId": this.SchoolIds,
        "isschool": this.IsSchool == true ? 1 : 0,
        "isparent": this.IsParent == true ? 1 : 0, 
        "isstudents": this.IsStudent == true ? 1 : 0,
        "classid": this.SelectedClass,
        "streamid": this.SelectedStream,
        "studentid": this.SelectedStudent,
        "message": this.Message,
        "startdate": this.startdate,
        "enddate": this.enddate,
        "testimonials": this.testimonial,
        "starttime": st_time,
        "endtime": end_time,
        "createdby": parseInt(this.localstorage.get("userid"))
      };

      let body = JSON.stringify(data);
      debugger;
      this.http.post('api/Subscription/updatesubscription', body, options).subscribe(

        (data) => {
          debugger;
          this.SubscriptionData = data;
          if (this.SubscriptionData.Status == true) {
            Swal.fire("", "Updated Successfully", "success");
            this.onClear();
            this.GetSavedData();
            return;
          }
        }
      )
    }
    else {
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      let options = { headers: headers }

      data =
      {
        "acttype": "save",
        "StateId": this.StateIds,
        "CityId": this.CityIds,
        "SchoolId": this.SchoolIds,
        "ClassId": this.SelectedClass,
        "StreamId": this.SelectedStream,
        "StudentId": this.SelectedStudent,
        "Message": this.Message,
        "startdate": this.startdate,
        "enddate": this.enddate,
        "testimonials": this.testimonial,
        "starttime": st_time,
        "endtime": end_time,
        "IsParent": this.IsParent == true ? 1 : 0,
        "IsStudents": this.IsStudent == true ? 1 : 0,
        "IsSchool": this.IsSchool == true ? 1 : 0,
        "createdBy": parseInt(this.localstorage.get("userid"))
      };

      let body = JSON.stringify(data);

      this.http.post('api/Subscription/SaveSubscription', body, options).subscribe(

        (data) => {
          this.SubscriptionData = data;
          if (this.SubscriptionData.Status == true) {
            Swal.fire("", "Saved Successfully", "success");
            this.onClear();
            this.GetSavedData();
            return;
          }
        }
      )
    }
  }

  //Reset All Fields 
  onClear()
  {
    debugger;
    this.ButtonText = 'Save';
    this.Message = "";
    this.IsParent = false;
    this.IsSchool = false;
    this.IsStudent = false;
    this.SelectedClass = "0";
    this.SelectedStream = "0";
    this.SelectedStudent = "0";
    this.ShowDiv = false;
    this.startdate = null;
    this.enddate = null;
    this.starttime = null;
    this.endtime = null;
    this.testimonial = "";
    for (var i = 0; i < this.StateData.length; i++)
    {
      this.StateData[i].selected = false;
    }
    for (var i = 0; i < this.CityData.length; i++)
    {
      this.CityData[i].selected = false;
    }
    for (var i = 0; i < this.SchoolData.length; i++)
    {
      this.SchoolData[i].selected = false;
    }


  }

}




