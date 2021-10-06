import {
  dedupExchange,
  Exchange,
  fetchExchange,
  stringifyVariables,
} from "urql";
import {
  LogoutMutation,
  MeQuery,
  MeDocument,
  LoginMutation,
  RegisterMutation,
  UpdateUserMutation,
  ShowGroupsDocument,
  ShowKindergardenDocument,
  UseKindergardenMutation,
  ShowSelectedKindergardenDocument,
  ShowSelectedKindergardenQuery,
  ClearKindergardenMutation,
  UseGroupMutation,
  ShowSelectedGroupQuery,
  ShowSelectedGroupDocument,
  ClearGroupMutation,
  ShowGroupsQuery,
  DeleteChildrenMutationVariables,
  DeleteKindergardenMutationVariables,
  DeleteGroupMutationVariables,
  ShowKindergardenstaffDocument,
  AddStaffMutationVariables,
  AddChildToGroupMutationVariables,
  DeleteStaffMutationVariables,
  DeleteFatherMutationVariables,
  DeleteMotherMutationVariables,
  RemoveChildFromGroupMutationVariables,
} from "../generated/graphql";
import { pipe, tap } from "wonka";
import { cacheExchange, Resolver } from "@urql/exchange-graphcache";
import { updateQuery } from "./updateQuery";
import { isServer } from "./isServer";
import Router, { NextRouter } from "next/router";

const errorExchange: Exchange = ({ forward }) => {
  const router: NextRouter = Router;
  return (ops$) => {
    return pipe(
      forward(ops$),
      tap(({ error }) => {
        if (error?.message.includes("Not authenticated") && !isServer()) {
          router.push("/login");
        }
      })
    );
  };
};

const cursorPaginationFather = (): Resolver => {
  return (_parent, fieldArgs, cache, info) => {
    const { parentKey: entityKey, fieldName } = info;
    const allFields = cache.inspectFields(entityKey);
    const fieldInfos = allFields.filter((info) => info.fieldName === fieldName);
    const size = fieldInfos.length;
    if (size === 0) {
      return undefined;
    }

    const fieldKey = `${fieldName}(${stringifyVariables(fieldArgs)})`;
    const isItInTheCache = cache.resolve(
      cache.resolveFieldByKey(entityKey, fieldKey) as string,
      "father"
    );
    info.partial = !isItInTheCache;
    let hasMore = true;
    const results: string[] = [];
    fieldInfos.forEach((fi) => {
      const key = cache.resolveFieldByKey(entityKey, fi.fieldKey) as string;
      const data = cache.resolve(key, "father") as string[];
      const _hasMore = cache.resolve(key, "hasMore");
      if (!_hasMore) {
        hasMore = _hasMore as boolean;
      }
      results.push(...data);
    });

    return {
      __typename: "PaginatedFather",
      hasMore,
      father: results,
    };
  };
};

const cursorPaginationMother = (): Resolver => {
  return (_parent, fieldArgs, cache, info) => {
    const { parentKey: entityKey, fieldName } = info;
    const allFields = cache.inspectFields(entityKey);
    const fieldInfos = allFields.filter((info) => info.fieldName === fieldName);
    const size = fieldInfos.length;
    if (size === 0) {
      return undefined;
    }

    const fieldKey = `${fieldName}(${stringifyVariables(fieldArgs)})`;
    const isItInTheCache = cache.resolve(
      cache.resolveFieldByKey(entityKey, fieldKey) as string,
      "mother"
    );
    info.partial = !isItInTheCache;
    let hasMore = true;
    const results: string[] = [];
    fieldInfos.forEach((fi) => {
      const key = cache.resolveFieldByKey(entityKey, fi.fieldKey) as string;
      const data = cache.resolve(key, "mother") as string[];
      const _hasMore = cache.resolve(key, "hasMore");
      if (!_hasMore) {
        hasMore = _hasMore as boolean;
      }
      results.push(...data);
    });

    return {
      __typename: "PaginatedMother",
      hasMore,
      mother: results,
    };
  };
};

