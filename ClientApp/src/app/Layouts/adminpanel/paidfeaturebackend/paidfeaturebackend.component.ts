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
  selector: 'app-paidfeaturebackend',
  templateUrl: './paidfeaturebackend.component.html',
  //styleUrls: ['./webinar.component.css']
})

export class paidfeaturebackend implements OnInit {
  testimonial: string = "";
  name: string = "";
  description: string = "";
  Selectedclass: number = 0;
  Selectedproduct: number = 0;
  fees: string = "";
  gst: string = "";
  conveniencefees: string = "";
  ClassData: any = [];
  ProductData: any = [];
  productdat: any = [];
  classdata: any = [];
  ButtonText: string = "Save";
  pricingid: number = 0;
  paidfeaturebackendData: any = [];
  Detail: any = [];
  GetSaveData: any = [];
  GetSaveTestimonialData: any = [];
  GetTestimonialEditedData: any = [];
  DeletedTestimonialData: any = [];
  TestimonialSaveData: any = [];

  GetEditedData: any = [];
  DeletedData: any = [];
  TestimonialButtonText: string = "Save";
  videofile: any = [];
  SelectedVideo: string = "";
   orgVideoName: string = "";
  videouploaded: String = "0";
   videouploaddiv: boolean = false;
   videoToUpload: any;
  public video: string = "";
  public vname: boolean = false;
  public display: any = "none";
  public url: string = "";
  public yt: any;
  public checklink: boolean = false;
  public checklink_v: boolean = false;
  public imagefile: any = [];
  public SelectedImage: string = "";
  public SelectedProfileImage: string = "";
  public orgprofileImageName: string = "";

  public orgImageName: string = "";
  public imageToUpload: any;
  public photoToUpload: any;
  public image: string = "";
  categoryid: number = 0;
  testimonialid: number = 0;
  @ViewChild('inputFile', { static: true }) private myInputVariable: ElementRef;
  languagedatadetail: any = [];
  languagedata: any = [];
  selectedlanguage: number = 0;

  constructor(private http: HttpClient, private router: Router, private localstorage: LocalStorageService, private toaster: ToastrService, private loader: NgxUiLoaderService) {

  }
  ngOnInit() {
    this.BindClass();
    this.BindProduct();
    this.GetData();
    this.GetTestimonialData();
    //this.GetSavedData();
    this.getLanguage();
  }
  getLanguage() {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };

