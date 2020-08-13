# Template
The file `quantcast.js` contains the _Quantcast Universal Tag_ (QUT).
This script is prepended to `cmp.stub.bundle.js`.

The following describes how to create `quantcast.js` using QUT v2.

## v2 basis
The QUT v2 forms the basis for `quantcast.js`.
Start by copying `universal-tag-v2.0.html` into `quantcast.js`.

## HTML to Javascript
The QUT contains HTML. Since we only need the Javascript, remove the surrounding comment and script element:

```html
<!-- Quantcast Choice... -->
<script type="text/javascript" async=true>
// tag implementation
</script>
<!-- End Quantcast Choice... -->
```

becomes

```js
// tag implementation
```

## Choice ID placeholder
The QUT contains an identifier for NDM. This should not be committed.
Replace

```js
var url = 'https://quantcast.mgr.consensu.org'
    .concat('/choice/', '[our-choice-id]', '/', host, '/choice.js')
```

with

```js
var url = 'https://quantcast.mgr.consensu.org'
    .concat('/choice/', '%%choiceID%%', '/', host, '/choice.js')
```
