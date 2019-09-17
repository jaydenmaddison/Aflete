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
    let darkenColor = color.darken(0.5).hex();
    if (this.props.lighten) {
      darkenColor = color.lighten(0.5).hex();
    }

    return (
      <Button3D
        raiseLevel={2}
        height={45}
        paddingHorizontal={20}
        backgroundColor={mainColor}
        backgroundDarker={darkenColor}
        borderRadius={35}
        onPress={next => {
          this.pressFunc(next);
        }}
        {...this.props}
      >
        <Icon
          name={this.props.icon || "check"}
          size={30}
          color={this.props.iconColor}
          style={{ paddingLeft: 10, paddingRight: 10 }}
        />
      </Button3D>
    );
  }
}

export default Button;
