import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { GoogleMapsModule } from '@angular/google-maps'
import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps'
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})

export class EditDialogComponent implements OnInit {
  routeID:string;

      ROUTE_NAMEE:string;
      FULL_FARE:string;
      LOC_START_NAMEE:string;
      LOC_END_NAMEE:string;






  panorama:any;
  streetView= false;
  http: HttpClient;
  serverData: Object | null;
  serverDataArr: any;
  location: Object | null;
  locations: any[] = new Array;
  markers: any[] = new Array;

  url: string;

  zoom = 15

  center: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    zoomControl: true,
    scrollwheel: true, 
    disableDoubleClickZoom: false,
    maxZoom: 15,
    minZoom: 8,
    streetViewControl: true,
  }

  marker = {
   position: {lat: 22.350785004266545, lng: 114.10568707938761
  },
}
//843622  813951

// http://www.geodetic.gov.hk/transform/v2/?inSys=hkgrid&n=843622&e=813951&outSys=wgsgeog

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,  http: HttpClient) {
    this.routeID = data.routeID;
  this.ROUTE_NAMEE= data.ROUTE_NAMEE;
      this.FULL_FARE= data.FULL_FARE;
      this.LOC_START_NAMEE= data.LOC_START_NAMEE;
      this.LOC_END_NAMEE= data.LOC_END_NAMEE;
    console.log(data.routeID);
    this.center={lat: 22.350785004266545, lng: 114.10568707938761};
    //HTTP
    this.http = http;
    this.serverData = null;
    this.location =null;
    this.url = "";

  }

  ngOnInit(): void {
    // navigator.geolocation.getCurrentPosition((position) => {
    //   this.center = {
    //     lat: position.coords.latitude,
    //     lng: position.coords.longitude,
    //   }
    // })
   // this.center={lat: 22.350785004266545, lng: 114.10568707938761};

   //HTTP
    this.serverData = null;
      this.url= "http://localhost/bus/rstop/"+this.routeID;
      //console.log('url', this.url);
      this.http.get<any>(
        this.url
      )
      .subscribe(
        res => {  // anonymous function
          console.log("Server return: " + JSON.stringify(res));
          this.serverData = JSON.stringify(res);
          this.serverDataArr = JSON.parse(JSON.stringify(res));
        //  console.log("DATA: " +  this.serverDataArr[0].ROUTE_ID);
          for(let hkgrid of this.serverDataArr ){
            this.url= "http://www.geodetic.gov.hk/transform/v2/?inSys=hkgrid&n=" + hkgrid.Y + "&e="+ hkgrid.X +"&outSys=wgsgeog"
         //   console.log('url', this.url);
            this.http.get<any>(
            this.url
            )
            .subscribe(
               res => {  // anonymous function
              //  this.location.push(JSON.parse(JSON.stringify(res)))
                //json string
                this.location = JSON.stringify(res);
                //json object
                this.locations.push({
                  lat: Number(JSON.stringify(res.wgsLat)),
                  lng: Number(JSON.stringify(res.wgsLong)),
                })

                // this.locations = JSON.parse(JSON.stringify(res));
                console.log("location"+this.location)
                // console.log("locations"+this.locations)
                // console.log("test"+JSON.stringify(res.wgsLong))
                this.markers.push({position: {
                  lat: Number(JSON.stringify(res.wgsLat)),
                  lng: Number(JSON.stringify(res.wgsLong)),
                }})
               },
               res => {  // anonymous function
                console.log("Server error: " + res);
                alert("No information found. Please enter again.");
                }
            );
          }
        },  
        res => {  // anonymous function
          console.log("Server error: " + res);
          alert("No information found. Please enter again.");
        }
      );




  //map marker

    //this.center = {lat: this.markers[0],  lng: this.markers[0]}

  }


  pop(STOP_SEQ:string){
      const index = Number(STOP_SEQ);
    
      console.log(this.markers)
      console.log(  this.markers[index-1]["position"])

  }

  // show(){

  // const fenway = { lat: 42.345573, lng: -71.098326 };
  // const map = new google.maps.Map(document.getElementById("map")!, {
  //   center: fenway,
  //   zoom: 14,
  // });
  // const panorama = new google.maps.StreetViewPanorama(
  //   document.getElementById("pano")!,
  //   {
  //     position: fenway,
  //     pov: {
  //       heading: 34,
  //       pitch: 10,
  //     },
  //   }
  // );
  // map.setStreetView(panorama);
  // }

  show(STOP_SEQ:string){
    const index = Number(STOP_SEQ);
    console.log(index)
    const astorPlace = this.markers[index-1]["position"];
    console.log(astorPlace)
  // Set up the map
  const map = new google.maps.Map(document.getElementById("sv")!, {
    center: astorPlace,
    zoom: 18,
    streetViewControl: false,
  });
  
  // We get the map's default panorama and set up some defaults.
  // Note that we don't yet set it visible.
  this.panorama = map.getStreetView(); // TODO fix type
  this.panorama.setPosition(astorPlace);
  this.panorama.setPov(
    /** @type {google.maps.StreetViewPov} */ {
      heading: 265,
      pitch: 0,
    }
  );

//toggle
 const toggle = this.panorama.getVisible();

  if (toggle == false) {
    this.panorama.setVisible(true);
  } else {
    this.panorama.setVisible(false);
  }
  document.getElementById("sv")!.style.display=""
  document.getElementById("map")!.style.display="none"

   console.log(this.streetView)
  
  }


}

