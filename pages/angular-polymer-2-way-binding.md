# Polymer inside Angular 2-way binding
Currently we are working on an older AngularJS 1.5 application and we are looking to upgrade slowly to Polymer.
Therefore I researched the possibility to use Polymer components inside AngularJS.

This blog is about making 2-way binding work between Angular and Polymer.

The goal is to have a Polymer component with an input field which has a 2-way binding via the ngModel
with the parent controller.

##### The Polymer component
```javascript
import {LitElement, html} from 'https://unpkg.com/@polymer/lit-element@latest/lit-element.js?module';

class SimpleInput extends LitElement {

    static get properties() {
        return {'class': String}
    }

    // Render the Polymer component
    _render(props) {
        return html`<input class$="${props.class}" oninput="${(e) => this._changeHandler(e)}"/>`;
    }
    
    _changeHandler(e) {
        this.dispatchEvent(new CustomEvent('change', {detail: e.target.value}));
    }
}
```

> Note that any input change in the `<input>` field will result in a dispatched event of the type CustomEvent.
It contains a detail payload which contains the new field value.

##### Angular directive to bind CustomEvent to ngModel
We need this angular component/directive to enable listening on the CustomEvent from Polymer.
```javascript
angular.module('myApp').directive('ngModelBinder', function () {
    return {
        restrict: 'A',
        link: function (scope, element) {
            var controller = element.controller('ngModel');

            element.on('change', function (e) {
                controller.$setViewValue(e.originalEvent.detail);
            });
        }
    };
});
```

##### HTML
Now when we have a regular Angular controller with a form, we can use our Polymer component.
```html
<simple-input data-ng-model="form.fieldname" data-ng-model-binder></simple-input>
```

## Additional information
To get this example to work, you also need to register the simple-input custom tag. I used the following
include from the webcomponents module to achieve this:

```html
<script src="../node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js"></script>
```

```javascript
customElements.define('simple-input', SimpleInput);
```