import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {
  test:string;
  constructor(@Inject(MAT_DIALOG_DATA) private data: any) {
    this.test = data.test;
    console.log(data.test);
  }

  ngOnInit(): void {
  }

}
