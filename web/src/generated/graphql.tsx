import gql from "graphql-tag";
import * as Urql from "urql";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Children = {
  __typename?: "Children";
  BirthDate?: Maybe<Scalars["DateTime"]>;
  Gender: Scalars["String"];
  Id: Scalars["Float"];
  Name: Scalars["String"];
  OIB: Scalars["Float"];
  Remarks: Scalars["String"];
  Surname: Scalars["String"];
  createdAt: Scalars["DateTime"];
  createdBy?: Maybe<User>;
  createdById?: Maybe<Scalars["Float"]>;
  father?: Maybe<Father>;
  fatherId?: Maybe<Scalars["Float"]>;
  inGroup?: Maybe<Groups>;
  mother?: Maybe<Mother>;
  motherId?: Maybe<Scalars["Float"]>;
  updatedAt: Scalars["DateTime"];
  updatedBy?: Maybe<User>;
  updatedById?: Maybe<Scalars["Float"]>;
};

export type ChildrenInput = {
  BirthDate: Scalars["DateTime"];
  Gender: Scalars["String"];
  Name: Scalars["String"];
  OIB: Scalars["Float"];
  Remarks: Scalars["String"];
  Surname: Scalars["String"];
  father?: Maybe<Scalars["Float"]>;
  mother?: Maybe<Scalars["Float"]>;
};

export type ChildrenResponse = {
  __typename?: "ChildrenResponse";
  children?: Maybe<Children>;
  errors?: Maybe<Array<FieldError>>;
};

export type ContactInput = {
  email: Scalars["String"];
  message: Scalars["String"];
  subject: Scalars["String"];
};

export type Father = {
  __typename?: "Father";
  Email: Scalars["String"];
  Id: Scalars["Float"];
  Name: Scalars["String"];
  Phone: Scalars["Float"];
  Surname: Scalars["String"];
  createdAt: Scalars["DateTime"];
  createdBy?: Maybe<User>;
  updatedAt: Scalars["DateTime"];
  updatedBy?: Maybe<User>;
};

export type FieldError = {
  __typename?: "FieldError";
  field: Scalars["String"];
  message: Scalars["String"];
};

export type Groups = {
  __typename?: "Groups";
  Id: Scalars["Float"];
  Name: Scalars["String"];
  children?: Maybe<Array<Children>>;
  createdAt: Scalars["String"];
  inKindergarden?: Maybe<KinderGarden>;
  updatedAt: Scalars["String"];
};

export type GroupsResponse = {
  __typename?: "GroupsResponse";
  errors?: Maybe<Array<FieldError>>;
  groups?: Maybe<Groups>;
};

export type KinderGarden = {
  __typename?: "KinderGarden";
  Address: Scalars["String"];
  City: Scalars["String"];
  Id: Scalars["Float"];
  Name: Scalars["String"];
  Zipcode: Scalars["Float"];
  createdAt: Scalars["String"];
  groups?: Maybe<Array<Groups>>;
  owning?: Maybe<User>;
  staff?: Maybe<Array<StaffMembers>>;
  updatedAt: Scalars["String"];
};

export type KinderGardenInput = {
  Zipcode: Scalars["Float"];
  address: Scalars["String"];
  city: Scalars["String"];
  name: Scalars["String"];
};

export type KindergardenResponse = {
  __typename?: "KindergardenResponse";
  errors?: Maybe<Array<FieldError>>;
  kindergarden?: Maybe<KinderGarden>;
};

export type Mother = {
  __typename?: "Mother";
  Email: Scalars["String"];
  Id: Scalars["Float"];
  Name: Scalars["String"];
  Phone: Scalars["Float"];
  Surname: Scalars["String"];
  createdAt: Scalars["DateTime"];
  createdBy?: Maybe<User>;
  updatedAt: Scalars["DateTime"];
  updatedBy?: Maybe<User>;
};

export type Mutation = {
  __typename?: "Mutation";
  addChildToGroup?: Maybe<Children>;
  addFather: Father;
  addMother: Mother;
  addStaff: StaffResponse;
  changePassword: UserResponse;
  clearGroup: Scalars["Boolean"];
  clearKindergarden: Scalars["Boolean"];
  createChild: Children;
  createGroup: GroupsResponse;
  createKindergarden: KindergardenResponse;
  deleteChildren: Scalars["Boolean"];
  deleteFather: Scalars["Boolean"];
  deleteGroup: Scalars["Boolean"];
  deleteKindergarden: Scalars["Boolean"];
  deleteMother: Scalars["Boolean"];
  deleteStaff: Scalars["Boolean"];
  forgetPassword: Scalars["Boolean"];
  login: UserResponse;
  logout: Scalars["Boolean"];
  register: UserResponse;
  removeChildFromGroup?: Maybe<Children>;
  resendEmail: UserResponse;
  sendEmail: Scalars["Boolean"];
  updateChild?: Maybe<Children>;
  updateChildernParents: Children;
  updateFather: Father;
  updateMother: Mother;
  updatePassword: UserResponse;
  updateUser: UserResponse;
  useChildren: ChildrenResponse;
  useGroup: GroupsResponse;
  useKindergarden: KindergardenResponse;
  verifyAccount: UserResponse;
};

export type MutationAddChildToGroupArgs = {
  id: Scalars["Int"];
};

export type MutationAddFatherArgs = {
  options: ParentsInput;
};

export type MutationAddMotherArgs = {
  options: ParentsInput;
};

export type MutationAddStaffArgs = {
  role: Scalars["String"];
  userId: Scalars["Int"];
};

export type MutationChangePasswordArgs = {
  newPassword: Scalars["String"];
  repeatNewPassword: Scalars["String"];
  token: Scalars["String"];
};

export type MutationCreateChildArgs = {
  options: ChildrenInput;
};

export type MutationCreateGroupArgs = {
  name: Scalars["String"];
};

export type MutationCreateKindergardenArgs = {
  options: KinderGardenInput;
};

export type MutationDeleteChildrenArgs = {
  id: Scalars["Int"];
};

export type MutationDeleteFatherArgs = {
  fatherId: Scalars["Int"];
};

export type MutationDeleteGroupArgs = {
  id: Scalars["Int"];
};

export type MutationDeleteKindergardenArgs = {
  id: Scalars["Int"];
};

export type MutationDeleteMotherArgs = {
  motherId: Scalars["Int"];
};

export type MutationDeleteStaffArgs = {
  userId: Scalars["Int"];
};

export type MutationForgetPasswordArgs = {
  email: Scalars["String"];
};

export type MutationLoginArgs = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type MutationRegisterArgs = {
  options: UsernamePasswordInput;
};

export type MutationRemoveChildFromGroupArgs = {
  Id: Scalars["Int"];
};

export type MutationResendEmailArgs = {
  email: Scalars["String"];
};

export type MutationSendEmailArgs = {
  input: ContactInput;
};

export type MutationUpdateChildArgs = {
  kidId: Scalars["Int"];
  options: ChildrenInput;
};

export type MutationUpdateChildernParentsArgs = {
  fatherId?: Maybe<Scalars["Int"]>;
  kidId: Scalars["Int"];
  motherId?: Maybe<Scalars["Int"]>;
};

export type MutationUpdateFatherArgs = {
  fatherId: Scalars["Int"];
  options: ParentsInput;
};

export type MutationUpdateMotherArgs = {
  motherId: Scalars["Int"];
  options: ParentsInput;
};

export type MutationUpdatePasswordArgs = {
  options: UpdatePassword;
};

export type MutationUpdateUserArgs = {
  options: UpdateUserInput;
};

export type MutationUseGroupArgs = {
  groupId: Scalars["Float"];
};

export type MutationUseKindergardenArgs = {
  kindergadenID: Scalars["Float"];
};

export type MutationVerifyAccountArgs = {
  token: Scalars["String"];
};

export type PaginatedChildren = {
  __typename?: "PaginatedChildren";
  children: Array<Children>;
  hasMore: Scalars["Boolean"];
};

export type PaginatedFather = {
  __typename?: "PaginatedFather";
  father: Array<Father>;
  hasMore: Scalars["Boolean"];
};

export type PaginatedMother = {
  __typename?: "PaginatedMother";
  hasMore: Scalars["Boolean"];
  mother: Array<Mother>;
};

export type ParentsInput = {
  email: Scalars["String"];
  name: Scalars["String"];
  phone: Scalars["Float"];
  surname: Scalars["String"];
};

export type Query = {
  __typename?: "Query";
  filterFather: Array<Father>;
  filterMother: Array<Mother>;
  filterStaff?: Maybe<StaffMembers>;
  findChild?: Maybe<Children>;
  findFather: Father;
  findMother: Mother;
  hello: Scalars["String"];
  me?: Maybe<User>;
  owner: KinderGarden;
  searchFather: Array<Mother>;
  searchUser: Array<User>;
  selectedKindergarden?: Maybe<KinderGarden>;
  showChildren: Array<Children>;
  showChildrenFilterInGroup: PaginatedChildren;
  showChildrenFilterNoParents: Array<Children>;
  showChildrenFilterNotInGroup: PaginatedChildren;
  showFather: PaginatedFather;
  showGroups: Array<Groups>;
  showKindergarden: Array<KinderGarden>;
  showMother: PaginatedMother;
  showSelectedGroup?: Maybe<Groups>;
  showStaff: Array<StaffMembers>;
  staffOf: Array<User>;
};

export type QueryFilterFatherArgs = {
  text: Scalars["String"];
};

export type QueryFilterMotherArgs = {
  text: Scalars["String"];
};

export type QueryFindChildArgs = {
  id: Scalars["Int"];
};

export type QueryFindFatherArgs = {
  id: Scalars["Int"];
};

export type QueryFindMotherArgs = {
  id: Scalars["Int"];
};

export type QuerySearchFatherArgs = {
  text: Scalars["String"];
};

export type QuerySearchUserArgs = {
  text: Scalars["String"];
};

export type QueryShowChildrenArgs = {
  text: Scalars["String"];
};

export type QueryShowChildrenFilterInGroupArgs = {
  cursor?: Maybe<Scalars["String"]>;
  limit: Scalars["Int"];
};

export type QueryShowChildrenFilterNotInGroupArgs = {
  cursor?: Maybe<Scalars["String"]>;
  limit: Scalars["Int"];
};

export type QueryShowFatherArgs = {
  cursor?: Maybe<Scalars["String"]>;
  limit: Scalars["Int"];
};

export type QueryShowMotherArgs = {
  cursor?: Maybe<Scalars["String"]>;
  limit: Scalars["Int"];
};

export type StaffMembers = {
  __typename?: "StaffMembers";
  kindergarden?: Maybe<KinderGarden>;
  kindergardenId: Scalars["Float"];
  role: Scalars["String"];
  staff?: Maybe<User>;
  staffId: Scalars["Float"];
};

export type StaffResponse = {
  __typename?: "StaffResponse";
  errors?: Maybe<Array<FieldError>>;
  staff?: Maybe<StaffMembers>;
};

export type UpdatePassword = {
  password: Scalars["String"];
  repeatPassword: Scalars["String"];
};

export type UpdateUserInput = {
  email: Scalars["String"];
  name: Scalars["String"];
  password: Scalars["String"];
  surname: Scalars["String"];
};

export type User = {
  __typename?: "User";
  Email: Scalars["String"];
  Id: Scalars["Float"];
  Name: Scalars["String"];
  Surname: Scalars["String"];
  createdAt: Scalars["String"];
  createdChildren?: Maybe<Array<Children>>;
  createdFather?: Maybe<Array<Father>>;
  createdMother?: Maybe<Array<Mother>>;
  ownerOf: Array<KinderGarden>;
  staffOf?: Maybe<Array<StaffMembers>>;
  updatedAt: Scalars["String"];
  updatedChildren?: Maybe<Array<Children>>;
  updatedFather?: Maybe<Array<Father>>;
  updatedMother?: Maybe<Array<Mother>>;
};

