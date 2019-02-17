import gql from 'graphql-tag';

export const GET_WINES = gql`
  query GetWines {
    allWines {
      id
      year
      country {
        id
        name
      }
      product {
        id
        name
        slug
        sellingPrice
        productPhotos {
          id
          photoWineListing
          photoLarge
        }
      }
      wineType {
        id
        name
        wineClass {
          id
          name
        }
      }
      wineRegion {
        id
        name
      }
    }
  }
`;
