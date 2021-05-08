import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
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
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  staffOf: Array<User>;
  me?: Maybe<User>;
  searchUser: Array<User>;
  selectedKindergarden?: Maybe<KinderGarden>;
  showKinderGardenStaff: KinderGarden;
  showKindergarden: Array<KinderGarden>;
  showSelectedGroup?: Maybe<Groups>;
  showGroups: Array<Groups>;
  showChildrenFilterNoParents: Array<Children>;
  showChildrenFilterNotInGroup: PaginatedChildren;
  showChildrenFilterInGroup: PaginatedChildren;
  showChildren: Array<Children>;
  findChild?: Maybe<Children>;
  showFather: PaginatedFather;
  findFather: Father;
  filterFather: Array<Father>;
  showMother: PaginatedMother;
  findMother: Mother;
  filterMother: Array<Mother>;
};


export type QuerySearchUserArgs = {
  text: Scalars['String'];
};


export type QueryShowChildrenFilterNotInGroupArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryShowChildrenFilterInGroupArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryShowChildrenArgs = {
  text: Scalars['String'];
};


export type QueryFindChildArgs = {
  id: Scalars['Int'];
};


export type QueryShowFatherArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryFindFatherArgs = {
  id: Scalars['Int'];
};


export type QueryFilterFatherArgs = {
  text: Scalars['String'];
};


export type QueryShowMotherArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryFindMotherArgs = {
  id: Scalars['Int'];
};