export type UserResponse = {
  __typename?: "UserResponse";
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type UsernamePasswordInput = {
  email: Scalars["String"];
  name: Scalars["String"];
  password: Scalars["String"];
  repeatPassword: Scalars["String"];
  surname: Scalars["String"];
};

export type ChildrenFragmentFragment = {
  __typename?: "Children";
  Id: number;
  Name: string;
  Surname: string;
  Gender: string;
  BirthDate?: Maybe<any>;
  OIB: number;
  Remarks: string;
  motherId?: Maybe<number>;
  fatherId?: Maybe<number>;
  createdAt: any;
  updatedAt: any;
  createdBy?: Maybe<{
    __typename?: "User";
    Id: number;
    Name: string;
    Surname: string;
    Email: string;
    createdAt: string;
    updatedAt: string;
    staffOf?: Maybe<
      Array<{
        __typename?: "StaffMembers";
        role: string;
        kindergarden?: Maybe<{
          __typename?: "KinderGarden";
          Id: number;
          Name: string;
          City: string;
          Address: string;
          Zipcode: number;
        }>;
      }>
    >;
  }>;
  updatedBy?: Maybe<{
    __typename?: "User";
    Id: number;
    Name: string;
    Surname: string;
    Email: string;
    createdAt: string;
    updatedAt: string;
    staffOf?: Maybe<
      Array<{
        __typename?: "StaffMembers";
        role: string;
        kindergarden?: Maybe<{
          __typename?: "KinderGarden";
          Id: number;
          Name: string;
          City: string;
          Address: string;
          Zipcode: number;
        }>;
      }>
    >;
  }>;
  mother?: Maybe<{
    __typename?: "Mother";
    Id: number;
    Name: string;
    Surname: string;
    Email: string;
    Phone: number;
    createdAt: any;
    updatedAt: any;
    createdBy?: Maybe<{
      __typename?: "User";
      Id: number;
      Name: string;
      Surname: string;
      Email: string;
      createdAt: string;
      updatedAt: string;
      staffOf?: Maybe<
        Array<{
          __typename?: "StaffMembers";
          role: string;
          kindergarden?: Maybe<{
            __typename?: "KinderGarden";
            Id: number;
            Name: string;
            City: string;
            Address: string;
            Zipcode: number;
          }>;
        }>
      >;
    }>;
    updatedBy?: Maybe<{
      __typename?: "User";
      Id: number;
      Name: string;
      Surname: string;
      Email: string;
      createdAt: string;
      updatedAt: string;
      staffOf?: Maybe<
        Array<{
          __typename?: "StaffMembers";
          role: string;
          kindergarden?: Maybe<{
            __typename?: "KinderGarden";
            Id: number;
            Name: string;
            City: string;
            Address: string;
            Zipcode: number;
          }>;
        }>
      >;
    }>;
  }>;
  father?: Maybe<{
    __typename?: "Father";
    Id: number;
    Name: string;
    Surname: string;
    Email: string;
    Phone: number;
    createdAt: any;
    updatedAt: any;
    createdBy?: Maybe<{
      __typename?: "User";
      Id: number;
      Name: string;
      Surname: string;
      Email: string;
      createdAt: string;
      updatedAt: string;
      staffOf?: Maybe<
        Array<{
          __typename?: "StaffMembers";
          role: string;
          kindergarden?: Maybe<{
            __typename?: "KinderGarden";
            Id: number;
            Name: string;
            City: string;
            Address: string;
            Zipcode: number;
          }>;
        }>
      >;
    }>;
    updatedBy?: Maybe<{
      __typename?: "User";
      Id: number;
      Name: string;
      Surname: string;
      Email: string;
      createdAt: string;
      updatedAt: string;
      staffOf?: Maybe<
        Array<{
          __typename?: "StaffMembers";
          role: string;
          kindergarden?: Maybe<{
            __typename?: "KinderGarden";
            Id: number;
            Name: string;
            City: string;
            Address: string;
            Zipcode: number;
          }>;
        }>
      >;
    }>;
  }>;
};

export type ErrorFragmentFragment = {
  __typename?: "FieldError";
  field: string;
  message: string;
};

export type FatherFragmentFragment = {
  __typename?: "Father";
  Id: number;
  Name: string;
  Surname: string;
  Email: string;
  Phone: number;
  createdAt: any;
  updatedAt: any;
  createdBy?: Maybe<{
    __typename?: "User";
    Id: number;
    Name: string;
    Surname: string;
    Email: string;
    createdAt: string;
    updatedAt: string;
    staffOf?: Maybe<
      Array<{
        __typename?: "StaffMembers";
        role: string;
        kindergarden?: Maybe<{
          __typename?: "KinderGarden";
          Id: number;
          Name: string;
          City: string;
          Address: string;
          Zipcode: number;
        }>;
      }>
    >;
  }>;
  updatedBy?: Maybe<{
    __typename?: "User";
    Id: number;
    Name: string;
    Surname: string;
    Email: string;
    createdAt: string;
    updatedAt: string;
    staffOf?: Maybe<
      Array<{
        __typename?: "StaffMembers";
        role: string;
        kindergarden?: Maybe<{
          __typename?: "KinderGarden";
          Id: number;
          Name: string;
          City: string;
          Address: string;
          Zipcode: number;
        }>;
      }>
    >;
  }>;
};

export type GroupFragmentFragment = {
  __typename?: "Groups";
  Id: number;
  Name: string;
  createdAt: string;
  updatedAt: string;
};

export type KindergardenFragmentFragment = {
  __typename?: "KinderGarden";
  Id: number;
  Name: string;
  City: string;
  Address: string;
  Zipcode: number;
};

export type MotherFragmentFragment = {
  __typename?: "Mother";
  Id: number;
  Name: string;
  Surname: string;
  Email: string;
  Phone: number;
  createdAt: any;
  updatedAt: any;
  createdBy?: Maybe<{
    __typename?: "User";
    Id: number;
    Name: string;
    Surname: string;
    Email: string;
    createdAt: string;
    updatedAt: string;
    staffOf?: Maybe<
      Array<{
        __typename?: "StaffMembers";
        role: string;
        kindergarden?: Maybe<{
          __typename?: "KinderGarden";
          Id: number;
          Name: string;
          City: string;
          Address: string;
          Zipcode: number;
        }>;
      }>
    >;
  }>;
  updatedBy?: Maybe<{
    __typename?: "User";
    Id: number;
    Name: string;
    Surname: string;
    Email: string;
    createdAt: string;
    updatedAt: string;
    staffOf?: Maybe<
      Array<{
        __typename?: "StaffMembers";
        role: string;
        kindergarden?: Maybe<{
          __typename?: "KinderGarden";
          Id: number;
          Name: string;
          City: string;
          Address: string;
          Zipcode: number;
        }>;
      }>
    >;
  }>;
};

export type StaffFragmentFragment = {
  __typename?: "StaffMembers";
  staffId: number;
  kindergardenId: number;
  role: string;
  staff?: Maybe<{
    __typename?: "User";
    Id: number;
    Name: string;
    Surname: string;
    Email: string;
    createdAt: string;
    updatedAt: string;
    staffOf?: Maybe<
      Array<{
        __typename?: "StaffMembers";
        role: string;
        kindergarden?: Maybe<{
          __typename?: "KinderGarden";
          Id: number;
          Name: string;
          City: string;
          Address: string;
          Zipcode: number;
        }>;
      }>
    >;
  }>;
  kindergarden?: Maybe<{
    __typename?: "KinderGarden";
    Id: number;
    Name: string;
    City: string;
    Address: string;
    Zipcode: number;
  }>;
};

export type UserFragmentFragment = {
  __typename?: "User";
  Id: number;
  Name: string;
  Surname: string;
  Email: string;
  createdAt: string;
  updatedAt: string;
  staffOf?: Maybe<
    Array<{
      __typename?: "StaffMembers";
      role: string;
      kindergarden?: Maybe<{
        __typename?: "KinderGarden";
        Id: number;
        Name: string;
        City: string;
        Address: string;
        Zipcode: number;
      }>;
    }>
  >;
};

export type AddChildToGroupMutationVariables = Exact<{
  id: Scalars["Int"];
}>;

export type AddChildToGroupMutation = {
  __typename?: "Mutation";
  addChildToGroup?: Maybe<{
    __typename?: "Children";
    Id: number;
    Name: string;
    Surname: string;
    Gender: string;
    BirthDate?: Maybe<any>;
    OIB: number;
    Remarks: string;
    motherId?: Maybe<number>;
    fatherId?: Maybe<number>;
    createdAt: any;
    updatedAt: any;
    createdBy?: Maybe<{
      __typename?: "User";
      Id: number;
      Name: string;
      Surname: string;
      Email: string;
      createdAt: string;
      updatedAt: string;
      staffOf?: Maybe<
        Array<{
          __typename?: "StaffMembers";
          role: string;
          kindergarden?: Maybe<{
            __typename?: "KinderGarden";
            Id: number;
            Name: string;
            City: string;
            Address: string;
            Zipcode: number;
          }>;
        }>
      >;
    }>;
    updatedBy?: Maybe<{
      __typename?: "User";
      Id: number;
      Name: string;
      Surname: string;
      Email: string;
      createdAt: string;
      updatedAt: string;
      staffOf?: Maybe<
        Array<{
          __typename?: "StaffMembers";
          role: string;
          kindergarden?: Maybe<{
            __typename?: "KinderGarden";
            Id: number;
            Name: string;
            City: string;
            Address: string;
            Zipcode: number;
          }>;
        }>
      >;
    }>;
    mother?: Maybe<{
      __typename?: "Mother";
      Id: number;
      Name: string;
      Surname: string;
      Email: string;
      Phone: number;
      createdAt: any;
      updatedAt: any;
      createdBy?: Maybe<{
        __typename?: "User";
        Id: number;
        Name: string;
        Surname: string;
        Email: string;
        createdAt: string;
        updatedAt: string;
        staffOf?: Maybe<
          Array<{
            __typename?: "StaffMembers";
            role: string;
            kindergarden?: Maybe<{
              __typename?: "KinderGarden";
              Id: number;
              Name: string;
              City: string;
              Address: string;
              Zipcode: number;
            }>;
          }>
        >;
      }>;
      updatedBy?: Maybe<{
        __typename?: "User";
        Id: number;
        Name: string;
        Surname: string;
        Email: string;
        createdAt: string;
        updatedAt: string;
        staffOf?: Maybe<
          Array<{
            __typename?: "StaffMembers";
            role: string;
            kindergarden?: Maybe<{
              __typename?: "KinderGarden";
              Id: number;
              Name: string;
              City: string;
              Address: string;
              Zipcode: number;
            }>;
          }>
        >;
      }>;
    }>;
    father?: Maybe<{
      __typename?: "Father";
      Id: number;
      Name: string;
      Surname: string;
      Email: string;
      Phone: number;
      createdAt: any;
      updatedAt: any;
      createdBy?: Maybe<{
        __typename?: "User";
        Id: number;
        Name: string;
        Surname: string;
        Email: string;
        createdAt: string;
        updatedAt: string;
        staffOf?: Maybe<
          Array<{
            __typename?: "StaffMembers";
            role: string;
            kindergarden?: Maybe<{
              __typename?: "KinderGarden";
              Id: number;
              Name: string;
              City: string;
              Address: string;
              Zipcode: number;
            }>;
          }>
        >;
      }>;
      updatedBy?: Maybe<{
        __typename?: "User";
        Id: number;
        Name: string;
        Surname: string;
        Email: string;
        createdAt: string;
        updatedAt: string;
        staffOf?: Maybe<
          Array<{
            __typename?: "StaffMembers";
            role: string;
            kindergarden?: Maybe<{
              __typename?: "KinderGarden";
              Id: number;
              Name: string;
              City: string;
              Address: string;
              Zipcode: number;
            }>;
          }>
        >;
      }>;
    }>;
  }>;
};

export type AddFatherMutationVariables = Exact<{
  options: ParentsInput;
}>;

export type AddFatherMutation = {
  __typename?: "Mutation";
  addFather: {
    __typename?: "Father";
    Id: number;
    Name: string;
    Surname: string;
    Email: string;
    Phone: number;
    createdAt: any;
    updatedAt: any;
    createdBy?: Maybe<{
      __typename?: "User";
      Id: number;
      Name: string;
      Surname: string;
      Email: string;
      createdAt: string;
      updatedAt: string;
      staffOf?: Maybe<
        Array<{
          __typename?: "StaffMembers";
          role: string;
          kindergarden?: Maybe<{
            __typename?: "KinderGarden";
            Id: number;
            Name: string;
            City: string;
            Address: string;
            Zipcode: number;
          }>;
        }>
      >;
    }>;
    updatedBy?: Maybe<{
      __typename?: "User";
      Id: number;
      Name: string;
      Surname: string;
      Email: string;
      createdAt: string;
      updatedAt: string;
      staffOf?: Maybe<
        Array<{
          __typename?: "StaffMembers";
          role: string;
          kindergarden?: Maybe<{
            __typename?: "KinderGarden";
            Id: number;
            Name: string;
            City: string;
            Address: string;
            Zipcode: number;
          }>;
        }>
      >;
    }>;
  };
};

export type AddMotherMutationVariables = Exact<{
  options: ParentsInput;
}>;

export type AddMotherMutation = {
  __typename?: "Mutation";
  addMother: {
    __typename?: "Mother";
    Id: number;
    Name: string;
    Surname: string;
    Email: string;
    Phone: number;
    createdAt: any;
    updatedAt: any;
    createdBy?: Maybe<{
      __typename?: "User";
      Id: number;
      Name: string;
      Surname: string;
      Email: string;
      createdAt: string;
      updatedAt: string;
      staffOf?: Maybe<
        Array<{
          __typename?: "StaffMembers";
          role: string;
          kindergarden?: Maybe<{
            __typename?: "KinderGarden";
            Id: number;
            Name: string;
            City: string;
            Address: string;
            Zipcode: number;
          }>;
        }>
      >;
    }>;
    updatedBy?: Maybe<{
      __typename?: "User";
      Id: number;
      Name: string;
      Surname: string;
      Email: string;
      createdAt: string;
      updatedAt: string;
      staffOf?: Maybe<
        Array<{
          __typename?: "StaffMembers";
          role: string;
          kindergarden?: Maybe<{
            __typename?: "KinderGarden";
            Id: number;
            Name: string;
            City: string;
            Address: string;
            Zipcode: number;
          }>;
        }>
      >;
    }>;
  };
};

export type AddStaffMutationVariables = Exact<{
  role: Scalars["String"];
  userId: Scalars["Int"];
}>;

export type AddStaffMutation = {
  __typename?: "Mutation";
  addStaff: {
    __typename?: "StaffResponse";
    staff?: Maybe<{
      __typename?: "StaffMembers";
      staffId: number;
      kindergardenId: number;
      role: string;
      staff?: Maybe<{
        __typename?: "User";
        Id: number;
        Name: string;
        Surname: string;
        Email: string;
        createdAt: string;
        updatedAt: string;
        staffOf?: Maybe<
          Array<{
            __typename?: "StaffMembers";
            role: string;
            kindergarden?: Maybe<{
              __typename?: "KinderGarden";
              Id: number;
              Name: string;
              City: string;
              Address: string;
              Zipcode: number;
            }>;
          }>
        >;
      }>;
      kindergarden?: Maybe<{
        __typename?: "KinderGarden";
        Id: number;
        Name: string;
        City: string;
        Address: string;
        Zipcode: number;
      }>;
    }>;
    errors?: Maybe<
      Array<{ __typename?: "FieldError"; field: string; message: string }>
    >;
  };
};

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars["String"];
  newPassword: Scalars["String"];
  repeatNewPassword: Scalars["String"];
}>;

export type ChangePasswordMutation = {
  __typename?: "Mutation";
  changePassword: {
    __typename?: "UserResponse";
    errors?: Maybe<
      Array<{ __typename?: "FieldError"; field: string; message: string }>
    >;
    user?: Maybe<{
      __typename?: "User";
      Id: number;
      Name: string;
      Surname: string;
      Email: string;
      createdAt: string;
      updatedAt: string;
      staffOf?: Maybe<
        Array<{
          __typename?: "StaffMembers";
          role: string;
          kindergarden?: Maybe<{
            __typename?: "KinderGarden";
            Id: number;
            Name: string;
            City: string;
            Address: string;
            Zipcode: number;
          }>;
        }>
      >;
    }>;
  };
};

