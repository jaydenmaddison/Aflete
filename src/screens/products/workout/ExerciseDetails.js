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
  TextInput
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import BG from "src/components/common/background";
import Title from "src/components/common/title";
import Surface from "src/components/common/surface";
import SlidingUpPanel from "rn-sliding-up-panel";

const SCREEN_WIDTH = Dimensions.get("window").width;

class ExerciseDetails extends React.Component {
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
      notes: [
        {
          date: "Bent Over Row",
          note: "This is the note"
        }
      ],
      sets: [],
      visibleNoteModal: false
    };
  }

  componentWillMount() {
    // this.animated = new Animated.Value(0, { useNativeDriver: true });
  }

  openNewMessage = () => {
    this._panel.show();
  };

  saveAndClose = () => {
    this._panel.hide();
  }

  componentWillUnmount = () => {
    // alert('this');
    this._panel.hide();
  }

  render() {
    const { info, name } = this.props.navigation.state.params;
    return (
      <BG>
        <View style={{ padding: 0, flex: 1 }}>
          <View>
            <Title title={"Exercise details"} />
          </View>
          <ScrollView scrollEventThrottle={32} style={{ flex: 1 }}>
            <Title title={name} />
            <If condition={info}>
              <Surface style={{ backgroundColor: "#F8f8f8" }}>
                <Text style={{ color: "#002135", fontSize: 16 }}>{info}</Text>
              </Surface>
            </If>
            <View
              style={{
                marginTop: 30,
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: "row",
                flex: 1
              }}
            >
              <Title title={"Notes"} />

              <TouchableOpacity onPress={this.openNewMessage}>
                <Icon
                  name="add"
                  color={"black"}
                  size={30}
                  style={{ width: 40 }}
                />
              </TouchableOpacity>
            </View>
            <Surface style={{ backgroundColor: "#F8f8f8" }}>
              <If condition={this.state.notes.length > 0}>
                <Text style={{ color: "#002135", fontSize: 17 }}>
                  Save some notes here
                </Text>
                <Text style={{ color: "#002135", fontSize: 17 }}>
                  Your future self will thank you
                </Text>
              </If>

              <If condition={this.state.notes.length === 0}>
                {this.state.notes.map(item => {})}
              </If>
            </Surface>
            <Title title={"Set History"} />
            <Surface style={{ backgroundColor: "#F8f8f8" }}>
              <If condition={this.state.sets.length === 0}>
                <Text style={{ color: "#002135", fontSize: 17 }}>
                  Save some notes here
                </Text>
                <Text style={{ color: "#002135", fontSize: 17 }}>
                  Your future self will thank you
                </Text>
              </If>
              <If condition={this.state.sets.length > 0}>
                {this.state.sets.map(item => {
                  return (
                    <View>
                      <Text>This is something</Text>
                    </View>
                  );
                })}
              </If>
            </Surface>
          </ScrollView>
          <Modal visible={this.state.visibleNoteModal} />
        </View>
        <SlidingUpPanel
          ref={c => (this._panel = c)}
          draggableRange={{ top: 280, bottom: 0 }}
          snappingPoints={[280, 0]}
          minimumDistanceThreshold={100}
        >
          <View style={{ backgroundColor: "white", flex: 1 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#F9F9F9",
                padding: 5,
                borderBotttomWidth: 1,
                borderColor: "#CCCCCC"
              }}
            >
              <Text style={{ fontSize: 18 }}>Note:</Text>
              <TouchableOpacity
                onPress={this.saveAndClose}
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: "#CCCCCC"
                }}
              >
                <Icon
                  name="check"
                  color={"#0665a0"}
                  size={30}
                  // style={{ width: 40 }}
                />
              </TouchableOpacity>
            </View>

            <TextInput
              style={{
                // height: 40,
                flex: 1,
                width: "100%",
                padding: 5,
                fontSize: 18,
                color: "#343434"
              }}
              onChangeText={notes => this.setState({ notes })}
              placeholder={"Enter your note"}
              multiline={true}
              numberOfLines={15}
              value={this.state.notes}
            />
          </View>
        </SlidingUpPanel>
      </BG>
    );
  }
}
export default ExerciseDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contentContainer: {
    flexGrow: 1
  },
  titleStyle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18
  }
});
