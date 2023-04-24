/**
 * Data class that hold data of one address.
 */
export class Address {
    constructor({ address, messages }, index) {
        var _a, _b, _c;
        this.id = index;
        this.locality = address.municipalityName;
        this.latitude = address.latitude;
        this.longitude = address.longitude;
        this.postalCode = address.postalCode;
        this.province = (_a = address.province) !== null && _a !== void 0 ? _a : "";
        this.streetName = (_b = address.streetName) !== null && _b !== void 0 ? _b : "";
        this.string = address.string;
        this.houseNumber = (_c = address.houseNumber) !== null && _c !== void 0 ? _c : "";
        if (messages != undefined && this.streetName != undefined) {
            this.locality = messages[0].args[0];
            this.string = `${this.streetName} ${this.houseNumber} - ${this.postalCode} ${this.locality}`;
        }
    }
}
//# sourceMappingURL=address.js.map