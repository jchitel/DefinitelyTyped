import { PostHTMLParsedTree, PostHTMLTreeNode } from 'posthtml-parser';
import { PostHTMLMatchExpression } from '.';


/**
 * This class is meant to be used in an abstract way.
 * It exposes the walk() and match() methods on instances of subclasses.
 */
export default class Api {
    /**
     * Walks the tree. The provided callback will be called with every node of the tree.
     * If a value is returned from the callback, it will replace the node at that position.
     * The tree is returned.
     */
    walk(cb: (node: PostHTMLTreeNode | string) => PostHTMLTreeNode | string | undefined): PostHTMLParsedTree;

    /**
     * Walks the tree, only invoking the callback for nodes that match the provided expression.
     * If a value is returned from the callback, it will replace the node at that position.
     * The tree is returned.
     */
    match(cb: (node: PostHTMLTreeNode | string) => PostHTMLTreeNode | string | undefined): PostHTMLParsedTree;
}

/**
 * Walks the tree. The provided callback will be called with every node of the tree.
 * If a value is returned from the callback, it will replace the node at that position.
 * The tree is returned.
 * 
 * This function must be bound to a PostHTMLTree to work properly.
 */
export function walk(this: PostHTMLParsedTree, cb: (node: PostHTMLTreeNode | string) => PostHTMLTreeNode | string | undefined): PostHTMLParsedTree;

/**
 * Walks the tree, only invoking the callback for nodes that match the provided expression.
     * If a value is returned from the callback, it will replace the node at that position.
     * The tree is returned.
 * 
 * This function must be bound to a PostHTMLTree to work properly.
 */
export function match(this: PostHTMLParsedTree, expression: PostHTMLMatchExpression, cb: (node: PostHTMLTreeNode | string) => PostHTMLTreeNode | string | undefined): PostHTMLParsedTree;
