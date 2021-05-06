import { Component, OnInit,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public filter!: boolean;

  @Output() toParent = new EventEmitter();
  constructor() { 
  }

  ngOnInit(): void {
  }

  
  onFilterChange(event:any){
    this.filter =!this.filter;
  }
  
  resData(){
    this.toParent.emit(false);
  }
  
}
