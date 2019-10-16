import listener from "./lib/ssp-fallback";

window.ndmtag = window.ndmtag || {};
window.ndmtag.cmd = window.ndmtag.cmd || [];

window.addEventListener("message", listener, false);
