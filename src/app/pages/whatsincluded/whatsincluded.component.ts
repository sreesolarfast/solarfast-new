import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-whatsincluded',
  templateUrl: './whatsincluded.component.html',
  styleUrls: ['./whatsincluded.component.scss']
})
export class WhatsincludedComponent {

  details: any[] = [
    {
      image: './assets/package/what-include.webp',
      title: '10x Longi Full Black Solar Panels 425W',
      subtitle: 'Your 25 year manufacturer guarantee will be activated automatically'
    },
    {
      image: './assets/package/what-include.webp',
      title: '10x Longi Full Black Solar Panels 425W',
      subtitle: 'Your 25 year manufacturer guarantee will be activated automatically'
    },
    {
      image: './assets/package/what-include.webp',
      title: '10x Longi Full Black Solar Panels 425W',
      subtitle: 'Your 25 year manufacturer guarantee will be activated automatically'
    },
    {
      image: './assets/package/what-include.webp',
      title: '10x Longi Full Black Solar Panels 425W',
      subtitle: 'Your 25 year manufacturer guarantee will be activated automatically'
    },
    {
      image: './assets/package/what-include.webp',
      title: '10x Longi Full Black Solar Panels 425W',
      subtitle: 'Your 25 year manufacturer guarantee will be activated automatically'
    },
    {
      image: './assets/package/what-include.webp',
      title: '10x Longi Full Black Solar Panels 425W',
      subtitle: 'Your 25 year manufacturer guarantee will be activated automatically'
    }
  ];

  public notincludeds: any[] = [
    {
      list: 'Repairs to pre-existing electrical faults or non-conformities'
    },
    {
      list: 'Removal of hazardous materials or products'
    },
    {
      list: 'Planning permission applications within conservation areas'
    }
  ];

  isOpen = false;

  toggleSidenav() {
    this.isOpen = !this.isOpen;
  }
}
