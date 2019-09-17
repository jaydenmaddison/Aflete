import React from "react";
import { View, Text, Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";

class Background extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={{ height: 50 }}>
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
            flex: 1
          }}
        >
          <View style={{ paddingLeft: 10, fontSize: 15 }}>
            <Text>Left</Text>
          </View>
          <Text style={{ color: "white", fontSize: 33 }}>AFLETE</Text>
          <View style={{ paddingRight: 10, fontSize: 15, color: 'white' }}>
            <Text>Right</Text>
          </View>
        </View>
      </View>
    );
  }
}

export default Background;
