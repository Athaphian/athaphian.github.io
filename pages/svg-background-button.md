# Use svg image as button
Using css. With hover state.

#### plus.svg
```svg
<svg role="img" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
    <title>Plus</title>
    <circle class="str1" cx="20" cy="20" r="19" fill="#FFFFFF" stroke-width="2" stroke="black"/>
    <line class="str1" x1="20" y1="10" x2="20" y2="30" stroke-width="3" stroke="black"/>
    <line class="str1" x1="10" y1="20" x2="30" y2="20" stroke-width="3" stroke="black"/>
</svg>
```

#### css
```css
.plus-link {
    display: inline-block;
    width: 24px;
    height: 24px;
    background-image: url('plus.svg');
    background-size: 24px 24px;
}

.plus-link:hover {
    z-index: 2;
    transform: translate(-1px, -1px);
    filter: drop-shadow(0.25rem 0.25rem 0.25rem rgba(0,0,0, 0.2));
}

.plus-link span {
    /*
      This is to hide the text from view, but not from screenreaders.
      https://stackoverflow.com/questions/45702834/html-accessibility-anchor-tags-with-background-images-on-pseudo-elements
    */
    border: 0;
    clip: rect(1px 1px 1px 1px); /* IE6, IE7 */
    clip: rect(1px, 1px, 1px, 1px);
    height: 1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 1px;
}
```

#### html
```html
<div class="plus-link"></div>
<span class="plus-link"></span>
<a href="some/link" class="plus-link"><span>text only visible to screenreaders</span></a>

```