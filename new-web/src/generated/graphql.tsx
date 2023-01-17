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

export type ActionType = {
  __typename?: 'ActionType';
  function: Scalars['String'];
  type: Scalars['String'];
};

export type ActivityLog = {
  __typename?: 'ActivityLog';
  action: ActionType;
  args: Scalars['String'];
  createdAt: Scalars['DateTime'];
  groupId?: Maybe<Scalars['Float']>;
  id: Scalars['Float'];
  kindergardenId?: Maybe<Scalars['Float']>;
  userId?: Maybe<Scalars['Float']>;
};

export type ArrayChildrenResponse = {
  __typename?: 'ArrayChildrenResponse';
  data?: Maybe<Array<Children>>;
  errors?: Maybe<Array<FieldError>>;
};

export type ArrayGroupResponse = {
  __typename?: 'ArrayGroupResponse';
  data?: Maybe<Array<Groups>>;
  errors?: Maybe<Array<FieldError>>;
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
  deletedAt?: Maybe<Scalars['DateTime']>;
  groupId?: Maybe<Scalars['Float']>;
  kindergardenId?: Maybe<Scalars['Float']>;
  updatedAt: Scalars['DateTime'];
};

export type AttendanceBooleanResponse = {
  __typename?: 'AttendanceBooleanResponse';
  errors?: Maybe<Array<FieldError>>;
  result?: Maybe<Scalars['Boolean']>;
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

export type ChildrenBooleanResponse = {
  __typename?: 'ChildrenBooleanResponse';
  errors?: Maybe<Array<FieldError>>;
  result?: Maybe<Scalars['Boolean']>;
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

export type ContactBooleanResponse = {
  __typename?: 'ContactBooleanResponse';
  errors?: Maybe<Array<FieldError>>;
  result?: Maybe<Scalars['Boolean']>;
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

export type FatherArrayResponse = {
  __typename?: 'FatherArrayResponse';
  data?: Maybe<Array<Father>>;
  errors?: Maybe<Array<FieldError>>;
};

export type FatherBooleanResponse = {
  __typename?: 'FatherBooleanResponse';
  errors?: Maybe<Array<FieldError>>;
  result?: Maybe<Scalars['Boolean']>;
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
  archived: Scalars['String'];
  children?: Maybe<Array<Children>>;
  createdAt: Scalars['String'];
  inKindergarden?: Maybe<KinderGarden>;
  updatedAt: Scalars['String'];
};

export type GroupsBooleanResponse = {
  __typename?: 'GroupsBooleanResponse';
  errors?: Maybe<Array<FieldError>>;
  result?: Maybe<Scalars['Boolean']>;
};

export type GroupsResponse = {
  __typename?: 'GroupsResponse';
  data?: Maybe<Groups>;
  errors?: Maybe<Array<FieldError>>;
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

export type KindergardenBooleanResponse = {
  __typename?: 'KindergardenBooleanResponse';
  errors?: Maybe<Array<FieldError>>;
  result?: Maybe<Scalars['Boolean']>;
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

export type MotherArrayResponse = {
  __typename?: 'MotherArrayResponse';
  data?: Maybe<Array<Mother>>;
  errors?: Maybe<Array<FieldError>>;
};

export type MotherBooleanResponse = {
  __typename?: 'MotherBooleanResponse';
  errors?: Maybe<Array<FieldError>>;
  result?: Maybe<Scalars['Boolean']>;
};

export type MotherResponse = {
  __typename?: 'MotherResponse';
  data?: Maybe<Mother>;
  errors?: Maybe<Array<FieldError>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addChildToGroup: ChildrenResponse;
  addProfilePicture: UserResponse;
  addStaff: StaffResponse;
  changePassword: UserResponse;
  clearGroup: Scalars['Boolean'];
  createAttendance: AttedanceResponse;
  createChild: ChildrenResponse;
  createGroup: GroupsResponse;
  createKindergarden: KindergardenResponse;
  deleteAttendance: AttendanceBooleanResponse;
  deleteChildren: ChildrenBooleanResponse;
  deleteFather: FatherBooleanResponse;
  deleteGroup: GroupsBooleanResponse;
  deleteKindergarden: KindergardenBooleanResponse;
  deleteMother: MotherBooleanResponse;
  deleteStaff: StaffBooleanResponse;
  forgetPassword: UserBooleanResponse;
  insertFather: FatherResponse;
  insertMother: MotherResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  markAttendance: AttedanceResponse;
  register: UserResponse;
  removeChildFromGroup: ChildrenResponse;
  resendEmail: UserBooleanResponse;
  sendEmail: ContactBooleanResponse;
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


export type MutationAddProfilePictureArgs = {
  picture: Scalars['String'];
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


export type MutationCreateAttendanceArgs = {
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


export type MutationDeleteAttendanceArgs = {
  id: Scalars['Int'];
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
  id: Scalars['Int'];
};


export type MutationDeleteStaffArgs = {
  userId: Scalars['Int'];
};


export type MutationForgetPasswordArgs = {
  email: Scalars['String'];
};


export type MutationInsertFatherArgs = {
  options: ParentsInput;
};


export type MutationInsertMotherArgs = {
  options: ParentsInput;
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationMarkAttendanceArgs = {
  id: Scalars['Int'];
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
  id: Scalars['Int'];
  options: ParentsInput;
};


export type MutationUpdatePasswordArgs = {
  options: UpdatePassword;
};


export type MutationUpdateUserArgs = {
  options: UpdateUserInput;
};


export type MutationUseGroupArgs = {
  id: Scalars['Float'];
};


export type MutationUseKindergardenArgs = {
  id: Scalars['Float'];
};


export type MutationVerifyAccountArgs = {
  token: Scalars['String'];
};

export type PaginatedActivityLogResponse = {
  __typename?: 'PaginatedActivityLogResponse';
  data?: Maybe<Array<ActivityLog>>;
  errors?: Maybe<Array<FieldError>>;
  hasMore: Scalars['Boolean'];
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
  data?: Maybe<Array<Mother>>;
  errors?: Maybe<Array<FieldError>>;
  hasMore: Scalars['Boolean'];
};

export type PaginatedStaffResponse = {
  __typename?: 'PaginatedStaffResponse';
  data?: Maybe<Array<StaffMembers>>;
  errors?: Maybe<Array<FieldError>>;
  hasMore: Scalars['Boolean'];
};

export type ParentsInput = {
  email: Scalars['String'];
  name: Scalars['String'];
  phone: Scalars['Float'];
  surname: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  filterChildren: ArrayChildrenResponse;
  findChildById: ChildrenResponse;
  getFatherById: FatherResponse;
  getKindergardenById: KindergardenResponse;
  getMotherById: MotherResponse;
  getOwner: KindergardenResponse;
  listArchivedStaff: PaginatedStaffResponse;
  listAttendance: PaginatedAttendacne;
  listChildren: PaginatedChildren;
  listFather: PaginatedFather;
  listGroups: ArrayGroupResponse;
  listKindergarden: KindergardenPaginatedResponse;
  listMother: PaginatedMother;
  listStaff: PaginatedStaffResponse;
  me?: Maybe<UserResponse>;
  searchFather: FatherArrayResponse;
  searchMother: MotherArrayResponse;
  showActivity: PaginatedActivityLogResponse;
  showSelectedGroup: GroupsResponse;
  staffOf: Array<User>;
};


export type QueryFilterChildrenArgs = {
  text: Scalars['String'];
};


export type QueryFindChildByIdArgs = {
  id: Scalars['Int'];
};


export type QueryGetFatherByIdArgs = {
  id: Scalars['Int'];
};


export type QueryGetKindergardenByIdArgs = {
  id: Scalars['Int'];
};


export type QueryGetMotherByIdArgs = {
  id: Scalars['Int'];
};


export type QueryListArchivedStaffArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryListAttendanceArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  limit: Scalars['Int'];
  marked?: InputMaybe<Scalars['Boolean']>;
};


export type QueryListChildrenArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  inGroup?: InputMaybe<Scalars['Int']>;
  limit: Scalars['Int'];
};


export type QueryListFatherArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryListKindergardenArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryListMotherArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryListStaffArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QuerySearchFatherArgs = {
  text: Scalars['String'];
};


export type QuerySearchMotherArgs = {
  text: Scalars['String'];
};


export type QueryShowActivityArgs = {
  createdAt?: InputMaybe<Scalars['String']>;
  groupId?: InputMaybe<Scalars['Int']>;
  kindergardenId?: InputMaybe<Scalars['Int']>;
  limit: Scalars['Int'];
  userId?: InputMaybe<Scalars['Int']>;
};

export type StaffBooleanResponse = {
  __typename?: 'StaffBooleanResponse';
  errors?: Maybe<Array<FieldError>>;
  result?: Maybe<Scalars['Boolean']>;
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
  data?: Maybe<StaffMembers>;
  errors?: Maybe<Array<FieldError>>;
};

export type UpdatePassword = {
  password: Scalars['String'];
  repeatPassword: Scalars['String'];
};

export type UpdateUserInput = {
  email: Scalars['String'];
  name: Scalars['String'];
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
  picture: Scalars['String'];
  staffOf?: Maybe<Array<StaffMembers>>;
  updatedAt: Scalars['String'];
  updatedChildren?: Maybe<Array<Children>>;
  updatedFather?: Maybe<Array<Father>>;
  updatedMother?: Maybe<Array<Mother>>;
};

export type UserBooleanResponse = {
  __typename?: 'UserBooleanResponse';
  errors?: Maybe<Array<FieldError>>;
  result?: Maybe<Scalars['Boolean']>;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  data?: Maybe<User>;
  errors?: Maybe<Array<FieldError>>;
};

export type UsernamePasswordInput = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  repeatPassword: Scalars['String'];
  surname: Scalars['String'];
};

export type ChildrenFragmentFragment = { __typename?: 'Children', Id: number, Name: string, Surname: string, Gender: string, BirthDate?: any | null, OIB: number, Remarks: string, motherId?: number | null, fatherId?: number | null, createdAt: any, updatedAt: any };

export type ErrorFragmentFragment = { __typename?: 'FieldError', field: string, message: string };

export type UserFragmentFragment = { __typename?: 'User', Id: number, Name: string, Surname: string, Email: string, createdAt: string, updatedAt: string };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', data?: { __typename?: 'User', Id: number, Name: string, Surname: string, Email: string, createdAt: string, updatedAt: string } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  options: UsernamePasswordInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', data?: { __typename?: 'User', Id: number, Name: string, Surname: string, Email: string, createdAt: string, updatedAt: string } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'UserResponse', data?: { __typename?: 'User', Id: number, Name: string, Surname: string, Email: string, createdAt: string, updatedAt: string } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } | null };

export type ListChildrenQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: InputMaybe<Scalars['String']>;
  inGroup?: InputMaybe<Scalars['Int']>;
}>;


export type ListChildrenQuery = { __typename?: 'Query', listChildren: { __typename?: 'PaginatedChildren', hasMore: boolean, data?: Array<{ __typename?: 'Children', Id: number, Name: string, Surname: string, Gender: string, BirthDate?: any | null, OIB: number, Remarks: string, motherId?: number | null, fatherId?: number | null, createdAt: any, updatedAt: any }> | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export const ChildrenFragmentFragmentDoc = gql`
    fragment ChildrenFragment on Children {
  Id
  Name
  Surname
  Gender
  BirthDate
  OIB
  Remarks
  motherId
  fatherId
  createdAt
  updatedAt
}
    `;
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
    data {
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
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($options: UsernamePasswordInput!) {
  register(options: $options) {
    data {
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
    data {
      ...UserFragment
    }
    errors {
      ...ErrorFragment
    }
  }
}
    ${UserFragmentFragmentDoc}
${ErrorFragmentFragmentDoc}`;

export function useMeQuery(options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'>) {
  return Urql.useQuery<MeQuery, MeQueryVariables>({ query: MeDocument, ...options });
};
export const ListChildrenDocument = gql`
    query ListChildren($limit: Int!, $cursor: String, $inGroup: Int) {
  listChildren(limit: $limit, cursor: $cursor, inGroup: $inGroup) {
    data {
      ...ChildrenFragment
    }
    errors {
      ...ErrorFragment
    }
    hasMore
  }
}
    ${ChildrenFragmentFragmentDoc}
${ErrorFragmentFragmentDoc}`;

export function useListChildrenQuery(options: Omit<Urql.UseQueryArgs<ListChildrenQueryVariables>, 'query'>) {
  return Urql.useQuery<ListChildrenQuery, ListChildrenQueryVariables>({ query: ListChildrenDocument, ...options });
};