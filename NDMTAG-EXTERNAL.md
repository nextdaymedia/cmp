# USING NDMTag with external CMP

Make sure the external CMP implements all the required functionality as described by the IAB standard. Also make sure the CMP registers on the window object as `__cmp`

## Initializing

NDMTag required you to initialize two variables in order to work asynchronously. Add the following to your head, before trying to add or render any ads.

```html
<head>
	...
	<script>
		window.ndmtag = window.ndmtag || {};
		window.ndmtag.cmd = window.ndmtag.cmd || [];
		
		// Enable lazy loading
		ndmtag.cmd.push(function() {
			ndmtag.settings.set('lazyLoad', true);
		});
	</script>
</head>
```

And include the NDMTag library at the start of your body. The library loads asynchonously and will not block rendering.
```html
<body>
	<script src="https://cmp.nextday.media/ndmtag.bundle.js" async></script>
	...
</body>
```

## Defining ad slots

You need to define the ad slots you want to use before rendering ads in them. Make sure this comes before any `display` calls. If in doubt where to place this, go for the safe bet of adding it to the `head` of your site.

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

## Rendering ads

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
