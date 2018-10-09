# NDMTAG Renderer with AJAX requests

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

## AJAX loaded content
Make sure the AJAX loaded content includes an ad div with an unique id like the example below. Execute the earlier defined function `createDiv()` with the div id as parameter in a `<script>` tag. This will insert an ad in the correct slot.
```html
<div id="ajax-loaded-id">
	<script>
		createAdDiv('ajax-loaded-id');
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
### Lazyload example
```html
<head>
	<script src="https://cmp.nextday.media/cmp.stub.bundle.js"></script>
	<script>
		window.ndmCmpConfig = {
			forceLocale: 'nl',
			customColor: '#2d54b1',
			privacyPolicy: "https://site.com/path/to/privacy-statement"
		};

		// Define tags
		ndmtag.cmd.push(function() {
			ndmtag.defineAdSlot('ad-1', {
				type: 'appnexus',
				id: 11106275,
				size: [300, 600],
				promoSizes: [[300, 250], [300, 200]],
				promoAlignment: 'center'
			});			
		});
	</script>
</head>
<body>
    <script src="https://cmp.nextday.media/cmp.ndmtag.bundle.js" async></script>
    <div id="ad-1" class="lazy" data-function="ad-1" data-threshold="0">
        <!-- content will be replaced -->
    </div>

    <script src="/path/to/lazy-load.js"></script>
    <script>
        window.lazyLoad = window.lazyLoad || {};
        window.lazyLoad['ad-1'] = function() {
            ndmtag.cmd.push(function() {
				ndmtag.display('ad-1');
			});
        }
    </script>
</body>
```
