// Type definitions for fswatcher-child 1.1
// Project: https://github.com/DeMoorJasper/fswatcher-child#readme
// Definitions by: Jake Chitel <https://github.com/jchitel>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

import { EventEmitter } from 'events';
import { FSWatcher, WatchOptions, WatchedPaths } from 'chokidar';

/**
 * Implements the same API of FSWatcher from chokidar,
 * but runs the actual FSWatcher instance in a child process.
 * All method calls are forwarded to the child process,
 * and all events on the FSWatcher are forwarded back to this class.
 */
export default class Watcher extends EventEmitter implements FSWatcher {
    ready: boolean;
    closed?: boolean;

    constructor(options?: WatchOptions);

    /**
     * If 'ready' is false, use this to restart the child process.
     * It will do nothing if the child process is already running.
     */
    startchild(): void;

    add(paths: string | string[]): void;

    unwatch(paths: string | string[]): void;

    getWatched(): WatchedPaths;

    close(): void;
}
