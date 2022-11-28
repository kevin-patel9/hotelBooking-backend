import { Link } from 'react-router-dom'
import './pageNotFound.css'

export const PageNotFound = () => {
    return (
        <div className='page' >
            <h2>Page Not Found</h2>
            <p>You might not have permissions to see this page.</p>
            <Link to="/" >
               
                <button className='homeBtn'> Back To Home Page</button>
            </Link>
        </div>
    )
}