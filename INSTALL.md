# Add CMP to your site

### Script
To add the CMP popup to your site you will need to include the following in your HTML:
```html
<script>
    window.ndmCmpConfig = {
        forceLocale: 'nl',
        customColor: '#2d54b1',
        privacyPolicy: "https://site.nl/path/to/privacy-statement"
    };
</script>
<script src="https://cmp.nextday.media/cmp.wrapper.bundle.js"></script>
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
				customColor: '#2d54b1',
				privacyPolicy: "https://site.nl/path/to/privacy-statement"
			};
		</script>
		<script src="https://cmp.nextday.media/cmp.wrapper.bundle.js"></script>
		
		...other content
		
	</body>
</html>
```

### Configuration
Make sure to replace the privacy policy url `privacyPolicy: "https://site.nl/path/to/privacy-statement"` to your own privacy policy location.

You can change the `customColor` to match your site's styling.
