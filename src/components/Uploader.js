import { useState, useCallback } from 'react';
import papaparse from 'papaparse';

import "./Uploader.css"


export default function Uploader(props) {

    const [rawData, setRawData] = useState([]);

    const tidySubfields = (record) => {
        const subfields = {};
        for(const [key, value] of Object.entries(record)) {
            const index = key.indexOf('_');
            if (index < 0) continue;

            const prefix = key.slice(0, index);
            const suffix =  key.slice(index + 1) ;
            if (subfields[prefix] === undefined) subfields[prefix] = {}
            subfields[prefix][suffix] = value;

            delete record[key];
        }
        record = {...subfields, ...record};
        return record;
    }

    const tidyCSV = (data) => {
        const tidyData = data.map((person) => tidySubfields({...person}));    
        return tidyData;
    }

    const selectedFile = (event) => {
        try {
            const file = event.target.files[0];
            papaparse.parse(file, {
                header: true,
                dynamicTyping: true,
                complete: (results) => {
                    results.data = results.data.filter((person) => person.ssn);
                    const tidyData = tidyCSV(results.data); 
                    setRawData(results.data);
                    onSubmitData(tidyData);
                }
            });
        } catch (err) {
            console.error(err);
        }
    }

    const { mutation } = props;
    const onSubmitData = useCallback(async (tidyData) => {
        await mutation({variables: {data: tidyData}});
    }, [mutation]);


    const headers = rawData.length > 0 ? Object.keys(rawData[0]) : [];
    const tableData = rawData.map((record, idx) => 
        <tr key={idx}>
            {
                headers.map((col) => <td key={`${idx}_${col}`}>{record[col]}</td>)
            }
        </tr>    
    );
    return (
        <div className="Uploader">
            <div className="controls">
                <div className="tag">{props.tag}</div>
                <input type="file" accept=".csv" onChange={selectedFile} size="32px" />
            </div>
            <table>
            <tbody>
                <tr>
                {headers.map((col) => <th key={col}>{col}</th>)}
                </tr>
                {tableData}
            </tbody>
            </table>
        </div>
    );
}
