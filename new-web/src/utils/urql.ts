import Router, { NextRouter } from "next/router";
import { Exchange, dedupExchange, fetchExchange } from "urql";
import { cacheExchange, Resolver } from "@urql/exchange-graphcache";
import { pipe, tap } from "wonka";
import { isServer } from "./utils";
import { updateQuery } from "./updateQuery";
import { LoginMutation, MeQuery, MeDocument } from "../generated/graphql";

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

export const urqlClient = (ssrExchange: any, ctx: any) => {
  let cookie = "";
  if (isServer()) {
    cookie = ctx?.req?.headers?.cookie;
  }

  return {
    url: process.env.NEXT_PUBLIC_API_URL as string,
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
          User: () => null,
        },
        resolvers: {
          Query: {},
        },
        updates: {
          Mutation: {
            login: (_result, _args, cache, _info) => {
              updateQuery<LoginMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                (result, query) => {
                  if (result.login.errors) {
                    return query;
                  }
                  return {
                    me: result.login.user,
                  };
                }
              );
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
