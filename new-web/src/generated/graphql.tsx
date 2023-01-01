import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type AttedanceResponse = {
  __typename?: 'AttedanceResponse';
  data?: Maybe<Attendance>;
  errors?: Maybe<Array<FieldError>>;
};

export type Attendance = {
  __typename?: 'Attendance';
  Id: Scalars['Float'];
  attendance?: Maybe<Scalars['Boolean']>;
  childId?: Maybe<Scalars['Float']>;
  createdAt: Scalars['DateTime'];
  groupId?: Maybe<Scalars['Float']>;
  kindergardenId?: Maybe<Scalars['Float']>;
  updatedAt: Scalars['DateTime'];
};

export type Children = {
  __typename?: 'Children';
  BirthDate?: Maybe<Scalars['DateTime']>;
  Gender: Scalars['String'];
  Id: Scalars['Float'];
  Name: Scalars['String'];
  OIB: Scalars['Float'];
  Remarks: Scalars['String'];
  Surname: Scalars['String'];
  createdAt: Scalars['DateTime'];
  createdBy?: Maybe<User>;
  createdById?: Maybe<Scalars['Float']>;
  deletedAt: Scalars['DateTime'];
  father?: Maybe<Father>;
  fatherId?: Maybe<Scalars['Float']>;
  inGroup?: Maybe<Groups>;
  mother?: Maybe<Mother>;
  motherId?: Maybe<Scalars['Float']>;
  updatedAt: Scalars['DateTime'];
  updatedBy?: Maybe<User>;
  updatedById?: Maybe<Scalars['Float']>;
};

export type ChildrenInput = {
  BirthDate: Scalars['DateTime'];
  Gender: Scalars['String'];
  Name: Scalars['String'];
  OIB: Scalars['Float'];
  Remarks: Scalars['String'];
  Surname: Scalars['String'];
  father?: InputMaybe<Scalars['Float']>;
  mother?: InputMaybe<Scalars['Float']>;
};

export type ChildrenResponse = {
  __typename?: 'ChildrenResponse';
  data?: Maybe<Children>;
  errors?: Maybe<Array<FieldError>>;
};

export type ContactInput = {
  email: Scalars['String'];
  message: Scalars['String'];
  subject: Scalars['String'];
};

export type Father = {
  __typename?: 'Father';
  Email: Scalars['String'];
  Id: Scalars['Float'];
  Name: Scalars['String'];
  Phone: Scalars['Float'];
  Surname: Scalars['String'];
  archived: Scalars['DateTime'];
  createdAt: Scalars['DateTime'];
  createdBy?: Maybe<User>;
  updatedAt: Scalars['DateTime'];
  updatedBy?: Maybe<User>;
};

