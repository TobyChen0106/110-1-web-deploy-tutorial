import { useMutation } from '@apollo/client';

import Uploader from '../components/Uploader';
import {
    INSERT_PEOPLE_MUTATION,
} from '../graphql';

import "./Upload.css";


export default function Upload() {
    const [insertPerson] = useMutation(INSERT_PEOPLE_MUTATION);
    return <div id="Upload">
        <div id="PeopleUploader">
            <Uploader tag="People" mutation={insertPerson}/>
        </div>
    </div>;
}
