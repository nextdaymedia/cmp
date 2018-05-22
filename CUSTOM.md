# LINK CUSTOM CONSENT CMP

### Script
To add the CMP script to your site you will need to include the following in your HTML:
```html
<script>
    window.ndmCmpConfig = {
        forceLocale: 'nl',
        customColor: '#2d54b1'
    };
</script>
<script src="https://cmp.nextday.media/cmp.custom.bundle.js"></script>
```

### Location on page
The script needs to be added right after the starting `<body>` tag, eg:
```html
<html>
	<head>...</head>
	<body>
		<script>
			window.ndmCmpConfig = {
				forceLocale: 'nl',
				customColor: '#2d54b1'
			};
		</script>
		<script src="https://cmp.nextday.media/cmp.custom.bundle.js"></script>
		
		...other content
		
	</body>
</html>
```

### Give consent
After receiving user consent through your own implementation our CMP's api has to be called to set the consent globally. This is done by calling the following:
```javascript
window.__cmp('giveConsent')
```

Depending on your custom implementation this could look like:
```html
<script>
	mycustomimplementation.show();
	mycustomimplementation.on('receiveConsent', function() {
		window.__cmp('giveConsent');
		
		// Make sure to reload the page after giving consent so quality ads will be rendered
		window.location.reload();
	});
</script>
```
