import { useParams } from "react-router-dom"; //hook which helps in taking out any parameter passed in the URL

export function User(){

    const {id} = useParams();
    return <h2> This is a user {id} component</h2>
}