import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDatepickerConfig, NgbTimepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { LocalStorageService } from 'angular-2-local-storage';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-partnerbankdetail',
  templateUrl: './partnerbankdetail.component.html',

})
export class Partnerbankdetail implements OnInit {
  ButtonText: string = "Save";
  
  accounttype: number = 0;
  accountname: string = "";
  accountno: string = "";
  ifsccode: string = "";
  bankname: string = "";
  branch: string = "";
  partnerid: number = 0;
  BankAccountData: any = [];
  Detail: any = [];
  GetSaveData: any = [];
  GetEditedData: any = [];
  DeletedData: any = [];


  constructor(private http: HttpClient, private router: Router, private localstorage: LocalStorageService, private toaster: ToastrService, private loader: NgxUiLoaderService, private renderer: Renderer2, config: NgbTimepickerConfig, private config1: NgbDatepickerConfig) {


  }
  ngOnInit() {
    this.GetData();

  }
  onSubmit() {
    debugger;
    if (this.ButtonText == "Save") {

      if (this.accountname == "" || this.accountname == undefined) {
        Swal.fire("", "Please enter account name", "error");
        return;
      }
      if (this.accountno == "" || this.accountno == undefined) {
        Swal.fire("", "Please enter accountno", "error");
        return;
      }
      if (this.ifsccode == "" || this.ifsccode == undefined) {
        Swal.fire("", "Please enter ifsc code", "error");
        return;
      }
      if (this.bankname == "" || this.bankname == undefined) {
        Swal.fire("", "Please enter bank name", "error");
        return;
      }
      if (this.branch == "" || this.branch == undefined) {
        Swal.fire("", "Please enter branch name", "error");
        return;
      }
      if (this.accounttype == 0 || this.accounttype == undefined) {
        Swal.fire("", "Please select account type", "error");
        return;
      }


      let input = new FormData();

      input.append("partnerid", this.partnerid.toString());

      input.append("accountname", this.accountname.toString());
      input.append("accountno", this.accountno.toString());


      input.append("ifsccode", this.ifsccode.toString());
      input.append("bankname", this.bankname.toString());
      input.append("branch", this.branch.toString());
      input.append("accounttype", this.accounttype.toString());

      input.append("createdby", this.localstorage.get("userid").toString());

      this.http.post('api/partnerbank/Savepartnerbankdetail', input)
        .subscribe(
          (data) => {
            debugger;
            this.BankAccountData = data;
            if (this.BankAccountData.Status == true) {
              if (this.BankAccountData.Message == "Account Already Exists") {
                Swal.fire("", "Account Already Exists", "success");
                //this.onClear();
                return;
              }
              else {
                Swal.fire("", "Saved Successfully", "success");
                this.GetData();
                this.onClear();
                return;

              }

            }
          }
        )
    


    }
    else {
      debugger;
      if (this.accountname == "" || this.accountname == undefined) {
        Swal.fire("", "Please enter account name", "error");
        return;
      }
      if (this.accountno == "" || this.accountno == undefined) {
        Swal.fire("", "Please enter accountno", "error");
        return;
      }
      if (this.ifsccode == "" || this.ifsccode == undefined) {
        Swal.fire("", "Please enter ifsc code", "error");
        return;
      }
      if (this.bankname == "" || this.bankname == undefined) {
        Swal.fire("", "Please enter bank name", "error");
        return;
      }
      if (this.branch == "" || this.branch == undefined) {
        Swal.fire("", "Please enter branch name", "error");
        return;
      }
      if (this.accounttype == 0 || this.accounttype == undefined) {
        Swal.fire("", "Please select account type", "error");
        return;
      }

      let input = new FormData();
      input.append("partnerid", this.partnerid.toString());

      input.append("accountname", this.accountname.toString());
      input.append("accountno", this.accountno.toString());


      input.append("ifsccode", this.ifsccode.toString());
      input.append("bankname", this.bankname.toString());
      input.append("branch", this.branch.toString());
      input.append("accounttype", this.accounttype.toString());

      input.append("createdby", this.localstorage.get("userid").toString());
      
      this.http.post('api/partnerbank/UpdateAccount', input)
        .subscribe(
          (data) => {
            this.BankAccountData = data;
            if (this.BankAccountData.Status == true) {
              if (this.BankAccountData.Message == "Account Already Exists") {
                this.GetData();
                Swal.fire("", "Account Already Exists", "success");
                this.onClear();
                return;
              }
              else {
                

                Swal.fire("", "Updated Successfully", "success");
                this.GetData();
                this.onClear();
                return;
              }

            }
          })


    }
  }
    GetData() {
      debugger;
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      let options = { headers: headers };
      this.Detail = [];
      let input = new FormData();



      input.append("createdby", this.localstorage.get("userid").toString());

      this.http.post('api/partnerbank/GetSavedData', input).subscribe(
        (data) => {
          debugger;
          this.Detail = data;
          this.GetSaveData = this.Detail.data;

        }
      )
    }
  EditData(i: number, Id) {
 
    this.ButtonText = 'Update';
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };

    this.http.get('api/partnerbank/GetEditData?partnerid=' + Id, options).subscribe(
      (data) => {
        debugger;
        this.GetEditedData = data;
        if (this.GetEditedData.Status == true) {
          this.partnerid = this.GetEditedData.data.partnerid;
          this.accountname = this.GetEditedData.data.accountname;
          this.accountno = this.GetEditedData.data.accountno;
          this.ifsccode = this.GetEditedData.data.ifsccode;

          this.bankname = this.GetEditedData.data.bankname;
          this.branch = this.GetEditedData.data.branch;
          this.accounttype = this.GetEditedData.data.accounttype;
          






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
      "partnerid": Id
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
        this.http.post('api/partnerbank/DeleteActivity', body, options).subscribe(
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
    

    this.accounttype =0;
    this.accountname = "";
    this.accountno = "";
    this.ifsccode = "";

    this.bankname = "";
    this.branch = "";

    this.ButtonText = "Save";
  }
}

