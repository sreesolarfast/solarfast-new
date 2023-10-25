import { Component, Input, OnInit } from '@angular/core';
import { PackageDto } from '../../dto/package-dto';

@Component({
  selector: 'app-whatsincluded',
  templateUrl: './whatsincluded.component.html',
  styleUrls: ['./whatsincluded.component.scss']
})
export class WhatsincludedComponent implements OnInit {
@Input() package: PackageDto;


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

  ngOnInit(): void {
}


}
