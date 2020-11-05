import { Component, OnInit, Input, PipeTransform, Pipe, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';
import { HttpClient, HttpErrorResponse, HttpRequest, HttpHeaders } from '@angular/common/http';
import { LocalStorageService, LocalStorageModule } from 'angular-2-local-storage';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import Swal from 'sweetalert2';
import { SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';


@Component({
    selector: 'app-professionalsop',
    templateUrl: './professionalsop.component.html',
    //styleUrls: ['./webinar.component.css']
})
export class professionalSOPManager implements OnInit {


    public testimonial: string = "";
    public SelectedImage: string = "";
    public ButtonText: string = "Save";
    public GetSaveData: any = [];
    @ViewChild('inputfile', { static: true }) private myInputVariableprefile: ElementRef;
    public imagefile: any = [];
    public imagetoupload: any = [];
    public orgimagename: any = [];
    public soppropid: number = 0;
    public soppropdata: any = [];
    public getsopprop: any = [];
    public EditSopPropData: any = [];
  public DeleteSopPropData: any = [];
  profname: string = "";
  public checklink: boolean = false;


    constructor(private http: HttpClient, private router: Router, private localstorage: LocalStorageService, private toaster: ToastrService, private loader: NgxUiLoaderService) {

    }
    ngOnInit() {
        this.GetSavedData();

    }
    GetImageDetail(event) {
        debugger;
        this.imagefile = event
        let file = event.target.files[0];
        let fileList: FileList = event.target.files;
        this.imagetoupload = fileList[0];
      if (file.type.includes("png") || file.type.includes("jpg") || file.type.includes("jpeg")) {
            this.orgimagename = file.name;
        }
        else {
            Swal.fire("", "Please Select Image", "error");
            this.myInputVariableprefile.nativeElement.value = "";
        }
    }
    //save seek professional help master
    onSave() {
        debugger;
        if (this.ButtonText == "Save") {
            if (this.testimonial == "" || this.testimonial == undefined) {
                Swal.fire("", "Please enter testimonial", "error");
                return;
          }
          if (this.profname == "" || this.profname == undefined) {
            Swal.fire("", "Please enter name", "error");
            return;
          }
          if (this.profname.match(/[ˆ(\d|+|\-)]/)) {

          
          
            Swal.fire("", "Name should not contain digit", "error");
            return;
          }
            
            let input = new FormData();

          input.append("soppropid", this.soppropid.toString());
          input.append("profname", this.profname.toString());

            input.append("testimonial", this.testimonial.toString());
            
            input.append("image", this.imagetoupload);
            input.append("orgimagename", this.orgimagename.toString());
            
            input.append("createdby", this.localstorage.get("userid").toString());

            this.http.post('api/SopHelpmaster/SaveSopPropData', input)
                .subscribe(
                    (data) => {
                        debugger;
                        this.soppropdata = data;
                        if (this.soppropdata.length > 10) {
                            Swal.fire("", "Saved Successfully", "success");
                            this.onClear();
                            this.GetSavedData();
                            return;
                        }

                    })




        }
        else {
            if (this.testimonial == "" || this.testimonial == undefined) {
                Swal.fire("", "Please enter testimonial", "error");
                return;
          }
          if (this.profname == "" || this.profname == undefined) {
            Swal.fire("", "Please enter name", "error");
            return;
          }
          if (this.profname.match(/[ˆ(\d|+|\-)]/)) {

          }
          else {
            Swal.fire("", "Name should not contain digit", "error");
            return;
          }
            let input = new FormData();
            input.append("soppropid", this.soppropid.toString());
          input.append("profname", this.profname.toString());
            input.append("testimonial", this.testimonial.toString());

            input.append("image", this.imagetoupload);
            input.append("orgimagename", this.orgimagename.toString());

            input.append("createdby", this.localstorage.get("userid").toString());

            this.http.post('api/SopHelpmaster/UpdateSopPropData', input)
                .subscribe(
                    (data) => {
                        debugger;
                        this.soppropdata = data;
                        if (this.soppropdata.length > 10) {
                            Swal.fire("", "Updated Successfully", "success");
                            this.onClear();
                            this.GetSavedData();
                            return;
                        }

                    })
        }
    }

    //get saved data for bind
    GetSavedData() {
        debugger;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        let options = { headers: headers };
        this.http.get('api/SopHelpmaster/BindSOPPropData', options).subscribe(

            (data) => {
                debugger;
                this.getsopprop = data;
                debugger;
                this.GetSaveData = this.getsopprop.data;

            }
        )
    }



    onClear() {
        this.testimonial = "";
        this.ButtonText = "Save";
        this.imagefile = [];
        this.imagetoupload = [];
      this.orgimagename = "";
      this.profname = "";
        this.myInputVariableprefile.nativeElement.value = "";
    }
    EditData(i: number, soppropid) {
        debugger;


        this.ButtonText = 'Update';

        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        let options = { headers: headers };
        this.http.get('api/SopHelpmaster/EditSopProp?soppropid=' + soppropid, options).subscribe(

            (data) => {
                debugger;
                this.EditSopPropData = data;
                this.soppropid = this.EditSopPropData.data[0].soppropid;

            this.profname = this.EditSopPropData.data[0].testimonialname;

                this.testimonial = this.EditSopPropData.data[0].testimonial;
                
              
            }
        )
    }
    DeleteData(i: number, soppropid) {
        var data;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        let options = { headers: headers };

        data =
            {
            "soppropid": soppropid
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
                this.http.post('api/SopHelpmaster/DeleteSopProp', body, options).subscribe(
                    (data) => {
                        this.DeleteSopPropData = data;
                        if (this.DeleteSopPropData.Status == true) {
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