export type ClearGroupMutationVariables = Exact<{ [key: string]: never }>;

export type ClearGroupMutation = {
  __typename?: "Mutation";
  clearGroup: boolean;
};

export type ClearKindergardenMutationVariables = Exact<{
  [key: string]: never;
}>;

export type ClearKindergardenMutation = {
  __typename?: "Mutation";
  clearKindergarden: boolean;
};

export type CreateChildMutationVariables = Exact<{
  options: ChildrenInput;
}>;

export type CreateChildMutation = {
  __typename?: "Mutation";
  createChild: {
    __typename?: "Children";
    Id: number;
    Name: string;
    Surname: string;
    Gender: string;
    BirthDate?: Maybe<any>;
    OIB: number;
    Remarks: string;
    motherId?: Maybe<number>;
    fatherId?: Maybe<number>;
    createdAt: any;
    updatedAt: any;
    createdBy?: Maybe<{
      __typename?: "User";
      Id: number;
      Name: string;
      Surname: string;
      Email: string;
      createdAt: string;
      updatedAt: string;
      staffOf?: Maybe<
        Array<{
          __typename?: "StaffMembers";
          role: string;
          kindergarden?: Maybe<{
            __typename?: "KinderGarden";
            Id: number;
            Name: string;
            City: string;
            Address: string;
            Zipcode: number;
          }>;
        }>
      >;
    }>;
    updatedBy?: Maybe<{
      __typename?: "User";
      Id: number;
      Name: string;
      Surname: string;
      Email: string;
      createdAt: string;
      updatedAt: string;
      staffOf?: Maybe<
        Array<{
          __typename?: "StaffMembers";
          role: string;
          kindergarden?: Maybe<{
            __typename?: "KinderGarden";
            Id: number;
            Name: string;
            City: string;
            Address: string;
            Zipcode: number;
          }>;
        }>
      >;
    }>;
    mother?: Maybe<{
      __typename?: "Mother";
      Id: number;
      Name: string;
      Surname: string;
      Email: string;
      Phone: number;
      createdAt: any;
      updatedAt: any;
      createdBy?: Maybe<{
        __typename?: "User";
        Id: number;
        Name: string;
        Surname: string;
        Email: string;
        createdAt: string;
        updatedAt: string;
        staffOf?: Maybe<
          Array<{
            __typename?: "StaffMembers";
            role: string;
            kindergarden?: Maybe<{
              __typename?: "KinderGarden";
              Id: number;
              Name: string;
              City: string;
              Address: string;
              Zipcode: number;
            }>;
          }>
        >;
      }>;
      updatedBy?: Maybe<{
        __typename?: "User";
        Id: number;
        Name: string;
        Surname: string;
        Email: string;
        createdAt: string;
        updatedAt: string;
        staffOf?: Maybe<
          Array<{
            __typename?: "StaffMembers";
            role: string;
            kindergarden?: Maybe<{
              __typename?: "KinderGarden";
              Id: number;
              Name: string;
              City: string;
              Address: string;
              Zipcode: number;
            }>;
          }>
        >;
      }>;
    }>;
    father?: Maybe<{
      __typename?: "Father";
      Id: number;
      Name: string;
      Surname: string;
      Email: string;
      Phone: number;
      createdAt: any;
      updatedAt: any;
      createdBy?: Maybe<{
        __typename?: "User";
        Id: number;
        Name: string;
        Surname: string;
        Email: string;
        createdAt: string;
        updatedAt: string;
        staffOf?: Maybe<
          Array<{
            __typename?: "StaffMembers";
            role: string;
            kindergarden?: Maybe<{
              __typename?: "KinderGarden";
              Id: number;
              Name: string;
              City: string;
              Address: string;
              Zipcode: number;
            }>;
          }>
        >;
      }>;
      updatedBy?: Maybe<{
        __typename?: "User";
        Id: number;
        Name: string;
        Surname: string;
        Email: string;
        createdAt: string;
        updatedAt: string;
        staffOf?: Maybe<
          Array<{
            __typename?: "StaffMembers";
            role: string;
            kindergarden?: Maybe<{
              __typename?: "KinderGarden";
              Id: number;
              Name: string;
              City: string;
              Address: string;
              Zipcode: number;
            }>;
          }>
        >;
      }>;
    }>;
  };
};

export type CreateGroupMutationVariables = Exact<{
  name: Scalars["String"];
}>;

export type CreateGroupMutation = {
  __typename?: "Mutation";
  createGroup: {
    __typename?: "GroupsResponse";
    groups?: Maybe<{
      __typename?: "Groups";
      Id: number;
      Name: string;
      createdAt: string;
      updatedAt: string;
    }>;
    errors?: Maybe<
      Array<{ __typename?: "FieldError"; field: string; message: string }>
    >;
  };
};

export type CreateKindergardenMutationVariables = Exact<{
  options: KinderGardenInput;
}>;

export type CreateKindergardenMutation = {
  __typename?: "Mutation";
  createKindergarden: {
    __typename?: "KindergardenResponse";
    kindergarden?: Maybe<{
      __typename?: "KinderGarden";
      Id: number;
      Name: string;
      City: string;
      Address: string;
      Zipcode: number;
    }>;
    errors?: Maybe<
      Array<{ __typename?: "FieldError"; field: string; message: string }>
    >;
  };
};

export type DeleteChildrenMutationVariables = Exact<{
  id: Scalars["Int"];
}>;

export type DeleteChildrenMutation = {
  __typename?: "Mutation";
  deleteChildren: boolean;
};

export type DeleteFatherMutationVariables = Exact<{
  fatherId: Scalars["Int"];
}>;

export type DeleteFatherMutation = {
  __typename?: "Mutation";
  deleteFather: boolean;
};

export type DeleteGroupMutationVariables = Exact<{
  id: Scalars["Int"];
}>;

export type DeleteGroupMutation = {
  __typename?: "Mutation";
  deleteGroup: boolean;
};

export type DeleteKindergardenMutationVariables = Exact<{
  id: Scalars["Int"];
}>;

export type DeleteKindergardenMutation = {
  __typename?: "Mutation";
  deleteKindergarden: boolean;
};

export type DeleteMotherMutationVariables = Exact<{
  motherId: Scalars["Int"];
}>;

export type DeleteMotherMutation = {
  __typename?: "Mutation";
  deleteMother: boolean;
};

export type DeleteStaffMutationVariables = Exact<{
  userId: Scalars["Int"];
}>;

export type DeleteStaffMutation = {
  __typename?: "Mutation";
  deleteStaff: boolean;
};

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars["String"];
}>;

export type ForgotPasswordMutation = {
  __typename?: "Mutation";
  forgetPassword: boolean;
};

export type LoginMutationVariables = Exact<{
  email: Scalars["String"];
  password: Scalars["String"];
}>;

