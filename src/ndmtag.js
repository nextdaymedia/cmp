import 'core-js/fn/array/reduce';
import 'core-js/fn/array/fill';
import 'core-js/fn/array/map';
import 'core-js/fn/array/for-each';
import 'core-js/fn/array/filter';
import 'core-js/fn/array/from';
import 'core-js/fn/set';
import log from './lib/log';
import {NDMTAG_GLOBAL_NAME} from "./lib/ndmtag";
import NDMTag from "./lib/ndmtag";
import config from "./lib/config";
import {CMP_GLOBAL_NAME} from "./lib/cmp";

// Preserve any config options already set
const {cmpConfig} = window[CMP_GLOBAL_NAME] || {};
const ndmCmpConfig = window.ndmCmpConfig || {};
const configUpdates = {
	...cmpConfig,
	...ndmCmpConfig
};

config.update(configUpdates);
log.debug('Using configuration:', config);

// Init our tags implementation
const ndmtag = new NDMTag(window[NDMTAG_GLOBAL_NAME].cmd);
window[NDMTAG_GLOBAL_NAME] = ndmtag;
ndmtag.processCommands();

log.debug('NDMTag inited');
