import {Link} from 'react-router-dom'

export function Users(){
    return (
        <div>
            <h2>This is Users component.</h2>
            <Link to="/users/1">User 1 </Link>
            <br/>
            <Link to ="/users/2">User 2</Link>
        </div>
    )
}