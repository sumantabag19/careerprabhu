
import { Component, OnInit, Input, ElementRef, ViewChild, PipeTransform, Pipe, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';
import { HttpClient, HttpErrorResponse, HttpRequest, HttpHeaders } from '@angular/common/http';
import { LocalStorageService, LocalStorageModule } from 'angular-2-local-storage';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import Swal from 'sweetalert2';
import { SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';



@Component({
    selector: 'app-sampleessay',
    templateUrl: './sampleessay.component.html',
    //styleUrls: ['./webinar.component.css']
})
export class SampleEssayManager implements OnInit {
    public selectedcountry: number = 0;
    public CountryData: any = [];
    public university: number = 0;
    public UnivData: any = [];
    public essaytitle: string = "";
    public essaydetail: string = "";
    public description: string = "";
    public ButtonText: string = "Save";
    public GetSaveData: any = [];
    public link: string = "";
    public SelectedImage: string = "";
    public AllCountry: any;
    public AllLocation: any;
    public LocationData: any = [];
    public AllUniversity: any;
    public UniversityData: any = [];
    public Countryids: string = "";
    public Locationids: string = "";
    public GetUniversityData: any = [];
    public GetLocationData: any = [];
    public EditSamplePortfolioData: any = [];
    public Universityids: string = "";
    public Details: any = [];
    public sampleessayid: number = 0;
    public pdffile: any = [];
    public pdftoupload: any = [];
    public orgpdfname: string = "";
    @ViewChild('inputfile', { static: true }) private myInputVariableprefile: ElementRef;
    public sampleessaydata: any = [];
    public getsampleessay: any = [];
    public EditSampleEssayData: any = [];
    public DeleteSampleEssayData: any = [];
     search: string = "";

  constructor(private http: HttpClient, private router: Router, private localstorage: LocalStorageService, private toaster: ToastrService, private loader: NgxUiLoaderService, private renderer: Renderer2) {

    }
    ngOnInit() {
        this.GetData();
        this.GetSavedData();
            
    }
  
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
    onSave() {
        if (this.ButtonText == "Save") {
           
            if (this.Countryids == '') {
                Swal.fire("", "Please select country", "error");
                return;
            }

            if (this.Locationids == '') {
                Swal.fire("", "Please select location", "error");
                return;
            }
            if (this.Universityids == '') {
                Swal.fire("", "Please select university", "error");
                return;
            }
            if (this.essaytitle == "" || this.essaytitle == "") {
                Swal.fire("", "Please enter essay title", "error");
                return;
            }
            if (this.essaydetail == "" || this.essaydetail == "") {
                Swal.fire("", "Please enter essay detail", "error");
                return;
            }
            let input = new FormData();





            input.append("sampleessayid", this.sampleessayid.toString());

           
            input.append("essaydetail", this.essaydetail.toString());
            input.append("essaytitle", this.essaytitle.toString());
            input.append("link", this.link.toString());
            input.append("description", this.description.toString());
            input.append("pdf", this.pdftoupload);
            input.append("orgpdfname", this.orgpdfname.toString());
            input.append("countryid", this.Countryids.toString());
            input.append("locationid", this.Locationids.toString());
            input.append("universityid", this.Universityids.toString());
            input.append("createdby", this.localstorage.get("userid").toString());

            this.http.post('api/SampleEssay/SaveSampleEssayData', input)
                .subscribe(
                    (data) => {
                        debugger;
                        this.sampleessaydata = data;
                        if (this.sampleessaydata.length > 10) {
                            Swal.fire("", "Saved Successfully", "success");
                            this.onClear();
                            this.GetSavedData();
                            return;
                        }

                    })




        }
        else {
            if (this.Countryids == '') {
                Swal.fire("", "Please select country", "error");
                return;
            }

            if (this.Locationids == '') {
                Swal.fire("", "Please select location", "error");
                return;
            }
            if (this.Universityids == '') {
                Swal.fire("", "Please select university", "error");
                return;
            }
            if (this.essaytitle == "" || this.essaytitle == "") {
                Swal.fire("", "Please enter essay title", "error");
                return;
            }
            if (this.essaydetail == "" || this.essaydetail == "") {
                Swal.fire("", "Please enter essay detail", "error");
                return;
            }
            let input = new FormData();





            input.append("sampleessayid", this.sampleessayid.toString());


            input.append("essaydetail", this.essaydetail.toString());
            input.append("essaytitle", this.essaytitle.toString());
            input.append("link", this.link.toString());
            input.append("description", this.description.toString());
            input.append("pdf", this.pdftoupload);
            input.append("orgpdfname", this.orgpdfname.toString());
            input.append("countryid", this.Countryids.toString());
            input.append("locationid", this.Locationids.toString());
            input.append("universityid", this.Universityids.toString());
            input.append("createdby", this.localstorage.get("userid").toString());

            this.http.post('api/SampleEssay/UpdateSampleEssayData', input)
                .subscribe(
                    (data) => {
                        debugger;
                        this.sampleessaydata = data;
                        if (this.sampleessaydata.length > 10) {
                            Swal.fire("", "Updated Successfully", "success");
                            this.onClear();
                            this.GetSavedData();
                            return;
                        }

                    })
        }





    }

    GetSavedData() {
        debugger;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        let options = { headers: headers };
        this.http.get('api/SampleEssay/BindSampleEssayData', options).subscribe(

            (data) => {



                debugger;
                this.getsampleessay = data;
                //start
                var country;
                var location;
                var university;
                debugger;
                this.GetSaveData = this.getsampleessay.data;
                for (var i = 0; i < this.GetSaveData.length; i++) {
                    var countryname = "";
                    var locationname = "";
                    var universityname = "";
                    //for (var j = 0; j < this.GetSaveData[i].State.length; j++) {
                    country = this.GetSaveData[i].countryname.split(",");
                    location = this.GetSaveData[i].location.split(",");
                    university = this.GetSaveData[i].universityname.split(",");
                    //}
                    //state
                    for (var k = 0; k < country.length; k++) {
                        for (var l = 0; l < this.CountryData.length; l++) {
                            if (country[k] == this.CountryData[l].countryid) {
                                if (k > 0) {
                                    countryname = countryname + ", " + this.CountryData[l].countryname;
                                }
                                else {
                                    countryname = countryname + this.CountryData[l].countryname;
                                }
                            }
                        }
                    }
                    //city
                    for (var k = 0; k < location.length; k++) {
                        for (var l = 0; l < this.LocationData.length; l++) {
                            if (location[k] == this.LocationData[l].locationid) {
                                if (k > 0) {
                                    locationname = locationname + ", " + this.LocationData[l].location;
                                }
                                else {
                                    locationname = locationname + this.LocationData[l].location;
                                }
                            }
                        }
                    }
                    //school
                    for (var k = 0; k < university.length; k++) {
                        for (var l = 0; l < this.UniversityData.length; l++) {
                            if (university[k] == this.UniversityData[l].universityid) {
                                if (k > 0) {
                                    universityname = universityname + ", " + this.UniversityData[l].universityname;
                                }
                                else {
                                    universityname = universityname + this.UniversityData[l].universityname;
                                }
                            }
                        }
                    }

                    this.GetSaveData[i].countryname = countryname;
                    this.GetSaveData[i].location = locationname;
                    this.GetSaveData[i].universityname = universityname;
                }
                //end

            }
        )
    }



    onClear() {
        this.link = "";
        this.myInputVariableprefile.nativeElement.value = "";
        this.AllCountry = false;
        this.AllLocation = false;
        this.AllUniversity = false;
        this.essaytitle = "";
        this.essaydetail = "";
        this.orgpdfname = "";
        this.ButtonText = "Save";
        this.pdftoupload = [];
        this.description = "";
        this.orgpdfname = "";
        for (var i = 0; i < this.CountryData.length; i++) {
            this.CountryData[i].selected = false;
        }
        for (var i = 0; i < this.LocationData.length; i++) {
            this.LocationData[i].selected = false;
        }
        for (var i = 0; i < this.UniversityData.length; i++) {
            this.UniversityData[i].selected = false;
        }
    }



    EditData(i: number, sampleessayid) {
        debugger;


        this.ButtonText = 'Update';
        var index = i;
        
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        let options = { headers: headers };
        this.http.get('api/SampleEssay/EditSampleEssay?sampleessayid=' + sampleessayid, options).subscribe(

            (data) => {
                debugger;
                this.EditSampleEssayData = data;
                this.sampleessayid = this.EditSampleEssayData.data[0].sampleessayid;



                this.link = this.EditSampleEssayData.data[0].link;
                this.essaytitle = this.EditSampleEssayData.data[0].essaytitle;
                this.essaydetail = this.EditSampleEssayData.data[0].essaydetail;
                this.essaydetail = this.EditSampleEssayData.data[0].essaydetail;
                this.description = this.EditSampleEssayData.data[0].description;
                this.GetData();
            }
        )
    }




    DeleteData(i: number, sampleessayid) {
        debugger;
        var data;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        let options = { headers: headers };

        data =
            {
            "sampleessayid": sampleessayid
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
                this.http.post('api/SampleEssay/DeleteSampleEssayData', body, options).subscribe(
                    (data) => {
                        this.DeleteSampleEssayData = data;
                        if (this.DeleteSampleEssayData.Status == true) {
                            Swal.fire("", "Deleted Successfully", "success");
                            this.GetSavedData();
                            return;
                        }
                    }
                )
            }
        })
    }
    //Bind all multi cheeckbox
    GetData() {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        let options = { headers: headers };


        this.http.get('api/SampleEssay/GetData', options).subscribe(

            (data) => {
                debugger;

                this.Details = data;

                if (this.Details.status = true) {
                    this.CountryData = this.Details.countrydata;
                    this.LocationData = this.Details.locationdata;
                    this.UniversityData = this.Details.universitydata;



                   // this.GetSavedData();
                }
                else {
                    this.toaster.error(this.Details.message.toString(), '', { easeTime: 1000, timeOut: 3000 })
                }


                if (this.EditSampleEssayData.Status == true) {
                    this.Countryids = this.EditSampleEssayData.data[0].countryid;
                    var tmpcountryid = this.EditSampleEssayData.data[0].countryid.split(",");
                    for (var i = 0; i < this.CountryData.length; i++) {
                        for (var j = 0; j < tmpcountryid.length; j++) {
                            if (this.CountryData[i].countryid == tmpcountryid[j]) {
                                this.CountryData[i].selected = true;


                            }
                        }
                    }
                    if (this.CountryData.length == tmpcountryid.length) {
                        this.AllCountry = true;
                    }
                    else {
                        this.AllCountry = false;
                    }
                    this.OnChnageOfCountryToGetLocation();

                }
                else {
                }



            }
        )
    }
    //get selected all country
    SelectAllCountry() {
        debugger;
        this.Countryids = "";
        if (this.AllCountry === true) {
            for (var i = 0; i < this.CountryData.length; i++) {
                this.CountryData[i].selected = true;
                if (this.Countryids === '') {
                    this.Countryids = this.CountryData[i].countryid;
                }
                else {
                    this.Countryids = this.Countryids + ',' + this.CountryData[i].countryid;
                }
            }
        }
        else {
            for (var i = 0; i < this.CountryData.length; i++) {
                this.CountryData[i].selected = false;
            }
        }
    }

    //get perticular selected country
    getSelectedCountry() {
        this.Countryids = "";
        var count = 0;
        for (var i = 0; i < this.CountryData.length; i++) {

            if (this.CountryData[i].selected === true) {

                if (this.Countryids === '') {
                    this.Countryids = this.CountryData[i].countryid;
                    count++;
                }
                else {
                    this.Countryids = this.Countryids + ',' + this.CountryData[i].countryid;
                    count++;
                }
            }
        }
        if (this.CountryData.length === count) {
            this.AllCountry = true;
        }
        else {
            this.AllCountry = false;
        }


    }



    //get all selected location
    SelectAllLocation() {
        debugger;
        this.Locationids = "";
        if (this.AllLocation === true) {
            for (var i = 0; i < this.LocationData.length; i++) {
                this.LocationData[i].selected = true;
                if (this.Locationids === '') {
                    this.Locationids = this.LocationData[i].locationid;
                }
                else {
                    this.Locationids = this.Locationids + ',' + this.LocationData[i].locationid;
                }
            }
        }
        else {
            for (var i = 0; i < this.LocationData.length; i++) {
                this.LocationData[i].selected = false;
            }
        }


    }


    //get perticular selected location
    getSelectedLocation() {
        this.Locationids = "";
        var count = 0;
        for (var i = 0; i < this.LocationData.length; i++) {

            if (this.LocationData[i].selected === true) {

                if (this.Locationids === '') {
                    this.Locationids = this.LocationData[i].locationid;
                    count++;
                }
                else {
                    this.Locationids = this.Locationids + ',' + this.LocationData[i].locationid;
                    count++;
                }
            }
        }
        if (this.LocationData.length === count) {
            this.AllLocation = true;
        }
        else {
            this.AllLocation = false;
        }
    }


    //get all selected university
    SelectAllUniversity() {
        debugger;
        this.Universityids = "";
        if (this.AllUniversity === true) {
            for (var i = 0; i < this.UniversityData.length; i++) {
                this.UniversityData[i].selected = true;
                if (this.Universityids === '') {
                    this.Universityids = this.UniversityData[i].universityid;
                }
                else {
                    this.Universityids = this.Universityids + ',' + this.UniversityData[i].universityid;
                }
            }
        }
        else {
            for (var i = 0; i < this.UniversityData.length; i++) {
                this.UniversityData[i].selected = false;
            }
        }
    }

    //get perticular selected location
    getSelectedUniversity() {
        this.Universityids = "";
        var count = 0;
        for (var i = 0; i < this.UniversityData.length; i++) {

            if (this.UniversityData[i].selected === true) {

                if (this.Universityids === '') {
                    this.Universityids = this.UniversityData[i].universityid;
                    count++;
                }
                else {
                    this.Universityids = this.Universityids + ',' + this.UniversityData[i].universityid;
                    count++;
                }
            }
        }
        if (this.UniversityData.length === count) {
            this.AllUniversity = true;
        }
        else {
            this.AllUniversity = false;
        }
    }


    //on change of country to get location
    OnChnageOfCountryToGetLocation() {
        debugger;
        if (this.Countryids == null) { this.Countryids = ""; }
        if (this.Locationids == null) { this.Locationids = ""; }

        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        let options = { headers: headers };
        this.http.get('api/SamplePortfolio/GetCountryFilter?countryid=' + this.Countryids, options).subscribe(
            (data) => {
                this.GetLocationData = data;

                if (this.GetLocationData.Status == true) {
                    this.LocationData = this.GetLocationData.locationdata;
                }


                if (this.EditSampleEssayData.Status == true) {
                    this.Locationids = this.EditSampleEssayData.data[0].locationid;
                    var tmplocationid = this.EditSampleEssayData.data[0].locationid.split(",");
                    for (var i = 0; i < this.LocationData.length; i++) {
                        for (var j = 0; j < tmplocationid.length; j++) {
                            if (this.LocationData[i].locationid == tmplocationid[j]) {
                                this.LocationData[i].selected = true;

                            }
                        }
                    }
                    if (this.LocationData.length == tmplocationid.length) {
                        this.AllLocation = true;
                    }
                    else {
                        this.AllLocation = false;
                    }
                    this.OnChangeOfCountryToGetUniv();
                }
                else {
                }


            },
            (err) => {

            }
        );
    }

    //on change of location to get university
    OnChangeOfCountryToGetUniv() {
        debugger;
        if (this.Countryids == null) { this.Countryids = ""; }
        if (this.Locationids == null) { this.Locationids = ""; }

        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        let options = { headers: headers };
        this.http.get('api/SamplePortfolio/GetUniversityFilter?countryid=' + this.Countryids + '&locationid=' + this.Locationids, options).subscribe(
            (data) => {
                debugger;
                this.GetUniversityData = data;

                if (this.GetUniversityData.Status == true) {
                    this.UniversityData = this.GetUniversityData.universitydata;
                }
                else {
                    this.UniversityData = [];
                }

                if (this.GetLocationData.Status == true) {
                    this.LocationData = this.GetLocationData.locationdata;
                }
                else {
                    this.LocationData = [];
                }


                if (this.EditSampleEssayData.Status == true) {
                    this.Universityids = this.EditSampleEssayData.data[0].universityid;
                    var tmpuniversityid = this.EditSampleEssayData.data[0].universityid.split(",");
                    for (var i = 0; i < this.UniversityData.length; i++) {
                        for (var j = 0; j < tmpuniversityid.length; j++) {
                            if (this.UniversityData[i].universityid == tmpuniversityid[j]) {
                                this.UniversityData[i].selected = true;

                            }
                        }

                    }
                    if (this.UniversityData.length == tmpuniversityid.length) {
                        this.AllUniversity = true;
                    }
                    else {
                        this.AllUniversity = false;
                    }
                }
                else {
                }



            },
            (err) => {

            }
        );
    }
}
