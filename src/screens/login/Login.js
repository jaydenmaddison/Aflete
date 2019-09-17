import React from "react";
import { Button, View, Text, TextInput, Image } from "react-native";
import { NavigationEvents } from "react-navigation";
import LinearGradient from "react-native-linear-gradient";
import randomcolor from "randomcolor";
import { Hoshi } from "react-native-textinput-effects";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { StackActions, NavigationActions } from "react-navigation";
import BG from "src/components/common/background";
import { Auth } from "aws-amplify";

let PrimaryButton = require("src/components/buttons/primary").default(0);

class Home extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      title: "Login",
      password: ""
    };
  }

  componentDidMount() {}

  componentWillMount() {}

  submit = animation => {
    const { email, vendor } = this.props.navigation.state.params;

    Auth.signIn(`${email}#${vendor}`, "password")
      .then(user => {
        this.stopButtonAnimation(animation);
        this.loginSuccesfull();
      })
      .catch(err => {
        this.stopButtonAnimation(animation);
        alert('Error try agan');
        console.log(err);
      });
  };

  stopButtonAnimation = animation => {
    if (typeof animation === "function") {
      animation();
    }
  };

  loginSuccesfull = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: "Products" })]
    });
    this.props.navigation.dispatch(resetAction);
  };

  render() {
    const { email, vendor, image } = this.props.navigation.state.params;
    return (
      <BG>
        <View id="logo" style={{ height: 200 }} />
        <View>
          <Text
            style={{
              color: "black",
              textAlign: "center",
              fontSize: 18,
              marginBottom: 15
            }}
          >
            {email}
          </Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <Image
            source={{ uri: image }}
            resizeMode="contain"
            style={{
              width: 80,
              height: 80
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            padding: 10
          }}
        >
          <Hoshi
            label={"Password"}
            labelStyle={{ color: "#DDDDDD" }}
            iconClass={FontAwesomeIcon}
            iconName={"lock"}
            iconColor={"black"}
            inputStyle={{ color: "#343434" }}
            inputPadding={16}
            labelHeight={24}
            // active border height
            borderHeight={2}
            borderColor={"#FFFFFF"}
            // TextInput props
            autoCapitalize={"none"}
            autoCorrect={false}
            secureTextEntry
            onChangeText={newValue => {
              this.setState({ password: newValue });
            }}
          />
        </View>
        <View style={{ flex: 1, alignItems: "center" }}>
          <PrimaryButton title={"Submit"} progress onPressEvent={this.submit} />
          <Button
            title="Forgot Password"
            onPress={() => this.props.navigation.navigate("ForgotPassword")}
          />
        </View>
      </BG>
    );
  }
}
export default Home;
