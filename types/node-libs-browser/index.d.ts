// Type definitions for node-libs-browser 2.1
// Project: http://github.com/webpack/node-libs-browser
// Definitions by: My Self <https://github.com/me>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

// This module exports, for each module provided standard in node, a path of a library that exposes a browser-compatible implementation.
// If no such library exists, or it is physically impossible to implement the library outside of node, null is exported.

/** browser implementation of node 'assert' from the npm library 'assert' */
export const assert: string;
/** browser implementation of node 'buffer' from the npm library 'buffer' */
export const buffer: string;
/** node 'child_process' cannot be implemented in a browser environment */
export const child_process: null;
/** node 'cluster' cannot be implemented in a browser environment */
export const cluster: null;
/** browser implementation of node 'console' from the npm library 'console-browserify' */
export const console: string;
/** browser implementation of node 'constants' from the npm library 'constants-browserify' */
export const constants: string;
/** browser implementation of node 'crypto' from the npm library 'crypto-browserify' */
export const crypto: string;
/** node 'dgram' cannot be implemented in a browser environment */
export const dgram: null;
/** node 'dns' cannot be implemented in a browser environment */
export const dns: null;
/** browser implementation of node 'domain' from the npm library 'domain-browser' */
export const domain: string;
/** browser implementation of node 'events' from the npm library 'events' */
export const events: string;
/** node 'fs' cannot be implemented in a browser environment */
export const fs: null;
/** browser implementation of node 'http' from the npm library 'stream-http' */
export const http: string;
/** browser implementation of node 'https' from the npm library 'https-browserify' */
export const https: string;
/** node 'module' cannot be implemented in a browser environment */
export const module: null;
/** node 'net' cannot be implemented in a browser environment */
export const net: null;
/** browser implementation of node 'os' from the npm library 'os-browserify/browser.js' */
export const os: string;
/** browser implementation of node 'path' from the npm library 'path-browserify' */
export const path: string;
/** browser implementation of node 'punycode' from the npm library 'punycode' */
export const punycode: string;
/** browser implementation of node 'process' from the npm library 'process/browser.js' */
export const process: string;
/** browser implementation of node 'querystring' from the npm library 'querystring-es3' */
export const querystring: string;
/** node 'readline' cannot be implemented in a browser environment */
export const readline: null;
/** node 'repl' cannot be implemented in a browser environment */
export const repl: null;
/** browser implementation of node 'stream' from the npm library 'stream-browserify' */
export const stream: string;
/** browser implementation of node '_stream_duplex' from the npm library 'readable-stream/duplex.js' */
export const _stream_duplex: string;
/** browser implementation of node '_stream_passthrough' from the npm library 'readable-stream/passthrough.js' */
export const _stream_passthrough: string;
/** browser implementation of node '_stream_readable' from the npm library 'readable-stream/readable.js' */
export const _stream_readable: string;
/** browser implementation of node '_stream_transform' from the npm library 'readable-stream/transform.js' */
export const _stream_transform: string;
/** browser implementation of node '_stream_writable' from the npm library 'readable-stream/writable.js' */
export const _stream_writable: string;
/** browser implementation of node 'string_decoder' from the npm library 'string_decoder' */
export const string_decoder: string;
/** browser implementation of node 'sys' from the npm library 'util/util.js' */
export const sys: string;
/** browser implementation of node 'timers' from the npm library 'timers-browserify' */
export const timers: string;
/** node 'tls' cannot be implemented in a browser environment */
export const tls: null;
/** browser implementation of node 'tty' from the npm library 'tty-browserify' */
export const tty: string;
/** browser implementation of node 'url' from the npm library 'url' */
export const url: string;
/** browser implementation of node 'util' from the npm library 'util/utils.js' */
export const util: string;
/** browser implementation of node 'vm' from the npm library 'vm-browserify' */
export const vm: string;
/** browser implementation of node 'zlib' from the npm library 'browserify-zlib' */
export const zlib: string;