export type LoginMutation = {
  __typename?: "Mutation";
  login: {
    __typename?: "UserResponse";
    user?: Maybe<{
      __typename?: "User";
      Id: number;
      Name: string;
      Surname: string;
      Email: string;
      createdAt: string;
      updatedAt: string;
      ownerOf: Array<{
        __typename?: "KinderGarden";
        Id: number;
        Name: string;
        City: string;
        Address: string;
        Zipcode: number;
      }>;
      staffOf?: Maybe<
        Array<{
          __typename?: "StaffMembers";
          role: string;
          kindergarden?: Maybe<{
            __typename?: "KinderGarden";
            Id: number;
            Name: string;
            City: string;
            Address: string;
            Zipcode: number;
          }>;
        }>
      >;
    }>;
    errors?: Maybe<
      Array<{ __typename?: "FieldError"; field: string; message: string }>
    >;
  };
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { __typename?: "Mutation"; logout: boolean };

export type RegisterMutationVariables = Exact<{
  options: UsernamePasswordInput;
}>;

export type RegisterMutation = {
  __typename?: "Mutation";
  register: {
    __typename?: "UserResponse";
    user?: Maybe<{
      __typename?: "User";
      Id: number;
      Name: string;
      Surname: string;
      Email: string;
      createdAt: string;
      updatedAt: string;
      staffOf?: Maybe<
        Array<{
          __typename?: "StaffMembers";
          role: string;
          kindergarden?: Maybe<{
            __typename?: "KinderGarden";
            Id: number;
            Name: string;
            City: string;
            Address: string;
            Zipcode: number;
          }>;
        }>
      >;
    }>;
    errors?: Maybe<
      Array<{ __typename?: "FieldError"; field: string; message: string }>
    >;
  };
};

export type RemoveChildFromGroupMutationVariables = Exact<{
  Id: Scalars["Int"];
}>;

export type RemoveChildFromGroupMutation = {
  __typename?: "Mutation";
  removeChildFromGroup?: Maybe<{
    __typename?: "Children";
    Id: number;
    Name: string;
    Surname: string;
    Gender: string;
    BirthDate?: Maybe<any>;
    OIB: number;
    Remarks: string;
    motherId?: Maybe<number>;
    fatherId?: Maybe<number>;
    createdAt: any;
    updatedAt: any;
    createdBy?: Maybe<{
      __typename?: "User";
      Id: number;
      Name: string;
      Surname: string;
      Email: string;
      createdAt: string;
      updatedAt: string;
      staffOf?: Maybe<
        Array<{
          __typename?: "StaffMembers";
          role: string;
          kindergarden?: Maybe<{
            __typename?: "KinderGarden";
            Id: number;
            Name: string;
            City: string;
            Address: string;
            Zipcode: number;
          }>;
        }>
      >;
    }>;
    updatedBy?: Maybe<{
      __typename?: "User";
      Id: number;
      Name: string;
      Surname: string;
      Email: string;
      createdAt: string;
      updatedAt: string;
      staffOf?: Maybe<
        Array<{
          __typename?: "StaffMembers";
          role: string;
          kindergarden?: Maybe<{
            __typename?: "KinderGarden";
            Id: number;
            Name: string;
            City: string;
            Address: string;
            Zipcode: number;
          }>;
        }>
      >;
    }>;
    mother?: Maybe<{
      __typename?: "Mother";
      Id: number;
      Name: string;
      Surname: string;
      Email: string;
      Phone: number;
      createdAt: any;
      updatedAt: any;
      createdBy?: Maybe<{
        __typename?: "User";
        Id: number;
        Name: string;
        Surname: string;
        Email: string;
        createdAt: string;
        updatedAt: string;
        staffOf?: Maybe<
          Array<{
            __typename?: "StaffMembers";
            role: string;
            kindergarden?: Maybe<{
              __typename?: "KinderGarden";
              Id: number;
              Name: string;
              City: string;
              Address: string;
              Zipcode: number;
            }>;
          }>
        >;
      }>;
      updatedBy?: Maybe<{
        __typename?: "User";
        Id: number;
        Name: string;
        Surname: string;
        Email: string;
        createdAt: string;
        updatedAt: string;
        staffOf?: Maybe<
          Array<{
            __typename?: "StaffMembers";
            role: string;
            kindergarden?: Maybe<{
              __typename?: "KinderGarden";
              Id: number;
              Name: string;
              City: string;
              Address: string;
              Zipcode: number;
            }>;
          }>
        >;
      }>;
    }>;
    father?: Maybe<{
      __typename?: "Father";
      Id: number;
      Name: string;
      Surname: string;
      Email: string;
      Phone: number;
      createdAt: any;
      updatedAt: any;
      createdBy?: Maybe<{
        __typename?: "User";
        Id: number;
        Name: string;
        Surname: string;
        Email: string;
        createdAt: string;
        updatedAt: string;
        staffOf?: Maybe<
          Array<{
            __typename?: "StaffMembers";
            role: string;
            kindergarden?: Maybe<{
              __typename?: "KinderGarden";
              Id: number;
              Name: string;
              City: string;
              Address: string;
              Zipcode: number;
            }>;
          }>
        >;
      }>;
      updatedBy?: Maybe<{
        __typename?: "User";
        Id: number;
        Name: string;
        Surname: string;
        Email: string;
        createdAt: string;
        updatedAt: string;
        staffOf?: Maybe<
          Array<{
            __typename?: "StaffMembers";
            role: string;
            kindergarden?: Maybe<{
              __typename?: "KinderGarden";
              Id: number;
              Name: string;
              City: string;
              Address: string;
              Zipcode: number;
            }>;
          }>
        >;
      }>;
    }>;
  }>;
};

export type ResendEmailMutationVariables = Exact<{
  email: Scalars["String"];
}>;

export type ResendEmailMutation = {
  __typename?: "Mutation";
  resendEmail: {
    __typename?: "UserResponse";
    user?: Maybe<{ __typename?: "User"; Id: number }>;
    errors?: Maybe<
      Array<{ __typename?: "FieldError"; field: string; message: string }>
    >;
  };
};

export type SendEmailMutationVariables = Exact<{
  input: ContactInput;
}>;

export type SendEmailMutation = { __typename?: "Mutation"; sendEmail: boolean };

export type UpdateChildMutationVariables = Exact<{
  kidId: Scalars["Int"];
  options: ChildrenInput;
}>;

export type UpdateChildMutation = {
  __typename?: "Mutation";
  updateChild?: Maybe<{
    __typename?: "Children";
    Id: number;
    Name: string;
    Surname: string;
    Gender: string;
    BirthDate?: Maybe<any>;
    OIB: number;
    Remarks: string;
    motherId?: Maybe<number>;
    fatherId?: Maybe<number>;
    createdAt: any;
    updatedAt: any;
    createdBy?: Maybe<{
      __typename?: "User";
      Id: number;
      Name: string;
      Surname: string;
      Email: string;
      createdAt: string;
      updatedAt: string;
      staffOf?: Maybe<
        Array<{
          __typename?: "StaffMembers";
          role: string;
          kindergarden?: Maybe<{
            __typename?: "KinderGarden";
            Id: number;
            Name: string;
            City: string;
            Address: string;
            Zipcode: number;
          }>;
        }>
      >;
    }>;
    updatedBy?: Maybe<{
      __typename?: "User";
      Id: number;
      Name: string;
      Surname: string;
      Email: string;
      createdAt: string;
      updatedAt: string;
      staffOf?: Maybe<
        Array<{
          __typename?: "StaffMembers";
          role: string;
          kindergarden?: Maybe<{
            __typename?: "KinderGarden";
            Id: number;
            Name: string;
            City: string;
            Address: string;
            Zipcode: number;
          }>;
        }>
      >;
    }>;
    mother?: Maybe<{
      __typename?: "Mother";
      Id: number;
      Name: string;
      Surname: string;
      Email: string;
      Phone: number;
      createdAt: any;
      updatedAt: any;
      createdBy?: Maybe<{
        __typename?: "User";
        Id: number;
        Name: string;
        Surname: string;
        Email: string;
        createdAt: string;
        updatedAt: string;
        staffOf?: Maybe<
          Array<{
            __typename?: "StaffMembers";
            role: string;
            kindergarden?: Maybe<{
              __typename?: "KinderGarden";
              Id: number;
              Name: string;
              City: string;
              Address: string;
              Zipcode: number;
            }>;
          }>
        >;
      }>;
      updatedBy?: Maybe<{
        __typename?: "User";
        Id: number;
        Name: string;
        Surname: string;
        Email: string;
        createdAt: string;
        updatedAt: string;
        staffOf?: Maybe<
          Array<{
            __typename?: "StaffMembers";
            role: string;
            kindergarden?: Maybe<{
              __typename?: "KinderGarden";
              Id: number;
              Name: string;
              City: string;
              Address: string;
              Zipcode: number;
            }>;
          }>
        >;
      }>;
    }>;
    father?: Maybe<{
      __typename?: "Father";
      Id: number;
      Name: string;
      Surname: string;
      Email: string;
      Phone: number;
      createdAt: any;
      updatedAt: any;
      createdBy?: Maybe<{
        __typename?: "User";
        Id: number;
        Name: string;
        Surname: string;
        Email: string;
        createdAt: string;
        updatedAt: string;
        staffOf?: Maybe<
          Array<{
            __typename?: "StaffMembers";
            role: string;
            kindergarden?: Maybe<{
              __typename?: "KinderGarden";
              Id: number;
              Name: string;
              City: string;
              Address: string;
              Zipcode: number;
            }>;
          }>
        >;
      }>;
      updatedBy?: Maybe<{
        __typename?: "User";
        Id: number;
        Name: string;
        Surname: string;
        Email: string;
        createdAt: string;
        updatedAt: string;
        staffOf?: Maybe<
          Array<{
            __typename?: "StaffMembers";
            role: string;
            kindergarden?: Maybe<{
              __typename?: "KinderGarden";
              Id: number;
              Name: string;
              City: string;
              Address: string;
              Zipcode: number;
            }>;
          }>
        >;
      }>;
    }>;
  }>;
};

export type UpdateChildrenParentsMutationVariables = Exact<{
  childId: Scalars["Int"];
  motherId?: Maybe<Scalars["Int"]>;
  fatherId?: Maybe<Scalars["Int"]>;
}>;

export type UpdateChildrenParentsMutation = {
  __typename?: "Mutation";
  updateChildernParents: {
    __typename?: "Children";
    Id: number;
    Name: string;
    Surname: string;
    Gender: string;
    BirthDate?: Maybe<any>;
    OIB: number;
    Remarks: string;
    motherId?: Maybe<number>;
    fatherId?: Maybe<number>;
    createdAt: any;
    updatedAt: any;
    createdBy?: Maybe<{
      __typename?: "User";
      Id: number;
      Name: string;
      Surname: string;
      Email: string;
      createdAt: string;
      updatedAt: string;
      staffOf?: Maybe<
        Array<{
          __typename?: "StaffMembers";
          role: string;
          kindergarden?: Maybe<{
            __typename?: "KinderGarden";
            Id: number;
            Name: string;
            City: string;
            Address: string;
            Zipcode: number;
          }>;
        }>
      >;
    }>;
    updatedBy?: Maybe<{
      __typename?: "User";
      Id: number;
      Name: string;
      Surname: string;
      Email: string;
      createdAt: string;
      updatedAt: string;
      staffOf?: Maybe<
        Array<{
          __typename?: "StaffMembers";
          role: string;
          kindergarden?: Maybe<{
            __typename?: "KinderGarden";
            Id: number;
            Name: string;
            City: string;
            Address: string;
            Zipcode: number;
          }>;
        }>
      >;
    }>;
    mother?: Maybe<{
      __typename?: "Mother";
      Id: number;
      Name: string;
      Surname: string;
      Email: string;
      Phone: number;
      createdAt: any;
      updatedAt: any;
      createdBy?: Maybe<{
        __typename?: "User";
        Id: number;
        Name: string;
        Surname: string;
        Email: string;
        createdAt: string;
        updatedAt: string;
        staffOf?: Maybe<
          Array<{
            __typename?: "StaffMembers";
            role: string;
            kindergarden?: Maybe<{
              __typename?: "KinderGarden";
              Id: number;
              Name: string;
              City: string;
              Address: string;
              Zipcode: number;
            }>;
          }>
        >;
      }>;
      updatedBy?: Maybe<{
        __typename?: "User";
        Id: number;
        Name: string;
        Surname: string;
        Email: string;
        createdAt: string;
        updatedAt: string;
        staffOf?: Maybe<
          Array<{
            __typename?: "StaffMembers";
            role: string;
            kindergarden?: Maybe<{
              __typename?: "KinderGarden";
              Id: number;
              Name: string;
              City: string;
              Address: string;
              Zipcode: number;
            }>;
          }>
        >;
      }>;
    }>;
    father?: Maybe<{
      __typename?: "Father";
      Id: number;
      Name: string;
      Surname: string;
      Email: string;
      Phone: number;
      createdAt: any;
      updatedAt: any;
      createdBy?: Maybe<{
        __typename?: "User";
        Id: number;
        Name: string;
        Surname: string;
        Email: string;
        createdAt: string;
        updatedAt: string;
        staffOf?: Maybe<
          Array<{
            __typename?: "StaffMembers";
            role: string;
            kindergarden?: Maybe<{
              __typename?: "KinderGarden";
              Id: number;
              Name: string;
              City: string;
              Address: string;
              Zipcode: number;
            }>;
          }>
        >;
      }>;
      updatedBy?: Maybe<{
        __typename?: "User";
        Id: number;
        Name: string;
        Surname: string;
        Email: string;
        createdAt: string;
        updatedAt: string;
        staffOf?: Maybe<
          Array<{
            __typename?: "StaffMembers";
            role: string;
            kindergarden?: Maybe<{
              __typename?: "KinderGarden";
              Id: number;
              Name: string;
              City: string;
              Address: string;
              Zipcode: number;
            }>;
          }>
        >;
      }>;
    }>;
  };
};

export type UpdateFatherMutationVariables = Exact<{
  fatherId: Scalars["Int"];
  options: ParentsInput;
}>;

export type UpdateFatherMutation = {
  __typename?: "Mutation";
  updateFather: {
    __typename?: "Father";
    Id: number;
    Name: string;
    Surname: string;
    Email: string;
    Phone: number;
    createdAt: any;
    updatedAt: any;
    createdBy?: Maybe<{
      __typename?: "User";
      Id: number;
      Name: string;
      Surname: string;
      Email: string;
      createdAt: string;
      updatedAt: string;
      staffOf?: Maybe<
        Array<{
          __typename?: "StaffMembers";
          role: string;
          kindergarden?: Maybe<{
            __typename?: "KinderGarden";
            Id: number;
            Name: string;
            City: string;
            Address: string;
            Zipcode: number;
          }>;
        }>
      >;
    }>;
    updatedBy?: Maybe<{
      __typename?: "User";
      Id: number;
      Name: string;
      Surname: string;
      Email: string;
      createdAt: string;
      updatedAt: string;
      staffOf?: Maybe<
        Array<{
          __typename?: "StaffMembers";
          role: string;
          kindergarden?: Maybe<{
            __typename?: "KinderGarden";
            Id: number;
            Name: string;
            City: string;
            Address: string;
            Zipcode: number;
          }>;
        }>
      >;
    }>;
  };
};

export type UpdateMotherMutationVariables = Exact<{
  motherId: Scalars["Int"];
  options: ParentsInput;
}>;

export type UpdateMotherMutation = {
  __typename?: "Mutation";
  updateMother: {
    __typename?: "Mother";
    Id: number;
    Name: string;
    Surname: string;
    Email: string;
    Phone: number;
    createdAt: any;
    updatedAt: any;
    createdBy?: Maybe<{
      __typename?: "User";
      Id: number;
      Name: string;
      Surname: string;
      Email: string;
      createdAt: string;
      updatedAt: string;
      staffOf?: Maybe<
        Array<{
          __typename?: "StaffMembers";
          role: string;
          kindergarden?: Maybe<{
            __typename?: "KinderGarden";
            Id: number;
            Name: string;
            City: string;
            Address: string;
            Zipcode: number;
          }>;
        }>
      >;
    }>;
    updatedBy?: Maybe<{
      __typename?: "User";
      Id: number;
      Name: string;
      Surname: string;
      Email: string;
      createdAt: string;
      updatedAt: string;
      staffOf?: Maybe<
        Array<{
          __typename?: "StaffMembers";
          role: string;
          kindergarden?: Maybe<{
            __typename?: "KinderGarden";
            Id: number;
            Name: string;
            City: string;
            Address: string;
            Zipcode: number;
          }>;
        }>
      >;
    }>;
  };
};

export type UpdatePasswordMutationVariables = Exact<{
  options: UpdatePassword;
}>;

export type UpdatePasswordMutation = {
  __typename?: "Mutation";
  updatePassword: {
    __typename?: "UserResponse";
    user?: Maybe<{
      __typename?: "User";
      Id: number;
      Name: string;
      Surname: string;
      Email: string;
      createdAt: string;
      updatedAt: string;
      staffOf?: Maybe<
        Array<{
          __typename?: "StaffMembers";
          role: string;
          kindergarden?: Maybe<{
            __typename?: "KinderGarden";
            Id: number;
            Name: string;
            City: string;
            Address: string;
            Zipcode: number;
          }>;
        }>
      >;
    }>;
    errors?: Maybe<
      Array<{ __typename?: "FieldError"; field: string; message: string }>
    >;
  };
};

export type UpdateUserMutationVariables = Exact<{
  options: UpdateUserInput;
}>;

export type UpdateUserMutation = {
  __typename?: "Mutation";
  updateUser: {
    __typename?: "UserResponse";
    user?: Maybe<{
      __typename?: "User";
      Id: number;
      Name: string;
      Surname: string;
      Email: string;
      createdAt: string;
      updatedAt: string;
      staffOf?: Maybe<
        Array<{
          __typename?: "StaffMembers";
          role: string;
          kindergarden?: Maybe<{
            __typename?: "KinderGarden";
            Id: number;
            Name: string;
            City: string;
            Address: string;
            Zipcode: number;
          }>;
        }>
      >;
    }>;
    errors?: Maybe<
      Array<{ __typename?: "FieldError"; field: string; message: string }>
    >;
  };
};

export type UseChildrenMutationVariables = Exact<{ [key: string]: never }>;

export type UseChildrenMutation = {
  __typename?: "Mutation";
  useChildren: {
    __typename?: "ChildrenResponse";
    children?: Maybe<{ __typename?: "Children"; Id: number; Name: string }>;
    errors?: Maybe<
      Array<{ __typename?: "FieldError"; field: string; message: string }>
    >;
  };
};

export type UseGroupMutationVariables = Exact<{
  groupId: Scalars["Float"];
}>;

export type UseGroupMutation = {
  __typename?: "Mutation";
  useGroup: {
    __typename?: "GroupsResponse";
    groups?: Maybe<{
      __typename?: "Groups";
      Id: number;
      Name: string;
      createdAt: string;
      updatedAt: string;
    }>;
    errors?: Maybe<
      Array<{ __typename?: "FieldError"; field: string; message: string }>
    >;
  };
};

export type UseKindergardenMutationVariables = Exact<{
  kindergardenID: Scalars["Float"];
}>;

export type UseKindergardenMutation = {
  __typename?: "Mutation";
  useKindergarden: {
    __typename?: "KindergardenResponse";
    kindergarden?: Maybe<{
      __typename?: "KinderGarden";
      Id: number;
      Name: string;
      City: string;
      Address: string;
      Zipcode: number;
      owning?: Maybe<{
        __typename?: "User";
        Id: number;
        Name: string;
        Surname: string;
        Email: string;
        createdAt: string;
        updatedAt: string;
        staffOf?: Maybe<
          Array<{
            __typename?: "StaffMembers";
            role: string;
            kindergarden?: Maybe<{
              __typename?: "KinderGarden";
              Id: number;
              Name: string;
              City: string;
              Address: string;
              Zipcode: number;
            }>;
          }>
        >;
      }>;
      groups?: Maybe<
        Array<{
          __typename?: "Groups";
          Id: number;
          Name: string;
          createdAt: string;
          updatedAt: string;
        }>
      >;
      staff?: Maybe<
        Array<{
          __typename?: "StaffMembers";
          staffId: number;
          kindergardenId: number;
          role: string;
          staff?: Maybe<{
            __typename?: "User";
            Id: number;
            Name: string;
            Surname: string;
            Email: string;
            createdAt: string;
            updatedAt: string;
            staffOf?: Maybe<
              Array<{
                __typename?: "StaffMembers";
                role: string;
                kindergarden?: Maybe<{
                  __typename?: "KinderGarden";
                  Id: number;
                  Name: string;
                  City: string;
                  Address: string;
                  Zipcode: number;
                }>;
              }>
            >;
          }>;
          kindergarden?: Maybe<{
            __typename?: "KinderGarden";
            Id: number;
            Name: string;
            City: string;
            Address: string;
            Zipcode: number;
          }>;
        }>
      >;
    }>;
    errors?: Maybe<
      Array<{ __typename?: "FieldError"; field: string; message: string }>
    >;
  };
};

export type VerifyAccountMutationVariables = Exact<{
  token: Scalars["String"];
}>;

export type VerifyAccountMutation = {
  __typename?: "Mutation";
  verifyAccount: {
    __typename?: "UserResponse";
    user?: Maybe<{
      __typename?: "User";
      Id: number;
      Name: string;
      Surname: string;
      Email: string;
      createdAt: string;
      updatedAt: string;
      staffOf?: Maybe<
        Array<{
          __typename?: "StaffMembers";
          role: string;
          kindergarden?: Maybe<{
            __typename?: "KinderGarden";
            Id: number;
            Name: string;
            City: string;
            Address: string;
            Zipcode: number;
          }>;
        }>
      >;
    }>;
    errors?: Maybe<
      Array<{ __typename?: "FieldError"; field: string; message: string }>
    >;
  };
};

export type FilterFatherQueryVariables = Exact<{
  text: Scalars["String"];
}>;

export type FilterFatherQuery = {
  __typename?: "Query";
  filterFather: Array<{
    __typename?: "Father";
    Id: number;
    Name: string;
    Surname: string;
    Email: string;
    Phone: number;
    createdAt: any;
    updatedAt: any;
    createdBy?: Maybe<{
      __typename?: "User";
      Id: number;
      Name: string;
      Surname: string;
      Email: string;
      createdAt: string;
      updatedAt: string;
      staffOf?: Maybe<
        Array<{
          __typename?: "StaffMembers";
          role: string;
          kindergarden?: Maybe<{
            __typename?: "KinderGarden";
            Id: number;
            Name: string;
            City: string;
            Address: string;
            Zipcode: number;
          }>;
        }>
      >;
    }>;
    updatedBy?: Maybe<{
      __typename?: "User";
      Id: number;
      Name: string;
      Surname: string;
      Email: string;
      createdAt: string;
      updatedAt: string;
      staffOf?: Maybe<
        Array<{
          __typename?: "StaffMembers";
          role: string;
          kindergarden?: Maybe<{
            __typename?: "KinderGarden";
            Id: number;
            Name: string;
            City: string;
            Address: string;
            Zipcode: number;
          }>;
        }>
      >;
    }>;
  }>;
};

export type FilterMotherQueryVariables = Exact<{
  text: Scalars["String"];
}>;

export type FilterMotherQuery = {
  __typename?: "Query";
  filterMother: Array<{
    __typename?: "Mother";
    Id: number;
    Name: string;
    Surname: string;
    Email: string;
    Phone: number;
    createdAt: any;
    updatedAt: any;
    createdBy?: Maybe<{
      __typename?: "User";
      Id: number;
      Name: string;
      Surname: string;
      Email: string;
      createdAt: string;
      updatedAt: string;
      staffOf?: Maybe<
        Array<{
          __typename?: "StaffMembers";
          role: string;
          kindergarden?: Maybe<{
            __typename?: "KinderGarden";
            Id: number;
            Name: string;
            City: string;
            Address: string;
            Zipcode: number;
          }>;
        }>
      >;
    }>;
    updatedBy?: Maybe<{
      __typename?: "User";
      Id: number;
      Name: string;
      Surname: string;
      Email: string;
      createdAt: string;
      updatedAt: string;
      staffOf?: Maybe<
        Array<{
          __typename?: "StaffMembers";
          role: string;
          kindergarden?: Maybe<{
            __typename?: "KinderGarden";
            Id: number;
            Name: string;
            City: string;
            Address: string;
            Zipcode: number;
          }>;
        }>
      >;
    }>;
  }>;
};

export type FilterStaffQueryVariables = Exact<{ [key: string]: never }>;

export type FilterStaffQuery = {
  __typename?: "Query";
  filterStaff?: Maybe<{
    __typename?: "StaffMembers";
    staffId: number;
    kindergardenId: number;
    role: string;
    staff?: Maybe<{
      __typename?: "User";
      Id: number;
      Name: string;
      Surname: string;
      Email: string;
      createdAt: string;
      updatedAt: string;
      staffOf?: Maybe<
        Array<{
          __typename?: "StaffMembers";
          role: string;
          kindergarden?: Maybe<{
            __typename?: "KinderGarden";
            Id: number;
            Name: string;
            City: string;
            Address: string;
            Zipcode: number;
          }>;
        }>
      >;
    }>;
    kindergarden?: Maybe<{
      __typename?: "KinderGarden";
      Id: number;
      Name: string;
      City: string;
      Address: string;
      Zipcode: number;
    }>;
  }>;
};

export type FindChildQueryVariables = Exact<{
  id: Scalars["Int"];
}>;

export type FindChildQuery = {
  __typename?: "Query";
  findChild?: Maybe<{
    __typename?: "Children";
    Id: number;
    Name: string;
    Surname: string;
    Gender: string;
    BirthDate?: Maybe<any>;
    OIB: number;
    Remarks: string;
    motherId?: Maybe<number>;
    fatherId?: Maybe<number>;
    createdAt: any;
    updatedAt: any;
    createdBy?: Maybe<{
      __typename?: "User";
      Id: number;
      Name: string;
      Surname: string;
      Email: string;
      createdAt: string;
      updatedAt: string;
      staffOf?: Maybe<
        Array<{
          __typename?: "StaffMembers";
          role: string;
          kindergarden?: Maybe<{
            __typename?: "KinderGarden";
            Id: number;
            Name: string;
            City: string;
            Address: string;
            Zipcode: number;
          }>;
        }>
      >;
    }>;
    updatedBy?: Maybe<{
      __typename?: "User";
      Id: number;
      Name: string;
      Surname: string;
      Email: string;
      createdAt: string;
      updatedAt: string;
      staffOf?: Maybe<
        Array<{
          __typename?: "StaffMembers";
          role: string;
          kindergarden?: Maybe<{
            __typename?: "KinderGarden";
            Id: number;
            Name: string;
            City: string;
            Address: string;
            Zipcode: number;
          }>;
        }>
      >;
    }>;
    mother?: Maybe<{
      __typename?: "Mother";
      Id: number;
      Name: string;
      Surname: string;
      Email: string;
      Phone: number;
      createdAt: any;
      updatedAt: any;
      createdBy?: Maybe<{
        __typename?: "User";
        Id: number;
        Name: string;
        Surname: string;
        Email: string;
        createdAt: string;
        updatedAt: string;
        staffOf?: Maybe<
          Array<{
            __typename?: "StaffMembers";
            role: string;
            kindergarden?: Maybe<{
              __typename?: "KinderGarden";
              Id: number;
              Name: string;
              City: string;
              Address: string;
              Zipcode: number;
            }>;
          }>
        >;
      }>;
      updatedBy?: Maybe<{
        __typename?: "User";
        Id: number;
        Name: string;
        Surname: string;
        Email: string;
        createdAt: string;
        updatedAt: string;
        staffOf?: Maybe<
          Array<{
            __typename?: "StaffMembers";
            role: string;
            kindergarden?: Maybe<{
              __typename?: "KinderGarden";
              Id: number;
              Name: string;
              City: string;
              Address: string;
              Zipcode: number;
            }>;
          }>
        >;
      }>;
    }>;
    father?: Maybe<{
      __typename?: "Father";
      Id: number;
      Name: string;
      Surname: string;
      Email: string;
      Phone: number;
      createdAt: any;
      updatedAt: any;
      createdBy?: Maybe<{
        __typename?: "User";
        Id: number;
        Name: string;
        Surname: string;
        Email: string;
        createdAt: string;
        updatedAt: string;
        staffOf?: Maybe<
          Array<{
            __typename?: "StaffMembers";
            role: string;
            kindergarden?: Maybe<{
              __typename?: "KinderGarden";
              Id: number;
              Name: string;
              City: string;
              Address: string;
              Zipcode: number;
            }>;
          }>
        >;
      }>;
      updatedBy?: Maybe<{
        __typename?: "User";
        Id: number;
        Name: string;
        Surname: string;
        Email: string;
        createdAt: string;
        updatedAt: string;
        staffOf?: Maybe<
          Array<{
            __typename?: "StaffMembers";
            role: string;
            kindergarden?: Maybe<{
              __typename?: "KinderGarden";
              Id: number;
              Name: string;
              City: string;
              Address: string;
              Zipcode: number;
            }>;
          }>
        >;
      }>;
    }>;
  }>;
};

export type FindFatherQueryVariables = Exact<{
  id: Scalars["Int"];
}>;

export type FindFatherQuery = {
  __typename?: "Query";
  findFather: {
    __typename?: "Father";
    Id: number;
    Name: string;
    Surname: string;
    Email: string;
    Phone: number;
    createdAt: any;
    updatedAt: any;
    createdBy?: Maybe<{
      __typename?: "User";
      Id: number;
      Name: string;
      Surname: string;
      Email: string;
      createdAt: string;
      updatedAt: string;
      staffOf?: Maybe<
        Array<{
          __typename?: "StaffMembers";
          role: string;
          kindergarden?: Maybe<{
            __typename?: "KinderGarden";
            Id: number;
            Name: string;
            City: string;
            Address: string;
            Zipcode: number;
          }>;
        }>
      >;
    }>;
    updatedBy?: Maybe<{
      __typename?: "User";
      Id: number;
      Name: string;
      Surname: string;
      Email: string;
      createdAt: string;
      updatedAt: string;
      staffOf?: Maybe<
        Array<{
          __typename?: "StaffMembers";
          role: string;
          kindergarden?: Maybe<{
            __typename?: "KinderGarden";
            Id: number;
            Name: string;
            City: string;
            Address: string;
            Zipcode: number;
          }>;
        }>
      >;
    }>;
  };
};

export type FindMotherQueryVariables = Exact<{
  id: Scalars["Int"];
}>;

export type FindMotherQuery = {
  __typename?: "Query";
  findMother: {
    __typename?: "Mother";
    Id: number;
    Name: string;
    Surname: string;
    Email: string;
    Phone: number;
    createdAt: any;
    updatedAt: any;
    createdBy?: Maybe<{
      __typename?: "User";
      Id: number;
      Name: string;
      Surname: string;
      Email: string;
      createdAt: string;
      updatedAt: string;
      staffOf?: Maybe<
        Array<{
          __typename?: "StaffMembers";
          role: string;
          kindergarden?: Maybe<{
            __typename?: "KinderGarden";
            Id: number;
            Name: string;
            City: string;
            Address: string;
            Zipcode: number;
          }>;
        }>
      >;
    }>;
    updatedBy?: Maybe<{
      __typename?: "User";
      Id: number;
      Name: string;
      Surname: string;
      Email: string;
      createdAt: string;
      updatedAt: string;
      staffOf?: Maybe<
        Array<{
          __typename?: "StaffMembers";
          role: string;
          kindergarden?: Maybe<{
            __typename?: "KinderGarden";
            Id: number;
            Name: string;
            City: string;
            Address: string;
            Zipcode: number;
          }>;
        }>
      >;
    }>;
  };
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: "Query";
  me?: Maybe<{
    __typename?: "User";
    Id: number;
    Name: string;
    Surname: string;
    Email: string;
    createdAt: string;
    updatedAt: string;
    staffOf?: Maybe<
      Array<{
        __typename?: "StaffMembers";
        role: string;
        kindergarden?: Maybe<{
          __typename?: "KinderGarden";
          Id: number;
          Name: string;
          City: string;
          Address: string;
          Zipcode: number;
        }>;
      }>
    >;
  }>;
};

export type OwnerQueryVariables = Exact<{ [key: string]: never }>;

export type OwnerQuery = {
  __typename?: "Query";
  owner: {
    __typename?: "KinderGarden";
    owning?: Maybe<{
      __typename?: "User";
      Id: number;
      Name: string;
      Surname: string;
      Email: string;
      createdAt: string;
      updatedAt: string;
      staffOf?: Maybe<
        Array<{
          __typename?: "StaffMembers";
          role: string;
          kindergarden?: Maybe<{
            __typename?: "KinderGarden";
            Id: number;
            Name: string;
            City: string;
            Address: string;
            Zipcode: number;
          }>;
        }>
      >;
    }>;
  };
};

export type SearchUserQueryVariables = Exact<{
  text: Scalars["String"];
}>;

export type SearchUserQuery = {
  __typename?: "Query";
  searchUser: Array<{
    __typename?: "User";
    Id: number;
    Name: string;
    Surname: string;
    Email: string;
    createdAt: string;
    updatedAt: string;
    staffOf?: Maybe<
      Array<{
        __typename?: "StaffMembers";
        role: string;
        kindergarden?: Maybe<{
          __typename?: "KinderGarden";
          Id: number;
          Name: string;
          City: string;
          Address: string;
          Zipcode: number;
        }>;
      }>
    >;
  }>;
};

export type ShowChildrenQueryVariables = Exact<{
  text: Scalars["String"];
}>;

export type ShowChildrenQuery = {
  __typename?: "Query";
  showChildren: Array<{
    __typename?: "Children";
    Id: number;
    Name: string;
    Surname: string;
    Gender: string;
    BirthDate?: Maybe<any>;
    OIB: number;
    Remarks: string;
    motherId?: Maybe<number>;
    fatherId?: Maybe<number>;
    createdAt: any;
    updatedAt: any;
    createdBy?: Maybe<{
      __typename?: "User";
      Id: number;
      Name: string;
      Surname: string;
      Email: string;
      createdAt: string;
      updatedAt: string;
      staffOf?: Maybe<
        Array<{
          __typename?: "StaffMembers";
          role: string;
          kindergarden?: Maybe<{
            __typename?: "KinderGarden";
            Id: number;
            Name: string;
            City: string;
            Address: string;
            Zipcode: number;
          }>;
        }>
      >;
    }>;
    updatedBy?: Maybe<{
      __typename?: "User";
      Id: number;
      Name: string;
      Surname: string;
      Email: string;
      createdAt: string;
      updatedAt: string;
      staffOf?: Maybe<
        Array<{
          __typename?: "StaffMembers";
          role: string;
          kindergarden?: Maybe<{
            __typename?: "KinderGarden";
            Id: number;
            Name: string;
            City: string;
            Address: string;
            Zipcode: number;
          }>;
        }>
      >;
    }>;
    mother?: Maybe<{
      __typename?: "Mother";
      Id: number;
      Name: string;
      Surname: string;
      Email: string;
      Phone: number;
      createdAt: any;
      updatedAt: any;
      createdBy?: Maybe<{
        __typename?: "User";
        Id: number;
        Name: string;
        Surname: string;
        Email: string;
        createdAt: string;
        updatedAt: string;
        staffOf?: Maybe<
          Array<{
            __typename?: "StaffMembers";
            role: string;
            kindergarden?: Maybe<{
              __typename?: "KinderGarden";
              Id: number;
              Name: string;
              City: string;
              Address: string;
              Zipcode: number;
            }>;
          }>
        >;
      }>;
      updatedBy?: Maybe<{
        __typename?: "User";
        Id: number;
        Name: string;
        Surname: string;
        Email: string;
        createdAt: string;
        updatedAt: string;
        staffOf?: Maybe<
          Array<{
            __typename?: "StaffMembers";
            role: string;
            kindergarden?: Maybe<{
              __typename?: "KinderGarden";
              Id: number;
              Name: string;
              City: string;
              Address: string;
              Zipcode: number;
            }>;
          }>
        >;
      }>;
    }>;
    father?: Maybe<{
      __typename?: "Father";
      Id: number;
      Name: string;
      Surname: string;
      Email: string;
      Phone: number;
      createdAt: any;
      updatedAt: any;
      createdBy?: Maybe<{
        __typename?: "User";
        Id: number;
        Name: string;
        Surname: string;
        Email: string;
        createdAt: string;
        updatedAt: string;
        staffOf?: Maybe<
          Array<{
            __typename?: "StaffMembers";
            role: string;
            kindergarden?: Maybe<{
              __typename?: "KinderGarden";
              Id: number;
              Name: string;
              City: string;
              Address: string;
              Zipcode: number;
            }>;
          }>
        >;
      }>;
      updatedBy?: Maybe<{
        __typename?: "User";
        Id: number;
        Name: string;
        Surname: string;
        Email: string;
        createdAt: string;
        updatedAt: string;
        staffOf?: Maybe<
          Array<{
            __typename?: "StaffMembers";
            role: string;
            kindergarden?: Maybe<{
              __typename?: "KinderGarden";
              Id: number;
              Name: string;
              City: string;
              Address: string;
              Zipcode: number;
            }>;
          }>
        >;
      }>;
    }>;
  }>;
};

export type ShowChildrenFilterInGroupQueryVariables = Exact<{
  limit: Scalars["Int"];
  cursor?: Maybe<Scalars["String"]>;
}>;

export type ShowChildrenFilterInGroupQuery = {
  __typename?: "Query";
  showChildrenFilterInGroup: {
    __typename?: "PaginatedChildren";
    hasMore: boolean;
    children: Array<{
      __typename?: "Children";
      Id: number;
      Name: string;
      Surname: string;
      Gender: string;
      BirthDate?: Maybe<any>;
      OIB: number;
      Remarks: string;
      motherId?: Maybe<number>;
      fatherId?: Maybe<number>;
      createdAt: any;
      updatedAt: any;
      createdBy?: Maybe<{
        __typename?: "User";
        Id: number;
        Name: string;
        Surname: string;
        Email: string;
        createdAt: string;
        updatedAt: string;
        staffOf?: Maybe<
          Array<{
            __typename?: "StaffMembers";
            role: string;
            kindergarden?: Maybe<{
              __typename?: "KinderGarden";
              Id: number;
              Name: string;
              City: string;
              Address: string;
              Zipcode: number;
            }>;
          }>
        >;
      }>;
      updatedBy?: Maybe<{
        __typename?: "User";
        Id: number;
        Name: string;
        Surname: string;
        Email: string;
        createdAt: string;
        updatedAt: string;
        staffOf?: Maybe<
          Array<{
            __typename?: "StaffMembers";
            role: string;
            kindergarden?: Maybe<{
              __typename?: "KinderGarden";
              Id: number;
              Name: string;
              City: string;
              Address: string;
              Zipcode: number;
            }>;
          }>
        >;
      }>;
      mother?: Maybe<{
        __typename?: "Mother";
        Id: number;
        Name: string;
        Surname: string;
        Email: string;
        Phone: number;
        createdAt: any;
        updatedAt: any;
        createdBy?: Maybe<{
          __typename?: "User";
          Id: number;
          Name: string;
          Surname: string;
          Email: string;
          createdAt: string;
          updatedAt: string;
          staffOf?: Maybe<
            Array<{
              __typename?: "StaffMembers";
              role: string;
              kindergarden?: Maybe<{
                __typename?: "KinderGarden";
                Id: number;
                Name: string;
                City: string;
                Address: string;
                Zipcode: number;
              }>;
            }>
          >;
        }>;
        updatedBy?: Maybe<{
          __typename?: "User";
          Id: number;
          Name: string;
          Surname: string;
          Email: string;
          createdAt: string;
          updatedAt: string;
          staffOf?: Maybe<
            Array<{
              __typename?: "StaffMembers";
              role: string;
              kindergarden?: Maybe<{
                __typename?: "KinderGarden";
                Id: number;
                Name: string;
                City: string;
                Address: string;
                Zipcode: number;
              }>;
            }>
          >;
        }>;
      }>;
      father?: Maybe<{
        __typename?: "Father";
        Id: number;
        Name: string;
        Surname: string;
        Email: string;
        Phone: number;
        createdAt: any;
        updatedAt: any;
        createdBy?: Maybe<{
          __typename?: "User";
          Id: number;
          Name: string;
          Surname: string;
          Email: string;
          createdAt: string;
          updatedAt: string;
          staffOf?: Maybe<
            Array<{
              __typename?: "StaffMembers";
              role: string;
              kindergarden?: Maybe<{
                __typename?: "KinderGarden";
                Id: number;
                Name: string;
                City: string;
                Address: string;
                Zipcode: number;
              }>;
            }>
          >;
        }>;
        updatedBy?: Maybe<{
          __typename?: "User";
          Id: number;
          Name: string;
          Surname: string;
          Email: string;
          createdAt: string;
          updatedAt: string;
          staffOf?: Maybe<
            Array<{
              __typename?: "StaffMembers";
              role: string;
              kindergarden?: Maybe<{
                __typename?: "KinderGarden";
                Id: number;
                Name: string;
                City: string;
                Address: string;
                Zipcode: number;
              }>;
            }>
          >;
        }>;
      }>;
    }>;
  };
};

export type ShowChildrenNotIngroupQueryVariables = Exact<{
  limit: Scalars["Int"];
  cursor?: Maybe<Scalars["String"]>;
}>;

export type ShowChildrenNotIngroupQuery = {
  __typename?: "Query";
  showChildrenFilterNotInGroup: {
    __typename?: "PaginatedChildren";
    hasMore: boolean;
    children: Array<{
      __typename?: "Children";
      Id: number;
      Name: string;
      Surname: string;
      Gender: string;
      BirthDate?: Maybe<any>;
      OIB: number;
      Remarks: string;
      motherId?: Maybe<number>;
      fatherId?: Maybe<number>;
      createdAt: any;
      updatedAt: any;
      createdBy?: Maybe<{
        __typename?: "User";
        Id: number;
        Name: string;
        Surname: string;
        Email: string;
        createdAt: string;
        updatedAt: string;
        staffOf?: Maybe<
          Array<{
            __typename?: "StaffMembers";
            role: string;
            kindergarden?: Maybe<{
              __typename?: "KinderGarden";
              Id: number;
              Name: string;
              City: string;
              Address: string;
              Zipcode: number;
            }>;
          }>
        >;
      }>;
      updatedBy?: Maybe<{
        __typename?: "User";
        Id: number;
        Name: string;
        Surname: string;
        Email: string;
        createdAt: string;
        updatedAt: string;
        staffOf?: Maybe<
          Array<{
            __typename?: "StaffMembers";
            role: string;
            kindergarden?: Maybe<{
              __typename?: "KinderGarden";
              Id: number;
              Name: string;
              City: string;
              Address: string;
              Zipcode: number;
            }>;
          }>
        >;
      }>;
      mother?: Maybe<{
        __typename?: "Mother";
        Id: number;
        Name: string;
        Surname: string;
        Email: string;
        Phone: number;
        createdAt: any;
        updatedAt: any;
        createdBy?: Maybe<{
          __typename?: "User";
          Id: number;
          Name: string;
          Surname: string;
          Email: string;
          createdAt: string;
          updatedAt: string;
          staffOf?: Maybe<
            Array<{
              __typename?: "StaffMembers";
              role: string;
              kindergarden?: Maybe<{
                __typename?: "KinderGarden";
                Id: number;
                Name: string;
                City: string;
                Address: string;
                Zipcode: number;
              }>;
            }>
          >;
        }>;
        updatedBy?: Maybe<{
          __typename?: "User";
          Id: number;
          Name: string;
          Surname: string;
          Email: string;
          createdAt: string;
          updatedAt: string;
          staffOf?: Maybe<
            Array<{
              __typename?: "StaffMembers";
              role: string;
              kindergarden?: Maybe<{
                __typename?: "KinderGarden";
                Id: number;
                Name: string;
                City: string;
                Address: string;
                Zipcode: number;
              }>;
            }>
          >;
        }>;
      }>;
      father?: Maybe<{
        __typename?: "Father";
        Id: number;
        Name: string;
        Surname: string;
        Email: string;
        Phone: number;
        createdAt: any;
        updatedAt: any;
        createdBy?: Maybe<{
          __typename?: "User";
          Id: number;
          Name: string;
          Surname: string;
          Email: string;
          createdAt: string;
          updatedAt: string;
          staffOf?: Maybe<
            Array<{
              __typename?: "StaffMembers";
              role: string;
              kindergarden?: Maybe<{
                __typename?: "KinderGarden";
                Id: number;
                Name: string;
                City: string;
                Address: string;
                Zipcode: number;
              }>;
            }>
          >;
        }>;
        updatedBy?: Maybe<{
          __typename?: "User";
          Id: number;
          Name: string;
          Surname: string;
          Email: string;
          createdAt: string;
          updatedAt: string;
          staffOf?: Maybe<
            Array<{
              __typename?: "StaffMembers";
              role: string;
              kindergarden?: Maybe<{
                __typename?: "KinderGarden";
                Id: number;
                Name: string;
                City: string;
                Address: string;
                Zipcode: number;
              }>;
            }>
          >;
        }>;
      }>;
    }>;
  };
};

export type ShowfatherQueryVariables = Exact<{
  limit: Scalars["Int"];
  cursor?: Maybe<Scalars["String"]>;
}>;

export type ShowfatherQuery = {
  __typename?: "Query";
  showFather: {
    __typename?: "PaginatedFather";
    hasMore: boolean;
    father: Array<{
      __typename?: "Father";
      Id: number;
      Name: string;
      Surname: string;
      Email: string;
      Phone: number;
      createdAt: any;
      updatedAt: any;
      createdBy?: Maybe<{
        __typename?: "User";
        Id: number;
        Name: string;
        Surname: string;
        Email: string;
        createdAt: string;
        updatedAt: string;
        staffOf?: Maybe<
          Array<{
            __typename?: "StaffMembers";
            role: string;
            kindergarden?: Maybe<{
              __typename?: "KinderGarden";
              Id: number;
              Name: string;
              City: string;
              Address: string;
              Zipcode: number;
            }>;
          }>
        >;
      }>;
      updatedBy?: Maybe<{
        __typename?: "User";
        Id: number;
        Name: string;
        Surname: string;
        Email: string;
        createdAt: string;
        updatedAt: string;
        staffOf?: Maybe<
          Array<{
            __typename?: "StaffMembers";
            role: string;
            kindergarden?: Maybe<{
              __typename?: "KinderGarden";
              Id: number;
              Name: string;
              City: string;
              Address: string;
              Zipcode: number;
            }>;
          }>
        >;
      }>;
    }>;
  };
};

export type ShowGroupsQueryVariables = Exact<{ [key: string]: never }>;

export type ShowGroupsQuery = {
  __typename?: "Query";
  showGroups: Array<{
    __typename?: "Groups";
    Id: number;
    Name: string;
    createdAt: string;
    updatedAt: string;
  }>;
};

export type ShowKindergardenQueryVariables = Exact<{ [key: string]: never }>;

export type ShowKindergardenQuery = {
  __typename?: "Query";
  showKindergarden: Array<{
    __typename?: "KinderGarden";
    Id: number;
    Name: string;
    City: string;
    Address: string;
    Zipcode: number;
  }>;
};

export type ShowMotherQueryVariables = Exact<{
  limit: Scalars["Int"];
  cursor?: Maybe<Scalars["String"]>;
}>;

export type ShowMotherQuery = {
  __typename?: "Query";
  showMother: {
    __typename?: "PaginatedMother";
    hasMore: boolean;
    mother: Array<{
      __typename?: "Mother";
      Id: number;
      Name: string;
      Surname: string;
      Email: string;
      Phone: number;
      createdAt: any;
      updatedAt: any;
      createdBy?: Maybe<{
        __typename?: "User";
        Id: number;
        Name: string;
        Surname: string;
        Email: string;
        createdAt: string;
        updatedAt: string;
        staffOf?: Maybe<
          Array<{
            __typename?: "StaffMembers";
            role: string;
            kindergarden?: Maybe<{
              __typename?: "KinderGarden";
              Id: number;
              Name: string;
              City: string;
              Address: string;
              Zipcode: number;
            }>;
          }>
        >;
      }>;
      updatedBy?: Maybe<{
        __typename?: "User";
        Id: number;
        Name: string;
        Surname: string;
        Email: string;
        createdAt: string;
        updatedAt: string;
        staffOf?: Maybe<
          Array<{
            __typename?: "StaffMembers";
            role: string;
            kindergarden?: Maybe<{
              __typename?: "KinderGarden";
              Id: number;
              Name: string;
              City: string;
              Address: string;
              Zipcode: number;
            }>;
          }>
        >;
      }>;
    }>;
  };
};

export type ShowSelectedGroupQueryVariables = Exact<{ [key: string]: never }>;

export type ShowSelectedGroupQuery = {
  __typename?: "Query";
  showSelectedGroup?: Maybe<{
    __typename?: "Groups";
    Id: number;
    Name: string;
    createdAt: string;
    updatedAt: string;
  }>;
};

export type ShowSelectedKindergardenQueryVariables = Exact<{
  [key: string]: never;
}>;

export type ShowSelectedKindergardenQuery = {
  __typename?: "Query";
  selectedKindergarden?: Maybe<{
    __typename?: "KinderGarden";
    Id: number;
    Name: string;
    City: string;
    Address: string;
    Zipcode: number;
    owning?: Maybe<{
      __typename?: "User";
      Id: number;
      Name: string;
      Surname: string;
      Email: string;
      createdAt: string;
      updatedAt: string;
      staffOf?: Maybe<
        Array<{
          __typename?: "StaffMembers";
          role: string;
          kindergarden?: Maybe<{
            __typename?: "KinderGarden";
            Id: number;
            Name: string;
            City: string;
            Address: string;
            Zipcode: number;
          }>;
        }>
      >;
    }>;
  }>;
};

export type ShowStaffQueryVariables = Exact<{ [key: string]: never }>;

export type ShowStaffQuery = {
  __typename?: "Query";
  showStaff: Array<{
    __typename?: "StaffMembers";
    staffId: number;
    kindergardenId: number;
    role: string;
    staff?: Maybe<{
      __typename?: "User";
      Id: number;
      Name: string;
      Surname: string;
      Email: string;
      createdAt: string;
      updatedAt: string;
      staffOf?: Maybe<
        Array<{
          __typename?: "StaffMembers";
          role: string;
          kindergarden?: Maybe<{
            __typename?: "KinderGarden";
            Id: number;
            Name: string;
            City: string;
            Address: string;
            Zipcode: number;
          }>;
        }>
      >;
    }>;
    kindergarden?: Maybe<{
      __typename?: "KinderGarden";
      Id: number;
      Name: string;
      City: string;
      Address: string;
      Zipcode: number;
    }>;
  }>;
};

export const KindergardenFragmentFragmentDoc = gql`
  fragment KindergardenFragment on KinderGarden {
    Id
    Name
    City
    Address
    Zipcode
  }
`;
export const UserFragmentFragmentDoc = gql`
  fragment UserFragment on User {
    Id
    Name
    Surname
    Email
    staffOf {
      kindergarden {
        ...KindergardenFragment
      }
      role
    }
    createdAt
    updatedAt
  }
  ${KindergardenFragmentFragmentDoc}
`;
export const MotherFragmentFragmentDoc = gql`
  fragment MotherFragment on Mother {
    Id
    Name
    Surname
    Email
    Phone
    createdBy {
      ...UserFragment
    }
    updatedBy {
      ...UserFragment
    }
    createdAt
    updatedAt
  }
  ${UserFragmentFragmentDoc}
`;
export const FatherFragmentFragmentDoc = gql`
  fragment FatherFragment on Father {
    Id
    Name
    Surname
    Email
    Phone
    createdBy {
      ...UserFragment
    }
    updatedBy {
      ...UserFragment
    }
    createdAt
    updatedAt
  }
  ${UserFragmentFragmentDoc}
`;
export const ChildrenFragmentFragmentDoc = gql`
  fragment ChildrenFragment on Children {
    Id
    Name
    Surname
    Gender
    BirthDate
    OIB
    Remarks
    createdBy {
      ...UserFragment
    }
    updatedBy {
      ...UserFragment
    }
    mother {
      ...MotherFragment
    }
    father {
      ...FatherFragment
    }
    motherId
    fatherId
    createdAt
    updatedAt
  }
  ${UserFragmentFragmentDoc}
  ${MotherFragmentFragmentDoc}
  ${FatherFragmentFragmentDoc}
`;
export const ErrorFragmentFragmentDoc = gql`
  fragment ErrorFragment on FieldError {
    field
    message
  }
`;
export const GroupFragmentFragmentDoc = gql`
  fragment GroupFragment on Groups {
    Id
    Name
    createdAt
    updatedAt
  }
`;
export const StaffFragmentFragmentDoc = gql`
  fragment StaffFragment on StaffMembers {
    staffId
    kindergardenId
    staff {
      ...UserFragment
    }
    kindergarden {
      ...KindergardenFragment
    }
    role
  }
  ${UserFragmentFragmentDoc}
  ${KindergardenFragmentFragmentDoc}
`;
export const AddChildToGroupDocument = gql`
  mutation AddChildToGroup($id: Int!) {
    addChildToGroup(id: $id) {
      ...ChildrenFragment
    }
  }
  ${ChildrenFragmentFragmentDoc}
`;

export function useAddChildToGroupMutation() {
  return Urql.useMutation<
    AddChildToGroupMutation,
    AddChildToGroupMutationVariables
  >(AddChildToGroupDocument);
}
export const AddFatherDocument = gql`
  mutation AddFather($options: ParentsInput!) {
    addFather(options: $options) {
      ...FatherFragment
    }
  }
  ${FatherFragmentFragmentDoc}
`;

export function useAddFatherMutation() {
  return Urql.useMutation<AddFatherMutation, AddFatherMutationVariables>(
    AddFatherDocument
  );
}
export const AddMotherDocument = gql`
  mutation AddMother($options: ParentsInput!) {
    addMother(options: $options) {
      ...MotherFragment
    }
  }
  ${MotherFragmentFragmentDoc}
`;

export function useAddMotherMutation() {
  return Urql.useMutation<AddMotherMutation, AddMotherMutationVariables>(
    AddMotherDocument
  );
}
export const AddStaffDocument = gql`
  mutation AddStaff($role: String!, $userId: Int!) {
    addStaff(role: $role, userId: $userId) {
      staff {
        ...StaffFragment
      }
      errors {
        ...ErrorFragment
      }
    }
  }
  ${StaffFragmentFragmentDoc}
  ${ErrorFragmentFragmentDoc}
`;

export function useAddStaffMutation() {
  return Urql.useMutation<AddStaffMutation, AddStaffMutationVariables>(
    AddStaffDocument
  );
}
export const ChangePasswordDocument = gql`
  mutation ChangePassword(
    $token: String!
    $newPassword: String!
    $repeatNewPassword: String!
  ) {
    changePassword(
      token: $token
      newPassword: $newPassword
      repeatNewPassword: $repeatNewPassword
    ) {
      errors {
        ...ErrorFragment
      }
      user {
        ...UserFragment
      }
    }
  }
  ${ErrorFragmentFragmentDoc}
  ${UserFragmentFragmentDoc}
`;

export function useChangePasswordMutation() {
  return Urql.useMutation<
    ChangePasswordMutation,
    ChangePasswordMutationVariables
  >(ChangePasswordDocument);
}
export const ClearGroupDocument = gql`
  mutation ClearGroup {
    clearGroup
  }
`;

export function useClearGroupMutation() {
  return Urql.useMutation<ClearGroupMutation, ClearGroupMutationVariables>(
    ClearGroupDocument
  );
}
export const ClearKindergardenDocument = gql`
  mutation ClearKindergarden {
    clearKindergarden
  }
`;

export function useClearKindergardenMutation() {
  return Urql.useMutation<
    ClearKindergardenMutation,
    ClearKindergardenMutationVariables
  >(ClearKindergardenDocument);
}
export const CreateChildDocument = gql`
  mutation CreateChild($options: ChildrenInput!) {
    createChild(options: $options) {
      ...ChildrenFragment
    }
  }
  ${ChildrenFragmentFragmentDoc}
`;

export function useCreateChildMutation() {
  return Urql.useMutation<CreateChildMutation, CreateChildMutationVariables>(
    CreateChildDocument
  );
}
export const CreateGroupDocument = gql`
  mutation CreateGroup($name: String!) {
    createGroup(name: $name) {
      groups {
        ...GroupFragment
      }
      errors {
        ...ErrorFragment
      }
    }
  }
  ${GroupFragmentFragmentDoc}
  ${ErrorFragmentFragmentDoc}
`;

export function useCreateGroupMutation() {
  return Urql.useMutation<CreateGroupMutation, CreateGroupMutationVariables>(
    CreateGroupDocument
  );
}
export const CreateKindergardenDocument = gql`
  mutation CreateKindergarden($options: KinderGardenInput!) {
    createKindergarden(options: $options) {
      kindergarden {
        ...KindergardenFragment
      }
      errors {
        ...ErrorFragment
      }
    }
  }
  ${KindergardenFragmentFragmentDoc}
  ${ErrorFragmentFragmentDoc}
`;

export function useCreateKindergardenMutation() {
  return Urql.useMutation<
    CreateKindergardenMutation,
    CreateKindergardenMutationVariables
  >(CreateKindergardenDocument);
}
export const DeleteChildrenDocument = gql`
  mutation DeleteChildren($id: Int!) {
    deleteChildren(id: $id)
  }
`;

export function useDeleteChildrenMutation() {
  return Urql.useMutation<
    DeleteChildrenMutation,
    DeleteChildrenMutationVariables
  >(DeleteChildrenDocument);
}
export const DeleteFatherDocument = gql`
  mutation DeleteFather($fatherId: Int!) {
    deleteFather(fatherId: $fatherId)
  }
`;

export function useDeleteFatherMutation() {
  return Urql.useMutation<DeleteFatherMutation, DeleteFatherMutationVariables>(
    DeleteFatherDocument
  );
}
export const DeleteGroupDocument = gql`
  mutation DeleteGroup($id: Int!) {
    deleteGroup(id: $id)
  }
`;

export function useDeleteGroupMutation() {
  return Urql.useMutation<DeleteGroupMutation, DeleteGroupMutationVariables>(
    DeleteGroupDocument
  );
}
export const DeleteKindergardenDocument = gql`
  mutation DeleteKindergarden($id: Int!) {
    deleteKindergarden(id: $id)
  }
`;

export function useDeleteKindergardenMutation() {
  return Urql.useMutation<
    DeleteKindergardenMutation,
    DeleteKindergardenMutationVariables
  >(DeleteKindergardenDocument);
}
export const DeleteMotherDocument = gql`
  mutation DeleteMother($motherId: Int!) {
    deleteMother(motherId: $motherId)
  }
`;

export function useDeleteMotherMutation() {
  return Urql.useMutation<DeleteMotherMutation, DeleteMotherMutationVariables>(
    DeleteMotherDocument
  );
}
export const DeleteStaffDocument = gql`
  mutation DeleteStaff($userId: Int!) {
    deleteStaff(userId: $userId)
  }
`;

export function useDeleteStaffMutation() {
  return Urql.useMutation<DeleteStaffMutation, DeleteStaffMutationVariables>(
    DeleteStaffDocument
  );
}
export const ForgotPasswordDocument = gql`
  mutation ForgotPassword($email: String!) {
    forgetPassword(email: $email)
  }
`;

export function useForgotPasswordMutation() {
  return Urql.useMutation<
    ForgotPasswordMutation,
    ForgotPasswordMutationVariables
  >(ForgotPasswordDocument);
}
export const LoginDocument = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        ...UserFragment
        ownerOf {
          ...KindergardenFragment
        }
      }
      errors {
        ...ErrorFragment
      }
    }
  }
  ${UserFragmentFragmentDoc}
  ${KindergardenFragmentFragmentDoc}
  ${ErrorFragmentFragmentDoc}
