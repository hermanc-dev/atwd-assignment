import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component'
import {MatInputModule} from '@angular/material/input';
import {MatDialog} from '@angular/material/dialog';
import {MAT_DIALOG_DATA,MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.css']
})
export class CreateFormComponent implements OnInit {
  http: HttpClient;
  serverData: Object | null;
  url: string;
  createBusForm: FormGroup;
  routeID:string;
  ROUTE_NAMEE:string;
  FULL_FARE:string;
  LOC_START_NAMEE:string;
  LOC_END_NAMEE:string;
  msg=""


  constructor(fb: FormBuilder, http: HttpClient,public dialog:MatDialog,) {
    this.http = http;
    this.serverData = null;
    this.url = "";

    this.routeID="";
    this.ROUTE_NAMEE="";
    this.FULL_FARE="";
    this.LOC_START_NAMEE="";
    this.LOC_END_NAMEE="";


    this.createBusForm = fb.group(
      {
        'routeNumber': ['', Validators.required],
        'fare': ['', Validators.required],
        'startPoint': ['', Validators.required],
        'endPoint': ['', Validators.required],
        'busName': ['', Validators.required]
      }
    );
  }

  onSubmit(formValue: any): void {


          this.serverData = null;
          this.url = "http://localhost/bus/route";

          console.log(formValue['routeNumber']);
          console.log(formValue['fare']);
          console.log(formValue['startPoint']);
          console.log(formValue['endPoint']);
          this.routeID=formValue['routeNumber'];
          this.ROUTE_NAMEE=formValue['routeNumber']
          this.FULL_FARE=formValue['fare']
          this.LOC_START_NAMEE=formValue['startPoint']
          this.LOC_END_NAMEE=formValue['endPoint']

    const dialogRef=this.dialog.open(ConfirmDialogComponent,{data:{
        routeID:this.routeID,
        msg: "Do you want to create Route: ",
        action: "CREATE",
      },height: '160px',
      width: '300px',
      panelClass: 'custom-dialog-container',
    });
    dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    console.log(`Dialog result: ${result}`); // Pizza!
      // this.dialogRef.close(this.routeID);
      result = result.toString();
      console.log(result)
      if(result=="confirm"){
          console.log("hahahahahah")
          this.http.post<any>(
            this.url,
            {
              ROUTE_ID: formValue['routeNumber'],
              FULL_FARE: formValue['fare'],
              ROUTE_NAMEE: formValue['busName'],
              COMPANY_CODE : "KMB",
              LOC_START_NAMEE: formValue['startPoint'],
              LOC_END_NAMEE: formValue['endPoint']
            }
          ).subscribe(
            res => {  // anonymous
              console.log("Server return: " + res);
              this.serverData = res;
              this.msg = "Bus route created!"
            },
            res => {
              console.log("Server error: " + res);
              this.serverData = res;
            }
          );


      }

    });


  }


    createDialog(){




    }





  ngOnInit(): void {
  }

}
