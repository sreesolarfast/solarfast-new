import { PackageType } from '../enum/package-type';
import { ImageFileDto } from './image-file-dto';
import { PackageProductDto } from './package-product-dto';


export class PackageDto {
  dtoId!: number;
  emi!:string; // sree addeed
  dateCreated!: Date | string;
  dateUpdated!: Date | string | null;
  dateDeleted!: Date | string | null;

  name!: string;
  imageUrl!: string;
  panelDtos!: PackageProductDto[];
  inverterDtos!: PackageProductDto[];
  batteryDtos!: PackageProductDto[];
  productDtos!: PackageProductDto[];
  imageDtos!: ImageFileDto[];

  packageType: PackageType | null;

  systemSize: number | null;

  uplift: number;
  discount: number;
  totalCostPrice!: number;
  totalSalePrice!: number;
  totalQuantity!: number;
  htmlListDescription: string;
}
