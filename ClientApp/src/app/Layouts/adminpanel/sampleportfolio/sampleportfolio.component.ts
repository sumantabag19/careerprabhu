import { Component, OnInit, Input, PipeTransform, Pipe, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';
import { HttpClient, HttpErrorResponse, HttpRequest, HttpHeaders } from '@angular/common/http';
import { LocalStorageService, LocalStorageModule } from 'angular-2-local-storage';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import Swal from 'sweetalert2';
import { SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';


@Component({
    selector: 'app-sampleportfolio',
    templateUrl: './sampleportfolio.component.html',
    //styleUrls: ['./webinar.component.css']
})
export class SamplePortfolioManager implements OnInit {

    public SelectedTrait: number = 0;
    public guideline: string = "";
    public link: string = "";
    public SelectedFile: string = "";
    public AllCountry: any;
    public CountryData: any = [];
    public AllLocation: any;
    public LocationData: any;
    public AllUniversity: any;
    public UniversityData: any = [];
    public GetSaveData: any = [];
    public ButtonText: string = "Save";
    public TraitData: any = [];
    public TraitDetails: any = [];
    @ViewChild('inputfile', { static: true }) private myInputVariableprefile: ElementRef;
    public pdffile: any = [];
    public pdftoupload: any;
    public orgpdfname: string = "";
    public GetAllCheckboxData: any = [];
    public Details: any = [];
    public Countryids: string = "";
    public Locationids: string = "";
    public Universityids: string = "";
    public GetLocationData: any = [];
    public GetUniversityData: any = [];
    public sampleportfolioid: number = 0;
    public sampleportfoliodata: any = [];
    public getsample: any = [];
    public EditSamplePortfolioData: any = [];
  public DeleteSamplePortfolioData: any = [];
  public checklink: boolean = false;
  CountryDetails: any = [];
  selectedcountry: number = 0;
  locdata: any = [];
  location: number = 0;
  citdata: any = [];
  city: number = 0;
  univdata: any = [];
  univercity: number = 0;
  CityData: any = [];
  description: string = "";
  subtrait: string = "";
  search: string = "";
  selectedlanguage: number = 0;
  languagedata: any = [];
  languagedatadetail: any = [];
    constructor(private http: HttpClient, private router: Router, private localstorage: LocalStorageService, private toaster: ToastrService, private loader: NgxUiLoaderService) {

    }
    ngOnInit() {
        this.BindTrait();
      this.getCountry();
      this.GetSavedData();
      this.getLanguage();
  }
  getLanguage() {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };

    var a;
    var tmpclass: any = [];
    this.http.get('api/SamplePortfolio/bindlanguage', options).subscribe(
      (data) => {
        debugger;
        this.languagedatadetail = data;
        if (this.languagedatadetail.Status == true) {
          this.languagedata = this.languagedatadetail.data;
        }
      }
    )
  }
    //Bind Trait
    BindTrait() {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        let options = { headers: headers };
        this.TraitDetails = [];
        var a;
        var tmpclass: any = [];
        this.http.get('api/SamplePortfolio/BindTrait', options).subscribe(
            (data) => {
                this.TraitDetails = data;
                if (this.TraitDetails.Status == true) {
                    this.TraitData = this.TraitDetails.data;
                }
            }
        )
    }

//get file detail
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


  getCountry() {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    this.CountryDetails = [];
    var a;
    var tmpclass: any = [];
    this.http.get('api/SamplePortfolio/Bindcountry', options).subscribe(
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
    this.http.post('api/SamplePortfolio/BindLocation', body, options).subscribe(

      (data) => {
        debugger;
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
  BindCity() {
    debugger;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
 
    var body = {
      "countryid": this.selectedcountry,
      "locationid": this.location
    }
    var tmpclass: any = [];
    this.http.post('api/SamplePortfolio/BindCity', body, options).subscribe(

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
    this.http.post('api/SamplePortfolio/BindUniversity', body, options).subscribe(

      (data) => {
        this.univdata = data;
        if (this.univdata.Status == true) {
          this.UniversityData = this.univdata.data;
        }
        else {
          this.UniversityData = this.univdata.data;
        }
      
      }
    )
  }


    //save and update data
    onSubmit() {

        if (this.ButtonText == "Save") {
            if (this.SelectedTrait == 0 || this.SelectedTrait == undefined) {
                Swal.fire("", "Please select trait", "error");
                return;
          }
          if (this.guideline == "" || this.guideline == undefined) {
                Swal.fire("", "Please enter guideline", "error");
                return;
          }
          if (this.link == "" || this.link == undefined) {
            this.link == "";
          }
          if (this.orgpdfname == "" || this.orgpdfname == undefined) {
            this.orgpdfname == "";
          }
          if (this.description == "" && this.description==undefined) {
            Swal.fire("", "Please enter description", "error");
            return;
          }
          if (this.subtrait == "" && this.subtrait == undefined) {
            Swal.fire("", "Please enter subtrait", "error");
            return;
          }
          if (this.selectedcountry == 0 && this.selectedcountry ==undefined) {
                Swal.fire("", "Please select country", "error");
                return;
            }

          if (this.location == 0 && this.location == undefined) {
                Swal.fire("", "Please select location", "error");
                return;
          }
          if (this.city == 0 && this.city == undefined) {
                Swal.fire("", "Please select city", "error");
                return;
          }
          if (this.univercity == 0 && this.univercity == undefined) {
            Swal.fire("", "Please select university", "error");
            return;
          }
            let input = new FormData();

            input.append("sampleportfolioid", this.sampleportfolioid.toString());

          input.append("traitid", this.SelectedTrait.toString());
          input.append("subtrait", this.subtrait.toString());
          input.append("guideline", this.guideline.toString());
          input.append("description", this.description.toString());
          input.append("languageid", this.selectedlanguage.toString());
            input.append("link", this.link.toString());
            input.append("pdf", this.pdftoupload);
          input.append("orgpdfname", this.orgpdfname.toString());
          input.append("countryid", this.selectedcountry.toString());
          input.append("locationid", this.location.toString());
          input.append("universityid", this.univercity.toString());
          input.append("cityid", this.city.toString());
            input.append("createdby", this.localstorage.get("userid").toString());

            this.http.post('api/SamplePortfolio/SaveSamplePortfolioData', input)
                .subscribe(
                    (data) => {
                        debugger;
                        this.sampleportfoliodata = data;
                    if (this.sampleportfoliodata.Status == true) {
                      if (this.sampleportfoliodata.Message == "Subtrait Already Exists") {
                        Swal.fire("", "Subtrait Already Exists", "success");
                        this.onClear();
                        this.GetSavedData();
                        return;
                      }
                      else {
                        Swal.fire("", "Saved Successfully", "success");
                        this.onClear();
                        this.GetSavedData();
                        return;
                      }
                          
                        }

                    })




        }
        else {
          if (this.SelectedTrait == 0 || this.SelectedTrait == undefined) {
            Swal.fire("", "Please select trait", "error");
            return;
          }
          if (this.guideline == "" || this.guideline == undefined) {
            Swal.fire("", "Please enter guideline", "error");
            return;
          }
          if (this.link == "" || this.link == undefined) {
            this.link == "";
          }
          if (this.orgpdfname == "" || this.orgpdfname == undefined) {
            this.orgpdfname == "";
          }
          if (this.description == "" && this.description == undefined) {
            Swal.fire("", "Please enter description", "error");
            return;
          }
          if (this.subtrait == "" && this.subtrait == undefined) {
            Swal.fire("", "Please enter subtrait", "error");
            return;
          }
          if (this.selectedcountry == 0 && this.selectedcountry == undefined) {
            Swal.fire("", "Please select country", "error");
            return;
          }

          if (this.location == 0 && this.location == undefined) {
            Swal.fire("", "Please select location", "error");
            return;
          }
          if (this.city == 0 && this.city == undefined) {
            Swal.fire("", "Please select city", "error");
            return;
          }
          if (this.univercity == 0 && this.univercity == undefined) {
            Swal.fire("", "Please select university", "error");
            return;
          }
            let input = new FormData();
       

          input.append("sampleportfolioid", this.sampleportfolioid.toString());

          input.append("traitid", this.SelectedTrait.toString());
          input.append("subtrait", this.subtrait.toString());
          input.append("guideline", this.guideline.toString());
          input.append("description", this.description.toString());
          input.append("link", this.link.toString());
          input.append("pdf", this.pdftoupload);
          input.append("orgpdfname", this.orgpdfname.toString());
          input.append("countryid", this.selectedcountry.toString());
          input.append("locationid", this.location.toString());
          input.append("universityid", this.univercity.toString());
          input.append("cityid", this.city.toString());
          input.append("languageid", this.selectedlanguage.toString());
          input.append("createdby", this.localstorage.get("userid").toString());

            this.http.post('api/SamplePortfolio/UpdateSamplePortfolioData', input)
                .subscribe(
                    (data) => {
                        debugger;
                        this.sampleportfoliodata = data;
                    if (this.sampleportfoliodata.Status == true) {
                      if (this.sampleportfoliodata.Message == "Subtrait Already Exists") {
                        Swal.fire("", "Subtrait Already Exists", "success");
                        this.onClear();
                        this.GetSavedData();
                        return;
                      }
                      else {
                        Swal.fire("", "Updated Successfully", "success");
                        this.onClear();
                        this.GetSavedData();
                        return;
                      }
                           
                        }

                    })
        }
    }

    //get data for display
    GetSavedData() {
        debugger;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        let options = { headers: headers };
        this.http.get('api/SamplePortfolio/BindSamplePortfolioData', options).subscribe(

            (data) => {

                debugger;
            this.getsample = data;
           
            this.GetSaveData = this.getsample.data;

                
            }
        )
    }



  onClear() {
    this.ButtonText = "Save";
        this.SelectedTrait = 0;
        this.guideline = "";
        this.link = "";
        this.myInputVariableprefile.nativeElement.value = "";
    
        this.SelectedFile = "";
        this.orgpdfname = "";
       
    this.pdftoupload = [];
    this.selectedlanguage = 0;
    this.orgpdfname = "";
    this.description = "";
    this.selectedcountry = 0;
    this.location = 0;
    this.city = 0;
    this.univercity = 0;
    this.subtrait = "";
     
    }


    //edit data
    EditData(i: number, sampleportfolioid) {
      debugger;
      this.getLanguage();

        this.ButtonText = 'Update';
        var index = i;
        var SubscriptionId = SubscriptionId;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        let options = { headers: headers };
        this.http.get('api/SamplePortfolio/EditSamplePortfolio?sampleportfolioid=' + sampleportfolioid, options).subscribe(

            (data) => {
                debugger;
                this.EditSamplePortfolioData = data;
                this.sampleportfolioid = this.EditSamplePortfolioData.data[0].sampleportfolioid;



            this.link = this.EditSamplePortfolioData.data[0].link;
            this.BindTrait();
            this.SelectedTrait = this.EditSamplePortfolioData.data[0].traitid;
            this.getCountry();
            this.selectedcountry = this.EditSamplePortfolioData.data[0].countryid;
            this.BindLocation();
            this.location = this.EditSamplePortfolioData.data[0].locationid;
            this.BindCity();
            this.city = this.EditSamplePortfolioData.data[0].cityid;
            this.BindUniversity();
            this.univercity = this.EditSamplePortfolioData.data[0].universityid;
            this.guideline = this.EditSamplePortfolioData.data[0].guideline;
            this.subtrait = this.EditSamplePortfolioData.data[0].subtrait;
            this.description = this.EditSamplePortfolioData.data[0].description;
            this.selectedlanguage = this.EditSamplePortfolioData.data[0].languageid;
                
            }
        )
    }

    //delete sample portfolio data
    DeleteData(i: number, sampleportfolioid) {
        var data;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        let options = { headers: headers };

        data =
            {
            "sampleportfolioid": sampleportfolioid
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
                this.http.post('api/SamplePortfolio/DeleteSamplePortfolioData', body, options).subscribe(
                    (data) => {
                        this.DeleteSamplePortfolioData = data;
                        if (this.DeleteSamplePortfolioData.Status == true) {
                            Swal.fire("", "Deleted Successfully", "success");
                            this.GetSavedData();
                            return;
                        }
                    }
                )
            }
        })


    }

}
