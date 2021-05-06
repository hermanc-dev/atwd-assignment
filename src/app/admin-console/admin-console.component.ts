import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BusRecord } from '../BusRecord.model';
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
  constructor( http: HttpClient) {
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


}
