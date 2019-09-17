import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from "react-native";
import Title from "src/components/common/title";
import Icon from "react-native-vector-icons/FontAwesome";
// import Logic from "./Logic";
import { SwipeListView } from "react-native-swipe-list-view";
import SingleBlock from "./defaultSingleBlock/item";
import Get from "get-value";

class ListingSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  goToWorkoutDay = id => event => {
    console.log(this.props);
    this.props.parentNavigation("WorkoutDay", { session_id: id });
  };

  goToWorkoutWeek = id => event => {
    this.props.parentNavigation("WorkoutWeek", { workout_id: id });
  };

  pressFunc = next => {
    this.props.onPressEvent(next, this.props.params);
  };

  render() {
    const returned = Get(this.props.workouts, "workout_id");
    console.log("DATA", this.props.workouts);

    return (
      <View>
        <Title
          title={this.props.title || "Weeks"}
          {...{
            fontSize: 18,
            paddingLeft: 0,
            padding: 15
          }}
        />
        <SwipeListView
          useFlatList
          data={this.props.workouts}
          disableRightSwipe={true}
          renderItem={(data, rowMap) => (
            <SingleBlock
              key={data.item.id}
              item={data.item}
              onPressEvent={this.goToWorkoutWeek}
            />
          )}
          renderHiddenItem={(data, rowMap) => (
            <View style={styles.rowBack}>
              <Text>Right</Text>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  style={[styles.hiddenButton, { backgroundColor: "#BBBBBB" }]}
                >
                  <Icon name={"list"} color={"white"} size={17} />
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 10,
                      color: "white",
                      marginTop: 5
                    }}
                  >
                    Favourite
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.hiddenButton, { backgroundColor: "#1e7bd8" }]}
                >
                  <Icon name={"refresh"} color={"white"} size={22} />
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 10,
                      color: "white",
                      marginTop: 5
                    }}
                  >
                    Restart
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          // leftOpenValue={75}
          rightOpenValue={-130}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1
  },
  standalone: {
    marginTop: 30,
    marginBottom: 30
  },
  hiddenButton: {
    padding: 10,
    borderRadius: 10,
    width: 60,
    height: 60,
    backgroundColor: "grey",
    margin: 2,
    marginBottom: 4,
    alignItems: "center",
    justifyContent: "center"
  },
  standaloneRowFront: {
    alignItems: "center",
    // backgroundColor: "#FFF",
    justifyContent: "center",
    height: 50
  },
  standaloneRowBack: {
    alignItems: "center",
    backgroundColor: "#8BC645",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15
  },
  backTextWhite: {
    color: "#FFF"
  },
  rowFront: {
    alignItems: "center",
    // backgroundColor: "#FFF",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    justifyContent: "center",
    height: 50
  },
  rowBack: {
    alignItems: "center",
    // backgroundColor: "#FFF",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 15
  },
  backRightBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 75
  },
  backRightBtnLeft: {
    backgroundColor: "blue",
    right: 75
  },
  backRightBtnRight: {
    backgroundColor: "red",
    right: 0
  },
  controls: {
    alignItems: "center",
    marginBottom: 30
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 5
  },
  switch: {
    alignItems: "center",
    borderWidth: 1,
    borderColor: "black",
    paddingVertical: 10,
    width: Dimensions.get("window").width / 4
  },
  trash: {
    height: 25,
    width: 25
  }
});

export default ListingSection;
