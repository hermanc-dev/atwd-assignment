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
    FULL_FARE: 0,
    LOC_START_NAMEE: "",
    LOC_END_NAMEE: "",
    LOC_STOP_NAMEE: "",
    ROUTE_NAMEE: "",
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

  back() {
    this.toggleProperty = !this.toggleProperty;
    this.serverData=null;
    this.serverDataArr=null;
  }

  toggle() {
    // this.toggleProperty = !this.toggleProperty;
  }

  submitForm(value: any): void {
    var query="";
    if(value['routeId']!=""){
      query+="ROUTE_ID=" + value['routeId']+"&"; 
    }

    if(value['start']!=""){
      query+="LOC_START_NAMEE=" + value['start']+"&"; 
    }

    if(value['busNo']!=""){
      query+="ROUTE_NAMEE=" + value['busNo']+"&"; 
    }

    if(value['end']!=""){
      query+="LOC_END_NAMEE=" + value['end']+"&"; 
    }

    if(value['stop']!=""){
      query+="LOC_STOP_NAMEE=" + value['stop']+"&"; 
    }

    query = query.substr(0, query.length-1);
    query = query.replace(" ","+")

    console.log('Reactive Form Data:', value);
    this.serverData = null;
    this.url= "http://localhost/bus/route/"+query;
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
        
        // let check : string[][] = []
        var check = new Array();
        var counter=0;
        for(var item of this.serverDataArr){
          console.log(item["ROUTE_ID"])
          if(counter==0){
            check.push(item)
            counter++;
          }
          else if(check[counter-1]["ROUTE_ID"] != item["ROUTE_ID"]){
            check.push(item)
            counter++;
          }
        }

      console.log(check);
      this.serverDataArr = check;
      this.toggleProperty = !this.toggleProperty;

      },  
      res => {  // anonymous function
        console.log("Server error: " + res);
        alert("No information found. Please enter again.");
      }
    );


  }

  @Output() deleteEvent = new EventEmitter<BusRecord>();

  deleteButtonHandler(ROUTE_ID: string) {
    console.log("Search: delete button: " + ROUTE_ID);
    console.log("Search: Emitting deleteEvent");

    for (let bus of this.serverDataArr) {
      if (ROUTE_ID === bus.ROUTE_ID) {
        this.busRecord.ROUTE_ID = bus.ROUTE_ID;
        this.busRecord.ROUTE_NAMEE = bus.ROUTE_NAMEE;
        this.busRecord.FULL_FARE = bus.FULL_FARE;
        this.busRecord.LOC_START_NAMEE = bus.LOC_START_NAMEE;
        this.busRecord.LOC_END_NAMEE = bus.LOC_END_NAMEE;
        this.busRecord.LOC_STOP_NAMEE = bus.LOC_STOP_NAMEE;

        // this.busRecord.LOC_STOP_NAMEE = bus.LOC_STOP_NAMEE;
      }
    }
    console.log(this.busRecord);
    this.deleteEvent.emit(this.busRecord);
  }

  pop(ROUTE_ID:string){
    console.log("clicked row");
    console.log("DATA: " +  ROUTE_ID);
    this.url= "http://localhost/bus/route/"+ROUTE_ID;
    console.log('url', this.url);
    this.http.get<any>(
      this.url
    )
    .subscribe(
      res => {  // anonymous function
        console.log("Server return: " + JSON.stringify(res));
      },  
      res => {  // anonymous function
        console.log("Server error: " + res);
      }
    );

  }

}
