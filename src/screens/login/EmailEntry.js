import React from "react";
import { Button, View, Text, TextInput } from "react-native";
import { NavigationEvents } from "react-navigation";
import LinearGradient from "react-native-linear-gradient";
import randomcolor from "randomcolor";
import { Hoshi } from "react-native-textinput-effects";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { StackActions, NavigationActions } from "react-navigation";
import BG from "src/components/common/background";
import { Auth } from "aws-amplify";

let PrimaryButton = require("src/components/buttons/primary").default(0);

class EmailEntry extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      colors: ["#4c669f", "#3b5998", "#192f6a"],
      title: "Login",
      email: "",
      password: ""
    };
  }

  async componentDidMount() {
    const authenticatedUser = await Auth.currentUserInfo();

    if (!authenticatedUser) {
      Auth.signIn(
        "shahzaib@aflete.com#b445b861-3a43-17e9-bccd-0ac7253a1ad8",
        "password"
      );
    }
  }

  componentWillMount() {}

  submit = animation => {
    const { email } = this.state;
    if (typeof animation === "function") {
      animation();
    }

    this.props.navigation.navigate("SelectVendor", { email });
  };

  render() {
    return (
      <BG
        style={{ justifyContent: "center", flex: 1, backgroundColor: "blue" }}
      >
        <View style={{ flexDirection: "column" }}>
          <Text style={{ textAlign: "center", fontSize: 18 }}>Login</Text>
          <View
            style={{
              padding: 20,
              width: "100%"
            }}
          >
            <Hoshi
              label={"Email Address"}
              labelStyle={{ color: "#DDDDDD" }}
              iconClass={FontAwesomeIcon}
              iconName={"pencil"}
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
              onChangeText={text => {
                this.setState({ email: text });
              }}
            />
          </View>
          <View style={{ alignItems: "center" }}>
            <PrimaryButton
              title={"Submit"}
              progress
              onPressEvent={this.submit}
            />
          </View>
        </View>
      </BG>
    );
  }
}
export default EmailEntry;
