// Type definitions for posthtml-parser 0.4
// Project: https://github.com/posthtml/posthtml-parser#readme
// Definitions by: Jake Chitel <https://github.com/jchitel>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

import { Options } from 'htmlparser2';

/**
 * The default options passed to the internal htmlparser2 Parser.
 * This object can be modified to change the default options.
 */
export const defaultOptions: ParserOptions;

/**
 * The default set of HTML directives ("declarations" and "processing instructions") parsed from the document.
 * Only directives included in this array will be included in the resulting tree.
 * By default, this only includes the "DOCTYPE" declaration.
 * This array can be modified to change the default directives.
 */
export const defaultDirectives: Directive[];

/**
 * An HTML directive configuration for the 'defaultDirectives' array, or the 'directives' option.
 */
export interface Directive {
    /**
     * Used to match parsed directives. If this is a string, the parsed directive name must exactly match.
     * If this is a RegExp, the parse directive name must match the provided expression (case insensitivity is forced).
     * The parsed names come in the form "!{name}" (for a declaration) or "?{name}" (for an instruction).
     */
    name: string | RegExp;
    /**
     * The string used to prefix the content of the directive in the output.
     * This should match the prefix of the actual directive in the source.
     * For example, in a DOCTYPE declaration, the start will be '<'.
     */
    start: string;
    /**
     * The string used to suffix the content of the directive in the output.
     * This should match the suffic of the actual directive in the source.
     * For example, in a DOCTYPE declaration, the end will be '>'.
     */
    end: string;
}

/**
 * Options to be provided to the underlying htmlparser2 Parser.
 * These options also include an optional array of directives
 * used to control the directives included in the results.
 * See Directive for more information.
 */
export interface ParserOptions extends Options {
    directives?: Directive[];
}

/**
 * A single HTML node in a PostHTMLTree result.
 */
export interface PostHTMLTreeNode {
    /** The tag name of this node. */
    tag: string;
    /** The set of attributes of this node. If there are no attributes, this will be undefined. */
    attrs?: { [type: string]: string };
    /** The children of this node. If there are no children, this will be an empty array. */
    content: PostHTMLParsedTree;
}

/**
 * A parsed HTML tree.
 * Because HTML documents can have multiple root elements, this is an array.
 */
export interface PostHTMLParsedTree extends Array<string | PostHTMLTreeNode> {}

/**
 * Creates a parser function utilizing the provided options.
 * @param options Options to use for parsing.
 */
export default function parser(options: ParserOptions): (html: string) => PostHTMLParsedTree;

/**
 * Parses an HTML string using the provided options.
 * @param html HTML string to parse.
 * @param options Options to use for parsing.
 */
export default function parser(html: string, options?: ParserOptions): PostHTMLParsedTree;