    var a;
    var tmpclass: any = [];
    this.http.get('api/paidfeaturebackend/bindlanguage', options).subscribe(
      (data) => {
        debugger;
        this.languagedatadetail = data;
        if (this.languagedatadetail.Status == true) {
          this.languagedata = this.languagedatadetail.data;
        }
      }
    )
  }
  BindClass() {
    debugger;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    this.classdata = [];

    var tmpclass: any = [];
    this.http.post('api/paidfeaturebackend/Bindclass', options).subscribe(

      (data) => {
        this.classdata = data;
        if (this.classdata.Status == true) {
          this.ClassData = this.classdata.data;
        }
        else {
          this.ClassData = this.classdata.data;
        }
      }
    )
  }
  //binds  stream code
  BindProduct() {
    debugger;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    this.productdat = [];

    var tmpclass: any = [];
    this.http.post('api/paidfeaturebackend/BindProduct', options).subscribe(

      (data) => {
        this.productdat = data;
        if (this.productdat.Status == true) {
          this.ProductData = this.productdat.data;
        }
        else {
          this.ProductData = this.productdat.data;
        }
      }
    )
  }
  GetthumbnailImageDetail(event) {
    debugger;
    this.imagefile = event
    let file = event.target.files[0];


    //let file = event.filesData[0];

    let fileList: FileList = event.target.files;

    //let fileList: FileList = file;
    //this.imageToUpload = file.rawFile;

    this.imageToUpload = fileList[0];

    if (file.type.includes("png") || file.type.includes("jpg") || file.type.includes("jpeg")) {
      //this.orgImageName = event.filesData[0].name;
      this.orgImageName = file.name;
    }
    else {
      Swal.fire("", "Please Select Image", "error");
      this.myInputVariable.nativeElement.value = "";

    }
  }
  GetprofileImageDetail(event) {
    debugger;
    this.imagefile = event
    let file = event.target.files[0];


    //let file = event.filesData[0];

    let fileList: FileList = event.target.files;

    //let fileList: FileList = file;
    //this.imageToUpload = file.rawFile;

    this.photoToUpload = fileList[0];

    if (file.type.includes("png") || file.type.includes("jpg") || file.type.includes("jpeg")) {
      //this.orgImageName = event.filesData[0].name;
      this.orgprofileImageName = file.name;
    }
    else {
      Swal.fire("", "Please Select Image", "error");
      this.myInputVariable.nativeElement.value = "";

    }
  }
  onSubmitTestimonial() {
    debugger;
    if (this.TestimonialButtonText == "Save") {

      if (this.Selectedproduct == 0 || this.Selectedproduct == undefined) {
        Swal.fire("", "Please select product", "error");
        return;
      }


      if (this.name == "" || this.name == undefined) {
        Swal.fire("", "Please select name", "error");
        return;
      }
      if (this.name.match(/[ˆ(\d|+|\-)]/)) {
        Swal.fire("", "Name should not contain digit", "error");
        return;
      }
      if (this.description == "" || this.description == undefined) {
        Swal.fire("", "Please select description", "error");
        return;
      }
      if (this.SelectedVideo == "" || this.SelectedVideo == undefined) {
       this.SelectedVideo == ""
      }
      if (this.orgImageName == "" || this.orgImageName == undefined) {
        this.orgImageName == ""
      }
      if (this.orgprofileImageName == "" || this.orgprofileImageName == undefined) {
        this.orgprofileImageName == "";
      }
      if (this.testimonial == "" || this.testimonial == undefined) {
        Swal.fire("", "Please choose testimonial", "error");
        return;
      }
      let input = new FormData();

      //input.append("video", this.videoToUpload);
      input.append("image", this.imageToUpload);
      input.append("photo", this.photoToUpload);
      input.append("testimonialid", "0");

      input.append("productid", this.Selectedproduct.toString());

      input.append("name", this.name.toString());
      input.append("description", this.description.toString());

      input.append("languageid", this.selectedlanguage.toString());
      input.append("orgvideoname", this.SelectedVideo);
      input.append("orgimagename", this.orgImageName);
      input.append("orgprofileImageName", this.orgprofileImageName);

      input.append("testimonial", this.testimonial.toString());

      input.append("createdby", this.localstorage.get("userid").toString());

      this.http.post('api/paidfeaturebackend/Savetestimonial', input)
        .subscribe(
          (data) => {
            debugger;
            this.TestimonialSaveData = data;
            if (this.TestimonialSaveData.Status == true) {

              if (this.TestimonialSaveData.Message == "Testimonial Already Exists") {
                Swal.fire("", "Testimonial Already Exists", "success");
                this.GetTestimonialData();

            

                return;
              }
              else {
                Swal.fire("", "Saved Successfully", "success");
                this.GetTestimonialData();

                this.onClear();

                return;
              }
             
            }

          })



    }
    else {
      debugger;
      if (this.Selectedproduct == 0 || this.Selectedproduct == undefined) {
        Swal.fire("", "Please select product", "error");
        return;
      }
      if (this.name == "" || this.name == undefined) {
        Swal.fire("", "Please select name", "error");
        return;
      }
      if (this.name.match(/[ˆ(\d|+|\-)]/)) {
        Swal.fire("", "Name should not contain digit", "error");
        return;
      }
      if (this.description == "" || this.description == undefined) {
        Swal.fire("", "Please select description", "error");
        return;
      }
      if (this.SelectedVideo == "" || this.SelectedVideo == undefined) {
        this.SelectedVideo == ""
      }
      if (this.orgImageName == "" || this.orgImageName == undefined) {
        this.orgImageName == ""
      }
      if (this.orgprofileImageName == "" || this.orgprofileImageName == undefined) {
        this.orgprofileImageName == "";
      }
      if (this.testimonial == "" || this.testimonial == undefined) {
        Swal.fire("", "Please choose testimonial", "error");
        return;
      }

      let input = new FormData();

      input.append("image", this.imageToUpload);
      input.append("photo", this.photoToUpload);
      input.append("testimonialid", this.testimonialid.toString());

      input.append("productid", this.Selectedproduct.toString());

      input.append("name", this.name.toString());
      input.append("description", this.description.toString());

      input.append("languageid", this.selectedlanguage.toString());
      input.append("orgvideoname", this.SelectedVideo);
      input.append("orgimagename", this.orgImageName.toString());
      input.append("orgprofileImageName", this.orgprofileImageName);

      input.append("testimonial", this.testimonial.toString());

      input.append("createdby", this.localstorage.get("userid").toString());


      this.http.post('api/paidfeaturebackend/Updatetestimonial', input)
        .subscribe(
          (data) => {
            this.TestimonialSaveData = data;
            if (this.TestimonialSaveData.Status == true) {

              if (this.TestimonialSaveData.Message == "Testimonial Already Exists") {
                Swal.fire("", "Testimonial Already Exists", "success");

                this.GetTestimonialData();
               
                return;
              }
              else {
                Swal.fire("", "Updated Successfully", "success");

                this.GetTestimonialData();
                this.onClear();
                return;
              }
             
            }

          })


    }



  }
  GetTestimonialData() {
    debugger;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    this.Detail = [];

    this.http.get('api/paidfeaturebackend/GetSaveTestimonialData', options).subscribe(
      (data) => {
        debugger;
        this.Detail = data;
        this.GetSaveTestimonialData = this.Detail.data;
     
      
      }
    )
  }
  EditedData(i: number, Id) {
    this.onClear();
    this.BindProduct();
    this.getLanguage();
    this.TestimonialButtonText = 'Update';
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };

    this.http.get('api/paidfeaturebackend/GetTestimonialEditedData?testimonialid=' + Id, options).subscribe(
      (data) => {
        debugger;
        this.GetTestimonialEditedData = data;
        if (this.GetTestimonialEditedData.Status == true) {
          this.testimonialid = this.GetTestimonialEditedData.data.testimonialid;
          this.Selectedproduct = this.GetTestimonialEditedData.data.productid;
          this.selectedlanguage = this.GetTestimonialEditedData.data.languageid;
          this.name = this.GetTestimonialEditedData.data.name;
          this.description = this.GetTestimonialEditedData.data.description;
          this.SelectedVideo = this.GetTestimonialEditedData.data.VideoName;
          this.testimonial = this.GetTestimonialEditedData.data.testimonial;






        }
      }
    )
  }
  DeletedtestimonialData(i: number, Id) {
    var data;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };

    data =
    {
      "testimonialid": Id
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
        this.http.post('api/paidfeaturebackend/DeletetestimonialActivity', body, options).subscribe(
          (data) => {
            this.DeletedTestimonialData = data;
            if (this.DeletedTestimonialData.Status == true) {
              Swal.fire("", "Deleted Successfully", "success");
              this.GetTestimonialData();
              return;
            }
          }
        )
      }
    })

  }
    

  onSubmit() {
    debugger;
    if (this.ButtonText == "Save") {

     
      

      if (this.Selectedclass == 0 || this.Selectedclass == undefined) {
        Swal.fire("", "Please select class", "error");
        return;
      }
      if (this.Selectedproduct == 0 || this.Selectedproduct == undefined) {
        Swal.fire("", "Please select product", "error");
        return;
      }


      if (this.fees == "" || this.fees == undefined) {
        Swal.fire("", "Please enter fees", "error");
        return;
      }
      if (!this.fees.match(/^([1-9][0-9]{,2}(,[0-9]{3})*|[0-9]+)(\.[0-9]{1,9})?$/)) {
        Swal.fire("", "Please enter valid fee", "error");
        return;
      }  

      if (this.gst == "" || this.gst == undefined) {
        Swal.fire("", "Please enter gst", "error");
        return;
      }
      if (!this.gst.match(/^([1-9][0-9]{,2}(,[0-9]{3})*|[0-9]+)(\.[0-9]{1,9})?$/)) {
        Swal.fire("", "Please enter valid GST", "error");
        return;
      }  

      if (this.conveniencefees == "" || this.conveniencefees == undefined) {
        Swal.fire("", "Please enter  Convenience fees", "error");
        return;
      }
      if (!this.conveniencefees.match(/^([1-9][0-9]{,2}(,[0-9]{3})*|[0-9]+)(\.[0-9]{1,9})?$/)) {
        Swal.fire("", "Please enter valid Convenience fees ", "error");
        return;
      }  

     

      let input = new FormData();

      input.append("pricingid", this.pricingid.toString());

      input.append("classid", this.Selectedclass.toString());
      input.append("productid", this.Selectedproduct.toString());


      input.append("fees", this.fees.toString());
      input.append("gst", this.gst.toString());
      input.append("conveniencefees", this.conveniencefees.toString());

      input.append("createdby", this.localstorage.get("userid").toString());

      this.http.post('api/paidfeaturebackend/Savepaidfeature', input)
        .subscribe(
          (data) => {
            debugger;
            this.paidfeaturebackendData = data;
            if (this.paidfeaturebackendData.Status == true) {

              if (this.paidfeaturebackendData.Message == "Amount Already Defined") {
                Swal.fire("", "Amount Already Defined", "success");
                this.GetData();
                this.onClear();
                return;
              }
              else {
                Swal.fire("", "Saved Successfully", "success");
                this.GetData();
                this.onClear();
                return;
              }



            
            }

          })



    }
    else {
      debugger;
      if (this.Selectedclass == 0 || this.Selectedclass == undefined) {
        Swal.fire("", "Please select class", "error");
        return;
      }
      if (this.Selectedproduct == 0 || this.Selectedproduct == undefined) {
        Swal.fire("", "Please select product", "error");
        return;
      }



      if (this.fees == "" || this.fees == undefined) {
        Swal.fire("", "Please enter fees", "error");
        return;
      }
      if (!this.fees.match(/^([1-9][0-9]{,2}(,[0-9]{3})*|[0-9]+)(\.[0-9]{1,9})?$/)) {
        Swal.fire("", "Please enter valid fee", "error");
        return;
      }

      if (this.gst == "" || this.gst == undefined) {
        Swal.fire("", "Please enter gst", "error");
        return;
      }
      if (!this.gst.match(/^([1-9][0-9]{,2}(,[0-9]{3})*|[0-9]+)(\.[0-9]{1,9})?$/)) {
        Swal.fire("", "Please enter valid GST", "error");
        return;
      }

      if (this.conveniencefees == "" || this.conveniencefees == undefined) {
        Swal.fire("", "Please enter  Convenience fees", "error");
        return;
      }
      if (!this.conveniencefees.match(/^([1-9][0-9]{,2}(,[0-9]{3})*|[0-9]+)(\.[0-9]{1,9})?$/)) {
        Swal.fire("", "Please enter valid Convenience fees ", "error");
        return;
      }  


      let input = new FormData();

      input.append("pricingid", this.pricingid.toString());

      input.append("classid", this.Selectedclass.toString());
      input.append("productid", this.Selectedproduct.toString());


      input.append("fees", this.fees.toString());
      input.append("gst", this.gst.toString());
      input.append("conveniencefees", this.conveniencefees.toString());


      input.append("createdby", this.localstorage.get("userid").toString());

      this.http.post('api/paidfeaturebackend/Updatepaidfeature', input)
        .subscribe(
          (data) => {
            this.paidfeaturebackendData = data;
            if (this.paidfeaturebackendData.Status == true) {
              Swal.fire("", "Updated Successfully", "success");
              this.GetData();
              this.onClear();
              return;
            }

          })


    }



  }
  
  GetData() {
    debugger;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    this.Detail = [];

    this.http.get('api/paidfeaturebackend/GetSavedData', options).subscribe(
      (data) => {
        debugger;
        this.Detail = data;
        this.GetSaveData = this.Detail.data;

      }
    )
  }
  EditData(i: number, Id) {
    this.onClear();
    this.BindClass();
    this.BindProduct();
    this.ButtonText = 'Update';
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };

    this.http.get('api/paidfeaturebackend/GetEditData?pricingid=' + Id, options).subscribe(
      (data) => {
        debugger;
        this.GetEditedData = data;
        if (this.GetEditedData.Status == true) {
          this.pricingid = this.GetEditedData.data.pricingid;
          this.Selectedclass = this.GetEditedData.data.classid;
          this.Selectedproduct = this.GetEditedData.data.productid;
          this.fees = this.GetEditedData.data.fees;
          this.gst = this.GetEditedData.data.gst;
          this.conveniencefees = this.GetEditedData.data.conveniencefees;






        }
      }
    )
  }
  DeleteData(i: number, Id) {
    var data;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };

    data =
    {
      "pricingid": Id
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
        this.http.post('api/paidfeaturebackend/DeleteActivity', body, options).subscribe(
          (data) => {
            this.DeletedData = data;
            if (this.DeletedData.Status == true) {
              Swal.fire("", "Deleted Successfully", "success");
              this.GetData();
              return;
            }
          }
        )
      }
    })

  }
  onClear() {
    this.Selectedclass = 0;
    this.Selectedproduct = 0;
    this.name = "";
    this.description = "";
    this.testimonial = "";
    this.SelectedVideo = "";
    this.orgImageName = "";
    this.orgprofileImageName = "";
    this.SelectedProfileImage = "";
    this.SelectedImage = "";
    this.TestimonialButtonText = "Save";
    this.fees = "";
    this.gst = "";
    this.conveniencefees = "";

    this.ButtonText = "Save";
  }


}
