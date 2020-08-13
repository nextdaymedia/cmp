// The quantcast script (scr/template/quantcast.js) is prepended to the bundle of this file (cmp.stub.bundle.js).

import listener from "./lib/ssp-fallback";

window.ndmtag = window.ndmtag || {};
window.ndmtag.cmd = window.ndmtag.cmd || [];

window.addEventListener("message", listener, false);
