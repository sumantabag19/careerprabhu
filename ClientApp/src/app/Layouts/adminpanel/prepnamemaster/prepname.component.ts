import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';
import { HttpClient, HttpErrorResponse, HttpRequest, HttpHeaders } from '@angular/common/http';
import { LocalStorageService, LocalStorageModule } from 'angular-2-local-storage';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-prepname',
  templateUrl: './prepname.component.html',
  //styleUrls: ['./webinar.component.css']
})

export class prepnameManager implements OnInit {
  public ButtonText: string = "Save";
  public Details: any = [];
  public ClassData: any = [];
  public StreamDetails: any = [];
  public StreamData: any = [];
  public CareerDetails: any = [];
  public CareerData: any = [];
  public selectedprepcatagory: number = 0;
  public AllClass: boolean = false;
  public AllStream: boolean = false;
  public AllCareer: boolean = false;
  public classid: string = "";
  public streamid: string = "";
  public careerid: string = "";
  public prepdetails: any = [];
  public PrepData: any = [];
  public description: string="";
  public prepname: string = "";
  public prepnameid: number = 0;
  public saveddatadetail: any = [];
  public GetSaveData: any = [];
  public HeaderData: any = [];
  public EditPrepData: any = [];
  public DeletedData: any = [];
  public showstream: number = 0;
  search: string = "";


  constructor(private http: HttpClient, private router: Router, private localstorage: LocalStorageService, private toaster: ToastrService, private loader: NgxUiLoaderService) {

  }

  ngOnInit() {
    this.bindprepcategory();
    this.GetClass();
    this.GetStream();
    this.GetCareer();
    this.GetSavedData();
  }

  //bind prepratory ategory
  bindprepcategory() {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    this.prepdetails = [];
    var a;
    var tmpclass: any = [];
    this.http.get('api/prepratoryname/bindprepcategory', options).subscribe(
      (data) => {
        this.prepdetails = data;
        if (this.prepdetails.Status == true) {
          this.PrepData = this.prepdetails.data;
        }
      }
    )
  }



  //Get all data for bind dropdowns
  GetClass() {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };


    this.http.get('api/prepratoryname/GetPrepClass', options).subscribe(

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
  // Get Streams Data
  GetStream() {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };


    this.http.get('api/prepratoryname/GetPrepStream', options).subscribe(

      (data) => {

        this.StreamDetails = data;

        if (this.StreamDetails.status == true) {
          this.StreamData = this.StreamDetails.data;
          
        }
        else {
          this.toaster.error(this.StreamDetails.message.toString(), '', { easeTime: 1000, timeOut: 3000 })
        }
      }
    )
  }

  //get career data
  GetCareer() {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };


    this.http.get('api/prepratoryname/GetPrepCareer', options).subscribe(

      (data) => {

        this.CareerDetails = data;

        if (this.CareerDetails.status == true) {
          this.CareerData = this.CareerDetails.data;
         
        }
        else {
          this.toaster.error(this.CareerDetails.message.toString(), '', { easeTime: 1000, timeOut: 3000 })
        }
      }
    )
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

