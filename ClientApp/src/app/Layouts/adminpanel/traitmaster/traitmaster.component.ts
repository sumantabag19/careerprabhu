import { Component, OnInit, Input, PipeTransform, Pipe } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';
import { HttpClient, HttpErrorResponse, HttpRequest, HttpHeaders } from '@angular/common/http';
import { LocalStorageService, LocalStorageModule } from 'angular-2-local-storage';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import Swal from 'sweetalert2';
import { SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';


@Component({
    selector: 'app-traitmaster',
    templateUrl: './traitmaster.component.html',
    //styleUrls: ['./webinar.component.css']
})
export class TraitManager implements OnInit {
  
    public trait: string = "";
    public ButtonText: string = "Save";
    public GetSaveData: any = [];
    public traitid: number = 0;
    public TraitDetail: any = [];
    public EditTraitsData: any = [];
    public TraitDeleteDetail: any = [];

    constructor(private http: HttpClient, private router: Router, private localstorage: LocalStorageService, private toaster: ToastrService, private loader: NgxUiLoaderService) {

    }
    ngOnInit() {
        this.GetSavedData();
    }
    //save trait
    onSubmit() {
        debugger;


        if (this.trait == "" || this.trait == undefined) {
            Swal.fire("", "Please Enter Trait", "error");
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

                    "trait": this.trait,

                "traitid": this.traitid
                };

            let body = JSON.stringify(data);
            debugger;
            this.http.post('api/traitmaster/UpdateTrait', body, options).subscribe(

                (data) => {
                    debugger;
                    this.TraitDetail = data;
                    if (this.TraitDetail.Status == true) {
                      if (this.TraitDetail.Message == "Trait Already Exists") {
                            this.GetSavedData();
                        Swal.fire("", "Trait Already Exists", "success");
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
                    "trait": this.trait,
                
                    "traitid": 0
                };

            let body = JSON.stringify(data);

            this.http.post('api/traitmaster/SaveTraitDetail', body, options).subscribe(

                (data) => {
                    debugger;
                    this.TraitDetail = data;
                    if (this.TraitDetail.Status == true) {
                        if (this.TraitDetail.Message == "Trait Already Exists") {
                            //this.GetSavedData();
                            Swal.fire("", "Trait Already Exists", "success");
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
        this.http.get('api/traitmaster/GetrepositorySavedData', options).subscribe(

            (data) => {
             
                debugger;
                this.GetSaveData = data;


                //this.HeaderData = Object.keys(this.GetSaveData[0]);
            }
        )
    }



    onClear() {
        this.trait = "";
        this.GetSavedData();
        this.ButtonText = "Save";
    }

    //edit trait data
    EditTraitData(i: number, traitid) {
        this.ButtonText = 'Update';
        var index = i;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        let options = { headers: headers };
        this.http.get('api/traitmaster/EditTrait?traitid=' + traitid, options).subscribe(

            (data) => {
                debugger;
                this.EditTraitsData = data;
                this.traitid = this.EditTraitsData.traitid;
                this.trait = this.EditTraitsData.traitname;

            }
        )
    }
    
    DeleteTraitData(i: number, traitid) {
        debugger;
        var data


        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        let options = { headers: headers }
        debugger;
        data =
            {
                "acttype": "delete",
                "traitid": traitid
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
                this.http.post('api/traitmaster/deleteTrait', body, options).subscribe(

                    (data) => {
                        debugger;
                        this.TraitDeleteDetail = data
                        if (this.TraitDeleteDetail.Status == true) {
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
}
