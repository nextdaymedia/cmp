# DFP

## Head setup
Add the cmp-stub and the DFP head codes to the `<head>`:
```html
<script src="https://cmp.nextday.media/cmp.stub.bundle.js"></script>

<script>
    var googletag = googletag || {};
    googletag.cmd = googletag.cmd || [];
</script>

<script>
    googletag.cmd.push(function() {
        googletag.defineSlot('my-ad-unit-path>', [300, 600], 'my-div-id>').addService(googletag.pubads());
        googletag.pubads().enableSingleRequest();
        googletag.enableServices();
    });
</script>
```

## Body setup
The DFP body code needs to be wrapped with the cmp `getGooglePersonalization` callback.

E.g. the following DFP body code
```html
<div id='my-div-id' style='height:600px; width:300px;'>
    <script>
        googletag.cmd.push(function() { googletag.display('my-div-id'); });
    </script>
</div>
```
should be wrapped as follows:
```html
<div id='my-div-id' style='height:600px; width:300px;'>
    <script>
        window.__cmp('getGooglePersonalization', function(consent, isSuccess) {
            googletag.cmd.push(function() { googletag.display('my-div-id'); });
        });
    </script>
</div>
```

This ensure that the Google tag is not displayed until consent has been given.
