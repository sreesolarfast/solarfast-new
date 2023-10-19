import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-whatincluded',
  templateUrl: './whatincluded.component.html',
  styleUrls: ['./whatincluded.component.scss']
})
export class WhatincludedComponent implements OnInit {

  details: any[] = [
    {
      image: './assets/images/detail-1.png',
      text: 'Detail 1'
    },
    {
      image: './assets/images/detail-2.png',
      text: 'Detail 2'
    },
    {
      image: './assets/images/detail-3.png',
      text: 'Detail 3'
    }
  ];

  constructor() { }

  ngOnInit() { }

}
