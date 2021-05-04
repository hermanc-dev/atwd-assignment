import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { BusRecord } from '../BusRecord.model';
import { Component, Input, OnInit, Output, EventEmitter  } from '@angular/core';

@Component({
  selector: 'flip-card',
  templateUrl: './flip-card.component.html',
  styleUrls: ['./flip-card.component.css']
})
export class FlipCardComponent implements OnInit {
  toggleProperty = false;
  complexForm : FormGroup;
  http: HttpClient;
  serverData: Object | null;
  serverDataArr: any;
  url: string;
  objectKeys = Object.keys;



  busRecord: BusRecord = {
    ROUTE_ID: "",
    fare: 0,
    LOC_START_NAMEE: "",
    LOC_END_NAMEE: "",
    LOC_STOP_NAMEE: ""
  }

  constructor(fb: FormBuilder, http: HttpClient) {

    this.http = http;
    this.serverData = null;
    this.url = "";

    this.complexForm = fb.group({
      // 定義表格的預設值
      'routeId' : "",
      'busNo': "",
      'start' : "",
      'stop' : "",
      'end' : ""
    })


   }

  ngOnInit(): void {
    
  }

  toggle() {
    this.toggleProperty = !this.toggleProperty;
  }


  submitForm(value: any): void {
    console.log('Reactive Form Data:', value);
    this.serverData = null;
    this.url= "http://localhost/bus/route/"+value['routeId'];
    console.log('url', this.url);

    this.http.get<any>(
      this.url
    )
    .subscribe(
      res => {  // anonymous function
        console.log("Server return: " + res);
        this.serverData = res;
        this.serverDataArr = JSON.parse(JSON.stringify(res));
      
      
      },  
      res => {  // anonymous function
        console.log("Server error: " + res);
      }
    );


  }



}
