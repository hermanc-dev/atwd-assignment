import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit,Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatDialog} from '@angular/material/dialog';
import {MAT_DIALOG_DATA,MatDialogRef} from '@angular/material/dialog';


@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css']
})
export class EditFormComponent implements OnInit {
  
  routeID:string;
  ROUTE_NAMEE:string;
  FULL_FARE:string;
  LOC_START_NAMEE:string;
  LOC_END_NAMEE:string;
  http: HttpClient;
  serverData: Object | null;
  url: string;
  createBusForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,fb: FormBuilder, http: HttpClient,public dialogRef: MatDialogRef<EditFormComponent>,) {
    this.http = http;
    this.serverData = null;
    this.url = "";
    this.routeID = data.routeID;
    this.ROUTE_NAMEE= data.ROUTE_NAMEE;
    this.FULL_FARE= data.FULL_FARE;
    this.LOC_START_NAMEE= data.LOC_START_NAMEE;
    this.LOC_END_NAMEE= data.LOC_END_NAMEE;
    this.createBusForm = fb.group(
      {
        'routeNumber': [this.routeID, Validators.required],
        'fare': [this.FULL_FARE, Validators.required],
        'startPoint': [this.LOC_START_NAMEE, Validators.required],
        'endPoint': [this.LOC_END_NAMEE, Validators.required],
        'busName': [this.ROUTE_NAMEE, Validators.required]
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


    this.routeID = formValue['routeNumber']
    this.FULL_FARE = formValue['fare']
    this.ROUTE_NAMEE = formValue['busName']
    this.LOC_START_NAMEE = formValue['startPoint']
    this.LOC_END_NAMEE = formValue['endPoint']
    this.http.put<any>(
      this.url,
      {
        ROUTE_ID: formValue['routeNumber'],
        FULL_FARE: formValue['fare'],
        ROUTE_NAMEE: formValue['busName'],
        LOC_START_NAMEE: formValue['startPoint'],
        LOC_END_NAMEE: formValue['endPoint']
      }
    ).subscribe(
      res => {  // anonymous
        console.log("Server return: " + res);
        this.serverData = res;
      },
      res => {
        console.log("Server error: " + res);
        this.serverData = res;
      }
    );

    const data = {
        routeID:this.routeID,
        ROUTE_NAMEE:this.ROUTE_NAMEE,
        FULL_FARE:this.FULL_FARE,
        LOC_START_NAMEE:this.LOC_START_NAMEE,
        LOC_END_NAMEE:this.LOC_END_NAMEE
    }
    this.dialogRef.close(data);

  }

  ngOnInit(): void {
  }

}
