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
    const mainColor = this.props.bg || '#116bfc';
    const color = Color(mainColor);
    let darkenColor = color.darken(0.3).hex();
    if(this.props.lighten){
      darkenColor = color.lighten(0.3).hex();
    }
    

    return (
      <Button3D
        raiseLevel={3}
        height={45}
        paddingHorizontal={20}
        backgroundColor={mainColor}
        backgroundDarker={darkenColor}
        onPress={next => {
          this.pressFunc(next);
        }}
        {...this.props}
        style={{ margin: 5}}
      >
        {this.props.title}
      </Button3D>
    );
  }
}

export default Button;
