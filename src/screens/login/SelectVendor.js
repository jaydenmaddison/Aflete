import React from "react";
import {
  Button,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity
} from "react-native";
import { NavigationEvents } from "react-navigation";
import LinearGradient from "react-native-linear-gradient";
import randomcolor from "randomcolor";
import { Hoshi } from "react-native-textinput-effects";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { StackActions, NavigationActions } from "react-navigation";
import BG from "src/components/common/background";
import { client } from "aflete/App";
import GET_VENDORS from "src/graphql/queries/getVendors.query";
import gql from "graphql-tag";
import { Query } from "react-apollo";

let PrimaryButton = require("src/components/buttons/primary").default(0);

// const GET_VENDORSas = gql`
//   {
//     listCustomerOrdersVendors(email: "shahzaib@aflete.com") {
//       vendors {
//         PK
//         Name
//         VendorImage
//         Theme {
//           PrimaryColour
//           TextOnPrimaryColor
//         }
//         DateCreated
//       }
//     }
//   }
// `;

class SelectVendor extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      vendors: ["t", "df"]
    };
  }

  componentDidMount() {
    return;
    // console.log(client);
    client
      .query({
        // query: gql`
        //   query {
        //     listCustomerOrdersVendors(email: $email) {
        //       vendors {
        //         PK
        //         Name
        //         VendorImage
        //         Theme {
        //           PrimaryColour
        //           TextOnPrimaryColor
        //         }
        //         DateCreated
        //       }
        //     }
        //   }
        // `,
        query: GET_VENDORS,
        variables: { email: "shahzaib@aflete.com" }
      })
      .then(data => {
        console.log("Vendors Data", data);
        // this.props.storeProducts(data.data.allProducts);
      })
      .catch(e => {
        alert("error");
      });
  }

  componentWillMount() {
    // alert('mounting')
    // try {
    // } catch (error) {
    //   alert(error);
    // }
  }

  selectVendor = (pk, image) => {
    const { email } = this.props.navigation.state.params;
    if (pk.includes("|")) {
      this.props.navigation.navigate("Login", {
        email,
        vendor: pk.split("|")[1],
        image
      });
    }
  };

  submit = animation => {
    const { email } = this.props.navigation.state.params;
    const { vendor } = this.state;

    if (typeof animation === "function") {
      animation();
    }
    this.props.navigation.navigate("Login", { email });
  };

  render() {
    const { email } = this.props.navigation.state.params;
    // alert(JSON.stringify(this.props.navigation.state.params));
    return (
      <BG
        style={{ justifyContent: "center", flex: 1, backgroundColor: "blue" }}
      >
        <View style={{ flexDirection: "column" }}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 18,
              fontWeight: "bold",
              marginBottom: 10
            }}
          >
            Hi {email},
          </Text>
          <Text style={{ textAlign: "center", fontSize: 18, marginBottom: 20 }}>
            Select Vendor:
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Query
              query={GET_VENDORS}
              variables={{ email: "shahzaib@aflete.com" }}
            >
              {({ loading, error, data: queryResponseData }) => {
                const { listCustomerOrdersVendors } = queryResponseData;
                console.log("loading", loading);
                console.log("Error", error);
                console.log(
                  "listCustomerOrdersVendors",
                  listCustomerOrdersVendors
                );
                if (error) return <Text>Error {JSON.stringify(error)}</Text>;
                if (loading || !listCustomerOrdersVendors)
                  return <Text>Loading...</Text>;
                return listCustomerOrdersVendors.vendors.map(vendor => (
                  <View
                    key={vendor.PK}
                    style={{
                      width: 100,
                      height: 100,
                      backgroundColor: vendor.Theme.PrimaryColour,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: 10
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => this.selectVendor(vendor.PK, vendor.VendorImage)}
                    >
                      <Image
                        source={{ uri: vendor.VendorImage }}
                        resizeMode="contain"
                        style={{
                          width: 80,
                          height: 80
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                ));
              }}
            </Query>
          </View>
          {/* <View style={{ alignItems: "center" }}>
            <PrimaryButton
              title={"Submit"}
              progress
              onPressEvent={this.submit}
            />
          </View> */}
        </View>
      </BG>
    );
  }
}
export default SelectVendor;