export type QueryFilterMotherArgs = {
  text: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  Id: Scalars['Float'];
  Name: Scalars['String'];
  Surname: Scalars['String'];
  Email: Scalars['String'];
  Role: Scalars['String'];
  ownerOf: Array<KinderGarden>;
  partof?: Maybe<Array<KinderGarden>>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type KinderGarden = {
  __typename?: 'KinderGarden';
  Id: Scalars['Float'];
  Name: Scalars['String'];
  Address: Scalars['String'];
  City: Scalars['String'];
  Zipcode: Scalars['Float'];
  owning?: Maybe<User>;
  groups?: Maybe<Array<Groups>>;
  staff: Array<User>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Groups = {
  __typename?: 'Groups';
  Id: Scalars['Float'];
  Name: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  inKindergarden?: Maybe<KinderGarden>;
  children?: Maybe<Array<Children>>;
};

export type Children = {
  __typename?: 'Children';
  Id: Scalars['Float'];
  Name: Scalars['String'];
  Surname: Scalars['String'];
  Gender: Scalars['String'];
  BirthDate?: Maybe<Scalars['String']>;
  OIB: Scalars['Float'];
  Remarks: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  motherId?: Maybe<Scalars['Float']>;
  fatherId?: Maybe<Scalars['Float']>;
  inGroup?: Maybe<Groups>;
  mother?: Maybe<Mother>;
  father?: Maybe<Father>;
};

export type Mother = {
  __typename?: 'Mother';
  Id: Scalars['Float'];
  Name: Scalars['String'];
  Surname: Scalars['String'];
  Email: Scalars['String'];
  Phone: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Father = {
  __typename?: 'Father';
  Id: Scalars['Float'];
  Name: Scalars['String'];
  Surname: Scalars['String'];
  Email: Scalars['String'];
  Phone: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type PaginatedChildren = {
  __typename?: 'PaginatedChildren';
  children: Array<Children>;
  hasMore: Scalars['Boolean'];
};

export type PaginatedFather = {
  __typename?: 'PaginatedFather';
  father: Array<Father>;
  hasMore: Scalars['Boolean'];
};

export type PaginatedMother = {
  __typename?: 'PaginatedMother';
  mother: Array<Mother>;
  hasMore: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  updatePassword: UserResponse;
  updateUser: UserResponse;
  changePassword: UserResponse;
  forgetPassword: Scalars['Boolean'];
  login: UserResponse;
  register: UserResponse;
  resendEmail: UserResponse;
  verifyAccount: UserResponse;
  logout: Scalars['Boolean'];
  useKindergarden: KindergardenResponse;
  createKindergarden: KindergardenResponse;
  clearKindergarden: Scalars['Boolean'];
  deleteKindergarden: Scalars['Boolean'];
  useGroup: GroupsResponse;
  createGroup: GroupsResponse;
  clearGroup: Scalars['Boolean'];
  deleteGroup: Scalars['Boolean'];
  addChildToGroup?: Maybe<Children>;
  updateChild?: Maybe<Children>;
  deleteChildren: Scalars['Boolean'];
  updateChildernParents: Children;
  createChild: Children;
  useChildren: ChildrenResponse;
  addStaff: Scalars['Boolean'];
  deleteStaff: Scalars['Boolean'];
  deleteFather: Scalars['Boolean'];
  updateFather: Father;
  addFather: Father;
  deleteMother: Scalars['Boolean'];
  updateMother: Mother;
  addMother: Mother;
  sendEmail: Scalars['Boolean'];
};


export type MutationUpdatePasswordArgs = {
  options: UpdatePassword;
};


export type MutationUpdateUserArgs = {
  options: UpdateUserInput;
};


export type MutationChangePasswordArgs = {
  repeatNewPassword: Scalars['String'];
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationForgetPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationRegisterArgs = {
  options: UsernamePasswordInput;
};


export type MutationResendEmailArgs = {
  email: Scalars['String'];
};


export type MutationVerifyAccountArgs = {
  token: Scalars['String'];
};


export type MutationUseKindergardenArgs = {
  kindergadenID: Scalars['Float'];
};


export type MutationCreateKindergardenArgs = {
  options: KinderGardenInput;
};


export type MutationDeleteKindergardenArgs = {
  id: Scalars['Int'];
};


export type MutationUseGroupArgs = {
  groupId: Scalars['Float'];
};


export type MutationCreateGroupArgs = {
  name: Scalars['String'];
};


export type MutationDeleteGroupArgs = {
  id: Scalars['Int'];
};


export type MutationAddChildToGroupArgs = {
  id: Scalars['Int'];
};


export type MutationUpdateChildArgs = {
  options: ChildrenInput;
  kidId: Scalars['Int'];
};


export type MutationDeleteChildrenArgs = {
  id: Scalars['Int'];
};


export type MutationUpdateChildernParentsArgs = {
  fatherId?: Maybe<Scalars['Int']>;
  motherId?: Maybe<Scalars['Int']>;
  kidId: Scalars['Int'];
};


export type MutationCreateChildArgs = {
  options: ChildrenInput;
};


export type MutationAddStaffArgs = {
  userId: Scalars['Int'];
};


export type MutationDeleteStaffArgs = {
  userId: Scalars['Int'];
};


export type MutationDeleteFatherArgs = {
  fatherId: Scalars['Int'];
};


export type MutationUpdateFatherArgs = {
  fatherId: Scalars['Int'];
  options: ParentsInput;
};


export type MutationAddFatherArgs = {
  options: ParentsInput;
};


export type MutationDeleteMotherArgs = {
  motherId: Scalars['Int'];
};


export type MutationUpdateMotherArgs = {
  motherId: Scalars['Int'];
  options: ParentsInput;
};


export type MutationAddMotherArgs = {
  options: ParentsInput;
};


export type MutationSendEmailArgs = {
  input: ContactInput;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type UpdatePassword = {
  password: Scalars['String'];
  repeatPassword: Scalars['String'];
};

export type UpdateUserInput = {
  name: Scalars['String'];
  surname: Scalars['String'];
  email: Scalars['String'];
  role: Scalars['String'];
  password: Scalars['String'];
};

export type UsernamePasswordInput = {
  name: Scalars['String'];
  surname: Scalars['String'];
  email: Scalars['String'];
  repeatPassword: Scalars['String'];
  password: Scalars['String'];
  role: Scalars['String'];
};

export type KindergardenResponse = {
  __typename?: 'KindergardenResponse';
  errors?: Maybe<Array<FieldError>>;
  kindergarden?: Maybe<KinderGarden>;
};

export type KinderGardenInput = {
  name: Scalars['String'];
  city: Scalars['String'];
  address: Scalars['String'];
  Zipcode: Scalars['Float'];
};

export type GroupsResponse = {
  __typename?: 'GroupsResponse';
  errors?: Maybe<Array<FieldError>>;
  groups?: Maybe<Groups>;
};

export type ChildrenInput = {
  Name: Scalars['String'];
  Surname: Scalars['String'];
  BirthDate: Scalars['DateTime'];
  OIB: Scalars['Float'];
  Remarks: Scalars['String'];
  Gender: Scalars['String'];
  mother?: Maybe<Scalars['Float']>;
  father?: Maybe<Scalars['Float']>;
};


export type ChildrenResponse = {
  __typename?: 'ChildrenResponse';
  errors?: Maybe<Array<FieldError>>;
  children?: Maybe<Children>;
};

export type ParentsInput = {
  name: Scalars['String'];
  surname: Scalars['String'];
  email: Scalars['String'];
  phone: Scalars['Float'];
};

export type ContactInput = {
  email: Scalars['String'];
  subject: Scalars['String'];
  message: Scalars['String'];
};

export type ChildrenFragmentFragment = (
  { __typename?: 'Children' }
  & Pick<Children, 'Id' | 'Name' | 'Surname' | 'Gender' | 'BirthDate' | 'OIB' | 'Remarks' | 'motherId' | 'fatherId' | 'createdAt' | 'updatedAt'>
  & { mother?: Maybe<(
    { __typename?: 'Mother' }
    & MotherFragmentFragment
  )>, father?: Maybe<(
    { __typename?: 'Father' }
    & FatherFragmentFragment
  )> }
);

export type ErrorFragmentFragment = (
  { __typename?: 'FieldError' }
  & Pick<FieldError, 'field' | 'message'>
);

export type FatherFragmentFragment = (
  { __typename?: 'Father' }
  & Pick<Father, 'Id' | 'Name' | 'Surname' | 'Email' | 'Phone' | 'createdAt' | 'updatedAt'>
);

export type GroupFragmentFragment = (
  { __typename?: 'Groups' }
  & Pick<Groups, 'Id' | 'Name' | 'createdAt' | 'updatedAt'>
);

export type KindergardenFragmentFragment = (
  { __typename?: 'KinderGarden' }
  & Pick<KinderGarden, 'Id' | 'Name' | 'City' | 'Address' | 'Zipcode'>
);

export type MotherFragmentFragment = (
  { __typename?: 'Mother' }
  & Pick<Mother, 'Id' | 'Name' | 'Surname' | 'Email' | 'Phone' | 'createdAt' | 'updatedAt'>
);

export type UserFragmentFragment = (
  { __typename?: 'User' }
  & Pick<User, 'Id' | 'Name' | 'Surname' | 'Email' | 'Role' | 'createdAt' | 'updatedAt'>
  & { partof?: Maybe<Array<(
    { __typename?: 'KinderGarden' }
    & KindergardenFragmentFragment
  )>> }
);

export type AddChildToGroupMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type AddChildToGroupMutation = (
  { __typename?: 'Mutation' }
  & { addChildToGroup?: Maybe<(
    { __typename?: 'Children' }
    & ChildrenFragmentFragment
  )> }
);

export type AddFatherMutationVariables = Exact<{
  options: ParentsInput;
}>;


export type AddFatherMutation = (
  { __typename?: 'Mutation' }
  & { addFather: (
    { __typename?: 'Father' }
    & FatherFragmentFragment
  ) }
);

export type AddMotherMutationVariables = Exact<{
  options: ParentsInput;
}>;


export type AddMotherMutation = (
  { __typename?: 'Mutation' }
  & { addMother: (
    { __typename?: 'Mother' }
    & MotherFragmentFragment
  ) }
);

export type AddStaffMutationVariables = Exact<{
  Id: Scalars['Int'];
}>;


export type AddStaffMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addStaff'>
);

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String'];
  newPassword: Scalars['String'];
  repeatNewPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & { changePassword: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & ErrorFragmentFragment
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & UserFragmentFragment
    )> }
  ) }
);

export type ClearGroupMutationVariables = Exact<{ [key: string]: never; }>;


export type ClearGroupMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'clearGroup'>
);

