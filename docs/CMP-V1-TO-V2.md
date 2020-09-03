# Migrating from CMP v1 to v2

- [Introduction](#introduction)
- [Roadmap](#roadmap)
- [Do I need to refactor my code?](#do-i-need-to-refactor-my-code)
- [CMP differences](#cmp-differences)

## Introduction
The Transparency and Consent Framework (TCF) defines the API for the Consent Management Provider (CMP).
The transition is being made from [CMP v1][tcf-v1] to [CMP v2][tcf-v2].
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
Unfortunately, CMPs have interpreted and implemented the [TCF v2 documentation][tcf-v2] differently.

Take for example the `addEventListener` command.
The following table shows when a registered callback is invoked and which data it is given:

|CMP|GDPR applies|consent has been given|v2 behaviour|
|---|---|---|---|
|Quantcast v5| yes | no    | - `{cmpStatus: "loaded", eventStatus: "tcloaded", gdprApplies: false, tcString: undefined}` <br>- `{cmpStatus: "loaded", eventStatus: "cmpuishown", gdprApplies: true, tcString: ""}` <br>- `{cmpStatus: "loaded", eventStatus: "useractioncomplete", gdprApplies: true, tcString: "[actual-tc-string]"}` |
|Quantcast v5| yes | yes   | - `{cmpStatus: "loaded", eventStatus: "tcloaded", gdprApplies: false, tcString: undefined}` <br>- `{cmpStatus: "loaded", eventStatus: "useractioncomplete", gdprApplies: true, tcString: "[actual-tc-string]"}` |
|Quantcast v5| no | N/A    | - `{cmpStatus: "loaded", eventStatus: "tcloaded", gdprApplies: false, tcString: undefined}` <br>- `{cmpStatus: "loaded", eventStatus: "useractioncomplete", gdprApplies: false, tcString: undefined}` |
|---|---|---|---|
|Quantcast v6| yes | no     | - `{cmpStatus: "loaded", eventStatus: "cmpuishown", gdprApplies: true, tcString: ""}` <br>- `{cmpStatus: "loaded", eventStatus: "useractioncomplete", gdprApplies: true, tcString: "[actual-tc-string]"}` |
|Quantcast v6| yes | yes    | - `{cmpStatus: "loaded", eventStatus: "tcloaded", gdprApplies: true, tcString: "[actual-tc-string]"}` |
|Quantcast v6| no | N/A     | - `{cmpStatus: "loaded", eventStatus: "tcloaded", gdprApplies: false, tcString: undefined}` |
|---|---|---|---|
|Cookiebot| yes | no    | - `{cmpStatus: "loaded", eventStatus: "cmpuishown", gdprApplies: true, tcString: ""}` <br>- `{cmpStatus: "loaded", eventStatus: "useractioncomplete", gdprApplies: true, tcString: "[actual-tc-string]"}` |
|Cookiebot| yes | yes   | - `{cmpStatus: "loaded", eventStatus: "tcloaded", gdprApplies: true, tcString: "[actual-tc-string]"}` |
|Cookiebot| no | N/A    | - `{cmpStatus: "loaded", eventStatus: "cmpuishown", gdprApplies: true, tcString: ""}` <sup>**1**</sup> |
|---|---|---|---|
|LiveRamp (before 2020-08-05)| yes | no     | - `{cmpStatus: "loading", eventStatus: undefined, gdprApplies: true, tcString: "CO13RvWAAAAAAADABAENAsCgAAAAAAAAAIAAAAAAAAAA.YAAAAAAAAAA"}` <br>- `{cmpStatus: "loaded", eventStatus: "useractioncomplete", gdprApplies: true, tcString: "[actual-tc-string]"}` <sup>**2**</sup> |
|LiveRamp (before 2020-08-05)| yes | yes    | - `{cmpStatus: "loading", eventStatus: "tcloaded", gdprApplies: true, tcString: "[actual-tc-string]"}` |
|LiveRamp (before 2020-08-05)| no | N/A     | - `{cmpStatus: undefined, eventStatus: undefined, gdprApplies: false, tcString: undefined}` |
|---|---|---|---|
|LiveRamp (after 2020-08-05)| yes | no      | - `{cmpStatus: "loaded", eventStatus: "cmpuishown", gdprApplies: true, tcString: undefined}` <br>- `{cmpStatus: "loaded", eventStatus: "useractioncomplete", gdprApplies: true, tcString: "[actual-tc-string]"}` <sup>**3**</sup> |
|LiveRamp (after 2020-08-05)| yes | yes     | - `{cmpStatus: "loaded", eventStatus: "tcloaded", gdprApplies: true, tcString: "[actual-tc-string]"}` |
|LiveRamp (after 2020-08-05)| no | N/A      | - `{cmpStatus: undefined, eventStatus: undefined, gpdrApplies: false, tcString: undefined}` |
|---|---|---|---|
|Funding Choices| yes | no | - `{cmpStatus: "stub", eventStatus: null, gdprApplies: true, tcString: undefined}` <br>- `{cmpStatus: "loaded", eventStatus: "cmpuishown", gdprApplies: true, tcString: undefined}` <br>- `{cmpStatus: "loaded", eventStatus: "useractioncomplete", gdprApplies: true, tcString: "[actual-tc-string]"}` |
|Funding Choices| yes | yes | - `{cmpStatus: "loaded", eventStatus: "tcloaded", gdprApplies: true, tcString: "[actual-tc-string]"}` |
|Funding Choices| no | N/A | - `{cmpStatus: "loaded", eventStatus: null, gdprApplies: false, tcString: undefined}` |

<sup>**1** This was tested on the website of a publisher instead of on a test environment.
It could not be tested on a test environment because the Cookiebot free version always asks a user for consent.</sup><br>
<sup>**2** The registered callback is only invoked a second time if the tcString changes. If, for example, the user denies all consent, then the second invocation won't take place.</sup><br>
<sup>**3** The registered callback is now always invoked a second time.</sup>

Because of the discrepancies between CMPs we only provide documentation for Quantcast.
The Quantcast CMP is bundled with the _cmp.stub.bundle.js_ script.
Publishers that use this script are referred to our [Quantcast documentation](cmp-v1-to-v2/QUANTCAST.md) and to the [Quantcast Choice Resources][quantcast-choice-resources].

Publishers that use the _cmp.stub.custom.bundle.js_ script manage the CMP themselves.
These publishers must use the documentation provided by their CMP to refactor their code.

[tcf-v1]: https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/CMP%20JS%20API%20v1.1%20Final.md
[tcf-v2]: https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/TCFv2/IAB%20Tech%20Lab%20-%20CMP%20API%20v2.md
[quantcast-choice-resources]: https://help.quantcast.com/hc/en-us/categories/360002940873-Quantcast-Choice
