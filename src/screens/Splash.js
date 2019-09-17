import React from "react";
import { Button, View, Text } from "react-native";
import { StackActions, NavigationActions } from "react-navigation";
import { Auth } from "aws-amplify";

class Splash extends React.Component {
  static navigationOptions = {
    title: "Splash",
    header: null
  };

  async componentDidMount() {
    const authenticatedUser = await Auth.currentUserInfo();
    let routeName = "Products";
    if (!authenticatedUser) {
      routeName = "EmailEntry";
    }
    const resetAction = StackActions.reset({
      index: 0,
      actions: [ NavigationActions.navigate({ routeName }) ]
    });
    this.props.navigation.dispatch(resetAction);
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center"
        }}
      />
    );
  }
}
export default Splash;
