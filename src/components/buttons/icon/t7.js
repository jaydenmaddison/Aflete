import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import Color from "color";
import ButtonLogic from "../ButtonLogic";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/FontAwesome";

class Button7 extends ButtonLogic {
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

    let darkenBorderColor = color.darken(0.5).hex();

    let styles = StyleSheet.create({
      linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        borderColor: darkenBorderColor,
        borderWidth: this.props.border ? this.props.border : 0
      },
      buttonText: {
        fontSize: 18,
        fontFamily: "Gill Sans",
        textAlign: "center",
        margin: 10,
        color: "#ffffff",
        backgroundColor: "transparent"
      }
    });

    return (
      <TouchableOpacity
        onPress={() => this.pressFunc(null)}
        style={{
          height: 40,
          justifyContent: "center",
          alignItems: "center",
          margin: 5
        }}
      >
        <LinearGradient
          colors={[mainColor, darkenColor]}
          style={styles.linearGradient}
        >
          <Icon
            name={this.props.icon || "comments"}
            size={30}
            color={this.props.iconColor}
            style={{ paddingLeft: 10, paddingRight: 10 }}
          />
        </LinearGradient>
      </TouchableOpacity>
    );
  }
}

export default Button7;
