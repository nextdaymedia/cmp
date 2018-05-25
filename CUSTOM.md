# LINK CUSTOM CONSENT CMP

### Script
To add the CMP script to your site you will need to include the following in your HTML:

#### HEAD
```html
<script src="https://cmp.nextday.media/cmp.stub.bundle.js"></script>
<script>
	window.ndmCmpConfig = {
		forceLocale: 'nl',
		customColor: '#2d54b1',
		privacyPolicy: "https://site.com/path/to/privacy-statement"
	};
</script>
```

#### BODY
Add to start op body, the tag is async so it will not block rendering
```html
<script src="https://cmp.nextday.media/cmp.ndmtag.bundle.js" async></script>
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
		
		// Make sure to reload the page after giving consent so quality ads will be rendered (NOT REQUIRED)
		window.location.reload();
	});
</script>
```
