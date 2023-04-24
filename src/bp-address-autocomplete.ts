import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { Address } from './address';
import {createRef, Ref, ref} from 'lit/directives/ref.js';

@customElement('bp-address-autocomplete')
export class BpAddressAutocomplete extends LitElement {

  static override styles = [css`.address{cursor: pointer}`];

  inputRef: Ref<HTMLInputElement> = createRef();
  
  /**
   * Our internal states.
   */
  @state()
  suggestions = [];

  @state()
  count = 0;

  @state()
  timeoutId: string | number | NodeJS.Timeout | undefined

  /**
   * Properties that are passed in props. 
   */
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

  @property({ type: String })
  province = "";

  /**
   * This method reacts on click on an address suggestion. There are two possibilities to autocomplete the address : 
   * 1. Is to directly modify the value of the inputs passed in props using the functions below.
   * 2. An event is sent and we you react to it in the parent component (in your favorite framework).
   * @param ev 
   */
  private _onClick(ev: { target: { id: string | number; }; }) {
    const item: Address = this.suggestions.find((el: Address) => el.id === +ev.target.id)!;
    const { inputStreet, inputHouseNumber, inputLocality, inputPostalCode, inputLatitude, inputLongitude, inputProvince} = this._getInputs();
    if (item != undefined) {
      this._autoComplete(item, inputStreet, inputHouseNumber, inputLocality, inputPostalCode, inputLatitude, inputLongitude, inputProvince);
      this.inputRef.value!.value = "";
      this.suggestions = []
    }
    const itemClick = new CustomEvent("onSelectedAddress", { detail: item });
    this.dispatchEvent(itemClick)
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
  private _autoComplete(item: Address, inputStreet: HTMLInputElement, inputHouseNumber: HTMLInputElement , inputLocality: HTMLInputElement, inputPostalCode: HTMLInputElement, inputLatitude: HTMLInputElement, inputLongitude: HTMLInputElement, inputProvince: HTMLInputElement) {
    inputStreet != null ? inputStreet.value = item.streetName : "";
    inputHouseNumber != null ? inputHouseNumber.value = item.houseNumber: "";
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
  private _getInputs() {
    const inputStreet = this._nearest(this, this.street);
    const inputHouseNumber = this._nearest(this, this.houseNumber);
    const inputLocality = this._nearest(this, this.locality);
    const inputPostalCode = this._nearest(this, this.postalCode);
    const inputLatitude = this._nearest(this, this.latitude);
    const inputLongitude = this._nearest(this, this.longitude);
    const inputProvince = this._nearest(this, this.province);
    return { inputStreet, inputLocality, inputPostalCode, inputLatitude, inputLongitude, inputHouseNumber, inputProvince};
  }

  /**
   * This method returns the element closest to the current element by its id. 
   * @param currentElement 
   * @param id 
   * @returns 
   */
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

  /**
   * This method reacts to changes in the address. It will send the request to the API with the specified changes.
   * Request are sent with a delay that can be modified in props to avoid sending request at each change. 
   */
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
        this.suggestions = []
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