import React from "react";

/**
 * Questions to answer:
 */

// 1. What is the React namespace?
type Example = React.ReactNode;
//             ^?

/**
 * 2. How come React can be used BOTH as a value and a type?
 *
 * HINT - we're adding LOTS of things to React's namespace in
 * later exercises, so make sure when you go-to-definition you
 * go to its original definition, in @types/react/index.d.ts.
 */
const element = React.createElement("div");
//              ^?

export {};

/*

in the index.d.ts file:

// eslint-disable-next-line export-just-namespace
export = React; //"all of the stuff in namespace React gets put into the export, and we can use the namespace as a value"
export as namespace React; //"make this available globally"

*/