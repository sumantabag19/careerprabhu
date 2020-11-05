import { Component, OnInit, Input, ElementRef, ViewChild, PipeTransform, Pipe, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute, Event } from '@angular/router';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';
import { HttpClient, HttpErrorResponse, HttpRequest, HttpHeaders } from '@angular/common/http';
import { LocalStorageService, LocalStorageModule } from 'angular-2-local-storage';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import Swal from 'sweetalert2';
import { EmbedVideoService } from 'ngx-embed-video';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';

import { Time } from '@angular/common';
import { NgbDateAdapter, NgbDateNativeAdapter, NgbTimepickerConfig, NgbTimeStruct, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',

})
export class resetpassword implements OnInit {
  ButtonText: string = "Update";

  currentpassword: string = "";
  newpassword: string = "";
  confirmpassword: string = "";
  passwordData: any = [];



  constructor(private http: HttpClient, private router: Router, private localstorage: LocalStorageService, private toaster: ToastrService, private loader: NgxUiLoaderService, private renderer: Renderer2, config: NgbTimepickerConfig, private config1: NgbDatepickerConfig) {


  }
  ngOnInit() {

  }

  onSubmit() {
    debugger;
    if (this.ButtonText == "Update") {
      if (this.currentpassword == "") {
        Swal.fire("", "Passwoed mismatch", "error");
        return;
      } 

      if (this.newpassword === this.confirmpassword) {
      }
      else {
        Swal.fire("", "Passwoed mismatch", "error");
        return;
      }   
      let input = new FormData();
      input.append("confirmpassword", this.confirmpassword.toString());
      input.append("currentpwd", this.currentpassword.toString());
      input.append("createdby", this.localstorage.get("userid").toString());

      this.http.post('api/resetpassword/Updatepassword', input)
        .subscribe(
          (data) => {
            debugger;
            this.passwordData = data;
            if (this.passwordData.Status == true) {
                Swal.fire("", "Updated Successfully", "success");
                this.onClear();
                return;              
            }
            else {
              Swal.fire("", "Incorrect Previous Password", "success");
              this.onClear();
              return;
            }
          

          })
     

    }
  }
  onClear() {


    this.currentpassword = "";
    this.newpassword = "";
    this.confirmpassword = "";
    

    this.ButtonText = "Update";
  }
}
  
