import { gql } from '@apollo/client';

export const PEOPLE_SUBSCRIPTION = gql`
    subscription {
        people {
            inserted {
                severity
                location {
                    description
                }
            }
            deleted {
                severity
                location {
                    description
                }
            }
        }
    }

`;
