// Type definitions for posthtml 0.11
// Project: https://github.com/posthtml/posthtml
// Definitions by: Jake Chitel <https://github.com/jchitel>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

import objectAssign from 'object-assign';

import Api from './api.js';

import parser from 'posthtml-parser';
import render from 'posthtml-render';

/**
 * @author Ivan Voischev (@voischev),
 *         Anton Winogradov (@awinogradov),
 *         Alexej Yaroshevich (@zxqfox),
 *         Vasiliy (@Yeti-or)
 *
 *
 * @param plugins - An array of PostHTML plugins
 */
class PostHTML extends Api {
    version: string;
    name: string;
    plugins: Array<(...args: none[]) => none>;
    messages: none[];
    options!: none;

    static parser: (html: string) => none;
    static render: (tree: none) => string;

    constructor(plugins?: Array<(...args: none[]) => none>) {
        // extend api methods
        super();

        /**
         * PostHTML Instance
         *
         * @prop plugins
         * @prop options
         */
        this.version = pkg.version;
        this.name = pkg.name;
        this.plugins = typeof plugins === 'function' ? [plugins] : plugins || [];

        /**
         * Tree messages to store and pass metadata between plugins
         *
         * @example
         * ```js
         * export default function plugin (options = {}) {
         *   return function (tree) {
         *      tree.messages.push({
         *        type: 'dependency',
         *        file: 'path/to/dependency.html',
         *        from: tree.options.from
         *      })
         *
         *      return tree
         *   }
         * }
         * ```
         */
        this.messages = [];
    }

    /**
     * @param   plugin - A PostHTML plugin
     * @returns this(PostHTML)
     *
     * **Usage**
     * ```js
     * ph.use((tree) => { tag: 'div', content: tree })
     *   .process('<html>..</html>', {})
     *   .then((result) => result))
     * ```
     */
    use(...plugins: Array<(...things: none[]) => none>): PostHTML {
        this.plugins.push(...plugins);
        return this;
    }

    /**
     * @param   html - Input (HTML)
     * @param   options - PostHTML Options
     * @returns {Object<{html: String, tree: PostHTMLTree}>} - Sync Mode
     * @returns {Promise<{html: String, tree: PostHTMLTree}>} - Async Mode (default)
     *
     * **Usage**
     *
     * **Sync**
     * ```js
     * ph.process('<html>..</html>', { sync: true }).html
     * ```
     *
     * **Async**
     * ```js
     * ph.process('<html>..</html>', {}).then((result) => result))
     * ```
     */
    process(tree: string, options: { sync: true }): LazyResult;
    process(tree: string, options: { sync?: false }): Promise<LazyResult>;
    process(tree: string, options: none) {
        /**
         * ## PostHTML Options
         *
         * @type {Object}
         * @prop {?Boolean} options.sync - enables sync mode, plugins will run synchronously, throws an error when used with async plugins
         * @prop {?Function} options.parser - use custom parser, replaces default (posthtml-parser)
         * @prop {?Function} options.render - use custom render, replaces default (posthtml-render)
         * @prop {?Boolean} options.skipParse - disable parsing
         */
        options = this.options = options || {};

        if (options.parser) parser = options.parser;
        if (options.render) render = options.render;

        tree = options.skipParse
            ? tree || []
            : parser(tree, options);

        // sync mode
        if (options.sync === true) {
            this.plugins.forEach(function(plugin, index) {
                _treeExtendApi(tree, this);

                let result;

                if (plugin.length === 2 || isPromise(result = plugin(tree))) {
                    throw new Error(
                        'Can’t process contents in sync mode because of async plugin: ' + plugin.name
                    );
                }

                // clearing the tree of options
                if (index !== this.plugins.length - 1 && !options.skipParse) {
                    tree = [].concat(tree);
                }

                // return the previous tree unless result is fulfilled
                tree = result || tree;
            }.bind(this));

            return lazyResult(render, tree);
        }

        // async mode
        let i = 0;

        const next = (result, cb) => {
            _treeExtendApi(result, this);

            // all plugins called
            if (this.plugins.length <= i) {
                cb(null, result);
                return;
            }

            // little helper to go to the next iteration
            function _next(res) {
                if (res && !options.skipParse) {
                    res = [].concat(res);
                }

                return next(res || result, cb);
            }

            // call next
            const plugin = this.plugins[i++];

            if (plugin.length === 2) {
                plugin(result, (err, res) => {
                    if (err) return cb(err);
                    _next(res);
                });
                return;
            }

            // sync and promised plugins
            let err = null;

            const res = tryCatch(() => plugin(result), (e) => {
                err = e;
                return e;
            });

            if (err) {
                cb(err);
                return;
            }

            if (isPromise(res)) {
                res.then(_next).catch(cb);
                return;
            }

            _next(res);
        };

        return new Promise<LazyResult>((resolve, reject) => {
            next(tree, (err, tree) => {
                if (err) reject(err);
                else resolve(lazyResult(render, tree));
            });
        });
    }
}

/**
 * @param  plugins
 * @return posthtml
 *
 * **Usage**
 * ```js
 * import posthtml from 'posthtml'
 * import plugin from 'posthtml-plugin'
 *
 * const ph = posthtml([ plugin() ])
 * ```
 */
export default function posthtml(plugins: Array<(...things: none[]) => none>): PostHTML {
    return new PostHTML(plugins);
}

/**
 * Extension of options tree
 *
 * @private
 *
 * @param   {Array}    tree
 * @param   {Object}   PostHTML
 * @returns {?*}
 */
function _treeExtendApi(t, _t) {
    if (typeof t === 'object') {
        t = objectAssign(t, _t);
    }
}

/**
 * Checks if parameter is a Promise (or thenable) object.
 *
 * @private
 *
 * @param   promise - Target `{}` to test
 * @returns
 */
function isPromise<T>(promise: any): promise is Promise<T> {
    return !!promise && typeof promise.then === 'function';
}

/**
 * Simple try/catch helper, if exists, returns result
 *
 * @private
 *
 * @param   tryFn - try block
 * @param   catchFn - catch block
 * @returns
 */
function tryCatch<T>(tryFn: () => T, catchFn: (err: any) => void): T {
    try {
        return tryFn();
    } catch (err) {
        catchFn(err);
    }
}

interface LazyResult {
    readonly html: string;
    tree: none;
    messages: none[];
}

/**
 * Wraps the PostHTMLTree within an object using a getter to render HTML on demand.
 *
 * @private
 *
 * @param   {Function} render
 * @param   {Array}    tree
 * @returns
 */
function lazyResult(render: (...args: none[]) => none, tree: none): LazyResult {
    return {
        get html() {
            return render(tree, tree.options);
        },
        tree,
        messages: tree.messages
    };
}