export type ClearKindergardenMutationVariables = Exact<{ [key: string]: never; }>;


export type ClearKindergardenMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'clearKindergarden'>
);

export type CreateChildMutationVariables = Exact<{
  options: ChildrenInput;
}>;


export type CreateChildMutation = (
  { __typename?: 'Mutation' }
  & { createChild: (
    { __typename?: 'Children' }
    & ChildrenFragmentFragment
  ) }
);

export type CreateGroupMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type CreateGroupMutation = (
  { __typename?: 'Mutation' }
  & { createGroup: (
    { __typename?: 'GroupsResponse' }
    & { groups?: Maybe<(
      { __typename?: 'Groups' }
      & GroupFragmentFragment
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & ErrorFragmentFragment
    )>> }
  ) }
);

export type CreateKindergardenMutationVariables = Exact<{
  options: KinderGardenInput;
}>;


export type CreateKindergardenMutation = (
  { __typename?: 'Mutation' }
  & { createKindergarden: (
    { __typename?: 'KindergardenResponse' }
    & { kindergarden?: Maybe<(
      { __typename?: 'KinderGarden' }
      & KindergardenFragmentFragment
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & ErrorFragmentFragment
    )>> }
  ) }
);

export type DeleteChildrenMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteChildrenMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteChildren'>
);

export type DeleteFatherMutationVariables = Exact<{
  fatherId: Scalars['Int'];
}>;


export type DeleteFatherMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteFather'>
);

export type DeleteGroupMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteGroupMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteGroup'>
);

export type DeleteKindergardenMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteKindergardenMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteKindergarden'>
);

export type DeleteMotherMutationVariables = Exact<{
  motherId: Scalars['Int'];
}>;


export type DeleteMotherMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteMother'>
);

export type DeleteStaffMutationVariables = Exact<{
  userId: Scalars['Int'];
}>;


export type DeleteStaffMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteStaff'>
);

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'forgetPassword'>
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & UserFragmentFragment
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & ErrorFragmentFragment
    )>> }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  options: UsernamePasswordInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & UserFragmentFragment
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & ErrorFragmentFragment
    )>> }
  ) }
);

export type ResendEmailMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ResendEmailMutation = (
  { __typename?: 'Mutation' }
  & { resendEmail: (
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'Id'>
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & ErrorFragmentFragment
    )>> }
  ) }
);

export type SendEmailMutationVariables = Exact<{
  input: ContactInput;
}>;


export type SendEmailMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'sendEmail'>
);

export type UpdateChildMutationVariables = Exact<{
  kidId: Scalars['Int'];
  options: ChildrenInput;
}>;


export type UpdateChildMutation = (
  { __typename?: 'Mutation' }
  & { updateChild?: Maybe<(
    { __typename?: 'Children' }
    & ChildrenFragmentFragment
  )> }
);

