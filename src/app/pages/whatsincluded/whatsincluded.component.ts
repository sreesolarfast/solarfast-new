import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-whatsincluded',
  templateUrl: './whatsincluded.component.html',
  styleUrls: ['./whatsincluded.component.scss']
})
export class WhatsincludedComponent {
  isOpen = false;

  toggleSidenav() {
    this.isOpen = !this.isOpen;
  }
}
