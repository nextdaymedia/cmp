# NDMTAG Renderer

The following describes how to implement the scripts that load the QuantCast CMP
and render the ads on your website.
If you are already using a CMP and do not want to make use of the QuantCast CMP,
please refer to the [custom implementation](NDMTAG-CUSTOM.md).

## Head setup
Add the following to the `<head>`:
```html
<script src="https://cmp.nextday.media/cmp.stub.bundle.js"></script>
<script>
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
		});

		ndmtag.defineAdSlot('websitename-position-size', {
			type: 'appnexus',
			id: 11106275,
			size: [300, 600],
			promoSizes: [[300, 250], [300, 200]],
			promoAlignment: 'center'
		});
	});
</script>
```

## Body setup
Add the following after the opening `<body>` tag:
```html
<body>
	<script src="https://cmp.nextday.media/cmp.ndmtag.bundle.js" async></script>
	...
</body>
```

On the page, at the position you want the ad to render, add the following:
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
See the [`<head>` setup](#head-setup) in the first paragraph.

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
