import { Component } from '@angular/core';

@Component({
  selector: 'app-installments-summary',
  templateUrl: './installments-summary.component.html',
  styleUrls: ['./installments-summary.component.scss']
})
export class InstallmentsSummaryComponent {
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

  closeDialog(): void {
    
  }

  calculate(): void {
    this.calculations = [];

    if (this.selectedPeriod) {
      const depositAmount = (this.depositPercent / 50) * this.selectedPeriod.amount;

      const rateOfInterest = 11.3;
      const effectiveAPR = 11.9;
      const numberOfPayments = this.selectedPeriod.period;
      const costOfCredit = 100;
      const totalAmountPayable = depositAmount + costOfCredit;
      const setupFee = 0;

      this.calculations.push(
        { label: 'Deposit Amount', value: depositAmount },
        { label: 'Rate of Interest', value: rateOfInterest },
        { label: 'Effective APR', value: effectiveAPR },
        { label: 'Number of Payments', value: numberOfPayments },
        { label: 'Cost of Credit', value: costOfCredit },
        { label: 'Total Amount Payable', value: totalAmountPayable },
        { label: 'Setup fee', value: setupFee }
      );
    }
  }
}