export type UpdateChildrenParentsMutationVariables = Exact<{
  childId: Scalars['Int'];
  motherId?: Maybe<Scalars['Int']>;
  fatherId?: Maybe<Scalars['Int']>;
}>;


export type UpdateChildrenParentsMutation = (
  { __typename?: 'Mutation' }
  & { updateChildernParents: (
    { __typename?: 'Children' }
    & ChildrenFragmentFragment
  ) }
);

export type UpdateFatherMutationVariables = Exact<{
  fatherId: Scalars['Int'];
  options: ParentsInput;
}>;


export type UpdateFatherMutation = (
  { __typename?: 'Mutation' }
  & { updateFather: (
    { __typename?: 'Father' }
    & FatherFragmentFragment
  ) }
);

export type UpdateMotherMutationVariables = Exact<{
  motherId: Scalars['Int'];
  options: ParentsInput;
}>;


export type UpdateMotherMutation = (
  { __typename?: 'Mutation' }
  & { updateMother: (
    { __typename?: 'Mother' }
    & MotherFragmentFragment
  ) }
);

export type UpdatePasswordMutationVariables = Exact<{
  options: UpdatePassword;
}>;


export type UpdatePasswordMutation = (
  { __typename?: 'Mutation' }
  & { updatePassword: (
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & UserFragmentFragment
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & ErrorFragmentFragment
    )>> }
  ) }
);

export type UpdateUserMutationVariables = Exact<{
  options: UpdateUserInput;
}>;


export type UpdateUserMutation = (
  { __typename?: 'Mutation' }
  & { updateUser: (
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & UserFragmentFragment
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & ErrorFragmentFragment
    )>> }
  ) }
);

export type UseChildrenMutationVariables = Exact<{ [key: string]: never; }>;


export type UseChildrenMutation = (
  { __typename?: 'Mutation' }
  & { useChildren: (
    { __typename?: 'ChildrenResponse' }
    & { children?: Maybe<(
      { __typename?: 'Children' }
      & Pick<Children, 'Id' | 'Name'>
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & ErrorFragmentFragment
    )>> }
  ) }
);

export type UseGroupMutationVariables = Exact<{
  groupId: Scalars['Float'];
}>;


export type UseGroupMutation = (
  { __typename?: 'Mutation' }
  & { useGroup: (
    { __typename?: 'GroupsResponse' }
    & { groups?: Maybe<(
      { __typename?: 'Groups' }
      & GroupFragmentFragment
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & ErrorFragmentFragment
    )>> }
  ) }
);

export type UseKindergardenMutationVariables = Exact<{
  kindergardenID: Scalars['Float'];
}>;


export type UseKindergardenMutation = (
  { __typename?: 'Mutation' }
  & { useKindergarden: (
    { __typename?: 'KindergardenResponse' }
    & { kindergarden?: Maybe<(
      { __typename?: 'KinderGarden' }
      & KindergardenFragmentFragment
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & ErrorFragmentFragment
    )>> }
  ) }
);

export type VerifyAccountMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type VerifyAccountMutation = (
  { __typename?: 'Mutation' }
  & { verifyAccount: (
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & UserFragmentFragment
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & ErrorFragmentFragment
    )>> }
  ) }
);

export type FilterFatherQueryVariables = Exact<{
  text: Scalars['String'];
}>;


export type FilterFatherQuery = (
  { __typename?: 'Query' }
  & { filterFather: Array<(
    { __typename?: 'Father' }
    & FatherFragmentFragment
  )> }
);

export type FilterMotherQueryVariables = Exact<{
  text: Scalars['String'];
}>;


export type FilterMotherQuery = (
  { __typename?: 'Query' }
  & { filterMother: Array<(
    { __typename?: 'Mother' }
    & MotherFragmentFragment
  )> }
);

export type FindChildQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type FindChildQuery = (
  { __typename?: 'Query' }
  & { findChild?: Maybe<(
    { __typename?: 'Children' }
    & ChildrenFragmentFragment
  )> }
);

export type FindFatherQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type FindFatherQuery = (
  { __typename?: 'Query' }
  & { findFather: (
    { __typename?: 'Father' }
    & FatherFragmentFragment
  ) }
);

export type FindMotherQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type FindMotherQuery = (
  { __typename?: 'Query' }
  & { findMother: (
    { __typename?: 'Mother' }
    & MotherFragmentFragment
  ) }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & { ownerOf: Array<(
      { __typename?: 'KinderGarden' }
      & KindergardenFragmentFragment
    )>, partof?: Maybe<Array<(
      { __typename?: 'KinderGarden' }
      & KindergardenFragmentFragment
    )>> }
    & UserFragmentFragment
  )> }
);

export type SearchUserQueryVariables = Exact<{
  text: Scalars['String'];
}>;


export type SearchUserQuery = (
  { __typename?: 'Query' }
  & { searchUser: Array<(
    { __typename?: 'User' }
    & UserFragmentFragment
  )> }
);

export type ShowChildrenQueryVariables = Exact<{
  text: Scalars['String'];
}>;


