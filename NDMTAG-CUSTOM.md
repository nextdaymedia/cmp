# NDMTAG Renderer

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
	
	// Define tags
	ndmtag.cmd.push(function() {
		ndmtag.defineAdSlot('voetbalprimeurnl-front-970x250', {
			type: 'appnexus',
			id: 11106275,
			size: [300, 600],
			promoSizes: [[300, 250], [300, 200]],
			promoAlignment: 'center'
			// renderWithoutConsent: false
		});
		
		ndmtag.defineAdSlot('voetbalprimeurnl-news-970x250', {
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
<script src="https://cmp.nextday.media/cmp.custom.bundle.js" async></script> 
```

## Define places to render
On the page, at the position you want the ad to render in, add the following:
```html
<div id="voetbalprimeurnl-front-970x250">
	<script>
		ndmtag.cmd.push(function() {
			ndmtag.display('voetbalprimeurnl-front-970x250');
		});
	</script>
</div>
```

## Important
It's important to note that the name matches the id of the div to render in.

## Responsive width checks
If your website is responsive and you only want to render certain placements for mobile or desktop you can use the following if statement to wrap the display function:
#### HEAD
```html
<script>
	// Define tags, one desktop, one mobile
	ndmtag.cmd.push(function() {
		ndmtag.defineAdSlot('voetbalprimeurnl-front-970x250-mobile', {
			type: 'appnexus',
			id: 11106275,
			size: [300, 600],
			promoSizes: [[300, 250], [300, 200]],
			promoAlignment: 'center'
		});
		
		ndmtag.defineAdSlot('voetbalprimeurnl-front-970x250-desktop', {
			type: 'appnexus',
			id: 11106275,
			size: [300, 600],
			promoSizes: [[300, 250], [300, 200]],
			promoAlignment: 'center'
		});
	});
</script>
```
#### BODY
```html
<div id="voetbalprimeurnl-front-970x250-desktop">
	<script>
		if ((window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) >= 970) {
			// Only render on screens wider than 970px
			ndmtag.cmd.push(function() {
				ndmtag.display('voetbalprimeurnl-front-970x250-desktop');
			});
		}
		if ((window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) < 728) {
			// Only render on screens smaller than 728px
			ndmtag.cmd.push(function() {
				ndmtag.display('voetbalprimeurnl-front-970x250-mobile');
			});
		}
	</script>
</div>
```

## Give consent
With the custom script our popup will not be rendered and you are responsible for getting consent from the users. After receiving user consent through your own implementation our CMP's api has to be called to set the consent globally. This is done by calling the following:
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