`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
}
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(
    LogoutDocument
  );
}
export const RegisterDocument = gql`
  mutation Register($options: UsernamePasswordInput!) {
    register(options: $options) {
      user {
        ...UserFragment
      }
      errors {
        ...ErrorFragment
      }
    }
  }
  ${UserFragmentFragmentDoc}
  ${ErrorFragmentFragmentDoc}
`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(
    RegisterDocument
  );
}
export const RemoveChildFromGroupDocument = gql`
  mutation RemoveChildFromGroup($Id: Int!) {
    removeChildFromGroup(Id: $Id) {
      ...ChildrenFragment
    }
  }
  ${ChildrenFragmentFragmentDoc}
`;

export function useRemoveChildFromGroupMutation() {
  return Urql.useMutation<
    RemoveChildFromGroupMutation,
    RemoveChildFromGroupMutationVariables
  >(RemoveChildFromGroupDocument);
}
export const ResendEmailDocument = gql`
  mutation ResendEmail($email: String!) {
    resendEmail(email: $email) {
      user {
        Id
      }
      errors {
        ...ErrorFragment
      }
    }
  }
  ${ErrorFragmentFragmentDoc}
`;

export function useResendEmailMutation() {
  return Urql.useMutation<ResendEmailMutation, ResendEmailMutationVariables>(
    ResendEmailDocument
  );
}
export const SendEmailDocument = gql`
  mutation SendEmail($input: ContactInput!) {
    sendEmail(input: $input)
  }
