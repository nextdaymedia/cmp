import NDMTag, { NDMTAG_GLOBAL_NAME } from './lib/ndmtag';

// Init our tags implementation
const ndmtag = new NDMTag(window[NDMTAG_GLOBAL_NAME].cmd);
window[NDMTAG_GLOBAL_NAME] = ndmtag;
ndmtag.processCommands();
