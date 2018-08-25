// Type definitions for ansi-to-html 0.6
// Project: https://github.com/rburns/ansi-to-html#readme
// Definitions by: Jake Chitel <https://github.com/jchitel>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

export interface ConvertOptions {
    /** The default foreground color (any valid CSS color) used when reset color codes are encountered (default white) */
    fg?: string;
    /** The default background color (any valid CSS color) used when reset color codes are encountered (default black) */
    bg?: string;
    /** Convert newline characters to `<br/>` (default false) */
    newline?: boolean;
    /** Generate HTML/XML entities (default false) */
    escapeXML?: boolean;
    /** Save style state across invocations of toHtml() (default false) */
    stream?: boolean;
    /** Can override specific colors or the entire ANSI palette (Object/Array with values 0 - 255 containing CSS color values) */
    colors?: { [index: number]: string } | string[];
}

/**
 * Converts ANSI encoded strings to corresponding HTML.
 * This will save the provided options across calls,
 * and if the `stream` option is set, will also preserve
 * the style state between calls to toHtml().
 */
export default class Convert {
    constructor(options: ConvertOptions);

    /** Performs a converstion for an ANSI encoded string, returning an equivalent HTML string */
    toHtml(input: string | string[]): string;
}
