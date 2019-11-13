# Simple LIT component example

```html
<html>
<body>
  <h1>TEST</h1>

  <script type="module">
    import { html, render } from 'https://unpkg.com/lit-html?module';
    const clickHandler = {
      handleEvent(e) {
        console.log('clicked!');
      },
      capture: true,
      once: true
    };

    const myTemplate = () => html`<button @click=${clickHandler}>Click Me!</button>`;
    render(myTemplate(), document.body);
  </script>
</body>
</html>
```