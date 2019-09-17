import React from "react";
import { View, Text } from "react-native";
import DefaultListItem from "./progressViews/defaultListItem";

class ProgressSection extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  pressFunc = next => {
    this.props.onPressEvent(next, this.props.params);
  };

  render() {
    return (
      <View>
        <View style={{ flexDirection: "row", flex: 1, marginBottom: 5 }}>
          <DefaultListItem value="4:20hrs" text={"Time Spent"} border={true} />
          <DefaultListItem value="55%" text={"Completed"} border={true} />
          <DefaultListItem value="12/28" text={"Workouts"} />
        </View>
        <View style={{ flexDirection: "row", flex: 1 }}>
          <DefaultListItem value="145" text={"Exercises"} border={true} />
          <DefaultListItem value="321" text={"Sets"} border={true} />
          <DefaultListItem value="1232" text={"Reps"} />
        </View>
      </View>
    );
  }
}

export default ProgressSection;
