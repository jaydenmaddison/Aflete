import React from "react";
import {
  Button,
  View,
  ScrollView,
  Text,
  Dimensions,
  StyleSheet,
  ImageBackground,
  TouchableOpacity
} from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import PrimaryButton from "src/components/buttons/primary/default";
import gql from "graphql-tag";
import { connect } from "react-redux";
import { storeSingleProduct } from "src/actions/general";
import BG from "src/components/common/background";
import Header from "src/components/common/header";
import Icon from "react-native-vector-icons/MaterialIcons";
import { API, graphqlOperation } from "aws-amplify";
import GET_WORKOUT_PRODUCT from "src/graphql/queries/getWorkout.query";
import { client } from "aflete/App";
import AboutSection from "src/components/sections/workout/mainPage/About";
import AdditionalSection from "src/components/sections/workout/mainPage/AdditionalDownloads";
import ProgressSection from "src/components/sections/workout/mainPage/Progress";
import ListingSection from "src/components/sections/workout/listing/Listing";

const WIDTH = Dimensions.get("window").width;

class WorkoutMain extends React.Component {
  
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

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    client
      .query({
        query: GET_WORKOUT_PRODUCT,
        variables: {
          workoutID: parseInt(this.props.navigation.state.params.product_id)
        }
      })
      .then(data => {
        console.log("Workout Product Data", data);
        this.props.storeSingleProduct(
          this.props.navigation.state.params.product_id,
          data.data.getCustomerBoughtWorkout.data
        );
        // this.props.storeProducts(data.data.allProducts);
      })
      .catch(e => {
        alert(e);
      });
  }

  componentDidMount() {
    console.log("Props Workout Main", this.props);
    // this.loadWorkout();
  }

  // loadProduct = () => {
  //   client
  //     .query({
  //       query: gql`
  //         query {
  //           Product(id: ${this.props.navigation.state.params.product_id}) {
  //             id
  //             seller_image
  //             type
  //             name
  //             description
  //             bought_description
  //             background_image
  //             cover_image
  //             downloads
  //             images
  //           }
  //         }
  //       `
  //     })
  //     .then(data => {
  //       console.log("Single data", data);
  //       this.props.storeSingleProduct(
  //         this.props.navigation.state.params.product_id,
  //         data.data.Product
  //       );
  //     })
  //     .catch(error => {
  //       alert("Error");
  //     });
  // };

  loadWorkout = () => {
    client
      .query({
        query: gql`
          query {
            Workout(id: 1333) {
              id
              name
              bought_description
              background_image
              workouts
              images
              workoutStats
            }
          }
        `
      })
      .then(data => {
        console.log("Single data", data);
        this.props.storeSingleProduct(
          // this.props.navigation.state.params.product_id,
          1333, // TEMP
          data.data.Workout
        );
      })
      .catch(error => {
        alert("Error");
      });
  };

  navigate = (route, params) => {
    const productTitle = this.props.navigation.state.params.productTitle;
    this.props.navigation.navigate("WorkoutSession", {
      ...params,
      productTitle
    });
  };

  navigateToWeek = (route, params) => {
    // return;
    const { productTitle, product_id } = this.props.navigation.state.params;
    this.props.navigation.navigate("WorkoutWeek", {
      ...params,
      productTitle,
      product_id
    });
  };

  render() {
    const { product_id } = this.props.navigation.state.params;
    let product = null;

    if (typeof this.props.products[product_id] != "undefined") {
      product = this.props.products[product_id];
    }

    return (
      <BG>
        <ScrollView style={{ background: "transparent" }}>
          <If condition={product}>
            <AboutSection {...product} />
            <View style={{ padding: 10 }}>
              <ProgressSection />
              <ListingSection
                workouts={product.workouts}
                parentNavigation={this.navigateToWeek}
              />
            </View>
            <If condition={product.downloads}>
              <AdditionalSection downloads={product.downloads} />
            </If>
          </If>
        </ScrollView>
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
  { storeSingleProduct }
)(WorkoutMain);
