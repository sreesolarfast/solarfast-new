import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-installment-summary',
  templateUrl: './installment-summary.component.html',
  styleUrls: ['./installment-summary.component.scss']
})
export class InstallmentSummaryComponent {

  loanPeriods: any[] = [];
  totalLoanAmount: number;
  annualInterestRate = 11.9;
  effectiveAPR = 11.9;
  depositPercent = 50;
  calculations: any[] = [];
  selectedPeriod: any;
  emi:number=0;
  totalInterestPayable:number=0;
  totalPayment:number=0;
  principalLoanAmount:number=0;
  totalInterset:number=0;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.totalLoanAmount = this.data.totalSalePrice;
    this.calculateHomeLoanDetails(60);
    this.calculateHomeLoanDetails(120);
    this.calculateHomeLoanDetails(180);
    if(this.depositPercent===50){
      this.onRangeChange();
    }
  }

  ngOnInit() {
    this.selectedPeriod = this.loanPeriods[2];
    this.calculate();
  }

  onSelectPeriod(period: any): void {
    this.selectedPeriod = period;
    this.calculate();
  }

  onRangeChange(){
    this.calculateLoanPeriodAmounts()
  }

calculateLoanPeriodAmounts(){
  const depositAmount = (this.depositPercent / 100) * this.totalLoanAmount;
  this.loanPeriods.forEach((period)=>{
    const loanAmount = this.totalLoanAmount - depositAmount;
    const monthlyInterestRate = this.annualInterestRate / 12 / 100;
    const monthlyPayments = period.period;
    const emi = (loanAmount*monthlyInterestRate)/(1-Math.pow(1+monthlyInterestRate,-monthlyPayments));
    period.amount= emi;
  })
}
  calculate(): void {
    this.calculations = [];

    if (this.selectedPeriod) {
      const numberOfPayments = this.selectedPeriod.period;
      const depositAmount = (this.depositPercent / 100) * this.totalLoanAmount;

      // const costOfCredit = this.totalLoanAmount - depositAmount;
      const effectiveAPR = this.effectiveAPR;
      const loanAmount = this.totalLoanAmount - depositAmount;
      const monthlyInterestRate = (this.annualInterestRate / 12)/100;
      const monthlyPayments = numberOfPayments;
      const emi = (loanAmount*monthlyInterestRate)/(1-Math.pow(1+monthlyInterestRate,-monthlyPayments));
      const totalAmountPayable = (emi*numberOfPayments)-loanAmount;
      const totalPayment = emi * monthlyPayments;
      const setupFee = 0;

      this.calculations.push(
        { label: 'Rate of Interest', value: this.annualInterestRate },
        { label: 'Effective APR', value: effectiveAPR },
        { label: 'Number of Payments', value: numberOfPayments },
        // { label: 'Deposit Amount', value: depositAmount },
        // { label: 'Cost of Credit', value: costOfCredit },
        { label: 'Total Interest Payable', value: totalAmountPayable },
        { label: 'Total Amount Payable', value: totalPayment },
        { label: 'Setup fee', value: setupFee }
      );
    }
  }

  calculateHomeLoanDetails(period: number): void {
    const monthlyInterestRate = (this.annualInterestRate / 12)/100;
    const loanAmount = this.totalLoanAmount;
    const numberOfPayments = period;
    this.emi = (loanAmount*monthlyInterestRate)/(1-Math.pow(1+monthlyInterestRate,-numberOfPayments));
    this.totalInterestPayable = (this.emi*numberOfPayments)-loanAmount;
    this.totalPayment = this.emi*numberOfPayments;
    this.principalLoanAmount = loanAmount;
    this.totalInterset = this.totalInterestPayable;
    this.loanPeriods.push({ period: numberOfPayments, amount: this.emi });
  }

}
