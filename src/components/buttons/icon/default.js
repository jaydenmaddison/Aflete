import Button3D from "react-native-really-awesome-button";
import React from "react";
import Color from "color";
import ButtonLogic from "../ButtonLogic";
import Icon from "react-native-vector-icons/FontAwesome";

class Button extends ButtonLogic {
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

    return (
      <Button3D
        raiseLevel={3}
        height={45}
        paddingHorizontal={20}
        backgroundColor={mainColor}
        backgroundDarker={darkenColor}
        borderRadius={this.props.borderRadius}
        onPress={next => {
          this.pressFunc(next);
        }}
        {...this.props}
        style={{ margin: 5, borderRadius: 15 }}
      >
        <Icon
          name={this.props.icon || "comments"}
          size={30}
          color={this.props.iconColor}
          style={{ paddingLeft: 10, paddingRight: 10 }}
        />
      </Button3D>
    );
  }
}

export default Button;
