import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Address } from './address';
import {createRef, Ref, ref} from 'lit/directives/ref.js';

@customElement('bp-address-autocomplete')
export class BpAddressAutocomplete extends LitElement {

  static override styles = [css`.address{cursor: pointer}`];

  inputRef: Ref<HTMLInputElement> = createRef();
  
  @property({ type: Array<Address> })
  suggestions = [];

  @property({ type: Number })
  count = 0;

  @property()
  timeoutId: string | number | NodeJS.Timeout | undefined

  @property({ type: Number })
  timeout = 200;

  @property({ type: String })
  street = "";

  @property({ type: String })
  houseNumber = "";

  @property({ type: String })
  locality = "";

  @property({ type: String })
  postalCode = "";

  @property({ type: String })
  latitude = "";

  @property({ type: String })
  longitude = "";

  private _onClick(ev: { target: { id: string | number; }; }) {
    let item: Address = this.suggestions.find((el: Address) => el.id === +ev.target.id)!;
    let { inputStreet, inputHouseNumber, inputLocality, inputPostalCode, inputLatitude, inputLongitude } = this._getInputs();
    if (item != undefined) {
      this._autoComplete(item, inputStreet, inputHouseNumber, inputLocality, inputPostalCode, inputLatitude, inputLongitude);
      let searchBar = this.inputRef.value!;
      searchBar.value = "";
      this.suggestions = []
    }
    let itemClick = new CustomEvent("onSelectedAddress", { detail: item });
    this.dispatchEvent(itemClick)
  }

  private _autoComplete(item: Address, inputStreet: HTMLInputElement, inputHouseNumber: HTMLInputElement , inputLocality: HTMLInputElement, inputPostalCode: HTMLInputElement, inputLatitude: HTMLInputElement, inputLongitude: HTMLInputElement) {
    inputStreet != null ? inputStreet.value = item.streetName : "";
    inputHouseNumber != null ? inputHouseNumber.value = item.houseNumber: "";
    inputLocality != null ? inputLocality.value = item.locality : "";
    inputPostalCode != null ? inputPostalCode.value = item.postalCode : "";
    inputLatitude != null ? inputLatitude.value = item.latitude.toString() : "";
    inputLongitude != null ? inputLongitude.value = item.longitude.toString() : "";
  }

  private _getInputs() {
    let inputStreet = this._nearest(this, this.street);
    let inputHouseNumber = this._nearest(this, this.houseNumber);
    let inputLocality = this._nearest(this, this.locality);
    let inputPostalCode = this._nearest(this, this.postalCode);
    let inputLatitude = this._nearest(this, this.latitude);
    let inputLongitude = this._nearest(this, this.longitude);
    return { inputStreet, inputLocality, inputPostalCode, inputLatitude, inputLongitude, inputHouseNumber};
  }

  private _nearest(currentElement: Element, id: String) {
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
  
    return <HTMLInputElement>closestElement;
  }

  private async _changeAddress(event: { target: any; }) {
    const input = event.target;
    clearTimeout(this.timeoutId)
    this.timeoutId = setTimeout(async () => {
      await this._sendRequest(input);
    }, this.timeout)
  }

  private async _sendRequest(input: { value: any; }) {
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
      this.suggestions = value.response.topSuggestions != null ? value.response.topSuggestions.map((item: any, index: Number) => new Address(item, index)) : []
    }).catch(() => {
      this.suggestions = []
    });
  }

  override render() {
    return html`
      <div>
        <input ${ref(this.inputRef)} @input=${this._changeAddress} type="text" part="search-bar" placeholder="Street, city or postcode" />
        <ul part="ul-suggestions">
          ${this.suggestions.map((item: Address) => html`<li id=${item.id} part="li-suggestion" class="address" @click=${this._onClick}>${item.string}</li>`)}
        </ul>
      </div>
      `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bp-address-autocomplete': BpAddressAutocomplete;
  }
}