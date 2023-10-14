import { PackageDto } from './package-dto';

export class PackageProductDto {
  dtoId!: number;
  dateCreated!: Date | string;
  dateUpdated!: Date | string | null;
  dateDeleted!: Date | string | null;

  packageId!: number;
  packageDto!: PackageDto;

  productId!: number;

  costPrice!: number;
  salePrice!: number;
  quantity!: number;
}
