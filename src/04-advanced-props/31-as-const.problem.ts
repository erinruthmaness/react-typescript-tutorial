import { Equal, Expect } from "../helpers/type-utils";

const BACKEND_TO_FRONTEND_STATUS_MAP = {
  0: "pending",
  1: "success",
  2: "error",
} as const; //technically works the same as Object.freeze, but this is a type-only
//method whereas Object.freeze is at runtime

type BackendStatusMap = typeof BACKEND_TO_FRONTEND_STATUS_MAP; //just added this step for clarity

type BackendStatus = keyof BackendStatusMap;
type FrontendStatus = BackendStatusMap[BackendStatus]; //indexed access type

type test = [
  Expect<Equal<BackendStatus, 0 | 1 | 2>>,
  Expect<Equal<FrontendStatus, "pending" | "success" | "error">>
];
