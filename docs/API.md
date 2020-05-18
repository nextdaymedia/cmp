# API

## `ndmtag`
A stub of the `ndmtag` is set on the `window` by one of the stub scripts:
- _cmp.stub.bundle.js_
- _cmp.stub.custom.bundle.js_

The stub `ndmtag` is replaced by the real `ndmtag` once the _cmp.ndmtag.bundle.js_ script is loaded.
The stub only contains the [`ndmtag.cmd.push`](#ndmtagcmdpush) method.

It is not advised to store a reference of the `ndmtag` in your code.
Your reference of `ndmtag` may reference the stub and will not be updated once the _cmp.ndmtag.bundle.js_ script is loaded.
Instead, always use the `ndmtag` set on the `window`.

The `ndmtag` requires a CMP to provide the consent string when rendering a tag.
The _cmp.stub.bundle.js_ script comes bundled with the Quantcast CMP.
Use the _cmp.stub.custom.bundle.js_ script if you are using another CMP.
If so, you must make sure your CMP is loaded before the _cmp.ndmtag.bundle.js_ script.

## `ndmtag.cmd.push`
The `push()` method on the `cmd` property runs the provided function once the `ndmtag` is loaded.
This is the only method that is guaranteed to exist on the `ndmtag`.
All other `ndmtag` method calls should be wrapped with the `cmd.push()` method to ensure the called method exists. 

#### Example
```js
ndmtag.cmd.push(function() {
    console.log('ndmtag is loaded')
})
```

#### Syntax
```js
ndmtag.cmd.push(callback)
```

Parameters:
- `callback`: Function to execute once `ndmtag` is loaded, taking 0 arguments.

## `ndmtag.settings.set`
The `set()` method on the `settings` property sets properties that are used as default values by all defined ad slots.

#### Example
```js
ndmtag.cmd.push(function() {
    ndmtag.settings.set('lazyLoad', true);
});
```

#### Syntax
```js
ndmtag.settings.set(setting, value)
```

Parameters:
- `setting`: The name of the setting.
- `value`: The value of the setting.

Settings:
- `lazyLoad`: boolean

## `ndmtag.defineAdSlot`
The `defineAdSlot` method configures the tag to be rendered in an HTML element. 

#### Example
```js
ndmtag.cmd.push(function() {
    ndmtag.defineAdSlot('websitename-position-size', {
        type: 'appnexus',
        id: 11106275,
        size: [300, 600],
        promoSizes: [[300, 250], [300, 200]],
        promoAlignment: 'center'
    });
})
```

#### Syntax
```js
ndmtag.defineAdSlot(name, options)
```

Parameters:
- `name`: Name of the defined ad slot and id of the HTML element that will display the ad.
- `options`: This object must contain the property `type`. All other properties depend on the value of `type`.
  Currently, the only valid value is `'appnexus'`.

Appnexus properties:
- `id`: The identification number (integer) belonging to a placement.
- `size`: The size of the placement.
    Format: `[width, height]`.
- `promoSizes`: Allow additional sizes to use this placement.
    Format: `[[width1, height1], [width2, height2], ...]`
- `promoAlignment`: Allowed values: `none` or `center`.

## `ndmtag.display`
The `display()` method renders the tag at the defined slot.

**Note**: a tag will be rendered in the defined slot every time the `display()` method is called.
Use [`ndmtag.refresh`](#ndmtagrefresh) if you want to render a new tag.

#### Example
```js
ndmtag.cmd.push(function() {
    ndmtag.display('websitename-position-size');
});
```

#### Syntax
```js
ndmtag.display(name)
```

Parameters:
- `name`: Name of the defined ad slot and id of the HTML element that will display the ad.

## `ndmtag.clear`
The `clear()` method clears the content of a defined ad slot. The ad slot itself is not removed.

#### Example
```js
ndmtag.cmd.push(function() {
    ndmtag.clear('websitename-position-size');
});
```

#### Syntax
```js
ndmtag.clear(name)
```

Parameters:
- `name`: Name of the defined ad slot and id of the HTML element that will display the ad.

#### Limitations
The `ndmtag` will render a tag inside a defined ad slot.
The tag, in turn, will render an ad.
The `ndmtag` assumes the ad is also rendered inside the ad slot and is removed when clearing the content of an ad slot.
Some ads, however, are rendered outside the ad slot.
The `ndmtag` has no way of knowing the position of an ad that is rendered outside of the ad slot.
Therefore, such an ad cannot be cleared by the `ndmtag`. 

## `ndmtag.refresh`
The `refresh()` method rerenders a tag at a defined ad slot.
This is the same as first calling [`ndmtag.clear`](#ndmtagclear) and then calling [`ndmtag.display`](#ndmtagdisplay).

#### Example
```js
ndmtag.cmd.push(function() {
    ndmtag.refresh('websitename-position-size');
});
```

#### Syntax
```js
ndmtag.refresh(name)
```

Parameters:
- `name`: Name of the defined ad slot and id of the HTML element that will display the ad.

#### Limitations
See [`ndmtag.clear`](#ndmtagclear).
