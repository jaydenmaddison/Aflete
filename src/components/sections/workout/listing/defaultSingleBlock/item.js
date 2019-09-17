import React, { PureComponent } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Color from "color";
import { Surface } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
// import ListItem from "./DefaultListItem";

class Item extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    const { item, onPressEvent } = this.props;
    return (
      <Surface
        style={{
          backgroundColor: "#ffffff",
          padding: 15,
          marginBottom: 7,
          marginTop: 2,
          elevation: 3
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
          }}
          onPress={onPressEvent(item.id)}
        >
          <View>
            <Text
              style={{
                color: "#494949",
                fontSize: 17,
                fontWeight: "bold"
              }}
            >
              {item.name}
            </Text>
            <Text style={{ color: "#CCCCCC", fontSize: 14 }}>
              <Text style={{ fontWeight: "bold" }}>
                {item.completed_sessions}/{item.sessions.length}{" "}
              </Text>
              completed
            </Text>
          </View>
          <View>
            <If condition={item.completed} />
            <If condition={!item.completed}>
              <View style={{ alignItems: "center" }}>
                <Icon name={"chevron-right"} color={"white"} size={17} />
                <Text style={{ fontSize: 10, color: "grey" }}>In progress</Text>
              </View>
            </If>
          </View>
        </TouchableOpacity>
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

export default Item;
