import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import {MatInputModule} from '@angular/material/input';

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

  constructor(fb: FormBuilder, http: HttpClient) {
    this.http = http;
    this.serverData = null;
    this.url = "";

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
      },
      res => {
        console.log("Server error: " + res);
        this.serverData = res;
      }
    );
  }

  ngOnInit(): void {
  }

}
