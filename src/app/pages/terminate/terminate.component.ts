import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-terminate',
  templateUrl: './terminate.component.html',
  styleUrls: ['./terminate.component.scss']
})
export class TerminateComponent implements OnInit {


  constructor(
    public router: Router,
  ) { }

  ngOnInit() {

  }


  backButton(){
    this.router.navigate(['/solar']);
  }



}
