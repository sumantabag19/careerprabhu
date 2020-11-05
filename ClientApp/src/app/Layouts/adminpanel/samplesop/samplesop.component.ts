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
    selector: 'app-samplesop',
    templateUrl: './samplesop.component.html',
    //styleUrls: ['./webinar.component.css']
})
export class SampleSOPManager implements OnInit {

    public IntrestData: any = [];
    public soptitle: string = "";
    public description: string = "";
    public ButtonText: string = "Save";
    public GetSaveData: any = [];
    public AllIntrest: any;
    public Details: any = [];
    public intrestid: string = "";
    public samplesopid: number = 0;
    public samplesopdata: any = [];
    public getsamplesop: any = [];
    public EditSampleSopData: any = [];
    public DeleteSampleSopData: any = [];
    public search: string = "";

    constructor(private http: HttpClient, private router: Router, private localstorage: LocalStorageService, private toaster: ToastrService, private loader: NgxUiLoaderService) {

    }
    ngOnInit() {
        this.BindIntrest();
        this.GetSavedData();
    }

    //Bind Intrest Area
    BindIntrest() {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        let options = { headers: headers };


        this.http.get('api/samplesop/BindSopIntrest', options).subscribe(

            (data) => {
                debugger;

                this.Details = data;

                if (this.Details.status = true) {
                    this.IntrestData = this.Details.data;
                    this.GetSavedData();
                }
                else {
                    this.toaster.error(this.Details.message.toString(), '', { easeTime: 1000, timeOut: 3000 })
                }
                if (this.EditSampleSopData.Status == true) {
                    this.intrestid = this.EditSampleSopData.data[0].intrestid;
                    var tmpintrestid = this.EditSampleSopData.data[0].intrestid.split(",");
                    for (var i = 0; i < this.IntrestData.length; i++) {
                        for (var j = 0; j < tmpintrestid.length; j++) {
                            if (this.IntrestData[i].intrestid == tmpintrestid[j]) {
                                this.IntrestData[i].selected = true;


                            }
                        }
                    }
                    if (this.IntrestData.length == tmpintrestid.length) {
                        this.AllIntrest = true;
                    }
                    else {
                        this.AllIntrest = false;
                    }
                   

                }
                else {
                }
            }
        )
    }
//save samplesop data
    onSave() {

        if (this.ButtonText == "Save") {
            if (this.intrestid == '') {
                Swal.fire("", "Please select interest area", "error");
                return;
            }
            if (this.soptitle == "" || this.soptitle == undefined) {
                Swal.fire("", "Please enter title", "error");
                return;
            }
            let input = new FormData();
            input.append("samplesopid", this.samplesopid.toString());
            input.append("intrestid", this.intrestid.toString());
            input.append("title", this.soptitle.toString());
            input.append("description", this.description.toString());
           
            input.append("createdby", this.localstorage.get("userid").toString());

            this.http.post('api/samplesop/SaveSampleSopData', input)
                .subscribe(
                    (data) => {
                        debugger;
                        this.samplesopdata = data;
                        if (this.samplesopdata.Status == true) {
                            Swal.fire("", "Saved Successfully", "success");
                            this.onClear();
                            this.GetSavedData();
                            return;
                        }

                    })
        }
        else {
            if (this.intrestid == '') {
                Swal.fire("", "Please select intrest area", "error");
                return;
            }
            if (this.soptitle == "" || this.soptitle == undefined) {
                Swal.fire("", "Please enter title", "error");
                return;
            }
            let input = new FormData();
            input.append("samplesopid", this.samplesopid.toString());
            input.append("intrestid", this.intrestid.toString());
            input.append("title", this.soptitle.toString());
            input.append("description", this.description.toString());

            input.append("createdby", this.localstorage.get("userid").toString());

            this.http.post('api/samplesop/UpdateSampleSopData', input)
                .subscribe(
                    (data) => {
                        debugger;
                        this.samplesopdata = data;
                        if (this.samplesopdata.Status ==true) {
                            Swal.fire("", "Updated Successfully", "success");
                            this.onClear();
                            this.GetSavedData();
                            return;
                        }

                    })
        }
    }

