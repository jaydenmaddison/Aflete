import React from "react";
import { View, Text, Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";

class Background extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        // colors={["#0665a0", "#014f7f"]}
        colors={["#FFFFFF", "#dbeeff"]}
        style={{ flex: 1, ...this.props.style }}
      >
        {this.props.children}
      </LinearGradient>
    );
  }
}

export default Background;
