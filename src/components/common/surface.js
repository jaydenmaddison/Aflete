import React from "react";
import { View } from "react-native";
import FilterObj from "filter-obj";
import {Surface} from 'react-native-paper';

const defaults = {
    padding: 15,
    paddingTop: 30,
    paddingBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
}

class SurfaceWrapper extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    const filtered = FilterObj(this.props, ['padding','fontSize','color','fontWeight' ])
    const style = {
        ...defaults,
        ...this.props.style
    }
    return (
        <Surface style={style}>{ this.props.children }</Surface>
    );
  }
}

export default SurfaceWrapper;