var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { Address } from './address';
import { createRef, ref } from 'lit/directives/ref.js';
let BpAddressAutocomplete = class BpAddressAutocomplete extends LitElement {
    constructor() {
        super(...arguments);
        this.inputRef = createRef();
        /**
         * Our internal states.
         */
        this.suggestions = [];
        this.count = 0;
        /**
         * Properties that are passed in props.
         */
        this.timeout = 200;
        this.street = "";
        this.houseNumber = "";
        this.locality = "";
        this.postalCode = "";
        this.latitude = "";
        this.longitude = "";
        this.province = "";
    }
    /**
     * This method reacts on click on an address suggestion. There are two possibilities to autocomplete the address :
     * 1. Is to directly modify the value of the inputs passed in props using the functions below.
     * 2. An event is sent and we you react to it in the parent component (in your favorite framework).
     * @param ev
     */
    _onClick(ev) {
        const item = this.suggestions.find((el) => el.id === +ev.target.id);
        const { inputStreet, inputHouseNumber, inputLocality, inputPostalCode, inputLatitude, inputLongitude, inputProvince } = this._getInputs();
        if (item != undefined) {
            this._autoComplete(item, inputStreet, inputHouseNumber, inputLocality, inputPostalCode, inputLatitude, inputLongitude, inputProvince);
            this.inputRef.value.value = "";
            this.suggestions = [];
        }
        const itemClick = new CustomEvent("onSelectedAddress", { detail: item });
        this.dispatchEvent(itemClick);
    }
    /**
     * This method allows you to autocomplete the different fields.
     * @param item
     * @param inputStreet
     * @param inputHouseNumber
     * @param inputLocality
     * @param inputPostalCode
     * @param inputLatitude
     * @param inputLongitude
     * @param inputProvince
     */
    _autoComplete(item, inputStreet, inputHouseNumber, inputLocality, inputPostalCode, inputLatitude, inputLongitude, inputProvince) {
        inputStreet != null ? inputStreet.value = item.streetName : "";
        inputHouseNumber != null ? inputHouseNumber.value = item.houseNumber : "";
        inputLocality != null ? inputLocality.value = item.locality : "";
        inputPostalCode != null ? inputPostalCode.value = item.postalCode : "";
        inputLatitude != null ? inputLatitude.value = item.latitude.toString() : "";
        inputLongitude != null ? inputLongitude.value = item.longitude.toString() : "";
        inputProvince != null ? inputProvince.value = item.province : "";
    }
    /**
     * This method retrieves fields closest to the current element.
     * @returns fields to be autocompleted.
     */
    _getInputs() {
        const inputStreet = this._nearest(this, this.street);
        const inputHouseNumber = this._nearest(this, this.houseNumber);
        const inputLocality = this._nearest(this, this.locality);
        const inputPostalCode = this._nearest(this, this.postalCode);
        const inputLatitude = this._nearest(this, this.latitude);
        const inputLongitude = this._nearest(this, this.longitude);
        const inputProvince = this._nearest(this, this.province);
        return { inputStreet, inputLocality, inputPostalCode, inputLatitude, inputLongitude, inputHouseNumber, inputProvince };
    }
    /**
     * This method returns the element closest to the current element by its id.
     * @param currentElement
     * @param id
     * @returns
     */
    _nearest(currentElement, id) {
        const elements = document.querySelectorAll(`[id="${id}"]`);
        let minDistance = -1;
        let closestElement = null;
        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];
            const distance = Math.abs(currentElement.compareDocumentPosition(element));
            if (distance > minDistance) {
                minDistance = distance;
                closestElement = element;
            }
        }
        return closestElement;
    }
    /**
     * This method reacts to changes in the address. It will send the request to the API with the specified changes.
     * Request are sent with a delay that can be modified in props to avoid sending request at each change.
     */
    async _changeAddress(event) {
        const input = event.target;
        clearTimeout(this.timeoutId);
        this.timeoutId = setTimeout(async () => {
            await this._sendRequest(input);
        }, this.timeout);
    }
    async _sendRequest(input) {
        this.count++;
        await fetch(`https://webservices-pub.bpost.be/ws/ExternalMailingAddressProofingCSREST_v1/address/autocomplete?id=${this.count}&q=${input.value}`, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
        }).then(response => {
            if (!response.ok) {
                this.suggestions = [];
                throw new Error("Network response was not OK");
            }
            return response.json();
        }).then(value => {
            this.suggestions = value.response.topSuggestions != null ? value.response.topSuggestions.map((item, index) => new Address(item, index)) : [];
        }).catch(() => {
            this.suggestions = [];
        });
    }
    render() {
        return html `
      <div>
        <input ${ref(this.inputRef)} @input=${this._changeAddress} type="text" part="search-bar" placeholder="Street, city or postcode" />
        <ul part="ul-suggestions">
          ${this.suggestions.map((item) => html `<li id=${item.id} part="li-suggestion" class="address" @click=${this._onClick}>${item.string}</li>`)}
        </ul>
      </div>
      `;
    }
};
BpAddressAutocomplete.styles = [css `.address{cursor: pointer}`];
__decorate([
    state()
], BpAddressAutocomplete.prototype, "suggestions", void 0);
__decorate([
    state()
], BpAddressAutocomplete.prototype, "count", void 0);
__decorate([
    state()
], BpAddressAutocomplete.prototype, "timeoutId", void 0);
__decorate([
    property({ type: Number })
], BpAddressAutocomplete.prototype, "timeout", void 0);
__decorate([
    property({ type: String })
], BpAddressAutocomplete.prototype, "street", void 0);
__decorate([
    property({ type: String })
], BpAddressAutocomplete.prototype, "houseNumber", void 0);
__decorate([
    property({ type: String })
], BpAddressAutocomplete.prototype, "locality", void 0);
__decorate([
    property({ type: String })
], BpAddressAutocomplete.prototype, "postalCode", void 0);
__decorate([
    property({ type: String })
], BpAddressAutocomplete.prototype, "latitude", void 0);
__decorate([
    property({ type: String })
], BpAddressAutocomplete.prototype, "longitude", void 0);
__decorate([
    property({ type: String })
], BpAddressAutocomplete.prototype, "province", void 0);
BpAddressAutocomplete = __decorate([
    customElement('bp-address-autocomplete')
], BpAddressAutocomplete);
export { BpAddressAutocomplete };
//# sourceMappingURL=bp-address-autocomplete.js.map