import { gql } from "@apollo/client";

export const charactersQuery = gql`query CharactersList($first: Int, $after: String) {
  allPeople(first: $first, after: $after) {
    people {
      id
      name
      homeworld {
        name
      }
      filmConnection {
        films {
          title
        }
      }
    }
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
  }
}`;

export const characterQuery = gql`query Character($id: ID) {
  person(id: $id) {
    name
    species {
      name
    }
    homeworld {
      name
    }
    filmConnection {
      films {
        title
      }
    }
  }
}`;
  