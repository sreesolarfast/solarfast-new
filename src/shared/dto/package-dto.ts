import { PackageProductDto } from './package-product-dto';

export class PackageDto {
  dtoId!: number;
  dateCreated!: Date | string;
  dateUpdated!: Date | string | null;
  dateDeleted!: Date | string | null;

  name!: string;
  imageUrl!: string;
  panelDtos!: PackageProductDto[];
  inverterDtos!: PackageProductDto[];
  batteryDtos!: PackageProductDto[];
  productDtos!: PackageProductDto[];

  uplift: number;
  discount: number;
  totalCostPrice!: number;
  totalSalePrice!: number;
  totalQuantity!: number;
}
