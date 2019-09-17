import React from "react";
import { Button, View, Text, TextInput } from "react-native";
import { NavigationEvents } from "react-navigation";
import LinearGradient from "react-native-linear-gradient";
import randomcolor from "randomcolor";
import { Hoshi } from "react-native-textinput-effects";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { StackActions, NavigationActions } from "react-navigation";

let PrimaryButton = View;
let IconButton = View;

class Home extends React.Component {
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

  componentDidMount() {
    alert(this.props.navigation.state.params.token);
  }

  componentWillMount() {
    this.focus();
  }

  focus = () => {
    if (Math.random() > 0.5) {
      // return true;
    }

    let possibleValues = ["", 1, 2, 3, 4, 5, 6, 7];
    var randomAnswer =
      possibleValues[Math.floor(Math.random() * possibleValues.length)];

    // const randomNumber = Math.random();
    PrimaryButton = require("../components/buttons/primary").default(
      randomAnswer
    );

    IconButton = require("../components/buttons/icon").default(
      randomAnswer
    );

    const randomColors = randomcolor({
      count: 3,
      hue: "green"
    });

    this.setState({ colors: randomColors });
  };

  submit = animation => {
    // alert('Submit');
    setTimeout(() => {
      if (typeof animation === "function") {
        animation();
      }
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: "Products" })]
      });
      this.props.navigation.dispatch(resetAction);
    }, 2000);
  };

  render() {
    return (
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        colors={["#4c669f", "#3b5998", "#192f6a"]}
        style={{ flex: 1 }}
      >
        <NavigationEvents onWillFocus={payload => this.focus()} />
        <View id="logo" style={{ height: 200 }} />
        <View
          style={{
            flex: 1,
            padding: 20
          }}
        >
          <Hoshi
            label={"Email Address"}
            labelStyle={{ color: "#DDDDDD" }}
            iconClass={FontAwesomeIcon}
            iconName={"pencil"}
            iconColor={"black"}
            inputStyle={{ color: "#FFFFFF" }}
            inputPadding={16}
            labelHeight={24}
            // active border height
            borderHeight={2}
            borderColor={"#FFFFFF"}
            // TextInput props
            autoCapitalize={"none"}
            autoCorrect={false}
          />
          <Hoshi
            label={"Password"}
            labelStyle={{ color: "#DDDDDD" }}
            iconClass={FontAwesomeIcon}
            iconName={"lock"}
            iconColor={"black"}
            inputStyle={{ color: "#FFFFFF" }}
            inputPadding={16}
            labelHeight={24}
            // active border height
            borderHeight={2}
            borderColor={"#FFFFFF"}
            // TextInput props
            autoCapitalize={"none"}
            autoCorrect={false}
            secureTextEntry
          />
        </View>
        <View style={{ flex: 1, alignItems: "center" }}>
          <PrimaryButton title={"Submit"} progress onPressEvent={this.submit} />
          <IconButton
            title={"Submit"}
            color={"#116bfc"}
            radius={50}
            icon={"plus"}
            progress
            onPressEvent={this.submit}
          />

          <Button title="Focus" onPress={() => this.focus()} />
          <Button
            title="Forgot Password"
            onPress={() => this.props.navigation.navigate("ForgotPassword")}
          />
        </View>
      </LinearGradient>
    );
  }
}
export default Home;
