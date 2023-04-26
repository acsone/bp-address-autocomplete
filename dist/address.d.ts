/**
 * Data class that hold data of one address.
 */
export declare class Address {
    id: Number;
    locality: string;
    latitude: Number;
    longitude: Number;
    postalCode: string;
    province: string;
    streetName: string;
    string: string;
    houseNumber: string;
    boxNumber: string;
    constructor({ address, messages }: any, index: Number);
    get formatBoxNumber(): string;
    get formatHouseNumber(): string;
    get formatStreetName(): string;
    get formatProvince(): string;
}
//# sourceMappingURL=address.d.ts.map