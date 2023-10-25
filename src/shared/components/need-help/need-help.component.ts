import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContactUsComponent } from '../contact-us/contact-us.component';

@Component({
  selector: 'app-need-help',
  templateUrl: './need-help.component.html',
  styleUrls: ['./need-help.component.scss']
})
export class NeedHelpComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }


  open() {
    const dialogRef = this.dialog.open(ContactUsComponent, {
        panelClass: ['my-custom-class'],
        width: '40%',
        height: 'auto',
        maxHeight: '90vh',
        disableClose: false,
    });
  }
}
