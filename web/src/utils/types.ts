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

export type OwnerType = {
  __typename?: "User";
  Id: number;
  Name: string;
  Surname: string;
  Email: string;
  createdAt: string;
  updatedAt: string;
  staffOf?: {
    __typename?: "StaffMembers";
    kindergarden?: {
      __typename?: "KinderGarden";
      Id: number;
      Name: string;
      City: string;
      Address: string;
      Zipcode: number;
    };
  }[];
};

export type ChildrennotinGrouptype = {
  __typename?: "Children";
  Id: number;
  Name: string;
  Surname: string;
  Gender: string;
  BirthDate?: any;
  OIB: number;
  Remarks: string;
  motherId?: number;
  fatherId?: number;
  createdAt: any;
  updatedAt: any;
  createdBy?: {
    __typename?: "User";
    Id: number;
    Name: string;
    Surname: string;
    Email: string;
    Role: string;
    createdAt: string;
    updatedAt: string;
    partof?: {
      __typename?: "KinderGarden";
      Id: number;
      Name: string;
      City: string;
      Address: string;
      Zipcode: number;
    }[];
  };
  updatedBy?: {
    __typename?: "User";
    Id: number;
    Name: string;
    Surname: string;
    Email: string;
    Role: string;
    createdAt: string;
    updatedAt: string;
    partof?: {
      __typename?: "KinderGarden";
      Id: number;
      Name: string;
      City: string;
      Address: string;
      Zipcode: number;
    }[];
  };
  mother?: {
    __typename?: "Mother";
    Id: number;
    Name: string;
    Surname: string;
    Email: string;
    Phone: number;
    createdAt: string;
    updatedAt: string;
    createdBy?: {
      __typename?: "User";
      Id: number;
      Name: string;
      Surname: string;
      Email: string;
      Role: string;
      createdAt: string;
      updatedAt: string;
      partof?: {
        __typename?: "KinderGarden";
        Id: number;
        Name: string;
        City: string;
        Address: string;
        Zipcode: number;
      }[];
    };
    updatedBy?: {
      __typename?: "User";
      Id: number;
      Name: string;
      Surname: string;
      Email: string;
      Role: string;
      createdAt: string;
      updatedAt: string;
      partof?: {
        __typename?: "KinderGarden";
        Id: number;
        Name: string;
        City: string;
        Address: string;
        Zipcode: number;
      }[];
    };
  };
  father?: {
    __typename?: "Father";
    Id: number;
    Name: string;
    Surname: string;
    Email: string;
    Phone: number;
    createdAt: string;
    updatedAt: string;
    createdBy?: {
      __typename?: "User";
      Id: number;
      Name: string;
      Surname: string;
      Email: string;
      Role: string;
      createdAt: string;
      updatedAt: string;
      partof?: {
        __typename?: "KinderGarden";
        Id: number;
        Name: string;
        City: string;
        Address: string;
        Zipcode: number;
      }[];
    };
    updatedBy?: {
      __typename?: "User";
      Id: number;
      Name: string;
      Surname: string;
      Email: string;
      Role: string;
      createdAt: string;
      updatedAt: string;
      partof?: {
        __typename?: "KinderGarden";
        Id: number;
        Name: string;
        City: string;
        Address: string;
        Zipcode: number;
      }[];
    };
  };
}[];