    onClear() {
        for (var i = 0; i < this.IntrestData.length; i++) {
            this.IntrestData[i].selected = false;
        }
        this.AllIntrest = false
        this.description = "";
        this.soptitle = "";
        this.ButtonText = "Save";
    }


    //get data for bind
    GetSavedData() {
        debugger;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        let options = { headers: headers };
        this.http.get('api/samplesop/BindSampleSopData', options).subscribe(

            (data) => {



                debugger;
                this.getsamplesop = data;
                //start
                var intrest;
            
                debugger;
                this.GetSaveData = this.getsamplesop.data;
                for (var i = 0; i < this.GetSaveData.length; i++) {
                    var intrestname = "";
                    
                    //for (var j = 0; j < this.GetSaveData[i].State.length; j++) {
                    intrest = this.GetSaveData[i].intrestname.split(",");
                    
                    //}
                    //state
                    for (var k = 0; k < intrest.length; k++) {
                        for (var l = 0; l < this.IntrestData.length; l++) {
                            if (intrest[k] == this.IntrestData[l].intrestid) {
                                if (k > 0) {
                                    intrestname = intrestname + ", " + this.IntrestData[l].intrestname;
                                }
                                else {
                                    intrestname = intrestname + this.IntrestData[l].intrestname;
                                }
                            }
                        }
                    }
                  
                

                    this.GetSaveData[i].intrestname = intrestname;
             
                }
                //end

            }
        )
    }



    EditData(i: number, samplesopid) {
        debugger;


        this.ButtonText = 'Update';
        var index = i;
        var samplesopid = samplesopid;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        let options = { headers: headers };
        this.http.get('api/samplesop/EditSampleSop?samplesopid=' + samplesopid, options).subscribe(

            (data) => {
                debugger;
                this.EditSampleSopData = data;
                this.samplesopid = this.EditSampleSopData.data[0].samplesopid;



                this.soptitle = this.EditSampleSopData.data[0].title;
                this.description = this.EditSampleSopData.data[0].description;
   
                this.BindIntrest();
            }
        )
    }
   //delete samplesop data
    DeleteData(i: number, samplesopid) {
        var data;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        let options = { headers: headers };

        data =
            {
            "samplesopid": samplesopid
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
                this.http.post('api/samplesop/DeleteSampleSopData', body, options).subscribe(
                    (data) => {
                        this.DeleteSampleSopData = data;
                        if (this.DeleteSampleSopData.Status == true) {
                            Swal.fire("", "Deleted Successfully", "success");
                            this.GetSavedData();
                            return;
                        }
                    }
                )
            }
        })


    }

    //select all intrest area
    SelectAllIntrest() {
        debugger;
        this.intrestid = "";
        if (this.AllIntrest === true) {
            for (var i = 0; i < this.IntrestData.length; i++) {
                this.IntrestData[i].selected = true;
                if (this.intrestid === '') {
                    this.intrestid = this.IntrestData[i].intrestid;
                }
                else {
                    this.intrestid = this.intrestid + ',' + this.IntrestData[i].intrestid;
                }
            }
        }
        else {
            for (var i = 0; i < this.IntrestData.length; i++) {
                this.IntrestData[i].selected = false;
            }
        }
    }
    //get particular selected intrest area
    getSelectedIntrest() {
        this.intrestid = "";
        var count = 0;
        for (var i = 0; i < this.IntrestData.length; i++) {

            if (this.IntrestData[i].selected === true) {

                if (this.intrestid === '') {
                    this.intrestid = this.IntrestData[i].intrestid;
                    count++;
                }
                else {
                    this.intrestid = this.intrestid + ',' + this.IntrestData[i].intrestid;
                    count++;
                }
            }
        }
        if (this.IntrestData.length === count) {
            this.AllIntrest = true;
        }
        else {
            this.AllIntrest = false;
        }


    }

}
