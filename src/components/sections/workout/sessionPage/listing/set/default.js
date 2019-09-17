import React, { PureComponent } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

class SetButton extends PureComponent {
  constructor(props) {
    super(props);
  }

  pressEvent = () => {
    const { exerciseIndex, index } = this.props.data;

    if (typeof index != "undefined") {
      this.props.onPressEvent({
        exerciseIndex: exerciseIndex,
        setIndex: index
      });
    } else {
      this.props.onPressEvent({
        exerciseIndex: exerciseIndex,
        new: true
      });
    }
  };

  render() {
    const { set } = this.props.data;
    const labelWidth = set && set.weight ? 80 : 40;
    return (
      <TouchableOpacity onPress={this.pressEvent}>
        <View
          style={{
            borderRadius: 20,
            width: labelWidth,
            height: 40,
            borderWidth: 2,
            borderColor: "#CCCCCC",
            alignItems: "center",
            justifyContent: "center",
            marginRight: 1
          }}
        >
          <Text style={styles.setCircleText}>
            <If condition={set}>
              {set.count}
              <If condition={labelWidth === 80}>
                {""}|
                <Text style={{ fontSize: 12 }}>
                  {set.weight}
                  {set.metric}
                </Text>
              </If>
            </If>
            <If condition={this.props.new}>
              <Text style={{ color: "black" }}>+</Text>
            </If>
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  setsCount: {
    fontSize: 18,
    color: "#494949",
    fontWeight: "bold"
  },
  setsLabel: {
    fontSize: 14,
    color: "#494949"
  },
  setCircleText: {
    color: "#494949",
    fontWeight: "bold",
    fontSize: 16
  }
});

export default SetButton;
