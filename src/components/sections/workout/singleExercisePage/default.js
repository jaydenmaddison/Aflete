import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import Color from "color";
// import Logic from "../Logic";

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.init();
  }

  toggleExerciseCompletion = exercise_id => event => {
    this.props.navigation.navigate("WorkoutDay", { day_id: id });
  };

  exerciseWeightsUsed = exercise_id => event => {
    this.props.navigation.navigate("WorkoutDay", { day_id: id });
  };

  pressFunc = next => {
    this.props.onPressEvent(next, this.props.params);
  };

  render() {
    const mainColor = this.props.bg || "#116bfc";
    const color = Color(mainColor);
    let darkenColor = color.darken(0.3).hex();

    if (this.props.lighten) {
      darkenColor = color.lighten(0.3).hex();
    }

    const tempImage = "https://placekitten.com/300/405";

    return (
      <View>
        <View style={{ height: 400 }}>
          <Image source={{ uri: tempImage }} style={styles.image} />
          <If condition={this.props.headerText}>
            <Text style={styles.headerText}>{this.props.headerText}</Text>
          </If>
          <If condition={this.props.text}>
            <Text style={styles.text}>{this.props.text}</Text>
          </If>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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

export default Button;
