import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BusRecord } from '../BusRecord.model';
import {MatDialog} from '@angular/material/dialog';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';

@Component({
  selector: 'admin-console',
  templateUrl: './admin-console.component.html',
  styleUrls: ['./admin-console.component.css']
})
export class AdminConsoleComponent implements OnInit {
  http: HttpClient;
  serverData: Object | null;
  serverDataArr: any;
  url: string;
  constructor(public dialog:MatDialog, http: HttpClient) {
    this.http = http;
    this.serverData = null;
    this.url = "";
   }

  ngOnInit(): void {
      this.serverData = null;
      this.url= "http://localhost/bus/route/list";
      console.log('url', this.url);
  
      this.http.get<any>(
        this.url
      )
      .subscribe(
        res => {  // anonymous function
          console.log("Server return: " + JSON.stringify(res));
          this.serverData = JSON.stringify(res);
          this.serverDataArr = JSON.parse(JSON.stringify(res));
          console.log("DATA: " +  this.serverDataArr[0].ROUTE_ID);

        },  
        res => {  // anonymous function
          console.log("Server error: " + res);
          alert("No information found. Please enter again.");
        }
      );

  }
  showAddPostDialog() {
    this.dialog.open(EditDialogComponent);
  }

}