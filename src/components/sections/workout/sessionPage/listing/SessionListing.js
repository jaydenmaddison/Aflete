import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback
} from "react-native";
import Color from "color";
// import Logic from "./Logic";
import Icon from "react-native-vector-icons/FontAwesome";
import { Surface } from "react-native-paper";
import SetButton from "./set/default";

class SessionBlock extends React.Component {
  constructor(props) {
    super(props);
    // this.init();
  }

  showVideo = () => {
    this.props.onShowVideoEvent(this.props.item);
  };

  showDetails = () => {
    this.props.onShowDetailsEvent(this.props.item);
  };

  pressFunc = next => {
    this.props.onPressEvent(next, this.props.params);
  };

  toggleExercise = () => {
    this.props.onToggleExercise(this.props.item.session_exercise_id);
  };

  render() {
    const tempImage = "https://placekitten.com/300/405";
    const { item, checked } = this.props;

    console.log(item);

    return (
      <Surface style={styles.block}>
        <View style={{ flexDirection: "row", flex: 1 }}>
          <View
            style={{ width: 2, backgroundColor: "orange", marginRight: 6 }}
          />
          <View style={{ flex: 1, paddingTop: 5, paddingBottom: 5 }}>
            <If condition={item.is_superset}>
              <Text style={{ color: "orange" }}>Superset</Text>
            </If>
            <View className="main" style={{ flexDirection: "row" }}>
              <View
                style={{
                  width: 50,
                  marginRight: 5,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <TouchableOpacity
                  style={{
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                  onPress={this.showVideo}
                >
                  <Icon
                    name={"youtube-play"}
                    color={"#545454"}
                    size={50}
                    style={{ marginBottom: -2, padding: 0 }}
                  />
                  {/* <Text style={[styles.smallText, { marginTop: -3 }]}>
                    Video
                  </Text> */}
                </TouchableOpacity>
              </View>
              <View style={{ flex: 1, overflow: "hidden" }}>
                <ScrollView horizontal={true} bounces={false} style={{}}>
                  <TouchableWithoutFeedback onPress={this.showDetails}>
                    <Text style={styles.headerText}>{item.name} </Text>
                  </TouchableWithoutFeedback>
                </ScrollView>
                {/* <Text style={styles.smallText}>
                  {this.props.item.description}
                </Text> */}
              </View>
              <View
                style={{
                  width: 50,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <View style={styles.circle}>
                  <TouchableOpacity
                    onPress={this.toggleExercise}
                    style={{
                      width: 34,
                      height: 34,
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <If condition={checked}>
                      <Icon name={"check"} color={"green"} size={22} />
                    </If>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View
              class="setsView"
              style={{ flexDirection: "row", marginTop: 5 }}
            >
              <View
                style={{
                  width: 40,
                  alignItems: "center",
                  justifyContent: "center",
                  height: 45
                }}
              >
                <Text style={styles.setsCount}>3/3</Text>
                <Text style={styles.setsLabel}>sets</Text>
              </View>
              <ScrollView
                horizontal={true}
                style={{
                  // justifyContent: "center",
                  // alignItems: "center",
                  flexDirection: "row"
                }}
              >
                {item.sets &&
                  Array.isArray(item.sets) &&
                  item.sets.map((set, index) => {
                    return (
                      <SetButton
                        key={item.session_exercise_id + "-" + index}
                        data={{
                          set: set,
                          index,
                          id: this.props.id,
                          exerciseIndex: this.props.exerciseIndex
                        }}
                        onPressEvent={this.props.onSetPressEvent}
                      />
                    );
                  })}
                {item.sets &&
                  Number.isInteger(item.sets) &&
                  [...Array(item.sets).keys()].map((number, index) => {
                    return (
                      <SetButton
                        data={{
                          set: { count: parseInt(item.reps) },
                          index,
                          id: this.props.id,
                          exerciseIndex: this.props.exerciseIndex
                        }}
                        onPressEvent={this.props.onSetPressEvent}
                      />
                    );
                  })}
                <SetButton
                  data={{ exerciseIndex: this.props.exerciseIndex }}
                  new={true}
                  onPressEvent={this.props.onSetPressEvent}
                />
              </ScrollView>
            </View>
          </View>
        </View>
      </Surface>
    );
  }
}

const styles = StyleSheet.create({
  headerText: {
    fontSize: 20,
    color: "#002768"
    // padding: 10
  },
  smallText: {
    color: "#494949",
    fontSize: 15,
    marginTop: 3,
    marginBottom: 3,
    height: 40,
    overflow: "hidden"
  },
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
  },
  block: {
    // height: 140,
    backgroundColor: "#FFFFFF",
    marginBottom: 8,
    elevation: 3
  },
  circle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 2,
    borderColor: "#BBBBBB",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default SessionBlock;
