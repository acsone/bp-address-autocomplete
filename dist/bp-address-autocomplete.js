var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Address } from './address';
import { createRef, ref } from 'lit/directives/ref.js';
let BpAddressAutocomplete = class BpAddressAutocomplete extends LitElement {
    constructor() {
        super(...arguments);
        this.inputRef = createRef();
        this.suggestions = [];
        this.count = 0;
        this.timeout = 200;
        this.street = "";
        this.houseNumber = "";
        this.locality = "";
        this.postalCode = "";
        this.latitude = "";
        this.longitude = "";
    }
    _onClick(ev) {
        let item = this.suggestions.find((el) => el.id === +ev.target.id);
        let { inputStreet, inputHouseNumber, inputLocality, inputPostalCode, inputLatitude, inputLongitude } = this._getInputs();
        if (item != undefined) {
            this._autoComplete(item, inputStreet, inputHouseNumber, inputLocality, inputPostalCode, inputLatitude, inputLongitude);
            let searchBar = this.inputRef.value;
            searchBar.value = "";
            this.suggestions = [];
        }
        let itemClick = new CustomEvent("onSelectedAddress", { detail: item });
        this.dispatchEvent(itemClick);
    }
    _autoComplete(item, inputStreet, inputHouseNumber, inputLocality, inputPostalCode, inputLatitude, inputLongitude) {
        inputStreet != null ? inputStreet.value = item.streetName : "";
        inputHouseNumber != null ? inputHouseNumber.value = item.houseNumber : "";
        inputLocality != null ? inputLocality.value = item.locality : "";
        inputPostalCode != null ? inputPostalCode.value = item.postalCode : "";
        inputLatitude != null ? inputLatitude.value = item.latitude.toString() : "";
        inputLongitude != null ? inputLongitude.value = item.longitude.toString() : "";
    }
    _getInputs() {
        let inputStreet = this._nearest(this, this.street);
        let inputHouseNumber = this._nearest(this, this.houseNumber);
        let inputLocality = this._nearest(this, this.locality);
        let inputPostalCode = this._nearest(this, this.postalCode);
        let inputLatitude = this._nearest(this, this.latitude);
        let inputLongitude = this._nearest(this, this.longitude);
        return { inputStreet, inputLocality, inputPostalCode, inputLatitude, inputLongitude, inputHouseNumber };
    }
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
    property({ type: (Array) })
], BpAddressAutocomplete.prototype, "suggestions", void 0);
__decorate([
    property({ type: Number })
], BpAddressAutocomplete.prototype, "count", void 0);
__decorate([
    property()
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
BpAddressAutocomplete = __decorate([
    customElement('bp-address-autocomplete')
], BpAddressAutocomplete);
export { BpAddressAutocomplete };
//# sourceMappingURL=bp-address-autocomplete.js.map