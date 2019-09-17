import { Button } from "react-native-paper";
import React from "react";
import Color from "color";
import ButtonLogic from "../ButtonLogic";

class Button2 extends ButtonLogic {
  constructor(props) {
    super(props);
    this.init();
  }
  render() {
    const bgColor = this.props.bg || "#116bfc";
    const textColor = "#000000";

    return (
      <Button
        mode={"contained"}
        icon={this.props.icon}
        loading={this.props.loading}
        color={'red'}
        background
        onPress={() => this.pressFunc(null)}
        {...this.props}
        style={{ margin: 5, backgroundColor: bgColor, color: textColor }}
      >
        {this.props.title}
      </Button>
    );
  }
}

export default Button2;