export type FatherResponse = {
  __typename?: 'FatherResponse';
  data?: Maybe<Father>;
  errors?: Maybe<Array<FieldError>>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Groups = {
  __typename?: 'Groups';
  Id: Scalars['Float'];
  Name: Scalars['String'];
  children?: Maybe<Array<Children>>;
  createdAt: Scalars['String'];
  inKindergarden?: Maybe<KinderGarden>;
  updatedAt: Scalars['String'];
};

export type GroupsResponse = {
  __typename?: 'GroupsResponse';
  errors?: Maybe<Array<FieldError>>;
  groups?: Maybe<Groups>;
};

export type KinderGarden = {
  __typename?: 'KinderGarden';
  Address: Scalars['String'];
  City: Scalars['String'];
  Id: Scalars['Float'];
  Name: Scalars['String'];
  Zipcode: Scalars['Float'];
  createdAt: Scalars['String'];
  deletedAt: Scalars['String'];
  groups?: Maybe<Array<Groups>>;
  owning?: Maybe<User>;
  staff?: Maybe<Array<StaffMembers>>;
  updatedAt: Scalars['String'];
};

export type KinderGardenInput = {
  Zipcode: Scalars['Float'];
  address: Scalars['String'];
  city: Scalars['String'];
  name: Scalars['String'];
};

export type KindergardenPaginatedResponse = {
  __typename?: 'KindergardenPaginatedResponse';
  data?: Maybe<Array<KinderGarden>>;
  errors?: Maybe<Array<FieldError>>;
  hasMore: Scalars['Boolean'];
};

export type KindergardenResponse = {
  __typename?: 'KindergardenResponse';
  data?: Maybe<KinderGarden>;
  errors?: Maybe<Array<FieldError>>;
};

export type Mother = {
  __typename?: 'Mother';
  Email: Scalars['String'];
  Id: Scalars['Float'];
  Name: Scalars['String'];
  Phone: Scalars['Float'];
  Surname: Scalars['String'];
  archived: Scalars['DateTime'];
  createdAt: Scalars['DateTime'];
  createdBy?: Maybe<User>;
  updatedAt: Scalars['DateTime'];
  updatedBy?: Maybe<User>;
};

export type MotherResponse = {
  __typename?: 'MotherResponse';
  errors?: Maybe<Array<FieldError>>;
  mother?: Maybe<Mother>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addChildToGroup: ChildrenResponse;
  addFather: FatherResponse;
  addMother: MotherResponse;
  addStaff: StaffResponse;
  changePassword: UserResponse;
  clearGroup: Scalars['Boolean'];
  createAttendacne: AttedanceResponse;
  createChild: ChildrenResponse;
  createGroup: GroupsResponse;
  createKindergarden: KindergardenResponse;
  delete: Scalars['Boolean'];
  deleteChildren: Scalars['Boolean'];
  deleteFather: Scalars['Boolean'];
  deleteGroup: Scalars['Boolean'];
  deleteKindergarden: Scalars['Boolean'];
  deleteMother: Scalars['Boolean'];
  deleteStaff: Scalars['Boolean'];
  forgetPassword: Scalars['Boolean'];
  login: UserResponse;
  logout: Scalars['Boolean'];
  markAttendance: AttedanceResponse;
  register: UserResponse;
  removeChildFromGroup?: Maybe<ChildrenResponse>;
  resendEmail: UserResponse;
  sendEmail: Scalars['Boolean'];
  updateChild: ChildrenResponse;
  updateChildernParents: ChildrenResponse;
  updateFather: FatherResponse;
  updateMother: MotherResponse;
  updatePassword: UserResponse;
  updateUser: UserResponse;
  useGroup: GroupsResponse;
  useKindergarden: KindergardenResponse;
  verifyAccount: UserResponse;
};


export type MutationAddChildToGroupArgs = {
  id: Scalars['Int'];
};


export type MutationAddFatherArgs = {
  options: ParentsInput;
};


export type MutationAddMotherArgs = {
  options: ParentsInput;
};


export type MutationAddStaffArgs = {
  role: Scalars['String'];
  userId: Scalars['Int'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  repeatNewPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationCreateAttendacneArgs = {
  childId: Scalars['Int'];
  complete?: InputMaybe<Scalars['Boolean']>;
};


export type MutationCreateChildArgs = {
  options: ChildrenInput;
};


export type MutationCreateGroupArgs = {
  name: Scalars['String'];
};


export type MutationCreateKindergardenArgs = {
  options: KinderGardenInput;
};


export type MutationDeleteArgs = {
  attendanceId: Scalars['Int'];
};


export type MutationDeleteChildrenArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteFatherArgs = {
  Id: Scalars['Int'];
};


export type MutationDeleteGroupArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteKindergardenArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteMotherArgs = {
  motherId: Scalars['Int'];
};


export type MutationDeleteStaffArgs = {
  userId: Scalars['Int'];
};


export type MutationForgetPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationMarkAttendanceArgs = {
  attendanceId: Scalars['Int'];
};


export type MutationRegisterArgs = {
  options: UsernamePasswordInput;
};


export type MutationRemoveChildFromGroupArgs = {
  Id: Scalars['Int'];
};


export type MutationResendEmailArgs = {
  email: Scalars['String'];
};


export type MutationSendEmailArgs = {
  input: ContactInput;
};


export type MutationUpdateChildArgs = {
  kidId: Scalars['Int'];
  options: ChildrenInput;
};


export type MutationUpdateChildernParentsArgs = {
  fatherId?: InputMaybe<Scalars['Int']>;
  kidId: Scalars['Int'];
  motherId?: InputMaybe<Scalars['Int']>;
};


export type MutationUpdateFatherArgs = {
  fatherId: Scalars['Int'];
  options: ParentsInput;
};


export type MutationUpdateMotherArgs = {
  motherId: Scalars['Int'];
  options: ParentsInput;
};


export type MutationUpdatePasswordArgs = {
  options: UpdatePassword;
};


export type MutationUpdateUserArgs = {
  options: UpdateUserInput;
};


export type MutationUseGroupArgs = {
  groupId: Scalars['Float'];
};


export type MutationUseKindergardenArgs = {
  kindergadenID: Scalars['Float'];
};


export type MutationVerifyAccountArgs = {
  token: Scalars['String'];
};

export type PaginatedAttendacne = {
  __typename?: 'PaginatedAttendacne';
  data?: Maybe<Array<Attendance>>;
  errors?: Maybe<Array<FieldError>>;
  hasMore: Scalars['Boolean'];
};

export type PaginatedChildren = {
  __typename?: 'PaginatedChildren';
  data?: Maybe<Array<Children>>;
  errors?: Maybe<Array<FieldError>>;
  hasMore: Scalars['Boolean'];
};

export type PaginatedFather = {
  __typename?: 'PaginatedFather';
  data?: Maybe<Array<Father>>;
  errors?: Maybe<Array<FieldError>>;
  hasMore: Scalars['Boolean'];
};

export type PaginatedMother = {
  __typename?: 'PaginatedMother';
  hasMore: Scalars['Boolean'];
  mother: Array<Mother>;
};

export type ParentsInput = {
  email: Scalars['String'];
  name: Scalars['String'];
  phone: Scalars['Float'];
  surname: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  filterChildren: Array<Children>;
  filterFather: Array<Father>;
  filterMother: Array<Mother>;
  filterStaff?: Maybe<StaffMembers>;
  findChild?: Maybe<Children>;
  findMother: Mother;
  me?: Maybe<User>;
  owner: KinderGarden;
  searchMother: Array<Mother>;
  searchUser: Array<User>;
  showAllAttendance: PaginatedAttendacne;
  showChildren: PaginatedChildren;
  showFather: PaginatedFather;
  showGroups: Array<Groups>;
  showKindergarden: KindergardenPaginatedResponse;
  showMother: PaginatedMother;
  showSelectedGroup?: Maybe<Groups>;
  showStaff: Array<StaffMembers>;
  staffOf: Array<User>;
};


export type QueryFilterChildrenArgs = {
  text: Scalars['String'];
};


export type QueryFilterFatherArgs = {
  text: Scalars['String'];
};


export type QueryFilterMotherArgs = {
  text: Scalars['String'];
};


export type QueryFindChildArgs = {
  id: Scalars['Int'];
};


export type QueryFindMotherArgs = {
  id: Scalars['Int'];
};


export type QuerySearchMotherArgs = {
  text: Scalars['String'];
};


export type QuerySearchUserArgs = {
  text: Scalars['String'];
};


export type QueryShowAllAttendanceArgs = {
  cursor: Scalars['String'];
  limit: Scalars['Int'];
};


export type QueryShowChildrenArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  inGroup?: InputMaybe<Scalars['Int']>;
  limit: Scalars['Int'];
};


export type QueryShowFatherArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryShowKindergardenArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryShowMotherArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  limit: Scalars['Int'];
};

export type StaffMembers = {
  __typename?: 'StaffMembers';
  kindergarden?: Maybe<KinderGarden>;
  kindergardenId: Scalars['Float'];
  role: Scalars['String'];
  staff?: Maybe<User>;
  staffId: Scalars['Float'];
};

export type StaffResponse = {
  __typename?: 'StaffResponse';
  errors?: Maybe<Array<FieldError>>;
  staff?: Maybe<StaffMembers>;
};

export type UpdatePassword = {
  password: Scalars['String'];
  repeatPassword: Scalars['String'];
};

export type UpdateUserInput = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  surname: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  Email: Scalars['String'];
  Id: Scalars['Float'];
  Name: Scalars['String'];
  Surname: Scalars['String'];
  createdAt: Scalars['String'];
  createdChildren?: Maybe<Array<Children>>;
  createdFather?: Maybe<Array<Father>>;
  createdMother?: Maybe<Array<Mother>>;
  ownerOf: Array<KinderGarden>;
  staffOf?: Maybe<Array<StaffMembers>>;
  updatedAt: Scalars['String'];
  updatedChildren?: Maybe<Array<Children>>;
  updatedFather?: Maybe<Array<Father>>;
  updatedMother?: Maybe<Array<Mother>>;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type UsernamePasswordInput = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  repeatPassword: Scalars['String'];
  surname: Scalars['String'];
};

