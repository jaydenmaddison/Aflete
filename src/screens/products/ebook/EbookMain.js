import React from "react";
import {
  Button,
  View,
  Text,
  Dimensions,
  StyleSheet,
  ImageBackground
} from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import PrimaryButton from "src/components/buttons/primary/default";

class EbookMain extends React.Component {
  static navigationOptions = {
    title: "Ebook"
  };

  constructor() {
    super();
    this.state = {};
  }

  navigate = (animation, args) => {
    setTimeout(() => {
      animation();
    }, 1500);
  };

  render() {
    const width = Dimensions.get("window").width;

    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
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
  extraText: {
    fontSize: 12,
    color: "white",
    padding: 10
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover", // or 'stretch',
    justifyContent: "center"
  }
});
export default EbookMain;
