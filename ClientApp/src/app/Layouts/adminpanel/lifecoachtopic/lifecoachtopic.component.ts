import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';
import { HttpClient, HttpErrorResponse, HttpRequest, HttpHeaders } from '@angular/common/http';
import { LocalStorageService, LocalStorageModule } from 'angular-2-local-storage';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-lifecoachtopic',
    templateUrl: './lifecoachtopic.component.html',
    //styleUrls: ['./webinar.component.css']
})

export class LifeCoachManager implements OnInit {

    public ButtonText: string = "Save";
    public GetSaveData: any = [];
    public topicname: string = "";
    public topicid: number = 0;
    public CoachTopicDetail: any = [];
    public EditCoachTopicData: any = [];
    public TopicDeleteDetail: any = [];

    constructor(private http: HttpClient, private router: Router, private localstorage: LocalStorageService, private toaster: ToastrService, private loader: NgxUiLoaderService) {

    }

    ngOnInit() {
        this.GetSavedData();
    }
    //save coach topic
    onSubmit() {
        debugger;


        if (this.topicname == "" || this.topicname == undefined) {
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

                    "topicname": this.topicname,

                    "topicid": this.topicid
                };

            let body = JSON.stringify(data);
            debugger;
            this.http.post('api/coachtopicmaster/UpdateTopicDetail', body, options).subscribe(

                (data) => {
                    debugger;
                    this.CoachTopicDetail = data;
                    if (this.CoachTopicDetail.Status == true) {
                        if (this.CoachTopicDetail.Message == "Topic Already Exists") {
                            this.GetSavedData();
                          Swal.fire("", "Topic Already Exists", "success");
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
                    "topicname": this.topicname,

                    "topicid": 0
                };

            let body = JSON.stringify(data);

            this.http.post('api/coachtopicmaster/SaveTopicDetail', body, options).subscribe(

                (data) => {
                    debugger;
                    this.CoachTopicDetail = data;
                    if (this.CoachTopicDetail.Status == true) {
                        if (this.CoachTopicDetail.Message == "Topic Already Exists") {
                            this.GetSavedData();
                            Swal.fire("", "Topic Already Exists", "success");
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
        this.http.get('api/coachtopicmaster/GetTopicSavedData', options).subscribe(

            (data) => {

                debugger;
                this.GetSaveData = data;


                //this.HeaderData = Object.keys(this.GetSaveData[0]);
            }
        )
    }




    onClear() {
        this.topicname = "";
        this.GetSavedData();
        this.ButtonText = "Save";

    }
    EditTopicData(i: number, topicid) {
        this.ButtonText = 'Update';
        var index = i;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        let options = { headers: headers };
        this.http.get('api/coachtopicmaster/EditTopic?topicid=' + topicid, options).subscribe(

            (data) => {
                debugger;
                this.EditCoachTopicData = data;
                this.topicid = this.EditCoachTopicData.topicid;
                this.topicname = this.EditCoachTopicData.topicname;

            }
        )

    }
    DeleteTopicData(i: number, topicid) {
        debugger;
        var data


        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        let options = { headers: headers }
        debugger;
        data =
            {
                "acttype": "delete",
            "topicid": topicid
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
                this.http.post('api/coachtopicmaster/deleteTopic', body, options).subscribe(

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

