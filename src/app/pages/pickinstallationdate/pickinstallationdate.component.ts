import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pickinstallationdate',
  templateUrl: './pickinstallationdate.component.html',
  styleUrls: ['./pickinstallationdate.component.scss']
})
export class PickinstallationdateComponent {
  selectedYear: number = new Date().getFullYear();
  selectedMonth: number = new Date().getMonth();
  selectedDate: Date | null = null;
  selectedButtons: Set<string> = new Set<string>();
  currentDate: Date = new Date();

  years: number[] = [2023, 2024, 2025]; // Customize with your desired years
  months: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
constructor (private router:Router){

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
}
