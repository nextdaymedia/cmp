# NDMTAG Renderer with custom popup

## Add to page
Add the following to the `<head>`:
```html
<script src="https://cmp.nextday.media/cmp.stub.bundle.js"></script>
<script>
	window.ndmCmpConfig = {
		forceLocale: 'nl',
		customColor: '#2d54b1',
		privacyPolicy: "https://site.com/path/to/privacy-statement"
	};
	
	// Enable lazy loading
	ndmtag.cmd.push(function() {
		ndmtag.settings.set('lazyLoad', true);
	});

	// Define tags
	ndmtag.cmd.push(function() {
		ndmtag.defineAdSlot('websitename-position-size', {
			type: 'appnexus',
			id: 11106275,
			size: [300, 600],
			promoSizes: [[300, 250], [300, 200]],
			promoAlignment: 'center'
			// renderWithoutConsent: false
		});
		
		ndmtag.defineAdSlot('websitename-position-size', {
			type: 'appnexus',
			id: 11106275,
			size: [300, 600],
			promoSizes: [[300, 250], [300, 200]],
			promoAlignment: 'center'
			// renderWithoutConsent: false
		});
	});
</script>
```

## Add CMP script to body
Add the following after the opening `<body>` tag:
```html
<body>
	<script src="https://cmp.nextday.media/cmp.custom.bundle.js" async></script> 
	...
</body>
```

## Define places to render
On the page, at the position you want the ad to render in, add the following:
```html
<div id="websitename-position-size">
	<script>
		ndmtag.cmd.push(function() {
			ndmtag.display('websitename-position-size');
		});
	</script>
</div>
```

## Important
It's important to note that the name matches the id of the div to render in.

## Responsive width checks
If your website is responsive and you only want to render certain placements for mobile or desktop you can use the following if statement to wrap the display function:
#### HEAD
See the [`<head>` setup](#add-to-page) in the first paragraph.

#### BODY
```html
<div id="websitename-position-size-desktop">
	<script>
		if ((window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) >= 970) {
			// Only render on screens wider than 970px
			ndmtag.cmd.push(function() {
				ndmtag.display('websitename-position-size-desktop');
			});
		}
	</script>
</div>
<div id="websitename-position-size-mobile">
	<script>
		if ((window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) < 728) {
			// Only render on screens smaller than 728px
			ndmtag.cmd.push(function() {
				ndmtag.display('websitename-position-size-mobile');
			});
		}
	</script>
</div>
```

## Give consent
With the custom script our popup will not be rendered and you are responsible for getting consent from the users. After receiving user consent through your own implementation our CMP's api has to be called to set the consent globally. This is done by calling the following Javascript function:
```javascript
window.__cmp('giveConsent')
```

Depending on your custom implementation this could look like:
```html
<script>
	mycustomimplementation.show();
	mycustomimplementation.on('receiveConsent', function() {
		window.__cmp('giveConsent');
		
		// Make sure to reload the page after giving consent so quality ads will be rendered (NOT REQUIRED)
		window.location.reload();
	});
</script>
```

It should be noted that the consent must be given after the CMP script is loaded. Otherwise this could cause a conflict with the CMP. To be sure this won't happen you can execute the `giveConsent` function after a timeout like the example below.

```html
<script>
	mycustomimplementation.show();
	mycustomimplementation.on('receiveConsent', function() {
		setTimeout(function(){
			window.__cmp('giveConsent');

			// Make sure to reload the page after giving consent so quality ads will be rendered (NOT REQUIRED)
			window.location.reload();
		}, 2000)
	});
<script>
```

To verify the consent is given and everything is setup correctly you can use the following Javascript functions to log the consent.

```javascript
window.__cmp('getVendorConsents', null, function(result) { 
	console.log(result) 
});
```
If everything is setup correctly `result` is an Object with the properties `purposeConsents` and `vendorConsents`, which both should be an Object with numeric keys and values of `true`. If `result` is an Object with `undefined` values the consent is not being given, or it's given in a wrong way.

## Decline consent
When your popup implementation has both Accept and Decline for consent we need to add some extra code for the cmp to be used correctly.
In the `window.ndmCmpConfig` we will add a extra option `gdprApplies`.

* The option will be `true` if the person accepts the popup / cmp.
* The option will be `false` if the person declines the popup / cmp.

The config option will look like this:

```js
gdprApplies: (localStorage.getItem("useGDPR")) ? localStorage.getItem("useGDPR") : false,
```

In your function of Accepting / giveConsent we add a extra line:

```js
localStorage.setItem("useGDPR", true);
```

Your `giveConsent` function will look something like:

```js
mycustomimplementation.on('receiveConsent', function() {
	setTimeout(function(){
		localStorage.setItem("useGDPR", true);
		window.__cmp('giveConsent');

		// Make sure to reload the page after giving consent so quality ads will be rendered (NOT REQUIRED)
		window.location.reload();
	}, 2000)
});
```

We also need to create an click function for the Decline part where we add the line:

`localStorage.setItem("useGDPR", false);`

Your `decline` function will look something like:

```js
mycustomimplementation.on('declineConsent', function() {
	setTimeout(function(){
		localStorage.setItem("useGDPR", false);

		// Make sure to reload the page so quality ads will be rendered (NOT REQUIRED)
		window.location.reload();
	}, 2000)
});
```