export type ErrorFragmentFragment = { __typename?: 'FieldError', field: string, message: string };

export type UserFragmentFragment = { __typename?: 'User', Id: number, Name: string, Surname: string, Email: string, createdAt: string, updatedAt: string };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', user?: { __typename?: 'User', Id: number, Name: string, Surname: string, Email: string, createdAt: string, updatedAt: string } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type RegisterMutationVariables = Exact<{
  options: UsernamePasswordInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', user?: { __typename?: 'User', Id: number, Name: string, Surname: string, Email: string, createdAt: string, updatedAt: string } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', Id: number, Name: string, Surname: string, Email: string, createdAt: string, updatedAt: string } | null };

export const ErrorFragmentFragmentDoc = gql`
    fragment ErrorFragment on FieldError {
  field
  message
}
    `;
export const UserFragmentFragmentDoc = gql`
    fragment UserFragment on User {
  Id
  Name
  Surname
  Email
  createdAt
  updatedAt
}
    `;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    user {
      ...UserFragment
    }
    errors {
      ...ErrorFragment
    }
  }
}
    ${UserFragmentFragmentDoc}
${ErrorFragmentFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
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
${ErrorFragmentFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const MeDocument = gql`
    query Me {
  me {
    ...UserFragment
  }
}
    ${UserFragmentFragmentDoc}`;

export function useMeQuery(options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'>) {
  return Urql.useQuery<MeQuery, MeQueryVariables>({ query: MeDocument, ...options });
};