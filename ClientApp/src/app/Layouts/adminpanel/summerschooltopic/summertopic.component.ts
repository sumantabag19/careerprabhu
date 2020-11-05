import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';
import { HttpClient, HttpErrorResponse, HttpRequest, HttpHeaders } from '@angular/common/http';
import { LocalStorageService, LocalStorageModule } from 'angular-2-local-storage';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import Swal from 'sweetalert2';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-summertopic',
    templateUrl: './summertopic.component.html',
    //styleUrls: ['./webinar.component.css']
})

export class SummerTopicManager implements OnInit {

    public ButtonText: string = "Save";
    public GetSaveData: any = [];
    public summertopic: string = "";
    public summrtopicid: number = 0;
    public SummerTopicDetail: any = [];
    public EditTopicData: any = [];
    public TopicDeleteDetail: any = [];

  constructor(private http: HttpClient, private router: Router, private localstorage: LocalStorageService, private toaster: ToastrService, private loader: NgxUiLoaderService) {

    }

    ngOnInit() {
        this.GetSavedData();
    }

    //save summr topic
    onSubmit() {
        debugger;


        if (this.summertopic == "" || this.summertopic == undefined) {
            Swal.fire("", "Please Enter Topic", "error");
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

                    "summertopicid": this.summrtopicid,

                    "summertopic": this.summertopic
                };

            let body = JSON.stringify(data);
            debugger;
            this.http.post('api/summertopic/UpdateTopic', body, options).subscribe(

                (data) => {
                    debugger;
                    this.SummerTopicDetail = data;
                    if (this.SummerTopicDetail.Status == true) {
                        if (this.SummerTopicDetail.Message == "Topic Already Exists") {
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
                    "summertopic": this.summertopic,

                    "summrtopicid": 0
                };

            let body = JSON.stringify(data);

            this.http.post('api/summertopic/SaveTopicDetail', body, options).subscribe(

                (data) => {
                    debugger;
                    this.SummerTopicDetail = data;
                    if (this.SummerTopicDetail.Status == true) {
                        if (this.SummerTopicDetail.Message == "Topic Already Exists") {
                            //this.GetSavedData();
                            Swal.fire("", "Topic Already Exists", "success");
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

    //bind table data

    GetSavedData() {
        debugger;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        let options = { headers: headers };
        this.http.get('api/summertopic/GetTopicSavedData', options).subscribe(

            (data) => {

                debugger;
                this.GetSaveData = data;


                //this.HeaderData = Object.keys(this.GetSaveData[0]);
            }
        )
    }

    onClear() {
        this.summertopic = "";
        this.ButtonText = "Save";
        this.GetSavedData();
    }

    //edit topic data
    EditTopic(i: number, summertopicid) {
        this.ButtonText = 'Update';
        var index = i;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        let options = { headers: headers };
        this.http.get('api/summertopic/EditTopic?summertopicid=' + summertopicid, options).subscribe(

            (data) => {
                debugger;
                this.EditTopicData = data;
                this.summrtopicid = this.EditTopicData.summertopicid;
                this.summertopic = this.EditTopicData.summertopic;

            }
        )
    }

    //delete summer topic
    DeleteTopic(i: number, summertopicid) {

        debugger;
        var data


        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        let options = { headers: headers }
        debugger;
        data =
            {
                "acttype": "delete",
            "summertopicid": summertopicid
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
                this.http.post('api/summertopic/deleteSummerTopic', body, options).subscribe(

                    (data) => {
                        debugger;
                        this.TopicDeleteDetail = data
                        if (this.TopicDeleteDetail.Status == true) {
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

