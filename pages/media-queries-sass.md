# Use media queries in sass
Example of how to use easy to use mixins and defined widths to create a responsive website in sass.

`media-query.scss`
```sass
$min: 0;
$small: 430px;
$medium: 600px;
$large: 768px;
$larger: 906px;
$max: 1024px;

@mixin mq-min($width) {
  @media screen and (min-width: $width) {
    @content;
  }
}

@mixin mq-max($width) {
  @media screen and (max-width: ($width - 1)) {
    @content;
  }
}

@mixin mq-between($smallest, $widest) {
  @media screen and (min-width: $smallest) and (max-width: ($widest - 1)) {
    @content;
  }
}
```

Example of use:
```sass
@include mq-max($large) {
  width: 100%;
}
```
