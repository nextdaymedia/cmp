# NDMTAG Renderer with AJAX requests

## Add to page
Add the following to the `<head>`:
```html
<script>
	window.ndmCmpConfig = {
		customColor: '#2d54b1',
		privacyPolicy: "https://site.com/path/to/privacy-statement"
	};
</script>
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

	// Define function to create random divs
	function createAdDiv(divToAppend) {
	    var div = document.createElement('div');
	    var id = 'dynamic-ajax-ad-' + Math.random();
	    div.id = id;

	    document.getElementById(divToAppend).appendChild(div);

	    ndmtag.cmd.push(function() {
	        ndmtag.defineAdSlot(id, {
	            type: 'appnexus',
	            id: 11106275,
	            size: [728,90]
	        });

	        ndmtag.display(id);
	    });
	}
</script>
```

## Add CMP script to body
Add the following after the opening `<body>` tag:
```html
<script src="https://cmp.nextday.media/cmp.ndmtag.bundle.js" async></script>
```

## Important
It's important to note that the name matches the id of the div to render in.

## AJAX loaded content
Make sure the AJAX loaded content includes an ad div with an unique id like the example below. Execute the earlier defined function `createDiv()` with the div id as parameter in a `<script>` tag. This will insert an ad in the correct slot.
```html
<div id="ajax-loaded-id">
	<script>
		createAdDiv('ajax-loaded-id');
	</script>
</div>
```

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
