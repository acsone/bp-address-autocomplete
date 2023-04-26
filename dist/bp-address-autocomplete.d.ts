/// <reference types="node" />
import { LitElement } from 'lit';
import { Ref } from 'lit/directives/ref.js';
export declare class BpAddressAutocomplete extends LitElement {
    static styles: import("lit").CSSResult[];
    inputRef: Ref<HTMLInputElement>;
    /**
     * Our internal states.
     */
    suggestions: never[];
    count: number;
    timeoutId: string | number | NodeJS.Timeout | undefined;
    /**
     * Properties that are passed in props.
     */
    timeout: number;
    street: string;
    houseNumber: string;
    locality: string;
    postalCode: string;
    latitude: string;
    longitude: string;
    province: string;
    boxNumber: string;
    /**
     * This method reacts on click on an address suggestion. There are two possibilities to autocomplete the address :
     * 1. Is to directly modify the value of the inputs passed in props using the functions below.
     * 2. An event is sent and we you react to it in the parent component (in your favorite framework).
     * @param ev
     */
    private _onClick;
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
    private _autoComplete;
    /**
     * This method retrieves fields closest to the current element.
     * @returns fields to be autocompleted.
     */
    private _getInputs;
    /**
     * This method returns the element closest to the current element by its id.
     * @param currentElement
     * @param id
     * @returns
     */
    private _nearest;
    /**
     * This method reacts to changes in the address. It will send the request to the API with the specified changes.
     * Request are sent with a delay that can be modified in props to avoid sending request at each change.
     */
    private _changeAddress;
    private _sendRequest;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'bp-address-autocomplete': BpAddressAutocomplete;
    }
}
//# sourceMappingURL=bp-address-autocomplete.d.ts.map