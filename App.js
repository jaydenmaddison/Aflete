/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import Routes from "./src/routes";
import { store, persistor } from "./src/config/storeConfiguration";
import { Provider } from "react-redux";
import {
  ScrollView,
  View,
  Button,
  TouchableOpacity,
  StatusBar
} from "react-native";
import { SafeAreaView } from "react-navigation";
import { ReduxNetworkProvider } from "react-native-offline";
import { PersistGate } from "redux-persist/integration/react";
import { ApolloProvider } from "react-apollo";
// import { Rehydrated } from "aws-appsync-react";
import Icon from "react-native-vector-icons/FontAwesome";
import BG from "src/components/common/background";
import awsconfig from "src/config/aws-exports";
import amplifyConfig from "src/config/aws-amplify";
import AWSAppSyncClient, { createAppSyncLink } from "aws-appsync";
import { ApolloLink } from "apollo-boost";
import Amplify, { API, graphqlOperation, Auth } from "aws-amplify";
import { setContext } from "apollo-link-context";
import { createHttpLink } from "apollo-link-http";

if (__DEV__) {
  global.XMLHttpRequest = global.originalXMLHttpRequest
    ? global.originalXMLHttpRequest
    : global.XMLHttpRequest;
  global.FormData = global.originalFormData
    ? global.originalFormData
    : global.FormData;
  global.Blob = global.originalBlob ? global.originalBlob : global.Blob;
  global.FileReader = global.originalFileReader
    ? global.originalFileReader
    : global.FileReader;
}

const prefix = "aflete://";

// Amplify.configure({
//   Auth: {
//     identityPoolId: "eu-west-1:4936b8f4-66cd-4175-84e5-7a983eb47180",
//     region: "eu-west-1",
//     userPoolId: "eu-west-1_3sxDScGLH",
//     userPoolWebClientId: "4jgkebm1mh2v2r8vq05f4q21b3",
//     mandatorySignIn: false
//     // authenticationFlowType: 'USER_PASSWORD_AUTH'
//   }
// });

const AppSyncConfig = {
  url: awsconfig.aws_appsync_graphqlEndpoint,
  region: awsconfig.aws_appsync_region,
  auth: {
    type: awsconfig.aws_appsync_authenticationType,
    credentials: () => Auth.currentCredentials()
  }
};

export const client = new AWSAppSyncClient(AppSyncConfig, {
  link: createAppSyncLink({
    ...AppSyncConfig,
    resultsFetcherLink: ApolloLink.from([
      setContext(async (request, previousContext) => {
        // This is currently a temporary solution until the backend supports v4 signature authorisation.
        const credentials = await Auth.currentCredentials();
        if (credentials) {
          const cognitoToken = Object.values(credentials.params.Logins)[0];
          return {
            headers: {
              ...previousContext.headers,
              cognitoToken
            }
          };
        }

        return {
          headers: {
            ...previousContext.headers
          }
        };
      }),
      createHttpLink({
        uri: AppSyncConfig.url
      })
    ])
  })
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      settingsViewHeight: 0.001,
      closedSettings: true
    };
  }

  componentDidMount() {}

  toggleSettings = () => {
    if (this.state.closedSettings == false) {
      this.setState({ settingsViewHeight: 0.001, closedSettings: true });
    } else {
      this.setState({ settingsViewHeight: 0.7, closedSettings: false });
    }
  };

  render() {
    return (
      <Provider store={store}>
        {/* <ReduxNetworkProvider> */}
        <PersistGate loading={null} persistor={persistor}>
          <ApolloProvider client={client}>
            {/* <Rehydrated> */}
            <BG>
              <StatusBar backgroundColor="blue" barStyle="light-content" />
              <SafeAreaView
                style={{ flex: 1, backgroundColor: "transparent" }}
                forceInset={{ bottom: "never" }}
              >
                <Routes uriPrefix={prefix} />
              </SafeAreaView>
            </BG>
            {/* </Rehydrated> */}
          </ApolloProvider>
        </PersistGate>
        {/* </ReduxNetworkProvider> */}
      </Provider>
    );
  }
}
export default App;
