import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { GoogleMapsModule } from '@angular/google-maps'
import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps'
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {
  http: HttpClient; 
  serverData: Object | null;
  serverDataArr: any;
  url: string;
  ROUTE_ID:string
  test:string="aaa";
  action:string;
  msg:string;



  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>,@Inject(MAT_DIALOG_DATA) private data: any,  http: HttpClient) { 
    this.ROUTE_ID = data.routeID;
    this.http = http;
    this.serverData = null;
    this.url = "";
    this.msg =data.msg;
    this.action = data.action;
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close("cancel");
  }

  confirm(){


    if(this.action=="DELETE"){
      this.url= "http://localhost/bus/route/"+this.ROUTE_ID;
      console.log('url', this.url);
      this.http.delete<any>(
        this.url
      )
      .subscribe(
        res => {  // anonymous function
          console.log("Server return: " + JSON.stringify(res));
              this.dialogRef.close("deleted");
        },
        res => {  // anonymous function
          console.log("Server error: " + res);
        }
      );
    }
    if(this.action=="CREATE"){
          this.dialogRef.close("confirm");
    }

  }


}
