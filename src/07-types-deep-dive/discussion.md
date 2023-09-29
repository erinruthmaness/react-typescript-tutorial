What's the difference between React.ComponentType and React.FC?
`type React.ComponentType<P = {}> = React.ComponentClass<P, any> | React.FunctionComponent<P>`
`type React.FC<P = {}> = React.FunctionComponent<P>`
React.ComponentType works on class components too

Do you think it's safe to be editing things in the global namespace?
absolutely not, no, and I didn't even want to do it for the sake of this lesson thanks

Can you do declaration merging with types? Or is it only interfaces?
only interfaces - types overwrite each other I think

What are some uses for `declare global` outside of React?
custom types in a workspace/project

Should you be putting your global namespace alterations in a `.d.ts` file, or inside normal `.ts` files?
I don't know... did we cover that?
[this youTuber says...](https://www.youtube.com/watch?v=zu-EgnbmcLY)
- in `.tsconfig`, `skillLibCheck` skips typechecking on all `.d.ts` files (which saves a bunch of time)
- they can't contain runtime features 
- they aren't modules contain your types
- they put things into the global scope
- "If you do want to do global alterations to scope, then by all means do a `.d.ts` file." gotcha
[this TS author says...](https://github.com/microsoft/TypeScript/issues/52593#issuecomment-1419505081)
- a `.d.ts` file implies the existence of a corresponding `.js` file
- it doesn’t copy into `outDir`
so... yes? seems like a good idea to keep global namespace alterations together, and it's not something that would be needed at runtime

What cool API's would be possible if you could strongly type children?
- things that count as "compositional" by JR standards, like this one only accepting the right children:
```
<TabList>
    <Tab />
    <Tab />
    <Tab />
</TabList>
```

What are some use cases for `React.ReactElement`? Is it even useful?
sure, in cases where you'd use `JSX.Element`, which is apparently the same thing - i.e. when you want to specify an element, not a string or number or any of the other `React.ReactNode` members(?)