`;

export function useSendEmailMutation() {
  return Urql.useMutation<SendEmailMutation, SendEmailMutationVariables>(
    SendEmailDocument
  );
}
export const UpdateChildDocument = gql`
  mutation UpdateChild($kidId: Int!, $options: ChildrenInput!) {
    updateChild(kidId: $kidId, options: $options) {
      ...ChildrenFragment
    }
  }
  ${ChildrenFragmentFragmentDoc}
`;

export function useUpdateChildMutation() {
  return Urql.useMutation<UpdateChildMutation, UpdateChildMutationVariables>(
    UpdateChildDocument
  );
}
export const UpdateChildrenParentsDocument = gql`
  mutation UpdateChildrenParents(
    $childId: Int!
    $motherId: Int
    $fatherId: Int
  ) {
    updateChildernParents(
      kidId: $childId
      motherId: $motherId
      fatherId: $fatherId
    ) {
      ...ChildrenFragment
    }
  }
  ${ChildrenFragmentFragmentDoc}
`;

export function useUpdateChildrenParentsMutation() {
  return Urql.useMutation<
    UpdateChildrenParentsMutation,
    UpdateChildrenParentsMutationVariables
  >(UpdateChildrenParentsDocument);
}
export const UpdateFatherDocument = gql`
  mutation UpdateFather($fatherId: Int!, $options: ParentsInput!) {
    updateFather(fatherId: $fatherId, options: $options) {
      ...FatherFragment
    }
  }
  ${FatherFragmentFragmentDoc}
