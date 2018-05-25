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
<script src="https://cmp.nextday.media/cmp.ndmtag.bundle.js" async></script> 
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
