import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InstallmentbillingsummaryComponent } from '../installmentbillingsummary/installmentbillingsummary.component';
import { InstallmentsSummaryComponent } from '../installments-summary/installments-summary.component';

@Component({
  selector: 'app-choosensystem',
  templateUrl: './choosensystem.component.html',
  styleUrls: ['./choosensystem.component.scss']
})
export class ChoosensystemComponent {
  constructor(public dialog: MatDialog) {}

  openPopup(): void {
    const dialogRef = this.dialog.open(InstallmentsSummaryComponent, {
      width: '30%',
      height:'90%'
    });

    // Handle dialog close or other events here
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
