// Type definitions for posthtml-render 1.1
// Project: https://github.com/posthtml/posthtml-render#readme
// Definitions by: Jake Chitel <https://github.com/jchitel>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

import { PostHTMLTree } from '../posthtml-parser';

export interface RenderOptions {
    /**
     * Array of explicit strings or RegExps that match tags that should be rendered as self-closing elements.
     * These will be included in addition to the standard set of self-closing elements:
     * - area
     * - base
     * - br
     * - col
     * - command
     * - embed
     * - hr
     * - img
     * - input
     * - keygen
     * - link
     * - menuitem
     * - meta
     * - param
     * - source
     * - track
     * - wbr
     * - import (custom from PostHTML)
     * - include (custom from PostHTML)
     * - extend (custom from PostHTML)
     */
    singleTags?: Array<string | RegExp>;
    /**
     * Format to use for rendering self-closing tags:
     * - tag: use a closing tag instead of rendering as a self-closing tag (`<br></br>`)
     * - slash: render as an XML self-closing tag (`<br />`)
     * - default: render as an HTML standard self-closing tag, as just an opening tag (`<br>`)
     */
    closingSingleTag?: 'tag' | 'slash';
}
/**
 * Renders a parsed PostHTML tree structure to a standard HTML string
 * @param tree A parsed PostHTML tree structure
 * @param options A set of options to use for rendering
 */
export default function render(tree: PostHTMLTree, options?: RenderOptions): string;
