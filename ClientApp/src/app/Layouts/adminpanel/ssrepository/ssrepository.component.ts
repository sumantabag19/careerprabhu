import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';
import { HttpClient, HttpErrorResponse, HttpRequest, HttpHeaders } from '@angular/common/http';
import { LocalStorageService, LocalStorageModule } from 'angular-2-local-storage';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ssrepository',
  templateUrl: './ssrepository.component.html',
  //styleUrls: ['./webinar.component.css']
})

export class RepositoryManager implements OnInit {

  public ClassData: any = [];
  public Details: any = {};
  public StreamDetails: any = {};
  public classid: string = "";
  public AllClass: boolean = false;
  public AllStream: boolean = false;
  public SelectedStream: any = [];
  public ButtonText: string = 'Save';
  public SelectedClass: any = [];
  public repositoryname: string = "";
  public StreamData: any = [];
  public streamid: string = "";
  public streamname: string = "";
  public WebinarData: any = [];
  public GetSaveData: any = [];
  public HeaderData: any = [];
  public EditRepoData: any = [];
  public ID: number = 0;

  constructor(private http: HttpClient, private router: Router, private localstorage: LocalStorageService, private toaster: ToastrService, private loader: NgxUiLoaderService) {

  }

  ngOnInit() {
    //this.GetClass();
    //this.GetStream();
    this.GetSavedData();
  }
 

  //Delete Subscription Data
  DeleteData(i: number, id: number) {
    debugger;
    var data
    

    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers }
    debugger;
    data =
      {
        "acttype": "delete",       
        "ID": id
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
        this.http.post('api/repository/deleteRepository', body, options).subscribe(

          (data) => {
            debugger;
            this.StreamDetails = data
            if (this.StreamDetails.Status == true) {
              this.GetSavedData();
                Swal.fire("", "Deleted Successfully", "success");
              this.onClear();
              return;
            }
          }
        )
      }
    })
  }

 
 
  

  //On Save
  onSubmit() {
      debugger;
    
    
    if (this.repositoryname == "" || this.repositoryname == undefined) {
      Swal.fire("", "Please enter interest area", "error");
      return;
    }
    var data
    if (this.ButtonText == "Update") {
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      let options = { headers: headers }
      debugger;
      data =
        {
          "acttype": "update",
         
          "repositoryname": this.repositoryname,
         
          "ID": this.ID
        };

      let body = JSON.stringify(data);
      debugger;
      this.http.post('api/repository/UpdateRepository', body, options).subscribe(

        (data) => {
          debugger;
          this.StreamDetails = data;
          if (this.StreamDetails.Status == true) {
            if (this.StreamDetails.Message == "Intrest Area Already Exists") {
              this.GetSavedData();
              Swal.fire("", "Intrest Area Already Exists", "success");
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
    else {
      debugger;
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      let options = { headers: headers }

      data =
        {
          "acttype": "save",
          //"classid": this.classid,
          //"streamid": this.streamid,
          "repositoryname": this.repositoryname,
          //"createdby": parseInt(this.localstorage.get("userid")),
          "ID": 0
        };

      let body = JSON.stringify(data);

      this.http.post('api/repository/SaveRepositoryDetail', body, options).subscribe(

        (data) => {
          debugger;
          this.WebinarData = data;
          if (this.WebinarData.status == true) {
            if (this.WebinarData.Message == "Intrest Area Already Exists") {
              this.GetSavedData();
              Swal.fire("", "Intrest Area Already Exists", "success");
              this.onClear();
              return;
            }
            else {
              Swal.fire("", "Saved Successfully", "success");
              this.onClear();
              this.GetSavedData();
              return;
            }
           
          }
        }
      )
    }
  }
  //Get Saved Webinar data in table 
  GetSavedData() {
    debugger;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    this.http.get('api/repository/GetrepositorySavedData', options).subscribe(

      (data) => {
        var a;
        var b;
        debugger;
        this.GetSaveData = data;
       
    
        this.HeaderData = Object.keys(this.GetSaveData[0]);
      }
    )
  }

  

  //Select All function for stream
  
  onClear() {
    debugger;
    this.ButtonText = 'Save';
    this.repositoryname = "";
    
  }
  //Edit Subscription Data


  EditRepositoryData(i: number, ID) {
    debugger;
    this.ButtonText = 'Update';
    var index = i;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    this.http.get('api/repository/EditRepository?ID=' + ID, options).subscribe(

      (data) => {
        debugger;
        this.EditRepoData = data;
        this.ID = this.EditRepoData.ID;
        this.repositoryname = this.EditRepoData.repositoryname;

      }
    )
  }
}




