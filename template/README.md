# Template
The file `quantcast.js` contains the _Quantcast Universal Tag_ (QUT).
This script is prepended to `cmp.stub.bundle.js`.

When [migrating from CMP v1 to v2](/docs/CMP-V1-TO-V2.md) we need to support both CMP v1 and CMP v2.
The following describes how to create `quantcast.js` by merging QUT v1 and QUT v2.

## v2 basis
The QUT v2 forms the basis for `quantcast.js`.
Start by copying `universal-tag-v2.0.html` into `quantcast.js`.

Remove the following code as it is not compatible with both v1 and v2:
```js
var uspTries = 0;
var uspTriesLimit = 3;
...
var uspStubFunction = function() {
    var arg = arguments;
    if (typeof window.__uspapi !== uspStubFunction) {
        setTimeout(function() {
            if (typeof window.__uspapi !== 'undefined') {
                window.__uspapi.apply(window.__uspapi, arg);
            }
        }, 500);
    }
};

var checkIfUspIsReady = function() {
    uspTries++;
    if (window.__uspapi === uspStubFunction && uspTries < uspTriesLimit) {
        console.warn('USP is not accessible');
    } else {
        clearInterval(uspInterval);
    }
};

if (typeof window.__uspapi === 'undefined') {
    window.__uspapi = uspStubFunction;
    var uspInterval = setInterval(checkIfUspIsReady, 6000);
}
```
This code relates to CCPA and is not needed.

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
    .concat('?timestamp=', milliseconds);
```

with

```js
var url = 'https://quantcast.mgr.consensu.org'
    .concat('/choice/', '%%choiceID%%', '/', host, '/choice.js')
    .concat('?timestamp=', milliseconds);
```

## Adding v1 code
Add the following pieces of code from `universal-tag-v1.3.html` into `quantcast.js`:
- function `cmpStubFunction`
- function `checkIfCmpIsReady`
- if-statement `typeof window.__cmp == "undefined"`

```js
(function() {
	// code from universal-tag-v2.0.html
})();

var cmpStubFunction = function() {
    // implementation
};

var checkIfCmpIsReady = function() {
    // implementation
};

if (typeof window.__cmp === "undefined") {
    // implementation
}
```

We need to alter the v1 code such that it stops waiting for the v1 code to load if the publisher's website is configured to use CMP v2:

```js
var checkIfCmpIsReady = function() {
    if (window.__cmp === cmpStubFunction) {
        console.warn("CMP not loaded after 6 seconds. Trying again.");
    } else {
        clearInterval(cmpInterval);
    }
};
```

becomes

```js
var tcfapiStubFunction = window.__tcfapi;

var checkIfCmpIsReady = function() {
	if (window.__cmp === cmpStubFunction && window.__tcfapi === tcfapiStubFunction) {
		console.warn("CMP not loaded after 6 seconds. Trying again.");
	} else {
		clearInterval(cmpInterval);
	}
};
```
