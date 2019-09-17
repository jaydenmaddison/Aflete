import React, { PureComponent } from "react";
import { View, Text, StyleSheet } from "react-native";
import Color from "color";
// import Logic from "../Logic";
import {Surface} from "react-native-paper";
// import ListItem from "./DefaultListItem";

class DefaultListItem extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Surface style={{ flex: 1, backgroundColor: "#FFFFFF", padding: 15, elevation: 3, marginBottom: 5 }}>
        <View style={{ flex: 1}}>
          <Text
            style={{
              fontSize: 20,
              color: "#494949",
              fontWeight: "bold",
              textAlign: "center"
            }}
          >
            {this.props.value}
          </Text>
          <Text style={{ fontSize: 14, color: "#CCCCCC", textAlign: "center" }}>
            {this.props.text}
          </Text>
        </View>
      </Surface>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: "row"
  },
  rowItem: {
    flex: 1,
    borderRightWidth: 1,
    borderColor: "white",
    alignItems: "center"
  },
  rowItemLast: {
    flex: 1,
    borderColor: "white",
    alignItems: "center"
  },
  headerText: {
    fontSize: 30,
    color: "white",
    padding: 10
  },
  bigText: {
    fontSize: 45,
    color: "white",
    padding: 10
  },
  text: {
    fontSize: 12,
    color: "white",
    padding: 10
  },
  image: {
    flex: 1,
    resizeMode: "cover", // or 'stretch',
    justifyContent: "center"
  }
});

export default DefaultListItem;
