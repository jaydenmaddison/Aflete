import ApolloClient from "apollo-boost";
import { Auth } from 'aws-amplify';

const client = new ApolloClient({
  uri: "https://2df2cvoplrh4lg33k74nwmqhyy.appsync-api.eu-west-1.amazonaws.com/graphql",
  auth: {
    type: 'AWS_IAM',
    credentials: () => Auth.currentCredentials()
  }
});

export default client;