const cursorPaginationChildren = (): Resolver => {
  return (_parent, fieldArgs, cache, info) => {
    const { parentKey: entityKey, fieldName } = info;
    const allFields = cache.inspectFields(entityKey);
    const fieldInfos = allFields.filter((info) => info.fieldName === fieldName);
    const size = fieldInfos.length;
    if (size === 0) {
      return undefined;
    }

    const fieldKey = `${fieldName}(${stringifyVariables(fieldArgs)})`;
    const isItInTheCache = cache.resolve(
      cache.resolveFieldByKey(entityKey, fieldKey) as string,
      "children"
    );
    info.partial = !isItInTheCache;
    let hasMore = true;
    const results: string[] = [];
    fieldInfos.forEach((fi) => {
      const key = cache.resolveFieldByKey(entityKey, fi.fieldKey) as string;
      const data = cache.resolve(key, "children") as string[];
      const _hasMore = cache.resolve(key, "hasMore");
      if (!_hasMore) {
        hasMore = _hasMore as boolean;
      }
      results.push(...data);
    });

    return {
      __typename: "PaginatedChildren",
      hasMore,
      children: results,
    };
  };
};

export const createUrqlClient = (ssrExchange: any, ctx: any) => {
  let cookie = "";
  if (isServer()) {
    cookie = ctx?.req?.headers?.cookie;
  }

  return {
    url: process.env.NEXT_PUBLIC_API_URL,
    fetchOptions: {
      credentials: "include" as const,
      headers: cookie
        ? {
            cookie,
          }
        : undefined,
    },
    exchanges: [
      dedupExchange,
      cacheExchange({
        keys: {
          PaginatedChildren: () => null,
          PaginatedMother: () => null,
          PaginatedFather: () => null,
        },
        resolvers: {
          Query: {
            showChildrenFilterInGroup: cursorPaginationChildren(),
            showChildrenFilterNotInGroup: cursorPaginationChildren(),
            showMother: cursorPaginationMother(),
            showFather: cursorPaginationFather(),
          },
        },
        updates: {
          Mutation: {
            removeChildFromGroup: (_result, args, cache, _info) => {
              cache.invalidate({
                __typename: "Query",
                Id: (args as RemoveChildFromGroupMutationVariables).Id,
              });
            },
            deleteMother: (_result, args, cache, _info) => {
              cache.invalidate({
                __typename: "Query",
                Id: (args as DeleteMotherMutationVariables).motherId,
              });
            },
            deleteFather: (_result, args, cache, _info) => {
              cache.invalidate({
                __typename: "Query",
                Id: (args as DeleteFatherMutationVariables).fatherId,
              });
            },
            deleteStaff: (_result, args, cache, _info) => {
              cache.invalidate({
                __typename: "Query",
                Id: (args as DeleteStaffMutationVariables).userId,
              });
            },
            addFather: (_result, _args, cache, _info) => {
              const allFields = cache.inspectFields("Query");
              const fieldInfos = allFields.filter(
                (info) => info.fieldName === "showFather"
              );
              fieldInfos.forEach((fi) => {
                cache.invalidate("Query", "showFather", fi.arguments || {});
              });
            },
            addMother: (_result, _args, cache, _info) => {
              const allFields = cache.inspectFields("Query");
              const fieldInfos = allFields.filter(
                (info) => info.fieldName === "showMother"
              );
              fieldInfos.forEach((fi) => {
                cache.invalidate("Query", "showMother", fi.arguments || {});
              });
            },

            addChildToGroup: (_result, args, cache, _info) => {
              const allFields = cache.inspectFields("Query");
              const fieldInfos = allFields.filter(
                (info) => info.fieldName === "showChildrenFilterInGroup"
              );
              fieldInfos.forEach((fi) => {
                cache.invalidate(
                  "Query",
                  "showChildrenFilterInGroup",
                  fi.arguments || {}
                );
              });

              cache.invalidate({
                __typename: "Query",
                Id: (args as AddChildToGroupMutationVariables).id,
              });
            },

            addStaff: (_result, args, cache, _info) => {
              cache.invalidate({
                __typename: "Query",
                Id: (args as AddStaffMutationVariables).Id,
              });
            },

            createChild: (_result, _args, cache, _info) => {
              const allFields = cache.inspectFields("Query");
              const fieldInfos = allFields.filter(
                (info) => info.fieldName === "showChildrenFilterNotInGroup"
              );
              fieldInfos.forEach((fi) => {
                cache.invalidate(
                  "Query",
                  "showChildrenFilterNotInGroup",
                  fi.arguments || {}
                );
              });
            },

            updateChild: (_result, _args, cache, _info) => {
              const allFields = cache.inspectFields("Query");
              const fieldInfos = allFields.filter(
                (info) => info.fieldName === "showChildrenFilterNotInGroup"
              );
              fieldInfos.forEach((fi) => {
                cache.invalidate(
                  "Query",
                  "showChildrenFilterNotInGroup",
                  fi.arguments || {}
                );
              });
            },

            updateChildernParents: (_result, _args, cache, _info) => {
              const allFields = cache.inspectFields("Query");
              const fieldInfos = allFields.filter(
                (info) => info.fieldName === "findChild"
              );
              const fieldData = allFields.filter(
                (info) => info.fieldName === "showChildrenFilterNotInGroup"
              );
              fieldInfos.forEach((fi) => {
                cache.invalidate("Query", "findChild", fi.arguments || {});
              });
              fieldData.forEach((fi) => {
                cache.invalidate(
                  "Query",
                  "showChildrenFilterNotInGroup",
                  fi.arguments || {}
                );
              });
            },

            deleteChildren: (_result, args, cache, _info) => {
              cache.invalidate({
                __typename: "Query",
                Id: (args as DeleteChildrenMutationVariables).id,
              });
            },

            createGroup: (_result, _args, cache, _info) => {
              cache.updateQuery({ query: ShowGroupsDocument }, (data) => {
                //@ts-ignore
                data.showGroups.push(_result.createGroup.groups);
                return data;
              });
            },

            createKindergarden: (_result, _args, cache, _info) => {
              cache.updateQuery({ query: ShowKindergardenDocument }, (data) => {
                //@ts-ignore
                data.showKindergarden.push(
                  //@ts-ignore
                  _result.createKindergarden.kindergarden
                );
                return data;
              });
            },

            deleteKindergarden: (_result, args, cache, _info) => {
              cache.invalidate({
                __typename: "Query",
                Id: (args as DeleteKindergardenMutationVariables).id,
              });
            },

            logout: (_result, _args, cache, _info) => {
              updateQuery<LogoutMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                () => ({ me: null })
              );
            },

            login: (_result, _args, cache, _info) => {
              cache.updateQuery({ query: ShowKindergardenDocument }, (data) => {
                // @ts-ignore
                data?.showKindergarden.push(_result.login.user.Id);
                return data;
              });
              updateQuery<LoginMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                //@ts-ignore
                (result, query) => {
                  if (result.login.errors) {
                    return query;
                  } else {
                    return {
                      me: result.login.user,
                    };
                  }
                }
              );
            },

            register: (_result, _args, cache, _info) => {
              updateQuery<RegisterMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                //@ts-ignore
                (result, query) => {
                  if (result.register.errors) {
                    return query;
                  } else {
                    return {
                      me: result.register.user,
                      __typename: "Query",
                    };
                  }
                }
              );
            },

            updateUser: (_result, _args, cache, _info) => {
              updateQuery<UpdateUserMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                //@ts-ignore
                (result, query) => {
                  if (result.updateUser.errors) {
                    return query;
                  } else {
                    return {
                      me: result.updateUser.user,
                      __typename: "Query",
                    };
                  }
                }
              );
            },

            useKindergarden: (_result, _args, cache, _info) => {
              const allFields = cache.inspectFields("Query");

              const fieldInfos = allFields.filter(
                (info) => info.fieldName === "showMother"
              );
              const filedsFilterMother = allFields.filter(
                (info) => info.fieldName === "filterMother"
              );
              fieldInfos.forEach((fi) => {
                cache.invalidate("Query", "showMother", fi.arguments || {});
              });
              filedsFilterMother.forEach((fi) => {
                cache.invalidate("Query", "filterMother", fi.arguments || {});
              });

              const fieldInfosFather = allFields.filter(
                (info) => info.fieldName === "showFather"
              );
              const fieldFilterFather = allFields.filter(
                (info) => info.fieldName === "filterFather"
              );
              fieldInfosFather.forEach((fi) => {
                cache.invalidate("Query", "showFather", fi.arguments || {});
              });
              fieldFilterFather.forEach((fi) => {
                cache.invalidate("Query", "filterFather", fi.arguments || {});
              });
              cache.updateQuery(
                { query: ShowKindergardenstaffDocument },
                (data) => {
                  // @ts-ignore
                  data?.showKinderGardenStaff?.staff.push(
                    // @ts-ignore
                    _result.useKindergarden.kindergarden.Id
                  );
                  return data;
                }
              );
              updateQuery<UseKindergardenMutation, ShowGroupsQuery>(
                cache,
                { query: ShowGroupsDocument },
                _result,
                //@ts-ignore
                (result, query) => {
                  return {
                    showGroups: query?.showGroups?.push(
                      //@ts-ignore
                      result.useKindergarden.kindergarden.Id
                    ),
                    __typename: "Query",
                  };
                }
              );
            },

            clearKindergarden: (_result, _args, cache, _info) => {
              updateQuery<
                ClearKindergardenMutation,
                ShowSelectedKindergardenQuery
              >(
                cache,
                { query: ShowSelectedKindergardenDocument },
                _result,
                () => ({ selectedKindergarden: null })
              );
            },

            useGroup: (_result, _args, cache, _info) => {
              const allFields = cache.inspectFields("Query");
              const fieldInfos = allFields.filter(
                (info) => info.fieldName === "showChildrenFilterInGroup"
              );
              fieldInfos.forEach((fi) => {
                cache.invalidate(
                  "Query",
                  "showChildrenFilterInGroup",
                  fi.arguments || {}
                );
              });

              const fieldInfosSearch = allFields.filter(
                (info) => info.fieldName === "showChildren"
              );
              fieldInfosSearch.forEach((fi) => {
                cache.invalidate("Query", "showChildren", fi.arguments || {});
              });

              updateQuery<UseGroupMutation, ShowSelectedGroupQuery>(
                cache,
                { query: ShowSelectedGroupDocument },
                _result,
                (result, query) => {
                  if (result.useGroup.errors) {
                    return query;
                  } else {
                    return {
                      showSelectedGroup: result.useGroup.groups,
                    };
                  }
                }
              );
            },

            deleteGroup: (_result, args, cache, _info) => {
              cache.invalidate({
                __typename: "Query",
                Id: (args as DeleteGroupMutationVariables).id,
              });
            },

            clearGroup: (_result, _args, cache, _info) => {
              updateQuery<ClearGroupMutation, ShowSelectedGroupQuery>(
                cache,
                { query: ShowSelectedGroupDocument },
                _result,
                () => ({ showSelectedGroup: null })
              );
            },

            useChildren: (_result, _args, cache, _info) => {
              const allFields = cache.inspectFields("Query");
              const fieldInfos = allFields.filter(
                (info) => info.fieldName === "showChildrenFilterNotInGroup"
              );
              fieldInfos.forEach((fi) => {
                cache.invalidate(
                  "Query",
                  "showChildrenFilterNotInGroup",
                  fi.arguments || {}
                );
              });
            },
          },
        },
      }),
      errorExchange,
      ssrExchange,
      fetchExchange,
    ],
  };
};
