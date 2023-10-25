import { PropertyOwnership } from '../enum/property-ownership.enum';
import { PropertyType } from '../enum/property-type.enum';
import { RoofType } from '../enum/roof-type.enum';
import { Title } from '../enum/title.enum';
import { ImageFileDto } from './image-file-dto';
import { PackageDto } from './package-dto';

export class OnlineEnquiryDto {
    dtoId!: number;
    dateCreated!: Date | string;
    dateUpdated!: Date | string | null;
    dateDeleted!: Date | string | null;

    uniqueReference!: string;
    houseNameOrNumber!: string;
    addressLine1!: string;
    addressLine2!: string;
    addressLine3!: string;
    city!: string;
    postcode!: string;
    latitude!: string;
    longitude!: string;
    title!: Title;
    firstName!: string;
    middleName!: string;
    lastName!: string;
    phoneNumber!: string;
    email!: string;

    // questions
    propertyOwnership!: PropertyOwnership | null;
    propertyType!: PropertyType | null;
    roofType!: RoofType | null;
    shading!: boolean | null;
    annualConsumption!: number | null;
    unitRate!: number | null;
    dayRate!: number | null;
    nightRate!: number | null;

    provisionalInstallDate!: Date | string | null;
    dateCompleted!: Date | string | null;
    preferredContactTime!: Date | string | null;
    initialEnquriyDate!: Date | string | null;
    dateLastQuoted: Date | string | null;

    selectedPackageId!: number | null;
    selectedPackage!: PackageDto;

    images!: ImageFileDto[];
    packageOptions!: PackageDto[];

    companyId: number | null;
    repId: string;
    sendQuote: boolean;
    subscribe: boolean | null;
    reason: string;
}
