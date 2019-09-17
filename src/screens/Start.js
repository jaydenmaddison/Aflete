import React from "react";
import { Button, View, Text, Dimensions, ScrollView } from "react-native";
import Button3D from "react-native-really-awesome-button";
import LinearGradient from "react-native-linear-gradient";
import PrimaryButton1 from "../components/buttons/primary/t1";

class Start extends React.Component {
  static navigationOptions = {
    title: "Start",
     header: null
  };

  constructor(){
    super();
    this.state = {
      color: 'red'
    }
  }
  componentDidMount(){
    
  }

  navigate = () => {
    this.props.navigation.navigate("Login");
  };
  render() {
    return null;

    return (
      <View
        style={{
          flex: 1
        }}
      >
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          colors={["#4c669f", "#3b5998", "#192f6a"]}
          style={{ flex: 1 }}
        >
          <ScrollView
            style={{
              flex: 1
            }}
          >
            <PrimaryButtond
              title={"Next Default"}
              onPressEvent={this.navigate}
              bg={this.state.color}
            />
            <PrimaryButton1
              title={"Next T1"}
              fontColor={"green"}
              onPressEvent={this.navigate}
              textColor={"white"}
              bg={this.state.color}
            />
          </ScrollView>
        </LinearGradient>
      </View>
    );
  }
}
export default Start;
