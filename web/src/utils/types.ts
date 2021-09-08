import { Mother, Father, Children } from "../generated/graphql";

export type AlertTypes = "info" | "warning" | "success" | "error";
export type ParentTypes = "mother" | "father";
export type DrawerTypes =
  | (string & {})
  | "sm"
  | "xs"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "6xl"
  | "full";
export type ParentDataTypes =
  | ({
      __typename?: "Mother";
    } & {
      __typename?: "Mother";
    } & Pick<
        Mother,
        | "Id"
        | "Name"
        | "Surname"
        | "createdAt"
        | "updatedAt"
        | "Email"
        | "Phone"
      >)
  | ({
      __typename?: "Father";
    } & {
      __typename?: "Father";
    } & Pick<
        Father,
        | "Id"
        | "Name"
        | "Surname"
        | "createdAt"
        | "updatedAt"
        | "Email"
        | "Phone"
      >);
export type ChildDataType = {
  __typename?: "Children";
} & {
  __typename?: "Children";
} & Pick<
    Children,
    | "Id"
    | "Name"
    | "Surname"
    | "Gender"
    | "BirthDate"
    | "OIB"
    | "Remarks"
    | "motherId"
    | "fatherId"
    | "createdAt"
    | "updatedAt"
  > & {
    mother?: {
      __typename?: "Mother";
    } & {
      __typename?: "Mother";
    } & Pick<
        Mother,
        | "Id"
        | "Name"
        | "Surname"
        | "createdAt"
        | "updatedAt"
        | "Email"
        | "Phone"
      >;
  };