export type ShowChildrenQuery = (
  { __typename?: 'Query' }
  & { showChildren: Array<(
    { __typename?: 'Children' }
    & ChildrenFragmentFragment
  )> }
);

export type ShowChildrenFilterInGroupQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type ShowChildrenFilterInGroupQuery = (
  { __typename?: 'Query' }
  & { showChildrenFilterInGroup: (
    { __typename?: 'PaginatedChildren' }
    & Pick<PaginatedChildren, 'hasMore'>
    & { children: Array<(
      { __typename?: 'Children' }
      & ChildrenFragmentFragment
    )> }
  ) }
);

export type ShowChildrenNotIngroupQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type ShowChildrenNotIngroupQuery = (
  { __typename?: 'Query' }
  & { showChildrenFilterNotInGroup: (
    { __typename?: 'PaginatedChildren' }
    & Pick<PaginatedChildren, 'hasMore'>
    & { children: Array<(
      { __typename?: 'Children' }
      & ChildrenFragmentFragment
    )> }
  ) }
);

export type ShowfatherQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type ShowfatherQuery = (
  { __typename?: 'Query' }
  & { showFather: (
    { __typename?: 'PaginatedFather' }
    & Pick<PaginatedFather, 'hasMore'>
    & { father: Array<(
      { __typename?: 'Father' }
      & FatherFragmentFragment
    )> }
  ) }
);

export type ShowGroupsQueryVariables = Exact<{ [key: string]: never; }>;


export type ShowGroupsQuery = (
  { __typename?: 'Query' }
  & { showGroups: Array<(
    { __typename?: 'Groups' }
    & GroupFragmentFragment
  )> }
);

export type ShowKindergardenQueryVariables = Exact<{ [key: string]: never; }>;


export type ShowKindergardenQuery = (
  { __typename?: 'Query' }
  & { showKindergarden: Array<(
    { __typename?: 'KinderGarden' }
    & KindergardenFragmentFragment
  )> }
);

export type ShowKindergardenstaffQueryVariables = Exact<{ [key: string]: never; }>;


export type ShowKindergardenstaffQuery = (
  { __typename?: 'Query' }
  & { showKinderGardenStaff: (
    { __typename?: 'KinderGarden' }
    & { owning?: Maybe<(
      { __typename?: 'User' }
      & UserFragmentFragment
    )>, staff: Array<(
      { __typename?: 'User' }
      & UserFragmentFragment
    )> }
  ) }
);

export type ShowMotherQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type ShowMotherQuery = (
  { __typename?: 'Query' }
  & { showMother: (
    { __typename?: 'PaginatedMother' }
    & Pick<PaginatedMother, 'hasMore'>
    & { mother: Array<(
      { __typename?: 'Mother' }
      & MotherFragmentFragment
    )> }
  ) }
);

export type ShowSelectedGroupQueryVariables = Exact<{ [key: string]: never; }>;


export type ShowSelectedGroupQuery = (
  { __typename?: 'Query' }
  & { showSelectedGroup?: Maybe<(
    { __typename?: 'Groups' }
    & GroupFragmentFragment
  )> }
);

export type ShowSelectedKindergardenQueryVariables = Exact<{ [key: string]: never; }>;


export type ShowSelectedKindergardenQuery = (
  { __typename?: 'Query' }
  & { selectedKindergarden?: Maybe<(
    { __typename?: 'KinderGarden' }
    & KindergardenFragmentFragment
  )> }
);

export const MotherFragmentFragmentDoc = gql`
    fragment MotherFragment on Mother {
  Id
  Name
  Surname
  Email
  Phone
  createdAt
  updatedAt
}
    `;
