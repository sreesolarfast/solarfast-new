export class ImageFileDto {
  dtoId!: number;
  dateCreated!: Date | string;
  dateUpdated!: Date | string | null;
  dateDeleted!: Date | string | null;

  index!: number;
  label!: string;
  fileName!: string;
  fileExtension!: string;
  mimeType!: string;
  dataFileUrl!: string;
  version!: number;
  validFrom!: Date | string | null;
  validTo!: Date | string | null;
  quantity!: number | null;
  orderId!: number | null;
  journeyId!: number | null;
  userId!: string;

  journeyProductId!: number | null;

  data!: string;
}
