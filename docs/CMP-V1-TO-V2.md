# Migrating from CMP v1 to v2

- [Introduction](#introduction)
- [Roadmap](#roadmap)
- [Do I need to refactor my code?](#do-i-need-to-refactor-my-code) 

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
- [ ] Switch the CMP version from v1 to v2:
    - If the publisher has implemented the _cmp.stub.bundle.js_ script, the CMP is managed by NDM.
      The publisher must refactor her code to be compatible with both v1 and v2.
      NDM will update the CMP version.
    - If the publisher has implemented the _cmp.stub.custom.bundle.js_ script, the CMP is managed by the publisher.
      The publisher must refactor her code to be compatible with v2 and change the version of her CMP to v2.
- [ ] NDM refactors her code to be compatible with v2 only.
- [ ] Publisher refactors her code to be compatible with v2 only.

## Do I need to refactor my code?
If anywhere in **your** code you are using the globally defined function `__cmp`,
then you must refactor your code.

## CMP differences
Unfortunately, CMPs have interpreted and implemented the TCF documentation differently.

Take for example the `addEventListener` command.
The following table show when a registered callback is invoked and which data it is given:

|CMP|GDPR applies|consent has been given|v2 behaviour|
|---|---|---|---|
|Quantcast| yes | no    | - `{cmpStatus: "loaded", eventStatus: "tcloaded", gdprApplies: false, tcString: undefined}` <br>- `{cmpStatus: "loaded", eventStatus: "cmpuishown", gdprApplies: true, tcString: ""}` <br>- `{cmpStatus: "loaded", eventStatus: "useractioncomplete", gdprApplies: true, tcString: "[actual-tc-string]"}` |
|Quantcast| yes | yes   | - `{cmpStatus: "loaded", eventStatus: "tcloaded", gdprApplies: false, tcString: undefined}` <br>- `{cmpStatus: "loaded", eventStatus: "useractioncomplete", gdprApplies: true, tcString: "[actual-tc-string]"}` |
|Quantcast| no | N/A    | - `{cmpStatus: "loaded", eventStatus: "tcloaded", gdprApplies: false, tcString: undefined}` <br>- `{cmpStatus: "loaded", eventStatus: "useractioncomplete", gdprApplies: false, tcString: undefined}` |
|---|---|---|---|
|Cookiebot| yes | no    | - `{cmpStatus: "loaded", eventStatus: "cmpuishown", gdprApplies: true, tcString: ""}` <br>- `{cmpStatus: "loaded", eventStatus: "useractioncomplete", gdprApplies: true, tcString: "[actual-tc-string]"}` |
|Cookiebot| yes | yes   | - `{cmpStatus: "loaded", eventStatus: "tcloaded", gdprApplies: true, tcString: "[actual-tc-string]"}` |
|Cookiebot| no | N/A    | - `{cmpStatus: "loaded", eventStatus: "cmpuishown", gdprApplies: true, tcString: ""}` **1** |
|---|---|---|---|
|LiveRamp/Faktor| yes | no     | - `{cmpStatus: "loading", eventStatus: undefined, gdprApplies: true, tcString: "CO13RvWAAAAAAADABAENAsCgAAAAAAAAAIAAAAAAAAAA.YAAAAAAAAAA"}` <br>- `{cmpStatus: "loaded", eventStatus: "useractioncomplete", gdprApplies: true, tcString: "[actual-tc-string]"}` |
|LiveRamp/Faktor| yes | yes    | - `{cmpStatus: "loading", eventStatus: "tcloaded", gdprApplies: true, tcString: "[actual-tc-string]"}` |
|LiveRamp/Faktor| no | N/A     | - `{cmpStatus: undefined, eventStatus: undefined, gdprApplies: false, tcString: undefined}` |

<sup>**1** This was tested on the website of a publisher instead of on a test environment.
It could not be tested on a test environment because the Cookiebot free version always asks a user for consent.</sup>

Because of the discrepancies between CMPs we only provide documentation for [Quantcast][quantcast].
The Quantcast CMP is bundled with the _cmp.stub.bundle.js_ script.
Publishers that use this script are referred to our [Quantcast documentation](cmp-v1-to-v2/quantcast.md) and to the [Quantcast Choice Resources][quantcast-choice-resources].

Publishers that use the _cmp.stub.custom.bundle.js_ script manage the CMP themselves.
These publishers must use the documentation provided by their CMP to refactor their code.

[tcf-v1]: https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/CMP%20JS%20API%20v1.1%20Final.md
[tcf-v2]: https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/TCFv2/IAB%20Tech%20Lab%20-%20CMP%20API%20v2.md
[quantcast]: https://www.quantcast.com/
[quantcast-choice-resources]: https://help.quantcast.com/hc/en-us/categories/360002940873-Quantcast-Choice
[factor-api-reference]: https://faktor.atlassian.net/wiki/spaces/LPM/pages/1014366226/API+Reference+GDPR+for+Web