export const FatherFragmentFragmentDoc = gql`
    fragment FatherFragment on Father {
  Id
  Name
  Surname
  Email
  Phone
  createdAt
  updatedAt
}
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
    ${MotherFragmentFragmentDoc}
${FatherFragmentFragmentDoc}`;
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
  Role
  partof {
    ...KindergardenFragment
  }
  createdAt
  updatedAt
}
    ${KindergardenFragmentFragmentDoc}`;
export const AddChildToGroupDocument = gql`
    mutation AddChildToGroup($id: Int!) {
  addChildToGroup(id: $id) {
    ...ChildrenFragment
  }
}
    ${ChildrenFragmentFragmentDoc}`;

export function useAddChildToGroupMutation() {
  return Urql.useMutation<AddChildToGroupMutation, AddChildToGroupMutationVariables>(AddChildToGroupDocument);
};
export const AddFatherDocument = gql`
    mutation AddFather($options: ParentsInput!) {
  addFather(options: $options) {
    ...FatherFragment
  }
}
    ${FatherFragmentFragmentDoc}`;

export function useAddFatherMutation() {
  return Urql.useMutation<AddFatherMutation, AddFatherMutationVariables>(AddFatherDocument);
};
export const AddMotherDocument = gql`
    mutation AddMother($options: ParentsInput!) {
  addMother(options: $options) {
    ...MotherFragment
  }
}
    ${MotherFragmentFragmentDoc}`;

export function useAddMotherMutation() {
  return Urql.useMutation<AddMotherMutation, AddMotherMutationVariables>(AddMotherDocument);
};
export const AddStaffDocument = gql`
    mutation AddStaff($Id: Int!) {
  addStaff(userId: $Id)
}
    `;

export function useAddStaffMutation() {
  return Urql.useMutation<AddStaffMutation, AddStaffMutationVariables>(AddStaffDocument);
};
export const ChangePasswordDocument = gql`
    mutation ChangePassword($token: String!, $newPassword: String!, $repeatNewPassword: String!) {
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
${UserFragmentFragmentDoc}`;

export function useChangePasswordMutation() {
  return Urql.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument);
};
export const ClearGroupDocument = gql`
    mutation ClearGroup {
  clearGroup
}
    `;

export function useClearGroupMutation() {
  return Urql.useMutation<ClearGroupMutation, ClearGroupMutationVariables>(ClearGroupDocument);
};
export const ClearKindergardenDocument = gql`
    mutation ClearKindergarden {
  clearKindergarden
}
    `;

export function useClearKindergardenMutation() {
  return Urql.useMutation<ClearKindergardenMutation, ClearKindergardenMutationVariables>(ClearKindergardenDocument);
};
export const CreateChildDocument = gql`
    mutation CreateChild($options: ChildrenInput!) {
  createChild(options: $options) {
    ...ChildrenFragment
  }
}
    ${ChildrenFragmentFragmentDoc}`;

export function useCreateChildMutation() {
  return Urql.useMutation<CreateChildMutation, CreateChildMutationVariables>(CreateChildDocument);
};
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
${ErrorFragmentFragmentDoc}`;

export function useCreateGroupMutation() {
  return Urql.useMutation<CreateGroupMutation, CreateGroupMutationVariables>(CreateGroupDocument);
};
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
${ErrorFragmentFragmentDoc}`;

export function useCreateKindergardenMutation() {
  return Urql.useMutation<CreateKindergardenMutation, CreateKindergardenMutationVariables>(CreateKindergardenDocument);
};
export const DeleteChildrenDocument = gql`
    mutation DeleteChildren($id: Int!) {
  deleteChildren(id: $id)
}
    `;

export function useDeleteChildrenMutation() {
  return Urql.useMutation<DeleteChildrenMutation, DeleteChildrenMutationVariables>(DeleteChildrenDocument);
};
export const DeleteFatherDocument = gql`
    mutation DeleteFather($fatherId: Int!) {
  deleteFather(fatherId: $fatherId)
}
    `;

export function useDeleteFatherMutation() {
  return Urql.useMutation<DeleteFatherMutation, DeleteFatherMutationVariables>(DeleteFatherDocument);
};
export const DeleteGroupDocument = gql`
    mutation DeleteGroup($id: Int!) {
  deleteGroup(id: $id)
}
    `;

export function useDeleteGroupMutation() {
  return Urql.useMutation<DeleteGroupMutation, DeleteGroupMutationVariables>(DeleteGroupDocument);
};
export const DeleteKindergardenDocument = gql`
    mutation DeleteKindergarden($id: Int!) {
  deleteKindergarden(id: $id)
}
    `;

export function useDeleteKindergardenMutation() {
  return Urql.useMutation<DeleteKindergardenMutation, DeleteKindergardenMutationVariables>(DeleteKindergardenDocument);
};
export const DeleteMotherDocument = gql`
    mutation DeleteMother($motherId: Int!) {
  deleteMother(motherId: $motherId)
}
    `;

export function useDeleteMotherMutation() {
  return Urql.useMutation<DeleteMotherMutation, DeleteMotherMutationVariables>(DeleteMotherDocument);
};
export const DeleteStaffDocument = gql`
    mutation DeleteStaff($userId: Int!) {
  deleteStaff(userId: $userId)
}
    `;

export function useDeleteStaffMutation() {
  return Urql.useMutation<DeleteStaffMutation, DeleteStaffMutationVariables>(DeleteStaffDocument);
};
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgetPassword(email: $email)
}
    `;

export function useForgotPasswordMutation() {
  return Urql.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument);
};
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
    ${ErrorFragmentFragmentDoc}`;

export function useResendEmailMutation() {
  return Urql.useMutation<ResendEmailMutation, ResendEmailMutationVariables>(ResendEmailDocument);
};
export const SendEmailDocument = gql`
    mutation SendEmail($input: ContactInput!) {
  sendEmail(input: $input)
}
    `;

export function useSendEmailMutation() {
  return Urql.useMutation<SendEmailMutation, SendEmailMutationVariables>(SendEmailDocument);
};
export const UpdateChildDocument = gql`
    mutation UpdateChild($kidId: Int!, $options: ChildrenInput!) {
  updateChild(kidId: $kidId, options: $options) {
    ...ChildrenFragment
  }
}
    ${ChildrenFragmentFragmentDoc}`;

export function useUpdateChildMutation() {
  return Urql.useMutation<UpdateChildMutation, UpdateChildMutationVariables>(UpdateChildDocument);
};
export const UpdateChildrenParentsDocument = gql`
    mutation UpdateChildrenParents($childId: Int!, $motherId: Int, $fatherId: Int) {
  updateChildernParents(kidId: $childId, motherId: $motherId, fatherId: $fatherId) {
    ...ChildrenFragment
  }
}
    ${ChildrenFragmentFragmentDoc}`;

export function useUpdateChildrenParentsMutation() {
  return Urql.useMutation<UpdateChildrenParentsMutation, UpdateChildrenParentsMutationVariables>(UpdateChildrenParentsDocument);
};
export const UpdateFatherDocument = gql`
    mutation UpdateFather($fatherId: Int!, $options: ParentsInput!) {
  updateFather(fatherId: $fatherId, options: $options) {
    ...FatherFragment
  }
}
    ${FatherFragmentFragmentDoc}`;

export function useUpdateFatherMutation() {
  return Urql.useMutation<UpdateFatherMutation, UpdateFatherMutationVariables>(UpdateFatherDocument);
};
export const UpdateMotherDocument = gql`
    mutation UpdateMother($motherId: Int!, $options: ParentsInput!) {
  updateMother(motherId: $motherId, options: $options) {
    ...MotherFragment
  }
}
    ${MotherFragmentFragmentDoc}`;

export function useUpdateMotherMutation() {
  return Urql.useMutation<UpdateMotherMutation, UpdateMotherMutationVariables>(UpdateMotherDocument);
};
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
${ErrorFragmentFragmentDoc}`;

