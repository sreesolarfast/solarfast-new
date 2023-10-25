import { Component, Input, OnInit } from '@angular/core';
import { PackageProductDto } from '../../dto/package-product-dto';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-whats-included-product',
  templateUrl: './whats-included-product.component.html',
  styleUrls: ['./whats-included-product.component.scss']
})
export class WhatsIncludedProductComponent implements OnInit {
@Input() product: PackageProductDto;
public environment = environment;
  constructor() { }

  ngOnInit() {
  }

}
