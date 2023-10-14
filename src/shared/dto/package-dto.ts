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
  batterieDtos!: PackageProductDto[];
  productDtos!: PackageProductDto[];

  totalCostPrice!: number;
  totalSalePrice!: number;
  totalQuantity!: number;
}
