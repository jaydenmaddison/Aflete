import React from "react";
import {
  Button,
  View,
  ScrollView,
  Text,
  Dimensions,
  StyleSheet,
  ImageBackground,
  Platform,
  TouchableOpacity,
  Animated,
  Modal,
  ActivityIndicator,
  Picker,
  TextInput,
  KeyboardAvoidingView
} from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import Icon from "react-native-vector-icons/MaterialIcons";
import MIcon from "react-native-vector-icons/MaterialCommunityIcons";
import ReactNativeParallaxHeader from "react-native-parallax-header";
import BG from "src/components/common/background";
import Video from "react-native-video";
import ListItem from "src/components/sections/workout/sessionPage/listing/SessionListing";
import SlidingUpPanel from "rn-sliding-up-panel";
import SetButton from "src/components/sections/workout/sessionPage/listing/set/default";
import produce from "immer";
import {
  storeTempExerciseWeights,
  addExerciseWeights,
  addExerciseNote
} from "src/actions/workouts";
import { connect } from "react-redux";
import { Auth } from "aws-amplify";
import { client } from "aflete/App";
import GET_WORKOUT_PRODUCT from "src/graphql/queries/getWorkout.query";

const SCREEN_WIDTH = Dimensions.get("window").width;

class WorkoutSession extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: navigation.state.params.productTitle || "",
    headerRight: (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("ProductNotes", {
            productTitle: navigation.state.params.productTitle
          })
        }
        style={{ marginRight: 5 }}
      >
        <Icon name="event-note" size={25} color={"white"} />
      </TouchableOpacity>
    )
  });

  constructor() {
    super();
    this.state = {
      workoutSessionWeights: {
        // Based on Workout Session
      },
      exerciseWeights: {
        // Global
      },
      exerciseNotes: {
        // Global
      },
      time: 0,
      timer: null,
      timerCurrentAction: null,
      timeString: "00:00:00",
      modalVisible: false,
      videoIsLoading: false,
      currentExercise: {
        setIndex: 0,
        exerciseIndex: null,
        type: "reps"
      },
      selectedExercises: []
    };

    this.videoRef = null;
  }

  componentWillMount() {
    this.animated = new Animated.Value(0, { useNativeDriver: true });
    // client
  }

  componentDidMount(){
  }

  timerAction = () => {
    if (this.state.timerCurrentAction === "start") {
      this.stopTimer();
      this.setState({ timerCurrentAction: "pause" });
    } else if (
      this.state.timerCurrentAction === "pause" ||
      this.state.timerCurrentAction == null
    ) {
      this.startTimer();
      this.setState({ timerCurrentAction: "start" });
    }
  };

  startTimer = () => {
    this.timer = setInterval(
      () =>
        this.setState({
          time: this.state.time + 1,
          timeString: this.convertSeconds(this.state.time + 1)
        }),
      1000
    );
    console.log("start");
  };

  stopTimer = () => {
    clearInterval(this.timer);
    console.log("stop");
  };

  resetTimer = () => {
    const seconds = this.convertSeconds(0);
    this.stopTimer();
    this.setState({ time: 0, timeString: seconds, timerCurrentAction: null });
    console.log("reset");
  };

  navigateToExerciseDetails = ({ id, name, info }) => {
    this.props.navigation.navigate("ExerciseDetails", {
      id,
      productTitle: this.props.navigation.state.params.productTitle,
      name,
      info
    });
  };

  showVideo = ({ video_url }) => {
    this.setState({
      modalVisible: true,
      waitingVideoURL:
        video_url
    });
  };

  setModalVisible = bool => {
    this.setState({ modalVisible: bool });
  };

  convertSeconds = seconds => {
    var measuredTime = new Date(null);
    measuredTime.setSeconds(seconds);
    return measuredTime.toISOString().substr(11, 8);
  };

  onSetPressEvent = data => {
    if (data.new) {
      this.addNewSet(data.exerciseIndex);
    } else {
      this.setState({
        currentExercise: {
          setIndex: data.setIndex,
          exerciseIndex: data.exerciseIndex,
          type: "reps"
        }
      });
    }

    this._panel.show();
  };

  selectExerciseSet = setIndex => {};

  addNewSet = exerciseIndex => {
    let totalSets = this.state.exercises[exerciseIndex].sets.length;

    let exercises = produce(this.state.exercises, draft => {
      let lastSet = draft[exerciseIndex].sets.push(
        draft[exerciseIndex].sets[totalSets - 1]
      );
    });

    this.setState({
      exercises,
      currentExercise: {
        setIndex: totalSets,
        exerciseIndex: exerciseIndex,
        // type: 'reps',
        type: "duration"
      }
    });
  };

  updateCurrentSet = (key, value) => {
    this.setState({
      currentExercise: {
        ...this.state.currentExercise,
        [key]: value
      }
    });
  };

  saveSet = () => {
    this._panel.hide();
  };

  toggleWeightType = () => {
    const { currentExercise } = this.state;
    const weight =
      !currentExercise.weight || currentExercise.weight != "BW" ? "BW" : 0;
    this.setState({
      currentExercise: {
        ...this.state.currentExercise,
        weight
      }
    });
  };

  toggleFailure = () => {
    const { currentExercise } = this.state;
    this.setState({
      currentExercise: {
        ...this.state.currentExercise,
        failure: !currentExercise.failure ? 1 : 0
      }
    });
  };

  toggleExercise = id => {
    const index = this.state.selectedExercises.indexOf(id);
    let updated;
    if (index > -1) {
      updated = produce(this.state.selectedExercises, draft => {
        draft.splice(index, 1);
      });
    } else {
      updated = produce(this.state.selectedExercises, draft => {
        draft.push(id);
      });
    }
    this.setState({
      selectedExercises: updated
    });
  };

  removeCurrentSet = () => {
    const { exerciseIndex, setIndex } = this.state.currentExercise;
    let exercises = produce(this.state.exercises, draft => {
      draft[exerciseIndex].sets.splice(setIndex, 1);
    });

    this.setState({
      exercises
    });
    this._panel.hide();
  };

  render() {
    const heightInterpolate = this.animated.interpolate({
      inputRange: [0, 100],
      outputRange: [200, 60],
      extrapolate: "clamp"
    });

    const marginBottomInterpolate = this.animated.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 100],
      extrapolate: "clamp"
    });

    const opacityInterpolate = this.animated.interpolate({
      inputRange: [0, 40],
      outputRange: [1, 0],
      extrapolate: "clamp"
    });

    const opacityShowInterpolate = this.animated.interpolate({
      inputRange: [50, 90],
      outputRange: [0, 1],
      extrapolate: "clamp"
    });

    const colorInterpolation = this.animated.interpolate({
      inputRange: [50, 80],
      outputRange: ["rgba(130, 211, 255, 0)", "rgba(130, 211, 255, 1)"],
      extrapolate: "clamp"
    });

    const heightWhenOpacityZeroInterpolation = this.animated.interpolate({
      inputRange: [70, 100],
      outputRange: [40, 0],
      extrapolate: "clamp"
    });

    const textHeightWhenOpacityZeroInterpolation = this.animated.interpolate({
      inputRange: [70, 100],
      outputRange: [20, 0],
      extrapolate: "clamp"
    });

    const mainBlockStyle = {
      height: heightInterpolate,
      backgroundColor: colorInterpolation,
      marginBottom: marginBottomInterpolate
      // overflow: "hidden"
    };

    const heightToZeroStyle = {
      height: heightWhenOpacityZeroInterpolation,
      overflow: "hidden",
      justifyContent: "center"
    };
    const textHeightToZeroStyle = {
      height: textHeightWhenOpacityZeroInterpolation,
      overflow: "hidden",
      justifyContent: "center"
    };

    const aligned = {
      alignItems: "center",
      justifyContent: "space-around"
    };

    const positionTop = this.animated.interpolate({
      inputRange: [-100, 0],
      outputRange: [-100, 100],
      xtrapolate: "clamp"
    });

    const positionTopStyle = {
      fontSize: 14,
      color: "grey",
      fontWeight: "bold",
      opacity: opacityInterpolate
    };

    const opacityToZeroStyle = {
      opacity: opacityInterpolate
    };

    const opacityTo100Style = {
      opacity: opacityShowInterpolate
    };

    const panelType = this.state.currentExercise.type;
    const curntExerc = this.state.currentExercise;
    const { workout_id, product_id, session_id } = this.props.navigation.state.params;
    const { productsData } = this.props;

    let currentSession = null;

    if(typeof productsData[product_id] != 'undefined'){
      const filteredWorkout = productsData[product_id].workouts.filter((item) => item.id == workout_id);

      if(filteredWorkout && filteredWorkout[0]){
        const filteredSession = filteredWorkout[0].sessions.filter((item) => item.id == session_id);

        if(filteredSession && filteredSession[0]){
          currentSession = filteredSession[0];
        }
      }
    }
    // alert(JcurrentSession);

    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        keyboardVerticalOffset={50}
        enabled
      >
        <BG>
          <ScrollView
            scrollEventThrottle={1}
            stickyHeaderIndices={[0]}
            onScroll={Animated.event([
              { nativeEvent: { contentOffset: { y: this.animated } } }
            ])}
            // style={{ backgroundColor: 'transparent' }}
          >
            <View>
              <Animated.View style={[mainBlockStyle, aligned]}>
                <Animated.View
                  style={[opacityToZeroStyle, textHeightToZeroStyle]}
                >
                  <Text
                    style={{
                      fontSize: 17,
                      color: "#595959",
                      fontWeight: "bold"
                    }}
                  >
                    Back
                  </Text>
                </Animated.View>
                <Animated.View
                  style={[opacityToZeroStyle, textHeightToZeroStyle]}
                >
                  <Text
                    style={{ fontSize: 11, color: "grey", fontWeight: "bold" }}
                  >
                    60 minutes
                  </Text>
                </Animated.View>
                <Animated.View
                  style={{
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: SCREEN_WIDTH - 20
                  }}
                >
                  <Animated.View
                    style={[{ alignItems: "center" }, opacityTo100Style]}
                  >
                    <Text style={{ fontSize: 20, color: "#545454" }}>3/3</Text>
                    <Text style={{ fontSize: 10, color: "#545454" }}>
                      exercises
                    </Text>
                  </Animated.View>
                  <View>
                    <Text style={{ fontSize: 50, color: "#545454" }}>
                      {this.state.timeString}
                    </Text>
                  </View>
                  <Animated.View style={[opacityTo100Style]}>
                    <TouchableOpacity onPress={this.timerAction}>
                      <If condition={this.state.timerCurrentAction != "start"}>
                        <Icon name="play-arrow" size={45} color={"white"} />
                      </If>
                      <If condition={this.state.timerCurrentAction == "start"}>
                        <Icon name="pause" size={45} color={"white"} />
                      </If>
                    </TouchableOpacity>
                  </Animated.View>
                </Animated.View>

                <Animated.View style={[opacityToZeroStyle, heightToZeroStyle]}>
                  <TouchableOpacity
                    onPress={this.timerAction}
                    style={{
                      backgroundColor:
                        this.state.timerCurrentAction == "start"
                          ? "green"
                          : "#494949",
                      padding: 7,
                      width: 200,
                      borderRadius: 7
                    }}
                  >
                    <If condition={this.state.timerCurrentAction === null}>
                      <Text
                        style={{
                          color: "white",
                          fontSize: 17,
                          fontWeight: "500",
                          textAlign: "center"
                        }}
                      >
                        START WORKOUT
                      </Text>
                    </If>
                    <If condition={this.state.timerCurrentAction === "start"}>
                      <Text
                        style={{
                          color: "#FFFFFF",
                          fontSize: 17,
                          fontWeight: "500",
                          backgroundColor: "green",
                          textAlign: "center"
                        }}
                      >
                        PAUSE
                      </Text>
                    </If>
                    <If condition={this.state.timerCurrentAction === "pause"}>
                      <Text
                        style={{
                          color: "white",
                          fontSize: 17,
                          fontWeight: 500,
                          textAlign: "center"
                        }}
                      >
                        RESUME
                      </Text>
                    </If>
                  </TouchableOpacity>
                </Animated.View>

                <Animated.View
                  style={[opacityToZeroStyle, textHeightToZeroStyle]}
                >
                  <TouchableOpacity onPress={this.resetTimer}>
                    <Text style={{ color: "white" }}>RESET TIMER</Text>
                  </TouchableOpacity>
                </Animated.View>
              </Animated.View>
            </View>
            <View style={{}}>
              {currentSession.exercises.map((item, index) => {
                return (
                  <ListItem
                    key={index}
                    item={item}
                    exerciseIndex={index}
                    onShowDetailsEvent={this.navigateToExerciseDetails}
                    onShowVideoEvent={this.showVideo}
                    onSetPressEvent={this.onSetPressEvent}
                    onToggleExercise={this.toggleExercise}
                    checked={this.state.selectedExercises.indexOf(item.session_exercise_id) > -1}
                  />
                );
              })}
            </View>

            <If condition={this.state.modalVisible}>
              <Modal
                animationType="fade"
                transparent={false}
                visible={this.state.modalVisible}
                style={{
                  backgroundColor: "black"
                }}
                onRequestClose={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}
              >
                <View
                  style={{
                    flex: 1,
                    backgroundColor: "black"
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      backgroundColor: "black",
                      flexDirection: "column",
                      justifyContent: "center"
                    }}
                  >
                    <If condition={this.state.videoIsLoading}>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: "center",
                          zIndex: 999,
                          position: "absolute",
                          top: 0,
                          bottom: 0,
                          left: 0,
                          right: 0
                        }}
                      >
                        <ActivityIndicator
                          size="large"
                          color={"white"}
                          style={{
                            zIndex: 99
                          }}
                        />
                      </View>
                    </If>
                    <Video
                      ref={ref => {
                        this.videoRef = ref;
                      }}
                      source={{
                        uri: this.state.waitingVideoURL
                      }}
                      resizeMode="center"
                      muted={true}
                      controls={false}
                      style={styles.backgroundVideo}
                      repeat={true}
                      onLoadStart={() => {
                        console.log("loading start");
                        this.setState({ videoIsLoading: true });
                      }}
                      onLoad={() => {
                        console.log("LOADED");
                        this.setState({ videoIsLoading: false });
                      }}
                    />
                  </View>
                  <TouchableOpacity
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                    onPress={() => {
                      this.setModalVisible(!this.state.modalVisible);
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        fontWeight: "bold"
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </Modal>
            </If>
          </ScrollView>
          <SlidingUpPanel
            ref={c => (this._panel = c)}
            draggableRange={{ top: 280, bottom: 0 }}
            snappingPoints={[280, 0]}
            minimumDistanceThreshold={100}
          >
            <View
              style={{
                ...styles.container,
                backgroundColor: "white"
              }}
            >
              <View
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row"
                }}
              >
                <Text style={{ padding: 2, fontSize: 18, fontWeight: "bold" }}>
                  {this.state.currentExercise.name} Bent Over Row
                </Text>
                <If condition={this.state.currentExercise.setIndex != 0}>
                  <TouchableOpacity onPress={this.removeCurrentSet}>
                    <Icon
                      name={"remove-circle-outline"}
                      size={20}
                      color={"red"}
                    />
                  </TouchableOpacity>
                </If>
              </View>
              {/* <ScrollView
                className="sets"
                horizontal={true}
                style={styles.setRows}
              >
                <Text style={{ fontWeight: "bold" }}>Sets:</Text>
                {this.state.exercises[2].sets &&
                  this.state.exercises[2].sets.map(set => {
                    return (
                      <SetButton
                        data={{ set }}
                        onPressEvent={() => alert("damn")}
                      />
                    );
                  })}
                <SetButton
                  data={{ new: true }}
                  new={true}
                  onPressEvent={this.addNewSet}
                />
              </ScrollView> */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  padding: 10
                }}
              >
                <Text style={{ fontSize: 17, color: "#454545" }}>
                  Set {parseInt(this.state.currentExercise.setIndex) + 1}: Enter{" "}
                  {panelType} & weight
                  <Text style={{ fontWeight: "bold" }} />
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  height: 170,
                  position: "absolute",
                  // bottom: 0,
                  top: 30,
                  left: 0,
                  right: 0,
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "space-around"
                  // opacity: 0
                  // backgroundColor: 'blue'
                }}
              >
                <View style={{ flex: panelType === "duration" ? 0.5 : 0.33 }}>
                  <If condition={panelType === "duration"}>
                    {/* <Text style={{ textAlign: "center" }}>Duration:</Text> */}
                    <View style={{ flexDirection: "row" }}>
                      <Picker
                        style={{ flex: 1 }}
                        itemStyle={{ height: 100, fontSize: 15 }}
                        selectedValue={5}
                        onValueChange={(itemValue, itemIndex) =>
                          this.updateCurrentSet("metric", itemValue)
                        }
                      >
                        {[...Array(20).keys()].map(i => (
                          <Picker.Item label={i + "m"} value={i} />
                        ))}
                      </Picker>
                      <Picker
                        style={{ flex: 1 }}
                        itemStyle={{ fontSize: 15, height: 100 }}
                        selectedValue={30}
                      >
                        <Picker.Item label="0s" value={0} />
                        <Picker.Item label="15s" value={15} />
                        <Picker.Item label="30s" value={30} />
                        <Picker.Item label="45s" value={45} />
                      </Picker>
                    </View>
                  </If>
                  <If condition={panelType === "reps"}>
                    <View
                      style={{
                        flexDirection: "row",
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                    >
                      <If condition={curntExerc.failure == 1}>
                        <Text style={{ fontSize: 17 }}>AMRAP</Text>
                        <TouchableOpacity onPress={this.toggleFailure}>
                          <MIcon
                            name={"counter"}
                            size={25}
                            style={{ opacity: 0.7 }}
                          />
                        </TouchableOpacity>
                      </If>
                      <If condition={!curntExerc.failure}>
                        <TextInput
                          placeholder={"Reps"}
                          textAlign={"center"}
                          keyboardType={"decimal-pad"}
                          returnKeyType="done"
                          onChangeText={value =>
                            this.updateCurrentSet("count", value)
                          }
                          value={curntExerc.count}
                          style={{
                            fontSize: 18,
                            // width: 150,
                            // flex: 0.3,
                            borderWidth: 1,
                            textAlign: "center",
                            padding: 10,
                            borderColor: "#F1F2F2"
                          }}
                        />
                        <TouchableOpacity onPress={this.toggleFailure}>
                          <MIcon
                            name={"flag-checkered"}
                            size={25}
                            style={{ opacity: 0.7 }}
                          />
                        </TouchableOpacity>
                      </If>
                    </View>
                  </If>
                </View>
                {/* <View style={{ flex: 0.33 }}>
                  <Text style={{ textAlign: "center" }}>Reps</Text>
                  <TextInput
                    placeholder={"Reps"}
                    textAlign={"center"}
                    keyboardType={"decimal-pad"}
                    returnKeyType="done"
                    style={{
                      fontSize: 18,
                      // width: 150,
                      // flex: 0.3,
                      // borderWidth: 1,
                      textAlign: "center",
                      padding: 10,
                      borderColor: "#CCC"
                    }}
                  />
                </View> */}
                <If condition={curntExerc.weight != "BW"}>
                  <View style={{ flex: panelType == "reps" ? 0.33 : 0.25 }}>
                    {/* <Text style={{ textAlign: "center", height: 20 }}>
                    Weight
                  </Text> */}
                    <TextInput
                      placeholder={"Weight"}
                      textAlign={"center"}
                      keyboardType={"decimal-pad"}
                      returnKeyType="done"
                      style={{
                        fontSize: 18,
                        borderWidth: 1,
                        padding: 10,
                        marginRight: 4,
                        borderColor: "#F1F2F2"
                      }}
                    />
                  </View>

                  <Picker
                    selectedValue={curntExerc.metric}
                    style={{ flex: panelType == "reps" ? 0.33 : 0.25 }}
                    onValueChange={(itemValue, itemIndex) =>
                      this.updateCurrentSet("metric", itemValue)
                    }
                    itemStyle={{ fontSize: 18, height: 100 }}
                  >
                    <Picker.Item label="Kg" value="Kg" />
                    <Picker.Item label="Lbs" value="Lbs" />
                  </Picker>
                </If>
                <If condition={curntExerc.weight == "BW"}>
                  <View style={{ flex: 0.66, alignItems: "center" }}>
                    <Text style={{ fontWeight: "bold", fontSize: 20 }}>BW</Text>
                  </View>
                </If>
              </View>

              <View
                style={{
                  position: "absolute",
                  height: 70,
                  top: 155,
                  left: 0,
                  right: 0,
                  // bottom: 0,
                  flex: 1,
                  // backgroundColor: 'green',
                  zIndex: 5
                }}
              >
                <View style={{ height: 30, paddingLeft: 10 }} />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    height: 50
                  }}
                >
                  <TouchableOpacity
                    style={{
                      flex: 0.5,
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                    onPress={this.toggleWeightType}
                  >
                    <Text
                      style={[styles.panelButtonText, { color: "#042356" }]}
                    >
                      <If condition={curntExerc.weight != "BW"}>Body Weight</If>
                      <If condition={curntExerc.weight == "BW"}>
                        Custom Weight
                      </If>
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={this.saveSet}
                    style={{
                      flex: 0.5,
                      alignItems: "center",
                      backgroundColor: "#042356",
                      height: 40,
                      margin: 5,
                      borderRadius: 5,
                      justifyContent: "center"
                    }}
                  >
                    <Text style={styles.panelButtonText}>Done</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* <Button title="Hide" onPress={() => this._panel.hide()} /> */}
            </View>
          </SlidingUpPanel>
        </BG>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5
  },
  contentContainer: {
    flexGrow: 1
  },
  panelButtonText: {
    fontSize: 15,
    color: "white",
    fontWeight: "bold"
  },
  // navContainer: {
  //   height: HEADER_HEIGHT,
  //   marginHorizontal: 10
  // },
  // statusBar: {
  //   height: STATUS_BAR_HEIGHT,
  //   backgroundColor: "transparent"
  // },
  // navBar: {
  //   height: NAV_BAR_HEIGHT,
  //   justifyContent: "space-between",
  //   alignItems: "center",
  //   flexDirection: "row",
  //   backgroundColor: "transparent"
  // },
  titleStyle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18
  },
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 100,
    backgroundColor: "black"
  },
  setRows: {
    flexDirection: "row",
    marginRight: 1,
    padding: 3,
    height: 80,
    // backgroundColor: 'green',
    overflow: "hidden"
    // alignItems: "center"
    // justifyContent: 'center'
  }
});

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    tempSessionWeights: state.workouts.tempSessionWeights,
    productsData: state.general.productsData
  };
};

export default connect(
  mapStateToProps,
  { storeTempExerciseWeights }
)(WorkoutSession);
