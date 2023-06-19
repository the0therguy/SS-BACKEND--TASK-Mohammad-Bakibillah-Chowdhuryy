import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import getSquidexApiToken from "../lib/getSquidexApiToken";

let token = null;
let apolloClient = undefined;

const httpLink = new HttpLink({
  uri: `${process.env.CMS_API_URL}api/content/${process.env.CMS_PROJECT}/graphql`,
  onError: ({ networkError, graphQLErrors }) => {
    console.log("graphQLErrors", graphQLErrors);
    console.log("networkError", networkError);
  },
});

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return forward(operation);
});

export const authApiClient = async () => {
  token = await getSquidexApiToken();
  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
  return client;
};

const apiClient = () => {
  const url = `${process.env.CMS_API_URL}api/content/${process.env.CMS_PROJECT}/graphql`;
  const client =
    apolloClient ??
    new ApolloClient({
      uri: url,
      cache: new InMemoryCache(),
      link: new HttpLink({
        uri: url,
        onError: ({ networkError, graphQLErrors }) => {
          console.log("graphQLErrors", graphQLErrors);
          console.log("networkError", networkError);
        },
      }),
    });
  
  if (!apolloClient) apolloClient = client;
  
  return client;
};

export default apiClient;