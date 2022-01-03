import { gql } from '@apollo/client';


export const STATS_COUNT_QUERY = gql`
    query statsCount(
        $locationKeywords: [String!]!
        $severity: Int
    ) {
        statsCount(
            locationKeywords: $locationKeywords,
            severity: $severity,
        )
    }
`;
