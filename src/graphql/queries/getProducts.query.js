import gql from 'graphql-tag';

export default gql `
    getCustomerBoughtProducts {
        data {
          id,
          variant_id,
          name,
          type,
          cover_image,
          background_image,
          seller
        }
        error
      }
`;