/**
 * 1. How does React know which HTML attributes can be passed
 * to each HTML element?
 *
 * On which interfaces/types are they stored?
 */

/**
 * 2. Try CMD-clicking on the 'div' below. What information
 * does that give you?
 */
<div />;
//React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

/**
 * 3. Try CMD-clicking on the className prop below. What
 * interface does it lead you to?
 */
<div className="foo" />;
// interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
//     className?: string | undefined;
// }

/**
 * 4. Finally, try CMD-clicking on the 'href' prop below.
 * What interface does it lead you to?
 */
<a href="/" />;
// interface AnchorHTMLAttributes<T> extends HTMLAttributes<T> {
//     href?: string | undefined;
// }