export function useUpdatePasswordMutation() {
  return Urql.useMutation<UpdatePasswordMutation, UpdatePasswordMutationVariables>(UpdatePasswordDocument);
};
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
${ErrorFragmentFragmentDoc}`;

export function useUpdateUserMutation() {
  return Urql.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument);
};
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
    ${ErrorFragmentFragmentDoc}`;

export function useUseChildrenMutation() {
  return Urql.useMutation<UseChildrenMutation, UseChildrenMutationVariables>(UseChildrenDocument);
};
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
${ErrorFragmentFragmentDoc}`;

export function useUseGroupMutation() {
  return Urql.useMutation<UseGroupMutation, UseGroupMutationVariables>(UseGroupDocument);
};
export const UseKindergardenDocument = gql`
    mutation UseKindergarden($kindergardenID: Float!) {
  useKindergarden(kindergadenID: $kindergardenID) {
    kindergarden {
      ...KindergardenFragment
    }
    errors {
      ...ErrorFragment
    }
  }
}
    ${KindergardenFragmentFragmentDoc}
${ErrorFragmentFragmentDoc}`;

export function useUseKindergardenMutation() {
  return Urql.useMutation<UseKindergardenMutation, UseKindergardenMutationVariables>(UseKindergardenDocument);
};
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
${ErrorFragmentFragmentDoc}`;

export function useVerifyAccountMutation() {
  return Urql.useMutation<VerifyAccountMutation, VerifyAccountMutationVariables>(VerifyAccountDocument);
};
export const FilterFatherDocument = gql`
    query FilterFather($text: String!) {
  filterFather(text: $text) {
    ...FatherFragment
  }
}
    ${FatherFragmentFragmentDoc}`;

export function useFilterFatherQuery(options: Omit<Urql.UseQueryArgs<FilterFatherQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<FilterFatherQuery>({ query: FilterFatherDocument, ...options });
};
export const FilterMotherDocument = gql`
    query FilterMother($text: String!) {
  filterMother(text: $text) {
    ...MotherFragment
  }
}
    ${MotherFragmentFragmentDoc}`;

export function useFilterMotherQuery(options: Omit<Urql.UseQueryArgs<FilterMotherQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<FilterMotherQuery>({ query: FilterMotherDocument, ...options });
};
export const FindChildDocument = gql`
    query FindChild($id: Int!) {
  findChild(id: $id) {
    ...ChildrenFragment
  }
}
    ${ChildrenFragmentFragmentDoc}`;

export function useFindChildQuery(options: Omit<Urql.UseQueryArgs<FindChildQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<FindChildQuery>({ query: FindChildDocument, ...options });
};
export const FindFatherDocument = gql`
    query FindFather($id: Int!) {
  findFather(id: $id) {
    ...FatherFragment
  }
}
    ${FatherFragmentFragmentDoc}`;

export function useFindFatherQuery(options: Omit<Urql.UseQueryArgs<FindFatherQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<FindFatherQuery>({ query: FindFatherDocument, ...options });
};
export const FindMotherDocument = gql`
    query FindMother($id: Int!) {
  findMother(id: $id) {
    ...MotherFragment
  }
}
    ${MotherFragmentFragmentDoc}`;

