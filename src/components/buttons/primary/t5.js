import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import Color from "color";
import ButtonLogic from "../ButtonLogic";

class Button2 extends ButtonLogic {
  constructor(props) {
    super(props);
    this.init();
  }
  render() {
    const mainColor = this.props.bg || "#116bfc";
    const color = Color(mainColor);
    let darkenColor = color.darken(0.3).hex();
    if (this.props.lighten) {
      darkenColor = color.lighten(0.3).hex();
    }

    this.props.padding = null;

    const styles = {
      // backgroundColor: mainColor,
      color: "white",
      padding: 10,
      borderRadius: 10,
      fontSize: this.props.size,
      // overflow: 'hidden',
      textAlign: "center",
      margin: 5,
      ...this.props
    };

    return (
      <TouchableOpacity onPress={() => this.pressFunc(null)}>
        <View style={{ borderBottomWidth: 2, borderBottomColor: mainColor }}>
          <Text style={styles}>{this.props.title}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default Button2;
