// Type definitions for grapheme-breaker 0.3
// Project: https://github.com/devongovett/grapheme-breaker
// Definitions by: Jake Chitel <https://github.com/jchitel>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/**
 * Returns the next grapheme break in the string after the given index
 * @param str string to scan
 * @param index starting index to check (default: 0)
 */
export function nextBreak(str: string, index?: number): number;

/**
 * Returns the next grapheme break in the string before the given index
 * @param str string to scan
 * @param index starting index to scan, non-inclusive (default: string.length)
 */
export function previousBreak(str: string, index?: number): number;

/**
 * Breaks the given string into an array of grapheme cluster strings
 * @param str string to break
 */
declare function _break(str: string): string[];
export { _break as break };

/**
 * Returns the number of grapheme clusters there are in the given string
 * @param str string to scan
 */
export function countBreaks(str: string): number;
