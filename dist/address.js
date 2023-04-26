/**
 * Data class that hold data of one address.
 */
export class Address {
    constructor({ address, messages }, index) {
        var _a;
        this.id = index;
        this.locality = address.municipalityName;
        this.latitude = address.latitude;
        this.longitude = address.longitude;
        this.postalCode = address.postalCode;
        this.province = address.province;
        this.streetName = address.streetName;
        this.string = address.string;
        this.houseNumber = address.houseNumber;
        this.boxNumber = address.boxNumber;
        if (messages != undefined && this.streetName != undefined) {
            this.locality = messages[0].args[0];
            this.string = `${this.streetName} ${(_a = this.houseNumber) !== null && _a !== void 0 ? _a : ""} - ${this.postalCode} ${this.locality}`;
        }
    }
    get formatBoxNumber() {
        return this.boxNumber !== undefined ? `Bte ${this.boxNumber}` : "";
    }
    get formatHouseNumber() {
        return this.houseNumber !== undefined ? this.houseNumber : "";
    }
    get formatStreetName() {
        return this.streetName !== undefined ? this.streetName : "";
    }
    get formatProvince() {
        return this.province !== undefined ? this.province : "";
    }
}
//# sourceMappingURL=address.js.map