## Unique years
Get a list of unique years from a list of objects that contain a date.

```
var list = [{
  date: '20160520'
}, {
  date: '20160520'
}, {
  date: '20190520'
}, {
  date: '20140520'
}];

function getUniqueYears(list, field) {
  return list
    .map(elm => elm[field].substring(0,4))
    .filter((el, i, arr) => arr.indexOf(el) === i)
    .sort()
    .reverse();
};

console.log(getUniqueYears(list, 'date'));
```