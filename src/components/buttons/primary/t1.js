import Button3D from "react-native-really-awesome-button";
import React from "react";
import Color from "color";
import ButtonLogic from "../ButtonLogic";

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
        textColor={this.props.color}
        textSize={this.props.size}
        paddingTop={this.props.padding}
        paddingBottom={this.props.padding}
      >
        {this.props.title}
      </Button3D>
    );
  }
}

export default Button;
