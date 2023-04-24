/// <reference types="node" />
import { LitElement } from 'lit';
import { Ref } from 'lit/directives/ref.js';
export declare class BpAddressAutocomplete extends LitElement {
    static styles: import("lit").CSSResult[];
    inputRef: Ref<HTMLInputElement>;
    suggestions: never[];
    count: number;
    timeoutId: string | number | NodeJS.Timeout | undefined;
    timeout: number;
    street: string;
    houseNumber: string;
    locality: string;
    postalCode: string;
    latitude: string;
    longitude: string;
    private _onClick;
    private _autoComplete;
    private _getInputs;
    private _nearest;
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