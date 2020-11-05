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
    selector: 'app-professionalmaster',
    templateUrl: './professionalmaster.component.html',
    //styleUrls: ['./webinar.component.css']
})
export class professionalManager implements OnInit {
  
  
    public testimonial: string = "";
    public SelectedImage: string = "";
    public ButtonText: string = "Save";
    public GetSaveData: any = [];

    constructor(private http: HttpClient, private router: Router, private localstorage: LocalStorageService, private toaster: ToastrService, private loader: NgxUiLoaderService) {

    }
    ngOnInit() {

    }
    GetImageDetail(event) {

    }
    onSave() {

    }
    onClear() {

    }
    EditData(i: number, Id) {

    }
    DeleteData(i: number, Id) {

    }
}
