import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "https://api-ap-southeast-2.hygraph.com/v2/cltc4q6sm000008jr9w0bh6rs/master",
  cache: new InMemoryCache(),
});

export default client;
