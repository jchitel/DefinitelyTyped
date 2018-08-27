import { PostHTMLParsedTree, PostHTMLTreeNode, ParserOptions } from 'posthtml-parser';
import { RenderOptions } from 'posthtml-render';
import Api from './api';


export type PostHTMLSyncPlugin = (tree: PostHTMLTree) => PostHTMLTree | undefined;
export type PostHTMLCallbackPlugin = (tree: PostHTMLTree, cb: (err: any, tree?: PostHTMLTree) => void) => void;
export type PostHTMLPromisePlugin = (tree: PostHTMLTree) => Promise<PostHTMLTree | undefined>;
/**
 * PostHTML plugins receive the parsed HTML tree structure, and do one of three things:
 * - return a new tree, which will replace the internal tree that will be returned by the processor
 * - return undefined, which will keep the tree that was passed to the plugin
 * - throw an error, which will be propagated to the caller of the processor
 * They can be one of three types:
 * - synchronous: returns the result synchronously
 * - callback (sync or async): expects a callback, which will be called with either an error or a result
 * - promise: returns a promise which will resolve with the result
 */
export type PostHTMLPlugin = PostHTMLSyncPlugin | PostHTMLCallbackPlugin | PostHTMLPromisePlugin;

interface PostHTMLBaseOptions extends ParserOptions, RenderOptions {
    /** A parser to replace the default one provided by 'posthtml-parser' */
    parser?: (html: string, options?: ParserOptions) => PostHTMLParsedTree;
    /** A renderer to replace the default one provided by 'posthtml-render' */
    render?: (tree: PostHTMLParsedTree, options?: RenderOptions) => string;
    /** If true, the parser will not be called, and the tree will be processed as-is */
    skipParse?: boolean;
}

/**
 * Options for a synchronous process. Any asynchronous plugins will
 * cause an error to be thrown.
 */
export interface PostHTMLSyncOptions extends PostHTMLBaseOptions {
    /** Specifies that the operation should be done synchronously */
    sync: true;
}

/**
 * Options for an asynchronous process (default). Any plugin types are accepted.
 */
export interface PostHTMLAsyncOptions extends PostHTMLBaseOptions {
    /** Specifies that the operation should be done asynchronously, returning a promise */
    sync?: false;
}

/**
 * Allowable types to be passed to tree.match():
 * - string: matches on text content
 * - RegExp: matches on text content
 * - Partial<PostHTMLTreeNode>: matches on node properties (tag, attrs, content)
 * - array: treated as a union; any item that matches will be a match
 */
export type PostHTMLMatchExpression = string | RegExp | Partial<PostHTMLTreeNode> | Array<string | RegExp | Partial<PostHTMLTreeNode>>;

/**
 * Resulting tree structure of PostHTML processing
 */
export interface PostHTMLTree extends PostHTMLParsedTree, Api {}

export interface PostHTMLResult {
    /** A lazy property that will render the tree to a string. This will not preserve the result. */
    readonly html: string;
    /** The resulting parsed and processed tree structure. */
    tree: PostHTMLTree;
    /** Any messages attached to the tree by plugins. */
    messages: any[];
}

/**
 * A PostHTML processor instance.
 */
export interface PostHTML {
    /** The version of PostHTML used to create this instance */
    version: string;
    /** The name of the PostHTML package used to create this instance */
    name: string;

    /**
     * Adds plugins to this instance, returning itself.
     */
    use(...plugins: PostHTMLPlugin[]): PostHTML;

    /**
     * Synchronously processes the provided HTML. Asynchronous plugins will throw an error.
     * @param tree If options.skipParse is specified, this should be an already-parsed tree structure. Otherwise, this should be a valid HTML string.
     * @param options Options used for processing.
     */
    process(tree: string | PostHTMLParsedTree, options: PostHTMLSyncOptions): PostHTMLResult;
    /**
     * Asynchronously processes the provided HTML. Any type of plugin is allowed.
     * @param tree If options.skipParse is specified, this should be an already-parsed tree structure. Otherwise, this should be a valid HTML string.
     * @param options Options used for processing.
     */
    process(tree: string | PostHTMLParsedTree, options: PostHTMLAsyncOptions): Promise<PostHTMLResult>;
}

/**
 * Constructs a PostHTML instance using the provided plugins.
 */
export default function posthtml(plugins?: PostHTMLPlugin[]): PostHTML;
