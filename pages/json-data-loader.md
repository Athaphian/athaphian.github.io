# JSON Data Loader (JQuery plugin)

A while back I wrote a simple JQuery plugin that loads data from a specified JSON file and inserts it in the DOM.
It works for form fields and normal HTML elements. It can also insert images and hide fields based on the JSON.

### HTML
```html
<html>

<head>
  <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js"></script>
  <script type="text/javascript" src="jsonDataLoader.js"></script>
</head>

<body>
  <div id="parent">
    <fieldset>
      <label for="age">Age:</label>
      <input type="text" id="age" name="age" />
    </fieldset>
    <fieldset>
      Name:
      <span id="name"></span>
    </fieldset>
    <fieldset>
      <br />
      Surname:
      <span id="surname"></span>
    </fieldset>
    <br />
    Another element:
    <span id="hiddentest">This should be hidden</span>
    <img id="image" />
  </div>

  <script type="text/javascript">
    $(function () {
      $("#parent").loadJsonData({ url: "data.json" });
    });
  </script>
</body>

</html>
```

### jsonDataLoader.js
```javascript
(function ($) {
  $.fn.loadJsonData = function (options) {
    if (!options || !options.url) {
      return;
    } else {
      var url = options.url;

      return this.each(function () {
        $this = $(this);
        var element_id = $this.attr("id");
        loadDataFromJson(url, element_id);
      });
    }
  }
})(jQuery);

function loadDataFromJson(url, parent_element) {
  $.ajax({
    url: url,
    success: function (data, textStatus, XMLHttpRequest) {
      for (var idx in data.fields) {
        // Set the html of any element
        $("#" + parent_element + " #" + data.fields[idx].field)
          .not("img#" + data.fields[idx].field)
          .not("#" + parent_element + " input#" + data.fields[idx].field)
          .html(data.fields[idx].value);

        // Set the value in case of an input
        $("#" + parent_element + " input#" + data.fields[idx].field).val(data.fields[idx].value);

        // Set the src in case of an image
        $("#" + parent_element + " img#" + data.fields[idx].field).attr("src", data.fields[idx].value);

        // Hide the element if its required to be hidden
        if (data.fields[idx].hidden == "true") {
          $("#" + parent_element + " #" + data.fields[idx].field).hide();
        }
      }
    },
    dataType: "json"
  });
}
```

### JSON data example
```json
{
  "fields": [
    {"field": "name", "value": "John"},
    {"field": "surname", "value": "Doe"},
    {"field": "age", "value": "30"},
    {"field": "hiddentest", "hidden": "true"},
    {"field": "image", "value": "https://www.google.nl/images/branding/googlelogo/2x/googlelogo_color_120x44dp.png"}
  ]
}
```