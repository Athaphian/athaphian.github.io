# Property watcher
Create a method that can let you watch a property on a given object and calls a callback when that property is changed.
```javascript
// Watch a property on a given object for changes
const watch = (obj, propertyName, callback) => {
    const oldValue = obj[propertyName];
    Object.defineProperty(obj, propertyName, {
        set(value) {
            this[`_${propertyName}`] = value;
            callback(value);
        },
        get() {
            return this[`_${propertyName}`];
        },
    });
    obj[propertyName] = oldValue;
};
```
