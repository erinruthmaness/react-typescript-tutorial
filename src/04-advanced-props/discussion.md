What's the most common issue you see with the way declare prop types in React?
it's either weirdly verbose or you have to sacrifice the hover preview being helpful 

Have you used a discriminated union before? If so, what was your use case?
yup - icons that took a `backgroundSize` and `iconSize` prop, but could only accept a limited range of one based on what the other was
(i.e. you wouldn't want a teeny icon in a massive background, and you wouldn't want an icon bigger than the background)

What problems could you imagine solving with discriminated unions that AREN'T related to React?
my life is React at the moment... 

What use cases have you seen for the `satisfies` operator?
types that hardcode one value from a union type as one of their properties, ig

What's the strangest type error you've ever seen in a React app?
I've had to use `HTMLElement` instead of `HTMLDivElement` before to satisfy some error - hard to think of anything more specific given that
this course is shedding a lot of light on a lot of things I've misunderstood