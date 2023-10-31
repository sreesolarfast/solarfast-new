import { IGetAddressValue } from './get-address-value';

export interface IAddress {
    houseNameOrNumber: string;
    addressLine1: string;
    addressLine2: string;
    addressLine3: string;
    city: string;
    postcode: string;
    latitude: string;
    longitude: string;
    addresses: IGetAddressValue[];
}
