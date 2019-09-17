import React from "react";
import {
  Button,
  View,
  Text,
  Dimensions,
  StyleSheet,
  ImageBackground,
  Image
} from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import PrimaryButton from "../../components/buttons/primary/t2";
import gql from "graphql-tag";
import { client } from "aflete/App";
import { connect } from "react-redux";
import { storeProducts } from "src/actions/general";
import Surface from "src/components/common/surface";
import BG from "src/components/common/background";
import { Auth } from "aws-amplify";

class Home extends React.Component {
  static navigationOptions = {
    // headerTitle: ""
    header: null
  };

  constructor() {
    super();
    this.state = {
      entries: [
        {
          id: 1,
          title: "this is first",
          image: "https://placekitten.com/200/305",
          bigText: "Ebook",
          type: "ebook"
        },
        {
          id: 2,
          title: "this is Second",
          image: "https://placekitten.com/200/400",
          bigText: "75%",
          type: "workout"
        },
        {
          id: 3,
          title: "this is a third thing",
          image: "https://placekitten.com/200/401",
          bigText: "5%",
          type: "workout"
        }
      ],
      activeSlide: 0
    };
  }

  componentDidMount() {
    // return;
    try {
      client
        .query({
          query: gql`
            {
              getCustomerBoughtProducts {
                data {
                  id
                  variant_id
                  name
                  type
                  cover_image
                  background_image
                  seller
                }
                error
              }
            }
          `
        })
        .then(data => {
          console.log("Data", data.data);
          this.props.storeProducts(data.data.getCustomerBoughtProducts.data);
        });
    } catch (error) {
      alert(error);
    }

    this.handleSubmit();
  }

  handleSubmit = async event => {
    // Auth.signOut()
    //     .then(data => alert(data))
    //     .catch(err => alert(err));
    return;
    try {
      // await Auth.signIn(this.state.email, this.state.password);
      await Auth.signIn(
        "shahzaib@aflete.com#b445b861-3a43-17e9-bccd-0ac7253a1ad8",
        "password"
      );
      alert("Logged in");
    } catch (e) {
      alert(e.message);
    }
  };

  navigate = (animation, product_id, name) => {
    setTimeout(() => {
      if (animation) {
        animation();
      }

      this.props.navigation.navigate("WorkoutMain", {
        product_id,
        productTitle: name
      });
    }, 200);
    // next();
  };

  get pagination() {
    const { activeSlide } = this.state;
    const { products } = this.props;
    return;
    return (
      <Pagination
        dotsLength={products.length}
        activeDotIndex={activeSlide}
        containerStyle={{
          backgroundColor: "rgba(0, 0, 0, 0)",
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0
        }}
        dotStyle={{
          // width: 5,
          // height: 5,
          // borderRadius: 5,
          marginHorizontal: -3,
          backgroundColor: "#BBBBBB"
        }}
        inactiveDotStyle={
          {
            // Define styles for inactive dots here
          }
        }
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  }

  _renderItem = ({ item, index }) => {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ alignItems: "center", marginTop: 0 }}>
          <Text
            style={{
              color: "white",
              fontSize: 25,
              marginBottom: 4,
              fontWeight: "bold"
            }}
          >
            {item.seller.toUpperCase()}
          </Text>
        </View>
        <Surface
          style={{
            flex: 1,
            margin: 30,
            marginTop: 0,
            marginBottom: 60,
            padding: 0,
            paddingTop: 0,
            alignItems: "stretch",
            justifyContent: "flex-start",
            borderRadius: 20,
            // backgroundColor: "red",
            // overflow: 'hidden',
            elevation: 10,
            borderColor: "#CCCCCC",
            borderWidth: 1
          }}
        >
          <View
            style={{
              // backgroundColor: "green",
              flex: 0.85,
              overflow: "hidden",
              borderRadius: 20,
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0
            }}
          >
            <Image
              source={{ uri: item.cover_image }}
              resizeMode="cover"
              style={{ height: null, flex: 1 }}
            />
          </View>
          <View style={{ alignItems: "center", flex: 0.15 }}>
            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 0.65, justifyContent: "center" }}>
                <Text style={styles.headerText}>{item.name}</Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={styles.bigText}>50%</Text>
                  <Text style={styles.extraText}>completed</Text>
                </View>
              </View>
              <View style={{ flex: 0.35, justifyContent: "center" }}>
                <PrimaryButton
                  title={"Open"}
                  onPressEvent={anim => this.navigate(anim, item.id, item.name)}
                  params={item}
                  bg={"#1f7ba3"}
                  progress
                />
              </View>
            </View>
          </View>
        </Surface>
      </View>
    );
  };

  render() {
    const width = Dimensions.get("window").width;
    // return null;
    return (
      <BG
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Carousel
          sliderWidth={width}
          itemWidth={width}
          inactiveSlideScale={1}
          slideStyle={{ width }}
          data={this.props.products}
          onSnapToItem={index => this.setState({ activeSlide: index })}
          renderItem={this._renderItem}
        />
        {this.pagination}
      </BG>
    );
  }
}

const styles = StyleSheet.create({
  headerText: {
    fontSize: 20,
    color: "black",
    padding: 10,
    fontWeight: "bold"
  },
  bigText: {
    fontSize: 20,
    color: "black",
    padding: 10,
    paddingRight: 0
  },
  extraText: {
    fontSize: 12,
    color: "black",
    padding: 10
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover", // or 'stretch',
    justifyContent: "center"
  }
});
// export default Home;

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    products: state.general.productsInfo
  };
};

export default connect(
  mapStateToProps,
  { storeProducts }
)(Home);