`;

export function useUpdateFatherMutation() {
  return Urql.useMutation<UpdateFatherMutation, UpdateFatherMutationVariables>(
    UpdateFatherDocument
  );
}
export const UpdateMotherDocument = gql`
  mutation UpdateMother($motherId: Int!, $options: ParentsInput!) {
    updateMother(motherId: $motherId, options: $options) {
      ...MotherFragment
    }
  }
  ${MotherFragmentFragmentDoc}
`;

export function useUpdateMotherMutation() {
  return Urql.useMutation<UpdateMotherMutation, UpdateMotherMutationVariables>(
    UpdateMotherDocument
  );
}
export const UpdatePasswordDocument = gql`
  mutation UpdatePassword($options: UpdatePassword!) {
    updatePassword(options: $options) {
      user {
        ...UserFragment
      }
      errors {
        ...ErrorFragment
      }
    }
  }
  ${UserFragmentFragmentDoc}
  ${ErrorFragmentFragmentDoc}
`;

export function useUpdatePasswordMutation() {
  return Urql.useMutation<
    UpdatePasswordMutation,
    UpdatePasswordMutationVariables
  >(UpdatePasswordDocument);
}
export const UpdateUserDocument = gql`
  mutation UpdateUser($options: UpdateUserInput!) {
    updateUser(options: $options) {
      user {
        ...UserFragment
      }
      errors {
        ...ErrorFragment
      }
    }
  }
  ${UserFragmentFragmentDoc}
  ${ErrorFragmentFragmentDoc}
