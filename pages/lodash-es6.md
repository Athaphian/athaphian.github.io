# Lodash to ES6
Guide for replacing Lodash with native ES6 functions.

- [_.filter](#filter)
- [_.map](#map)
- [_.isNaN](#isnan)
- [_.pick](#pick)
- [_.omit](#omit)
- [_.min](#min)
- [_.max](#max)

## filter
```javascript
var users = [
  { 'user': 'barney', 'age': 36, 'active': true },
  { 'user': 'fred',   'age': 40, 'active': false }
];
 
_.filter(users, function(o) { return !o.active; });
// => objects for ['fred']
 
_.filter(users, { 'age': 36, 'active': true });
// => objects for ['barney']
 
_.filter(users, ['active', false]);
// => objects for ['fred']
 
_.filter(users, 'active');
// => objects for ['barney']
```

### ES6
```javascript
users.filter(u => !u.active);
// => objects for ['fred']
 
users.filter(u => u.age === 36 && u.active);
// => objects for ['barney']
 
users.filter(u => !u.active);
// => objects for ['fred']
 
users.filter(u => u.active);
// => objects for ['barney']

```

## map
```javascript
function square(n) {
  return n * n;
}

_.map([4, 8], square);
// => [16, 64]
 
_.map({ 'a': 4, 'b': 8 }, square);
// => [16, 64] (iteration order is not guaranteed)
 
var users = [
  { 'user': 'barney' },
  { 'user': 'fred' }
];
 
_.map(users, 'user');
// => ['barney', 'fred']
```

### ES6
```javascript
[4, 8].map(i => square(i));
// => [16, 64]
 
Object.values({ 'a': 4, 'b': 8 }).map(v => square(v));
// => [16, 64]
 
var users = [
  { 'user': 'barney' },
  { 'user': 'fred' }
];
 
users.map(u => u.user);
// => ['barney', 'fred']
```

## isNaN
```javascript
_.isNaN(NaN);
// => true
 
_.isNaN(new Number(NaN));
// => true

_.isNaN(undefined);
// => false
```

### ES6
```javascript
isNaN(NaN);
// => true
 
isNaN(new Number(NaN));
// => true

Number.isNaN(undefined); // Not sure why you would want undefined to return false...
// => false
```

## pick
```javascript
var object = { 'a': 1, 'b': '2', 'c': 3 };
 
_.pick(object, ['a', 'c']);
// => { 'a': 1, 'c': 3 }
```

### ES6
Lodash .pick method is pretty nice, the ES6 variant is not really smaller.
```javascript
{a: object.a, c: object.c};
// => { 'a': 1, 'c': 3 }

// Destructuring first
var {a, c} = object;
{a, c};

// More ugly way of using destructuring, but scoped inside a function
(({a, c}) => ({a, c}))(object);
```

## omit
```javascript
var object = { 'a': 1, 'b': '2', 'c': 3 };
 
_.omit(object, ['a', 'c']);
// => { 'b': '2' }
```

### ES6
There is not really a good alternative to this. Either use the methods displayed under [_.pick](#pick)
or use a combination of clone and delete.

## min
```javascript
_.min([4, 2, 8, 6]);
// => 2
```

### ES6
```javascript
Math.min(...[4, 2, 8, 6]);
```

## max
```javascript
_.max([4, 2, 8, 6]);
// => 8
```

### ES6
```javascript
Math.max(...[4, 2, 8, 6]);
```

| Lodash  | ES6  |
|---------|------|
|```_.max([4, 2, 8, 6]);```|```Math.max(...[4, 2, 8, 6]);```|
|```_.min([4, 2, 8, 6]);```|```Math.min(...[4, 2, 8, 6]);```|

