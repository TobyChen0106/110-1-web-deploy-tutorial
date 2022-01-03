import { useQuery } from '@apollo/client';
import { useEffect } from 'react';

import constants from '../constants';
import { STATS_COUNT_QUERY, PEOPLE_SUBSCRIPTION } from '../graphql';


export default function WatchList(props) {

    const {data: counts, subscribeToMore} = useQuery(
        STATS_COUNT_QUERY,
        {
            variables: {locationKeywords: constants.watchList, severity: 1}
        }
    );

    useEffect(() => {
        try {
            subscribeToMore({
                document: PEOPLE_SUBSCRIPTION,
                updateQuery: (prev, { subscriptionData }) => {
                    const prevCounts = [...prev.statsCount];
                    const { inserted, deleted } = subscriptionData.data.people;
                    inserted.forEach(person => {
                        if (person.severity === 0) return;
                        constants.watchList.forEach((keyword, idx) => {
                            if (person.location.description.includes(keyword)) {
                                prevCounts[idx] += 1;
                            }
                        })
                    })
                    deleted.forEach(person => {
                        if (person.severity === 0) return;
                        constants.watchList.forEach((keyword, idx) => {
                            if (person.location.description.includes(keyword)) {
                                prevCounts[idx] -= 1;
                            }
                        })
                    })

                    return {
                        statsCount: prevCounts,
                    }
                },
            })
        } catch(e) {
            console.error(e);
        }
    }, [subscribeToMore])
    
    return (
        <table>
        <tbody>
            <tr>
                <th>Keyword</th>
                <th>Count</th>
            </tr>
            {
                constants.watchList.map(
                    (keyword, idx) => 
                    <tr key={keyword}>
                        <td>{keyword}</td>
                        <td id={`count-${idx}`}>{!counts || ! counts.statsCount || counts.statsCount[idx]}</td>
                    </tr>
                )
            }
        </tbody>
        </table>
    );
}