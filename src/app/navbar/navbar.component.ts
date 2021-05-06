import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public filter!: boolean;

  constructor() { 
  }

  ngOnInit(): void {
  }

  
  onFilterChange(event:any){
    this.filter =!this.filter;
  }
  
}
