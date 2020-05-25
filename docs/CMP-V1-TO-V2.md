# Migrating from CMP v1 to v2

- [Introduction](#introduction)
- [Roadmap](#roadmap)
- [Do I need to refactor my code?](#do-i-need-to-refactor-my-code)
- [CMP v1 and v2 compatible code](#cmp-v1-and-v2-compatible-code)
  - [Getting the consent string](#getting-the-consent-string)
- [Quantcast v1 and v2 compatible code](#quantcast-v1-and-v2-compatible-code)
  - [The `getGooglePersonalization` command](#the-getgooglepersonalization-command)
  - [The `getNonIABVendorConsents` command](#the-getnoniabvendorconsents-command)
  - [The `displayConsentUi` command](#the-displayconsentui-command)  

## Introduction
The Transparency and Consent Framework (TCF) defines the API for the Consent Management Provider (CMP).
The transition is being made from CMP v1 to CMP v2.
This document describes the steps that need to be taken to ensure a smooth transition.

## Roadmap
The APIs of v1 and v2 are non-compatible.
Both the publisher and NDM will have to transition from using v1 to v2.
This is the roadmap to completing this transition:
- [x] Publisher and the NDM code use the CMP v1 API
- [x] NDM refactors her code to be compatible with both v1 and v2.
- [ ] Publisher refactors her code to be compatible with both v1 and v2.
- [ ] Switch the CMP version from v1 to v2:
    - If the publisher has implemented the _cmp.stub.bundle.js_ script, the CMP is managed by NDM.
      NDM will update the CMP version. The publisher does not need to take action.
    - If the publisher has implemented the _cmp.stub.custom.bundle.js_ script, the CMP is managed by the publisher.
      The publisher must change the version of her CMP to v2.
- [ ] Publisher refactors her code to be compatible with v2 only.
- [ ] NDM refactors her code to be compatible with v2 only.

## Do I need to refactor my code?
If anywhere in **your** code you are using the globally defined function `__cmp`,
then you must refactor your code.

## CMP v1 and v2 compatible code
The API definitions of the TCF can be found here:
- [v1](tcf-v1)
- [v2](tcf-v2)

CMP v1 implements the function `__cmp`. CMP v2 implements the function `__tcfapi`.
These two functions are non-compatible.
We make our code compatible with both v1 and v2 by registering callbacks with both `__cmp` and `__tcfapi` if they are defined.
Since the CMP will implement v1 or v2, but not both, we can assume the v1 callback will be invoked or the v2 callback will be invoked, but not both.

The following example shows how we make our code compatible with v1 and v2 for the imaginary command `foo`:
```js
if (!window.__cmp && !window.__tcfapi) {
    console.error('both __cmp and __tcfapi are undefined');
}
if (window.__cmp) {
    window.__cmp('foo', null, function(a, b) {
        console.log('this will be printed if the CMP implements v1');    
    });
}
if (window.__tcfapi) {
    window.__tcfapi('foo', 2, function(c, d) {
        console.log('this will be printed if the CMP implements v2');
    })
}
```
We register the callback with `window.__cmp` if it is defined.
Similarly, we register the callback with `window.__tcfapi` if it is defined.
Some things to note:
- We make no assumption of which version the CMP implements.
- Both `window.__cmp` and `window.__tcfapi` may be defined, however only one of them will be implemented.
  For example, both may be defined as stub, but only one stub will be replaced with the actual implementation.
  We can assume the v1 callback is invoked or the v2 callback is invoked, but not both.

Let's look at how this translates to actual CMP commands.

### Getting the consent string
CMP v1 implements the command [`getConsentData`](v1-functions).
It invokes the callback with [`VendorConsentData`](v1-object-VendorConsentData) once the user has confirmed their consent.

CMP v2 implements the [`addEventListener`](v2-function-addEventListener) command.
It invokes the callback with [`TCData`](v2-object-TCData) whenever the TCData changes.
When the property `eventStatus` is set to `'useractioncomplete'` we know the user has confirmed or re-confirmed their choices
and the `TCData` contains the consent string.

CMP v2 also implements the [`removeEventListener`](v2-function-removeEventListener) command.
This command can be used to remove an event listener added with `addEventListener`.

The following example shows how to refactor code that gets the consent string to be compatible with both v1 and v2.

Before:
```js
window.__cmp('getConsentData', null, function(data, success) {
    if (success) {
        console.log('consent string', data.consentData);
    } else {
        console.log('getConsentData was not successful');
    }
});
``` 
After:
```js
if (!window.__cmp && !window.__tcfapi) {
    console.error('both __cmp and __tcfapi are undefined');
}
if (window.__cmp) {
    window.__cmp('getConsentData', null, function(data, success) {
        if (success) {
            console.log('consent string', data.consentData);
        } else {
            console.log('getConsentData was not successful');
        }
    });
}
if (window.__tcfapi) {
    window.__tcfapi('addEventListener', 2, function(tcData, addSuccess) {
        if (addSuccess && tcData.eventStatus === 'useractioncomplete') {
            window.__tcfapi('removeEventListener', 2, function(removeSuccess) {
                if (!removeSuccess) {
                    console.error('could not removeEventListener with listenerId', tcData.listenerId);                
                }
            }, tcData.listenerId);

            console.log('consent string', tcData.tcString);
        }
    });
}
```
Some things to note:
- The `removeEventListener` command, used in the v2 code, is used to ensure the consent string is printed only once.
  Without running the `removeEventListener` command, the consent string would be printed every time a user re-confirms their choices.
- The consent string printed by the v2 callback is non-compatible with the consent string printed by the v1 callback.

## Quantcast v1 and v2 compatible code
If the publisher has implemented the _cmp.stub.bundle.js_ script, the CMP is managed by NDM.
NDM has bundled this script with the CMP implemented by [Quantcast](quantcast).

Each CMP can add additional commands to the CMP API that are not defined by the TCF.
The following sections describe how to refactor Quantcast specific commands to be compatible with v1 and v2.

If the publisher has implemented the _cmp.stub.custom.bundle.js_ script, then the CMP is managed by the publisher and the following sections do not apply.

### The `getGooglePersonalization` command
Quantcast v1 implements the command `getGooglePersonalization` to specifically handle consent given to Google.
This command no longer exists in v2 as Google will be listed as an IAB vendor.

The `getGooglePersonalization` command was mostly used for [DFP](DFP.md).
With DFP this command was used to delay triggering the `googletag` until consent is given.
The following example shows how to refactor the `getGooglePersonalization` command when used with DFP:

Before:
```js
window.__cmp('getGooglePersonalization', function(consent, isSuccess) {
    googletag.cmd.push(function() {
        googletag.display('my-div-id');
    });
});
```
After:
```js
if (!window.__cmp && !window.__tcfapi) {
    console.error('__cmp and __tcfapi are both undefined');
}
window.__cmp('getGooglePersonalization', function(consent, isSuccess) {
    googletag.cmd.push(function() {
        googletag.display('my-div-id');
    });
});
if (window.__tcfapi) {
    window.__tcfapi('addEventListener', 2, function(data, addSuccess) {
        if (addSuccess && data.eventStatus === 'useractioncomplete') {
            window.__tcfapi('removeEventListener', 2, function(removeSuccess) {
                if (!removeSuccess) {
                    console.error('could not removeEventListener with listenerId', data.listenerId);
                }
            }, data.listenerId);
            googletag.cmd.push(function() {
                googletag.display('my-div-id');
            });
        }
    });
}
```
Note that the `removeEventListener` command, used in the v2 code, is used to ensure the `googletag.cmd.push` method is invoked only once.
Without running the `removeEventListener` command, the `googletag.cmd.push` method would be invoked every time a user re-confirms their choices.

### The `getNonIABVendorConsents` command
Quantcast v1 implements the command `getNonIABVendorConsents`.
It invokes the callback with an object containing the consent given to the non-IAB vendors.

Quantcast v2 also implements the command `getNonIABVendorConsents`.

The object given to the v2 callback differs from the object given to the v1 callback.
In v1 the object has a property named _non**IAB**VendorConsents_, while in v2 the object has a property named _non**Iab**VendorConsents_.

The following example shows how to refactor the `getNonIABVendorConsents` command:

Before:
```js
function handleNonIabVendorConsents(nonIabVendorConsents) {
    const nonIabVendorId = 36;
    if (nonIabVendorConsents[nonIabVendorId] === true) {
        console.log('Non-IAB vendor has consent');
    } else if (nonIabVendorConsents[nonIabVendorId] === false) {
        console.log('Non-IAB vendor does not have consent');
    } else {
        console.log('Unknown if non-IAB vendor has consent');    
    }
}

window.__cmp('getNonIABVendorConsents', null, function(consent, success) {
    if (success) {
        handleNonIabVendorConsents(consent.nonIABVendorConsents)        
    }
});
```
After:
```js
function handleNonIabVendorConsents(nonIabVendorConsents) {
    const nonIabVendorId = 36;
    if (nonIabVendorConsents[nonIabVendorId] === true) {
        console.log('Non-IAB vendor has consent');
    } else if (nonIabVendorConsents[nonIabVendorId] === false) {
        console.log('Non-IAB vendor does not have consent');
    } else {
        console.log('Unknown if non-IAB vendor has consent');    
    }
}

if (!window.__cmp && !window.__tcfapi) {
    console.error('both __cmp and __tcfapi are undefined');
}
if (window.__cmp) {
    window.__cmp('getNonIABVendorConsents', null, function(consent, success) {
        if (!success) {
            console.error('getNonIABVendorConsents was not successful');
            return;
        }
        handleNonIabVendorConsents(consent.nonIABVendorConsents);
    });
}
if (window.__tcfapi) {
    window.__tcfapi('addEventListener', 2, function(tcData, addSuccess) {
        if (addSuccess && tcData.eventStatus === 'useractioncomplete') {
            window.__tcfapi('getNonIABVendorConsents', 2, function(consent, nonIabVendorSuccess) {
                window.__tcfapi('removeEventListener', 2, function(removeSuccess) {
                    if (!removeSuccess) {
                        console.error('could not removeEventListener with listenerId', tcData.listenerId);                
                    }
                }, tcData.listenerId);
    
                if (!nonIabVendorSuccess) {
                    console.error('getNonIABVendorConsents was not successful');
                    return;
                }
                handleNonIabVendorConsents(consent.nonIabVendorConsents);
            });
        }
    });
}
```
Note that the `removeEventListener` command, used in the v2 code, is used to ensure the `getNonIABVendorConsents` command is invoked only once.
Without running the `removeEventListener` command, the `getNonIABVendorConsents` command would be invoked every time a user re-confirms their choices.

### The `displayConsentUi` command
Quantcast v1 implement the command `displayConsentUi`.
This command is used to display the Consent Ui.

Quantcast v2 also implements this command.

The following example shows how to refactor the `displayConsentUi` command:

Before:
```html
<script>
    const displayConsentUi = function() {
        window.__cmp('displayConsentUi');
    }
</script>
<button onclick="displayConsentUi()">change consent</button>
```
After:
```html
<script>
    const displayConsentUi = function() {
        if (!window.__cmp && !window.__tcfapi) {
            console.error('both __cmp and __tcfapi are undefined');
        }
        if (window.__cmp) {
            window.__cmp('displayConsentUi');
        }
        if (window.__tcfapi) {
            window.__tcfapi('displayConsentUi', 2, function() {
            });
        }
    }
</script>
<button onclick="displayConsentUi()">change consent</button>
```

[tcf-v1]: https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/CMP%20JS%20API%20v1.1%20Final.md
[tcf-v2]: https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/TCFv2/IAB%20Tech%20Lab%20-%20CMP%20API%20v2.md
[v1-functions]: https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/CMP%20JS%20API%20v1.1%20Final.md#what-api-will-need-to-be-provided-by-the-cmp-
[v1-object-VendorConsentData]: https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/CMP%20JS%20API%20v1.1%20Final.md#vendorconsentdata-
[v1-object-VendorConsents]: https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/CMP%20JS%20API%20v1.1%20Final.md#vendorconsents-
[v2-function-addEventListener]: https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/TCFv2/IAB%20Tech%20Lab%20-%20CMP%20API%20v2.md#addeventlistener
[v2-function-removeEventListener]: https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/TCFv2/IAB%20Tech%20Lab%20-%20CMP%20API%20v2.md#removeeventlistener
[v2-object-TCData]: https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/TCFv2/IAB%20Tech%20Lab%20-%20CMP%20API%20v2.md#tcdata
[quantcast]: https://www.quantcast.com/
