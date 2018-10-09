# NDMTAG via AJAX REQUESTS

## Add CMP
Add all the necessary cmp scripts based on your implementation.

## Add script to head
Add the following in the `<head>`:
```html
<script>
	function createAdDiv(divToAppend) {
	    var div = document.createElement('div');
	    var id = 'dynamic-ajax-ad-' + Math.random();
	    div.id = id;

	    document.getElementById(divToAppend).appendChild(div);

	    ndmtag.cmd.push(function() {
	        ndmtag.defineAdSlot(id, {
	            type: 'appnexus',
	            id: 100000,
	            size: [728,90]
	        });

	        ndmtag.display(id);
	    });
	}
</script>
```

## AJAX loaded content
The previous defined function in the `head` should be executed within the AJAX loaded content as shown below:
```html
<div id="ajax-loaded-id">
	<script>
		createAdDiv('ajax-loaded-id');
	</script>
</div>
```
