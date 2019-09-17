import { Button } from 'react-native-paper';
import React from "react";
import Color from "color";
import ButtonLogic from "../ButtonLogic";

class Button2 extends ButtonLogic {
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
      <Button mode={"contained"} icon={this.props.icon} loading={this.props.loading} color={mainColor} onPress={() => this.pressFunc(null)} {...this.props} style={{margin: 5}}>
     {this.props.title}
    </Button>
    )
  }
}

export default Button2;