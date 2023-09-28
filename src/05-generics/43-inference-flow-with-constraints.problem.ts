import { createUser } from "fake-external-lib";
import { useState } from "react";
import { Equal, Expect } from "../helpers/type-utils";

//taking the args and the returns separately avoids having to compare a function (i.e. <T>) to another function
//which is a thing TS doesn't care for
type Mutation<TArgs extends any[], TReturn> = (...args: TArgs) => Promise<TReturn>;

interface UseMutationReturn<TArgs extends any[], TReturn> {
  mutate: Mutation<TArgs, TReturn>;
  isLoading: boolean;
}

interface UseMutationOptions<TArgs extends any[], TReturn> {
  mutation: Mutation<TArgs, TReturn>;
}

/** 
 * takes a mutation in its options, then returns a mutate function 
 * it should only take the same arguments as the thing it's mutating
 * */
export const useMutation = <TArgs extends any[], TReturn>(opts: UseMutationOptions<TArgs, TReturn>): UseMutationReturn<TArgs, TReturn> => {
  const [isLoading, setIsLoading] = useState(false);

  return {
    mutate: async (...args) => {
      setIsLoading(true);

      try {
        const result = await opts.mutation(...args);
        return result;
      } catch (e) {
        throw e;
      } finally {
        setIsLoading(false);
      }
    },
    isLoading,
  };
};

/** 
 * createUser takes a name & email as one arg, then an optional "opts" arg 
 * returns a Promise with id, name, and email - kind of a POST
 * */
const mutateUser = useMutation({
  mutation: createUser,
});

mutateUser.mutate({ name: "John Doe", email: "john@doe.com" });

// @ts-expect-error email missing!
mutateUser.mutate({ name: "John Doe" });

mutateUser.mutate(
  {
    name: "John Doe",
    email: "john@doe.com",
  },
  {
    throwOnError: true,
    // @ts-expect-error extra prop
    extra: "oh dear",
  },
);

//this is the full type of what mutateUser should be
type test = [
  Expect<Equal<typeof mutateUser.isLoading, boolean>>,
  Expect<
    Equal<
      typeof mutateUser.mutate,
      (
        user: { name: string; email: string; },
        opts?: {
          throwOnError?: boolean;
        },
      ) => Promise<{
        id: string;
        name: string;
        email: string;
      }>
    >
  >,
];
