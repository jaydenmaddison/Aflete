import React from "react";
import {
  Button,
  View,
  Text,
  Dimensions,
  StyleSheet,
  ImageBackground,
  TouchableOpacity
} from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import PrimaryButton from "src/components/buttons/primary/default";
import Icon from "react-native-vector-icons/MaterialIcons";
import BG from "src/components/common/background";
import produce from "immer";
import { connect } from "react-redux";
import ListingWeekSection from "src/components/sections/workout/weekPage/listing/Listing";

class Workouts extends React.Component {
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
    this.state = {};
  }

  navigate = (animation, args) => {
    setTimeout(() => {
      animation();
    }, 1500);
  };

  navigateToSession = (route, params) => {
    const { workout_id, product_id } = this.props.navigation.state.params;
    const productTitle = this.props.navigation.state.params.productTitle;
    this.props.navigation.navigate("WorkoutSession", {
      ...params,
      productTitle,
      workout_id,
      product_id
    });
  };

  render() {
    const width = Dimensions.get("window").width;

    const { workout_id, product_id } = this.props.navigation.state.params;

    let product = null;

    if (typeof this.props.products[product_id] != "undefined") {
      product = this.props.products[product_id];
    }

    let workout = null;

    if (workout_id && product) {
      workout = product.workouts.filter(obj => obj.id == workout_id);

      if (workout.length > 0) {
        workout = workout[0];
      }
    }

    return (
      <BG>
        <View>
          <If condition={workout}>
            <ListingWeekSection
              sessions={workout.sessions}
              parentNavigation={this.navigateToSession}
              title={"Workout"}
            />
          </If>
        </View>
      </BG>
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

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    products: state.general.productsData
  };
};

export default connect(
  mapStateToProps,
  {}
)(Workouts);