  //Select All function for career
  SelectAllCareer() {
    debugger;
    this.careerid = "";
    if (this.AllCareer === true) {
      for (var i = 0; i < this.CareerData.length; i++) {
        this.CareerData[i].selected = true;
        if (this.careerid === '') {
          this.careerid = this.CareerData[i].careerid;
        }
        else {
          this.careerid = this.careerid + ',' + this.CareerData[i].careerid;
        }
      }
    }
    else {
      for (var i = 0; i < this.CareerData.length; i++) {
        this.CareerData[i].selected = false;
      }
    }

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
    }
    else {
      this.AllClass = false;
    }

  }

  //get selected stream
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

  }


  //get selected career
  getSelectedCareer() {
    debugger;
    this.careerid = "";
    var count = 0;
    for (var i = 0; i < this.CareerData.length; i++) {

      if (this.CareerData[i].selected === true) {

        if (this.careerid === '') {
          this.careerid = this.CareerData[i].careerid;
          count++;
        }
        else {
          this.careerid = this.careerid + ',' + this.CareerData[i].careerid;
          count++;
        }
      }
    }
    if (this.CareerData.length === count) {
      this.AllCareer = true;
    }
    else {
      this.AllCareer = false;
    }

  }
  onSubmit() {
    if (this.ButtonText == "Save") {
      if (this.classid == '' || this.classid == undefined)
      {
        Swal.fire("", "Please select class", "error");
        return;
      }
      if (this.streamid == '' || this.streamid == undefined) {
        this.streamid = "";
      }
      if (this.careerid == '' || this.careerid == undefined) {
        this.careerid = "";
      }
      if (this.selectedprepcatagory == 0 || this.selectedprepcatagory == undefined) {
        Swal.fire("", "Please enter Category", "error");
        return;
      }
      if (this.description == '' || this.description == undefined) {
        Swal.fire("", "Please enter description", "error");
        return;
      }
      if (this.prepname == '' || this.prepname == undefined) {
        Swal.fire("", "Please enter prepratory name", "error");
        return;
      }

      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      let options = { headers: headers }
      debugger;
      var data =
        {
        "prepnameid": this.prepnameid,
        "prepid": this.selectedprepcatagory,
          "classid": this.classid,
          "streamid": this.streamid,
          "careerid": this.careerid,
        "description": this.description,
          "prepname":this.prepname,
          "createdby": parseInt(this.localstorage.get("userid"))
         
        };

      let body = JSON.stringify(data);
      this.http.post('api/prepratoryname/SavePrepname', body, options).subscribe(

        (data) => {
          debugger;
          this.saveddatadetail = data;
          if (this.saveddatadetail.status == true) {
            if (this.saveddatadetail.Message == "Prepratory Title Already Exists") {
              this.GetSavedData();
              Swal.fire("", "Prepratory Title Already Exists", "success");
              //this.onClear();
              return;
            }
            else {
              this.GetSavedData();
              Swal.fire("", "Saved Successfully", "success");
              this.onClear();
              return;
            }
           
          }
        }
      )


    }
    else {

      if (this.classid == '' || this.classid == undefined) {
        Swal.fire("", "Please select class", "error");
        return;
      }
      if (this.streamid == '' || this.streamid == undefined) {
        this.streamid = "";
      }
      if (this.careerid == '' || this.careerid == undefined) {
        this.careerid = "";
      }
      if (this.selectedprepcatagory == 0 || this.selectedprepcatagory == undefined) {
        Swal.fire("", "Please enter Category", "error");
        return;
      }
      if (this.description == '' || this.description == undefined) {
        Swal.fire("", "Please enter description", "error");
        return;
      }
      if (this.prepname == '' || this.prepname == undefined) {
        Swal.fire("", "Please enter prepratory name", "error");
        return;
      }

      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      let options = { headers: headers }
      debugger;
      var data =
      {
        "prepnameid": this.prepnameid,
        "prepid": this.selectedprepcatagory,
        "classid": this.classid,
        "streamid": this.streamid,
        "careerid": this.careerid,
        "description": this.description,
        "prepname": this.prepname,
        "createdby": parseInt(this.localstorage.get("userid"))

      };

      let body = JSON.stringify(data);
      this.http.post('api/prepratoryname/UpdatePrepName', body, options).subscribe(

        (data) => {
          debugger;
          this.saveddatadetail = data;
          if (this.saveddatadetail.status == true) {
            if (this.saveddatadetail.Message == "Prepratory Title Already Exists") {
              this.GetSavedData();
              Swal.fire("", "Updated Successfully", "success");
              this.onClear();
              return;
            }
            else {
              this.GetSavedData();
              Swal.fire("", "Updated Successfully", "success");
              this.onClear();
              return;
            }
            
          }
        }
      )


    }
  }

  //reset all field
  onClear() {
    this.selectedprepcatagory = 0;
    this.description = "";
    this.prepname = "";
    this.ButtonText = "Save";
    for (var i = 0; i < this.ClassData.length; i++) {
      this.ClassData[i].selected = false;
      this.AllClass = false;
    }
    for (var i = 0; i < this.StreamData.length; i++) {
      this.StreamData[i].selected = false;
      this.AllStream = false;
    }
    for (var i = 0; i < this.CareerData.length; i++) {
      this.CareerData[i].selected = false;
      this.AllCareer = false;
    }
  }

  //bind table data
  //Get Saved Webinar data in table 
  GetSavedData() {
    debugger
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    this.http.get('api/prepratoryname/GetPrepSavedData', options).subscribe(

      (data) => {
        var a;
        var b;
        var c;
        debugger;
        this.GetSaveData = data;
        for (var i = 0; i < this.GetSaveData.length; i++) {
          var classname = "";
          var streamname = "";
          var careername = "";
          debugger;
          for (var j = 0; j < this.GetSaveData[i].classname.length; j++) {
            a = this.GetSaveData[i].classname.split(",");
            b = this.GetSaveData[i].streamname.split(",");
            c = this.GetSaveData[i].careername.split(",");
          }
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
          for (var k = 0; k < b.length; k++) {
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

          for (var k = 0; k < c.length; k++) {
            for (var l = 0; l < this.CareerData.length; l++) {
              if (c[k] == this.CareerData[l].careerid) {
                if (k > 0) {
                  careername = careername + ", " + this.CareerData[l].careername;
                }
                else {
                  careername = careername + this.CareerData[l].careername;
                }
              }
            }
          }

          this.GetSaveData[i].classname = classname;
          this.GetSaveData[i].streamname = streamname;
          this.GetSaveData[i].careername = careername;
       
        }

        this.HeaderData = Object.keys(this.GetSaveData[0]);
      }
    )
  }


  //Edit Subscription Data 
  EditData(i: number, ID) {
    debugger;
    this.onClear();
    this.ButtonText = 'Update';
    var index = i;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    this.http.get('api/prepratoryname/EditPrepratory?prepnameid=' + ID, options).subscribe(

      (data) => {
        debugger;
        this.EditPrepData = data;
      
        
        this.prepnameid = this.EditPrepData.data.prepnameid;
        this.classid = this.EditPrepData.data.classid;
        //this.GetCareer();
        this.streamid = this.EditPrepData.data.streamid;
        //this.GetStream();
        this.careerid = this.EditPrepData.data.careerid;
        this.description = this.EditPrepData.data.description;
        this.prepname = this.EditPrepData.data.prepname;
        this.bindprepcategory();

        this.selectedprepcatagory = this.EditPrepData.data.prepid;

        var tmpClassId = this.EditPrepData.data.classid.split(",");
        for (var i = 0; i < this.ClassData.length; i++) {
          for (var j = 0; j < tmpClassId.length; j++) {
            if (this.ClassData[i].classid == tmpClassId[j]) {
              this.ClassData[i].selected = true;
            }
            
          }
        }

        if (this.ClassData.length == tmpClassId.length) {
          this.AllClass = true;
        }
        else {
          this.AllClass = false;
        }


        for (var i = 0; i < this.ClassData.length; i++) {
          if (this.ClassData[i].selected === true) {
            if ((this.ClassData[i].classid == 1 || this.ClassData[i].classid == 2 || this.ClassData[i].classid == 3)) {

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





        var tmpStreamid = this.EditPrepData.data.streamid.split(",");
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



        var tmpCareerid = this.EditPrepData.data.careerid.split(",");
        for (var i = 0; i < this.CareerData.length; i++) {
          for (var j = 0; j < tmpCareerid.length; j++) {
            if (this.CareerData[i].careerid == tmpCareerid[j]) {
              this.CareerData[i].selected = true;
            }
            
          }
        }

        if (this.CareerData.length == tmpCareerid.length) {
          this.AllCareer = true;
        }
        else {
          this.AllCareer = false;
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
        "prepnameid": Id,

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
        this.http.post('api/prepratoryname/DeletePrepname', body, options).subscribe(
          (data) => {
            this.DeletedData = data;
            if (this.DeletedData.status == true) {
              Swal.fire("", "Deleted Successfully", "success");
              this.GetSavedData();
              this.onClear();
              return;
            }
          }
        )
      }
    })


  }




}
