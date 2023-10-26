import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContactUsComponent } from '../contact-us/contact-us.component';

@Component({
  selector: 'app-get-in-touch',
  templateUrl: './get-in-touch.component.html',
  styleUrls: ['./get-in-touch.component.scss']
})
export class GetInTouchComponent implements OnInit {

    constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  open() {
    const dialogRef = this.dialog.open(ContactUsComponent, {
        panelClass: ['my-custom-class'],
        width: '60%',
        height: 'auto',
        maxHeight: '90vh',
        disableClose: false,
    });
  }

}
