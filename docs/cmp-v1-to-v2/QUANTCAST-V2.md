# Dropping support for Quantcast v1

- [Introduction](#introduction)
- [HTTP and HTTPS](#http-and-https)
- [CMP v1 and v2 compatible code](#cmp-v1-and-v2-compatible-code)
- [IAB commands](#iab-commands)
  - [The `getConsentData` command](#the-getconsentdata-command)
  - [The `getVendorConsents` command](#the-getvendorconsents-command)
  - [The `getPublisherConsents` command](#the-getpublisherconsents-command)
- [Quantcast commands](#quantcast-commands)
  - [The `getGooglePersonalization` command](#the-getgooglepersonalization-command)
  - [The `getNonIABVendorConsents` command](#the-getnoniabvendorconsents-command)
  - [The `displayConsentUi` command](#the-displayconsentui-command)
  - [The `setConsentUiCallback` command](#the-setconsentuicallback-command)

## Introduction
If the publisher has implemented the _cmp.stub.bundle.js_ script, then the CMP is managed by NDM.
NDM has bundled this script with the CMP implemented by [Quantcast][quantcast].
If the publisher has implemented the _cmp.stub.custom.bundle.js_ script,
then the CMP is managed by the publisher and this document may not apply.

Previously, the publisher has refactored her code to be [compatible with both CMP v1 and v2](./QUANTCAST.md).
This article explains how the publisher should refactor their code to drop support for CMP v1 and only be compatible with CMP v2.

## CMP v2 compatible code
[CMP v1][tcf-v1] implements the function `__cmp`. [CMP v2][tcf-v2] implements the function `__tcfapi`.
These two functions are non-compatible.
We made our code compatible with both v1 and v2 by registering callbacks with both `__cmp` and `__tcfapi` if they are defined.
Now we will remove support for CMP v1 by removing all references to `__cmp`.

The following example shows how we make our code compatible with v2 only for the imaginary command `foo`.

Before:
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
    });
}
```
After:
```js
window.__tcfapi('foo', 2, function(c, d) {
    console.log('this will be printed if the CMP implements v2');
});
```

Some things to note:
- `__tcfapi` must be defined.

## IAB commands
The following sections describe how to refactor commands that are specified by the [IAB documentation][tcf-v2].

### The `getConsentData` command
The following example shows how to refactor code that gets the consent string to be compatible with v2 only.

Before:
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
        if (addSuccess && (tcData.eventStatus === 'useractioncomplete' || tcData.eventStatus === 'tcloaded')) {
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
After:
```js
window.__tcfapi('addEventListener', 2, function(tcData, addSuccess) {
    if (addSuccess && (tcData.eventStatus === 'useractioncomplete' || tcData.eventStatus === 'tcloaded')) {
        window.__tcfapi('removeEventListener', 2, function(removeSuccess) {
            if (!removeSuccess) {
                console.error('could not removeEventListener with listenerId', tcData.listenerId);
            }
        }, tcData.listenerId);

        console.log('consent string', tcData.tcString);
    }
});
```

Some things to note:
- `__tcfapi` must be defined.
- The `removeEventListener` command, used in the v2 code, is used to ensure the consent string is printed only once.
  This ensures the same behaviour as the v1 code.
  You could remove the `removeEventListener` command if you want the consent string to be printed every time a user changes their consent.
- `tcString` might be empty or undefined if GDPR does not apply.

### The `getVendorConsents` command
The following example shows how to refactor code that checks for vendor consent to be compatible with v2 only.

Before:
```js
function handleVendorConsent(consents, gdprApplies) {
    const vendorId = 42;
    if (!gdprApplies) {
        console.log('GDPR does not apply');
    } else if (consents[vendorId]) {
        console.log('Vendor has consent');
    } else {
        console.log('Vendor does not have consent');
    }
}

if (!window.__cmp && !window.__tcfapi) {
    console.error('both __cmp and __tcfapi are undefined');
}
if (window.__cmp) {
    window.__cmp('getVendorConsents', null, function(data, success) {
        if (success) {
            handleVendorConsent(data.vendorConsents, data.gdprApplies);
        }
    });
}
if (window.__tcfapi) {
    window.__tcfapi('addEventListener', 2, function(tcData, addSuccess) {
        if (addSuccess && (tcData.eventStatus === 'useractioncomplete' || tcData.eventStatus === 'tcloaded')) {
            window.__tcfapi('removeEventListener', 2, function(removeSuccess) {
                if (!removeSuccess) {
                    console.error('could not removeEventListener with listenerId', tcData.listenerId);
                }
            }, tcData.listenerId);

            if (tcData.gdprApplies) {
                handleVendorConsent(tcData.vendor.consents, true);
            } else {
                handleVendorConsent({}, false);
            }
        }
    });
}
```
After:
```js
function handleVendorConsent(consents, gdprApplies) {
    const vendorId = 42;
    if (!gdprApplies) {
        console.log('GDPR does not apply');
    } else if (consents[vendorId]) {
        console.log('Vendor has consent');
    } else {
        console.log('Vendor does not have consent');
    }
}

window.__tcfapi('addEventListener', 2, function(tcData, addSuccess) {
    if (addSuccess && (tcData.eventStatus === 'useractioncomplete' || tcData.eventStatus === 'tcloaded')) {
        window.__tcfapi('removeEventListener', 2, function(removeSuccess) {
            if (!removeSuccess) {
                console.error('could not removeEventListener with listenerId', tcData.listenerId);
            }
        }, tcData.listenerId);

        if (tcData.gdprApplies) {
            handleVendorConsent(tcData.vendor.consents, true);
        } else {
            handleVendorConsent({}, false);
        }
    }
});
```
Some things to note:
- `__tcfapi` must be defined.
- The `removeEventListener` command, used in the v2 code, is used to ensure the `handleVendorConsent` method is invoked only once.
  This ensures the same behaviour as the v1 code.
  Without running the `removeEventListener` command, the `handleVendorConsent` method would be invoked every time a user changes their consent.
- `tcData.vendor` might be undefined if GDPR does not apply.

### The `getPublisherConsents` command
The example below gives a general overview of how to refactor code that uses the `getPublisherConsents` command to be compatible with v2 only.
You are referred to the [Quantcast Choice Resources][quantcast-choice-resources] for more information about the `addEventListener` command.

Before:
```js
if (!window.__cmp && !window.__tcfapi) {
    console.error('both __cmp and __tcfapi are undefined');
}
if (window.__cmp) {
    window.__cmp('getPublisherConsents', function() {
        // implementation
    });
}
if (window.__tcfapi) {
    window.__tcfapi('addEventListener', 2, function(tcData, addSuccess) {
        if (addSuccess && (tcData.eventStatus === 'useractioncomplete' || tcData.eventStatus === 'tcloaded')) {
            window.__tcfapi('removeEventListener', 2, function(removeSuccess) {
                if (!removeSuccess) {
                    console.error('could not removeEventListener with listenerId', tcData.listenerId);
                }
            }, tcData.listenerId);

            // implementation
        }
    });
}
```
After:
```js
window.__tcfapi('addEventListener', 2, function(tcData, addSuccess) {
    if (addSuccess && (tcData.eventStatus === 'useractioncomplete' || tcData.eventStatus === 'tcloaded')) {
        window.__tcfapi('removeEventListener', 2, function(removeSuccess) {
            if (!removeSuccess) {
                console.error('could not removeEventListener with listenerId', tcData.listenerId);
            }
        }, tcData.listenerId);

        // implementation
    }
});
```
Some things to note:
- `__tcfapi` must be defined.
- The `removeEventListener` command, used in the v2 code, is used to ensure your code is executed only once.
  This ensures the same behaviour as the v1 code.
  Without running the `removeEventListener` command, your code is executed every time a user changes their consent.
- `tcData.vendor` might be undefined if GDPR does not apply.

## Quantcast commands
The following sections describe commands that are implemented by the Quantcast CMP which are not part of the IAB API.

You are referred to the [Quantcast Choice resources][quantcast-choice-resources] for more information about the Quantcast CMP.

### The `getGooglePersonalization` command
Quantcast v1 implements the command `getGooglePersonalization` to specifically handle consent given to Google.
It invokes the callback once the user has confirmed their consent.
This command no longer exists in v2 as Google will be listed as an IAB vendor.

The `getGooglePersonalization` command was mostly used for [DFP](/docs/DFP.md).
With DFP this command was used to delay triggering the `googletag` until consent is given.
The following example shows how to refactor code that triggers the `googletag` once consent is given to be compatible with v2 only:

Before:
```js
if (!window.__cmp && !window.__tcfapi) {
    console.error('__cmp and __tcfapi are both undefined');
}
if (window.__cmp) {
    window.__cmp('getGooglePersonalization', function(consent, isSuccess) {
        googletag.cmd.push(function() {
            googletag.display('my-div-id');
        });
    });
}
if (window.__tcfapi) {
    window.__tcfapi('addEventListener', 2, function(tcData, addSuccess) {
        if (addSuccess && (tcData.eventStatus === 'useractioncomplete' || tcData.eventStatus === 'tcloaded')) {
            window.__tcfapi('removeEventListener', 2, function(removeSuccess) {
                if (!removeSuccess) {
                    console.error('could not removeEventListener with listenerId', tcData.listenerId);
                }
            }, tcData.listenerId);
            googletag.cmd.push(function() {
                googletag.display('my-div-id');
            });
        }
    });
}
```
After:
```js
window.__tcfapi('addEventListener', 2, function(tcData, addSuccess) {
    if (addSuccess && (tcData.eventStatus === 'useractioncomplete' || tcData.eventStatus === 'tcloaded')) {
        window.__tcfapi('removeEventListener', 2, function(removeSuccess) {
            if (!removeSuccess) {
                console.error('could not removeEventListener with listenerId', tcData.listenerId);
            }
        }, tcData.listenerId);
        googletag.cmd.push(function() {
            googletag.display('my-div-id');
        });
    }
});
```
Some things to note:
- `__tcfapi` must be defined.
- The `removeEventListener` command, used in the v2 code, is used to ensure the `googletag.cmd.push` method is invoked only once.
  This ensures the same behaviour as the v1 code.
  Without running the `removeEventListener` command, the `googletag.cmd.push` method would be invoked every time a user changes their consent.

### The `getNonIABVendorConsents` command
Quantcast v1 implements the command `getNonIABVendorConsents`.
It invokes the callback with an object containing the consent given to the non-IAB vendors once the user has confirmed their consent.

Quantcast v2 also implements the command `getNonIABVendorConsents`.
The v2 implementation invokes the callback immediately.
Wrap the [`addEventListener`][v2-function-addEventListener] command around the `getNonIABVendorConsents` command to ensure consent has been given.

The object given to the v2 callback differs from the object given to the v1 callback.
In v1 the object has a property named _non**IAB**VendorConsents_, while in v2 the object has a property named _non**Iab**VendorConsents_.

The following example shows how to refactor the `getNonIABVendorConsents` command to be compatible with v2 only:

Before:
```js
function handleNonIabVendorConsents(nonIabVendorConsents, gdprApplies) {
    const nonIabVendorId = 36;
    if (!gdprApplies) {
        console.log('GDPR does not apply');
    } else if (nonIabVendorConsents[nonIabVendorId] === true) {
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
        handleNonIabVendorConsents(consent.nonIABVendorConsents, consent.gdprApplies);
    });
}
if (window.__tcfapi) {
    window.__tcfapi('addEventListener', 2, function(tcData, addSuccess) {
        if (addSuccess && (tcData.eventStatus === 'useractioncomplete' || tcData.eventStatus === 'tcloaded')) {
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
                handleNonIabVendorConsents(consent.nonIabVendorConsents, consent.gdprApplies);
            });
        }
    });
}
```
After:
```js
function handleNonIabVendorConsents(nonIabVendorConsents, gdprApplies) {
    const nonIabVendorId = 36;
    if (!gdprApplies) {
        console.log('GDPR does not apply');
    } else if (nonIabVendorConsents[nonIabVendorId] === true) {
        console.log('Non-IAB vendor has consent');
    } else if (nonIabVendorConsents[nonIabVendorId] === false) {
        console.log('Non-IAB vendor does not have consent');
    } else {
        console.log('Unknown if non-IAB vendor has consent');
    }
}

window.__tcfapi('addEventListener', 2, function(tcData, addSuccess) {
    if (addSuccess && (tcData.eventStatus === 'useractioncomplete' || tcData.eventStatus === 'tcloaded')) {
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
            handleNonIabVendorConsents(consent.nonIabVendorConsents, consent.gdprApplies);
        });
    }
});
```
Some things to note:
- `__tcfapi` must be defined.
- The `removeEventListener` command, used in the v2 code, is used to ensure the `getNonIABVendorConsents` command is invoked only once.
  This ensures the same behaviour as the v1 code.
  You could remove the `removeEventListener` command if you want to invoke the `getNonIABVendorConsents` command every time a user changes their consent.
- `consent.nonIabVendorConsents` might be null or undefined if GDPR does not apply.

### The `displayConsentUi` command
Quantcast v1 implements the command `displayConsentUi`.
This command is used to display the Consent UI.

Quantcast v2 also implements this command.

The following example shows how to refactor the `displayConsentUi` command to be compatible with v2 only:

Before:
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
After:
```html
<script>
    const displayConsentUi = function() {
        window.__tcfapi('displayConsentUi', 2, function() {
        });
    }
</script>
<button onclick="displayConsentUi()">change consent</button>
```
Some things to note:
- `__tcfapi` must be defined.

### The `setConsentUiCallback` command
Quantcast v1 implements the command `setConsentUiCallback`.

In CMP v2 the `addEventListener` command should be used.

The example below gives a general overview of how you should refactor your code to be compatible with v2 only.
You are referred to the [Quantcast Choice Resources][quantcast-choice-resources] for more information about the `addEventListener` command.

Before:
```js
if (!window.__cmp && !window.__tcfapi) {
    console.error('both __cmp and __tcfapi are undefined');
}
if (window.__cmp) {
    window.__cmp('setConsentUiCallback', function() {
        // implementation
    });
}
if (window.__tcfapi) {
    window.__tcfapi('addEventListener', 2, function(tcData, addSuccess) {
        // implementation
    });
}
```
After:
```js
window.__tcfapi('addEventListener', 2, function(tcData, addSuccess) {
    // implementation
});
```
Some things to note:
- `__tcfapi` must be defined.

[tcf-v1]: https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/CMP%20JS%20API%20v1.1%20Final.md
[tcf-v2]: https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/TCFv2/IAB%20Tech%20Lab%20-%20CMP%20API%20v2.md
[v1-functions]: https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/CMP%20JS%20API%20v1.1%20Final.md#what-api-will-need-to-be-provided-by-the-cmp-
[v1-object-VendorConsentData]: https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/CMP%20JS%20API%20v1.1%20Final.md#vendorconsentdata-
[v1-object-VendorConsents]: https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/CMP%20JS%20API%20v1.1%20Final.md#vendorconsents
[v2-function-addEventListener]: https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/TCFv2/IAB%20Tech%20Lab%20-%20CMP%20API%20v2.md#addeventlistener
[v2-function-removeEventListener]: https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/TCFv2/IAB%20Tech%20Lab%20-%20CMP%20API%20v2.md#removeeventlistener
[v2-object-TCData]: https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/TCFv2/IAB%20Tech%20Lab%20-%20CMP%20API%20v2.md#tcdata
[quantcast]: https://www.quantcast.com/
[quantcast-choice-resources]: https://help.quantcast.com/hc/en-us/categories/360002940873-Quantcast-Choice
