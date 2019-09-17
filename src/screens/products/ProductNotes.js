import React from "react";
import {
  Button,
  View,
  Text,
  Dimensions,
  StyleSheet,
  TextInput
} from "react-native";
import PrimaryButton from "../../components/buttons/primary/default";
import gql from "graphql-tag";
import client from "src/config/clientConfiguration";
import { connect } from "react-redux";
import { storeProducts } from "src/actions/general";
import BG from "src/components/common/background";

class ProductNotes extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: navigation.state.params.productTitle || '',
  });

  constructor() {
    super();
    this.state = {
      notes: ""
    };
  }

  componentDidMount() {
    // client
    //   .query({
    //     query: gql`
    //       query {
    //         allProducts {
    //           id
    //           name
    //           description
    //           background_image
    //           cover_image
    //           downloads
    //           customer_message
    //           wordpress_ref
    //         }
    //       }
    //     `
    //   })
    //   .then(data => {
    //     this.props.storeProducts(data.data.allProducts);
    //   })
    //   .catch(error => console.error(error));
  }

  render() {
    const width = Dimensions.get("window").width;

    return (
      <BG>
        <TextInput
          style={{
            height: 40,
            flex: 1,
            width: "100%",
            padding: 5,
            fontSize: 18,
            color: '#343434'
          }}
          onChangeText={notes => this.setState({ notes })}
          placeholder={"This is your product notes"}
          multiline={true}
          numberOfLines={15}
          value={this.state.notes}
        />
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
// export default ProductNotes;

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    products: state.general.productsInfo
  };
};

export default connect(
  mapStateToProps,
  { storeProducts }
)(ProductNotes);
