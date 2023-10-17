import { OnlineEnquiryService } from './../../../shared/service/online-enquiry.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormService } from '../../../shared/service/form.service';
import { OnlineEnquiryDto } from '../../../shared/dto/online-enquiry-dto';

@Component({
  selector: 'page-confirm-order',
  templateUrl: './confirm-order.component.html',
  styleUrls: ['./confirm-order.component.scss']
})
export class ConfirmOrderComponent implements OnInit {
  form: FormGroup;
  selectedYear: number = new Date().getFullYear();
  selectedMonth: number = new Date().getMonth();
  selectedDate: Date | null = null;
  selectedButtons: Set<string> = new Set<string>();
  currentDate: Date = new Date();

  years: number[] = [2023, 2024, 2025]; // Customize with your desired years
  months: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

constructor (private router:Router, private fb: FormBuilder, private onlineEnquiryService: OnlineEnquiryService, public formService: FormService){

}
  ngOnInit(): void {
    const step = this.formService.getSteps().filter(x => x.component == 'page-confirm-order')[0];
    if (step != this.formService.activeStep) {
      this.formService.redirectToCorrectStep();
    }

    this.form = this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      phone: [null, [Validators.required, Validators.maxLength(11), Validators.pattern('^[0-9]*$')]],
      addressLine1: [null],
      addressLine2: [null],
      city: [null],
      postcode: [{
        value: this.onlineEnquiryService.result.postcode,
        disabled: true
      }],
    });
  }
  get calendarDays(): number[] {
    const daysInMonth = new Date(this.selectedYear, this.selectedMonth + 1, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => i + 1);
  }
  getAvailableMonths(): string[] {
    const currentMonthIndex = new Date().getMonth();
    const availableMonths = [];

    for (let i = currentMonthIndex; availableMonths.length < 8; i++) {
      const monthIndex = i % 12; // Wrap around to the next year if needed
      availableMonths.push(this.months[monthIndex]);
    }

    return availableMonths;
  }

  isPastDate(day: number): boolean {
    const currentDate = new Date();
    const selectedDate = new Date(this.selectedYear, this.selectedMonth, day);

    return selectedDate < currentDate && selectedDate.getMonth() === currentDate.getMonth();
  }

  isDayAvailable(day: number): boolean {
    const currentDate = new Date();
    const selectedDate = new Date(this.selectedYear, this.selectedMonth, day);

    if (selectedDate < currentDate && selectedDate.getMonth() === currentDate.getMonth() && selectedDate.toDateString() !== currentDate.toDateString()) {
      return false;
    }
    return true;
  }


  isDateSelected(day: number): boolean {
    if (!this.selectedDate) return false;
    return new Date(this.selectedYear, this.selectedMonth, day).toDateString() === this.selectedDate.toDateString();
  }

  selectDate(day: number) {
    this.selectedDate = new Date(this.selectedYear, this.selectedMonth, day);
  }

  isButtonSelected(buttonName: string): boolean {
    return this.selectedButtons.has(buttonName);
  }
  selectMonth(monthIndex: number) {
    this.selectedMonth = monthIndex;
}

  toggleButton(buttonName: string) {
    if (this.selectedButtons.has(buttonName)) {
      this.selectedButtons.delete(buttonName);
    } else {
      this.selectedButtons.add(buttonName);
    }
  }

  confirmSelection() {
    console.log('Selected Year:', this.selectedYear);
    console.log('Selected Month:', this.months[this.selectedMonth]);
    console.log('Selected Date:', this.selectedDate?.toDateString());
    console.log('Selected Buttons:', Array.from(this.selectedButtons));
    this.router.navigate(['/customerdetails']);
  }

  updateCalendar() {
  }

  submitForm() {
    debugger;
    if (this.form.valid) {

      const value: OnlineEnquiryDto = this.form.getRawValue();

      // todo patch value to saved value

      // Handle form submission
      console.log(this.form.value);

      this.formService.next();

    } else {
      this.form.markAsDirty();
      // Form is not valid, show error messages or take appropriate action
    }
  }
}
