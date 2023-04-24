export class Address{
    id: Number;
    locality: string;
    latitude: Number;
    longitude: Number;
    postalCode: string;
    province: string;
    streetName: string;
    string: string;
    houseNumber: string;
    constructor({address, messages}: any, index: any){
        this.id = index;
        this.locality = address.municipalityName;
        this.latitude = address.latitude;
        this.longitude = address.longitude;
        this.postalCode = address.postalCode;
        this.province = address.province;
        this.streetName = address.streetName ?? "";
        this.string = address.string;
        this.houseNumber = address.houseNumber ?? "";
        if(messages != undefined && this.streetName != undefined){
            this.locality = messages[0].args[0];
            this.string = `${this.streetName} ${this.houseNumber} - ${this.postalCode} ${this.locality}`
        } 
    }
}