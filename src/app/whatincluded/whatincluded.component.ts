import { Component } from '@angular/core';

@Component({
  selector: 'app-whatincluded',
  templateUrl: './whatincluded.component.html',
  styleUrls: ['./whatincluded.component.scss']
})
export class WhatincludedComponent {

  details: any[] = [
    {
      image: './assets/images/detail-1.png',
      title: '10x Longi Full Black Solar Panels 425W',
      subtitle: 'Your 25 year manufacturer guarantee will be activated automatically'
    },
    {
      image: './assets/images/detail-2.png',
      title: '10x Longi Full Black Solar Panels 425W',
      subtitle: 'Your 25 year manufacturer guarantee will be activated automatically'
    },
    {
      image: './assets/images/detail-3.png',
      title: '10x Longi Full Black Solar Panels 425W',
      subtitle: 'Your 25 year manufacturer guarantee will be activated automatically'
    }
  ];

  notincludeds: any[] = [
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

  constructor() { }

  ngOnInit() { }

}
