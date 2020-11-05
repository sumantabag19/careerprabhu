import { Component, OnInit, Input, PipeTransform, Pipe, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';
import { HttpClient, HttpErrorResponse, HttpRequest, HttpHeaders } from '@angular/common/http';
import { LocalStorageService, LocalStorageModule } from 'angular-2-local-storage';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import Swal from 'sweetalert2';
import { SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import * as xlsx from 'xlsx';
declare var $: any;

@Component({
    selector: 'app-universitymaster',
    templateUrl: './universitymaster.component.html',
    //styleUrls: ['./webinar.component.css']
})
export class UniversityManager implements OnInit {
    public selectedcountry: number = 0;
    public CountryData: any = [];
    public university: string = "";
    public ButtonText: string = "Save";
    public GetSaveData: any = [];
    public location: string = "";
    public selectedlocation: number = 0;
    public LocationData: any = [];
    public CountryDetails: any = [];
    public LocButtonText: any = "Save";
    public LocationSavedData: any = [];
    public locdata: any = [];
    public UniversityData: any = [];
    public Detail: any = [];
    public GetEditedData: any = [];
    public universityid: number = 0;
  public DeleteUniversityData: any = [];
  public selectedcity: number = 0;
  public CityButtonText: string = "Save";
  public city: string = "";
  public CitySavedData: any = [];
  public Citydata: any = [];
  public CityNewData: any = [];
  //@ViewChild('fileInput', { static: true }) private fileInput: ElementRef;
  @ViewChild('fileInput', { static: true }) private myInputVariableprefile: ElementRef;
  message: string = "";
  excelfile: any = [];
  arrayBuffer: any = [];
  exceldata: any = [];
  GetData1: any = [];
  dw: string = "";
  SelectedImage: any = [];
  constructor(private http: HttpClient, private router: Router, private localstorage: LocalStorageService, private toaster: ToastrService, private loader: NgxUiLoaderService) {

    }
    ngOnInit() {
        this.getCountry();
      this.GetData();
      this.dw = "http://admin.careerprabhu.com/Book1.xlsx";
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
    var cols = ["country","state","city","university"];
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
      this.http.post('api/InstituteMaster/Upload', body, options).subscribe(
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

















    //bind country data
    getCountry() {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        let options = { headers: headers };
        this.CountryDetails = [];
        var a;
        var tmpclass: any = [];
        this.http.get('api/InstituteMaster/Bindcountry', options).subscribe(
            (data) => {
                debugger;
                this.CountryDetails = data;

                this.CountryData = this.CountryDetails;

            }
        )
    }

    //save location 
    onSubmitLoc() {
        debugger;
        if (this.selectedcountry == 0 || this.selectedcountry == undefined) {
            Swal.fire("", "Please select country", "error");
            return;
        }
        if (this.location == "" || this.location == undefined) {
            Swal.fire("", "Please enter location", "error");
            return;
        }
        //save operation
        var data;
      
            let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
            let options = { headers: headers }
            data =
                {

                    "locationid": 0,
                    "countryid": this.selectedcountry,
                    "location":this.location
                    //"createdby": parseInt(this.localstorage.get("userid"))
                };
            let body = JSON.stringify(data);
            this.http.post('api/InstituteMaster/SaveLocation', body, options).subscribe(

                (data) => {
                    this.LocationSavedData = data;
                    if (this.LocationSavedData.Status == true) {
                        if (this.LocationSavedData.Message == "Location Already Exists") {
                            Swal.fire("", "Location Already Exists", "success");
                            //this.onClear();
                          //this.GetData();
                          this.location = "";
                          this.BindLocation();
                            return;
                        }
                        else {
                            Swal.fire("", "Saved Successfully", "success");
                            //this.onClear();
                          //this.GetData();
                          this.location = "";
                          this.BindLocation();
                            return;
                        }
                        
                    }
                }
            )

  }


  //save city
  onSubmitCity() {
    debugger;
    if (this.selectedcountry == 0 || this.selectedcountry == undefined) {
      Swal.fire("", "Please select country", "error");
      return;
    }
    if (this.selectedlocation == 0 || this.selectedlocation == undefined) {
      Swal.fire("", "Please select state", "error");
      return;
    }
    if (this.city == "" || this.city == undefined) {
      Swal.fire("", "Please enter city", "error");
      return;
    }


    //save operation
    var data;

    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers }
    data =
    {

      "cityid": 0,
      "countryid": this.selectedcountry,
      "locationid": this.selectedlocation,
      "cityname": this.city
      //"createdby": parseInt(this.localstorage.get("userid"))
    };
    let body = JSON.stringify(data);
    this.http.post('api/InstituteMaster/SaveCity', body, options).subscribe(

      (data) => {
        this.CitySavedData = data;
        if (this.CitySavedData.Status == true) {
          if (this.CitySavedData.Message == "City Already Exists") {
            Swal.fire("", "City Already Exists", "success");
            //this.onClear();
            //this.GetData();
            this.city = "";
            this.BindCity();
            return;
          }
          else {
            Swal.fire("", "Saved Successfully", "success");
            //this.onClear();
            //this.GetData();
            this.city = "";
            this.BindCity();
            return;
          }

        }
      }
    )

  }



    //get location
    BindLocation() {
        debugger;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        let options = { headers: headers };
        this.locdata = [];
        var body = {
            "countryid": this.selectedcountry
        }
        var tmpclass: any = [];
        this.http.post('api/InstituteMaster/BindLocation', body, options).subscribe(

            (data) => {
                this.locdata = data;
                if (this.locdata.Status == true) {
                    this.LocationData = this.locdata.data;
                }
                else {
                    this.LocationData = this.locdata.data;
                }
            }
        )
  }


  //get city
  BindCity() {
    debugger;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    this.locdata = [];
    var body = {
      "countryid": this.selectedcountry,
      "locationid": this.selectedlocation
    }
    var tmpclass: any = [];
    this.http.post('api/InstituteMaster/BindCity', body, options).subscribe(

      (data) => {
        this.Citydata = data;
        if (this.Citydata.Status == true) {
          this.CityNewData = this.Citydata.data;
        }
        else {
          this.CityNewData = this.Citydata.data;
        }
      }
    )
  }



    onSubmit() {
        if (this.selectedcountry == 0 || this.selectedcountry == undefined) {
            Swal.fire("", "Please select country", "error");
            return;
        }
        if (this.selectedlocation == 0 || this.selectedlocation == undefined) {
            Swal.fire("", "Please select location", "error");
            return;
      }
      if (this.selectedcity == 0 || this.selectedcity == undefined) {
        Swal.fire("", "Please select city", "error");
        return;
      }
        if (this.university == "" || this.university == undefined) {
            Swal.fire("", "Please enter university", "error");
            return;
        }

        var data;
        if (this.ButtonText == "Save") {

            let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
            let options = { headers: headers }
            data =
                {

                    "universityid": 0,
                    "countryid": this.selectedcountry,
              "locationid": this.selectedlocation,
              "cityid": this.selectedcity,
                    "university": this.university,
                    
                };
            let body = JSON.stringify(data);
            this.http.post('api/InstituteMaster/SaveUniversity', body, options).subscribe(

                (data) => {
                    this.UniversityData = data;
                    if (this.UniversityData.Status == true) {
                        if (this.UniversityData.Message == "University Already Exists") {
                            Swal.fire("", "University Already Exists", "success");
                            this.onClear();
                            //this.GetData();
                            return;
                        }
                        else {
                            Swal.fire("", "Saved Successfully", "success");
                            this.onClear();
                            this.GetData();
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

                    "universityid": this.universityid,
                    "countryid": this.selectedcountry,
              "locationid": this.selectedlocation,
              "cityid": this.selectedcity,
                    "university": this.university,

                };
            let body = JSON.stringify(data);
            this.http.post('api/InstituteMaster/UpdateUniversity', body, options).subscribe(

                (data) => {
                    this.UniversityData = data;
                    if (this.UniversityData.Status == true) {
                     
                            Swal.fire("", "Updated Successfully", "success");
                            this.onClear();
                            this.GetData();
                            return;
                        

                    }
                }
            )
        }




    }

    //get data for bind table
    GetData() {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        let options = { headers: headers };
        this.Detail = [];

        this.http.get('api/InstituteMaster/GetUniversityData', options).subscribe(
            (data) => {
                debugger;
                this.Detail = data;
                this.GetSaveData = this.Detail.data;
                //this.HeaderData = Object.keys(this.GetSaveData[0]);

            }
        )
    }




    onClear() {
        this.selectedcountry = 0;
      this.selectedlocation = 0;
      this.city = "";
      this.location = "";
      this.selectedcity = 0;
      this.ButtonText = "Save";
      this.university = "";
      this.myInputVariableprefile.nativeElement.value = "";
      this.excelfile = [];
        this.GetData();
    }
    EditData(i: number, universityid) {
        debugger;
        
        this.getCountry();
        
        this.ButtonText = 'Update';
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        let options = { headers: headers };

        this.http.get('api/InstituteMaster/EditUniversityData?universityid=' + universityid, options).subscribe(
            (data) => {
                debugger;
                this.GetEditedData = data;
                if (this.GetEditedData.Status == true) {

                    this.selectedcountry = this.GetEditedData.countryid;
                    this.BindLocation();
                    this.selectedlocation = this.GetEditedData.locationid;
          
                  this.location = this.GetEditedData.location;
                  this.BindCity();
                  this.selectedcity = this.GetEditedData.cityid;
                  this.city = this.GetEditedData.cityname;
                    this.university = this.GetEditedData.universityname;
                    this.universityid = this.GetEditedData.universityid;
                   



                }
            }
        )





    }
    DeleteData(i: number, universityid) {

        debugger;
        var data


        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        let options = { headers: headers }
        debugger;
        data =
            {

            "universityid": universityid
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
                this.http.post('api/InstituteMaster/DeleteUniversity', body, options).subscribe(

                    (data) => {
                        debugger;
                        this.DeleteUniversityData = data
                        if (this.DeleteUniversityData.Status == true) {
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
}
