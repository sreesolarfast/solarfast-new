import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-installments-summary',
  templateUrl: './installments-summary.component.html',
  styleUrls: ['./installments-summary.component.scss']
})
export class InstallmentsSummaryComponent {
  loanPeriods: any[] = [];
  totalLoanAmount: number;
  annualInterestRate = 11.3;
  effectiveAPR = 11.9;
  depositPercent = 50;
  calculations: any[] = [];
  selectedPeriod: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    console.log('Data received in InstallmentsSummaryComponent:', this.data);
    this.totalLoanAmount = this.data.totalCostPrice;
    this.calculateLoanDetails(36);
    this.calculateLoanDetails(60);
    this.calculateLoanDetails(84);
    this.calculateLoanDetails(120);
  }

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
      const numberOfPayments = this.selectedPeriod.period;
      const depositAmount = (this.depositPercent / 100) * this.totalLoanAmount;

      const costOfCredit = this.totalLoanAmount - depositAmount;
      const effectiveAPR = this.effectiveAPR;
      const totalAmountPayable = depositAmount + costOfCredit;
      const setupFee = 0;

      this.calculations.push(
        { label: 'Rate of Interest', value: this.annualInterestRate },
        { label: 'Effective APR', value: effectiveAPR },
        { label: 'Number of Payments', value: numberOfPayments },
        // { label: 'Deposit Amount', value: depositAmount },
        { label: 'Cost of Credit', value: costOfCredit },
        { label: 'Total Amount Payable', value: totalAmountPayable },
        { label: 'Setup fee', value: setupFee }
      );
    }
  }

  calculateLoanDetails(period: number): void {
    const annualInterestRate = this.annualInterestRate / 100;
    const monthlyInterestRate = annualInterestRate / 12;
    const loanAmount = this.totalLoanAmount;
    const numberOfPayments = period;

    const monthlyPayment = (loanAmount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));

    this.loanPeriods.push({ period: numberOfPayments, amount: monthlyPayment });
  }
}
