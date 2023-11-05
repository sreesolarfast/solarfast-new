import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormService } from '../../../shared/service/form.service';
import { OnlineEnquiryService } from '../../../shared/service/online-enquiry.service';
import { buffer } from 'rxjs';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
    selector: 'page-install-date',
    templateUrl: './install-date.component.html',
    styleUrls: ['./install-date.component.scss'],
    animations: [
        trigger('fadeIn', [
            state('void', style({ opacity: 0 })), // Initial state (invisible)
            transition(':enter', [animate('100ms')]), // Transition to visible when added to the DOM
        ]),
    ],
})
export class InstallDateComponent {
    selectedYear: number = new Date().getFullYear();
    selectedMonth: number = new Date().getMonth();
    selectedDate: Date | null = null;
    selectedButtons: Set<string> = new Set<string>();
    currentDate: Date = new Date();

    months: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    constructor(private router: Router, private formService: FormService, private onlineEnquiryService: OnlineEnquiryService) {}

    ngOnInit(): void {
        const step = this.formService.getSteps().filter(x => x.component == 'page-install-date')[0];
        if (step != this.formService.activeStep) {
            this.formService.redirectToCorrectStep();
        }

        this.onlineEnquiryService.result$.subscribe({
            next: x => {
                if (x.provisionalInstallDate == null) return;
                const date = new Date(x.provisionalInstallDate);
                this.selectedYear = date.getFullYear();
                this.selectedMonth = date.getMonth();
                this.selectedDate = date;
            },
        });

        this.getNextAvailableDate();
    }

    get calendarDays(): number[] {
        const daysInMonth = new Date(this.selectedYear, this.selectedMonth, 0).getDate();
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

    getDayOfWeek(day: number): string {
        const date = new Date();
        date.setDate(day);
        date.setMonth(this.selectedMonth);
        const dayOfWeek = date.getDay();

        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const dayName = days[dayOfWeek];

        return dayName;
    }

    isDayAvailable(day: number, month: number | null, year: number | null): boolean {
        if (month == null || year == null) {
            const currentDate = new Date();
            const selectedDate = new Date(this.selectedYear, this.selectedMonth, day);
            const bufferDate = new Date();
            bufferDate.setDate(bufferDate.getDate() + 21); //this is to stop installs being booked next-day etc

            //check if weekend
            if (selectedDate.getDay() == 0 || selectedDate.getDay() == 6) {
                return false;
            }

            //check if date is past, check if month is same, and if date isnt the exact same as a string.
            if (
                selectedDate < currentDate &&
                selectedDate.getMonth() === currentDate.getMonth() &&
                selectedDate.toDateString() !== currentDate.toDateString()
            ) {
                return false;
            }

            //check that the day is not within the buffer period
            if (selectedDate < bufferDate) {
                return false;
            }
        } else {
            const currentDate = new Date();
            const selectedDate = new Date(currentDate.getFullYear(), month, day);
            const bufferDate = new Date();
            bufferDate.setDate(bufferDate.getDate() + 21); //this is to stop installs being booked next-day etc

            //check if weekend
            if (selectedDate.getDay() == 0 || selectedDate.getDay() == 6) {
                return false;
            }

            //check if date is past, check if month is same, and if date isnt the exact same as a string.
            if (
                selectedDate < currentDate &&
                selectedDate.getMonth() === currentDate.getMonth() &&
                selectedDate.toDateString() !== currentDate.toDateString()
            ) {
                return false;
            }

            //check that the day is not within the buffer period
            if (selectedDate < bufferDate) {
                return false;
            }
        }

        return true;
    }

    getNextAvailableDate(): void {
        const date = new Date();

        //cancel operation if the selected month has been chosen.
        if (this.selectedDate != null && date.getMonth() == this.selectedMonth) return;

        //if the date is not available, skip to the next, until it finds a date available.
        while (!this.isDayAvailable(date.getDate(), date.getMonth(), date.getFullYear())) {
            date.setDate(date.getDate() + 1);
        }

        //set the month to one that has a day available.
        this.selectMonth(date.getMonth());
    }

    isDateSelected(day: number): boolean {
        if (!this.selectedDate) return false;
        return new Date(this.selectedYear, this.selectedMonth, day, 13, 0).toDateString() === this.selectedDate.toDateString();
    }

    selectDate(day: number) {
        this.selectedDate = new Date(this.selectedYear, this.selectedMonth, day);
    }

    selectMonth(monthIndex: number) {
        this.selectedMonth = monthIndex;

        const currentDate = new Date();

        const currentMonth = currentDate.getMonth() + 1;

        const monthsAway = (monthIndex + 12 - currentMonth) % 12;

        const futureMonth = currentMonth + 1 + monthsAway;

        var selectedYear = currentDate.getFullYear();

        if (futureMonth > 12 && !(this.selectedMonth == this.currentDate.getMonth())) {
            selectedYear = selectedYear + 1;
        }

        this.selectedYear = selectedYear;
    }

    answerGiven() {
        this.onlineEnquiryService.result.provisionalInstallDate = new Date(this.selectedYear, this.selectedMonth, this.selectedDate.getDate(), 13, 0);
        this.formService.next();
    }

    backButton() {
        this.formService.back();
    }
}
