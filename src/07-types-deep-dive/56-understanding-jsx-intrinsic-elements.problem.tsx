/**
 * 1. What is JSX.IntrinsicElements? CMD-click on .IntrinsicElements below
 * to go to its definition.
 * basically shortcuts to types of all the HTML elements and a bunch of svg related content
 *
 * Hint - remember to go to the original definition of JSX.IntrinsicElements
 * in @types/react/index.d.ts.
 */

export type Example = JSX.IntrinsicElements;

/**
 * 2. What is the structure of JSX.IntrinsicElements? It appears to have the
 * HTML attributes as properties, but what are the values?
 *  React.DetailedHTMLProps<React.AnchorHTMLAttributes<{insert HTML_Element here}>, {insert HTML_Element here}>;
 *
 * 3. Let's have some fun. Edit the file to add a new property to
 * JSX.IntrinsicElements:
 *
 * interface IntrinsicElements {
 *   // ...
 *   myNewElement: {
 *     foo: string;
 *   }
 * }
 *
 * Notice that the error below goes away!
 *
 * 4. Now change it back, before anyone notices.
 * tbh I wasn't even willing to change it at all bc I'm a coward
 */
//@ts-expect-error
<myNewElement foo="123" />;
