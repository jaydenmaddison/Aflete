import React from "react";
import { View, Text, Image } from "react-native";
import FilterObj from "filter-obj";

const defaults = {
  fontSize: 18,
  color: '#292929',
  padding: 10
}

class Title extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    const { title } = this.props;
    const filtered = FilterObj(this.props, ['padding','fontSize','color','fontWeight' ])
    const style = {
        fontWeight: 'bold',
        ...defaults,
        ...filtered
    }
    return (
        <Text style={style}>{ title }</Text>
    );
  }
}

export default Title;