`;

export function useUpdateUserMutation() {
  return Urql.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(
    UpdateUserDocument
  );
}
export const UseChildrenDocument = gql`
  mutation UseChildren {
    useChildren {
      children {
        Id
        Name
      }
      errors {
        ...ErrorFragment
      }
    }
  }
  ${ErrorFragmentFragmentDoc}
`;

export function useUseChildrenMutation() {
  return Urql.useMutation<UseChildrenMutation, UseChildrenMutationVariables>(
    UseChildrenDocument
  );
}
export const UseGroupDocument = gql`
  mutation UseGroup($groupId: Float!) {
    useGroup(groupId: $groupId) {
      groups {
        ...GroupFragment
      }
      errors {
        ...ErrorFragment
      }
    }
  }
  ${GroupFragmentFragmentDoc}
  ${ErrorFragmentFragmentDoc}
`;

export function useUseGroupMutation() {
  return Urql.useMutation<UseGroupMutation, UseGroupMutationVariables>(
    UseGroupDocument
  );
}
export const UseKindergardenDocument = gql`
  mutation UseKindergarden($kindergardenID: Float!) {
    useKindergarden(kindergadenID: $kindergardenID) {
      kindergarden {
        ...KindergardenFragment
        owning {
          ...UserFragment
        }
        groups {
          ...GroupFragment
        }
        staff {
          ...StaffFragment
        }
      }
      errors {
        ...ErrorFragment
      }
    }
  }
  ${KindergardenFragmentFragmentDoc}
  ${UserFragmentFragmentDoc}
  ${GroupFragmentFragmentDoc}
  ${StaffFragmentFragmentDoc}
  ${ErrorFragmentFragmentDoc}
`;

export function useUseKindergardenMutation() {
  return Urql.useMutation<
    UseKindergardenMutation,
    UseKindergardenMutationVariables
  >(UseKindergardenDocument);
}
export const VerifyAccountDocument = gql`
  mutation VerifyAccount($token: String!) {
    verifyAccount(token: $token) {
      user {
        ...UserFragment
      }
      errors {
        ...ErrorFragment
      }
    }
  }
  ${UserFragmentFragmentDoc}
  ${ErrorFragmentFragmentDoc}
`;

export function useVerifyAccountMutation() {
  return Urql.useMutation<
    VerifyAccountMutation,
    VerifyAccountMutationVariables
  >(VerifyAccountDocument);
}
export const FilterFatherDocument = gql`
  query FilterFather($text: String!) {
    filterFather(text: $text) {
      ...FatherFragment
    }
  }
  ${FatherFragmentFragmentDoc}
`;

export function useFilterFatherQuery(
  options: Omit<Urql.UseQueryArgs<FilterFatherQueryVariables>, "query"> = {}
) {
  return Urql.useQuery<FilterFatherQuery>({
    query: FilterFatherDocument,
    ...options,
  });
}
export const FilterMotherDocument = gql`
  query FilterMother($text: String!) {
    filterMother(text: $text) {
      ...MotherFragment
    }
  }
  ${MotherFragmentFragmentDoc}
`;

export function useFilterMotherQuery(
  options: Omit<Urql.UseQueryArgs<FilterMotherQueryVariables>, "query"> = {}
) {
  return Urql.useQuery<FilterMotherQuery>({
    query: FilterMotherDocument,
    ...options,
  });
}
export const FilterStaffDocument = gql`
  query FilterStaff {
    filterStaff {
      ...StaffFragment
    }
  }
  ${StaffFragmentFragmentDoc}
`;

export function useFilterStaffQuery(
  options: Omit<Urql.UseQueryArgs<FilterStaffQueryVariables>, "query"> = {}
) {
  return Urql.useQuery<FilterStaffQuery>({
    query: FilterStaffDocument,
    ...options,
  });
}
export const FindChildDocument = gql`
  query FindChild($id: Int!) {
    findChild(id: $id) {
      ...ChildrenFragment
    }
  }
  ${ChildrenFragmentFragmentDoc}
`;

export function useFindChildQuery(
  options: Omit<Urql.UseQueryArgs<FindChildQueryVariables>, "query"> = {}
) {
  return Urql.useQuery<FindChildQuery>({
    query: FindChildDocument,
    ...options,
  });
}
export const FindFatherDocument = gql`
  query FindFather($id: Int!) {
    findFather(id: $id) {
      ...FatherFragment
    }
  }
  ${FatherFragmentFragmentDoc}
`;

export function useFindFatherQuery(
  options: Omit<Urql.UseQueryArgs<FindFatherQueryVariables>, "query"> = {}
) {
  return Urql.useQuery<FindFatherQuery>({
    query: FindFatherDocument,
    ...options,
  });
}
export const FindMotherDocument = gql`
  query FindMother($id: Int!) {
    findMother(id: $id) {
      ...MotherFragment
    }
  }
  ${MotherFragmentFragmentDoc}
`;

export function useFindMotherQuery(
  options: Omit<Urql.UseQueryArgs<FindMotherQueryVariables>, "query"> = {}
) {
  return Urql.useQuery<FindMotherQuery>({
    query: FindMotherDocument,
    ...options,
  });
}
export const MeDocument = gql`
  query Me {
    me {
      ...UserFragment
    }
  }
  ${UserFragmentFragmentDoc}
`;

export function useMeQuery(
  options: Omit<Urql.UseQueryArgs<MeQueryVariables>, "query"> = {}
) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
}
export const OwnerDocument = gql`
  query Owner {
    owner {
      owning {
        ...UserFragment
      }
    }
  }
  ${UserFragmentFragmentDoc}
`;

export function useOwnerQuery(
  options: Omit<Urql.UseQueryArgs<OwnerQueryVariables>, "query"> = {}
) {
  return Urql.useQuery<OwnerQuery>({ query: OwnerDocument, ...options });
}
export const SearchUserDocument = gql`
  query SearchUser($text: String!) {
    searchUser(text: $text) {
      ...UserFragment
    }
  }
  ${UserFragmentFragmentDoc}
`;

export function useSearchUserQuery(
  options: Omit<Urql.UseQueryArgs<SearchUserQueryVariables>, "query"> = {}
) {
  return Urql.useQuery<SearchUserQuery>({
    query: SearchUserDocument,
    ...options,
  });
}
export const ShowChildrenDocument = gql`
  query ShowChildren($text: String!) {
    showChildren(text: $text) {
      ...ChildrenFragment
    }
  }
  ${ChildrenFragmentFragmentDoc}
`;

export function useShowChildrenQuery(
  options: Omit<Urql.UseQueryArgs<ShowChildrenQueryVariables>, "query"> = {}
) {
  return Urql.useQuery<ShowChildrenQuery>({
    query: ShowChildrenDocument,
    ...options,
  });
}
export const ShowChildrenFilterInGroupDocument = gql`
  query ShowChildrenFilterInGroup($limit: Int!, $cursor: String) {
    showChildrenFilterInGroup(limit: $limit, cursor: $cursor) {
      children {
        ...ChildrenFragment
      }
      hasMore
    }
  }
  ${ChildrenFragmentFragmentDoc}
`;

export function useShowChildrenFilterInGroupQuery(
  options: Omit<
    Urql.UseQueryArgs<ShowChildrenFilterInGroupQueryVariables>,
    "query"
  > = {}
) {
  return Urql.useQuery<ShowChildrenFilterInGroupQuery>({
    query: ShowChildrenFilterInGroupDocument,
    ...options,
  });
}
export const ShowChildrenNotIngroupDocument = gql`
  query ShowChildrenNotIngroup($limit: Int!, $cursor: String) {
    showChildrenFilterNotInGroup(limit: $limit, cursor: $cursor) {
      children {
        ...ChildrenFragment
      }
      hasMore
    }
  }
  ${ChildrenFragmentFragmentDoc}
`;

export function useShowChildrenNotIngroupQuery(
  options: Omit<
    Urql.UseQueryArgs<ShowChildrenNotIngroupQueryVariables>,
    "query"
  > = {}
) {
  return Urql.useQuery<ShowChildrenNotIngroupQuery>({
    query: ShowChildrenNotIngroupDocument,
    ...options,
  });
}
export const ShowfatherDocument = gql`
  query Showfather($limit: Int!, $cursor: String) {
    showFather(limit: $limit, cursor: $cursor) {
      father {
        ...FatherFragment
      }
      hasMore
    }
  }
  ${FatherFragmentFragmentDoc}
`;

export function useShowfatherQuery(
  options: Omit<Urql.UseQueryArgs<ShowfatherQueryVariables>, "query"> = {}
) {
  return Urql.useQuery<ShowfatherQuery>({
    query: ShowfatherDocument,
    ...options,
  });
}
export const ShowGroupsDocument = gql`
  query ShowGroups {
    showGroups {
      ...GroupFragment
    }
  }
  ${GroupFragmentFragmentDoc}
`;

export function useShowGroupsQuery(
  options: Omit<Urql.UseQueryArgs<ShowGroupsQueryVariables>, "query"> = {}
) {
  return Urql.useQuery<ShowGroupsQuery>({
    query: ShowGroupsDocument,
    ...options,
  });
}
export const ShowKindergardenDocument = gql`
  query ShowKindergarden {
    showKindergarden {
      ...KindergardenFragment
    }
  }
  ${KindergardenFragmentFragmentDoc}
`;

export function useShowKindergardenQuery(
  options: Omit<Urql.UseQueryArgs<ShowKindergardenQueryVariables>, "query"> = {}
) {
  return Urql.useQuery<ShowKindergardenQuery>({
    query: ShowKindergardenDocument,
    ...options,
  });
}
export const ShowMotherDocument = gql`
  query ShowMother($limit: Int!, $cursor: String) {
    showMother(limit: $limit, cursor: $cursor) {
      mother {
        ...MotherFragment
      }
      hasMore
    }
  }
  ${MotherFragmentFragmentDoc}
`;

export function useShowMotherQuery(
  options: Omit<Urql.UseQueryArgs<ShowMotherQueryVariables>, "query"> = {}
) {
  return Urql.useQuery<ShowMotherQuery>({
    query: ShowMotherDocument,
    ...options,
  });
}
export const ShowSelectedGroupDocument = gql`
  query ShowSelectedGroup {
    showSelectedGroup {
      ...GroupFragment
    }
  }
  ${GroupFragmentFragmentDoc}
`;

export function useShowSelectedGroupQuery(
  options: Omit<
    Urql.UseQueryArgs<ShowSelectedGroupQueryVariables>,
    "query"
  > = {}
) {
  return Urql.useQuery<ShowSelectedGroupQuery>({
    query: ShowSelectedGroupDocument,
    ...options,
  });
}
export const ShowSelectedKindergardenDocument = gql`
  query ShowSelectedKindergarden {
    selectedKindergarden {
      ...KindergardenFragment
      owning {
        ...UserFragment
      }
    }
  }
  ${KindergardenFragmentFragmentDoc}
  ${UserFragmentFragmentDoc}
`;

export function useShowSelectedKindergardenQuery(
  options: Omit<
    Urql.UseQueryArgs<ShowSelectedKindergardenQueryVariables>,
    "query"
  > = {}
) {
  return Urql.useQuery<ShowSelectedKindergardenQuery>({
    query: ShowSelectedKindergardenDocument,
    ...options,
  });
}
export const ShowStaffDocument = gql`
  query ShowStaff {
    showStaff {
      ...StaffFragment
    }
  }
  ${StaffFragmentFragmentDoc}
`;

export function useShowStaffQuery(
  options: Omit<Urql.UseQueryArgs<ShowStaffQueryVariables>, "query"> = {}
) {
  return Urql.useQuery<ShowStaffQuery>({
    query: ShowStaffDocument,
    ...options,
  });
}
