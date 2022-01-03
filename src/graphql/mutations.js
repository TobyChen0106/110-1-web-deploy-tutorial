import { gql } from '@apollo/client';

export const INSERT_PEOPLE_MUTATION = gql`
  mutation insertPeople(
    $data: [PersonInput!]!
  ) {
    insertPeople(
      data: $data
    ) 
  }
`;
