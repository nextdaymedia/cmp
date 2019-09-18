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

This ensures that the Google tag is not displayed until consent has been given.

## AppNexus tags
In your DFP portal you will need to adjust the AppNexus script that is loaded,
such that the URL <https://secure.adnxs.com/ttj> is replaced with <https://cmp.nextday.media/cmp.dfp.bundle.js>.

E.g. the following AppNexus script

```html
<SCRIPT SRC="https://secure.adnxs.com/ttj?id=13249269&size=300x600&promo_sizes=300x250&promo_alignment=center&cb=%%CACHEBUSTER%%" TYPE="text/javascript"></SCRIPT>
```

would become

```html
<SCRIPT SRC="https://cmp.nextday.media/cmp.dfp.bundle.js?id=13249269&size=300x600&promo_sizes=300x250&promo_alignment=center&cb=%%CACHEBUSTER%%" TYPE="text/javascript"></SCRIPT>
```

The `cmp.dfp.bundle.js` script will add the AppNexus script containing the same query parameters as well as the `gdpr` and `gdpr_consent` query parameters.