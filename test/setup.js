import 'regenerator-runtime/runtime';
import { JSDOM } from "jsdom";

const dom = new JSDOM();
global.document = dom.window.document;
global.window = dom.window;

global.sleep = ms => new Promise( resolve => setTimeout(resolve, ms) );
