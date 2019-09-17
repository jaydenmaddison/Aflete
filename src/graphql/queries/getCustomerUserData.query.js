import gql from 'graphql-tag';

export default gql `
{
  getCustomerUserDataForProduct(productID: 57, dataType: "exercise"){
    data {
      id,
      user_id,
      product_id,
      type,
      type_id,
      data,
      created_at,
      updated_at
    }
  }
}
`