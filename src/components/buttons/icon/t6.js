import React from "react";
import { View, TouchableWithoutFeedback, Text } from "react-native";
import Color from "color";
import ButtonLogic from "../ButtonLogic";
import Icon from "react-native-vector-icons/FontAwesome";

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

    const styles = {
      backgroundColor: mainColor,
      color: "white",
      padding: 10,
      borderRadius: 5,
      borderWidth: 1,
      overflow: "hidden",
      margin: 5,
      borderColor: darkenColor,
      ...this.props
    };

    return (
      <TouchableWithoutFeedback onPress={() => this.pressFunc(null)}>
        <View>
          <Icon
            name={this.props.icon || "comments"}
            size={30}
            color={this.props.iconColor}
            style={{ paddingLeft: 10, paddingRight: 10 }}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default Button2;
