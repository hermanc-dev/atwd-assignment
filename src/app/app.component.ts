import { Component } from '@angular/core';
import { BusRecord } from './BusRecord.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bus-route-web';
  deleteEventTriggered: boolean = false;
  busRecord!: BusRecord;
  checked = true;

  deleteEventReceiver(busRecord: BusRecord) {
    console.log("App: delete event received");
    console.log("App: busRecord received from delete event:");

    // save busRecord received from SearchBusComponent via event
    //this.busRecord = busRecord;
    var newBusRecord: BusRecord = {
      "ROUTE_ID": busRecord.ROUTE_ID,
      "FULL_FARE": busRecord.FULL_FARE,
      "LOC_START_NAMEE": busRecord.LOC_START_NAMEE,
      "LOC_END_NAMEE": busRecord.LOC_END_NAMEE,
      "LOC_STOP_NAMEE": busRecord.LOC_STOP_NAMEE,
      "ROUTE_NAMEE": busRecord.ROUTE_NAMEE
    };
    this.busRecord = newBusRecord;

    console.log("routeNumber: " + this.busRecord.ROUTE_ID);
    console.log("fare: " + this.busRecord.FULL_FARE);
    console.log("startPoint: " + this.busRecord.LOC_START_NAMEE);
    console.log("endPoint: " + this.busRecord.LOC_END_NAMEE);

    this.deleteEventTriggered = true;
  }

  

  cancelDeleteEventReceiver() {
    console.log("App: cancel event received");
    this.deleteEventTriggered = false;
  }

  resData (e:any) {
    this.checked=e;
  }
}
