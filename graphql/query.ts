import { gql } from "@apollo/client";

export const GET_PRODUCT = gql`
  query MyQuery($id: ID!) {
    product(where: { id: $id }) {
      id
      name
      description
      slug
      price
      images {
        width
        height
        url
      }
      reviews {
        id
        headline
      }
      categories {
        id
        name
      }
      collections {
        id
        name
      }
    }
  }
`;

export const GET_PRODUCTS = gql`
  query MyQuery {
    products {
      id
      name
      description
      slug
      price
      images {
        width
        height
        url
      }
      reviews {
        id
        headline
      }
      categories {
        id
        name
      }
      collections {
        id
        name
      }
    }
  }
`;
