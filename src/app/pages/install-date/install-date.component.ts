import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormService } from '../../../shared/service/form.service';
import { OnlineEnquiryService } from '../../../shared/service/online-enquiry.service';

@Component({
  selector: 'page-install-date',
  templateUrl: './install-date.component.html',
  styleUrls: ['./install-date.component.scss']
})
export class InstallDateComponent {
    selectedYear: number = new Date().getFullYear();
    selectedMonth: number = new Date().getMonth();
    selectedDate: Date | null = null;
    selectedButtons: Set<string> = new Set<string>();
    currentDate: Date = new Date();

    years: number[] = [2023, 2024, 2025]; // Customize with your desired years
    months: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    constructor(
        private router: Router,
        private formService: FormService,
        private onlineEnquiryService: OnlineEnquiryService
    ) {}

    ngOnInit(): void {
        const step = this.formService.getSteps().filter(x => x.component == 'page-install-date')[0];
        if (step != this.formService.activeStep) {
          this.formService.redirectToCorrectStep();
        }
    }

    get calendarDays(): number[] {
        const daysInMonth = new Date(this.selectedYear, this.selectedMonth , 0).getDate();
        return Array.from({ length: daysInMonth }, (_, i) => i + 1);
    }

    getAvailableMonths(): { name: string; value: number }[] {
        const currentMonthIndex = new Date().getMonth();
        const availableMonths = [];

        for (let i = currentMonthIndex; availableMonths.length < 3; i++) {
            const monthIndex = i % 12; // Wrap around to the next year if needed
            const monthValue = monthIndex; // Add 1 to get the actual month value
            const monthName = this.months[monthIndex];

            availableMonths.push({ name: monthName, value: monthValue });
        }

        return availableMonths;
    }

    isConfirmSelectionReady(): boolean {
        return this.selectedDate !== null;
    }

    isPastDate(day: number): boolean {
        const currentDate = new Date();
        currentDate.setMonth(currentDate.getMonth());
        const selectedDate = new Date(this.selectedYear, this.selectedMonth, day);

        return selectedDate < currentDate && selectedDate.getMonth() === currentDate.getMonth();
    }

    isDayAvailable(day: number): boolean {
        const currentDate = new Date();
        const selectedDate = new Date(this.selectedYear, this.selectedMonth, day);

        if(selectedDate.getDay() == 0 || selectedDate.getDay() == 6) {
            return false;
        }

        if (
            selectedDate < currentDate &&
            selectedDate.getMonth() === currentDate.getMonth() &&
            selectedDate.toDateString() !== currentDate.toDateString()
        ) {
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

    selectMonth(monthIndex: number) {
        this.selectedMonth = monthIndex;
    }

    answerGiven() {
        console.log('Selected Year:', this.selectedYear);
        console.log('Selected Month:', this.months[this.selectedMonth]);
        console.log('Selected Date:', this.selectedDate);
        console.log('Selected Buttons:', Array.from(this.selectedButtons));
        this.onlineEnquiryService.result.provisionalInstallDate = this.selectedDate;
        this.formService.next();
    }

    backButton() {
        this.formService.back();
    }
}
