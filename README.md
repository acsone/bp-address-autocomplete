# Bpost Address Autocomplete

This component helps Belgian users to encode their addresses correctly. When user encodes an address in the component, it returns a list of suggested addresses
that he can select. When he selects an address, the component will send an event to the parent component so it can autocomplete fields. The component also
allows you to autocomplete fields if you pass the id of these fields. The component will return the field closest to it.\
Example : 
```html
<bp-address-autocomplete timeout=100 street="id-street" houseNumber="id-houseNumber" locality="id-locality"
    postalCode="id-postal-code" latitude="id-latitude" longitude="id-longitude" province="id-province" />
```

## Setup

Install dependencies:

```bash
npm i
```

## Build

This sample uses the TypeScript compiler to produce JavaScript that runs in modern browsers.

To build the JavaScript version of your component:

```bash
npm run build
```

To watch files and rebuild when the files are modified, run the following command in a separate shell:

```bash
npm run build:watch
```

Both the TypeScript compiler and lit-analyzer are configured to be very strict. You may want to change `tsconfig.json` to make them less strict.

## Dev Server

This sample uses modern-web.dev's [@web/dev-server](https://www.npmjs.com/package/@web/dev-server) for previewing the project without additional build steps. Web Dev Server handles resolving Node-style "bare" import specifiers, which aren't supported in browsers. It also automatically transpiles JavaScript and adds polyfills to support older browsers. See [modern-web.dev's Web Dev Server documentation](https://modern-web.dev/docs/dev-server/overview/) for more information.

To run the dev server and open the project in a new browser tab:

```bash
npm run serve
```

There is a development HTML file located at `/dev/index.html` that you can view at http://localhost:8000/dev/index.html. Note that this command will serve your code using Lit's development mode (with more verbose errors). To serve your code against Lit's production mode, use `npm run serve:prod`.

## Editing

If you use VS Code, we highly recommend the [lit-plugin extension](https://marketplace.visualstudio.com/items?itemName=runem.lit-plugin), which enables some extremely useful features for lit-html templates:

- Syntax highlighting
- Type-checking
- Code completion
- Hover-over docs
- Jump to definition
- Linting
- Quick Fixes

The project is setup to recommend lit-plugin to VS Code users if they don't already have it installed.

## Styling

Component here is not stylized, you can do it according to your needs. Here we use [css ::part()](https://developer.mozilla.org/en-US/docs/Web/CSS/::part).
If you want to add some css to search bar, you can use ::part(search-bar).\
Example : 
```scss
bp-address-autocomplete::part(search-bar) {
    @extend .form-control;
    padding-right: 0;
    padding-left: 1rem;
    width: 100%;
}
```
If you want to add some css to ```<ul>``` container, you can use ::part(ul-suggestions).\
Example :
```scss
bp-address-autocomplete::part(ul-suggestions) {
    @extend .list-group;
    margin-top: 0;
}
```
Finally, If you want to add some css to ```<li>``` elements, you can use ::part(li-suggestion)
.\
Example : 
```scss
bp-address-autocomplete::part(li-suggestion) {
    @extend .list-group-item;
    width: 100%;
    padding-right: 0;
}
```
Because we are in scss, it is possible to extend class, this is the case here with bootstrap class. 

## Linting

Linting of TypeScript files is provided by [ESLint](eslint.org) and [TypeScript ESLint](https://github.com/typescript-eslint/typescript-eslint). In addition, [lit-analyzer](https://www.npmjs.com/package/lit-analyzer) is used to type-check and lint lit-html templates with the same engine and rules as lit-plugin.

The rules are mostly the recommended rules from each project, but some have been turned off to make LitElement usage easier. The recommended rules are pretty strict, so you may want to relax them by editing `.eslintrc.json` and `tsconfig.json`.

To lint the project run:

```bash
npm run lint
```

## Formatting

[Prettier](https://prettier.io/) is used for code formatting. It has been pre-configured according to the Lit's style. You can change this in `.prettierrc.json`.

Prettier has not been configured to run when committing files, but this can be added with Husky and `pretty-quick`. See the [prettier.io](https://prettier.io/) site for instructions.

## Bundling and minification

Here we use [rollup.js](https://rollupjs.org/).

Just after run :

```bash
npm run build
```
run 
```bash
rollup -c
```
A file with the name <em>bp-address-autocomplete.bundled.js</em> should appear. Just take this file and integrate it anywhere.

## Author
* Samuel Kouff <<s.kouff@student.helmo.be>>