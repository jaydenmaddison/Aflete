import gql from 'graphql-tag';

export default gql `
{
  getCustomerBoughtProduct(productID:76) {
    data {
      id,
      variant_id,
      seller_image,
      type,
      name,
      description,
      bought_description,
      quote,
      customer_message,
      background_image,
      cover_image,
      downloads {
        id,
        order,
        src,
        name,
        description
      },
      images {
        id,
        order,
        src
      },
      seller {
        id,
        name,
        banner
      },
      variants {
        id,
        name,
        is_featured,
        images {
          id,
          order,
          src
        } 
        prices {
          currency_code,
          price
        }
      }
    }
  }
}
`