export function useFindMotherQuery(options: Omit<Urql.UseQueryArgs<FindMotherQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<FindMotherQuery>({ query: FindMotherDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    ...UserFragment
    ownerOf {
      ...KindergardenFragment
    }
    partof {
      ...KindergardenFragment
    }
  }
}
    ${UserFragmentFragmentDoc}
${KindergardenFragmentFragmentDoc}`;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const SearchUserDocument = gql`
    query SearchUser($text: String!) {
  searchUser(text: $text) {
    ...UserFragment
  }
}
    ${UserFragmentFragmentDoc}`;

export function useSearchUserQuery(options: Omit<Urql.UseQueryArgs<SearchUserQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<SearchUserQuery>({ query: SearchUserDocument, ...options });
};
export const ShowChildrenDocument = gql`
    query ShowChildren($text: String!) {
  showChildren(text: $text) {
    ...ChildrenFragment
  }
}
    ${ChildrenFragmentFragmentDoc}`;

export function useShowChildrenQuery(options: Omit<Urql.UseQueryArgs<ShowChildrenQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ShowChildrenQuery>({ query: ShowChildrenDocument, ...options });
};
export const ShowChildrenFilterInGroupDocument = gql`
    query ShowChildrenFilterInGroup($limit: Int!, $cursor: String) {
  showChildrenFilterInGroup(limit: $limit, cursor: $cursor) {
    children {
      ...ChildrenFragment
    }
    hasMore
  }
}
    ${ChildrenFragmentFragmentDoc}`;

export function useShowChildrenFilterInGroupQuery(options: Omit<Urql.UseQueryArgs<ShowChildrenFilterInGroupQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ShowChildrenFilterInGroupQuery>({ query: ShowChildrenFilterInGroupDocument, ...options });
};
export const ShowChildrenNotIngroupDocument = gql`
    query ShowChildrenNotIngroup($limit: Int!, $cursor: String) {
  showChildrenFilterNotInGroup(limit: $limit, cursor: $cursor) {
    children {
      ...ChildrenFragment
    }
    hasMore
  }
}
    ${ChildrenFragmentFragmentDoc}`;

export function useShowChildrenNotIngroupQuery(options: Omit<Urql.UseQueryArgs<ShowChildrenNotIngroupQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ShowChildrenNotIngroupQuery>({ query: ShowChildrenNotIngroupDocument, ...options });
};
export const ShowfatherDocument = gql`
    query Showfather($limit: Int!, $cursor: String) {
  showFather(limit: $limit, cursor: $cursor) {
    father {
      ...FatherFragment
    }
    hasMore
  }
}
    ${FatherFragmentFragmentDoc}`;

export function useShowfatherQuery(options: Omit<Urql.UseQueryArgs<ShowfatherQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ShowfatherQuery>({ query: ShowfatherDocument, ...options });
};
export const ShowGroupsDocument = gql`
    query ShowGroups {
  showGroups {
    ...GroupFragment
  }
}
    ${GroupFragmentFragmentDoc}`;

export function useShowGroupsQuery(options: Omit<Urql.UseQueryArgs<ShowGroupsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ShowGroupsQuery>({ query: ShowGroupsDocument, ...options });
};
export const ShowKindergardenDocument = gql`
    query ShowKindergarden {
  showKindergarden {
    ...KindergardenFragment
  }
}
    ${KindergardenFragmentFragmentDoc}`;

export function useShowKindergardenQuery(options: Omit<Urql.UseQueryArgs<ShowKindergardenQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ShowKindergardenQuery>({ query: ShowKindergardenDocument, ...options });
};
export const ShowKindergardenstaffDocument = gql`
    query ShowKindergardenstaff {
  showKinderGardenStaff {
    owning {
      ...UserFragment
    }
    staff {
      ...UserFragment
    }
  }
}
    ${UserFragmentFragmentDoc}`;

export function useShowKindergardenstaffQuery(options: Omit<Urql.UseQueryArgs<ShowKindergardenstaffQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ShowKindergardenstaffQuery>({ query: ShowKindergardenstaffDocument, ...options });
};
export const ShowMotherDocument = gql`
    query ShowMother($limit: Int!, $cursor: String) {
  showMother(limit: $limit, cursor: $cursor) {
    mother {
      ...MotherFragment
    }
    hasMore
  }
}
    ${MotherFragmentFragmentDoc}`;

export function useShowMotherQuery(options: Omit<Urql.UseQueryArgs<ShowMotherQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ShowMotherQuery>({ query: ShowMotherDocument, ...options });
};
export const ShowSelectedGroupDocument = gql`
    query ShowSelectedGroup {
  showSelectedGroup {
    ...GroupFragment
  }
}
    ${GroupFragmentFragmentDoc}`;

export function useShowSelectedGroupQuery(options: Omit<Urql.UseQueryArgs<ShowSelectedGroupQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ShowSelectedGroupQuery>({ query: ShowSelectedGroupDocument, ...options });
};
export const ShowSelectedKindergardenDocument = gql`
    query ShowSelectedKindergarden {
  selectedKindergarden {
    ...KindergardenFragment
  }
}
    ${KindergardenFragmentFragmentDoc}`;

export function useShowSelectedKindergardenQuery(options: Omit<Urql.UseQueryArgs<ShowSelectedKindergardenQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ShowSelectedKindergardenQuery>({ query: ShowSelectedKindergardenDocument, ...options });
};