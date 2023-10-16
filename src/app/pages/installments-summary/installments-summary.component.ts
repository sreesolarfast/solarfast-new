import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-installments-summary',
  templateUrl: './installments-summary.component.html',
  styleUrls: ['./installments-summary.component.scss']
})
export class InstallmentsSummaryComponent {
  constructor(private dialogRef: MatDialogRef<InstallmentsSummaryComponent>){
    dialogRef.disableClose = true;
  }
  loanPeriods = [
    { period: 60, amount: 1200 },
    { period: 120, amount: 2200 },
    { period: 180, amount: 3200 },
  ];

  depositPercent: number = 0;
  calculations: any[] = [];
  selectedPeriod: any;

  ngOnInit() {
    this.selectedPeriod = this.loanPeriods[1];
    this.calculate();
  }

  onSelectPeriod(period: any): void {
    this.selectedPeriod = period;
    this.calculate();
  }

  calculate(): void {
    this.calculations = [];

    if (this.selectedPeriod) {
      const depositAmount = (this.depositPercent / 100) * this.selectedPeriod.amount;

      const rateOfInterest = 11.3;
      const effectiveAPR = 11.9;
      const numberOfPayments = this.selectedPeriod.period;
      const costOfCredit = 100;
      const totalAmountPayable = depositAmount + costOfCredit;

      this.calculations.push(
        { label: 'Deposit Amount', value: depositAmount },
        { label: 'Rate of Interest', value: rateOfInterest },
        { label: 'Effective APR', value: effectiveAPR },
        { label: 'Number of Payments', value: numberOfPayments },
        { label: 'Cost of Credit', value: costOfCredit },
        { label: 'Total Amount Payable', value: totalAmountPayable }
      );
    }
  }
}
