import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';
import { HttpClient, HttpErrorResponse, HttpRequest, HttpHeaders } from '@angular/common/http';
import { LocalStorageService, LocalStorageModule } from 'angular-2-local-storage';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-sopintrestmaster',
    templateUrl: './sopintrestmaster.component.html',
    //styleUrls: ['./webinar.component.css']
})

export class SOPIntrestManager implements OnInit {

    public ButtonText: string = "Save";
    public GetSaveData: any = [];
    public intrest: string = "";
    public intrestid: number = 0;
    public SopIntrestDetail: any = [];
    public EditIntrestData: any = [];
    public SopIntrestDeleteDetail: any = [];

    constructor(private http: HttpClient, private router: Router, private localstorage: LocalStorageService, private toaster: ToastrService, private loader: NgxUiLoaderService) {

    }

    ngOnInit() {
        this.GetSavedData();
    }
    //save sop intrest area
    onSubmit() {
        debugger;


        if (this.intrest == "" || this.intrest == undefined) {
            Swal.fire("", "Please Enter Interest Area", "error");
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

                    "intrestname": this.intrest,

                    "intrestid": this.intrestid
                };

            let body = JSON.stringify(data);
            debugger;
            this.http.post('api/sopintrestmaster/UpdateSopIntrestDetail', body, options).subscribe(

                (data) => {
                    debugger;
                    this.SopIntrestDetail = data;
                    if (this.SopIntrestDetail.Status == true) {
                        if (this.SopIntrestDetail.Message == "Intrest Already Exists") {
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
        else {
            debugger;
            let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
            let options = { headers: headers }

            data =
                {
                    "acttype": "save",
                    "intrestname": this.intrest,

                    "intrestid": 0
                };

            let body = JSON.stringify(data);

            this.http.post('api/sopintrestmaster/SaveSopIntrestDetail', body, options).subscribe(

                (data) => {
                    debugger;
                    this.SopIntrestDetail = data;
                    if (this.SopIntrestDetail.Status == true) {
                        if (this.SopIntrestDetail.Message == "Intrest Already Exists") {
                            this.GetSavedData();
                            Swal.fire("", "Intrest Already Exists", "success");
                            this.onClear();
                            return;
                        }
                        else {
                            Swal.fire("", "Saved Successfully", "success");
                            this.GetSavedData();
                            this.onClear();
                           
                            return;
                        }

                    }
                }
            )
        }
    }

    //get saved data
    GetSavedData() {
        debugger;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        let options = { headers: headers };
        this.http.get('api/sopintrestmaster/GetSopIntrestSavedData', options).subscribe(

            (data) => {

                debugger;
                this.GetSaveData = data;


                //this.HeaderData = Object.keys(this.GetSaveData[0]);
            }
        )
    }


    onClear() {
        this.intrest = "";
        this.GetSaveData();
        this.ButtonText = "Save";
    }
    EditSopIntrstData(i: number, intrestid) {
        this.ButtonText = 'Update';
        var index = i;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        let options = { headers: headers };
        this.http.get('api/sopintrestmaster/EditSopIntrest?intrestid=' + intrestid, options).subscribe(

            (data) => {
                debugger;
                this.EditIntrestData = data;
                this.intrestid = this.EditIntrestData.intrestid;
                this.intrest = this.EditIntrestData.intrestname;

            }
        )
    }
    DeleteData(i: number, intresrid) {
        debugger;
        var data


        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        let options = { headers: headers }
        debugger;
        data =
            {
                "acttype": "delete",
            "intrestid": intresrid
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
                this.http.post('api/sopintrestmaster/deleteSopIntrest', body, options).subscribe(

                    (data) => {
                        debugger;
                        this.SopIntrestDeleteDetail = data
                        if (this.SopIntrestDeleteDetail.Status == true) {
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

