import gql from "graphql-tag";
//TODO: missing 
export default (GET_VENDORS = gql`
  query getVendors($email: String!) {
    listCustomerOrdersVendors(email: $email) {
      vendors {
        PK
        Name
        VendorImage
        Theme {
          PrimaryColour
          TextOnPrimaryColor
        }
        DateCreated
      }
    }
  }
`);
