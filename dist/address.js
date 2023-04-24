export class Address {
    constructor({ address, messages }, index) {
        var _a, _b;
        this.id = index;
        this.locality = address.municipalityName;
        this.latitude = address.latitude;
        this.longitude = address.longitude;
        this.postalCode = address.postalCode;
        this.province = address.province;
        this.streetName = (_a = address.streetName) !== null && _a !== void 0 ? _a : "";
        this.string = address.string;
        this.houseNumber = (_b = address.houseNumber) !== null && _b !== void 0 ? _b : "";
        if (messages != undefined && this.streetName != undefined) {
            this.locality = messages[0].args[0];
            this.string = `${this.streetName} ${this.houseNumber} - ${this.postalCode} ${this.locality}`;
        }
    }
}
//# sourceMappingURL=address.js.map